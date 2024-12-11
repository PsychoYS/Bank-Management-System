const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    requestAccountClosure,
    getAllClosureRequests,
    processClosureRequest 
} = require('../controllers/accountController');

// Regular user route
router.post('/request', protect, requestAccountClosure);

// Admin routes
router.get('/all', protect, getAllClosureRequests);
router.post('/process', protect, processClosureRequest);

module.exports = router;
