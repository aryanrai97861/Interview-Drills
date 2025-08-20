const express = require('express');
const router = express.Router();

// GET /api/me - returns authenticated user or null
router.get('/', (req, res) => {
  if (!req.user) return res.json({ data: null });
  const { _id, name, email, avatar } = req.user;
  res.json({ data: { id: _id, name, email, avatar } });
});

module.exports = router;
