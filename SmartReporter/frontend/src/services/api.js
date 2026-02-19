import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api"
});

// Add token to request headers if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

// Auth APIs
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getCurrentUser = () => API.get("/auth/me");
export const forgotPassword = (data) => API.post("/auth/forgot-password", data);
export const verifyOTP = (data) => API.post("/auth/verify-otp", data);
export const resetPassword = (data) => API.post("/auth/reset-password", data);
export const submitComplaint = (data) => API.post("/complaints/submit", data, {
  headers: { "Content-Type": "multipart/form-data" }
});
export const getComplaints = (params) => API.get("/complaints", { params });
export const getComplaintById = (id) => API.get("/complaints/" + id);
export const updateComplaintStatus = (id, data) => API.put("/complaints/" + id + "/status", data);
export const upvoteComplaint = (complaintId) => API.post("/complaints/upvote", { complaintId });
export const getMyComplaints = (params) => API.get("/complaints/my-complaints", { params });


export const sendAppreciationEmail = (complaintId) => API.post("/complaints/" + complaintId + "/send-appreciation");

// Admin APIs
export const getDashboardStats = () => API.get("/admin/dashboard/stats");
export const getComplaintsOnMap = (params) => API.get("/admin/map", { params });
export const assignComplaint = (data) => API.post("/admin/assign", data);
export const getAllUsers = (params) => API.get("/admin/users", { params });
export const updateUser = (userId, data) => API.put("/admin/users/" + userId, data);
export const deleteUser = (userId) => API.delete("/admin/users/" + userId);
export const banUser = (userId, data) => API.post("/admin/users/" + userId + "/ban", data);
export const suspendUser = (userId, data) => API.post("/admin/users/" + userId + "/suspend", data);
export const unsuspendUser = (userId) => API.post("/admin/users/" + userId + "/unsuspend");
export const deleteComplaint = (complaintId) => API.delete("/admin/complaints/" + complaintId);

export const updateMyComplaint = (complaintId, data) => API.put('/complaints/' + complaintId, data);

export default API;



