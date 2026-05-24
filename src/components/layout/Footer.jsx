import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-gray-900 text-gray-100 py-12">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-white text-lg font-bold mb-4">EventHub</h3>
        <p className="text-sm text-gray-200">The ultimate platform for college clubs to manage, promote, and organize events seamlessly.</p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/events" className="text-gray-100 hover:text-blue-300 transition-colors">Browse Events</Link></li>
          <li><Link to="/register" className="text-gray-100 hover:text-blue-300 transition-colors">Join as a Club</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Contact</h4>
        <p className="text-sm text-gray-200">Email: support@campusevents.edu</p>
        <p className="text-sm text-gray-200">Location: University Main Campus</p>
      </div>
    </div>
    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-xs text-gray-300">
      © 2026 EventHub. Built with Passion.
    </div>
  </footer>
);

export default Footer;