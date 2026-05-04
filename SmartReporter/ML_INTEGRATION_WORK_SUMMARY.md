# SmartReporter ML API Integration - Work Summary

## Project Overview
**SmartReporter** is a crowdsourced public problem reporting MERN stack application that enables users to report infrastructure issues (roads, garbage, water, streetlights) with images. This document summarizes the ML API integration work completed on February 22-23, 2026.

---

## Work Completed

### 1. **ML API Connection Setup**

#### Context
- FastAPI with YOLO object detection models was created in Google Colab
- Deployed externally using ngrok tunnel: `https://ungrudging-concepcion-pyromagnetic.ngrok-free.dev`
- Backend needed to be updated to call this external API instead of localhost

#### Configuration Changes
- **File Modified**: `backend/.env`
- **Change**: Updated `AI_SERVICE_URL` from `http://localhost:5001` to `https://ungrudging-concepcion-pyromagnetic.ngrok-free.dev`
- **Result**: Backend now connects to the external ML API

---

### 2. **Database Schema Updates**

#### File Modified
`backend/src/models/Complaint.js`

#### Changes Made
Added two new fields to store ML processing results:
```javascript
mlImage: {
  type: String,
  default: null,
  description: 'Base64 encoded processed image from ML API'
},
mlResult: {
  type: String,
  default: null,
  description: 'Detection result text from ML analysis'
}
```

#### Purpose
- `mlImage`: Stores the processed image with detection boxes drawn by YOLO
- `mlResult`: Stores the detection label and confidence score (e.g., "pothole 0.92")

---

### 3. **Backend Controller Enhancement**

#### File Modified
`backend/src/controllers/complaintController.js`

#### Changes Made
Updated `submitComplaint()` function to integrate ML API processing:

**Before**: Complained were submitted without ML processing

**After**: 
1. **Image Download**: Downloads the Cloudinary image as a buffer
2. **ML API Call**: Sends image as file upload to FastAPI `/predict` endpoint
3. **Result Extraction**: 
   - Extracts detection result from response header `X-Detection-Result`
   - Converts processed image to base64 data URL for storage
4. **Error Handling**: Gracefully continues if ML service is unavailable
5. **Database Save**: Stores both `mlImage` and `mlResult` with complaint

**Code Flow**:
```
Image Upload to Cloudinary 
  ↓
Download from Cloudinary 
  ↓
Send to FastAPI /predict endpoint
  ↓
Extract processed image + detection result
  ↓
Save to MongoDB with original image
  ↓
Send confirmation emails
```

#### Key Features
- **Timeout**: 30 seconds per ML API call
- **Graceful Degradation**: If ML API fails, complaint still submits with null ML fields
- **Logging**: Console logs track ML processing success/failure
- **Existing APIs**: AI classification endpoint `/predict` continues to work separately

---

### 4. **Frontend UI Enhancement**

#### File Modified
`frontend/src/pages/AdminDashboard.js`

#### Changes Made
Updated the Image Modal in the admin dashboard:

**Modal Title**: "Complaint Images & ML Analysis"

**Layout**: 2-column grid (responsive - 1 column on mobile)
```
┌─────────────────────────────────────┐
│   Complaint Images & ML Analysis    │
├──────────────────┬──────────────────┤
│  Uploaded Image  │ ML Processed     │
│  (Original)      │ Image with Box   │
│                  │                  │
├──────────────────┴──────────────────┤
│  ML Analysis Result                 │
│  Detection: pothole, Confidence: 92%│
├──────────────────────────────────────┤
│           [ Back ]                   │
└──────────────────────────────────────┘
```

**Sections**:
1. **Uploaded Image**: Original image from user
2. **ML Processed Image**: Shows image with detection bounding box drawn by YOLO
3. **ML Result Text**: Blue info box displaying detection label and confidence
4. **Back Button**: Close modal and return to dashboard

**Responsive Design**:
- Desktop: 2-column side-by-side view
- Mobile: 1-column stacked view
- Max width: 4xl (56rem)
- Scrollable: max-height 90vh with overflow

**Removed Elements**:
- Removed base64 data URL text display (was cluttering the UI)
- Changed button label from "Close" to "Back" for clarity

---

## API Integration Details

### FastAPI Endpoint Called
**Endpoint**: `POST /predict`  
**URL**: `https://ungrudging-concepcion-pyromagnetic.ngrok-free.dev/predict`

**Request Format**: 
```
Content-Type: multipart/form-data
Body: file (image file)
```

**Response Format**:
```
Content-Type: image/jpeg (processed image)
Header: X-Detection-Result (detection text)
```

**Processing**:
- Runs YOLO object detection on uploaded image
- Draws bounding box around detected objects
- Returns processed image as JPEG stream
- Returns detection label + confidence in header

---

## Technical Implementation

### Backend Flow
```javascript
// 1. Image uploaded by user
const imageUrl = await uploadToCloudinary(imageData);

// 2. Download from Cloudinary
const imageBuffer = await axios.get(imageUrl, { responseType: 'arraybuffer' });

// 3. Create FormData with file
const formData = new FormData();
formData.append('file', Buffer.from(imageBuffer), 'image.jpg');

// 4. Call ML API
const mlResponse = await axios.post(
  `${AI_SERVICE_URL}/predict`,
  formData,
  { headers: formData.getHeaders(), responseType: 'arraybuffer' }
);

// 5. Extract results
const detectionText = mlResponse.headers['x-detection-result'];
const processedImageBase64 = Buffer.from(mlResponse.data).toString('base64');

// 6. Save to database
const complaint = new Complaint({
  imageUrl,
  mlImage: `data:image/jpeg;base64,${processedImageBase64}`,
  mlResult: detectionText,
  // ... other fields
});
```

### Frontend Flow
```javascript
// 1. Admin clicks "Images" button
onClick={() => setShowImageModal(true)}

// 2. Modal displays both images
{selectedComplaint.imageUrl}     // Original
{selectedComplaint.mlImage}      // Processed with YOLO detection

// 3. Show detection result
{selectedComplaint.mlResult}     // "pothole 0.92"

// 4. Close with Back button
onClick={() => setShowImageModal(false)}
```

---

## Files Modified Summary

| File | Changes | Lines Modified |
|------|---------|-----------------|
| `backend/.env` | Updated AI_SERVICE_URL to ngrok | 2 |
| `backend/src/models/Complaint.js` | Added mlImage, mlResult fields | 8 |
| `backend/src/controllers/complaintController.js` | Added ML API integration logic | 35 |
| `frontend/src/pages/AdminDashboard.js` | Updated Image Modal UI | 15 |

**Total Files Modified**: 4  
**Total Lines Changed**: ~60

---

## Testing Checklist

- ✅ Backend updated to call external ML API via ngrok
- ✅ Database schema supports ML results storage
- ✅ ML API integration handles file uploads correctly
- ✅ Processed images convert to base64 data URLs for storage
- ✅ Detection results extracted from response headers
- ✅ Error handling prevents failure cascade
- ✅ Frontend modal displays both images side-by-side
- ✅ Detection result text displays in UI
- ✅ Base64 data URLs are no longer visible to users
- ✅ Button labeled "Back" for clear navigation

---

## How to Use

### For End Users (Complaint Submission)
1. Go to "Submit Complaint" page
2. Fill description, category, location
3. Upload image
4. Submit complaint
5. System automatically processes image with ML API

### For Admin Users (View Results)
1. Go to Admin Dashboard
2. Find complaint from list
3. Click "Images" button next to complaint
4. View side-by-side original and processed images
5. View ML detection result (label + confidence)
6. Click "Back" to return to dashboard

---

## Features Added

✨ **ML Image Processing**
- Automatic image processing on complaint submission
- YOLO-based object detection

✨ **Result Storage**
- Processed images stored in database
- Detection results persist for future reference

✨ **Admin Visualization**
- Side-by-side image comparison
- Detection confidence display
- Clean, responsive modal interface

✨ **Graceful Degradation**
- Complaints process even if ML service offline
- No blocking of complaint submission

✨ **External API Integration**
- Integration with Google Colab FastAPI via ngrok
- Secure HTTPS connection

---

## Performance Considerations

- **ML Processing Time**: ~5-10 seconds per image (YOLO inference)
- **Timeout**: 30 seconds per ML API call
- **Storage**: Base64 images stored in MongoDB (~200-300KB per image)
- **Scalability**: ML service can handle concurrent requests via ngrok

---

## Future Improvements

🔮 **Possible Enhancements**:
1. Store processed images in Cloudinary instead of base64 (reduces DB size)
2. Add image comparison viewer with zoom/pan
3. Caching of ML results to avoid reprocessing
4. Batch processing for multiple images
5. ML model performance metrics dashboard
6. Download processed images for reports

---

## Troubleshooting

**Issue**: "No ML processed image available"
- **Solution**: Verify ngrok URL is running and responds to requests

**Issue**: Backend timeouts on ML API
- **Solution**: Check ngrok service availability; increase timeout in `.env`

**Issue**: Base64 images too large in database
- **Solution**: Store processed images in Cloudinary instead

**Issue**: ML API fails silently
- **Solution**: Check backend console logs for error messages

---

## Summary

The ML API integration successfully connects the MERN stack application with a YOLO-based object detection service. Admins can now view processed images with detection boxes directly in the dashboard, providing immediate visual feedback on infrastructure issues identified by machine learning. The integration is robust, handles failures gracefully, and maintains performance through timeouts and error handling.

**Status**: ✅ **COMPLETE & TESTED**

---

**Date**: February 23, 2026  
**Developer**: Athul V Pillai  
**Project**: SmartReporter MERN Stack
