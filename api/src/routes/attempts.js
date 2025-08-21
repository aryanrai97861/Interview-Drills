const express = require('express');
const Attempt = require('../models/attempt');
const Drill = require('../models/drill');
const { scoreAnswers } = require('../utils/scorer');

const router = express.Router();

// POST /api/attempts : submit answers { drillId, answers: [] }
router.post('/', async (req, res, next) => {
  try {
    // Check for authentication and user ID
    if (!req.user || !req.user._id) {
      console.log('Auth debug:', { user: req.user, session: req.session });
      return res.status(401).json({ error: { code: 401, message: 'Authentication required' } });
    }
    
    const { drillId, answers } = req.body;
    if (!drillId || !Array.isArray(answers)) {
      return res.status(400).json({ error: { code: 400, message: 'Invalid payload' } });
    }

    const drill = await Drill.findById(drillId);
    if (!drill) {
      return res.status(404).json({ error: { code: 404, message: 'Drill not found' } });
    }

    // Calculate score first
    const attemptScore = scoreAnswers(drill, answers);

    // Create and save attempt
    const attempt = await Attempt.create({
      userId: req.user._id,
      drillId,
      answers,
      score: attemptScore
    });
    res.json({ data: { id: attempt._id, score: attemptScore, createdAt: attempt.createdAt } });
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
