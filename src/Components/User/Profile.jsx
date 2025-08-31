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
    <div className="min-h-screen bg-gradient-to-br from-[rgb(247,247,247)] via-white to-[rgb(248,252,255)]">
      <Navbar/>
      <div className="max-w-7xl mx-auto px-4 py-8 pt-28">
        
        <div className="mb-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-[rgb(0,0,0)] mb-4 tracking-tight">My Profile</h1>
            <p className="text-xl font-light text-gray-700 max-w-2xl mx-auto leading-relaxed">Manage your account settings and view your bookings</p>
            <div className="mt-8 w-24 h-1 bg-gray-600 mx-auto rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="lg:w-1/4">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden sticky top-8">
              <div className="p-8 bg-gradient-to-br from-[rgb(247,219,190)] to-[rgb(247,219,190)]/80 text-gray-800 relative">
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="relative">
                  <div className="w-24 h-24 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 mx-auto shadow-xl">
                    <User className="w-12 h-12 text-gray-800" />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-2">{userDetails.name}</h3>
                  <p className="text-gray-700 text-center text-sm">{userDetails.email}</p>
                </div>
              </div>
              
              <div className="p-8">
                <nav className="space-y-4">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 flex items-center gap-3 font-semibold ${
                      activeTab === 'profile' 
                        ? 'bg-[rgb(247,219,190)]/30 text-gray-800 border border-[rgb(247,219,190)]/50 shadow-lg transform scale-105' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    Profile Details
                  </button>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 flex items-center gap-3 font-semibold ${
                      activeTab === 'bookings' 
                        ? 'bg-[rgb(247,219,190)]/30 text-gray-800 border border-[rgb(247,219,190)]/50 shadow-lg transform scale-105' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
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
              <div className="space-y-8">
                
                <div className="relative group">
                  <div className="absolute inset-0 bg-[rgb(247,219,190)]/20 rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
                  <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-10 m-1">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-3xl font-bold text-[rgb(0,0,0)] flex items-center gap-4">
                        <div className="w-12 h-12 bg-[rgb(247,219,190)] rounded-2xl flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-800" />
                        </div>
                        Profile Information
                      </h2>
                      <button
                        onClick={() => setIsEditingProfile(!isEditingProfile)}
                        disabled={loading}
                        className="px-6 py-3 bg-[rgb(247,219,190)] text-gray-800 rounded-2xl hover:bg-[rgb(247,219,190)]/80 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 font-semibold shadow-lg"
                      >
                        <Edit className="w-4 h-4" />
                        {isEditingProfile ? 'Cancel' : 'Edit Profile'}
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Full Name</label>
                        {isEditingProfile ? (
                          <input
                            type="text"
                            value={userDetails.name}
                            onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[rgb(247,219,190)] focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-800 font-medium transition-all duration-300"
                          />
                        ) : (
                          <div className="px-6 py-4 bg-[rgb(248,252,255)] rounded-2xl text-gray-800 font-medium">{userDetails.name}</div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Email Address</label>
                        <div className="px-6 py-4 bg-gray-100 rounded-2xl text-gray-500 font-medium">{userDetails.email}</div>
                        <p className="text-xs text-gray-500 mt-2 italic">Email cannot be changed</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Phone Number</label>
                        {isEditingProfile ? (
                          <input
                            type="tel"
                            value={userDetails.mobile}
                            onChange={(e) => setUserDetails({...userDetails, mobile: e.target.value})}
                            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[rgb(247,219,190)] focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-800 font-medium transition-all duration-300"
                          />
                        ) : (
                          <div className="px-6 py-4 bg-[rgb(248,252,255)] rounded-2xl text-gray-800 font-medium">{userDetails.mobile}</div>
                        )}
                      </div>
                    </div>

                    {isEditingProfile && (
                      <div className="flex gap-4 mt-8">
                        <button
                          onClick={handleProfileSave}
                          disabled={loading}
                          className="px-8 py-4 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 font-semibold shadow-lg"
                        >
                          <Check className="w-4 h-4" />
                          {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          disabled={loading}
                          className="px-8 py-4 bg-gray-500 text-white rounded-2xl hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 font-semibold shadow-lg"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-[rgb(247,219,190)]/20 rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
                  <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-10 m-1">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-3xl font-bold text-[rgb(0,0,0)] flex items-center gap-4">
                        <div className="w-12 h-12 bg-[rgb(247,219,190)] rounded-2xl flex items-center justify-center">
                          <Lock className="w-6 h-6 text-gray-800" />
                        </div>
                        Change Password
                      </h2>
                      <button
                        onClick={() => setIsChangingPassword(!isChangingPassword)}
                        disabled={loading}
                        className="px-6 py-3 bg-[rgb(247,219,190)] text-gray-800 rounded-2xl hover:bg-[rgb(247,219,190)]/80 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 font-semibold shadow-lg"
                      >
                        {isChangingPassword ? 'Cancel' : 'Change Password'}
                      </button>
                    </div>

                    {isChangingPassword ? (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Current Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={passwordData.currentPassword}
                              onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                              className="w-full px-6 py-4 pr-14 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[rgb(247,219,190)] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
                              placeholder="Enter current password"
                            />
                            <button
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">New Password</label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? 'text' : 'password'}
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                              className="w-full px-6 py-4 pr-14 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[rgb(247,219,190)] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
                              placeholder="Enter new password"
                            />
                            <button
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Confirm New Password</label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? 'text' : 'password'}
                              value={passwordData.confirmPassword}
                              onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                              className="w-full px-6 py-4 pr-14 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[rgb(247,219,190)] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
                              placeholder="Confirm new password"
                            />
                            <button
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                          <button
                            onClick={handlePasswordChange}
                            disabled={loading}
                            className="px-8 py-4 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 font-semibold shadow-lg"
                          >
                            <Check className="w-4 h-4" />
                            {loading ? 'Updating...' : 'Update Password'}
                          </button>
                          <button
                            onClick={() => setIsChangingPassword(false)}
                            disabled={loading}
                            className="px-8 py-4 bg-gray-500 text-white rounded-2xl hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 font-semibold shadow-lg"
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-600 text-lg font-light leading-relaxed">Keep your account secure by updating your password regularly.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="relative group">
                <div className="absolute inset-0 bg-[rgb(247,219,190)]/20 rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
                <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-10 m-1">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-[rgb(0,0,0)] flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-[rgb(247,219,190)] rounded-2xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-gray-800" />
                      </div>
                      My Bookings
                    </h2>
                    <p className="text-gray-600 text-lg font-light leading-relaxed">View and manage your staycation bookings</p>
                  </div>

                  <div className="space-y-8">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="border border-gray-200/50 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white/50 backdrop-blur-sm">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3">
                            <img
                              src={booking.image}
                              alt={booking.propertyName}
                              className="w-full h-64 md:h-full object-cover"
                            />
                          </div>
                          <div className="md:w-2/3 p-8">
                            <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                              <div>
                                <h3 className="text-2xl font-bold text-[rgb(0,0,0)] mb-3">{booking.propertyName}</h3>
                                <div className="flex items-center gap-2 text-gray-600 mb-4">
                                  <MapPin className="w-5 h-5" />
                                  <span className="font-medium">{booking.location}</span>
                                </div>
                              </div>
                              <div className="flex flex-col items-start md:items-end gap-3">
                                <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(booking.status)}`}>
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                                <span className="text-3xl font-bold text-[rgb(247,219,190)] text-gray-800">{booking.amount}</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-6">
                              <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-gray-400" />
                                <div>
                                  <p className="text-gray-600 font-medium">Check-in</p>
                                  <p className="font-bold text-[rgb(0,0,0)] text-base">{new Date(booking.checkIn).toLocaleDateString()}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-gray-400" />
                                <div>
                                  <p className="text-gray-600 font-medium">Check-out</p>
                                  <p className="font-bold text-[rgb(0,0,0)] text-base">{new Date(booking.checkOut).toLocaleDateString()}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-gray-400" />
                                <div>
                                  <p className="text-gray-600 font-medium">Guests</p>
                                  <p className="font-bold text-[rgb(0,0,0)] text-base">{booking.guests} guests</p>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-4">
                              <button className="px-6 py-3 bg-[rgb(247,219,190)] text-gray-800 rounded-2xl hover:bg-[rgb(247,219,190)]/80 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg">
                                View Details
                              </button>
                              {booking.status === 'confirmed' && (
                                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg">
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