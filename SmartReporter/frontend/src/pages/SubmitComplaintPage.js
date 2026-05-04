import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { submitComplaint } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FiMapPin, FiCamera, FiType, FiTag } from 'react-icons/fi';

export const SubmitComplaintPage = () => {
  const [formData, setFormData] = useState({
    description: '',
    category: 'road',
    latitude: null,
    longitude: null,
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { user: authUser } = useAuth();

  // Ensure video plays when showing live feed
  useEffect(() => {
    if (showCameraModal && !imagePreview && videoRef.current) {
      const video = videoRef.current;
      
      const handleLoadedMetadata = () => {
        console.log('Video metadata loaded, dimensions:', video.videoWidth, 'x', video.videoHeight);
        video.play().catch(err => console.error('Play error:', err));
      };
      
      const handlePlay = () => {
        console.log('Video is now playing');
      };
      
      const handleError = (e) => {
        console.error('Video error event:', e);
      };
      
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('play', handlePlay);
      video.addEventListener('error', handleError);
      
      if (video.readyState >= 2) {
        video.play().catch(err => console.error('Play error:', err));
      }
      
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('error', handleError);
      };
    }
  }, [showCameraModal, imagePreview, mediaStream]);

  // Get geolocation - Simple version
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          toast.success('Location captured');
        },
        (error) => {
          toast.error('Failed to get location: ' + error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    }
  };

  // Open camera
  const openCamera = async () => {
    setShowCameraModal(true);
    setCameraActive(false);
    setImagePreview(null);
    
    setTimeout(async () => {
      if (!videoRef.current) {
        toast.error('Camera element not ready');
        return;
      }

      try {
        // Stop any existing stream
        if (mediaStream) {
          mediaStream.getTracks().forEach(track => track.stop());
        }

        const constraints = {
          video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        console.log('Stream acquired:', stream);
        
        // Ensure video element is ready
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setMediaStream(stream);
          setCameraActive(true);
          
          // Force play after a moment
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.play().catch(err => console.error('Play error:', err));
            }
          }, 50);
        }
        
        toast.success('✓ Camera ready');
      } catch (error) {
        console.error('Camera error:', error);
        toast.error('❌ Camera permission denied or not available');
        setShowCameraModal(false);
        setCameraActive(false);
      }
    }, 300);
  };

  // Close camera without saving
  const closeCamera = () => {
    try {
      // Stop all tracks in the media stream
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => {
          track.stop();
        });
        setMediaStream(null);
      }

      // Clear video element
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    } catch (error) {
      console.error('Close camera error:', error);
    }
    
    // Clear all camera state
    setShowCameraModal(false);
    setCameraActive(false);
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image: null }));
  };

  // Confirm photo and close camera (keep the image in form)
  const confirmPhoto = () => {
    try {
      // Stop all tracks in the media stream
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => {
          track.stop();
        });
        setMediaStream(null);
      }

      // Clear video element
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    } catch (error) {
      console.error('Confirm photo error:', error);
    }
    
    // Close modal but keep image in formData
    setShowCameraModal(false);
    setCameraActive(false);
    // Keep imagePreview and formData.image as is
  };

  // Capture photo
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) {
      toast.error('Camera not ready');
      return;
    }

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas size to match video
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' });
            setFormData(prev => ({ ...prev, image: file }));
            setImagePreview(canvas.toDataURL());
            toast.success('✓ Photo captured - Click Retake to capture another');
          }
        }, 'image/jpeg', 0.95);
      }
    } catch (error) {
      console.error('Capture error:', error);
      toast.error('Failed to capture photo');
    }
  };

  // Retake photo - restart camera and delete current image
  const retakePhoto = async () => {
    try {
      console.log('Restarting camera...');
      
      // Clear the preview first
      setImagePreview(null);
      
      // Stop current stream completely
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => {
          track.stop();
          console.log('Track stopped:', track.kind);
        });
        setMediaStream(null);
      }
      
      // Clear video element
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      // Small delay before restarting
      setTimeout(async () => {
        if (!videoRef.current) {
          toast.error('Camera element not found');
          return;
        }

        try {
          const constraints = {
            video: { 
              facingMode: 'environment',
              width: { ideal: 1280 },
              height: { ideal: 720 }
            },
            audio: false
          };
          
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          console.log('New stream acquired for retake:', stream);
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setMediaStream(stream);
            setCameraActive(true);
            
            // Force play
            setTimeout(() => {
              if (videoRef.current) {
                videoRef.current.play().catch(err => console.error('Play error on retake:', err));
              }
            }, 50);
          }
          
          toast.success('✓ Ready to retake');
        } catch (error) {
          console.error('Retake camera error:', error);
          toast.error('Failed to restart camera');
        }
      }, 100);
    } catch (error) {
      console.error('Retake error:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview for the uploaded image
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
      
      setFormData({ ...formData, image: file });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.image) {
      toast.error('Please select an image');
      setLoading(false);
      return;
    }

    if (!formData.latitude || !formData.longitude) {
      toast.error('Please provide location');
      setLoading(false);
      return;
    }

    try {
      const fd = new FormData();
      fd.append('description', formData.description);
      fd.append('category', formData.category);
      fd.append('latitude', formData.latitude);
      fd.append('longitude', formData.longitude);
      fd.append('image', formData.image);

      const response = await submitComplaint(fd);
      toast.success(response.data.message);

      // Reset form
      setFormData({
        description: '',
        category: 'road',
        latitude: null,
        longitude: null,
        image: null
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Report an Issue</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location Section */}
          <div>
            <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
              <FiMapPin className="mr-2" /> Location
            </label>
            {formData.latitude && formData.longitude ? (
              <div className="bg-green-50 p-4 rounded-lg border border-green-300 mb-3">
                <p className="text-green-800">
                  Captured: {formData.latitude.toFixed(6)}, {formData.longitude.toFixed(6)}
                </p>
              </div>
            ) : (
              <p className="text-gray-600 text-sm mb-2">Location not captured yet</p>
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={getLocation}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {formData.latitude ? 'Update Location' : 'Get My Location'}
              </button>
            </div>

            {/* Manual Location Input */}
            <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Or enter manually:</label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  step="0.0001"
                  placeholder="Latitude"
                  value={formData.latitude || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, latitude: e.target.value ? parseFloat(e.target.value) : null }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <input
                  type="number"
                  step="0.0001"
                  placeholder="Longitude"
                  value={formData.longitude || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, longitude: e.target.value ? parseFloat(e.target.value) : null }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
              <FiCamera className="mr-2" /> Image
            </label>
            <div className="flex gap-3 mb-4">
              <div className="flex-1 border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:bg-blue-50 transition cursor-pointer"
                onClick={() => fileInputRef.current?.click()}>
                {formData.image ? (
                  <p className="text-green-600 font-semibold">{formData.image.name}</p>
                ) : (
                  <p className="text-gray-600">Click to upload</p>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <button
                type="button"
                onClick={openCamera}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold flex items-center gap-2"
              >
                <FiCamera /> Take Photo
              </button>
            </div>
            {formData.image && imagePreview && (
              <img src={imagePreview} alt="preview" className="w-full h-64 object-contain rounded-lg border border-gray-300" />
            )}
          </div>

          {/* Category */}
          <div>
            <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
              <FiTag className="mr-2" /> Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="road">Road Issue</option>
              <option value="garbage">Garbage/Waste</option>
              <option value="water">Water Supply</option>
              <option value="streetlight">Streetlight</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
              <FiType className="mr-2" /> Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the issue in detail"
              required
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>

        {/* Camera Modal */}
        {showCameraModal && (
          <div className="fixed inset-0 bg-black flex items-center justify-center p-4 z-50">
            <div className="bg-black rounded-lg w-full max-w-lg relative">
              <h2 className="absolute top-4 left-4 text-2xl font-bold text-white z-10">Take Photo</h2>
              
              {/* Show video when no preview */}
              {!imagePreview && (
                <>
                  <video
                    ref={videoRef}
                    autoPlay={true}
                    playsInline={true}
                    muted={true}
                    onLoadedMetadata={(e) => {
                      console.log('Video loaded metadata:', e.target.videoWidth, 'x', e.target.videoHeight);
                    }}
                    onPlay={(e) => {
                      console.log('Video started playing');
                    }}
                    onError={(e) => {
                      console.error('Video error:', e);
                      toast.error('❌ Video error: ' + e.type);
                    }}
                    style={{
                      width: '100%',
                      height: '500px',
                      objectFit: 'cover',
                      display: 'block',
                      backgroundColor: '#000000'
                    }}
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                    <button
                      onClick={capturePhoto}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-bold text-lg"
                    >
                      📸 Capture
                    </button>
                    <button
                      onClick={closeCamera}
                      className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-bold text-lg"
                    >
                      ✕ Close
                    </button>
                  </div>
                </>
              )}
              
              {/* Show preview when image captured */}
              {imagePreview && (
                <>
                  <img 
                    src={imagePreview} 
                    alt="captured" 
                    style={{
                      width: '100%',
                      height: '500px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                    <button
                      onClick={retakePhoto}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-bold text-lg"
                    >
                      🔄 Retake
                    </button>
                    <button
                      onClick={confirmPhoto}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-bold text-lg"
                    >
                      ✓ Use Photo
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitComplaintPage;
