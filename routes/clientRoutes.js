// routes/clientRoutes.js

const express = require('express');
const { getAllListings, getListingById, getFilteredListings } = require('../controllers/clientController');
const router = express.Router();

// Fetch all listings (Guest view)
router.get('/listings', getAllListings);
router.get('/filter-listings', getFilteredListings);

// Fetch a single listing by ID (Guest view)
router.get('/listings/:id', getListingById);

module.exports = router;
