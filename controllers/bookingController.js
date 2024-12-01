const Booking = require('../models/booking');
const Listing = require('../models/listing');

exports.createBooking = async (req, res) => {
  try {
    const { listingId, checkIn, checkOut, numGuests } = req.body;

    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });

    const totalPrice = listing.price * numGuests * ((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    
    const booking = new Booking({
      listingId,
      guestId: req.user.id,
      checkIn,
      checkOut,
      numGuests,
      totalPrice,
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getGuestBookings = async (req, res) => {
    try {
      const bookings = await Booking.find({ guestId: req.user.id }).populate('listingId', 'title location price images');
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };