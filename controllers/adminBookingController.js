// adminController.js
const Booking = require('../models/booking');
const Listing = require('../models/listing');

// Fetch bookings for listings owned by the logged-in host
exports.getHostBookings = async (req, res) => {
  try {
    const hostId = req.user.id; // Extracted from token in authMiddleware

    // Find listings created by the host
    const hostListings = await Listing.find({ hostId });
    const listingIds = hostListings.map(listing => listing._id);

    // Find bookings associated with the host's listings
    const bookings = await Booking.find({ listingId: { $in: listingIds } }).populate('listingId', 'title location');

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
