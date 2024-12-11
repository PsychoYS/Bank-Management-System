const express = require('express');
const router = express.Router();
const { handleChatMessage } = require('../controllers/chatController');

// Handle POST request to root path
router.post('/', handleChatMessage);

module.exports = router; 