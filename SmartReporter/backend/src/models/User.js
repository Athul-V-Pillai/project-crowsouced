const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please provide a name"], trim: true },
    email: { type: String, required: [true, "Please provide an email"], unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"] },
    password: { type: String, required: [true, "Please provide a password"], minlength: 6, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    avatar: { type: String, default: null },
    phone: { type: String, default: null },
    status: { type: String, enum: ["active", "banned", "suspended"], default: "active" },
    bannedReason: { type: String, default: null },
    bannedAt: { type: Date, default: null },
    suspensionExpiresAt: { type: Date, default: null },
    resetOTP: { type: String, default: null },
    resetOTPExpires: { type: Date, default: null },
    resetOTPVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) { return next(); }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generatePasswordResetOTP = function() {
  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.resetOTP = otp;
  this.resetOTPExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  this.resetOTPVerified = false;
  return otp;
};

module.exports = mongoose.model("User", userSchema);