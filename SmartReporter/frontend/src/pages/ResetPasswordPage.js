import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.info('Please use the Forgot Password feature to reset your password');
    setTimeout(() => {
      navigate('/forgot-password');
    }, 2000);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Redirecting...</h2>
        <p className="text-gray-600">Please use the Forgot Password feature</p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
