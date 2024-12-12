const express = require('express');
const { createBooking, getGuestBookings } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createBooking);

// Route to fetch bookings for the logged-in guest
router.get('/get-bookings', authMiddleware, getGuestBookings);

module.exports = router;
