const express = require('express');
const router = express.Router();
const { getDb } = require('../db/database');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/subscribe
router.post('/', async (req, res) => {
  const { email, source = 'homepage' } = req.body || {};

  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  const normalised = email.trim().toLowerCase();

  try {
    const db = getDb();
    db.prepare(
      'INSERT INTO subscribers (email, source) VALUES (?, ?)'
    ).run(normalised, source);
  } catch (err) {
    // UNIQUE constraint — already subscribed
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(200).json({ message: "You're already on the list!" });
    }
    console.error('DB error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }

  // Optional Mailchimp sync
  if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
    try {
      await syncMailchimp(normalised);
    } catch (err) {
      // Log but don't fail — subscriber is already saved locally
      console.error('Mailchimp sync error:', err.message);
    }
  }

  return res.status(201).json({ message: "You're on the list! Expect good things." });
});

// GET /api/subscribe  (admin export — requires ?key=ADMIN_KEY)
router.get('/', (req, res) => {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey || req.query.key !== adminKey) {
    return res.status(401).json({ error: 'Unauthorised.' });
  }

  const db = getDb();
  const rows = db.prepare(
    'SELECT email, source, created_at FROM subscribers ORDER BY created_at DESC'
  ).all();

  res.json({ count: rows.length, subscribers: rows });
});

async function syncMailchimp(email) {
  const [key] = process.env.MAILCHIMP_API_KEY.split('-');
  const dc = process.env.MAILCHIMP_API_KEY.split('-').pop();
  const listId = process.env.MAILCHIMP_LIST_ID;

  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`anystring:${process.env.MAILCHIMP_API_KEY}`).toString('base64')}`,
    },
    body: JSON.stringify({
      email_address: email,
      status: 'subscribed',
    }),
  });

  if (!response.ok) {
    const body = await response.json();
    // 400 with title "Member Exists" is fine — already in Mailchimp
    if (body.title !== 'Member Exists') {
      throw new Error(body.detail || response.statusText);
    }
  }
}

module.exports = router;
