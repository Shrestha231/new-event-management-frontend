import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import API from '../../api/axios';
import { Users, Calendar, Clock, CheckCircle, Trash2, X, Eye } from 'lucide-react';

const ClubDashboard = () => {
  const [stats, setStats] = useState(null);
  const [myEvents, setMyEvents] = useState([]);
  
  // Modal & Attendee States
  const [selectedEventTitle, setSelectedEventTitle] = useState('');
  const [attendees, setAttendees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1. Fetch Main Dashboard Data
  const fetchClubData = async () => {
    try {
      const statsRes = await API.get('/events/admin/stats');
      setStats(statsRes.data);
      // Ensure we are getting the events array from the stats response
      setMyEvents(statsRes.data.events || []); 
    } catch (err) {
      console.error("Error fetching club data:", err);
    }
  };

  useEffect(() => {
    fetchClubData();
  }, []);

  // 2. Fetch Attendee Details for the Pop-up[cite: 20]
  const handleViewAttendees = async (eventId, eventTitle) => {
    if (!eventId) return;
    
    setSelectedEventTitle(eventTitle);
    setLoading(true);
    try {
      const res = await API.get(`/events/${eventId}/attendees`);
      // Backend might return { attendees: [...] } or just [...]
      const data = res.data.attendees || res.data;
      setAttendees(Array.isArray(data) ? data : []);
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching attendees:", err);
      alert("Could not load attendee list. Please check if the route exists.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Delete Event
  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;

    try {
      await API.delete(`/events/${eventId}`);
      alert("Event deleted successfully");
      fetchClubData(); // Refresh list after deletion
    } catch (err) {
      alert("Error deleting event. You might not have permission.");
    }
  };

  return (
    <DashboardLayout title="Club Admin Dashboard">
      
      {/* --- STATS SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard icon={<Calendar className="text-blue-600"/>} label="Total Events" value={stats?.totalEvents || 0} />
        <StatCard icon={<Users className="text-green-600"/>} label="Total Registrations" value={stats?.totalRegistrations || 0} />
        <StatCard icon={<Clock className="text-yellow-600"/>} label="Pending Approval" value={myEvents.filter(e => !e.isApproved).length} />
      </div>

      {/* --- VISUAL CARDS SECTION --- */}
      <h3 className="font-bold text-gray-800 mb-4 text-lg">Event Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {myEvents.map((event) => (
          <div key={event._id || event.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
        {/* Event Poster Logic */}
<div className="h-40 bg-gray-100 relative">
 {event.image ? (
  <img 
    src={typeof event.image === 'string' ? event.image : (event.image.url || event.image.secure_url)} 
    className="w-full h-full object-cover" 
    alt={event.title}
    onError={(e) => { 
      e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found'; 
    }}
  />
) : (
  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50 text-xs italic">
    No Poster Uploaded
  </div>
)}
  {/* Status Badge */}
  <div className="absolute top-2 right-2">
    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase shadow-sm ${event.isApproved ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
      {event.isApproved ? 'Live' : 'Pending'}
    </span>
  </div>
</div>
            <div className="p-4">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{event.category}</span>
              <h3 className="font-bold text-gray-800 truncate mt-1">{event.title}</h3>
              <div className="flex justify-between items-center mt-4">
                <p className="text-gray-500 text-xs">{new Date(event.date).toLocaleDateString()}</p>
                <button 
                  onClick={() => handleViewAttendees(event._id || event.id, event.title)}
                  className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-bold hover:bg-blue-100 transition flex items-center gap-1"
                >
                  <Eye size={14} /> Attendees
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MANAGEMENT TABLE SECTION --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-10">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Manage Event Records</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-[11px] uppercase tracking-wider font-bold">
              <tr>
                <th className="p-4">Event Title</th>
                <th className="p-4">Date</th>
                <th className="p-4">Attendees</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {myEvents.map(event => (
                <tr key={event._id || event.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-semibold text-gray-900">{event.title}</td>
                  <td className="p-4 text-gray-600 text-sm">{new Date(event.date).toLocaleDateString()}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleViewAttendees(event._id || event.id, event.title)}
                      className="flex items-center gap-1 text-blue-600 hover:underline font-bold"
                    >
                      <Users size={16} /> {event.attendeeCount || 0}
                    </button>
                  </td>
                  <td className="p-4">
                    {event.isApproved ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                        <CheckCircle size={12} className="mr-1"/> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">
                        <Clock size={12} className="mr-1"/> Reviewing
                      </span>
                    )}
                  </td>
                  <td className="p-4 flex justify-center gap-2">
                    <button 
                      onClick={() => handleDelete(event._id || event.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      title="Delete Event"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ATTENDEE MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Student Registrations</h3>
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1">{selectedEventTitle}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-900 transition">
                <X size={24} />
              </button>
            </div>
            
            <div className="max-h-80 overflow-y-auto p-4 space-y-3">
              {attendees.length > 0 ? (
                attendees.map((student, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 bg-white">
                    <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {student.name ? student.name.charAt(0) : '?'}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{student.name || 'Unknown'}</p>
                      <p className="text-xs text-gray-500">{student.email}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Users size={40} className="mx-auto text-gray-200 mb-2" />
                  <p className="text-gray-400 italic">No registrations found.</p>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-sm transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

// Sub-component for Stats[cite: 17]
const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-100 transition group">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-gray-50 rounded-xl group-hover:scale-110 transition-transform">{icon}</div>
      <div>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-black text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

export default ClubDashboard;