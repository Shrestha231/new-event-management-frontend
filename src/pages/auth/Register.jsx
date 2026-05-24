import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api/axios'; // Make sure this points to your axios instance
import Navbar from '../../components/layout/Navbar';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student', // Default
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/auth/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl shadow-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Create Account</h2>
          <p className="text-center text-gray-500 mb-8">Join your college community today</p>

          {/* Role Selector */}
          <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
            <button
              onClick={() => setFormData({ ...formData, role: 'student' })}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition ${formData.role === 'student' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
            >
              Student
            </button>
            <button
              onClick={() => setFormData({ ...formData, role: 'clubadmin' })}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition ${formData.role === 'clubadmin' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
            >
              Club Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder={formData.role === 'student' ? "Full Name" : "Club Name (e.g. Music Club)"}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              required
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="College Email"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              required
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              required
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:bg-blue-300"
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;