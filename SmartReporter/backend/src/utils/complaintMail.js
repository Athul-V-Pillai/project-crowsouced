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

const sendComplaintUpdateEmail = async (userEmail, userName, complaintData) => {
  const { _id, category, status, priority, resolutionNote, description } = complaintData;
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  const complaintUrl = frontendUrl + "/complaints/" + _id;

  const statusColors = {
    pending: "#FFA500",
    inProgress: "#007bff",
    resolved: "#28a745",
    rejected: "#dc3545"
  };

  const statusColor = statusColors[status] || "#666";

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="color: #333; margin: 0;">Complaint Status Update</h2>
        <p style="color: #666; margin: 5px 0;">SmartReporter</p>
      </div>

      <div style="background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid ${statusColor};">
        <h3 style="color: #333; margin-top: 0;">Hello ${userName},</h3>
        
        <p style="color: #666; line-height: 1.6;">
          Your complaint has been updated by our admin team. Here are the details:
        </p>

        <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 8px 0;"><strong>Complaint ID:</strong> ${_id}</p>
          <p style="margin: 8px 0;"><strong>Category:</strong> <span style="background-color: #e7f3ff; padding: 3px 8px; border-radius: 3px;">${category}</span></p>
          <p style="margin: 8px 0;"><strong>Current Status:</strong> 
            <span style="background-color: ${statusColor}; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;">
              ${status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </p>
          <p style="margin: 8px 0;"><strong>Priority:</strong> <span style="color: #d9534f; font-weight: bold;">${priority || 'Medium'}</span></p>
        </div>

        ${resolutionNote ? `
          <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h4 style="color: #2e7d32; margin-top: 0;">Admin Note:</h4>
            <p style="color: #333; margin: 0;">${resolutionNote}</p>
          </div>
        ` : ''}

        <div style="text-align: center; margin: 30px 0;">
          <a href="${complaintUrl}" style="display: inline-block; padding: 12px 30px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
            View Full Complaint
          </a>
        </div>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        
        <p style="color: #666; font-size: 12px; line-height: 1.6;">
          If you have any questions about this update, please reply to this email or visit your complaint details page.
        </p>

        <p style="color: #999; font-size: 11px; margin-bottom: 0;">
          Best regards,<br>
          SmartReporter Admin Team<br>
          <em>Crowdsourced Complaint Resolution System</em>
        </p>
      </div>

      <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p style="color: #999; font-size: 11px; margin: 0;">
          © 2026 SmartReporter. All rights reserved.
        </p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER || "noreply@smartreporter.com",
    to: userEmail,
    subject: `Complaint Update: ${category} - Status: ${status.charAt(0).toUpperCase() + status.slice(1)}`,
    html: htmlContent
  };

  try {
    const emailTransporter = getTransporter();
    await emailTransporter.sendMail(mailOptions);
    return { success: true, message: "Complaint update email sent successfully" };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, message: "Failed to send complaint update email", error: error.message };
  }
};

module.exports = { sendComplaintUpdateEmail };
