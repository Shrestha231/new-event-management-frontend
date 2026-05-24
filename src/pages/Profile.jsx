import { useState, useEffect } from 'react';
import API from '../api/axios';
import { Camera, User, School, Hash, BookOpen, Save } from 'lucide-react';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', collegeName: '', section: '', rollNumber: '', bio: '', phoneNumber: ''
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchProfile = async () => { 
      const { data } = await API.get('/auth/profile');
      setFormData(data);
      setPreview(data.profilePicture?.url);
      setRole(data.role);
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append('profilePicture', image);

    try {
      await API.put('/auth/profile', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Profile Updated Successfully!");
    } catch (err) { alert("Update failed"); }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-blue-50 bg-gray-100">
              <img src={preview || '/default-avatar.png'} className="h-full w-full object-cover" />
            </div>
            <label className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition">
              <Camera size={20} />
              <input type="file" className="hidden" onChange={(e) => {
                setImage(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }} />
            </label>
          </div>
          <h2 className="text-2xl font-black text-gray-800">{formData.name}</h2>
          <span className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest">{role}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Universal Fields */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500" 
                     value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
          </div>

          {/* Conditional Fields for Students */}
          {role === 'student' && (
            <>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase ml-1">College Name</label>
                <div className="relative">
                  <School className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500" 
                         value={formData.collegeName} onChange={e => setFormData({...formData, collegeName: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase ml-1">Roll Number</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500" 
                         value={formData.rollNumber} onChange={e => setFormData({...formData, rollNumber: e.target.value})} />
                </div>
              </div>
            </>
          )}

          {/* Conditional Fields for Club Admins */}
          {role === 'clubadmin' && (
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase ml-1">Club Bio / Identity</label>
              <textarea className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500" rows="4"
                        placeholder="Tell students about your club's mission..."
                        value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} />
            </div>
          )}
        </div>

        <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition shadow-xl shadow-gray-200">
          <Save size={20} /> Save Profile Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;