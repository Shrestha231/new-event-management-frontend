import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import API from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { ImagePlus, X } from 'lucide-react'; // Optional: for better UI

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: 'Technical',
  });
  
  const [image, setImage] = useState(null); // Stores the actual file
  const [preview, setPreview] = useState(null); // Stores the preview URL
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Create a temporary URL for preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use FormData for file uploads
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('date', formData.date);
      data.append('location', formData.location);
      data.append('category', formData.category);
      
      if (image) {
        data.append('image', image); // 'image' must match the field name in your Multer middleware
      }

      await API.post('/events', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Crucial for file uploads[cite: 6]
        },
      });

      alert('Event created and sent for approval!');
      navigate('/clubadmin-dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Create New Event">
      <div className="max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Poster</label>
            <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center hover:border-blue-400 transition cursor-pointer">
              {preview ? (
                <div className="relative w-full">
                  <img src={preview} alt="Preview" className="h-48 w-full object-cover rounded-xl" />
                  <button 
                    type="button" 
                    onClick={() => {setPreview(null); setImage(null);}}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center cursor-pointer">
                  <ImagePlus size={40} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Click to upload event image</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageChange} 
                  />
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
            <input 
              type="text" required className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input 
                type="date" required className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="Technical">Technical</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
                <option value="Workshop">Workshop</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input 
              type="text" required className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              rows="4" required className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell us more about the event..."
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <button 
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-white transition ${loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Uploading...' : 'Submit Event for Approval'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateEvent;