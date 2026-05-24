import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import API from '../../api/axios';
import { Calendar, MapPin, Trash2 } from 'lucide-react';

const MySchedule = () => {
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    const fetchMySchedule = async () => {
      try {
        const { data } = await API.get('/events/student/my-schedule');
        setMyEvents(data);
      } catch (err) {
        console.error("Error fetching schedule");
      }
    };
    fetchMySchedule();
  }, []);

  const handleUnregister = async (id) => {
    if(!window.confirm("Are you sure you want to leave this event?")) return;
    try {
      await API.put(`/events/${id}/unregister`);
      setMyEvents(myEvents.filter(event => event._id !== id));
      alert("Unregistered successfully");
    } catch (err) {
      alert("Error unregistering");
    }
  };

  return (
    <DashboardLayout title="My Registered Events">
      <div className="grid grid-cols-1 gap-4">
        {myEvents.length === 0 ? (
          <p className="text-gray-500">You haven't registered for any events yet.</p>
        ) : (
          myEvents.map(event => (
            <div key={event._id} className="bg-white p-6 rounded-2xl shadow-sm border flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{event.title}</h3>
                <div className="flex gap-4 text-sm text-gray-500 mt-1">
                   <span className="flex items-center"><Calendar size={14} className="mr-1"/> {new Date(event.date).toLocaleDateString()}</span>
                   <span className="flex items-center"><MapPin size={14} className="mr-1"/> {event.location}</span>
                </div>
              </div>
              <button 
                onClick={() => handleUnregister(event._id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default MySchedule;