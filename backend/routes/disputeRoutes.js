const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');
const { 
    createDispute,
    getDisputes,
    getAllDisputes,
    updateDisputeStatus
} = require('../controllers/disputeController');

// Add logging middleware
router.use((req, res, next) => {
    console.log('Disputes Router - Incoming request:');
    console.log('Path:', req.path);
    console.log('Method:', req.method);
    console.log('Body:', req.body);
    next();
});

// Create a new dispute
router.post('/', protect, createDispute);

// Get user's disputes
router.get('/', protect, getDisputes);

// Admin routes
router.get('/all', protect, adminOnly, getAllDisputes);
router.patch('/:id/status', protect, adminOnly, updateDisputeStatus);

module.exports = router; 