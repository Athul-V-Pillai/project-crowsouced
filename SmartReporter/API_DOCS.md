# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### 1. Register User
**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user" // optional, defaults to "user"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### 2. Login User
**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### 3. Get Current User
**Endpoint:** `GET /auth/me`

**Headers:** Authorization required

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "avatar": null,
    "phone": null,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## Complaint Endpoints

### 1. Submit Complaint
**Endpoint:** `POST /complaints/submit`

**Headers:** 
- Authorization required
- Content-Type: multipart/form-data

**Request Body (Form Data):**
```
- image: <file>              // JPG, PNG, WebP, GIF
- description: <string>      // Max 1000 chars
- category: <string>         // road|garbage|water|streetlight|other
- latitude: <number>         // -90 to 90
- longitude: <number>        // -180 to 180
```

**Response (201):**
```json
{
  "success": true,
  "message": "Complaint submitted successfully",
  "complaint": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": {
      "_id": "507f1f77bcf86cd799439010",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "imageUrl": "https://res.cloudinary.com/...",
    "description": "Large pothole on Main Street",
    "category": "road",
    "aiCategory": "road",
    "aiConfidence": 0.92,
    "latitude": 40.7128,
    "longitude": -74.0060,
    "status": "pending",
    "priority": "low",
    "upvotes": 0,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### 2. Get All Complaints
**Endpoint:** `GET /complaints`

**Query Parameters:**
- `category`: road|garbage|water|streetlight|other (optional)
- `status`: pending|in-progress|resolved (optional)
- `priority`: low|medium|high (optional)
- `page`: number (default: 1)
- `limit`: number (default: 10)

**Example:**
```
GET /complaints?category=road&status=pending&page=1&limit=10
```

**Response (200):**
```json
{
  "success": true,
  "complaints": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": {
        "_id": "507f1f77bcf86cd799439010",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "imageUrl": "https://res.cloudinary.com/...",
      "description": "Large pothole",
      "category": "road",
      "status": "pending",
      "priority": "low",
      "upvotes": 5,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

### 3. Get Complaint by ID
**Endpoint:** `GET /complaints/:id`

**Response (200):**
```json
{
  "success": true,
  "complaint": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": {
      "_id": "507f1f77bcf86cd799439010",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "555-1234"
    },
    "imageUrl": "https://res.cloudinary.com/...",
    "description": "Large pothole on Main Street",
    "category": "road",
    "aiCategory": "road",
    "aiConfidence": 0.92,
    "latitude": 40.7128,
    "longitude": -74.0060,
    "status": "in-progress",
    "priority": "medium",
    "upvotes": 15,
    "assignedTo": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Admin User",
      "email": "admin@example.com"
    },
    "resolutionNote": "Repairs scheduled for next week",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-16T15:45:00Z"
  }
}
```

### 4. Upvote Complaint
**Endpoint:** `POST /complaints/upvote`

**Headers:** Authorization required

**Request Body:**
```json
{
  "complaintId": "507f1f77bcf86cd799439011"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Complaint upvoted",
  "action": "added"
}
```

**Or if already upvoted (removes upvote):**
```json
{
  "success": true,
  "message": "Upvote removed",
  "action": "removed"
}
```

### 5. Get My Complaints
**Endpoint:** `GET /complaints/my-complaints`

**Headers:** Authorization required

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 10)

**Response (200):**
```json
{
  "success": true,
  "complaints": [...],
  "pagination": {...}
}
```

### 6. Update Complaint Status (Admin)
**Endpoint:** `PUT /complaints/:id/status`

**Headers:** Authorization required (Admin only)

**Request Body:**
```json
{
  "status": "in-progress",      // pending|in-progress|resolved
  "priority": "high",            // low|medium|high
  "resolutionNote": "Repairs started",
  "assignedTo": "507f1f77bcf86cd799439012"  // optional
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Complaint updated successfully",
  "complaint": {...}
}
```

---

## Admin Endpoints

All admin endpoints require `Authorization` header and admin role.

### 1. Get Dashboard Statistics
**Endpoint:** `GET /admin/dashboard/stats`

**Response (200):**
```json
{
  "success": true,
  "stats": {
    "totalComplaints": 150,
    "pendingComplaints": 45,
    "inProgressComplaints": 78,
    "resolvedComplaints": 27,
    "highPriorityComplaints": 12,
    "complaintsByCategory": [
      { "_id": "road", "count": 50 },
      { "_id": "garbage", "count": 35 },
      { "_id": "water", "count": 40 },
      { "_id": "streetlight", "count": 25 }
    ],
    "complaintsByStatus": [
      { "_id": "pending", "count": 45 },
      { "_id": "in-progress", "count": 78 },
      { "_id": "resolved", "count": 27 }
    ]
  }
}
```

### 2. Get Complaints on Map
**Endpoint:** `GET /admin/map`

**Query Parameters:**
- `minLat`: number
- `maxLat`: number
- `minLng`: number
- `maxLng`: number

**Example:**
```
GET /admin/map?minLat=40.0&maxLat=41.0&minLng=-75.0&maxLng=-73.0
```

**Response (200):**
```json
{
  "success": true,
  "complaints": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "latitude": 40.7128,
      "longitude": -74.0060,
      "category": "road",
      "status": "pending",
      "priority": "high",
      "description": "Large pothole",
      "imageUrl": "https://...",
      "userId": {
        "_id": "507f1f77bcf86cd799439010",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### 3. Assign Complaint
**Endpoint:** `POST /admin/assign`

**Request Body:**
```json
{
  "complaintId": "507f1f77bcf86cd799439011",
  "adminId": "507f1f77bcf86cd799439012"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Complaint assigned successfully",
  "complaint": {...}
}
```

### 4. Get All Users
**Endpoint:** `GET /admin/users`

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 10)

**Response (200):**
```json
{
  "success": true,
  "users": [
    {
      "_id": "507f1f77bcf86cd799439010",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "phone": "555-1234",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {...}
}
```

---

## AI Service Endpoints

**Base URL:** `http://localhost:5001`

### 1. Predict Category
**Endpoint:** `POST /predict`

**Request Body:**
```json
{
  "imageUrl": "https://..."
}
```

**Response (200):**
```json
{
  "success": true,
  "category": "road",
  "confidence": 0.92,
  "detected_objects": [
    {
      "object": "pothole",
      "confidence": 0.95
    },
    {
      "object": "crack",
      "confidence": 0.88
    }
  ]
}
```

### 2. Health Check
**Endpoint:** `GET /health`

**Response (200):**
```json
{
  "success": true,
  "message": "AI Service is running",
  "service": "SmartReporter AI Service"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error or missing required fields"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "No token provided or invalid token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Admin access required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": {} // Only in development mode
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal error |

---

## Rate Limiting (Recommended for Production)

Implement rate limiting:
- 100 requests per 15 minutes per IP
- 1000 requests per hour per authenticated user

## CORS Headers

All responses include:
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Credentials: true
```

---

**Last Updated:** January 2024
