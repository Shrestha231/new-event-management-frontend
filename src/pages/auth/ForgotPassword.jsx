import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import API from '../../api/axios';
import Navbar from '../../components/layout/Navbar';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Call the backend to send the OTP
      await API.post('/auth/forgot-password', { email });
      
      setMessage('OTP sent to your email! Redirecting...');
      
      // 2. Wait 2 seconds so the user can read the message, then redirect
      setTimeout(() => {
        navigate('/reset-password'); 
      }, 2000);

    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.message || 'Something went wrong'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
          <p className="text-gray-600 text-center mb-6 text-sm">
            Enter your email and we'll send you a link to reset your password.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              required
              placeholder="Email address"
              className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700">
              Send Reset Link
            </button>
          </form>
          {message && <p className="mt-4 text-center text-sm text-blue-600">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;