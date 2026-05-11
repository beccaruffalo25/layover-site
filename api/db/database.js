const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'subscribers.db');

let db;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.exec(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        email     TEXT    NOT NULL UNIQUE,
        source    TEXT    NOT NULL DEFAULT 'homepage',
        created_at TEXT   NOT NULL DEFAULT (datetime('now'))
      )
    `);
  }
  return db;
}

module.exports = { getDb };
