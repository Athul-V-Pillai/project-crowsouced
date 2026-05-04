import React, { useState, useEffect } from "react";
import { getAllUsers, updateUser, deleteUser, banUser, suspendUser, unsuspendUser } from "../services/api";
import { toast } from "react-toastify";

// Calculate remaining suspension time
const getRemainingTime = (expiresAt) => {
  if (!expiresAt) return null;
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diff = expiry - now;
  
  if (diff <= 0) return null; // Expired
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
};

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [page, setPage] = useState(1);
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "", role: "user" });
  const [banReason, setBanReason] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers({ page, limit: 10 });
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditForm({ name: user.name, email: user.email, phone: user.phone || "", role: user.role });
    setShowEditModal(true);
  };

  const openBanModal = (user) => {
    setSelectedUser(user);
    setBanReason("");
    setShowBanModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await updateUser(selectedUser._id, editForm);
      if (response.data.success) {
        toast.success("User updated successfully");
        setShowEditModal(false);
        fetchUsers();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update user");
    }
  };

  const handleBanSubmit = async () => {
    try {
      const response = await banUser(selectedUser._id, { reason: banReason });
      if (response.data.success) {
        toast.success("User banned successfully");
        setShowBanModal(false);
        fetchUsers();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to ban user");
    }
  };

  const handleSuspend = async (userId) => {
    try {
      const response = await suspendUser(userId, { reason: "Suspended by admin" });
      if (response.data.success) {
        toast.success("User suspended successfully");
        fetchUsers();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to suspend user");
    }
  };

  const handleRestore = async (userId) => {
    try {
      const response = await unsuspendUser(userId);
      if (response.data.success) {
        toast.success("User restored successfully");
        fetchUsers();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to restore user");
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        const response = await deleteUser(userId);
        if (response.data.success) {
          toast.success("User deleted successfully");
          fetchUsers();
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete user");
      }
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold w-fit ${
                        user.status === "active" ? "bg-green-100 text-green-800" :
                        user.status === "banned" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {user.status}
                      </span>
                      {user.status === "suspended" && user.suspensionExpiresAt && (
                        <span className="text-xs text-gray-600">
                          Expires: {getRemainingTime(user.suspensionExpiresAt)}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">{user.phone || "N/A"}</td>
                  <td className="px-6 py-4 flex gap-2 justify-center">
                    <button
                      onClick={() => openEditModal(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    {user.status === "active" && (
                      <>
                        <button
                          onClick={() => openBanModal(user)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Ban
                        </button>
                        <button
                          onClick={() => handleSuspend(user._id)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Suspend
                        </button>
                      </>
                    )}
                    {user.status !== "active" && (
                      <button
                        onClick={() => handleRestore(user._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Restore
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex gap-2 justify-center">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">Page {page}</span>
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Next
          </button>
        </div>

        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Edit User</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={handleEditSubmit}
                    className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showBanModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Ban User</h2>
              <p className="text-gray-600 mb-4">Reason for banning:</p>
              <textarea
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                placeholder="Enter reason for ban..."
                className="w-full px-3 py-2 border rounded h-24"
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleBanSubmit}
                  className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                  Ban User
                </button>
                <button
                  onClick={() => setShowBanModal(false)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;