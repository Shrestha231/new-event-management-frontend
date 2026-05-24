import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';

// Sample event data
export const sampleEvents = [
  {
    id: 1,
    title: 'React Masterclass 2024',
    date: '2024-06-15',
    time: '10:00 AM',
    location: 'Tech Hall, Building A',
    category: 'Technical',
    description: 'Learn advanced React concepts including hooks, context API, and performance optimization.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    fullDescription: 'This comprehensive masterclass covers advanced React concepts. You\'ll learn about hooks, custom hooks, context API for state management, performance optimization techniques, and best practices for building scalable applications.',
    speakers: ['John Doe', 'Jane Smith'],
    capacity: 100,
    registered: 45,
    tags: ['React', 'JavaScript', 'Web Development'],
  },
  {
    id: 2,
    title: 'Annual Sports Day',
    date: '2024-07-10',
    time: '08:00 AM',
    location: 'Main Stadium',
    category: 'Sports',
    description: 'Exciting sports competition featuring cricket, football, badminton, and athletics.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
    fullDescription: 'Join us for an exciting day of sports! We have multiple events including cricket tournament, football matches, badminton competition, and athletics races. All students are welcome to participate or cheer for their friends.',
    speakers: ['Sports Committee'],
    capacity: 500,
    registered: 320,
    tags: ['Sports', 'Cricket', 'Football', 'Athletics'],
  },
  {
    id: 3,
    title: 'Cultural Fest Night',
    date: '2024-06-20',
    time: '06:00 PM',
    location: 'Auditorium',
    category: 'Cultural',
    description: 'Experience diverse cultural performances including dance, music, and drama.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    fullDescription: 'Celebrate diverse cultures at our annual cultural fest! Enjoy traditional and contemporary performances including classical dance, live music, drama productions, and much more. Refreshments will be served.',
    speakers: ['Cultural Club'],
    capacity: 200,
    registered: 180,
    tags: ['Culture', 'Dance', 'Music', 'Art'],
  },
  {
    id: 4,
    title: 'Python for Beginners',
    date: '2024-07-05',
    time: '02:00 PM',
    location: 'Lab Room 101',
    category: 'Technical',
    description: 'Start your programming journey with Python. Perfect for beginners with no coding experience.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    fullDescription: 'A beginner-friendly workshop to learn Python programming fundamentals. We\'ll cover variables, data types, control flow, functions, and basic object-oriented programming. Bring your laptop and get ready to code!',
    speakers: ['Alex Kumar'],
    capacity: 50,
    registered: 38,
    tags: ['Python', 'Programming', 'Beginners'],
  },
  {
    id: 5,
    title: 'Startup Pitch Competition',
    date: '2024-08-01',
    time: '11:00 AM',
    location: 'Innovation Hub',
    category: 'Technical',
    description: 'Showcase your innovative ideas and compete for prizes in our startup pitch event.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    fullDescription: 'A platform for student entrepreneurs to pitch their startup ideas to investors and industry experts. Top 3 pitches will receive funding opportunities and mentorship from seasoned entrepreneurs.',
    speakers: ['Venture Capitalists', 'Industry Experts'],
    capacity: 150,
    registered: 75,
    tags: ['Startup', 'Entrepreneurship', 'Innovation'],
  },
  {
    id: 6,
    title: 'Music Concert',
    date: '2024-07-25',
    time: '07:00 PM',
    location: 'Open Air Amphitheater',
    category: 'Cultural',
    description: 'Live music performances by popular bands and artists. A night of great music and entertainment.',
    image: 'https://images.unsplash.com/photo-1533696635125-bfca3b1dd449?w=500&h=300&fit=crop',
    fullDescription: 'Experience live music performances from popular bands and solo artists. Enjoy a variety of genres from rock to classical. Limited seating available, so book your tickets early!',
    speakers: ['Various Artists'],
    capacity: 300,
    registered: 250,
    tags: ['Music', 'Concert', 'Entertainment'],
  },
];

const EventList = ({ onEventClick }) => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">Upcoming Events</h1>
      <p className="text-gray-600 mb-8">Discover and join amazing events happening around campus</p>
      
      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleEvents.map((event) => (
          <Link 
            key={event.id} 
            to={`/event/${event.id}`}
            onClick={() => onEventClick && onEventClick(event)}
            className="group bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden h-48 bg-gray-200">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${
                  event.category === 'Technical' ? 'bg-blue-600' :
                  event.category === 'Cultural' ? 'bg-purple-600' :
                  'bg-green-600'
                }`}>
                  {event.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {event.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {event.description}
              </p>

              {/* Event Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <Calendar size={16} className="text-blue-600" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <Clock size={16} className="text-blue-600" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <MapPin size={16} className="text-blue-600" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>

              {/* Capacity Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Registered</span>
                  <span>{event.registered}/{event.capacity}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {event.tags.slice(0, 2).map((tag, idx) => (
                  <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventList;
