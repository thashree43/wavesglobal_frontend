import React, { useState } from 'react';
import { User, Lock, Calendar, MapPin, Clock, CreditCard, Eye, EyeOff, Edit, Check, X } from 'lucide-react';
import { toast } from 'react-toastify';
import Navbar from '../../Layout/Navbar';
import Footer from '../../Layout/Footer';
import axios from 'axios';
import { baseurl } from '../../Base/Base';
import { useEffect } from 'react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    mobile: ''
  });

  const [originalUserDetails, setOriginalUserDetails] = useState({
    name: '',
    email: '',
    mobile: ''
  });

  const getUser = async()=>{
    try {
      const response = await axios.get(`${baseurl}User/getuser`,{
        withCredentials:true
      })
      console.log(response)
      if(response.data.user){
        setUserDetails(response.data.user)
        setOriginalUserDetails(response.data.user)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch user details')
    }
  }

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const bookings = [
    {
      id: '1',
      propertyName: 'Luxury Beach Villa',
      location: 'Malibu, CA',
      checkIn: '2024-09-15',
      checkOut: '2024-09-18',
      guests: 4,
      status: 'confirmed',
      amount: '$1,200',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=250&fit=crop'
    },
    {
      id: '2',
      propertyName: 'Mountain Cabin Retreat',
      location: 'Lake Tahoe, CA',
      checkIn: '2024-08-10',
      checkOut: '2024-08-13',
      guests: 2,
      status: 'completed',
      amount: '$800',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop'
    },
    {
      id: '3',
      propertyName: 'Downtown Loft',
      location: 'Los Angeles, CA',
      checkIn: '2024-10-22',
      checkOut: '2024-10-25',
      guests: 3,
      status: 'pending',
      amount: '$950',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop'
    }
  ];

  const handleProfileSave = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`${baseurl}User/updateuser`, {
        name: userDetails.name,
        mobile: userDetails.mobile
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        const message = response.data.message || 'Profile updated successfully!';
        toast.success(message);
        setOriginalUserDetails({...userDetails});
        setIsEditingProfile(false);
      } else {
        const message = response.data.message || 'Failed to update profile';
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || 'Error updating profile';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`${baseurl}User/changepassword`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        const message = response.data.message || 'Password changed successfully!';
        toast.success(message);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setIsChangingPassword(false);
      } else {
        const message = response.data.message || 'Failed to change password';
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || 'Error changing password';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setUserDetails({...originalUserDetails});
    setIsEditingProfile(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  useEffect(()=>{
    getUser()
  },[])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <div className="max-w-7xl mx-auto px-4 py-8 mt-28">
        
        <div className="mb-20">
          <h1 className="text-3xl font-bold text-black mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and view your bookings</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
              <div className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <User className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold text-center">{userDetails.name}</h3>
                <p className="text-orange-100 text-center text-sm mt-1">{userDetails.email}</p>
              </div>
              
              <div className="p-6">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                      activeTab === 'profile' 
                        ? 'bg-orange-50 text-orange-600 border border-orange-100' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    Profile Details
                  </button>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                      activeTab === 'bookings' 
                        ? 'bg-orange-50 text-orange-600 border border-orange-100' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Calendar className="w-5 h-5" />
                    My Bookings
                  </button>
                </nav>
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-black flex items-center gap-3">
                      <User className="w-6 h-6 text-orange-500" />
                      Profile Information
                    </h2>
                    <button
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      disabled={loading}
                      className="px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      <Edit className="w-4 h-4" />
                      {isEditingProfile ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          value={userDetails.name}
                          onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{userDetails.name}</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <div className="px-4 py-3 bg-gray-100 rounded-xl text-gray-500">{userDetails.email}</div>
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      {isEditingProfile ? (
                        <input
                          type="tel"
                          value={userDetails.mobile}
                          onChange={(e) => setUserDetails({...userDetails, mobile: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{userDetails.mobile}</div>
                      )}
                    </div>
                  </div>

                  {isEditingProfile && (
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={handleProfileSave}
                        disabled={loading}
                        className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                      >
                        <Check className="w-4 h-4" />
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        disabled={loading}
                        className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-black flex items-center gap-3">
                      <Lock className="w-6 h-6 text-orange-500" />
                      Change Password
                    </h2>
                    <button
                      onClick={() => setIsChangingPassword(!isChangingPassword)}
                      disabled={loading}
                      className="px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50"
                    >
                      {isChangingPassword ? 'Cancel' : 'Change Password'}
                    </button>
                  </div>

                  {isChangingPassword ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Enter current password"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Enter new password"
                          />
                          <button
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Confirm new password"
                          />
                          <button
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={handlePasswordChange}
                          disabled={loading}
                          className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                          <Check className="w-4 h-4" />
                          {loading ? 'Updating...' : 'Update Password'}
                        </button>
                        <button
                          onClick={() => setIsChangingPassword(false)}
                          disabled={loading}
                          className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600">Keep your account secure by updating your password regularly.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-black flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-orange-500" />
                    My Bookings
                  </h2>
                  <p className="text-gray-600 mt-2">View and manage your staycation bookings</p>
                </div>

                <div className="space-y-6">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3">
                          <img
                            src={booking.image}
                            alt={booking.propertyName}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                        <div className="md:w-2/3 p-6">
                          <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-black mb-2">{booking.propertyName}</h3>
                              <div className="flex items-center gap-2 text-gray-600 mb-3">
                                <MapPin className="w-4 h-4" />
                                {booking.location}
                              </div>
                            </div>
                            <div className="flex flex-col items-start md:items-end gap-2">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                              <span className="text-2xl font-bold text-orange-600">{booking.amount}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <div>
                                <p className="text-gray-600">Check-in</p>
                                <p className="font-semibold text-black">{new Date(booking.checkIn).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <div>
                                <p className="text-gray-600">Check-out</p>
                                <p className="font-semibold text-black">{new Date(booking.checkOut).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <div>
                                <p className="text-gray-600">Guests</p>
                                <p className="font-semibold text-black">{booking.guests} guests</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-3 mt-4">
                            <button className="px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors text-sm">
                              View Details
                            </button>
                            {booking.status === 'confirmed' && (
                              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm">
                                Modify Booking
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;