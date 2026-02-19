# Quick Start - Password Reset Feature

## What's New

 **Forgot Password** - Users can reset forgotten passwords  
 **Email Verification** - Secure token-based reset links  
 **Admin & User Support** - Works for both user and admin accounts  
 **Token Expiration** - 1-hour expiration for security  
 **Password Strength** - Real-time password strength indicator  

## Quick Setup (5 minutes)

### Step 1: No Additional Installation Needed
Nodemailer has already been installed:
\\\ash
npm install nodemailer
\\\

### Step 2: Configure Email (Optional but Recommended)

#### Option A: Use Gmail (Recommended for Testing)

1. Go to [myaccount.google.com](https://myaccount.google.com/)
2. Click "Security"  Enable "2-Step Verification" 
3. Go to "App passwords" → Select "Mail" and "Windows Computer"
4. Copy the 16-character password
5. Update \.env\:
   \\\env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=the-16-char-password-you-copied
   \\\

#### Option B: Test Without Email
Leave email credentials empty and the system will log emails to console.

### Step 3: Restart Backend

\\\ash
cd backend
npm run dev
\\\

### Step 4: Test the Feature

1. **Open Frontend**: http://localhost:3002
2. **Go to Login** or **Home Page**
3. **Click "Forgot Password?"**
4. **Enter email** and submit
5. **Check console** (if testing) or **email inbox** (if configured with Gmail)
6. **Click reset link** or copy token
7. **Reset password** with new secure password
8. **Login** with new password

## What Changed

### Backend Files Modified:
- \src/models/User.js\ - Added reset token fields
- \src/controllers/authController.js\ - Added reset functions
- \src/routes/authRoutes.js\ - Added reset endpoints
- \src/utils/mail.js\ - NEW: Email sending utility
- \.env\ - Added email configuration

### Frontend Files Modified:
- \src/pages/AuthPage.js\ - Added forgot password link
- \src/pages/ForgotPasswordPage.js\ - NEW: Forgot password page
- \src/pages/ResetPasswordPage.js\ - NEW: Reset password page
- \src/services/api.js\ - Added reset API functions
- \src/App.js\ - Added new routes

## API Endpoints

### 1. Forgot Password
\\\
POST /api/auth/forgot-password
Body: { "email": "user@example.com" }
Response: { "success": true, "message": "Email sent..." }
\\\

### 2. Verify Token
\\\
POST /api/auth/verify-reset-token
Body: { "resetToken": "token-from-url" }
Response: { "success": true, "message": "Token valid" }
\\\

### 3. Reset Password
\\\
POST /api/auth/reset-password
Body: { 
  "resetToken": "token-from-url",
  "newPassword": "new-secure-password"
}
Response: { "success": true, "message": "Password reset successfully" }
\\\

## User Flow

### Frontend Routes
- \/forgot-password\ - Forgot password page
- \/reset-password/:resetToken\ - Reset password page

### User Experience
1. User clicks "Forgot Password?" on login
2. Enters email address
3. Gets email with reset link
4. Clicks link (expires in 1 hour)
5. Enters new password with strength indicator
6. Gets redirected to login
7. Logs in with new password

## Security Details

 Tokens are hashed with SHA-256 before storing  
 Tokens expire after 1 hour  
 Each reset invalidates the token  
 Passwords are hashed with bcrypt  
 Backend validates token integrity  

## Troubleshooting

### Email Not Sending?
- Check if EMAIL_USER and EMAIL_PASSWORD are set in .env
- For Gmail, use "App Password" not your regular password
- Check backend console for error messages

### Reset Link Not Working?
- Make sure the URL has the complete token
- Token expires after 1 hour, request new one if needed
- Check backend is running on port 5000

### Token Invalid?
- Clear browser cache
- Request new reset link
- Check backend MongoDB connection

## Testing Without Email Setup

The system will log reset attempts to console:

\\\
Email would be sent with: {
  from: 'noreply@smartreporter.com',
  to: 'test@example.com',
  subject: 'Password Reset Request - SmartReporter',
  html: '...'
}
\\\

You can manually construct the reset URL:
\http://localhost:3002/reset-password/{token}\

## Files Structure

\\\
SmartReporter/
 backend/
    src/
       models/
          User.js (MODIFIED)
       controllers/
          authController.js (MODIFIED)
       routes/
          authRoutes.js (MODIFIED)
       utils/
           mail.js (NEW)
    .env (MODIFIED)

 frontend/
     src/
         pages/
            AuthPage.js (MODIFIED)
            ForgotPasswordPage.js (NEW)
            ResetPasswordPage.js (NEW)
         services/
            api.js (MODIFIED)
         App.js (MODIFIED)
\\\

## FAQ

**Q: Can both admin and user reset password?**  
A: Yes, the reset feature works for both roles.

**Q: How long is the reset token valid?**  
A: 1 hour from generation.

**Q: What if the email is wrong?**  
A: System will return error saying no user found with that email.

**Q: Can I configure my own email service?**  
A: Yes, update \ackend/src/utils/mail.js\ to use your email provider.

**Q: Is the password hashed?**  
A: Yes, using bcrypt with salt rounds of 10.

---

Ready to use! 
