# Password Reset Feature - SmartReporter

This document explains the password reset functionality that has been added to the SmartReporter application.

## Overview

The password reset feature allows both admin and regular users to reset their forgotten passwords through a secure email-based flow.

### Features

- **Forgot Password**: Users can request a password reset by entering their email address
- **Email Verification**: A secure reset link is sent to the user's email
- **Password Reset Page**: Users can reset their password using a token that expires in 1 hour
- **Password Strength Indicator**: Real-time feedback on password strength
- **Security**: Tokens are hashed and expire after 1 hour
- **Works for Both Admin and Client Users**

## How to Use

### For Users (Forgot Password Flow)

1. **On Login Page**:
   - Click "Forgot Password?" link below the login button

2. **On Forgot Password Page**:
   - Enter your email address
   - Click "Send Reset Link"
   - Check your email (including spam folder) for reset link

3. **In Reset Password Email**:
   - Click the reset link in your email
   - Or copy-paste the link in your browser

4. **On Reset Password Page**:
   - Enter your new password
   - Confirm your password
   - Password strength indicator shows if password is secure enough
   - Click "Reset Password"
   - You'll be redirected to login page after successful reset

5. **Back at Login**:
   - Use your new password to login

## Backend Configuration

### Environment Variables

Add these to your .env file in the backend directory:

\\\env
# Email Configuration (for Password Reset)
# For Gmail, use an App Password instead of your regular password
# Generate here: https://myaccount.google.com/apppasswords
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password

# Frontend URL (for reset links in emails)
FRONTEND_URL=http://localhost:3002
\\\

### Setting Up Gmail App Password

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click on "Security" in the left sidebar
3. Under "Your Google Account", click "Security"
4. Enable 2-Step Verification (if not already enabled)
5. Go back to Security and scroll down to "App passwords"
6. Select "Mail" and "Windows Computer"
7. Google will generate a 16-character password
8. Use this password as EMAIL_PASSWORD in your .env file

### Testing Email Functionality

If you haven't configured Gmail credentials yet, the system will log emails to the console instead of sending them:

\\\
Email would be sent with: {
  from: 'noreply@smartreporter.com',
  to: 'user@example.com',
  subject: 'Password Reset Request - SmartReporter',
  html: '...'
}
\\\

This is useful for development and testing.

## Backend API Endpoints

### Forgot Password
- **Endpoint**: POST /api/auth/forgot-password
- **Body**: 
  \\\json
  {
    "email": "user@example.com"
  }
  \\\
- **Response**: 
  \\\json
  {
    "success": true,
    "message": "Password reset link has been sent to your email"
  }
  \\\

### Verify Reset Token
- **Endpoint**: POST /api/auth/verify-reset-token
- **Body**: 
  \\\json
  {
    "resetToken": "token-from-url"
  }
  \\\
- **Response**: 
  \\\json
  {
    "success": true,
    "message": "Reset token is valid"
  }
  \\\

### Reset Password
- **Endpoint**: POST /api/auth/reset-password
- **Body**: 
  \\\json
  {
    "resetToken": "token-from-url",
    "newPassword": "new-password-123"
  }
  \\\
- **Response**: 
  \\\json
  {
    "success": true,
    "message": "Password has been reset successfully"
  }
  \\\

## Database Changes

### User Model Updates

The User model has been updated with two new fields:

- **resetPasswordToken**: Stores the hashed reset token
- **resetPasswordExpires**: Timestamp for when the token expires (1 hour from generation)

### New Method in User Model

- **generatePasswordResetToken()**: Generates a secure reset token and sets expiration

## Security Features

1. **Token Hashing**: Tokens are hashed before storing in database using SHA-256
2. **Token Expiration**: Tokens expire after 1 hour
3. **One-Time Use**: Tokens are cleared after successful password reset
4. **Password Hashing**: New passwords are hashed using bcryptjs with salt
5. **Email Verification**: Reset links are only valid for registered emails
6. **Token Validation**: Token validity is checked both on frontend and backend

## Frontend Routes

- **Forgot Password Page**: /forgot-password
- **Reset Password Page**: /reset-password/:resetToken

## File Changes Summary

### Backend Files
- **Modified**: ackend/src/models/User.js - Added reset token fields and method
- **Modified**: ackend/src/controllers/authController.js - Added three new functions
- **Modified**: ackend/src/routes/authRoutes.js - Added three new endpoints
- **New**: ackend/src/utils/mail.js - Email sending utility
- **Modified**: ackend/.env - Added email configuration
- **Modified**: ackend/package.json - Added nodemailer dependency

### Frontend Files
- **New**: rontend/src/pages/ForgotPasswordPage.js - Forgot password page
- **New**: rontend/src/pages/ResetPasswordPage.js - Reset password page
- **Modified**: rontend/src/pages/AuthPage.js - Added forgot password link
- **Modified**: rontend/src/services/api.js - Added three new API functions
- **Modified**: rontend/src/App.js - Added two new routes

## Testing the Feature

### Development Testing (Without Real Email)

1. Start the backend server
2. Start the frontend server
3. Go to login page
4. Click "Forgot Password?"
5. Enter any email address
6. Check console logs to see the email content that would be sent
7. Copy the reset token from the console
8. Manually navigate to http://localhost:3002/reset-password/{token}
9. Reset your password
10. Login with the new password

### Production Testing (With Real Email)

1. Configure Gmail credentials in .env file
2. Restart backend server
3. Go through the forgot password flow
4. Check your actual email inbox
5. Click the link in the email
6. Reset your password
7. Login with the new password

## Troubleshooting

### Email not being sent

**Issue**: "Failed to send reset email" message

**Solutions**:
1. Check if EMAIL_USER and EMAIL_PASSWORD are configured in .env
2. If using Gmail, ensure you used an App Password (not your regular password)
3. Ensure 2-Step Verification is enabled on your Google Account
4. Check backend console for detailed error messages

### Reset link not working

**Issue**: "Invalid or expired reset token"

**Solutions**:
1. Ensure you're using the complete URL with the token
2. Check if token has expired (1 hour limit)
3. Request a new reset link if token expired

### Token validation failing

**Issue**: Front-end shows "Invalid or expired reset token"

**Solutions**:
1. Clear browser cache and cookies
2. Make sure backend server is running
3. Check MongoDB connection is active

## Future Enhancements

Possible improvements to consider:

1. **Email Templates**: Create custom HTML email templates with branding
2. **Rate Limiting**: Limit password reset attempts per email address
3. **Resend Email**: Add option to resend reset link
4. **SMS Support**: Add SMS-based password reset option
5. **Login History**: Log password reset events for security
6. **Backup Codes**: Generate backup recovery codes for users

## Support

For issues or questions about the password reset feature, please check:

1. Backend console logs for error messages
2. Browser console for frontend errors
3. Email configuration in .env file
4. MongoDB connection status

---

**Last Updated**: December 29, 2025
