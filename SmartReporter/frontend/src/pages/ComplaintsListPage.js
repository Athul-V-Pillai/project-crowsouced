import React, { useState, useEffect, useCallback } from 'react';
import { getComplaints, upvoteComplaint } from '../services/api';
import { toast } from 'react-toastify';
import { FiThumbsUp, FiMapPin, FiCalendar } from 'react-icons/fi';

export const ComplaintsListPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    priority: '',
    page: 1
  });

  const fetchComplaints = useCallback(async () => {
    setLoading(true);
    try {
      const params = Object.keys(filters).reduce((acc, key) => {
        if (filters[key]) acc[key] = filters[key];
        return acc;
      }, {});

      const response = await getComplaints(params);
      setComplaints(response.data.complaints);
    } catch (error) {
      toast.error('Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  const handleUpvote = async (complaintId) => {
    try {
      const response = await upvoteComplaint(complaintId);
      toast.success(response.data.message);
      fetchComplaints();
    } catch (error) {
      toast.error('Failed to upvote');
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value, page: 1 });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Complaints</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="road">Road</option>
              <option value="garbage">Garbage</option>
              <option value="water">Water</option>
              <option value="streetlight">Streetlight</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>

            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {/* Complaints List */}
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : complaints.length === 0 ? (
          <div className="text-center text-gray-600">No complaints found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complaints.map((complaint) => (
              <div key={complaint._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <img src={complaint.imageUrl} alt="Issue" className="w-full h-48 object-cover" />
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </span>
                    <span className={`font-semibold ${getPriorityColor(complaint.priority)}`}>
                      {complaint.priority.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2">{complaint.category.toUpperCase()}</h3>
                  <p className="text-gray-600 text-sm mb-3">{complaint.description}</p>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <FiMapPin className="mr-2" />
                      {complaint.latitude?.toFixed(4)}, {complaint.longitude?.toFixed(4)}
                    </div>
                    <div className="flex items-center">
                      <FiCalendar className="mr-2" />
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <button
                    onClick={() => handleUpvote(complaint._id)}
                    className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    <FiThumbsUp className="mr-2" /> Upvote ({complaint.upvotes})
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintsListPage;
