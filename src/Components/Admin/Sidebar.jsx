import React from 'react';
import axios from 'axios';
import { Home, X, BarChart3, Calendar, Settings, Users, MapPin, LogOut ,Star} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../Base/Base';

const Sidebar = ({ sidebarOpen, setSidebarOpen, activeTab, handleSidebarClick }) => {
  const navigate = useNavigate();

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3, route: '/admin/dashboard' },
    { id: 'properties', name: 'Properties', icon: Home, route: '/admin/property' },
    { id: 'locations', name: 'Locations', icon: MapPin, route: '/admin/location' },
    { id: 'users', name: 'Users', icon: Users, route: '/admin/users' },
    { id: 'reviews', name: 'Reviews', icon: Star, route: '/admin/reviews' },
    { id: 'bookings', name: 'Bookings', icon: Calendar, route: '/admin/bookings' },
    { id: 'settings', name: 'Settings', icon: Settings, route: '/admin/settings' },
  ];

  const handleLogout = async () => {
    try {
      await axios.post(
        `${baseurl}admin/logout`,
        {},
        { withCredentials: true }
      );

      localStorage.removeItem('admin');
      localStorage.removeItem('adminToken');

      navigate('/admin/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col h-screen`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Home className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">Wavescation</span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="mt-6 px-3 pb-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleSidebarClick(item.id, item.route)}
                className={`w-full flex items-center gap-3 px-3 py-3 mb-1 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-gray-200 flex flex-col gap-4">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>

        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900">Need Help?</h3>
          <p className="text-xs text-blue-700 mt-1">Contact support for assistance</p>
          <button className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">
            Get Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
