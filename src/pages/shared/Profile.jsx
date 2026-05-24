// import React from 'react';
// import { useSelector } from 'react-redux';
// import DashboardLayout from '../../components/layout/DashboardLayout';
// import { User, Mail, Shield } from 'lucide-react';

// const Profile = () => {
//   const { role } = useSelector((state) => state.auth);
//   // In a real app, you'd fetch full user data here using useEffect

//   return (
//     <DashboardLayout title="My Profile">
//       <div className="max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
//         <div className="flex flex-col items-center">
//           <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//             <User size={48} className="text-blue-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800">User Name</h2>
//           <p className="text-gray-500 mb-6 font-medium uppercase tracking-wider text-sm">{role}</p>
//         </div>

//         <div className="space-y-4">
//           <div className="flex items-center p-3 bg-gray-50 rounded-xl">
//             <Mail className="text-gray-400 mr-3" size={20} />
//             <span className="text-gray-700">user@college.edu</span>
//           </div>
//           <div className="flex items-center p-3 bg-gray-50 rounded-xl">
//             <Shield className="text-gray-400 mr-3" size={20} />
//             <span className="text-gray-700">Verified Account</span>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default Profile;





import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { 
  Camera, User, School, Hash, BookOpen, Save, 
  Edit3, Mail, Phone, ArrowLeft, Shield 
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '', email: '', collegeName: '', section: '', rollNumber: '', bio: '', phoneNumber: ''
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/auth/profile');
      setFormData(data);
      setPreview(data.profilePicture?.url);
      setRole(data.role);
    } catch (err) {
      console.error("Error fetching profile", err);
    } finally {
      setLoading(false);
    }
  };

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
      setIsEditing(false); // Switch back to View mode
      fetchProfile();
    } catch (err) { alert("Update failed"); }
  };

  if (loading) return <div className="p-10 text-center font-bold text-gray-500">Loading profile...</div>;

  return (

     <DashboardLayout title="My Profile">     
    <div className="max-w-4xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black text-gray-800">My Profile</h1>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
          >
            <Edit3 size={18} /> Edit Profile
          </button>
        ) : (
          <button 
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-2 text-gray-500 font-bold hover:text-gray-800 transition"
          >
            <ArrowLeft size={18} /> Cancel
          </button>
        )}
      </div>

      {!isEditing ? (
        /* --- VIEW MODE: Elegant Profile Card --- */
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
          <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-6">
              <div className="h-32 w-32 rounded-3xl border-4 border-white bg-gray-100 overflow-hidden shadow-md">
                <img src={preview || '/default-avatar.png'} className="h-full w-full object-cover" alt="Profile" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-black text-gray-900">{formData.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Shield size={14} className="text-blue-500" />
                    <span className="text-xs font-black text-blue-600 uppercase tracking-tighter">{role} Member</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="p-2 bg-gray-50 rounded-lg"><Mail size={18} /></div>
                    <span className="font-medium">{formData.email}</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="p-2 bg-gray-50 rounded-lg"><Phone size={18} /></div>
                    <span className="font-medium">{formData.phoneNumber || 'No phone added'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-4">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Academic Details</h3>
                {role === 'student' ? (
                  <>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400">COLLEGE</p>
                      <p className="font-bold text-gray-800">{formData.collegeName || 'Not Set'}</p>
                    </div>
                    <div className="flex gap-10">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400">SECTION</p>
                        <p className="font-bold text-gray-800">{formData.section || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400">ROLL NUMBER</p>
                        <p className="font-bold text-gray-800">{formData.rollNumber || 'N/A'}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-[10px] font-bold text-gray-400">CLUB IDENTITY & BIO</p>
                    <p className="text-gray-700 italic leading-relaxed mt-2">
                      {formData.bio || 'This club admin has not added a bio yet.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* --- EDIT MODE: The Update Form --- */
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col items-center gap-4 border-b pb-8">
              <div className="relative group">
                <div className="h-28 w-28 rounded-3xl overflow-hidden border-4 border-blue-50 bg-gray-100">
                  <img src={preview || '/default-avatar.png'} className="h-full w-full object-cover" />
                </div>
                <label className="absolute -bottom-2 -right-2 p-2.5 bg-blue-600 text-white rounded-xl cursor-pointer shadow-lg hover:bg-blue-700 transition">
                  <Camera size={18} />
                  <input type="file" className="hidden" onChange={(e) => {
                    setImage(e.target.files[0]);
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }} />
                </label>
              </div>
              <p className="text-xs font-bold text-gray-400">Click icon to change photo</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase ml-1">Full Name</label>
                <input className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500" 
                       value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase ml-1">Phone Number</label>
                <input className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500" 
                       value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} />
              </div>

              {role === 'student' && (
                <>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black text-gray-400 uppercase ml-1">College Name</label>
                    <input className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500" 
                           value={formData.collegeName} onChange={e => setFormData({...formData, collegeName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase ml-1">Section</label>
                    <input className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500" 
                           value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase ml-1">Roll Number</label>
                    <input className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500" 
                           value={formData.rollNumber} onChange={e => setFormData({...formData, rollNumber: e.target.value})} />
                  </div>
                </>
              )}

              {role === 'clubadmin' && (
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">Club Bio</label>
                  <textarea className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500" rows="4"
                            value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} />
                </div>
              )}
            </div>

            <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition shadow-xl shadow-gray-100">
              <Save size={20} /> Save Changes
            </button>
          </form>
        </div>
      )}
    </div>

    </DashboardLayout>
  );
};

export default Profile;