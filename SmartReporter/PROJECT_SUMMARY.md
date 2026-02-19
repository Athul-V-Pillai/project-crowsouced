# SmartReporter - Project Summary

## Overview
SmartReporter is a complete MERN stack web application that enables citizens to crowdsource complaint resolution for civic issues. The platform uses AI for automatic issue classification and provides admin dashboards for complaint management.

## Technology Stack

### Frontend
- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Toastify** - Notifications

### Backend
- **Node.js + Express** - Server framework
- **MongoDB + Mongoose** - Database
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **Bcryptjs** - Password encryption

### AI Service
- **Python Flask** - Web framework
- **YOLOv5** - Object detection
- **PyTorch** - Deep learning
- **OpenCV** - Image processing

## Project Files Overview

### Backend Structure
```
backend/
├── src/
│   ├── controllers/        # Business logic for routes
│   │   ├── authController.js       # Auth operations
│   │   ├── complaintController.js  # Complaint operations
│   │   └── adminController.js      # Admin operations
│   ├── middleware/
│   │   ├── auth.js                 # JWT verification & role check
│   │   └── errorHandler.js         # Global error handler
│   ├── models/
│   │   ├── User.js                 # User schema with password hashing
│   │   ├── Complaint.js            # Complaint schema with geospatial indexing
│   │   └── Upvote.js               # Upvote schema with unique constraint
│   ├── routes/
│   │   ├── authRoutes.js           # Auth endpoints
│   │   ├── complaintRoutes.js      # Complaint endpoints
│   │   └── adminRoutes.js          # Admin endpoints
│   ├── utils/
│   │   ├── cloudinary.js           # Image upload utility
│   │   └── jwt.js                  # JWT utilities
│   └── index.js                    # Server entry point
├── package.json
├── .env.example
└── Dockerfile
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.js       # Route protection wrapper
│   ├── context/
│   │   └── AuthContext.js          # Global auth state
│   ├── pages/
│   │   ├── HomePage.js             # Landing page with features
│   │   ├── AuthPage.js             # Login/Register form
│   │   ├── SubmitComplaintPage.js  # Complaint submission form
│   │   ├── ComplaintsListPage.js   # Complaints list with filters
│   │   └── AdminDashboard.js       # Admin statistics & management
│   ├── services/
│   │   └── api.js                  # API calls configuration
│   ├── App.js                      # Router setup
│   └── index.js                    # React entry point
├── package.json
├── tailwind.config.js
├── .env.example
└── Dockerfile.dev
```

### AI Service Structure
```
ai-service/
├── app/
│   ├── __init__.py
│   ├── model.py                    # YOLO model loading & prediction
│   └── routes.py                   # Flask API endpoints
├── run.py                          # Flask server entry
├── requirements.txt                # Python dependencies
├── .env.example
└── Dockerfile
```

## Key Features Implementation

### 1. Authentication
- JWT token generation on login/register
- Token stored in localStorage
- Auto-refresh user data on page load
- Protected routes require valid token
- Admin routes check user role

### 2. Complaint Submission
- Image upload to Cloudinary
- Automatic GPS location detection
- Category selection (5 categories)
- AI classification (async call to Flask service)
- Mongoose schema with geospatial index

### 3. Complaint Management
- Filter by category, status, priority
- Pagination with configurable limit
- Upvote system with duplicate prevention
- Status tracking (pending → in-progress → resolved)
- Priority assignment (low, medium, high)

### 4. Admin Dashboard
- Real-time statistics aggregation
- Geospatial queries for map view
- Bulk complaint management
- User list view
- Complaint assignment to admins

### 5. AI Classification
- YOLOv5 model for object detection
- Custom category mapping
- Confidence scoring
- HTTP integration with backend
- Fallback if service unavailable

## API Endpoints Summary

### Auth (/api/auth)
- `POST /register` - Create user account
- `POST /login` - Authenticate user
- `GET /me` - Get current user profile

### Complaints (/api/complaints)
- `POST /submit` - Submit new complaint
- `GET /` - Get all complaints
- `GET /:id` - Get single complaint
- `POST /upvote` - Upvote complaint
- `GET /my-complaints` - Get user's complaints
- `PUT /:id/status` - Update complaint (admin)

### Admin (/api/admin)
- `GET /dashboard/stats` - Dashboard statistics
- `GET /map` - Complaints geospatial data
- `POST /assign` - Assign complaint to admin
- `GET /users` - Get all users

## Database Schema Highlights

### User
- Email unique & indexed
- Password hashed with bcrypt (10 rounds)
- Role-based access (user/admin)

### Complaint
- GeoJSON location with 2dsphere index
- AI category & confidence fields
- Status & priority enums
- Reference to User & Admin
- Denormalized upvote count

### Upvote
- Composite unique index (userId, complaintId)
- Prevents duplicate upvotes

## Security Features

1. **Password Security**
   - Bcrypt hashing with 10 salt rounds
   - Passwords never returned in responses
   - Password validation on login

2. **API Security**
   - JWT token validation on protected routes
   - Role-based access control
   - CORS enabled for frontend only
   - Error messages don't expose internal details

3. **Image Security**
   - File type validation
   - Size limits (10MB)
   - Cloudinary secure URLs

4. **Data Validation**
   - Email format validation
   - Enum validation for categories/status
   - Coordinate bounds checking
   - Request body validation

## Deployment Considerations

### Frontend
- Build for production: `npm run build`
- Deploy to Vercel/Netlify/AWS
- Environment variables via .env

### Backend
- Use environment variables in production
- Set NODE_ENV=production
- Use connection pooling for MongoDB
- Enable HTTPS
- Set secure JWT secret

### AI Service
- Use Gunicorn for production
- Set FLASK_ENV=production
- Consider model caching
- Monitor inference time

### Docker Deployment
- All services included in docker-compose.yml
- Volume mapping for MongoDB persistence
- Network isolation between services

## Testing Workflow

1. **Create User Account**
   - Register with email/password
   - Login to get JWT token

2. **Submit Complaint**
   - Allow location access
   - Upload image (auto-classified)
   - Select category
   - Submit

3. **View Complaints**
   - Browse list with filters
   - Upvote interesting complaints
   - View individual details

4. **Admin Operations**
   - Login as admin
   - View dashboard stats
   - Update complaint status
   - Assign priority/admin

## Performance Optimization

1. **Frontend**
   - React Router for code splitting
   - Lazy loading components
   - Image optimization via Cloudinary

2. **Backend**
   - Mongoose indexing on frequently queried fields
   - Pagination to limit response size
   - Connection pooling

3. **AI Service**
   - Model loaded once on startup
   - Batch processing support
   - Confidence threshold optimization

## Future Enhancement Ideas

- Real-time notifications (WebSockets)
- Email alerts for status changes
- Google Maps integration
- Image gallery for complaints
- Discussion/comments feature
- User reputation system
- Advanced analytics
- Mobile app (React Native)
- Push notifications
- Payment integration

## Getting Help

- Check SETUP.md for installation
- Review API_DOCS.md for endpoints
- Run COMMANDS.md for helpful commands
- Check .env.example for configuration
- Review error messages in browser console/server logs

---

**Project Status:** Complete MERN stack with all core features implemented ✅
