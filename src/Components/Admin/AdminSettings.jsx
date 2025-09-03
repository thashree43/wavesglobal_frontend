import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseurl } from '../../Base/Base';
import { User, Shield, Lock, Eye, EyeOff, Check, AlertCircle, Settings, Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminSettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('settings');
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [adminInfo, setAdminInfo] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const sidebarItems = [
    { id: 'settings', name: 'Settings', icon: Settings, route: '/admin/settings' }
  ];

  const getAdminInfo = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}admin/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data)
      if (response.data) setAdminInfo(response.data.admin);
    } catch (error) {
      toast.error('Failed to load admin information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdminInfo();
  }, []);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    setMessage({ type: '', text: '' });
  };

  const validatePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('All fields are required');
      return false;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long');
      return false;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return false;
    }
    return true;
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    try {
      setLoading(true);
      setMessage({ type: '', text: '' });
      const response = await axios.put(`${baseurl}admin/change-password`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response)
      if (response.data.success) {
        toast.success('Password changed successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (error) {
      if (error.response?.status === 400) toast.error('Current password is incorrect');
      else if (error.response?.status === 401) {
        toast.error('Unauthorized. Please login again');
        localStorage.removeItem('adminToken');
        navigate('/login');
      } else toast.error('Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSidebarClick = (itemId, route) => {
    setActiveTab(itemId);
    setSidebarOpen(false);
    if (route) navigate(route);
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        handleSidebarClick={handleSidebarClick}
      />
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <div className="flex-1 lg:ml-0 flex flex-col overflow-hidden">
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100">
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
            <div className="w-10" />
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          {activeTab === 'settings' && (
            <div className="h-full flex flex-col">
              <div className="flex-shrink-0 p-4 sm:p-6 lg:p-8 bg-white border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Settings className="text-blue-600 flex-shrink-0" size={32} />
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Settings</h1>
                    <p className="text-gray-600 text-sm sm:text-base">Manage your admin account settings</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="max-w-2xl mx-auto space-y-6">
                  {message.text && (
                    <div className={`p-4 rounded-lg flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                      {message.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
                      <span className="text-sm">{message.text}</span>
                    </div>
                  )}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">Admin Profile</h2>
                        <p className="text-sm text-gray-600">Your account information</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900">
                          {adminInfo.email || 'admin@example.com'}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900">
                          {adminInfo.number || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <Lock className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
                        <p className="text-sm text-gray-600">Update your account password</p>
                      </div>
                    </div>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            placeholder="Enter current password"
                            disabled={loading}
                          />
                          <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            placeholder="Enter new password"
                            disabled={loading}
                          />
                          <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            placeholder="Confirm new password"
                            disabled={loading}
                          />
                          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>
                      <button type="submit" disabled={loading} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg transition-colors font-medium text-sm">
                        {loading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <>Change Password</>
                        )}
                      </button>
                    </form>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <Shield className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">Security Information</h2>
                        <p className="text-sm text-gray-600">Account security details</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-700">Two-Factor Authentication</span>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">Not Enabled</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-700">Last Login</span>
                        <span className="text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-700">Account Created</span>
                        <span className="text-sm text-gray-500">{adminInfo.createdAt ? new Date(adminInfo.createdAt).toLocaleDateString() : 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AdminSettings;
