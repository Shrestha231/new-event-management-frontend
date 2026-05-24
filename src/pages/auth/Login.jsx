import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setCredentials } from '../../features/authSlice';
import { Eye, EyeOff } from 'lucide-react'; // Icons for visibility
import API from '../../api/axios';
import Navbar from '../../components/layout/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });
      
      dispatch(setCredentials({ 
        user: data.user, 
        token: data.token, 
        role: data.role 
      }));

      if (data.role === 'superadmin') navigate('/superadmin-dashboard');
      else if (data.role === 'clubadmin') navigate('/clubadmin-dashboard');
      else navigate('/student-dashboard');

    } catch (err) {
      alert(err.response?.data?.message || 'Login Failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl shadow-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Welcome Back</h2>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your college email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"} // Dynamic type
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-gray-400 hover:text-blue-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="text-right">
              <Link to="/forgot-password" title="Reset your password" className="text-blue-600 text-sm hover:underline">
                Forgot password?
              </Link>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100">
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600">
            Don't have an account? <Link to="/register" className="text-blue-600 font-semibold">Register now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;