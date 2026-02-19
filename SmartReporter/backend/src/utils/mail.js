const nodemailer = require("nodemailer");

const testTransport = {
  sendMail: async (mailOptions) => {
    console.log("Email would be sent with:", mailOptions);
    return Promise.resolve({ response: "Test mode - email not sent" });
  }
};

let transporter = null;
let useTestMode = !(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD);

const getTransporter = () => {
  if (useTestMode) {
    return testTransport;
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }
  return transporter;
};

const sendPasswordResetEmail = async (email, resetToken, userName) => {
  const resetUrl = (process.env.FRONTEND_URL || "http://localhost:3000") + "/reset-password/" + resetToken;
  const htmlContent = "<div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;\">" +
    "<h2 style=\"color: #333;\">Password Reset Request</h2>" +
    "<p>Hello <strong>" + userName + "</strong>,</p>" +
    "<p>We received a request to reset your password. Click the link below:</p>" +
    "<a href=\"" + resetUrl + "\" style=\"display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;\">Reset Password</a>" +
    "<p>Or copy: <a href=\"" + resetUrl + "\">" + resetUrl + "</a></p>" +
    "<p style=\"color: #666; font-size: 12px;\">This link expires in 1 hour.</p>" +
    "<p style=\"color: #666; font-size: 12px;\">If you didn'\''t request this, please ignore this email.</p>" +
    "<hr style=\"border: none; border-top: 1px solid #ddd; margin: 20px 0;\">" +
    "<p style=\"color: #999; font-size: 12px;\">SmartReporter</p>" +
    "</div>";

  const mailOptions = {
    from: process.env.EMAIL_USER || "noreply@smartreporter.com",
    to: email,
    subject: "Password Reset Request - SmartReporter",
    html: htmlContent
  };

  try {
    const emailTransporter = getTransporter();
    await emailTransporter.sendMail(mailOptions);
    return { success: true, message: "Password reset email sent successfully" };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, message: "Failed to send email", error: error.message };
  }
};

const sendPasswordResetOTPEmail = async (email, otp, userName) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Password Reset OTP</h2>
      <p>Hello <strong>${userName}</strong>,</p>
      <p>Your One-Time Password (OTP) for password reset is:</p>
      <div style="background-color: #f0f0f0; padding: 20px; border-radius: 5px; text-align: center; margin: 20px 0;">
        <h1 style="color: #007bff; letter-spacing: 5px; margin: 0;">${otp}</h1>
      </div>
      <p style="color: #666; font-size: 14px;"><strong>Important:</strong></p>
      <ul style="color: #666; font-size: 14px;">
        <li>This OTP is valid for 10 minutes only</li>
        <li>Do not share this OTP with anyone</li>
        <li>If you didn't request this, please ignore this email</li>
      </ul>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="color: #999; font-size: 12px;">SmartReporter</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER || "noreply@smartreporter.com",
    to: email,
    subject: "Password Reset OTP - SmartReporter",
    html: htmlContent
  };

  try {
    const emailTransporter = getTransporter();
    await emailTransporter.sendMail(mailOptions);
    return { success: true, message: "OTP sent successfully to your email" };
  } catch (error) {
    console.error("OTP email send error:", error);
    return { success: false, message: "Failed to send OTP email", error: error.message };
  }
};

const sendComplaintAppreciationEmail = async (email, userName, complaintCategory, complaintId) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; color: white; text-align: center;">
        <h1 style="margin: 0; font-size: 28px;">🙏 Thank You!</h1>
      </div>
      <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <p>Dear <strong>${userName}</strong>,</p>
        
        <p>We want to express our heartfelt appreciation for your recent complaint submission regarding <strong>${complaintCategory}</strong>.</p>
        
        <div style="background-color: white; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; color: #666;">
            <strong>Your contribution helps us improve!</strong><br>
            By reporting issues, you're helping us create a better community. Your feedback is invaluable and helps our team prioritize and resolve problems faster.
          </p>
        </div>
        
        <p style="color: #666;">We're committed to:</p>
        <ul style="color: #666;">
          <li>Investigating your report thoroughly</li>
          <li>Taking appropriate action</li>
          <li>Keeping you updated on progress</li>
        </ul>
        
        <div style="background-color: #e8f4f8; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
          <p style="margin: 0; color: #667eea;">
            <strong>Complaint ID:</strong> #${complaintId}
          </p>
        </div>
        
        <p style="color: #666; margin-top: 30px;">
          If you have any additional information or concerns about this issue, please don't hesitate to reach out.
        </p>
        
        <p style="color: #666;">
          Thank you for being an active member of our community!
        </p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #999; font-size: 12px; text-align: center;">
          SmartReporter Team<br>
          Making our community better, one report at a time
        </p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER || "noreply@smartreporter.com",
    to: email,
    subject: "Thank You for Your Complaint! - SmartReporter",
    html: htmlContent
  };

  try {
    const emailTransporter = getTransporter();
    await emailTransporter.sendMail(mailOptions);
    return { success: true, message: "Appreciation email sent successfully" };
  } catch (error) {
    console.error("Appreciation email send error:", error);
    return { success: false, message: "Failed to send appreciation email", error: error.message };
  }
};

const sendComplaintReceivedEmail = async (email, userName, complaintCategory, complaintId, complaintDescription) => {
  const categoryIcons = {
    road: '🛣️',
    garbage: '🗑️',
    water: '💧',
    streetlight: '💡',
    other: '📋'
  };

  const categoryIcon = categoryIcons[complaintCategory] || '📋';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px 10px 0 0; color: white; text-align: center;">
        <h1 style="margin: 0; font-size: 28px;">✅ Complaint Received!</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px;">Your report has been submitted successfully</p>
      </div>
      <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <p>Dear <strong>${userName}</strong>,</p>
        
        <p>Thank you for using SmartReporter! Your complaint has been received and is now in our system.</p>
        
        <div style="background-color: white; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; border-radius: 3px;">
          <p style="margin: 0 0 15px 0; font-size: 18px;"><strong>${categoryIcon} Your Complaint Summary</strong></p>
          
          <p style="margin: 8px 0; color: #333;">
            <strong>Complaint ID:</strong> <span style="background-color: #ecfdf5; color: #047857; padding: 4px 8px; border-radius: 3px; font-family: monospace;">#${complaintId}</span>
          </p>
          <p style="margin: 8px 0; color: #333;">
            <strong>Category:</strong> <span style="text-transform: capitalize;">${complaintCategory}</span>
          </p>
          <p style="margin: 8px 0; color: #333;">
            <strong>Status:</strong> <span style="background-color: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 3px;">Under Review</span>
          </p>
          <p style="margin: 15px 0 8px 0; color: #333;"><strong>Description:</strong></p>
          <p style="margin: 0; padding: 10px; background-color: #f3f4f6; border-radius: 3px; color: #555; line-height: 1.6; max-height: 120px; overflow: hidden;">${complaintDescription.substring(0, 200)}${complaintDescription.length > 200 ? '...' : ''}</p>
        </div>
        
        <div style="background-color: #dbeafe; border-left: 4px solid #0284c7; padding: 12px; margin: 15px 0; border-radius: 3px;">
          <p style="margin: 0; color: #0c4a6e; font-size: 14px;">
            <strong>What happens next?</strong><br>
            Our admin team has been notified about your complaint. They will review it and take appropriate action. You'll receive updates on the progress via email.
          </p>
        </div>
        
        <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 12px; margin: 15px 0; border-radius: 3px;">
          <p style="margin: 0; color: #15803d; font-size: 14px;">
            <strong>📝 Keep your Complaint ID safe:</strong> Use it to track your complaint status or provide additional information.
          </p>
        </div>
        
        <p style="color: #666; margin-top: 20px;">
          If you have any additional information about this issue or need to follow up, please include your Complaint ID in your communication.
        </p>
        
        <p style="color: #666;">
          Thank you for helping us make our community better!
        </p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #999; font-size: 12px; text-align: center;">
          SmartReporter - Complaint Management System<br>
          Working towards a better community
        </p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER || "noreply@smartreporter.com",
    to: email,
    subject: `✅ Your Complaint Has Been Received - ID: #${complaintId} - SmartReporter`,
    html: htmlContent
  };

  try {
    const emailTransporter = getTransporter();
    await emailTransporter.sendMail(mailOptions);
    return { success: true, message: "Complaint received email sent successfully" };
  } catch (error) {
    console.error("Complaint received email error:", error);
    return { success: false, message: "Failed to send complaint received email", error: error.message };
  }
};

module.exports = { sendPasswordResetEmail, sendPasswordResetOTPEmail, sendComplaintAppreciationEmail, sendComplaintReceivedEmail };
