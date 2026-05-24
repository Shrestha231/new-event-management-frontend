import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {
  Search, ChevronRight, Heart, Share2, Clock, MapPin, Users, Flame,
  Code2, Music2, Trophy, BookOpen, Mic2, Palette,
  CalendarSearch, ClipboardList, Award, Bell, ShieldCheck, LayoutDashboard,
  Upload,
} from 'lucide-react';

/* ─── Font ─── */
const FontLoader = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap');`}</style>
);

/* ─── Data ─── */
const CATEGORIES = [
  { label: 'Tech & Hackathons', count: 142, Icon: Code2,   card: 'from-[#1e3a8a] to-[#1e40af]', border: 'border-[#3b82f6]', ico: 'bg-blue-400/20 border-blue-400/50', accent: '#3b82f6', shadow: 'shadow-lg shadow-blue-400/30' },
  { label: 'Cultural Fests',    count: 98,  Icon: Music2,  card: 'from-[#831843] to-[#be185d]', border: 'border-[#ec4899]', ico: 'bg-pink-400/20 border-pink-400/50', accent: '#ec4899', shadow: 'shadow-lg shadow-pink-400/30' },
  { label: 'Sports',            count: 76,  Icon: Trophy,  card: 'from-[#b45309] to-[#d97706]', border: 'border-[#f59e0b]', ico: 'bg-amber-400/20 border-amber-400/50', accent: '#f59e0b', shadow: 'shadow-lg shadow-amber-400/30' },
  { label: 'Workshops',         count: 54,  Icon: BookOpen, card: 'from-[#065f46] to-[#059669]', border: 'border-[#10b981]', ico: 'bg-emerald-400/20 border-emerald-400/50', accent: '#10b981', shadow: 'shadow-lg shadow-emerald-400/30' },
  { label: 'Comedy & Open Mic', count: 31,  Icon: Mic2,   card: 'from-[#7c2d12] to-[#b45309]', border: 'border-[#fb923c]', ico: 'bg-orange-400/20 border-orange-400/50', accent: '#fb923c', shadow: 'shadow-lg shadow-orange-400/30' },
  { label: 'Art & Design',      count: 29,  Icon: Palette, card: 'from-[#581c87] to-[#7e22ce]', border: 'border-[#a855f7]', ico: 'bg-purple-400/20 border-purple-400/50', accent: '#a855f7', shadow: 'shadow-lg shadow-purple-400/30' },
];

const EVENTS = [
  { id: 1, title: 'National Level Hackathon 2025', org: 'CS Department',   date: 'Jan 28, 2025', time: '9:00 AM',  seats: '200 seats', hot: true,  tag: 'Tech',     tagCls: 'bg-[#dbeafe] text-[#1e40af] border-[#93c5fd]', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=70' },
  { id: 2, title: 'Spandan Cultural Festival',     org: 'Student Council', date: 'Feb 14, 2025', time: '5:00 PM',  seats: '500 seats', hot: true,  tag: 'Cultural', tagCls: 'bg-[#fbcfe8] text-[#be185d] border-[#f472b6]', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=70' },
  { id: 3, title: 'Inter-College Cricket Tournament', org: 'Sports Committee', date: 'Mar 5, 2025',  time: '8:00 AM',  seats: '32 teams',  hot: false, tag: 'Sports',   tagCls: 'bg-[#fed7aa] text-[#92400e] border-[#fdba74]', img: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&q=70' },
];

const FEATURES = [
  { Icon: CalendarSearch, title: 'Event Discovery',     desc: 'Browse and search all college events by category, date, or department with a clean, intuitive interface.',                          ico: 'bg-blue-100 border-blue-400', color: 'text-blue-600' },
  { Icon: ClipboardList,  title: 'Online Registration', desc: 'One-click event registration with instant confirmation, history tracking, and participant management.',                             ico: 'bg-cyan-100 border-cyan-400',     color: 'text-cyan-600'   },
  { Icon: Award,          title: 'Digital Certificates',desc: 'Automated certificate generation and PDF download for every student who attends an event.',                                         ico: 'bg-amber-100 border-amber-400',   color: 'text-amber-600'  },
  { Icon: Bell,           title: 'Notifications',       desc: 'Real-time alerts for event approvals, registrations, reminders, and important updates.',                                            ico: 'bg-rose-100 border-rose-400',     color: 'text-rose-600'   },
  { Icon: ShieldCheck,    title: 'Role-Based Access',   desc: 'Separate secure portals for Students, Event Organizers, and Administrators with tailored permissions.',                             ico: 'bg-emerald-100 border-emerald-400',   color: 'text-emerald-600'  },
  { Icon: LayoutDashboard,title: 'Event Management',    desc: 'Full lifecycle management: create, approve, update, track attendance, and close events seamlessly.',                                ico: 'bg-violet-100 border-violet-400',     color: 'text-violet-600'   },
];

const STEPS = [
  { n: '1', title: 'Create Your Account',        desc: 'Sign up with your college email. Your role — student, organizer, or admin — is automatically configured.' },
  { n: '2', title: 'Discover or Create Events',  desc: 'Browse events by category or create your own with smart templates in under 5 minutes.' },
  { n: '3', title: 'Register & Get Certified',   desc: 'One-click registration, QR-code entry, and an automatic digital certificate after attendance.' },
  { n: '4', title: 'Track & Manage',             desc: 'Organizers get live dashboards. Admins approve events. Everyone gets real-time notifications.' },
];

const STATS = [
  { value: '430+', label: 'Total Events',         from: 'from-violet-600', to: 'to-pink-600' },
  { value: '12K+', label: 'Registered Students',  from: 'from-blue-600',   to: 'to-emerald-600' },
  { value: '28',   label: 'Colleges',             from: 'from-amber-600',  to: 'to-orange-600' },
  { value: '150+', label: 'Organizers',           from: 'from-pink-600',   to: 'to-violet-600' },
];

const TESTIMONIALS = [
  { initials: 'AR', name: 'Aryan Raj',    role: 'B.Tech CSE, 3rd Year',     color: 'bg-purple-100 text-purple-700', quote: '"EventHub completely changed how I discover events on campus. I never miss a hackathon or workshop anymore. The certificate feature is a game changer for my resume."' },
  { initials: 'PS', name: 'Priya Sharma', role: 'Cultural Secretary, MCA',  color: 'bg-pink-100 text-pink-700',     quote: '"As an event organizer, managing registrations used to be chaos. Now everything is in one place — approvals, attendance, and reports are just a click away."' },
  { initials: 'DK', name: 'Dr. D. Kumar', role: 'Head of Student Affairs',  color: 'bg-amber-100 text-amber-700',   quote: '"The role-based access is brilliant. Faculty can approve events, students register easily, and the admin dashboard gives full visibility. Perfect for our college."' },
];

/* ─── EventCard ─── */
const EventCard = ({ event }) => {
  const [liked, setLiked] = useState(false);
  return (
    <div className="rounded-[18px] overflow-hidden group cursor-pointer bg-white border-2 border-gray-100 hover:border-purple-500 hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-2xl hover:shadow-purple-200">
      <div className="relative h-40 overflow-hidden">
        <img src={event.img} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full border-2 ${event.tagCls}`}>{event.tag}</span>
          {event.hot && (
            <span className="flex items-center gap-1 text-[10px] font-bold px-3 py-1.5 rounded-full bg-red-500 text-white border-2 border-red-600 shadow-lg shadow-red-500/50">
              <Flame size={9} fill="#fff" /> Hot
            </span>
          )}
        </div>
        <div className="absolute top-2.5 right-2.5 flex gap-1.5">
          <button onClick={() => setLiked(l => !l)} className="w-[36px] h-[36px] rounded-full flex items-center justify-center bg-white shadow-md border-2 border-gray-200 hover:bg-purple-50 hover:border-purple-400 transition-all hover:scale-110">
            <Heart size={14} fill={liked ? '#ef4444' : 'none'} color={liked ? '#ef4444' : '#666'} />
          </button>
          <button className="w-[36px] h-[36px] rounded-full flex items-center justify-center bg-white shadow-md border-2 border-gray-200 hover:bg-blue-50 hover:border-blue-400 transition-all hover:scale-110">
            <Share2 size={14} color="#666" />
          </button>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-gray-900 font-bold text-[14px] leading-snug mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">{event.title}</h3>
        <p className="text-[12px] text-gray-500 font-medium mb-3">{event.org}</p>
        <div className="flex items-center gap-3 text-gray-600 text-[11px] flex-wrap">
          <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md"><Clock size={11} /> {event.date}</span>
          <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md"><MapPin size={11} /> {event.time}</span>
          <span className="flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded-md ml-auto text-blue-600"><Users size={11} /> {event.seats}</span>
        </div>
      </div>
    </div>
  );
};

/* ─── Home ─── */
const Home = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/browse?search=${query}`);
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Sora', sans-serif" }}>
      <FontLoader />
      <Navbar />

      {/* ══ HERO ══ */}
      <section className="relative min-h-[520px] flex items-center justify-center text-center px-4 py-[72px] overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50"
        style={{ background: 'linear-gradient(135deg,#ffffff 0%,#f0f4ff 35%,#faf5ff 100%)' }}>
        <div className="absolute top-[-100px] left-[-80px] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(59,130,246,.15) 0%,transparent 70%)' }} />
        <div className="absolute top-[-20px] right-[-60px] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(168,85,247,.12) 0%,transparent 70%)' }} />
        <div className="absolute bottom-[-50px] left-1/2 w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(34,197,94,.1) 0%,transparent 70%)' }} />

        <div className="relative z-10 max-w-[740px] w-full">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-6 border-2 border-purple-400 shadow-lg shadow-purple-200/50"
            style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(59,130,246,0.1) 100%)' }}>
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 inline-block animate-pulse" />
            <span className="text-[12px] font-bold tracking-[.12em] uppercase bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">College Event Platform</span>
          </div>

          <h1 className="text-[clamp(32px,7vw,62px)] font-black text-gray-900 leading-[1.05] tracking-tight mb-5">
            Your Campus. Your<br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
              Events. Your Story.
            </span>
          </h1>

          <p className="text-gray-700 text-[16px] leading-[1.8] max-w-[520px] mx-auto mb-10 font-medium">
            Discover, register, and manage college events seamlessly. Built for students, organizers, and administrators.
          </p>

          <form onSubmit={handleSearch} className="flex gap-3 max-w-[560px] mx-auto mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text" value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search events, clubs, departments..."
                className="w-full pl-12 pr-5 py-[14px] rounded-xl text-[14px] font-medium text-gray-900 placeholder-gray-500 outline-none transition-all border-2 border-gray-200 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-200/50 bg-white"
              />
            </div>
            <button type="submit" className="px-8 py-[14px] rounded-xl text-[15px] font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-lg hover:shadow-purple-600/40 transition-all duration-300 whitespace-nowrap">Search</button>
          </form>

          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => navigate('/browse')} className="px-9 py-3.5 rounded-xl text-[15px] font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 shadow-lg">Browse Events</button>
            <button onClick={() => navigate('/register')} className="px-9 py-3.5 rounded-xl text-[15px] font-bold text-purple-700 border-2 border-purple-300 bg-white hover:bg-purple-50 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-200/50 hover:-translate-y-1 transition-all duration-300">Get Started Free</button>
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }} />

      {/* ══ CATEGORIES ══ */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-6 md:px-10">
        <div className="max-w-[1080px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[12px] font-bold tracking-[.15em] uppercase text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-2">Browse by Category</p>
              <h2 className="text-[clamp(26px,5vw,40px)] font-black text-gray-900 leading-tight">What's your vibe?</h2>
            </div>
            <button onClick={() => navigate('/browse')} className="hidden sm:flex items-center gap-2 text-[14px] font-bold text-purple-600 hover:text-purple-700 hover:gap-3 transition-all">
              View all <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map(cat => (
              <div key={cat.label} onClick={() => navigate(`/browse?category=${encodeURIComponent(cat.label)}`)}
                className={`flex flex-col items-center gap-3.5 p-5 rounded-[16px] cursor-pointer text-center bg-gradient-to-br ${cat.card} border-2 ${cat.border} hover:-translate-y-2 hover:scale-105 transition-all duration-300 group ${cat.shadow}`}>
                <div className={`w-14 h-14 rounded-[12px] flex items-center justify-center border-2 ${cat.ico} group-hover:scale-125 transition-transform duration-300 bg-white/30`}>
                  <cat.Icon size={26} color={cat.accent} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-white font-bold text-[13px] leading-snug">{cat.label}</p>
                  <p className="text-[11px] mt-1.5 font-semibold" style={{ color: cat.accent }}>{cat.count} events</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex sm:hidden justify-center">
            <button onClick={() => navigate('/browse')} className="flex items-center gap-2 text-[14px] font-bold text-purple-600">View all categories <ChevronRight size={16} /></button>
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }} />

      {/* ══ FEATURED EVENTS ══ */}
      <section className="bg-white py-20 px-6 md:px-10">
        <div className="max-w-[1080px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[12px] font-bold tracking-[.15em] uppercase text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text mb-2">Don't Miss Out</p>
              <h2 className="text-[clamp(26px,5vw,40px)] font-black text-gray-900 leading-tight">Featured Events</h2>
            </div>
            <button onClick={() => navigate('/browse')} className="hidden sm:flex items-center gap-2 text-[14px] font-bold text-pink-600 hover:text-pink-700 hover:gap-3 transition-all">
              See all events <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EVENTS.map(ev => <EventCard key={ev.id} event={ev} />)}
          </div>
          <div className="mt-8 flex sm:hidden justify-center">
            <button onClick={() => navigate('/browse')} className="flex items-center gap-2 text-[14px] font-bold text-pink-600">See all events <ChevronRight size={16} /></button>
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }} />

      {/* ══ WHY EVENTHUB ══ */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-22 px-6 md:px-10 text-center">
        <div className="max-w-[1080px] mx-auto">
          <p className="text-[12px] font-bold tracking-[.15em] uppercase text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-3">Why EventHub?</p>
          <h2 className="text-[clamp(26px,5vw,40px)] font-black text-gray-900 mb-4 leading-tight">Everything you need to run great events</h2>
          <p className="text-[15px] text-gray-700 leading-[1.8] max-w-[550px] mx-auto font-medium">From discovery to certificates, EventHub gives students and organizers a seamless end-to-end experience.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14 text-left">
            {FEATURES.map(({ Icon, title, desc, ico, color }) => (
              <div key={title} className="rounded-[16px] p-8 bg-white border-2 border-gray-100 hover:border-purple-300 hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-purple-200/50">
                <div className={`w-14 h-14 rounded-[12px] flex items-center justify-center mb-5 border-2 ${ico} bg-gradient-to-br`}>
                  <Icon size={26} className={color} strokeWidth={2.2} />
                </div>
                <h3 className="text-gray-900 font-bold text-[16px] mb-3">{title}</h3>
                <p className="text-gray-700 text-[14px] leading-[1.7] font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }} />

      {/* ══ HOW IT WORKS ══ */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-22 px-6 md:px-10 text-center">
        <div className="max-w-[1080px] mx-auto">
          <p className="text-[12px] font-bold tracking-[.15em] uppercase text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text mb-3">How It Works</p>
          <h2 className="text-[clamp(26px,5vw,40px)] font-black text-gray-900 mb-4 leading-tight">Up and running in minutes</h2>
          <p className="text-[15px] text-gray-700 leading-[1.8] max-w-[520px] mx-auto font-medium">Four simple steps to start discovering or hosting events on your campus.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 mt-16 text-left relative">
            {STEPS.map((step, i) => (
              <div key={step.n} className="relative px-6 pb-10 lg:pb-0">
                {/* connector line */}
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-5 left-[calc(50%+20px)] right-0 h-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-transparent" />
                )}
                <div className="w-12 h-12 rounded-full border-3 border-purple-600 flex items-center justify-center text-[16px] font-black bg-gradient-to-br from-purple-50 to-pink-50 text-purple-700 mb-5 relative z-10 shadow-md">
                  {step.n}
                </div>
                <h3 className="text-gray-900 font-bold text-[15px] mb-2.5">{step.title}</h3>
                <p className="text-gray-700 text-[13px] leading-[1.7] font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-2xl">
        <div className="max-w-[1080px] mx-auto py-14 px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {STATS.map(s => (
            <div key={s.label}>
              <p className="text-[36px] font-black mb-2 text-white drop-shadow-lg">{s.value}</p>
              <p className="text-[11px] uppercase tracking-[.12em] text-white/90 font-bold">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }} />

      {/* ══ TESTIMONIALS ══ */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-22 px-6 md:px-10 text-center">
        <div className="max-w-[1080px] mx-auto">
          <p className="text-[12px] font-bold tracking-[.15em] uppercase text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text mb-3">What Students Say</p>
          <h2 className="text-[clamp(26px,5vw,40px)] font-black text-gray-900 mb-12 leading-tight">Loved by campus communities</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="rounded-[16px] p-7 bg-white border-2 border-gray-100 hover:border-purple-300 hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-purple-200/50">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" className="w-4 h-4 fill-amber-400"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="text-[14px] text-gray-700 leading-[1.8] mb-5 font-medium italic">{t.quote}</p>
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold ${t.color}`}>{t.initials}</div>
                  <div>
                    <p className="text-[14px] font-bold text-gray-900">{t.name}</p>
                    <p className="text-[12px] text-gray-600">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
  


