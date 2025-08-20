const path = require('path');
const dotenv = require('dotenv');

// Attempt to load repo root .env first (where the developer likely put it), then fallback to local .env
const rootEnv = path.resolve(__dirname, '..', '..', '.env');
dotenv.config({ path: rootEnv });
dotenv.config(); // fallback to local api/.env

module.exports = {
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/drillsdb',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  COOKIE_SECRET: process.env.COOKIE_SECRET || process.env.SESSION_SECRET,
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS || 60000,
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX || 100,
  CACHE_TTL_SECONDS: process.env.CACHE_TTL_SECONDS || 60,
};
