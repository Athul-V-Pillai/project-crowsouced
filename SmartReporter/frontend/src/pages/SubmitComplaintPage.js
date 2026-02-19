import React, { useState } from 'react';
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
  const fileInputRef = useRef(null);
  const { user: authUser } = useAuth();

  // Get geolocation
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
        }
      );
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
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
              <div className="bg-green-50 p-4 rounded-lg border border-green-300">
                <p className="text-green-800">
                  Captured: {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}
                </p>
              </div>
            ) : (
              <p className="text-gray-600 text-sm mb-2">Location not captured yet</p>
            )}
            <button
              type="button"
              onClick={getLocation}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {formData.latitude ? 'Update Location' : 'Get My Location'}
            </button>
          </div>

          {/* Image Upload */}
          <div>
            <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
              <FiCamera className="mr-2" /> Image
            </label>
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:bg-blue-50 transition cursor-pointer"
              onClick={() => fileInputRef.current?.click()}>
              {formData.image ? (
                <p className="text-green-600 font-semibold">{formData.image.name}</p>
              ) : (
                <p className="text-gray-600">Click to upload or drag and drop</p>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
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
      </div>
    </div>
  );
};

export default SubmitComplaintPage;
