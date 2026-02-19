import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword, verifyOTP, resetPassword } from '../services/api';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiMail, FiLock } from 'react-icons/fi';

export const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await forgotPassword({ email });
      toast.success(response.data.message);
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('OTP must be 6 digits');
      return;
    }
    setLoading(true);
    try {
      const response = await verifyOTP({ email, otp });
      toast.success(response.data.message || 'OTP verified');
      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const response = await resetPassword({ email, newPassword });
      toast.success(response.data.message || 'Password reset successfully');
      setTimeout(() => navigate('/auth'), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center mb-8">
          <button onClick={() => navigate('/')} className="text-gray-600 hover:text-gray-800 mr-4">
            <FiArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Reset Password</h1>
        </div>

        {step === 1 && (
          <>
            <p className="text-gray-600 mb-6">Enter your email to receive an OTP</p>
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50">
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
            <p className="text-center mt-4 text-gray-600">
              <button onClick={() => navigate('/')} className="text-blue-600 font-semibold hover:underline">Back to Login</button>
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-gray-600 mb-6">Enter the 6-digit OTP sent to {email}</p>
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <input type="text" placeholder="000000" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} maxLength="6" required className="w-full px-4 py-3 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button type="submit" disabled={loading || otp.length !== 6} className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50">
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
            <div className="mt-4 flex gap-2">
              <button onClick={() => { setStep(1); setOtp(''); }} className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition">Back</button>
              <button onClick={handleSendOTP} className="flex-1 bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition">Resend OTP</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <p className="text-gray-600 mb-6">Enter your new password</p>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50">
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
            <button onClick={() => { setStep(2); setNewPassword(''); setConfirmPassword(''); }} className="w-full mt-4 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition">Back</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;