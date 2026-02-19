import React, { useState, useEffect } from 'react';
import { getMyComplaints, deleteComplaint } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FiEdit2, FiTrash2, FiMapPin, FiCalendar, FiTag } from 'react-icons/fi';
import EditComplaintModal from '../components/EditComplaintModal';

export const UserComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [page, setPage] = useState(1);
  const { user: authUser } = useAuth();

  useEffect(() => {
    fetchMyComplaints();
  }, [page]);

  const fetchMyComplaints = async () => {
    try {
      setLoading(true);
      const response = await getMyComplaints({ page, limit: 10 });
      if (response.data.success) {
        setComplaints(response.data.complaints);
      }
    } catch (error) {
      toast.error('Failed to fetch your complaints');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (complaint) => {
    setSelectedComplaint(complaint);
    setShowEditModal(true);
  };

  const handleDeleteClick = async (complaintId) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      try {
        const response = await deleteComplaint(complaintId);
        if (response.data.success) {
          toast.success('Complaint deleted successfully');
          fetchMyComplaints();
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete complaint');
        console.error(error);
      }
    }
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    setSelectedComplaint(null);
    fetchMyComplaints();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 font-semibold';
      case 'medium':
        return 'text-yellow-600 font-semibold';
      case 'low':
      default:
        return 'text-green-600';
    }
  };

  if (loading && complaints.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-600">Loading your complaints...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">My Complaints</h1>

        {complaints.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">You haven't submitted any complaints yet.</p>
            <a href="/submit" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Submit a Complaint
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div key={complaint._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FiTag className="text-blue-600" />
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(complaint.priority)}`}>
                        {complaint.category?.toUpperCase() || 'N/A'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(complaint.status)}`}>
                        {complaint.status?.toUpperCase() || 'PENDING'}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3 line-clamp-2">{complaint.description}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {complaint.status === 'pending' && (
                      <button
                        onClick={() => handleEditClick(complaint)}
                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        title="Edit complaint"
                      >
                        <FiEdit2 size={18} />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                    )}
                    {complaint.status === 'pending' && (
                      <button
                        onClick={() => handleDeleteClick(complaint._id)}
                        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        title="Delete complaint"
                      >
                        <FiTrash2 size={18} />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                  {complaint.latitude && complaint.longitude && (
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-gray-400" />
                      <span>{complaint.latitude.toFixed(4)}, {complaint.longitude.toFixed(4)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-gray-400" />
                    <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {complaint.image && (
                  <div className="mb-3">
                    <img
                      src={complaint.image}
                      alt="Complaint"
                      className="h-32 w-full object-cover rounded-lg"
                    />
                  </div>
                )}

                {complaint.upvotes > 0 && (
                  <div className="text-sm text-gray-600">
                    👍 {complaint.upvotes} people found this helpful
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {complaints.length > 0 && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-100 transition"
            >
              Previous
            </button>
            <span className="px-4 py-2">Page {page}</span>
            <button
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedComplaint && (
        <EditComplaintModal
          complaint={selectedComplaint}
          onClose={() => setShowEditModal(false)}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
};

export default UserComplaints;
