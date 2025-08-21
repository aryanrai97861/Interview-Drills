const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  drillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Drill', required: true },
  answers: [{ type: String }],  // Changed to simpler array format
  score: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

attemptSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Attempt', attemptSchema);
