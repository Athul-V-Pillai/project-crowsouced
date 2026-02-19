# Email Notification System Setup

## Overview
The SmartReporter system now sends automatic email notifications to users when their complaints are updated by admins.

## Features
✅ Automatic email notifications when complaint status is updated  
✅ Beautiful HTML email templates  
✅ Status-based color coding  
✅ Admin notes included in email  
✅ Direct link to complaint details  
✅ Graceful fallback to test mode if email credentials not configured  

## Email Notification Triggers
Emails are sent automatically when:
- Admin updates complaint status (pending → in progress → resolved/rejected)
- Admin adds resolution notes
- Admin changes priority level
- Admin assigns complaint to a staff member

## Configuration

### Step 1: Enable Gmail SMTP
1. Go to [Google Account](https://myaccount.google.com/)
2. Click "Security" in the left sidebar
3. Enable "2-Step Verification"
4. Create an "App Password":
   - Go to Security → App passwords (requires 2FA)
   - Select "Mail" and "Windows Computer"
   - Copy the generated 16-character password

### Step 2: Update .env File
Add these environment variables to your `.env` file:

```env
# Email Configuration
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-password-16-chars
FRONTEND_URL=http://localhost:3000  # For development

# Production
# FRONTEND_URL=https://your-domain.com
```

### Step 3: Test Mode (No Configuration Needed)
If you don't configure email credentials, the system runs in **test mode**:
- Emails are logged to console instead of sent
- Perfect for development and testing
- No email setup required

Example console output in test mode:
```
Email would be sent with: {
  from: 'noreply@smartreporter.com',
  to: 'user@example.com',
  subject: 'Complaint Update: Road - Status: Resolved',
  html: '...'
}
```

## Email Template
The email includes:
- **Complaint ID** - Unique identifier for the complaint
- **Category** - Type of issue (road, garbage, water, streetlight, other)
- **Status** - Color-coded current status
- **Priority** - High, Medium, Low
- **Admin Note** - Resolution details from admin
- **Direct Link** - Button to view full complaint details

## How It Works

### 1. Admin Updates Complaint
Admin navigates to complaint details and updates:
```
Status: pending → resolved
Priority: high
Resolution Note: "Pothole has been filled. Road condition improved."
```

### 2. System Automatically Sends Email
The backend automatically:
- Retrieves user email from complaint record
- Generates beautiful HTML email
- Sends via Gmail SMTP
- Logs success/failure

### 3. User Receives Notification
User receives email with:
- Status update with color indicator
- Admin's resolution notes
- Link to view details
- Professional formatting

## API Response
When updating a complaint:
```javascript
POST /api/admin/complaints/:id/status
{
  "status": "resolved",
  "priority": "high",
  "resolutionNote": "Issue has been resolved successfully"
}

// Response
{
  "success": true,
  "message": "Complaint updated successfully and user notified",
  "complaint": { ... }
}
```

## Error Handling
If email sending fails:
- System logs the error
- Complaint update completes normally
- User is still notified through the app
- No email = no blocker to complaint resolution

## Testing

### Option A: Use Test Credentials
For Gmail testing without credentials setup:
```bash
# The system will automatically use test mode
# Check console for email log output
```

### Option B: Use Test Email Service
Consider using free services for development:
- **Mailtrap** - mailtrap.io
- **SendGrid** - sendgrid.com (free tier)
- **Ethereal** - nodemailer.com/smtp/ethereal/

### Option C: Test with Your Gmail
```bash
# In .env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
```

## Environment Variables Reference

| Variable | Required | Example | Purpose |
|----------|----------|---------|---------|
| EMAIL_USER | No | gmail@example.com | Gmail address for sending |
| EMAIL_PASSWORD | No | abcd efgh ijkl mnop | Gmail app password |
| FRONTEND_URL | No | http://localhost:3000 | URL for complaint links in email |

## Troubleshooting

### Emails Not Sending
1. Check if `EMAIL_USER` and `EMAIL_PASSWORD` are set in `.env`
2. Verify Gmail credentials are correct
3. Check "Less secure app access" is enabled
4. Verify 2-Step Verification is enabled on Gmail

### Check Test Mode
If `EMAIL_USER` is not set:
- System runs in test mode
- Emails are logged to console
- Check server logs for email output

### Gmail App Password Issues
- Ensure 2-Step Verification is enabled first
- Only works with personal Gmail accounts (not Workspace)
- Password is 16 characters with spaces

## Files Modified/Created

- ✅ `/backend/src/utils/complaintMail.js` - Email notification system
- ✅ `/backend/src/controllers/complaintController.js` - Updated to send emails
- ✅ `.env` - Add email configuration

## Next Steps
1. Configure Gmail SMTP credentials in `.env`
2. Test by updating a complaint in admin dashboard
3. Check user's inbox for notification email
4. Verify email content and formatting

## Support
For issues or questions about email notifications, check:
- Backend logs for error messages
- Gmail account security settings
- Spam folder for test emails
