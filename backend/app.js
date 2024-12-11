require('dotenv').config({ path: './config/.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Debug route imports
console.log('Starting route imports...');

const userRoutes = require('./routes/userRoutes');
console.log('userRoutes:', typeof userRoutes);

const accountRoutes = require('./routes/account');
console.log('accountRoutes:', typeof accountRoutes);

const accountClosureRoutes = require('./routes/accountClosureRoutes');
console.log('accountClosureRoutes:', typeof accountClosureRoutes);

const loanRoutes = require('./routes/loanRoutes');
console.log('loanRoutes:', typeof loanRoutes);

const chatRouter = require('./routes/chatRoutes');
console.log('chatRouter:', typeof chatRouter);

const disputeRoutes = require('./routes/disputeRoutes');
console.log('disputeRoutes:', typeof disputeRoutes);

const feedbackRoutes = require('./routes/feedback');
console.log('feedbackRoutes:', typeof feedbackRoutes);

const billRoutes = require('./routes/billRoutes');
console.log('billRoutes:', typeof billRoutes);

const transferRoutes = require('./routes/transferRoutes');
console.log('transferRoutes:', typeof transferRoutes);

const scheduledTransferRoutes = require('./routes/scheduledTransferRoutes');
console.log('scheduledTransferRoutes:', typeof scheduledTransferRoutes);

const messageRoutes = require('./routes/messageRoutes');
console.log('messageRoutes:', typeof messageRoutes);

const balanceRoutes = require('./routes/balanceRoutes');
console.log('balanceRoutes:', typeof balanceRoutes);

// Initialize the database connection
const initiatedDBConnection = require('./config/db');
initiatedDBConnection();

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:3001', 'https://your-frontend-domain.vercel.app'],
    credentials: true
}));
app.use(bodyParser.json());

// API Routes
console.log('Setting up routes...');

try {
    app.use('/api/users', userRoutes);
    app.use('/api/account', accountRoutes);
    app.use('/api/closure', accountClosureRoutes);
    app.use('/api/loan', loanRoutes);
    app.use('/api/chat', chatRouter);
    app.use('/api/disputes', disputeRoutes);
    app.use('/api/feedback', feedbackRoutes);
    app.use('/api/bills', billRoutes);
    app.use('/api/transfer', transferRoutes);
    app.use('/api/scheduled-transfer', scheduledTransferRoutes);
    app.use('/api/messages', messageRoutes);
    app.use('/api/balance', balanceRoutes);
} catch (error) {
    console.error('Error setting up routes:', error);
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
