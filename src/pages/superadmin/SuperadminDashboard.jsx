import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import API from '../../api/axios';
import { Check, Trash2, ExternalLink, Users, Calendar, AlertCircle, MapPin, Tag, Clock } from 'lucide-react';

const SuperadminDashboard = () => {
  const [activeTab, setActiveTab] = useState('events'); 
  const [pendingEvents, setPendingEvents] = useState([]);
  const [pendingClubs, setPendingClubs] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'events') {
        const { data } = await API.get('/superadmin/pending-events'); //[cite: 24, 27]
        setPendingEvents(data);
      } else if (activeTab === 'all') {
        const { data } = await API.get('/events'); //[cite: 23, 26]
        setAllEvents(data);
      } else {
        const { data } = await API.get('/superadmin/pending'); //[cite: 24, 27]
        setPendingClubs(data);
      }
    } catch (err) { console.error("Fetch error:", err); }
  };

  const handleApproveEvent = async (id) => {
    try {
      await API.put(`/superadmin/approve-event/${id}`); //[cite: 24, 27]
      alert("Event Approved and Live!");
      fetchData();
    } catch (err) { alert("Approval failed"); }
  };

  const handleVerifyClub = async (id) => {
    try {
      await API.put(`/superadmin/approve/${id}`); //[cite: 24, 27]
      alert("Club Verified!");
      fetchData();
    } catch (err) { alert("Verification failed"); }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Permanently delete this event?")) return;
    try {
      await API.delete(`/events/${id}`); //[cite: 23, 26]
      fetchData();
    } catch (err) { alert("Delete failed"); }
  };

  return (
    <DashboardLayout title="Superadmin Control Panel">
      {/* Enhanced Tab Switcher */}
      <div className="flex gap-2 mb-8 bg-gray-100 p-1.5 rounded-2xl border w-fit">
        {['events', 'clubs', 'all'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
              activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'events' ? 'Pending Events' : tab === 'clubs' ? 'Verify Clubs' : 'Platform Gallery'}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {/* TAB: PENDING EVENTS (DETAILED VIEW) */}
        {activeTab === 'events' && (
          pendingEvents.length === 0 ? <EmptyState msg="No events awaiting approval" /> : (
            <div className="grid grid-cols-1 gap-6">
              {pendingEvents.map(event => (
                <DetailedEventCard 
                  key={event._id}
                  event={event}
                  onApprove={() => handleApproveEvent(event._id)}
                  onReject={() => handleDeleteEvent(event._id)}
                />
              ))}
            </div>
          )
        )}

        {/* TAB: PENDING CLUBS */}
        {activeTab === 'clubs' && (
          pendingClubs.length === 0 ? <EmptyState msg="No club verification requests" /> : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingClubs.map(club => (
                <ClubVerifyCard 
                  key={club._id} 
                  club={club} 
                  onApprove={() => handleVerifyClub(club._id)} 
                />
              ))}
            </div>
          )
        )}

        {/* TAB: ALL GALLERY */}
        {activeTab === 'all' && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allEvents.map(event => (
              <GalleryCard key={event._id} event={event} onDelete={() => handleDeleteEvent(event._id)} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

/* --- SUB-COMPONENTS FOR BETTER UI --- */

const DetailedEventCard = ({ event, onApprove, onReject }) => (
  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
    {/* Event Poster */}
    <div className="md:w-72 h-52 md:h-auto bg-gray-100 relative">
      <img 
        src={event.image?.url || 'https://via.placeholder.com/400x300?text=No+Poster'} 
        className="w-full h-full object-cover"
        alt={event.title}
      />
      <div className="absolute top-3 left-3">
        <span className="bg-white/90 backdrop-blur-md text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
          {event.category}
        </span>
      </div>
    </div>

    {/* Content Details */}
    <div className="flex-1 p-6 flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-black text-gray-900 leading-tight">{event.title}</h3>
          <p className="text-sm font-bold text-blue-600 mt-1">Organized by: {event.createdBy?.name || 'Unknown Club'}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onReject} className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition" title="Reject/Delete">
            <Trash2 size={20} />
          </button>
          <button onClick={onApprove} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-bold transition shadow-lg shadow-green-100">
            <Check size={20} /> Approve Event
          </button>
        </div>
      </div>

      <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-1 italic">
        "{event.description || 'No description provided for this event.'}"
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t pt-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={16} className="text-blue-500" />
          <span className="text-xs font-semibold">{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={16} className="text-blue-500" />
          <span className="text-xs font-semibold truncate">{event.location || 'Campus Wide'}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={16} className="text-blue-500" />
          <span className="text-xs font-semibold">Pending Review</span>
        </div>
      </div>
    </div>
  </div>
);

const ClubVerifyCard = ({ club, onApprove }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between group hover:border-blue-200 transition-colors">
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg">
        {club.name?.charAt(0)}
      </div>
      <div>
        <h4 className="font-bold text-gray-900">{club.name}</h4>
        <p className="text-xs text-gray-400">{club.email}</p>
      </div>
    </div>
    <button onClick={onApprove} className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-blue-600 transition">
      Verify Club
    </button>
  </div>
);

const GalleryCard = ({ event, onDelete }) => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden group">
    <div className="relative h-32">
      <img src={event.image?.url} className="w-full h-full object-cover" alt={event.title} />
      <button onClick={onDelete} className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-lg text-red-500 opacity-0 group-hover:opacity-100 transition">
        <Trash2 size={14} />
      </button>
    </div>
    <div className="p-3">
      <h4 className="font-bold text-sm text-gray-800 truncate">{event.title}</h4>
      <p className="text-[10px] text-gray-400">Club: {event.createdBy?.name}</p>
    </div>
  </div>
);

const EmptyState = ({ msg }) => (
  <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
    <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
      <AlertCircle className="text-gray-300" size={32} />
    </div>
    <p className="text-gray-400 font-bold">{msg}</p>
  </div>
);

export default SuperadminDashboard;