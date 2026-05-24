import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import StudentDashboard from './pages/student/StudentDashboard';
import Profile from './pages/shared/Profile';

// import Profile from './pages/Profile.jsx';
import MySchedule from './pages/student/MySchedule';
import CreateEvent from './pages/club/CreateEvent';
import ClubDashboard from './pages/club/ClubDashboard';
import SuperadminDashboard from './pages/superadmin/SuperadminDashboard';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import AllEvents from './pages/superadmin/AllEvents';
import EventList from './components/shared/EventList';
import EventPage from './pages/EventPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-schedule"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <MySchedule />
            </ProtectedRoute>
          }
        />

        {/* ================ Club Admin Routes ================ */}
      <Route path="/clubadmin-dashboard" element={
  <ProtectedRoute allowedRoles={['clubadmin']}>
    <ClubDashboard />
  </ProtectedRoute>
} />

        <Route path="/create-event" element={
  <ProtectedRoute allowedRoles={['clubadmin']}>
    <CreateEvent />
  </ProtectedRoute>
} />


{/* Superadmin Routes */}
      <Route path="/superadmin-dashboard" element={
  <ProtectedRoute allowedRoles={['superadmin']}>
    <SuperadminDashboard />
  </ProtectedRoute>
} />

        {/* Superadmin All Events Gallery */}
<Route path="/all-events" element={
  <ProtectedRoute allowedRoles={['superadmin']}>
    <AllEvents /> {/* You can reuse the StudentDashboard component! */}
  </ProtectedRoute>
} />

        {/* Event Routes */}
        <Route path="/browse" element={<EventList />} />
        <Route path="/event/:id" element={<EventPage />} />

        {/* Add routes for clubadmin and superadmin dashboards, event details, etc. */}
      </Routes>
    </Router>
  );
}

export default App;