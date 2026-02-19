# SmartReporter - Important Notes & Dependencies

## 📌 Critical Information

### API Keys & Credentials Required

#### 1. **Cloudinary** (Image Hosting)
- **Purpose:** Store complaint images
- **Get Keys:** https://cloudinary.com
- **Required Fields:**
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
- **Cost:** Free tier available (25GB/month)

#### 2. **MongoDB** (Database)
- **Purpose:** Store users, complaints, upvotes
- **Options:**
  - Local: Download from mongodb.com
  - Cloud: https://cloud.mongodb.com (free tier)
- **Connection String:** Added to `MONGODB_URI` env variable
- **Cost:** Free tier available (512MB storage)

#### 3. **Google Maps API** (Optional)
- **Purpose:** Display complaint locations on map
- **Get Key:** https://console.cloud.google.com
- **Cost:** Free tier with billing limit
- **Note:** Not required for basic functionality

### JWT Configuration

**Generate Secure JWT Secret:**
```bash
# Windows PowerShell
[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).ToString())) | Out-String

# macOS/Linux
openssl rand -base64 32
```

**Requirements:**
- Minimum 32 characters
- Store securely in `.env`
- Never commit to git
- Rotate in production

## 🔧 Dependencies Summary

### Backend Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.18.2 | Web framework |
| mongoose | ^7.0.0 | MongoDB ODM |
| jsonwebtoken | ^9.0.0 | JWT authentication |
| bcryptjs | ^2.4.3 | Password hashing |
| cloudinary | ^1.32.0 | Image upload |
| express-fileupload | ^1.4.0 | File handling |
| axios | ^1.3.0 | HTTP requests |
| cors | ^2.8.5 | CORS handling |
| dotenv | ^16.0.3 | Environment variables |

### Frontend Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.2.0 | UI framework |
| react-dom | ^18.2.0 | React rendering |
| react-router-dom | ^6.11.0 | Routing |
| axios | ^1.3.0 | HTTP client |
| tailwindcss | ^3.3.0 | CSS framework |
| postcss | ^8.4.24 | CSS processing |
| autoprefixer | ^10.4.14 | CSS prefixes |
| react-icons | ^4.8.0 | Icon library |
| react-toastify | ^9.1.2 | Notifications |

### AI Service Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| Flask | 2.3.0 | Web framework |
| torch | 2.0.0 | Deep learning |
| torchvision | 0.15.0 | Vision models |
| yolov5 | 7.0.0 | Object detection |
| opencv-python | 4.7.0 | Image processing |
| requests | 2.31.0 | HTTP requests |
| python-dotenv | 1.0.0 | Environment variables |
| Pillow | 9.5.0 | Image handling |

## ⚙️ Environment Variables Reference

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/smartreporter
# Or for Atlas: mongodb+srv://user:pass@cluster.mongodb.net/smartreporter

# Authentication
JWT_SECRET=your_secure_random_string_minimum_32_chars
JWT_EXPIRE=7d

# Image Hosting
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# AI Service
AI_SERVICE_URL=http://localhost:5001
AI_SERVICE_TIMEOUT=30000

# Frontend CORS
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
# Backend API
REACT_APP_API_URL=http://localhost:5000/api

# Google Maps (Optional)
REACT_APP_GOOGLE_MAPS_API_KEY=your_optional_key
```

### AI Service (.env)
```env
# Flask Configuration
FLASK_ENV=development
FLASK_PORT=5001

# YOLO Model Path
MODEL_PATH=./models/yolov5s.pt
```

## 📊 Database Schema Quick Reference

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'user' | 'admin',
  avatar: String | null,
  phone: String | null,
  createdAt: Date,
  updatedAt: Date
}
```

### Complaints Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  imageUrl: String,
  description: String,
  category: 'road' | 'garbage' | 'water' | 'streetlight' | 'other',
  aiCategory: String | null,
  aiConfidence: Number (0-1) | null,
  location: { type: 'Point', coordinates: [lng, lat] },
  latitude: Number,
  longitude: Number,
  status: 'pending' | 'in-progress' | 'resolved',
  priority: 'low' | 'medium' | 'high',
  upvotes: Number,
  assignedTo: ObjectId (ref: User) | null,
  resolutionNote: String | null,
  createdAt: Date,
  updatedAt: Date
}
```

### Upvotes Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  complaintId: ObjectId (ref: Complaint),
  createdAt: Date,
  updatedAt: Date
  // Unique index: { userId: 1, complaintId: 1 }
}
```

## 🔐 Security Considerations

### Password Security
- ✅ Bcrypt hashing with 10 salt rounds
- ✅ Passwords never returned in responses
- ✅ Passwords not shown in logs
- ⚠️ Minimum 6 characters (enforce 8+ in production)

### API Security
- ✅ JWT token validation on protected routes
- ✅ Role-based access control
- ✅ CORS restricted to frontend URL
- ⚠️ Add rate limiting in production
- ⚠️ Add input sanitization
- ⚠️ Add security headers (helmet.js)

### Image Security
- ✅ File type validation (only images)
- ✅ Size limits (10MB)
- ✅ Cloudinary secure URLs
- ⚠️ Implement virus scanning for large deployments

### Data Security
- ✅ No sensitive data in logs
- ✅ Environment variables for credentials
- ⚠️ Enable MongoDB authentication
- ⚠️ Use HTTPS in production
- ⚠️ Implement data encryption at rest

## 🎯 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {...}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": {} // Only in development
}
```

## 📱 HTTP Status Codes

| Code | Meaning | Use Case |
|------|---------|----------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Internal error |

## 🚀 Performance Tips

### Frontend Optimization
```javascript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(Component);

// Use useCallback to memoize functions
const handleSubmit = useCallback(() => {...}, [deps]);

// Use useMemo for expensive computations
const expensiveValue = useMemo(() => compute(), [deps]);

// Lazy load routes
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
```

### Backend Optimization
```javascript
// Use indexing for frequently queried fields
userSchema.index({ email: 1 });
complaintSchema.index({ userId: 1, createdAt: -1 });

// Use pagination
const skip = (page - 1) * limit;
const data = await Model.find().skip(skip).limit(limit);

// Use lean() for read-only queries
const data = await Model.find().lean();

// Select only needed fields
const data = await Model.find().select('field1 field2');
```

### Database Optimization
```javascript
// Create indexes on commonly queried fields
db.complaints.createIndex({ userId: 1 })
db.complaints.createIndex({ category: 1 })
db.complaints.createIndex({ status: 1 })

// Use explain() to analyze queries
db.complaints.find({category: 'road'}).explain("executionStats")

// Archive old data
// Move complaints > 1 year old to archive collection
```

## 📝 Git Ignore Rules

```
node_modules/
__pycache__/
.env
.env.local
.DS_Store
build/
dist/
*.log
.coverage
venv/
```

## 🐛 Common Errors & Solutions

### "Cannot find module 'express'"
```bash
# Solution
npm install
```

### "MongoError: connect ECONNREFUSED"
```bash
# Start MongoDB
mongod  # or: net start MongoDB (Windows)
```

### "CORS error"
```
# Check backend .env has correct FRONTEND_URL
FRONTEND_URL=http://localhost:3000
```

### "Cloudinary error"
```
# Verify in backend .env:
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### "AI Service not responding"
```
# Check Flask is running
python run.py

# Check port 5001 is open
# Check backend AI_SERVICE_URL is correct
```

## 📚 Useful Resources

- **Express.js:** https://expressjs.com
- **MongoDB:** https://docs.mongodb.com
- **React:** https://react.dev
- **Mongoose:** https://mongoosejs.com
- **JWT:** https://jwt.io
- **Tailwind CSS:** https://tailwindcss.com
- **YOLOv5:** https://github.com/ultralytics/yolov5
- **Cloudinary:** https://cloudinary.com/documentation

## 🎓 Learning Resources

### For Backend Development
- Node.js official docs: https://nodejs.org/docs
- Express tutorial: https://expressjs.com/en/starter/installing.html
- Mongoose guide: https://mongoosejs.com/docs/guide.html
- JWT tutorial: https://auth0.com/learn/json-web-tokens

### For Frontend Development
- React documentation: https://react.dev
- Tailwind CSS guide: https://tailwindcss.com/docs
- React Router: https://reactrouter.com
- Axios: https://axios-http.com

### For AI/ML
- YOLO: https://github.com/ultralytics/yolov5
- PyTorch: https://pytorch.org
- OpenCV: https://docs.opencv.org

## 📞 Support & Troubleshooting

### Where to Look for Help
1. **Error Message** → Search terminal/console
2. **API Issue** → Check API_DOCS.md
3. **Setup Issue** → Check SETUP.md
4. **Integration Issue** → Check INTEGRATION_GUIDE.md
5. **Code Issue** → Review comments in source files

### How to Debug
1. Check console.log messages
2. Use DevTools in browser (F12)
3. Check MongoDB directly
4. Test API with Postman/curl
5. Check server logs

## ⚡ Quick Start Command

```bash
# All in one (requires 3 terminals)

# Terminal 1
cd backend && npm install && npm run dev

# Terminal 2
cd ai-service && pip install -r requirements.txt && python run.py

# Terminal 3
cd frontend && npm install && npm start
```

---

**Last Updated:** January 2024
**Version:** 1.0.0
**Status:** Production Ready ✅
