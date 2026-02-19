const mongoose = require('mongoose');

const upvoteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    complaintId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Complaint',
      required: true
    }
  },
  { timestamps: true }
);

// Create unique index to prevent duplicate upvotes
upvoteSchema.index({ userId: 1, complaintId: 1 }, { unique: true });

module.exports = mongoose.model('Upvote', upvoteSchema);
