const express = require('express');
const passport = require('../auth/passport');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/?auth=fail', session: true }), (req, res) => {
  // On success, redirect to frontend dashboard
  res.redirect((process.env.WEB_BASE_URL || 'http://localhost:3000') + '/dashboard');
});

router.get('/me', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: { code: 401, message: 'Not authenticated' } });
  }
  res.json({ data: req.user });
});

router.get('/logout', (req, res) => {
  req.logout?.();
  req.session = null;
  res.redirect(process.env.WEB_BASE_URL || '/');
});

module.exports = router;
