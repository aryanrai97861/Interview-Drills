const express = require('express');
const NodeCache = require('node-cache');
const Drill = require('../models/drill');
const cache = new NodeCache({ stdTTL: Number(process.env.CACHE_TTL_SECONDS) || 60 });

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const cached = cache.get('drills:all');
    if (cached) return res.json({ data: cached });
    const docs = await Drill.find({}, { questions: 0 }).lean();
    cache.set('drills:all', docs);
    res.json({ data: docs });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const cached = cache.get(`drills:${id}`);
    if (cached) return res.json({ data: cached });
    const doc = await Drill.findById(id).lean();
    if (!doc) return res.status(404).json({ error: { code: 404, message: 'Drill not found' } });
    cache.set(`drills:${id}`, doc);
    res.json({ data: doc });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
