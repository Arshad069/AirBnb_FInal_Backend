const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Remove unique constraint
  email: { type: String, required: true, unique: true }, // Email remains unique
  password: { type: String, required: true },
  role: { type: String, enum: ['Host', 'Guest'], default: 'Guest' },
  dob: { type: Date, default: null },
  contact: { type: String, default: '' },
  bio: { type: String, default: 'This is your bio' },
});

module.exports = mongoose.model('User', userSchema);
