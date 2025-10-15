import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseurl } from '../../Base/Base';
import { User, Shield, ShieldOff, Users, BarChart3, FileText, Bell, DollarSign, Settings, Menu, Search, MapPin, Home } from 'lucide-react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3, route: '/dashboard' },
    { id: 'properties', name: 'Properties', icon: Home, route: '/admin/property' },
    { id: 'locations', name: 'Locations', icon: MapPin, route: '/admin/location' },
    { id: 'revenue', name: 'Revenue', icon: DollarSign, route: '/revenue' },
    { id: 'users', name: 'Users', icon: Users, route: '/users' },
    { id: 'reports', name: 'Reports', icon: FileText, route: '/reports' },
    { id: 'notifications', name: 'Notifications', icon: Bell, route: '/notifications' },
    { id: 'settings', name: 'Settings', icon: Settings, route: '/admin/settings' },
  ];

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseurl}admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [token]);

  const handleBlockUnblock = async (userId) => {
    try {
      setActionLoading(prev => ({ ...prev, [userId]: true }));
      const user = users.find(u => u._id === userId);
      const newIsBlocked = !user.isBlocked;
      
      await axios.put(`${baseurl}admin/users/${userId}/block`, {
        isBlocked: newIsBlocked
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUsers(users.map(user =>
        user._id === userId
          ? { ...user, isBlocked: newIsBlocked }
          : user
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
    } finally {
      setActionLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  const handleSidebarClick = (itemId, route) => {
    setActiveTab(itemId);
    setSidebarOpen(false);
    if (route) navigate(route);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || 
      (filterStatus === 'Active' && !user.isBlocked) ||
      (filterStatus === 'Blocked' && user.isBlocked) ||
      (filterStatus === 'Unverified' && !user.isVerified);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        handleSidebarClick={handleSidebarClick}
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 lg:ml-0 flex flex-col overflow-hidden">
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
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

        <div className="flex-1 overflow-hidden">
          {activeTab === 'users' ? (
            <div className="h-full flex flex-col">
              <div className="flex-shrink-0 p-4 sm:p-6 lg:p-8 bg-white border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Users className="text-blue-600 flex-shrink-0" size={32} />
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">User Management</h1>
                      <p className="text-gray-600 text-sm sm:text-base">Manage user accounts and permissions</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-sm text-green-700">
                      Active: {users.filter(u => !u.isBlocked && u.isVerified).length}
                    </span>
                  </div>
                  <div className="flex items-center bg-red-50 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                    <span className="text-sm text-red-700">
                      Blocked: {users.filter(u => u.isBlocked).length}
                    </span>
                  </div>
                  <div className="flex items-center bg-yellow-50 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                    <span className="text-sm text-yellow-700">
                      Unverified: {users.filter(u => !u.isVerified).length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 py-4">
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          placeholder="Search users..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Blocked">Blocked</option>
                        <option value="Unverified">Unverified</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-hidden px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
                <div className="h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col relative">
                  {loading && (
                    <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  )}

                  <div className="hidden sm:block flex-shrink-0 overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">User</th>
                          <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Email</th>
                          <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Status</th>
                          <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Joined</th>
                          <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Actions</th>
                        </tr>
                      </thead>
                    </table>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    <table className="hidden sm:table w-full">
                      <tbody className="divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                          <tr key={user._id} className="hover:bg-gray-50">
                            <td className="py-4 px-3 sm:px-6">
                              <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <User className="h-4 w-4 text-blue-600" />
                                </div>
                                <span className="font-medium text-gray-900">{user.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-3 sm:px-6">
                              <span className="text-gray-600">{user.email}</span>
                            </td>
                            <td className="py-4 px-3 sm:px-6">
                              <div className="flex flex-col gap-1">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                                  !user.isBlocked && user.isVerified ? 'bg-green-100 text-green-800' : 
                                  user.isBlocked ? 'bg-red-100 text-red-800' : 
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {!user.isBlocked && user.isVerified ? 'Active' : 
                                   user.isBlocked ? 'Blocked' : 'Unverified'}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-3 sm:px-6">
                              <span className="text-gray-600">
                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                              </span>
                            </td>
                            <td className="py-4 px-3 sm:px-6">
                              <button
                                onClick={() => handleBlockUnblock(user._id)}
                                disabled={actionLoading[user._id] || !user.isVerified}
                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs sm:text-sm transition-colors ${
                                  user.isBlocked 
                                    ? 'text-green-700 bg-green-50 border border-green-200 hover:bg-green-100' 
                                    : 'text-red-700 bg-red-50 border border-red-200 hover:bg-red-100'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                              >
                                {actionLoading[user._id] ? (
                                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></div>
                                ) : (
                                  user.isBlocked ? <Shield size={12} /> : <ShieldOff size={12} />
                                )}
                                {user.isBlocked ? 'Unblock' : 'Block'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="sm:hidden space-y-4 p-4">
                      {filteredUsers.map(user => (
                        <div key={user._id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="font-medium text-gray-900 truncate">{user.name}</h3>
                                <p className="text-xs text-gray-600 truncate">{user.email}</p>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                                  !user.isBlocked && user.isVerified ? 'bg-green-100 text-green-800' : 
                                  user.isBlocked ? 'bg-red-100 text-red-800' : 
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {!user.isBlocked && user.isVerified ? 'Active' : 
                                   user.isBlocked ? 'Blocked' : 'Unverified'}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleBlockUnblock(user._id)}
                              disabled={actionLoading[user._id] || !user.isVerified}
                              className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-lg transition-colors ${
                                user.isBlocked 
                                  ? 'text-green-700 bg-green-50 border border-green-200 hover:bg-green-100' 
                                  : 'text-red-700 bg-red-50 border border-red-200 hover:bg-red-100'
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              {actionLoading[user._id] ? (
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></div>
                              ) : (
                                user.isBlocked ? <Shield size={12} /> : <ShieldOff size={12} />
                              )}
                            </button>
                          </div>

                          <div className="text-xs text-gray-500">
                            <span>Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredUsers.length === 0 && !loading && (
                      <div className="text-center py-12">
                        <Users className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-4 sm:p-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center max-w-md w-full">
                <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  {React.createElement(sidebarItems.find(item => item.id === activeTab)?.icon || Users, { 
                    size: window.innerWidth < 640 ? 32 : 48, 
                    className: "text-blue-600" 
                  })}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {sidebarItems.find(item => item.id === activeTab)?.name} Page
                </h3>
                <p className="text-gray-500 mb-6 text-sm sm:text-base">This page is under development</p>
                <button
                  onClick={() => setActiveTab('users')}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <Users size={16} />
                  Go to Users
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersList;