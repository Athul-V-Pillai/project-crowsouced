const User = require("../models/User");
const { generateToken } = require("../utils/jwt");
const { sendPasswordResetEmail, sendPasswordResetOTPEmail } = require("../utils/mail");
const crypto = require("crypto");

exports.register = async (req, res, next) => {
  try {
    console.log("Register route called with body:", req.body);
    const { name, email, password, role = "user" } = req.body;
    
    if (!name || !email || !password) {
      console.log("Missing fields: name=" + name + ", email=" + email + ", password=" + (password ? "yes" : "no"));
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password"
      });
    }
    
    console.log("Checking if user exists with email:", email);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }
    
    console.log("Creating new user:", { name, email, role });
    const user = new User({ name, email, password, role });
    await user.save();
    console.log("User saved successfully:", user._id);
    
    const token = generateToken(user._id, user.role);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error("Register error:", error.message, error.stack);
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password"
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }
    const token = generateToken(user._id, user.role);
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message
    });
  }
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message
    });
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide your email address"
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with that email address"
      });
    }
    // Generate OTP for password reset
    const otp = user.generatePasswordResetOTP();
    await user.save();
    
    // Send OTP via email
    const emailResult = await sendPasswordResetOTPEmail(user.email, otp, user.name);
    if (!emailResult.success) {
      user.resetOTP = null;
      user.resetOTPExpires = null;
      user.resetOTPVerified = false;
      await user.save();
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email. Please try again later."
      });
    }
    res.status(200).json({
      success: true,
      message: "OTP has been sent to your email address"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to process forgot password request",
      error: error.message
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and new password"
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with that email address"
      });
    }
    // Check if OTP has been verified
    if (!user.resetOTPVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify OTP first"
      });
    }
    // Update password
    user.password = newPassword;
    // Clear OTP fields
    user.resetOTP = null;
    user.resetOTPExpires = null;
    user.resetOTPVerified = false;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password has been reset successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to reset password",
      error: error.message
    });
  }
};

exports.verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and OTP"
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with that email address"
      });
    }
    // Check if OTP matches and hasn't expired
    if (user.resetOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }
    if (!user.resetOTPExpires || user.resetOTPExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one."
      });
    }
    // Mark OTP as verified
    user.resetOTPVerified = true;
    await user.save();
    res.status(200).json({
      success: true,
      message: "OTP verified successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
      error: error.message
    });
  }
};

exports.verifyResetToken = async (req, res, next) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Please provide a reset token"
      });
    }
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() }
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token"
      });
    }
    res.status(200).json({
      success: true,
      message: "Reset token is valid"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to verify reset token",
      error: error.message
    });
  }
};
