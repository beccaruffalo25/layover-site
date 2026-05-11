require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const subscribeRouter = require('./routes/subscribe');

const app = express();
const PORT = process.env.PORT || 3001;

// Allowed origins: local dev + GitHub Pages site
const ALLOWED_ORIGINS = [
  'https://beccaruffalo25.github.io',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5500',  // Live Server default
  'http://127.0.0.1:5500',
];

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (e.g. curl, Postman)
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    cb(new Error('CORS: origin not allowed'));
  },
  methods: ['GET', 'POST'],
}));

app.use(express.json({ limit: '10kb' }));

// Rate-limit subscription endpoint: 5 attempts per 15 minutes per IP
const subscribeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});

app.use('/api/subscribe', subscribeLimiter, subscribeRouter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Layover API running on port ${PORT}`);
});
