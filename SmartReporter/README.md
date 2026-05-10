# SmartReporter - A Crowdsourced Complaint Resolution System

A complete MERN stack application for reporting and resolving local civic issues through crowdsourcing.

**GitHub Repository:** [https://github.com/Athul-V-Pillai/project-crowsouced](https://github.com/Athul-V-Pillai/project-crowsouced)

## 🚀 Features

### User (Citizen) Module
- ✅ User registration and login with JWT authentication
- ✅ Complaint submission with image upload
- ✅ Auto-detected GPS location capture
- ✅ Manual category selection (road, garbage, water, streetlight)
- ✅ AI-predicted category suggestions
- ✅ View submitted complaints list
- ✅ Track complaint status (Pending, In Progress, Resolved)
- ✅ Upvote complaints to increase priority

### Admin Module
- ✅ Secure admin login
- ✅ Dashboard with statistics:
  - Total complaints count
  - Pending / In Progress / Resolved counts
  - High-priority complaints
  - Complaints by category
- ✅ View complaints on interactive map
- ✅ Update complaint status
- ✅ Assign priority levels
- ✅ View AI classification results
- ✅ Filter complaints by category, location, and status

### Backend
- ✅ RESTful API using Express.js
- ✅ MongoDB integration with Mongoose
- ✅ JWT-based authentication
- ✅ Cloudinary image upload
- ✅ AI microservice integration
- ✅ Role-based access control

### AI Microservice
- ✅ Flask API for image classification
- ✅ YOLO model for object detection
- ✅ Issue category prediction
- ✅ Confidence scoring

## 📋 Project Structure

```
SmartReporter/
├── frontend/                 # React.js application
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── context/          # Auth context
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env.example
│
├── backend/                  # Node.js + Express API
│   ├── src/
│   │   ├── controllers/      # Business logic
│   │   ├── middleware/       # Auth & error handling
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Helper functions
│   │   └── index.js          # Server entry point
│   ├── package.json
│   └── .env.example
│
└── ai-service/               # Flask + YOLO service
    ├── app/
    │   ├── __init__.py
    │   ├── model.py          # YOLO model logic
    │   └── routes.py         # Flask routes
    ├── requirements.txt
    ├── run.py
    └── .env.example
```

## 🛠 Tech Stack

### Frontend
- React.js 18
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- React Toastify for notifications
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcryptjs for password hashing
- Cloudinary for image storage
- Axios for HTTP requests

### AI Service
- Python Flask / FastAPI
- YOLOv5 for object detection
- PyTorch
- OpenCV
- Requests library

## 🏗️ Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                   Frontend Layer                            │
│              React 18 + Tailwind CSS                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Pages: Home, Auth, Submit, List, Admin, Map        │  │
│  │  Components: Modal, Cards, Forms, Charts            │  │
│  │  Context: Auth, State Management                    │  │
│  │  Services: API Client (Axios)                       │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────┬──────────────────────────────────────────────┘
               │ REST API (JSON)
               │ HTTPS/CORS
               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Backend Layer                               │
│           Node.js + Express.js                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Routes:                                             │  │
│  │  ├─ /api/auth        (Registration, Login)          │  │
│  │  ├─ /api/complaints  (CRUD operations)              │  │
│  │  └─ /api/admin       (Admin operations)             │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Controllers:                                        │  │
│  │  ├─ authController   (User authentication)          │  │
│  │  ├─ complaintController (Complaint management)      │  │
│  │  └─ adminController  (Admin functions)              │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Middleware:                                         │  │
│  │  ├─ auth.js         (JWT verification)              │  │
│  │  └─ errorHandler.js (Error handling)                │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Utilities:                                          │  │
│  │  ├─ cloudinary.js   (Image upload)                  │  │
│  │  ├─ jwt.js          (Token generation)              │  │
│  │  ├─ mail.js         (Email service)                 │  │
│  │  └─ complaintMail.js (Notification emails)          │  │
│  └──────────────────────────────────────────────────────┘  │
└──────┬──────────────────┬──────────────────┬────────────────┘
       │                  │                  │
       ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   MongoDB    │  │   Cloudinary     │  │  FastAPI / Flask │
│    Atlas     │  │  (Image Hosting) │  │  (AI Service)    │
│              │  │                  │  │                  │
│ Collections: │  │ - Image Upload   │  │ - YOLO Model     │
│ - Users      │  │ - URL Storage    │  │ - Detection      │
│ - Complaints │  │ - Optimization   │  │ - Classification │
│ - Upvotes    │  │ - CDN Delivery   │  │ - Confidence     │
└──────────────┘  └──────────────────┘  └──────────────────┘
```

### Three-Tier Architecture

```
┌─────────────────────────────────────────────────────────┐
│         PRESENTATION LAYER (Frontend)                  │
│  - React Components                                     │
│  - User Interface                                       │
│  - Client-side Routing                                 │
│  - State Management (Context API)                      │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/REST API
                     ▼
┌─────────────────────────────────────────────────────────┐
│       BUSINESS LOGIC LAYER (Backend)                   │
│  - Express Routes & Controllers                        │
│  - Authentication & Authorization                      │
│  - Data Validation & Processing                        │
│  - Microservice Orchestration                          │
│  - Email & Notification Services                       │
└────────────────────┬────────────────────────────────────┘
                     │
         ┌───────────┼───────────┐
         ▼           ▼           ▼
    ┌─────────┐ ┌──────────┐ ┌────────┐
    │ MongoDB │ │Cloudinary│ │FastAPI │
    │ (Data)  │ │(Storage) │ │(AI/ML) │
    └─────────┘ └──────────┘ └────────┘
```

### Component Relationships

```
User (Frontend)
     │
     ├─→ AuthPage ────→ authController ─→ User Model ─→ MongoDB
     │
     ├─→ SubmitComplaintPage
     │        │
     │        ├─→ complaintController ─→ Complaint Model ─→ MongoDB
     │        ├─→ Cloudinary ─→ Image Storage
     │        └─→ AI Service (FastAPI/Flask) ─→ YOLO Detection
     │
     ├─→ ComplaintsListPage ─→ Get all complaints ─→ MongoDB
     │        │
     │        └─→ Upvote System ─→ Upvote Model ─→ MongoDB
     │
     └─→ AdminDashboard
              │
              ├─→ adminController
              ├─→ Dashboard Stats
              ├─→ User Management
              ├─→ Map Visualization
              └─→ Complaint Resolution

Admin
     │
     └─→ Admin Login ─→ adminController ─→ RBAC Check ─→ Admin Dashboard
```

### Data Flow Diagram

```
1. USER SUBMITS COMPLAINT
   ┌──────────┐
   │  Browser │
   └─────┬────┘
         │ Form Data + Image
         ▼
   ┌──────────────┐
   │   Frontend   │
   └─────┬────────┘
         │ POST /api/complaints/submit
         ▼
   ┌──────────────┐
   │   Backend    │
   └─────┬────────┘
         │
         ├─→ Upload Image ─→ Cloudinary ─→ Get URL
         │
         ├─→ Call AI Service ─→ FastAPI/Flask ─→ YOLO ─→ Detections
         │
         └─→ Save Complaint ─→ MongoDB (with AI results)
              │
              └─→ Send Email Notification ─→ Gmail SMTP

2. ADMIN VIEWS DASHBOARD
   ┌──────────┐
   │  Browser │
   └─────┬────┘
         │ GET /api/admin/dashboard/stats
         ▼
   ┌──────────────┐
   │   Backend    │
   └─────┬────────┘
         │
         └─→ Query MongoDB ─→ Return Stats & Recent Complaints
              │
              └─→ Display on AdminDashboard

3. AI IMAGE PROCESSING
   ┌──────────────┐
   │   Image URL  │
   └─────┬────────┘
         │
         ▼
   ┌──────────────┐
   │  Cloudinary  │ ◄─── Fetches image
   └─────┬────────┘
         │
         ▼
   ┌──────────────┐
   │  FastAPI     │
   │  ┌────────┐  │
   │  │ YOLO   │  │ ◄─── Loads pretrained model
   │  │ Model  │  │
   │  └────┬───┘  │
   │       │      │
   │  ┌────▼────┐ │
   │  │Inference│ │ ◄─── Detects objects
   │  └────┬────┘ │
   │       │      │
   │  ┌────▼────────────┐ │
   │  │Process Image &  │ │
   │  │Extract Results  │ │
   │  └────┬────────────┘ │
   └─────┬─┘
         │
         ▼
   ┌──────────────────────┐
   │ Return Detection JSON│
   │ - Category           │
   │ - Confidence Score   │
   │ - Bounding Boxes     │
   │ - Processed Image    │
   └──────────────────────┘
```

### Technology Stack Interaction

```
                    ┌─────────────────┐
                    │  Google Colab   │
                    │  (Optional GPU) │
                    └────────┬────────┘
                             │
                             ▼
    ┌────────────────────────────────────────────┐
    │          Frontend (React 18)                │
    │  HTML5 │ CSS3 │ JavaScript │ Tailwind CSS │
    │          Axios │ React Router │ Context API│
    └────────┬────────────────────────────────────┘
             │
    ┌────────▼────────────────────────────────────┐
    │      Backend (Node.js + Express)            │
    │  JavaScript │ ES6+ │ Middleware Pattern     │
    │  JWT │ Bcryptjs │ Mongoose │ Cors          │
    └────────┬────────────────────────────────────┘
             │
    ┌────────┴───────────┬──────────────┬────────────┐
    │                    │              │            │
    ▼                    ▼              ▼            ▼
┌─────────┐        ┌──────────┐  ┌──────────┐  ┌──────────┐
│MongoDB  │        │Cloudinary│  │Gmail     │  │FastAPI   │
│NoSQL DB │        │Image CDN │  │SMTP      │  │AI Model  │
│Atlas    │        │Storage   │  │Email     │  │YOLO v5   │
└─────────┘        └──────────┘  └──────────┘  └──────────┘
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- MongoDB (local or Atlas)
- Cloudinary account
- Google Maps API key (optional)

### 1. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Configure .env with your credentials:
# - MONGODB_URI
# - JWT_SECRET
# - CLOUDINARY credentials
# - AI_SERVICE_URL
```

**Start backend:**
```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

### 2. AI Service Setup

```bash
cd ai-service
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# First time: Download YOLO model
python -c "import yolov5; yolov5.load('yolov5s.pt')"
```

**Start AI service:**
```bash
python run.py
```

AI Service runs on: `http://localhost:5001`

### 3. Frontend Setup

```bash
cd frontend
npm install

# Create .env file
cp .env.example .env

# Configure .env with:
# - REACT_APP_API_URL=http://localhost:5000/api
# - REACT_APP_GOOGLE_MAPS_API_KEY (optional)
```

**Start frontend:**
```bash
npm start
```

Frontend runs on: `http://localhost:3000`

## 📡 API Endpoints

### Auth Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /me` - Get current user (protected)

### Complaint Routes (`/api/complaints`)
- `POST /submit` - Submit complaint (protected)
- `GET /` - Get all complaints with filters
- `GET /:id` - Get complaint by ID
- `POST /upvote` - Upvote complaint (protected)
- `GET /my-complaints` - Get user's complaints (protected)
- `PUT /:id/status` - Update complaint status (admin only)

### Admin Routes (`/api/admin`)
- `GET /dashboard/stats` - Dashboard statistics (admin only)
- `GET /map` - Get complaints for map view (admin only)
- `POST /assign` - Assign complaint (admin only)
- `GET /users` - Get all users (admin only)

## 🗄 Database Schema

### User Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'user' | 'admin',
  avatar: String,
  phone: String,
  timestamps
}
```

### Complaint Collection
```javascript
{
  userId: ObjectId (ref: User),
  imageUrl: String,
  description: String,
  category: 'road' | 'garbage' | 'water' | 'streetlight' | 'other',
  aiCategory: String,
  aiConfidence: Number (0-1),
  location: { type: 'Point', coordinates: [lng, lat] },
  latitude: Number,
  longitude: Number,
  status: 'pending' | 'in-progress' | 'resolved',
  priority: 'low' | 'medium' | 'high',
  upvotes: Number,
  assignedTo: ObjectId (ref: User),
  resolutionNote: String,
  timestamps
}
```

### Upvote Collection
```javascript
{
  userId: ObjectId (ref: User),
  complaintId: ObjectId (ref: Complaint),
  timestamps
}
```

## 🔐 Authentication

- JWT tokens stored in localStorage
- Token sent in Authorization header: `Bearer <token>`
- Token expiration: 7 days (configurable)
- Password hashing using bcryptjs (10 salt rounds)

## 🎨 Frontend Pages

1. **HomePage** (`/`)
   - Hero section with features
   - Navigation bar
   - Quick access buttons

2. **AuthPage** (`/auth`)
   - Login and Registration forms
   - Toggle between login/register

3. **SubmitComplaintPage** (`/submit`)
   - Image upload
   - Location capture
   - Category selection
   - Description field

4. **ComplaintsListPage** (`/complaints`)
   - Filter by category, status, priority
   - Display complaints in card grid
   - Upvote functionality

5. **AdminDashboard** (`/admin/dashboard`)
   - Statistics cards
   - Complaints table
   - Update complaint modal
   - User management

## 🤖 AI Service

### Predict Endpoint

**Request:**
```bash
POST /predict
Content-Type: application/json

{
  "imageUrl": "https://..."
}
```

**Response:**
```json
{
  "success": true,
  "category": "road",
  "confidence": 0.92,
  "detected_objects": [
    {
      "object": "pothole",
      "confidence": 0.95
    }
  ]
}
```

### Categories Mapped
- Pothole, Crack → `road`
- Debris, Trash, Litter → `garbage`
- Water Leak → `water`
- Damaged Light → `streetlight`
- Others → `other`

## 🌍 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/smartreporter
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
AI_SERVICE_URL=http://localhost:5001
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### AI Service (.env)
```
FLASK_ENV=development
FLASK_PORT=5001
MODEL_PATH=./models/yolov5s.pt
```

## 📦 Dependencies

### Backend
- express: Web framework
- mongoose: MongoDB ODM
- jsonwebtoken: JWT authentication
- bcryptjs: Password hashing
- cloudinary: Image storage
- axios: HTTP client
- cors: CORS handling
- express-fileupload: File upload handling

### Frontend
- react: UI library
- react-router-dom: Routing
- axios: HTTP client
- tailwindcss: Styling
- react-toastify: Notifications
- react-icons: Icon library

### AI Service
- Flask: Web framework
- torch: Deep learning
- yolov5: Object detection
- opencv: Image processing
- requests: HTTP client

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Upload build folder to Vercel/Netlify
```

### Backend (Heroku/AWS/DigitalOcean)
```bash
# Set environment variables
heroku config:set MONGODB_URI=...
heroku config:set JWT_SECRET=...

# Deploy
git push heroku main
```

### AI Service (Heroku/AWS)
```bash
# Deploy Flask app
# Configure Procfile: web: gunicorn -w 4 -b 0.0.0.0:$PORT run:app
```

## 📚 Additional Features to Add

- Real-time notifications with WebSockets
- Email notifications for status updates
- Google Maps integration for better visualization
- Image gallery for complaints
- Comments/discussion on complaints
- User rating/reputation system
- Advanced analytics and reporting
- Mobile app (React Native)
- Push notifications
- Payment integration for donations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License - Feel free to use this project for educational and commercial purposes.

## 📞 Support

For issues or questions, please create an issue on GitHub or contact the development team.

---

**Built with ❤️ for community-driven civic improvement**
