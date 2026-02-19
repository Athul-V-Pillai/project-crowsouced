# SmartReporter - Integration Guide

## Complete Integration Checklist

This guide helps you integrate all services and test the complete MERN stack application.

## Phase 1: Initial Setup (Pre-Integration)

### Step 1: Verify All Services Can Start

```bash
# Terminal 1 - Backend
cd SmartReporter/backend
npm install
npm run dev
# Expected: Server running on port 5000

# Terminal 2 - AI Service
cd SmartReporter/ai-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
# Expected: Flask running on port 5001

# Terminal 3 - Frontend
cd SmartReporter/frontend
npm install
npm start
# Expected: React app opens on port 3000
```

## Phase 2: Backend & Database Integration

### Step 2: Configure Database

**Option A: Local MongoDB**
```bash
# Start MongoDB service
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Verify connection
mongo --eval "db.adminCommand('ping')"
```

**Option B: MongoDB Atlas**
```
1. Create cluster on mongodb.com/cloud/atlas
2. Get connection string
3. Add to backend/.env:
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/smartreporter
```

### Step 3: Configure Backend .env

Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/smartreporter
JWT_SECRET=your_random_secret_key_here_minimum_32_chars
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
AI_SERVICE_URL=http://localhost:5001
FRONTEND_URL=http://localhost:3000
```

### Step 4: Test Backend Endpoints

```bash
# Health check
curl http://localhost:5000/api/health

# Response should be:
# {"success":true,"message":"Server is running"}
```

## Phase 3: Frontend & Backend Integration

### Step 5: Configure Frontend .env

Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=optional_key
```

### Step 6: Test Frontend to Backend Communication

**Test 1: User Registration**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'

# Success response:
# {
#   "success": true,
#   "message": "User registered successfully",
#   "token": "eyJ...",
#   "user": {...}
# }
```

**Test 2: Frontend Login**
1. Open http://localhost:3000
2. Click "Login" → "Register"
3. Fill: Name, Email, Password
4. Click "Register"
5. Should redirect to home page with user profile

## Phase 4: Image Upload & Cloudinary Integration

### Step 7: Configure Cloudinary

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Copy credentials from Dashboard:
   - Cloud Name
   - API Key
   - API Secret
3. Add to `backend/.env`

### Step 8: Test Image Upload

**Via Frontend:**
1. Login to application
2. Click "Report Issue"
3. Select image from your computer
4. Image should upload successfully
5. Check console for Cloudinary URL

**Via API:**
```bash
# Create a FormData with image file
curl -X POST http://localhost:5000/api/complaints/submit \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@path/to/image.jpg" \
  -F "description=Test complaint" \
  -F "category=road" \
  -F "latitude=40.7128" \
  -F "longitude=-74.0060"
```

## Phase 5: AI Service Integration

### Step 9: Configure AI Service

1. Verify `ai-service/.env`:
```env
FLASK_ENV=development
FLASK_PORT=5001
MODEL_PATH=./models/yolov5s.pt
```

2. Download YOLO model (first time):
```bash
cd ai-service
python -c "import yolov5; yolov5.load('yolov5s.pt')"
```

### Step 10: Test AI Service

**Health Check:**
```bash
curl http://localhost:5001/health

# Response:
# {
#   "success": true,
#   "message": "AI Service is running"
# }
```

**Prediction Test:**
```bash
curl -X POST http://localhost:5001/predict \
  -H "Content-Type: application/json" \
  -d '{
    "imageUrl": "https://example.com/image.jpg"
  }'

# Response:
# {
#   "success": true,
#   "category": "road",
#   "confidence": 0.92,
#   "detected_objects": [...]
# }
```

### Step 11: Backend to AI Service Integration

Verify the backend `complaintController.js` makes request to AI service:

1. Submit complaint with image
2. Backend calls: `AI_SERVICE_URL/predict`
3. AI returns category & confidence
4. Backend saves as `aiCategory` & `aiConfidence`
5. Frontend can display AI prediction

## Phase 6: Admin Features Integration

### Step 12: Create Admin User

**Via MongoDB:**
```javascript
// Open MongoDB client
use smartreporter
db.users.updateOne(
  {email: "your_email@example.com"},
  {$set: {role: "admin"}}
)
```

**Or via API + Database:**
1. Register user through frontend
2. Update user role in MongoDB
3. Login again with admin account

### Step 13: Test Admin Dashboard

1. Login as admin user
2. Navigate to http://localhost:3000/admin/dashboard
3. Should see:
   - Total complaints count
   - Pending/In Progress/Resolved counts
   - Complaints table
   - Update complaint modal

### Step 14: Test Admin Features

**Update Complaint Status:**
1. Click "Update" on any complaint
2. Change status to "in-progress"
3. Set priority to "high"
4. Add resolution note
5. Click "Update"
6. Complaint should be updated in table

## Phase 7: Complete Workflow Testing

### End-to-End Test: Complete Complaint Lifecycle

```
1. USER CREATES ACCOUNT
   → Go to /auth
   → Click Register
   → Fill form & register
   → Login

2. USER SUBMITS COMPLAINT
   → Go to /submit
   → Click "Get My Location"
   → Select image
   → Choose category
   → Write description
   → Submit
   → Should see "Complaint submitted successfully"

3. AI PROCESSES IMAGE
   → Backend calls AI service
   → AI returns category & confidence
   → Saved in database

4. COMPLAINT APPEARS IN LIST
   → Go to /complaints
   → Filter by category
   → See new complaint
   → Click upvote
   → Complaint upvotes increment

5. ADMIN MANAGES COMPLAINT
   → Login as admin
   → Go to /admin/dashboard
   → See complaint in table
   → Click Update
   → Change status to "in-progress"
   → Add note
   → Save

6. USER SEES UPDATE
   → Logout & login as user
   → Go to /complaints
   → See complaint status changed
   → See priority updated
```

## Phase 8: Verification Checklist

### Database
- [ ] MongoDB running
- [ ] Collections exist (users, complaints, upvotes)
- [ ] Sample data created

### Backend
- [ ] Server starts on port 5000
- [ ] Database connected
- [ ] API responds to requests
- [ ] JWT authentication works
- [ ] Cloudinary integration works

### AI Service
- [ ] Flask app starts on port 5001
- [ ] YOLO model loads
- [ ] /predict endpoint works
- [ ] Backend can call AI service

### Frontend
- [ ] App starts on port 3000
- [ ] Login/Register works
- [ ] API calls succeed
- [ ] Images upload
- [ ] Navigation works
- [ ] Admin dashboard accessible

## Common Integration Issues & Solutions

### Issue: CORS Error When Frontend Calls Backend

**Symptom:**
```
Access to XMLHttpRequest at 'http://localhost:5000/api/...' 
from origin 'http://localhost:3000' blocked by CORS policy
```

**Solution:**
1. Check backend `.env`: `FRONTEND_URL=http://localhost:3000`
2. Verify backend CORS config in `index.js`:
   ```javascript
   app.use(cors({
     origin: process.env.FRONTEND_URL,
     credentials: true
   }));
   ```
3. Restart backend server

### Issue: Image Upload Fails

**Symptom:**
```
Failed to upload image
or
413 Payload Too Large
```

**Solutions:**
1. Check image file size < 10MB
2. Verify Cloudinary credentials in `.env`
3. Check internet connection
4. Verify backend is running

### Issue: AI Service Unavailable

**Symptom:**
```
AI Service unavailable, proceeding without AI classification
```

**Solutions:**
1. Check Python Flask is running: `python run.py`
2. Verify port 5001 is open
3. Check `AI_SERVICE_URL` in backend `.env`
4. Verify Python dependencies: `pip install -r requirements.txt`

### Issue: MongoDB Connection Error

**Symptom:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**
1. Start MongoDB service (see Phase 2)
2. Check MongoDB is listening on port 27017
3. If using Atlas, verify connection string in `.env`
4. Check firewall rules

### Issue: JWT Token Invalid

**Symptom:**
```
Invalid token or No token provided
```

**Solutions:**
1. Ensure JWT_SECRET is set in `.env`
2. Token should be sent in header: `Authorization: Bearer TOKEN`
3. Clear localStorage in browser and login again
4. Check token hasn't expired

## Performance Verification

### Frontend Performance
```bash
cd frontend
npm run build
# Check build size (should be < 200KB for main bundle)
npx analyze # if available
```

### Backend Performance
- Response time < 500ms for GET requests
- Image upload < 5s for typical images
- AI prediction < 10s

### Database Performance
- Create index on frequently queried fields
- Check MongoDB explain() for query performance

## Security Verification

- [ ] JWT secret is strong (32+ characters)
- [ ] Passwords are hashed (bcrypt 10 rounds)
- [ ] CORS restricted to frontend URL
- [ ] API validates all inputs
- [ ] Error messages don't expose internal details
- [ ] Environment variables are not committed to git

## Data Flow Diagram

```
┌─────────────┐
│  Frontend   │
│  (React)    │
└──────┬──────┘
       │ HTTP/JSON
       ▼
┌──────────────────────┐
│   Backend API        │
│   (Express)          │────────┐
└──────┬───────────────┘        │
       │                        │
       ▼                        ▼
┌──────────────┐        ┌──────────────┐
│   MongoDB    │        │ AI Service   │
│  (Database)  │        │ (Flask/YOLO) │
└──────────────┘        └──────────────┘
                               │
                               ▼
                        ┌──────────────┐
                        │  Cloudinary  │
                        │ (Image CDN)  │
                        └──────────────┘
```

## Deployment Checklist

### Pre-Deployment
- [ ] All environment variables configured
- [ ] Database backups in place
- [ ] API tested thoroughly
- [ ] Frontend build optimized
- [ ] Error handling tested

### Deployment
- [ ] Frontend deployed (Vercel/Netlify)
- [ ] Backend deployed (Heroku/AWS)
- [ ] AI service deployed
- [ ] Database migrated
- [ ] DNS configured
- [ ] SSL certificates installed

### Post-Deployment
- [ ] Health checks configured
- [ ] Monitoring set up
- [ ] Error tracking enabled
- [ ] User testing completed

## Next Steps After Integration

1. **Add More Features**
   - Real-time notifications
   - Email alerts
   - Advanced filtering
   - User profiles

2. **Optimize Performance**
   - Enable caching
   - Optimize database queries
   - Compress images
   - Add CDN

3. **Improve Security**
   - Rate limiting
   - Input sanitization
   - API key rotation
   - Security headers

4. **Monitor & Scale**
   - Set up logging
   - Monitor performance
   - Plan for scaling
   - Gather user feedback

---

**Once all phases are complete, you have a fully integrated MERN stack application ready for production! 🚀**
