const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: 'A beautiful place to stay' },
  price: { type: Number, default: 100 },
  location: { type: String, default: 'Unknown' },
  images: { type: [String], default: [] },
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Listing', listingSchema);
