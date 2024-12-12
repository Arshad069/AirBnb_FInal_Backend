// controllers/clientController.js

const Listing = require('../models/listing');

// Fetch all listings for the client
exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find(); // Fetch all listings from DB
    res.json(listings); // Send the listings in response
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getFilteredListings = async (req, res) => {
  try {
    const { location, title } = req.query;

    const query = {};
    if (location) query.location = { $regex: location, $options: 'i' }; // Case-insensitive regex
    if (title) query.title = { $regex: title, $options: 'i' }; // Case-insensitive regex

    const listings = await Listing.find(query); // Fetch filtered listings from DB
    res.json(listings);
  } catch (error) {
    console.error('Error fetching filtered listings:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


// Fetch a specific listing by ID
exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id); // Find listing by ID

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.json(listing); // Send the listing details
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
