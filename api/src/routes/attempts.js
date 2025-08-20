const express = require('express');
const Attempt = require('../models/attempt');
const Drill = require('../models/drill');
const { scoreAnswers } = require('../utils/scorer');

const router = express.Router();

// POST /api/attempts : submit answers { drillId, answers: [] }
router.post('/', async (req, res, next) => {
  try {
    const { drillId, answers } = req.body;
    if (!drillId || !Array.isArray(answers)) return res.status(400).json({ error: { code: 400, message: 'Invalid payload' } });
    const drill = await Drill.findById(drillId).lean();
    if (!drill) return res.status(404).json({ error: { code: 404, message: 'Drill not found' } });

    const score = scoreAnswers(drill, answers);
    // For now we don't have auth; userId is optional
    const attempt = await Attempt.create({ userId: req.user && req.user._id, drillId, answers, score });
    res.json({ data: { id: attempt._id, score, createdAt: attempt.createdAt } });
  } catch (err) {
    next(err);
  }
});

// GET /api/attempts?limit=5
router.get('/', async (req, res, next) => {
  try {
    const limit = Math.min(50, Number(req.query.limit) || 5);
    // if user present, filter by userId; otherwise return recent global attempts
    const q = req.user ? { userId: req.user._id } : {};
    const docs = await Attempt.find(q).sort({ createdAt: -1 }).limit(limit).lean();
    res.json({ data: docs });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
