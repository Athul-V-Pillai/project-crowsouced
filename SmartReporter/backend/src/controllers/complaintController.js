const Complaint = require('../models/Complaint');
const User = require('../models/User');
const Upvote = require('../models/Upvote');
const { uploadToCloudinary } = require('../utils/cloudinary');
const axios = require('axios');
const { sendComplaintUpdateEmail } = require('../utils/complaintMail');
const { sendComplaintReceivedEmail, sendComplaintAppreciationEmail } = require('../utils/mail');

// Submit a new complaint
exports.submitComplaint = async (req, res, next) => {
  try {
    const { description, category, latitude, longitude } = req.body;
    const userId = req.user.userId;

    // Validate input
    if (!description || !category || !latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Upload image to Cloudinary
    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: 'No image provided'
      });
    }

    let imageUrl;
    try {
      const uploadResult = await uploadToCloudinary(req.files.image.data, 'smartreporter/complaints');
      imageUrl = uploadResult.secure_url;
    } catch (uploadError) {
      return res.status(500).json({
        success: false,
        message: 'Failed to upload image',
        error: uploadError.message
      });
    }

    // Call AI microservice to classify the image
    let aiCategory = null;
    let aiConfidence = null;

    try {
      const aiResponse = await axios.post(
        `${process.env.AI_SERVICE_URL}/predict`,
        { imageUrl },
        { timeout: process.env.AI_SERVICE_TIMEOUT || 30000 }
      );

      aiCategory = aiResponse.data.category;
      aiConfidence = aiResponse.data.confidence;
    } catch (aiError) {
      console.log('AI Service unavailable, proceeding without AI classification');
    }

    // Create complaint
    const complaint = new Complaint({
      userId,
      imageUrl,
      description,
      category,
      aiCategory,
      aiConfidence,
      latitude,
      longitude,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    });

    await complaint.save();
    await complaint.populate('userId', 'name email');

    // Send complaint received confirmation email to user
    await sendComplaintReceivedEmail(complaint.userId.email, complaint.userId.name, category, complaint._id, description);

    res.status(201).json({
      success: true,
      message: 'Complaint submitted successfully',
      complaint
    });

    // Send appreciation email to user (non-blocking)
    await sendComplaintAppreciationEmail(complaint.userId.email, complaint.userId.name);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit complaint',
      error: error.message
    });
  }
};

// Get all complaints with filters
exports.getComplaints = async (req, res, next) => {
  try {
    const { category, status, priority, page = 1, limit = 10 } = req.query;

    // Build filter object
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    // Pagination
    const skip = (page - 1) * limit;

    const complaints = await Complaint.find(filter)
      .populate('userId', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Complaint.countDocuments(filter);

    res.status(200).json({
      success: true,
      complaints,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch complaints',
      error: error.message
    });
  }
};

// Get complaint by ID
exports.getComplaintById = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('userId', 'name email phone')
      .populate('assignedTo', 'name email');

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.status(200).json({
      success: true,
      complaint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch complaint',
      error: error.message
    });
  }
};

// Update complaint status (Admin only)
exports.updateComplaintStatus = async (req, res, next) => {
  try {
    const { status, priority, resolutionNote, assignedTo } = req.body;
    const { id } = req.params;

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status, priority, resolutionNote, assignedTo },
      { new: true, runValidators: true }
    ).populate('userId', 'name email').populate('assignedTo', 'name email');

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    // Send email notification to the user
    if (complaint.userId && complaint.userId.email) {
      try {
        const complaintData = {
          _id: complaint._id,
          category: complaint.category,
          status: complaint.status,
          priority: complaint.priority,
          resolutionNote: complaint.resolutionNote,
          description: complaint.description
        };
        
        const emailResult = await sendComplaintUpdateEmail(
          complaint.userId.email,
          complaint.userId.name,
          complaintData
        );
        
        console.log('Email notification result:', emailResult);
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
        // Continue even if email fails
      }
    }

    res.status(200).json({
      success: true,
      message: 'Complaint updated successfully and user notified',
      complaint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update complaint',
      error: error.message
    });
  }
};

// Upvote a complaint
exports.upvoteComplaint = async (req, res, next) => {
  try {
    const { complaintId } = req.body;
    const userId = req.user.userId;

    // Check if already upvoted
    const existingUpvote = await Upvote.findOne({ userId, complaintId });

    if (existingUpvote) {
      // Remove upvote
      await Upvote.deleteOne({ _id: existingUpvote._id });
      await Complaint.findByIdAndUpdate(complaintId, { $inc: { upvotes: -1 } });

      return res.status(200).json({
        success: true,
        message: 'Upvote removed',
        action: 'removed'
      });
    } else {
      // Add upvote
      const upvote = new Upvote({ userId, complaintId });
      await upvote.save();
      await Complaint.findByIdAndUpdate(complaintId, { $inc: { upvotes: 1 } });

      return res.status(200).json({
        success: true,
        message: 'Complaint upvoted',
        action: 'added'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to upvote complaint',
      error: error.message
    });
  }
};

// Get complaints by user
exports.getMyComplaints = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const complaints = await Complaint.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Complaint.countDocuments({ userId });

    res.status(200).json({
      success: true,
      complaints,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your complaints',
      error: error.message
    });
  }
};

// Update user's own complaint (only pending complaints)
exports.updateComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { description, category, latitude, longitude } = req.body;

    // Find complaint and verify ownership
    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    // Check if user owns the complaint
    if (complaint.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only edit your own complaints'
      });
    }

    // Allow editing only for pending complaints
    if (complaint.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'You can only edit pending complaints'
      });
    }

    // Update allowed fields
    if (description) complaint.description = description;
    if (category) complaint.category = category;
    if (latitude && longitude) {
      complaint.latitude = latitude;
      complaint.longitude = longitude;
      complaint.location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };
    }

    await complaint.save();
    await complaint.populate('userId', 'name email');

    res.status(200).json({
      success: true,
      message: 'Complaint updated successfully',
      complaint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update complaint',
      error: error.message
    });
  }
};

// Send appreciation email
exports.sendAppreciationEmail = async (req, res, next) => {
  try {
    const { complaintId } = req.params;
    
    // Find complaint
    const complaint = await Complaint.findById(complaintId).populate('userId');
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    // Get user email and name
    const user = complaint.userId;
    if (!user || !user.email) {
      return res.status(400).json({
        success: false,
        message: 'User email not found'
      });
    }

    // Send appreciation email
    const emailResult = await sendComplaintAppreciationEmail(
      user.email,
      user.name,
      complaint.category,
      complaint._id
    );

    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: emailResult.message
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appreciation email sent successfully to user'
    });
  } catch (error) {
    console.error('Send appreciation email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send appreciation email',
      error: error.message
    });
  }
};
