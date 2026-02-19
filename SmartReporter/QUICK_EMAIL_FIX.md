# 📧 Email Configuration - Step by Step

## Why You're Not Getting Emails

Your `.env` file has **placeholder values**:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

With placeholders, the system runs in **TEST MODE** - emails are logged to console, not sent.

---

## ✅ Fix: Add Real Gmail Credentials

### Step 1: Enable Gmail 2-Factor Authentication
1. Go to https://myaccount.google.com
2. Click **"Security"** in left menu
3. Scroll down to "How you sign in to Google"
4. Click **"2-Step Verification"**
5. Follow the steps to enable

### Step 2: Create App Password
1. Go to https://myaccount.google.com/apppasswords
2. At the top, select:
   - App: **Mail**
   - Device: **Windows Computer**
3. Click **"Generate"**
4. Google will show a 16-character password (with spaces)
5. **Copy this password** exactly as shown

Example: `abcd efgh ijkl mnop`

### Step 3: Update `.env` File

Open: `backend/.env`

Find these lines:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

Replace with:
```
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

**Example**:
```
EMAIL_USER=john.doe@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

### Step 4: Save and Restart Backend

Save the `.env` file, then:
```bash
cd SmartReporter/backend
npm start
```

---

## 🧪 Test It

### 1. Update Any Complaint in Admin Dashboard
- Go to admin dashboard
- Click on any complaint
- Update status → "Resolved"
- Add admin note: "Issue has been fixed"
- Click "Update"

### 2. Check Email
User should receive email within 1-2 minutes.

### 3. Check Server Logs
If email doesn't arrive:
```
Look for in server logs:
✅ "Email notification result: { success: true }"
❌ "Email send error: [error message]"
```

---

## 🔍 Troubleshooting

### Problem: Email still not sending
**Solution**: 
1. Verify `.env` has **real** credentials
2. Check Gmail 2-Step Verification is **enabled**
3. Check password is **16 characters with spaces**
4. Restart backend after updating `.env`

### Problem: Gmail Says "Less Secure App"
**Solution**: This is normal. The message means:
- App passwords bypass some security checks
- This is the **correct and secure way** to do it
- Click "Allow" if prompted

### Problem: Wrong email address in database
**Solution**:
1. Check complaint owner's email is correct
2. Update in admin panel if needed
3. Try updating complaint again

---

## 📧 What Happens After Setup

When admin updates complaint:

1. ✅ Complaint status changes
2. ✅ System gets user's email
3. ✅ Sends beautiful HTML email
4. ✅ User receives in inbox within 1-2 min

Email includes:
- Complaint status
- Category
- Priority
- Admin's notes
- Direct link to complaint

---

## 📋 Configuration Checklist

- [ ] Gmail 2-Step Verification enabled
- [ ] App password generated (16 chars)
- [ ] `.env` updated with real credentials
- [ ] Backend restarted
- [ ] Test complaint updated
- [ ] Check email received

---

## ⚡ Quick Reference

| Item | Value |
|------|-------|
| Email Service | Gmail SMTP |
| App Password Length | 16 characters + spaces |
| Email Send Time | 1-2 minutes |
| Test Mode Log | Server console |

---

## 🚀 Ready to Use!

After configuration:
1. Admin updates complaint
2. Email automatically sent
3. User notified instantly
4. System continues working

No additional setup needed!
