const express = require('express');
const router = express.Router();
const {
  submitComplaint,
  getComplaints,
  getComplaintById,
  updateComplaintStatus,
  updateComplaint,
  upvoteComplaint,
  getMyComplaints,
  sendAppreciationEmail
} = require('../controllers/complaintController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', getComplaints);

// Protected routes (User) - MUST come before /:id to avoid route conflicts
router.post('/submit', verifyToken, submitComplaint);
router.post('/upvote', verifyToken, upvoteComplaint);
router.get('/my-complaints', verifyToken, getMyComplaints);
router.put('/:id', verifyToken, updateComplaint);

// Public/Protected mixed routes
router.get('/:id', getComplaintById);

// Protected routes (Admin)
router.put('/:id/status', verifyToken, isAdmin, updateComplaintStatus);
router.post('/:complaintId/send-appreciation', verifyToken, isAdmin, sendAppreciationEmail);

module.exports = router;

