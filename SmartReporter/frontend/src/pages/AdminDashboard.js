import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardStats, getComplaints, updateComplaintStatus, getAllUsers, deleteComplaint, sendAppreciationEmail } from '../services/api';
import { toast } from 'react-toastify';
import { FiBarChart2, FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [updateData, setUpdateData] = useState({ status: '', priority: '', resolutionNote: '' });
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, complaintsRes, usersRes] = await Promise.all([
        getDashboardStats(),
        getComplaints({ limit: 20 }),
        getAllUsers({ limit: 100 })
      ]);

      setStats(statsRes.data.stats);
      setComplaints(complaintsRes.data.complaints);
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (complaintId) => {
    try {
      await updateComplaintStatus(complaintId, updateData);
      toast.success('Complaint updated successfully');
      setSelectedComplaint(null);
      fetchData();
    } catch (error) {
      toast.error('Failed to update complaint');
    }
  };

  const handleDeleteComplaint = async (complaintId) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      try {
        await deleteComplaint(complaintId);
        toast.success('Complaint deleted successfully');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete complaint');
      }
    }
  };

  const handleSendAppreciation = async (complaintId) => {
    try {
      const response = await sendAppreciationEmail(complaintId);
      toast.success(response.data.message || 'Appreciation email sent successfully');
      fetchData(); // Refresh the list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send appreciation email');
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600 py-12">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={() => navigate('/admin/users')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Manage Users
          </button>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <FiBarChart2 className="text-4xl text-blue-600 mr-4" />
              <div>
                <p className="text-gray-600 text-sm">Total Complaints</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalComplaints}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <FiAlertCircle className="text-4xl text-red-600 mr-4" />
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-2xl font-bold text-gray-800">{stats.pendingComplaints}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <FiClock className="text-4xl text-yellow-600 mr-4" />
              <div>
                <p className="text-gray-600 text-sm">In Progress</p>
                <p className="text-2xl font-bold text-gray-800">{stats.inProgressComplaints}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <FiCheckCircle className="text-4xl text-green-600 mr-4" />
              <div>
                <p className="text-gray-600 text-sm">Resolved</p>
                <p className="text-2xl font-bold text-gray-800">{stats.resolvedComplaints}</p>
              </div>
            </div>
          </div>
        )}

        {/* Complaints Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Recent Complaints</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Priority</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint._id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-600">{complaint._id.substring(0, 8)}...</td>
                    <td className="px-6 py-3 text-sm font-semibold text-gray-800">{complaint.category}</td>
                    <td className="px-6 py-3 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        complaint.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm font-semibold text-gray-800">{complaint.priority}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{complaint.userId?.name}</td>
                    <td className="px-6 py-3 text-sm">
                      <button
                        onClick={() => {
                          setSelectedComplaint(complaint);
                          setUpdateData({ status: complaint.status, priority: complaint.priority, resolutionNote: complaint.resolutionNote || '' });
                        }}
                        className="text-blue-600 hover:text-blue-800 font-semibold mr-3"
                      >
                        Update
                      </button>
                      {complaint.imageUrl && (
                        <button
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setShowImageModal(true);
                          }}
                          className="text-green-600 hover:text-green-800 font-semibold mr-3"
                        >
                          Images
                        </button>
                      )}
                      {complaint.latitude && complaint.longitude && (
                        <button
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setShowLocationModal(true);
                          }}
                          className="text-purple-600 hover:text-purple-800 font-semibold mr-3"
                        >
                          Location
                        </button>
                      )}
                      <button
                        onClick={() => handleSendAppreciation(complaint._id)}
                        className="text-green-600 hover:text-green-800 font-semibold mr-2"
                        title="Send appreciation email"
                      >
                        Send Appreciation
                      </button>
                      <button
                        onClick={() => handleDeleteComplaint(complaint._id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Update Modal */}
        {selectedComplaint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Update Complaint</h2>

              <div className="space-y-4">
                <select
                  value={updateData.status}
                  onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>

                <select
                  value={updateData.priority}
                  onChange={(e) => setUpdateData({ ...updateData, priority: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <textarea
                  value={updateData.resolutionNote}
                  onChange={(e) => setUpdateData({ ...updateData, resolutionNote: e.target.value })}
                  placeholder="Resolution Note"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows="3"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedComplaint._id)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setSelectedComplaint(null)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {showImageModal && selectedComplaint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Complaint Images</h2>
              {selectedComplaint.imageUrl && (
                <div className="space-y-4">
                  <img
                    src={selectedComplaint.imageUrl}
                    alt="Complaint"
                    className="w-full h-96 object-contain rounded-lg border border-gray-300"
                  />
                  <p className="text-gray-600 text-sm">Image URL: {selectedComplaint.imageUrl}</p>
                </div>
              )}
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setShowImageModal(false)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Location Modal */}
        {showLocationModal && selectedComplaint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">Complaint Location</h2>
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-700"><strong>Latitude:</strong> {selectedComplaint.latitude}</p>
                  <p className="text-gray-700"><strong>Longitude:</strong> {selectedComplaint.longitude}</p>
                </div>
                <iframe
                  width="100%"
                  height="400"
                  frameBorder="0"
                  style={{ borderRadius: '8px' }}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedComplaint.longitude - 0.01},${selectedComplaint.latitude - 0.01},${selectedComplaint.longitude + 0.01},${selectedComplaint.latitude + 0.01}&layer=mapnik&marker=${selectedComplaint.latitude},${selectedComplaint.longitude}`}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
                <p className="text-gray-600 text-sm">
                  <a
                    href={`https://www.openstreetmap.org/?mlat=${selectedComplaint.latitude}&mlon=${selectedComplaint.longitude}&zoom=15`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    View on OpenStreetMap
                  </a>
                </p>
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setShowLocationModal(false)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
