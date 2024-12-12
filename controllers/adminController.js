// controllers/adminController.js

const Listing = require('../models/listing');

// Fetch all listings (admin view)
exports.getAllListings = async (req, res) => {
  try {
    const hostId = req.user.id; // Extracted from token in authMiddleware
    
    // Find listings where hostId matches
    const listings = await Listing.find({ hostId });

    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a new listing
exports.addListing = async (req, res) => {
  try {
    const { title, description,category, price, location } = req.body;
    const images = req.files.map(file => file.path); // Save paths of uploaded images

    const newListing = new Listing({
      title,
      description,
      price,
      category,
      location,
      images,
      hostId: req.user.id
    });
    await newListing.save();
    res.status(201).json({ message: 'Listing created successfully', listing: newListing });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Edit a listing by ID
exports.updateListing = async (req, res) => {
  try {
    const { title, description,category, price, location } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    // Find the listing by ID
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Update the listing fields
    listing.title = title || listing.title;
    listing.description = description || listing.description;
    listing.price = price || listing.price;
    listing.location = location || listing.location;
    listing.category = location || listing.category;

    // If images are provided, update the images array
    if (images.length > 0) {
      listing.images = images; // Replace the old images with new ones
    }

    // Save the updated listing
    await listing.save();

    res.json({ message: 'Listing updated successfully', listing });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a listing by ID
exports.deleteListing = async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
