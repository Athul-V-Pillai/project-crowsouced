#!/bin/bash
# Email Configuration Checker for SmartReporter

echo "================================"
echo "📧 Email Configuration Status"
echo "================================"
echo ""

# Check if .env exists
if [ ! -f "backend/.env" ]; then
    echo "❌ .env file not found!"
    exit 1
fi

# Read .env file
source backend/.env

echo "Current Configuration:"
echo "====================="

# Check EMAIL_USER
if [ -z "$EMAIL_USER" ]; then
    echo "❌ EMAIL_USER: Not set"
elif [ "$EMAIL_USER" = "your-email@gmail.com" ]; then
    echo "⚠️  EMAIL_USER: Placeholder value (not configured)"
else
    # Mask email for security
    MASKED_EMAIL=$(echo $EMAIL_USER | sed 's/\(.\{2\}\).*/\1**@gmail.com/')
    echo "✅ EMAIL_USER: $MASKED_EMAIL"
fi

# Check EMAIL_PASSWORD
if [ -z "$EMAIL_PASSWORD" ]; then
    echo "❌ EMAIL_PASSWORD: Not set"
elif [ "$EMAIL_PASSWORD" = "your-app-specific-password" ]; then
    echo "⚠️  EMAIL_PASSWORD: Placeholder value (not configured)"
else
    echo "✅ EMAIL_PASSWORD: ••••••••••••••••"
fi

# Check FRONTEND_URL
if [ -z "$FRONTEND_URL" ]; then
    echo "⚠️  FRONTEND_URL: Not set (using default: http://localhost:3000)"
else
    echo "✅ FRONTEND_URL: $FRONTEND_URL"
fi

echo ""
echo "Status:"
echo "======="

if [ "$EMAIL_USER" != "your-email@gmail.com" ] && [ -n "$EMAIL_USER" ] && [ "$EMAIL_PASSWORD" != "your-app-specific-password" ] && [ -n "$EMAIL_PASSWORD" ]; then
    echo "✅ EMAIL SYSTEM: READY TO SEND EMAILS"
    echo ""
    echo "Emails will be sent via Gmail SMTP when:"
    echo "- Admin updates complaint status"
    echo "- Admin adds resolution notes"
else
    echo "⚠️  EMAIL SYSTEM: TEST MODE (emails logged to console)"
    echo ""
    echo "To enable real emails:"
    echo "1. Configure EMAIL_USER and EMAIL_PASSWORD in .env"
    echo "2. Restart backend: npm start"
    echo "3. See QUICK_EMAIL_FIX.md for detailed instructions"
fi

echo ""
echo "================================"
