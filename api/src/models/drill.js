const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: String,
  keywords: [String]
}, { _id: false });

const drillSchema = new mongoose.Schema({
  title: String,
  tags: [String],
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  questions: [questionSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Drill', drillSchema);
