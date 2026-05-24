import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import API from '../../api/axios';
import { Trash2, ExternalLink } from 'lucide-react';

const AllEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const { data } = await API.get('/events'); // Fetches all approved events[cite: 17]
        setEvents(data);
      } catch (err) {
        console.error("Error fetching gallery");
      }
    };
    fetchAllEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Superadmin: Are you sure you want to delete this event permanently?")) return;
    try {
      await API.delete(`/events/${id}`);
      setEvents(events.filter(e => e._id !== id));
      alert("Event removed from platform.");
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <DashboardLayout title="Platform Event Gallery">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <img src={event.image?.url} className="w-full h-40 object-cover" alt={event.title} />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-800">{event.title}</h3>
                <button onClick={() => handleDelete(event._id)} className="text-red-500 hover:bg-red-50 p-1 rounded">
                  <Trash2 size={18} />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Club: {event.createdBy?.name || 'Unknown'}</p>
              <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                <span className="text-xs font-bold text-blue-600 uppercase">{event.category}</span>
                <button className="text-gray-400 hover:text-blue-600">
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default AllEvents;