import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Share2, Heart, ChevronLeft } from 'lucide-react';
import { sampleEvents } from '../components/shared/EventList';

const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Find the event from sample data
  const event = sampleEvents.find(e => e.id === parseInt(id));

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto p-6 h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-8">The event you're looking for doesn't exist.</p>
          <Link 
            to="/browse" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const handleRegister = () => {
    setIsRegistered(!isRegistered);
    // Add API call here to register user for the event
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    } else {
      alert('Share this event: ' + window.location.href);
    }
  };

  const spotsAvailable = event.capacity - event.registered;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Events
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden mb-8 shadow-lg">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`text-sm font-bold px-4 py-2 rounded-full text-white ${
                  event.category === 'Technical' ? 'bg-blue-600' :
                  event.category === 'Cultural' ? 'bg-purple-600' :
                  'bg-green-600'
                }`}>
                  {event.category}
                </span>
              </div>
            </div>

            {/* Title and Basic Info */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{event.title}</h1>

            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-white p-6 rounded-xl border border-gray-200">
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Calendar size={18} className="text-blue-600" />
                  <span className="text-sm font-semibold">Date</span>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Clock size={18} className="text-blue-600" />
                  <span className="text-sm font-semibold">Time</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{event.time}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <MapPin size={18} className="text-blue-600" />
                  <span className="text-sm font-semibold">Location</span>
                </div>
                <p className="text-lg font-bold text-gray-900 truncate">{event.location}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Users size={18} className="text-blue-600" />
                  <span className="text-sm font-semibold">Spots Left</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{spotsAvailable}/{event.capacity}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{event.fullDescription}</p>

              {/* Speakers */}
              {event.speakers && event.speakers.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Featured Speakers</h3>
                  <div className="flex flex-wrap gap-3">
                    {event.speakers.map((speaker, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                          {speaker.charAt(0)}
                        </div>
                        <span className="font-semibold text-gray-900">{speaker}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Topics Covered</h3>
              <div className="flex flex-wrap gap-3">
                {event.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold hover:bg-blue-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Registration Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24 shadow-lg">
              {/* Capacity Info */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Capacity</span>
                  <span className="font-bold">{event.registered}/{event.capacity}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {spotsAvailable} spots available
                </p>
              </div>

              {/* Register Button */}
              <button
                onClick={handleRegister}
                disabled={spotsAvailable === 0}
                className={`w-full py-3 rounded-lg font-bold transition-all duration-300 mb-4 ${
                  isRegistered
                    ? 'bg-green-100 text-green-700 border-2 border-green-600'
                    : spotsAvailable === 0
                    ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-600/40'
                }`}
              >
                {isRegistered ? '✓ Registered' : spotsAvailable === 0 ? 'Event Full' : 'Register for Event'}
              </button>

              {/* Save Button */}
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`w-full py-2 rounded-lg font-semibold transition-colors mb-4 border-2 flex items-center justify-center gap-2 ${
                  isSaved
                    ? 'bg-red-50 text-red-600 border-red-300'
                    : 'text-gray-700 border-gray-300 hover:border-red-300 hover:bg-red-50'
                }`}
              >
                <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
                {isSaved ? 'Saved' : 'Save Event'}
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="w-full py-2 rounded-lg font-semibold transition-colors border-2 border-gray-300 text-gray-700 hover:border-blue-300 hover:bg-blue-50 flex items-center justify-center gap-2"
              >
                <Share2 size={18} />
                Share
              </button>

              {/* Event Info Box */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">Event Information</h4>
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold text-gray-900">Category</p>
                    <p>{event.category}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Registration</p>
                    <p>{event.registered} people registered</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Status</p>
                    <p className={spotsAvailable === 0 ? 'text-red-600' : 'text-green-600'}>
                      {spotsAvailable === 0 ? 'Event Full' : 'Open for Registration'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Questions?</span> Contact the event organizer for more details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
