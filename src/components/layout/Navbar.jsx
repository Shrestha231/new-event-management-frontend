import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';
import { Menu, X, CalendarDays, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { token, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white border-b-2 border-gray-100 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <CalendarDays className="text-blue-600 group-hover:scale-110 transition-transform" size={32} strokeWidth={2} />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity blur-lg" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all">
              EventHub
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <Link to="/" className="text-gray-700 hover:text-purple-600 font-semibold transition-colors relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link to="/browse" className="text-gray-700 hover:text-purple-600 font-semibold transition-colors relative group">
              Events
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300" />
            </Link>
            
            {token ? (
              <div className="flex items-center gap-5">
                <Link 
                  to={`/${role}-dashboard`} 
                  className="px-6 py-2.5 rounded-lg text-white font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-lg hover:shadow-purple-600/40 transition-all duration-300 flex items-center gap-2"
                >
                  Dashboard
                  <ChevronDown size={16} />
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-gray-700 hover:text-red-600 font-semibold transition-colors px-4 py-2 rounded-lg hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-purple-600 font-semibold transition-colors px-4 py-2 rounded-lg hover:bg-purple-50"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-6 py-2.5 rounded-lg text-white font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-600/40 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} className="text-gray-900" /> : <Menu size={28} className="text-gray-900" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 bg-gradient-to-b from-white to-gray-50 py-6 px-4 space-y-4">
            <Link 
              to="/" 
              className="block text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-purple-100 hover:text-purple-700 transition-all"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/browse" 
              className="block text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-purple-100 hover:text-purple-700 transition-all"
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>
            
            {token ? (
              <>
                <Link 
                  to={`/${role}-dashboard`}
                  className="block w-full px-6 py-3 rounded-lg text-white font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full px-6 py-3 rounded-lg text-red-600 font-bold bg-red-50 hover:bg-red-100 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="block w-full px-6 py-3 rounded-lg text-gray-700 font-bold border-2 border-gray-300 hover:border-purple-600 hover:text-purple-600 transition-all text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="block w-full px-6 py-3 rounded-lg text-white font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;