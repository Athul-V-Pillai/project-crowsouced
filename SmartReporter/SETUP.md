# SmartReporter Setup & Installation Guide

## Quick Start Guide

This guide will help you set up the complete SmartReporter application from scratch.

## Prerequisites

Ensure you have installed:
- **Node.js** v16+ ([Download](https://nodejs.org/))
- **Python** v3.8+ ([Download](https://python.org/))
- **MongoDB** ([Local](https://docs.mongodb.com/manual/installation/) or [Atlas Cloud](https://www.mongodb.com/cloud/atlas))
- **Git** ([Download](https://git-scm.com/))

## 1️⃣ MongoDB Setup

### Option A: Local MongoDB
```bash
# Windows (with chocolatey)
choco install mongodb-community

# macOS
brew tap mongodb/brew
brew install mongodb-community

# Linux (Ubuntu)
sudo apt-get install -y mongodb
```

### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Add to `.env`: `MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/smartreporter`

## 2️⃣ Cloudinary Setup (Image Upload)

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard and copy:
   - Cloud Name
   - API Key
   - API Secret
3. Add to backend `.env`:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 3️⃣ Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env and configure:
# - MONGODB_URI (local or Atlas)
# - JWT_SECRET (generate a random string)
# - Cloudinary credentials
# - FRONTEND_URL (http://localhost:3000)
```

### Generate a random JWT Secret
```bash
# On Windows PowerShell:
[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).ToString())) | Out-String

# On macOS/Linux:
openssl rand -base64 32
```

### Start Backend Server
```bash
npm run dev
# Server runs on http://localhost:5000
```

## 4️⃣ AI Service Setup (Python)

```bash
cd ai-service

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Download YOLO model (first time only)
python -c "import yolov5; yolov5.load('yolov5s.pt')"

# Create .env file
cp .env.example .env
```

### Start AI Service
```bash
python run.py
# Service runs on http://localhost:5001
```

## 5️⃣ Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and configure:
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_key_if_available
```

### Start Frontend
```bash
npm start
# Application opens at http://localhost:3000
```

## ✅ Testing the Application

### 1. Create a Regular User Account
- Go to http://localhost:3000
- Click "Login" → "Register"
- Fill in name, email, password
- Click "Register"

### 2. Submit a Complaint
- After login, click "Report Issue"
- Click "Get My Location" (allows browser geolocation)
- Select a category
- Upload an image
- Write a description
- Click "Submit Complaint"

### 3. View Complaints List
- Click "Complaints" in navigation
- Use filters (category, status, priority)
- Click "Upvote" to upvote issues

### 4. Create Admin Account (Database)
Open MongoDB and insert admin user:

```javascript
db.users.insertOne({
  name: "Admin User",
  email: "admin@smartreporter.com",
  password: "$2a$10/...",  // hashed password
  role: "admin"
})
```

Or modify your registration to add admin:
1. Register as normal user
2. In MongoDB, update the user: `db.users.updateOne({email: "..."}, {$set: {role: "admin"}})`

### 5. Access Admin Dashboard
- Login as admin user
- Navigate to http://localhost:3000/admin/dashboard
- View statistics and manage complaints

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB service
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Port Already in Use

**Backend (5000):**
```bash
# Kill process using port 5000
# Windows (PowerShell):
Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000 | Select-Object -ExpandProperty OwningProcess)

# macOS/Linux:
lsof -ti:5000 | xargs kill -9
```

**Frontend (3000):**
```bash
# Change port in frontend/.env:
PORT=3001
npm start
```

### CORS Error
- Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check backend is running on port 5000

### Image Upload Fails
- Verify Cloudinary credentials
- Check image file size (max 10MB)
- Ensure internet connection

### AI Service Not Working
- Check Python version: `python --version`
- Reinstall torch: `pip install torch torchvision`
- Ensure backend `AI_SERVICE_URL` matches AI service URL

## 📊 API Testing with Postman

### Create Login Endpoint Test
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Submit Complaint Test
```
POST http://localhost:5000/api/complaints/submit
Authorization: Bearer {your_token}
Content-Type: multipart/form-data

Form Data:
- image: [select file]
- description: "Pothole on Main Street"
- category: "road"
- latitude: 40.7128
- longitude: -74.0060
```

## 🔒 Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use strong database passwords
- [ ] Enable MongoDB authentication
- [ ] Use HTTPS in production
- [ ] Set CORS properly for production domain
- [ ] Hide API keys in environment variables
- [ ] Implement rate limiting
- [ ] Add input validation on backend

## 📱 Environment Variables Summary

**Backend (.env):**
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/smartreporter
JWT_SECRET=your_random_secret_key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
AI_SERVICE_URL=http://localhost:5001
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_key_optional
```

**AI Service (.env):**
```
FLASK_ENV=development
FLASK_PORT=5001
MODEL_PATH=./models/yolov5s.pt
```

## ✨ Next Steps

After setup:
1. Explore the admin dashboard
2. Test image uploads
3. Monitor AI predictions
4. Customize categories in AI service
5. Deploy to production
6. Gather real data from users

## 📞 Need Help?

- Check logs in terminal for specific errors
- Verify all ports are running (5000, 5001, 3000)
- Ensure MongoDB is running
- Check internet connectivity for image downloads
- Review environment variables

---

**Congratulations! Your SmartReporter application is ready! 🎉**
