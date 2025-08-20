const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  drillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Drill' },
  answers: [String],
  score: Number,
  createdAt: { type: Date, default: Date.now }
});

attemptSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Attempt', attemptSchema);
