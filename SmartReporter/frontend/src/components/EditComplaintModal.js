import React, { useState } from 'react';
import { updateMyComplaint } from '../services/api';
import { toast } from 'react-toastify';
import { FiX } from 'react-icons/fi';

const EditComplaintModal = ({ complaint, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    description: complaint.description,
    category: complaint.category,
    latitude: complaint.latitude,
    longitude: complaint.longitude
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await updateMyComplaint(complaint._id, formData);
      if (response.data.success) {
        toast.success('Complaint updated successfully');
        onSuccess();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update complaint');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Edit Complaint</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Category */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Category
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
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Description
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

          {/* Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Latitude
              </label>
              <input
                type="number"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                step="0.0001"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Longitude
              </label>
              <input
                type="number"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                step="0.0001"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Current Image */}
          {complaint.image && (
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Current Image
              </label>
              <img
                src={complaint.image}
                alt="Current complaint"
                className="h-40 w-full object-cover rounded-lg"
              />
              <p className="text-sm text-gray-600 mt-2">Note: To change the image, submit a new complaint</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 justify-end pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditComplaintModal;
