import { useEffect, useState } from 'react';
import API from '../api/axios';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await API.get('/events'); 
      setEvents(data); // Assume backend returns events sorted by date
    };
    fetchEvents();
  }, []);

  // Filter logic
  const filteredEvents = category === 'All' 
    ? events 
    : events.filter(e => e.category === category);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      
      {/* Category Tabs */}
      <div className="flex gap-4 mb-8">
        {['All', 'Technical', 'Cultural', 'Sports'].map(cat => (
          <button 
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full ${category === cat ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <div key={event._id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 transition hover:shadow-xl">
            {/* Image Card Section */}
            <img 
              src={event.image?.url} 
              alt={event.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <span className="text-xs font-bold text-blue-600 uppercase">{event.category}</span>
              <h3 className="text-xl font-bold mt-1">{event.title}</h3>
              <p className="text-gray-500 text-sm mt-2 line-clamp-2">{event.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-400">{new Date(event.date).toLocaleDateString()}</span>
                <button className="text-blue-600 font-semibold">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};