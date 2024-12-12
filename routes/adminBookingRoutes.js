// adminRoutes.js
const express = require('express');
const { getHostBookings } = require('../controllers/adminBookingController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get bookings for host's listings
router.get('/bookings', authMiddleware, getHostBookings);

module.exports = router;
