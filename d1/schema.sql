-- Cloudflare D1 Database Schema for Shreeharsha's Portfolio
-- Run: npx wrangler d1 execute portfolio-db --file=./d1/schema.sql

-- 1. Contact Messages (Direct transmission storage)
CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  ip_hash TEXT,
  status TEXT DEFAULT 'unread',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Minecraft Guestbook Signpost (Visitor signatures & comments)
CREATE TABLE IF NOT EXISTS guestbook_entries (
  id TEXT PRIMARY KEY,
  author_name TEXT NOT NULL,
  character_skin TEXT DEFAULT 'steve',
  message TEXT NOT NULL,
  is_approved INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Global Miner Leaderboard (Persistent diamond mining & XP rankings)
CREATE TABLE IF NOT EXISTS miner_stats (
  id TEXT PRIMARY KEY,
  player_name TEXT NOT NULL UNIQUE,
  diamonds_mined INTEGER DEFAULT 0,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  last_active DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Privacy-Preserving Telemetry & Analytics
CREATE TABLE IF NOT EXISTS analytics_events (
  id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  event_value TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Initial seed data for Guestbook
INSERT OR IGNORE INTO guestbook_entries (id, author_name, character_skin, message, created_at)
VALUES 
  ('seed-1', 'Shreeharsha (Developer)', 'creeper', 'Welcome to my Minecraft-themed portfolio! Leave a note on this signpost or reach out anytime.', CURRENT_TIMESTAMP),
  ('seed-2', 'Alex the Explorer', 'alex', 'The pixel HUD and biome switcher are incredible. Super clean responsive layout!', CURRENT_TIMESTAMP),
  ('seed-3', 'Steve the Miner', 'steve', 'Found 10 diamonds already in the mining block. Clean full-stack craft!', CURRENT_TIMESTAMP);

-- Initial seed data for Miner Leaderboard
INSERT OR IGNORE INTO miner_stats (id, player_name, diamonds_mined, xp, level, last_active)
VALUES
  ('seed-miner-1', 'Shreeharsha (Dev)', 42, 420, 42, CURRENT_TIMESTAMP),
  ('seed-miner-2', 'DiamondHunter', 24, 240, 24, CURRENT_TIMESTAMP),
  ('seed-miner-3', 'NetherWalker', 16, 160, 16, CURRENT_TIMESTAMP),
  ('seed-miner-4', 'PixelCrafter', 9, 90, 9, CURRENT_TIMESTAMP);
