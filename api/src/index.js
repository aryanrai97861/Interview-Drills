const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const { MONGO_URI, PORT, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX, COOKIE_SECRET } = require('./config');
const drillsRouter = require('./routes/drills');
const healthRouter = require('./routes/health');
const attemptsRouter = require('./routes/attempts');
const meRouter = require('./routes/me');
const authRouter = require('./routes/auth');
const passport = require('./auth/passport');
const session = require('express-session');

async function main() {
  await mongoose.connect(MONGO_URI, { autoIndex: true });
  const app = express();

  app.use(helmet());
  app.use(express.json());
  // parse cookies and verify signed cookies using the same secret as sessions
  app.use(cookieParser(COOKIE_SECRET || 'dev-secret'));
  app.use(morgan('dev'));
  app.use(cors({ 
    origin: process.env.WEB_BASE_URL || 'http://localhost:3000', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  }));
  
  // Session middleware
  app.use(session({
    secret: COOKIE_SECRET || 'dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { 
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.COOKIE_SECURE === 'true',
      httpOnly: true,
      sameSite: 'lax'
    },
    name: 'connect.sid'  // explicitly set cookie name
  }));

  // Initialize Passport and restore authentication state from session
  app.use(passport.initialize());
  app.use(passport.session());

  // Debug middleware to log session and user
  app.use((req, res, next) => {
    console.log('Session Debug:', {
      sessionID: req.sessionID,
      hasSession: !!req.session,
      user: req.user,
      cookies: req.cookies
    });
    next();
  });

  const limiter = rateLimit({ windowMs: Number(RATE_LIMIT_WINDOW_MS) || 60000, max: Number(RATE_LIMIT_MAX) || 100 });
  app.use(limiter);

  app.use('/api/health', healthRouter);
  app.use('/api/drills', drillsRouter);
  app.use('/api/attempts', attemptsRouter);
  app.use('/api/me', meRouter);
  app.use('/auth', authRouter);

  // simple error handler
  app.use((err, req, res, next) => {
    console.error(err);
    const code = err.status || 500;
    res.status(code).json({ error: { code, message: err.message || 'Internal Server Error' } });
  });

  app.get('/', (req, res) => res.json({ status: 'ok' }));

  const server = app.listen(PORT || 4000, () => {
    console.log(`API running on port ${PORT || 4000}`);
  });

  // handle graceful shutdown
  process.on('SIGINT', async () => {
    console.log('Shutting down');
    server.close();
    await mongoose.disconnect();
    process.exit(0);
  });
}

main().catch((err) => {
  console.error('Failed to start', err);
  process.exit(1);
});