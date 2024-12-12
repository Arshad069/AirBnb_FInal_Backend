// routes/adminRoutes.js

const express = require('express');
const { getAllListings, addListing, deleteListing, updateListing } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Fetch all listings
router.get('/listings', authMiddleware, getAllListings);

// Add a new listing (Host only)
router.post('/listings', authMiddleware, upload.array('images', 2), addListing);

// Edit a listing by ID
router.put('/listings/:id', authMiddleware, upload.array('images', 2), updateListing);

// Delete a listing by ID
router.delete('/listings/:id', authMiddleware, deleteListing);

module.exports = router;
