import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  ShieldOff, 
  Home, 
  Users, 
  Settings, 
  BarChart3, 
  FileText, 
  Bell, 
  DollarSign,
  Menu,
  X,
  Search,
  Filter
} from 'lucide-react';

const UsersList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      status: 'active',
      joinedDate: '2024-01-15',
      isBlocked: false
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b169?w=40&h=40&fit=crop&crop=face',
      status: 'active',
      joinedDate: '2024-02-20',
      isBlocked: false
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      status: 'inactive',
      joinedDate: '2024-01-08',
      isBlocked: true
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      status: 'active',
      joinedDate: '2024-03-10',
      isBlocked: false
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@example.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      status: 'active',
      joinedDate: '2024-02-05',
      isBlocked: false
    },
    {
      id: 6,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
      status: 'active',
      joinedDate: '2024-03-22',
      isBlocked: false
    }
  ]);

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3, route: '/dashboard' },
    { id: 'properties', name: 'Properties', icon: Home, route: '/admin/property' },
    { id: 'revenue', name: 'Revenue', icon: DollarSign, route: '/revenue' },
    { id: 'users', name: 'Users', icon: Users, route: '/users' },
    { id: 'reports', name: 'Reports', icon: FileText, route: '/reports' },
    { id: 'notifications', name: 'Notifications', icon: Bell, route: '/notifications' },
    { id: 'settings', name: 'Settings', icon: Settings, route: '/settings' },
  ];

  const handleBlockUnblock = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, isBlocked: !user.isBlocked, status: !user.isBlocked ? 'inactive' : 'active' }
        : user
    ));
  };

  const handleSidebarClick = (itemId, route) => {
    setActiveTab(itemId);
    setSidebarOpen(false);
    
    if (route && typeof window !== 'undefined') {
      window.history.pushState({}, '', route);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Home className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">PropManage</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6 px-3">
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

        <div className="absolute bottom-4 left-0 right-0 px-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900">Need Help?</h3>
            <p className="text-xs text-blue-700 mt-1">Contact support for assistance</p>
            <button className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">
              Get Support
            </button>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 lg:ml-0">
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Users</h1>
            <div className="w-10" />
          </div>
        </div>

        <div className="p-4 lg:p-8">
          {activeTab === 'users' ? (
            <>
              <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                      <Users className="text-blue-600" />
                      User Management
                    </h1>
                    <p className="text-gray-600 mt-1">Manage user accounts and permissions</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <span className="text-sm text-green-700">Active: {users.filter(u => !u.isBlocked).length}</span>
                    </div>
                    <div className="flex items-center bg-red-50 px-3 py-2 rounded-lg">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                      <span className="text-sm text-red-700">Blocked: {users.filter(u => u.isBlocked).length}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="All">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">User</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Email</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Joined Date</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={user.avatar}
                                  alt={user.name}
                                />
                              </div>
                              <div className="ml-4">
                                <h3 className="font-medium text-gray-900">{user.name}</h3>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-sm text-gray-600">{user.email}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              user.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-sm text-gray-600">
                              {new Date(user.joinedDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <button
                              onClick={() => handleBlockUnblock(user.id)}
                              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                                user.isBlocked
                                  ? 'text-green-700 bg-green-50 hover:bg-green-100 border border-green-200'
                                  : 'text-red-700 bg-red-50 hover:bg-red-100 border border-red-200'
                              }`}
                            >
                              {user.isBlocked ? (
                                <>
                                  <Shield size={16} />
                                  Unblock User
                                </>
                              ) : (
                                <>
                                  <ShieldOff size={16} />
                                  Block User
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredUsers.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                {React.createElement(sidebarItems.find(item => item.id === activeTab)?.icon || Users, { 
                  size: 48, 
                  className: "text-blue-600" 
                })}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {sidebarItems.find(item => item.id === activeTab)?.name} Page
              </h3>
              <p className="text-gray-500 mb-6">This page is under development</p>
              <button
                onClick={() => setActiveTab('users')}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Users size={16} />
                Go to Users
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersList;