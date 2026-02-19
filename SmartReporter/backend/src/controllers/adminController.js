const Complaint = require("../models/Complaint");
const User = require("../models/User");

exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({ status: "pending" });
    const inProgressComplaints = await Complaint.countDocuments({ status: "in-progress" });
    const resolvedComplaints = await Complaint.countDocuments({ status: "resolved" });
    const highPriorityComplaints = await Complaint.countDocuments({ priority: "high" });

    const complaintsByCategory = await Complaint.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);
    const complaintsByStatus = await Complaint.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalComplaints,
        pendingComplaints,
        inProgressComplaints,
        resolvedComplaints,
        highPriorityComplaints,
        complaintsByCategory,
        complaintsByStatus
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      error: error.message
    });
  }
};

exports.getComplaintsOnMap = async (req, res, next) => {
  try {
    const { minLat, maxLat, minLng, maxLng } = req.query;

    let filter = {};

    if (minLat && maxLat && minLng && maxLng) {
      filter.location = {
        $geoWithin: {
          $box: [
            [parseFloat(minLng), parseFloat(minLat)],
            [parseFloat(maxLng), parseFloat(maxLat)]
          ]
        }
      };
    }

    const complaints = await Complaint.find(filter)
      .select("latitude longitude category status priority description imageUrl createdAt")
      .populate("userId", "name email");

    res.status(200).json({
      success: true,
      complaints
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch complaints on map",
      error: error.message
    });
  }
};

exports.assignComplaint = async (req, res, next) => {
  try {
    const { complaintId, adminId } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { assignedTo: adminId },
      { new: true }
    ).populate("assignedTo", "name email");

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Complaint assigned successfully",
      complaint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to assign complaint",
      error: error.message
    });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const users = await User.find()
      .select("-password")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      users,
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
      message: "Failed to fetch users",
      error: error.message
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, email, phone, role } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, phone, role },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    await Complaint.deleteMany({ userId });

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message
    });
  }
};

exports.banUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { status: "banned", bannedReason: reason, bannedAt: new Date() },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User banned successfully",
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to ban user",
      error: error.message
    });
  }
};

exports.suspendUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { status: "suspended", bannedReason: reason, bannedAt: new Date() },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User suspended successfully",
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to suspend user",
      error: error.message
    });
  }
};

exports.unsuspendUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { status: "active", bannedReason: null, bannedAt: null },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User unsuspended successfully",
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to unsuspend user",
      error: error.message
    });
  }
};

exports.deleteComplaint = async (req, res, next) => {
  try {
    const { complaintId } = req.params;
    const complaint = await Complaint.findByIdAndDelete(complaintId);
    if (!complaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }
    res.status(200).json({ success: true, message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete complaint", error: error.message });
  }
};