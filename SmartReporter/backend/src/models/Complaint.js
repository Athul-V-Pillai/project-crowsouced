const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000
    },
    category: {
      type: String,
      enum: ['road', 'garbage', 'water', 'streetlight', 'other'],
      required: true
    },
    aiCategory: {
      type: String,
      default: null
    },
    aiConfidence: {
      type: Number,
      min: 0,
      max: 1,
      default: null
    },
    mlImage: {
      type: String,
      default: null
    },
    mlResult: {
      type: String,
      default: null
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
        validate: {
          validator: function(v) {
            return v.length === 2 && v[0] >= -180 && v[0] <= 180 && v[1] >= -90 && v[1] <= 90;
          },
          message: 'Invalid coordinates'
        }
      }
    },
    latitude: Number,
    longitude: Number,
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'resolved'],
      default: 'pending'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'low'
    },
    upvotes: {
      type: Number,
      default: 0
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    resolutionNote: {
      type: String,
      default: null
    },
    deletedByUser: {
      type: Boolean,
      default: false
    },
    archivedByAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Create geospatial index for location-based queries
complaintSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Complaint', complaintSchema);
