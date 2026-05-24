import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../../features/authSlice';
import { 
  LayoutDashboard, 
  LogOut, 
  User, 
  Calendar, 
  ShieldCheck, 
  PlusCircle, 
  List, 
  ListCheck
} from 'lucide-react';

const DashboardLayout = ({ children, title }) => {
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 font-bold text-2xl text-blue-600">EventHub</div>
        
        <nav className="flex-1 px-4 space-y-1">
          {/* Common Dashboard Link */}
          <SidebarItem to={`/${role}-dashboard`} icon={<LayoutDashboard size={20}/>} label="Dashboard" />

          {/* Student Specific Links */}
          {role === 'student' && (
            <SidebarItem to="/my-schedule" icon={<Calendar size={20}/>} label="My Schedule" />
          )}

          {/* Club Admin Specific Links */}
         {role === 'clubadmin' && (
  <>
    <SidebarItem to="/create-event" icon={<PlusCircle size={20}/>} label="Create Event" />
    {/* Ensure this route is handled in your App.jsx */}
    <SidebarItem to="/clubadmin-dashboard" icon={<List size={20}/>} label="Manage Events" />
  </>
)}

          {/* Superadmin Specific Links */}
         {role === 'superadmin' && (
          <>    
  <SidebarItem to="/superadmin-dashboard" icon={<ShieldCheck size={20}/>} label="Pending Approvals" />
  <SidebarItem to="/all-events" icon={<ListCheck size={20}/>} label="All Gallery" />
   </>
)}

          {/* Shared Link */}
          <SidebarItem to="/profile" icon={<User size={20}/>} label="Profile" />
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout} 
            className="w-full p-3 flex items-center text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut className="mr-3" size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase">
              {role}
            </span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">
    <span className="mr-3">{icon}</span> {label}
  </Link>
);

export default DashboardLayout;