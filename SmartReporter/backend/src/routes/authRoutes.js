const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser, forgotPassword, resetPassword, verifyOTP } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/me', verifyToken, getCurrentUser);

module.exports = router;
