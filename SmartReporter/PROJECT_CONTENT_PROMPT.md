# SmartReporter - Complete Project Content Prompt

## 📋 PROJECT OVERVIEW

**SmartReporter** is a comprehensive crowdsourced civic issue resolution platform that empowers citizens to report local problems with visual evidence and enables administrators to manage and resolve issues efficiently using AI-powered classification.

**Purpose:** Streamline complaint reporting, automatic categorization, and efficient issue resolution through community participation and AI assistance.

**Live User Journey:** Report Issue → AI Analysis → Admin Review → Resolution → Community Tracking

---

## 🎯 PROJECT OBJECTIVES

1. **Empower Citizens** - Easy complaint reporting with multimedia support
2. **Leverage AI** - Automatic issue classification and detection
3. **Efficient Admin Management** - Dashboard for monitoring and resolution
4. **Community Engagement** - Upvote system for crowdsourced prioritization
5. **Transparency** - Track complaint status from submission to resolution
6. **Scalability** - Handle high volume of reports with microservices

---

## 📦 COMPLETE FEATURE SET

### USER (CITIZEN) FEATURES

#### Authentication & Profile
- ✅ User Registration with email & password
- ✅ Login with JWT token authentication
- ✅ Password reset via OTP verification
- ✅ Profile management (name, email update)
- ✅ Account security (password hashing with bcryptjs)
- ✅ Session persistence (localStorage)
- ✅ Auto-login on page refresh

#### Complaint Submission
- ✅ Multi-step complaint form
- ✅ Real-time camera capture (getUserMedia API)
- ✅ Photo upload from device
- ✅ Image preview with retake option
- ✅ Multiple image support
- ✅ Cloudinary integration for image hosting
- ✅ Drag-and-drop upload zone

#### Category Selection & AI Suggestions
- ✅ 5 predefined categories (Road, Garbage, Water, Streetlight, Other)
- ✅ AI-powered category suggestions (YOLO-based)
- ✅ Confidence score display (0-100%)
- ✅ Manual category override
- ✅ Category icons for quick identification

#### Location Services
- ✅ Auto-detect geolocation (GPS/Network)
- ✅ Manual latitude/longitude entry
- ✅ Location accuracy reporting
- ✅ GeoJSON storage for map queries
- ✅ Map preview of selected location
- ✅ Error handling for permission denial

#### Complaint Tracking
- ✅ View all submitted complaints
- ✅ Filter by status (Pending, In Progress, Resolved)
- ✅ Filter by category
- ✅ Search complaints
- ✅ Sort by date, popularity
- ✅ View complaint details with full history
- ✅ Track status changes in real-time

#### Upvote System
- ✅ Upvote complaints to increase priority
- ✅ Upvote counter display
- ✅ Prevent duplicate upvotes (unique constraint)
- ✅ Priority indicator (High/Medium/Low based on upvotes)
- ✅ Visual feedback on upvote action
- ✅ Used by admin for prioritization

#### Complaint Management
- ✅ Edit own complaints (only pending status)
- ✅ Delete own complaints (soft delete)
- ✅ View complaint details
- ✅ Export complaint reference number
- ✅ Share complaint link
- ✅ Print complaint details

#### Notifications & Feedback
- ✅ Toast notifications for all actions
- ✅ Success messages (green)
- ✅ Error messages with suggestions (red)
- ✅ Info messages (blue)
- ✅ Warning messages (yellow)
- ✅ Email notifications for status updates

---

### ADMIN FEATURES

#### Authentication
- ✅ Separate admin login portal
- ✅ JWT-based admin authentication
- ✅ Role-based access control (RBAC)
- ✅ Session management
- ✅ Logout functionality

#### Dashboard Analytics
- ✅ Total complaints count (with trend)
- ✅ Pending complaints count
- ✅ In-progress complaints count
- ✅ Resolved complaints count
- ✅ High-priority complaints indicator
- ✅ Category breakdown chart
- ✅ Complaint trend over time
- ✅ Statistics cards with icons & colors

#### Complaint Management
- ✅ View all complaints in table format
- ✅ Sort by: High Upvotes, Recent, Oldest
- ✅ Filter by category, status, priority
- ✅ Search complaints by ID or description
- ✅ Pagination (configurable per page)
- ✅ Bulk select complaints
- ✅ Bulk action operations

#### Complaint Operations
- ✅ Update complaint status (Pending → In Progress → Resolved)
- ✅ Change priority level (Low → Medium → High)
- ✅ Assign complaint to specific admin
- ✅ Add resolution notes
- ✅ View original image
- ✅ View AI-processed image with detections
- ✅ View ML confidence scores
- ✅ Delete complaints (archive functionality)

#### Image & ML Analysis
- ✅ View original complaint images
- ✅ View YOLO-processed images
- ✅ Display bounding boxes on objects
- ✅ Show detected object labels
- ✅ Display confidence percentages
- ✅ Zoom & pan images
- ✅ Full-screen image viewer

#### Location Management
- ✅ View complaint locations on interactive map
- ✅ Pin placement by GPS coordinates
- ✅ Pin colors by category
- ✅ Pin size by priority
- ✅ Cluster pins in high-density areas
- ✅ Filter by location area
- ✅ Zoom to complaint location
- ✅ View location details

#### User Management
- ✅ View all registered users
- ✅ Display user profile (name, email, join date)
- ✅ Search users by name/email
- ✅ View user complaint history
- ✅ Ban users (permanent account lock)
- ✅ Suspend users (24-hour temporary lock)
- ✅ Auto-unsuspend after 24 hours
- ✅ Provide ban/suspension reasons
- ✅ Unlock banned/suspended users
- ✅ Delete user accounts (with data cleanup)

#### Admin Dashboard Navigation
- ✅ Sidebar navigation with collapse
- ✅ Quick access buttons
- ✅ Admin-only menu items
- ✅ Logout button
- ✅ Settings access
- ✅ Help & documentation links

---

## 🏗️ APPLICATION STRUCTURE

### FRONTEND (React 18 + Tailwind CSS)

#### Pages (10 Pages)

**1. HomePage.js**
- Landing page with hero section
- Features showcase (3 columns)
- Call-to-action buttons
- Navigation header
- Footer with links
- Responsive design
- Admin login option

**2. AuthPage.js**
- Combined login/register form
- Toggle between modes
- Email & password inputs
- Form validation
- Error message display
- Remember me option
- Forgot password link
- Responsive form layout

**3. SubmitComplaintPage.js**
- Multi-section form:
  - Issue details (description, category)
  - Image upload (camera/device)
  - Location (auto/manual)
- Camera modal with preview
- Image preview gallery
- Form validation
- Loading state
- Success confirmation
- Error handling
- Progress indicator

**4. ComplaintsListPage.js**
- Complaint cards grid (2-column)
- Filter bar (category, status)
- Sort options
- Search functionality
- Pagination controls
- Complaint card with:
  - Image preview
  - Status badge
  - Priority indicator
  - Location display
  - Date
  - Upvotes counter
  - Upvote button
- Empty state message
- Responsive layout

**5. UserComplaints.js (My Complaints)**
- User's complaint dashboard
- Statistics cards (Total, Pending, Resolved)
- Complaints list/grid
- Filter by status, category
- Edit button (pending only)
- Delete button
- View details button
- Pagination
- Empty state

**6. AdminDashboard.js**
- Statistics grid (4 cards)
- Recent complaints table
- Sort button dropdown
- Sortable columns
- Row selection
- Action buttons (Update, Images, Location, Delete)
- Pagination
- Responsive table
- Status badges
- Priority indicators
- Upvotes display

**7. UserManagement.js**
- User data table
- Columns: Avatar, Name, Email, Role, Status, Actions
- Search & filter
- Ban/Suspend actions
- Delete user
- View user details
- Bulk actions
- Pagination

**8. AdminMapView.js**
- Full-screen interactive map
- Complaint pins
- Pin filtering by category
- Pin color coding
- Zoom controls
- Legend
- Details popup on pin click
- Responsive map layout

**9. ForgotPasswordPage.js**
- Email input
- Send reset link button
- Success message
- Resend option

**10. ResetPasswordPage.js**
- OTP input verification
- New password input
- Confirm password input
- Password requirements
- Submit button
- Success confirmation

#### Components (Reusable)

**AdminLoginModal.js**
- Modal dialog for admin login
- Email & password fields
- Login button
- Close button
- Backdrop overlay
- Form validation
- Error handling

**ProtectedRoute.js**
- Route protection wrapper
- Check authentication
- Check user role
- Redirect to login if unauthorized
- Nested route rendering

**EditComplaintModal.js**
- Modal for editing complaints
- Pre-filled form fields
- Description textarea
- Category dropdown
- Update button
- Cancel button
- Success notification
- Error handling

#### Context & State Management

**AuthContext.js**
- Global authentication state
- User object (id, name, email, role)
- Login/Register functions
- Logout function
- isAuthenticated flag
- User role detection
- Token management
- useAuth custom hook

#### Services & API

**api.js**
- Axios instance configuration
- Base URL setup
- JWT token interceptor
- Request/response handling

**API Endpoints Used:**
```
Auth:
- POST /auth/register
- POST /auth/login
- POST /auth/forgot-password
- POST /auth/verify-otp
- POST /auth/reset-password
- GET /auth/me

Complaints:
- POST /complaints/submit
- GET /complaints
- GET /complaints/:id
- PUT /complaints/:id
- DELETE /complaints/:id
- POST /complaints/upvote
- GET /complaints/my-complaints
- POST /complaints/:id/send-appreciation

Admin:
- GET /admin/dashboard/stats
- GET /admin/complaints
- PUT /admin/complaints/:id/status
- DELETE /admin/complaints/:id
- GET /admin/map
- POST /admin/assign
- GET /admin/users
- PUT /admin/users/:id
- DELETE /admin/users/:id
- POST /admin/users/:id/ban
- POST /admin/users/:id/suspend
- POST /admin/users/:id/unsuspend
```

#### Styling & UI

**Tailwind CSS**
- Responsive breakpoints (mobile, tablet, desktop)
- Color system (blue, green, red, yellow, purple)
- Spacing & padding
- Border radius & shadows
- Typography hierarchy
- Animations & transitions
- Grid & flexbox layouts

**React Icons**
- FiBarChart2 (stats)
- FiCheckCircle (success)
- FiClock (pending)
- FiAlertCircle (warning)
- FiThumbsUp (upvote)
- FiMapPin (location)
- FiCalendar (date)
- FiEdit2 (edit)
- FiTrash2 (delete)
- FiMap (map view)

---

### BACKEND (Node.js + Express)

#### Models (Database Schemas)

**User Model**
```
Fields:
- _id (ObjectId)
- name (String)
- email (String, unique)
- password (String, hashed)
- role (String: "user" | "admin")
- status (String: "active" | "banned" | "suspended")
- bannedReason (String)
- bannedAt (Date)
- suspensionExpiresAt (Date)
- createdAt (Date)
- updatedAt (Date)

Indexes:
- email (unique)
- role
```

**Complaint Model**
```
Fields:
- _id (ObjectId)
- userId (ObjectId, ref: User)
- imageUrl (String, Cloudinary URL)
- description (String)
- category (String: "road" | "garbage" | "water" | "streetlight" | "other")
- aiCategory (String)
- aiConfidence (Number: 0-1)
- mlImage (String, processed image)
- mlResult (String, detection results)
- location (GeoJSON Point)
- latitude (Number)
- longitude (Number)
- status (String: "pending" | "in-progress" | "resolved")
- priority (String: "low" | "medium" | "high")
- upvotes (Number)
- assignedTo (ObjectId, ref: User)
- resolutionNote (String)
- deletedByUser (Boolean)
- archivedByAdmin (Boolean)
- createdAt (Date)
- updatedAt (Date)

Indexes:
- userId
- status
- category
- priority
- location (2dsphere for geospatial)
- createdAt
```

**Upvote Model**
```
Fields:
- _id (ObjectId)
- complaintId (ObjectId, ref: Complaint)
- userId (ObjectId, ref: User)
- createdAt (Date)

Indexes:
- complaintId, userId (unique compound)
```

#### Controllers (Business Logic)

**authController.js**
- register() - User registration
- login() - User login with JWT
- getCurrentUser() - Get logged-in user info
- forgotPassword() - Send OTP to email
- verifyOTP() - Verify OTP code
- resetPassword() - Reset password with OTP

**complaintController.js**
- submitComplaint() - Create new complaint
  - Validates input
  - Checks user status (ban/suspend)
  - Uploads to Cloudinary
  - Calls AI service
  - Saves to MongoDB
- getComplaints() - Get all complaints (paginated, filtered)
  - Excludes admin-archived
- getComplaintById() - Get single complaint details
- getMyComplaints() - Get user's complaints
  - Excludes user-deleted
- updateComplaint() - User edits their complaint
- deleteComplaint() - User archives complaint
- upvoteComplaint() - Add upvote to complaint
- updateComplaintStatus() - Admin updates status

**adminController.js**
- getDashboardStats() - Get statistics
  - Total, pending, in-progress, resolved counts
- getComplaints() - Get all complaints for admin
- updateComplaintStatus() - Change status/priority/notes
- deleteComplaint() - Admin archives complaint
  - If user also deleted: permanent delete
- getComplaintsOnMap() - Get complaints for map view
- getAllUsers() - Get all users list
- updateUser() - Update user info
- deleteUser() - Delete user account
- banUser() - Ban user permanently
- suspendUser() - Suspend user for 24 hours
- unsuspendUser() - Lift suspension
- assignComplaint() - Assign to admin

#### Routes

**authRoutes.js**
```
POST /auth/register
POST /auth/login
GET /auth/me
POST /auth/forgot-password
POST /auth/verify-otp
POST /auth/reset-password
```

**complaintRoutes.js**
```
POST /complaints/submit
GET /complaints
GET /complaints/:id
GET /complaints/my-complaints
PUT /complaints/:id
DELETE /complaints/:id
POST /complaints/upvote
```

**adminRoutes.js**
```
GET /admin/dashboard/stats
GET /admin/complaints
GET /admin/map
PUT /admin/complaints/:id/status
DELETE /admin/complaints/:id
POST /admin/assign
GET /admin/users
PUT /admin/users/:id
DELETE /admin/users/:id
POST /admin/users/:id/ban
POST /admin/users/:id/suspend
POST /admin/users/:id/unsuspend
```

#### Middleware

**auth.js**
- verifyToken() - JWT verification
- isAdmin() - Role checking
- Role-based access control

**errorHandler.js**
- Global error handling
- Error logging
- Response formatting
- Status code assignment

#### Utilities

**cloudinary.js**
- uploadToCloudinary() - Upload image to Cloudinary
- Delete images
- Get image URL
- Configure Cloudinary API

**jwt.js**
- generateToken() - Create JWT token
- verifyToken() - Validate JWT
- Token expiration handling

**complaintMail.js**
- sendComplaintReceivedEmail() - Confirmation email
- sendComplaintUpdateEmail() - Status update email
- sendComplaintAppreciationEmail() - Appreciation email
- HTML email templates

**mail.js**
- Nodemailer configuration
- Email sending
- Gmail SMTP setup

---

### AI SERVICE (Python Flask + YOLO)

#### Model Architecture

**YOLO v5 Integration**
- Pre-trained YOLOv5 model
- 80 COCO dataset classes
- Object detection & bounding boxes
- Confidence scoring (0-1)
- Real-time inference

#### Routes

**routes.py**
```
POST /predict
├─ Input: Image file
├─ Processing: YOLO inference
├─ Output: JSON with detections
└─ Response: 
    {
      "status": "success",
      "detections": [...],
      "confidence": 0.95,
      "processed_image": "base64",
      "category": "road_damage"
    }
```

#### Processing Pipeline

**Image Processing**
1. Receive image from backend
2. Validate format (JPG, PNG)
3. Resize to YOLO input size
4. Normalize pixel values
5. Run YOLO inference
6. Extract bounding boxes
7. Get confidence scores
8. Map to categories
9. Generate processed image
10. Return results

**Category Mapping**
- Road: Pothole, Crack, Debris
- Garbage: Trash, Waste, Litter
- Water: Leak, Flood, Blockage
- Streetlight: Broken, Malfunction, Dark
- Other: Miscellaneous issues

#### Flask Configuration
- Host: 0.0.0.0
- Port: 5000
- CORS enabled
- Request size limit
- Timeout handling
- Error responses

---

## 🗄️ DATABASE DESIGN

### MongoDB Collections

```
Users Collection
├─ Indexes: email, role
├─ Constraints: unique email, password hashing
└─ Relations: Complaints, Upvotes

Complaints Collection
├─ Indexes: userId, status, category, location (2dsphere)
├─ Constraints: category enum, status enum
├─ Geospatial: GeoJSON Point for map queries
└─ Relations: User (ref), Upvotes, Images

Upvotes Collection
├─ Indexes: complaintId, userId (compound unique)
├─ Constraints: unique per user per complaint
└─ Relations: Complaint, User
```

### Data Relationships

```
User (1) ──→ (Many) Complaints
  └─ One user can submit multiple complaints
  
User (1) ──→ (Many) Upvotes
  └─ One user can upvote multiple complaints

Complaint (1) ──→ (Many) Upvotes
  └─ One complaint can have many upvotes

Admin (1) ──→ (Many) Complaints (assigned)
  └─ One admin can manage multiple complaints
```

---

## 🔐 SECURITY FEATURES

### Authentication & Authorization
- ✅ JWT token-based authentication
- ✅ Password hashing (bcryptjs with salt rounds)
- ✅ Role-based access control (RBAC)
- ✅ Token expiration (24 hours)
- ✅ Refresh token mechanism
- ✅ Protected routes verification

### Data Protection
- ✅ Input validation & sanitization
- ✅ SQL injection prevention (MongoDB parameterized queries)
- ✅ XSS protection (React auto-escaping)
- ✅ CORS configuration
- ✅ Rate limiting on API endpoints
- ✅ File upload validation (type, size)

### User Management Security
- ✅ Ban/Suspend system
- ✅ Account lockout protection
- ✅ Secure password reset (OTP-based)
- ✅ Email verification
- ✅ Session management

---

## 📊 API RESPONSE FORMATS

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "...",
    "field": "value"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Error details"
}
```

### Pagination Response
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

---

## 🎨 UI/UX ELEMENTS

### Visual Hierarchy
- **Primary Colors:** Blue (#1E40AF) for main actions
- **Success Colors:** Green (#16A34A) for resolved
- **Warning Colors:** Yellow (#EAB308) for in-progress
- **Danger Colors:** Red (#DC2626) for pending/errors
- **Neutral Colors:** Gray scale for backgrounds

### Interactive Elements
- Buttons (Primary, Secondary, Ghost, Danger)
- Input fields with validation
- Dropdowns & selects
- Modals & dialogs
- Toast notifications
- Loading spinners
- Progress bars
- Badges & tags
- Icons from React Icons

### Responsive Design
- Mobile-first approach
- Breakpoints: 320px, 768px, 1024px, 1440px
- Flexible grid layouts
- Touch-friendly buttons (48px minimum)
- Full-width forms on mobile
- Collapsible sidebars

---

## 🚀 DEPLOYMENT & DEVOPS

### Containerization
- Docker for frontend, backend, AI service
- docker-compose for orchestration
- Volume mounting for data persistence
- Environment variable configuration
- Multi-stage builds for optimization

### Environment Management
```
Development
├─ Local React dev server
├─ Local Node.js server
├─ Local MongoDB
└─ Local Flask AI service

Staging
├─ Docker containers
├─ Cloud database
├─ Test AI service
└─ Pre-production testing

Production
├─ Optimized Docker images
├─ Cloud hosting (AWS/GCP/Azure)
├─ Managed database
├─ Scaled AI service
└─ CDN for static assets
```

### Performance Optimization
- Code splitting in React
- Lazy loading components
- Image optimization (Cloudinary)
- Database indexing
- Query optimization
- Caching strategies
- Minification & compression

---

## 📈 SCALABILITY CONSIDERATIONS

### Backend Scalability
- Stateless API design
- Horizontal scaling with load balancing
- Database connection pooling
- Caching layer (Redis)
- Asynchronous job processing (Bull/RabbitMQ)
- CDN for static assets

### AI Service Scalability
- Containerized microservice
- Independent scaling
- Async processing queue
- Model serving (TensorFlow Serving)
- GPU acceleration support
- Rate limiting & throttling

### Frontend Scalability
- Lazy loading routes
- Code splitting
- Service worker caching
- Progressive Web App (PWA)
- Static site generation options

---

## 🧪 TESTING STRATEGY

### Unit Tests
- Component tests (React)
- Controller tests (Express)
- Model tests (Mongoose)
- Utility function tests

### Integration Tests
- API endpoint tests
- Database integration
- Authentication flow
- Image upload process

### E2E Tests
- Complete user workflows
- Admin operations
- Error scenarios
- Cross-browser testing

### Manual Testing
- UI/UX verification
- Mobile responsiveness
- Performance testing
- Security testing

---

## 📚 DOCUMENTATION INCLUDED

1. **README.md** - Project overview & setup
2. **SETUP.md** - Installation instructions
3. **API_DOCS.md** - API endpoint documentation
4. **INTEGRATION_GUIDE.md** - Integration instructions
5. **TROUBLESHOOTING.md** - Common issues & solutions
6. **LOCATION_DEBUGGING.md** - Geolocation debugging
7. **PASSWORD_RESET_FLOW.txt** - Password reset process
8. **QUICK_REFERENCE.md** - Quick command reference
9. **PROJECT_MANIFEST.md** - Complete manifest
10. **FIGMA_DESIGN_PROMPT.md** - Design system specification
11. **METHODOLOGY_SLIDES.md** - Development methodology

---

## 🎓 LEARNING OUTCOMES

From building SmartReporter, you'll learn:

✅ Full-stack MERN development
✅ AI/ML integration in web apps
✅ Geospatial database queries
✅ Microservices architecture
✅ Authentication & authorization
✅ Image processing & hosting
✅ Docker containerization
✅ REST API design
✅ React state management
✅ Real-time notifications
✅ Map integration
✅ Email services
✅ File upload handling
✅ Database schema design
✅ Deployment strategies

---

## 🏆 PROJECT HIGHLIGHTS

1. **AI Integration** - YOLO object detection for automatic categorization
2. **Geospatial Features** - GPS tracking and map visualization
3. **User Management** - Ban/suspend system with auto-unsuspend
4. **Community Engagement** - Upvote system for crowdsourced prioritization
5. **Real-time Updates** - Toast notifications for user feedback
6. **Admin Dashboard** - Comprehensive analytics and management
7. **Image Processing** - Both original and AI-processed display
8. **Responsive Design** - Mobile, tablet, desktop support
9. **Security** - JWT auth, role-based access, password hashing
10. **Scalability** - Microservice architecture ready for growth

---

## 🔗 KEY INTEGRATIONS

- **Cloudinary** - Image hosting & CDN
- **Gmail/Email** - Notifications & password reset
- **OpenWeather** - Weather data (optional)
- **Google Maps** - Location services & mapping
- **Stripe/PayPal** - Payment processing (optional)
- **Twilio** - SMS notifications (optional)
- **Slack** - Admin notifications (optional)

---

## 📊 FEATURE COMPLETION STATUS

| Feature | Status | Notes |
|---------|--------|-------|
| User Authentication | ✅ Complete | JWT, password reset, OTP |
| Complaint Submission | ✅ Complete | Camera, upload, validation |
| Image Processing | ✅ Complete | YOLO AI classification |
| Geolocation | ✅ Complete | Auto-detect & manual entry |
| Admin Dashboard | ✅ Complete | Stats, table, sorting |
| User Management | ✅ Complete | Ban, suspend, delete |
| Map View | ✅ Complete | Interactive map with filters |
| Notifications | ✅ Complete | Toast & email |
| Upvote System | ✅ Complete | Crowdsourced priority |
| Delete Management | ✅ Complete | Soft & hard delete |
| Role-Based Access | ✅ Complete | User & Admin roles |
| Responsive Design | ✅ Complete | Mobile, tablet, desktop |

---

## 🎯 NEXT STEPS FOR ENHANCEMENT

1. Add analytics dashboard for citizens
2. Implement real-time notifications (WebSocket)
3. Add payment/donation system
4. Implement advanced filtering & search
5. Add machine learning model training pipeline
6. Mobile app development (React Native)
7. Community forum/discussion
8. Gamification (badges, achievements)
9. Advanced reporting & export
10. Multi-language support

---

## 📞 SUPPORT & MAINTENANCE

- Regular security audits
- Performance monitoring
- Database backups
- Log management
- Error tracking
- User feedback integration
- Feature requests handling
- Bug fixes & patches
- Documentation updates

---

**SmartReporter v1.0** - A complete, production-ready crowdsourced complaint resolution platform built with modern web technologies and AI integration.
