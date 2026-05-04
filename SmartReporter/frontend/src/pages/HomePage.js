import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminLoginModal from '../components/AdminLoginModal';

export const HomePage = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">SmartReporter</h1>
          <div className="space-x-4 flex items-center">
            {isAuthenticated ? (
              <>
                <Link to="/complaints" className="text-blue-600 hover:text-blue-800 font-semibold">Complaints</Link>
                {user?.role !== 'admin' && (
                  <>
                    <Link to="/user/complaints" className="text-blue-600 hover:text-blue-800 font-semibold">My Complaints</Link>
                  </>
                )}
                {user?.role === 'admin' && (
                  <Link to="/admin/dashboard" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Admin</Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Login</Link>
                <button 
                  onClick={() => setAdminModalOpen(true)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-semibold"
                >
                  Admin Login
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 text-white">
        <h2 className="text-5xl font-bold mb-6">Report Issues, Get Them Fixed</h2>
        <p className="text-xl mb-8 text-blue-100">
          SmartReporter is a crowdsourced complaint resolution system that helps citizens report and track local issues.
        </p>

        {!isAuthenticated ? (
          <Link to="/auth" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 inline-block">
            Get Started
          </Link>
        ) : user?.role !== 'admin' ? (
          <Link to="/submit" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 inline-block">
            Report an Issue
          </Link>
        ) : null}

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-lg">
            <h3 className="text-2xl font-bold mb-4">📸 Image Upload</h3>
            <p>Upload images of issues for quick identification and verification.</p>
          </div>

          <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-lg">
            <h3 className="text-2xl font-bold mb-4">📍 Location Tracking</h3>
            <p>Automatic GPS location capture for precise issue reporting.</p>
          </div>

          <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-lg">
            <h3 className="text-2xl font-bold mb-4">🤖 AI Classification</h3>
            <p>AI-powered image recognition to automatically classify issues.</p>
          </div>
        </div>
      </div>

      {/* Admin Login Modal */}
      <AdminLoginModal 
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onLoginSuccess={() => navigate('/admin/dashboard')}
      />
    </div>
  );
};

export default HomePage;
