const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, index: true },
  email: { type: String, index: true },
  name: String,
  avatar: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
