import React, { useState, useEffect } from 'react';
import { User, Lock, Calendar, MapPin, Clock, Eye, EyeOff, Edit, Check, X } from 'lucide-react';
import Footer from '../../Layout/Footer';
import Navbar from '../../Layout/Navbar';
import axios from 'axios';
import { baseurl } from '../../Base/Base';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    mobile: '',
    isGoogleUser: false
  });

  const [originalUserDetails, setOriginalUserDetails] = useState({
    name: '',
    email: '',
    mobile: '',
    isGoogleUser: false
  });

  const getUserAndBookings = async () => {
    try {
      const response = await axios.get(`${baseurl}User/getuser`, { withCredentials: true });
      if (response.data.user) {
        setUserDetails(response.data.user);
  
        const bookingsRes = await axios.get(`${baseurl}User/get-booking`, {
          params: { id: response.data.user._id }
        });
        
        if (bookingsRes.data && bookingsRes.data.bookings) {
          setBookings(bookingsRes.data.bookings);
        }
        console.log(bookingsRes.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    getUserAndBookings();
  }, []);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePropertyClick = (propertyId, guests) => {
    window.location.href = `/property/${propertyId}?adults=${guests}`;
  };

  const handleProfileSave = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`${baseurl}User/updateuser`, {
        name: userDetails.name,
        mobile: userDetails.mobile
      }, { withCredentials: true });

      if (response.data.success) {
        alert(response.data.message || 'Profile updated successfully!');
        setOriginalUserDetails({ ...userDetails });
        setIsEditingProfile(false);
      } else {
        alert(response.data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('New password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`${baseurl}User/changepassword`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, { withCredentials: true });

      if (response.data.success) {
        alert(response.data.message || 'Password changed successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setIsChangingPassword(false);
      } else {
        alert(response.data.message || 'Failed to change password');
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Error changing password');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setUserDetails({ ...originalUserDetails });
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPropertyImage = (property) => {
    if (property.images && property.images.length > 0) {
      return property.images[0].url || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=250&fit=crop';
    }
    return 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=250&fit=crop';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(247,247,247)] via-white to-[rgb(248,252,255)]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 pt-28">
        <div className="mb-20 text-center">
          <h1 className="text-5xl font-bold text-[rgb(0,0,0)] mb-4 tracking-tight">My Profile</h1>
          <p className="text-xl font-light text-gray-700 max-w-2xl mx-auto leading-relaxed">Manage your account settings and view your bookings</p>
          <div className="mt-8 w-24 h-1 bg-gray-600 mx-auto rounded-full"></div>
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
                  <button onClick={() => setActiveTab('profile')} className={`w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 flex items-center gap-3 font-semibold ${activeTab === 'profile' ? 'bg-[rgb(247,219,190)]/30 text-gray-800 border border-[rgb(247,219,190)]/50 shadow-lg transform scale-105' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'}`}>
                    <User className="w-5 h-5" /> Profile Details
                  </button>
                  <button onClick={() => setActiveTab('bookings')} className={`w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 flex items-center gap-3 font-semibold ${activeTab === 'bookings' ? 'bg-[rgb(247,219,190)]/30 text-gray-800 border border-[rgb(247,219,190)]/50 shadow-lg transform scale-105' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'}`}>
                    <Calendar className="w-5 h-5" /> My Bookings ({bookings.length})
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
                      <button onClick={() => setIsEditingProfile(!isEditingProfile)} disabled={loading} className="px-6 py-3 bg-[rgb(247,219,190)] text-gray-800 rounded-2xl hover:bg-[rgb(247,219,190)]/80 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 font-semibold shadow-lg">
                        <Edit className="w-4 h-4" />
                        {isEditingProfile ? 'Cancel' : 'Edit Profile'}
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Full Name</label>
                        {isEditingProfile ? (
                          <input type="text" value={userDetails.name} onChange={(e) => setUserDetails({...userDetails, name: e.target.value})} className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[rgb(247,219,190)] focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-800 font-medium transition-all duration-300" />
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
                          <input type="tel" value={userDetails.mobile} onChange={(e) => setUserDetails({...userDetails, mobile: e.target.value})} className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[rgb(247,219,190)] focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-800 font-medium transition-all duration-300" />
                        ) : (
                          <div className="px-6 py-4 bg-[rgb(248,252,255)] rounded-2xl text-gray-800 font-medium">{userDetails.mobile}</div>
                        )}
                      </div>
                    </div>

                    {isEditingProfile && (
                      <div className="flex gap-4 mt-8">
                        <button onClick={handleProfileSave} disabled={loading} className="px-8 py-4 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 font-semibold shadow-lg">
                          <Check className="w-4 h-4" /> {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button onClick={handleCancelEdit} disabled={loading} className="px-8 py-4 bg-gray-500 text-white rounded-2xl hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 font-semibold shadow-lg">
                          <X className="w-4 h-4" /> Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {!userDetails.isGoogleUser && (
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
                        <button onClick={() => setIsChangingPassword(!isChangingPassword)} disabled={loading} className="px-6 py-3 bg-[rgb(247,219,190)] text-gray-800 rounded-2xl hover:bg-[rgb(247,219,190)]/80 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 font-semibold shadow-lg">
                          {isChangingPassword ? 'Cancel' : 'Change Password'}
                        </button>
                      </div>

                      {isChangingPassword ? (
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Current Password</label>
                            <div className="relative">
                              <input type={showPassword ? 'text' : 'password'} value={passwordData.currentPassword} onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})} className="w-full px-6 py-4 pr-14 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[rgb(247,219,190)] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300" placeholder="Enter current password" />
                              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">New Password</label>
                            <div className="relative">
                              <input type={showNewPassword ? 'text' : 'password'} value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} className="w-full px-6 py-4 pr-14 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[rgb(247,219,190)] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300" placeholder="Enter new password" />
                              <button onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Confirm New Password</label>
                            <div className="relative">
                              <input type={showConfirmPassword ? 'text' : 'password'} value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} className="w-full px-6 py-4 pr-14 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[rgb(247,219,190)] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300" placeholder="Confirm new password" />
                              <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>

                          <div className="flex gap-4 mt-8">
                            <button onClick={handlePasswordChange} disabled={loading} className="px-8 py-4 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 font-semibold shadow-lg">
                              <Check className="w-4 h-4" /> {loading ? 'Updating...' : 'Update Password'}
                            </button>
                            <button onClick={() => setIsChangingPassword(false)} disabled={loading} className="px-8 py-4 bg-gray-500 text-white rounded-2xl hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 font-semibold shadow-lg">
                              <X className="w-4 h-4" /> Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-600 text-lg font-light leading-relaxed">Keep your account secure by updating your password regularly.</p>
                      )}
                    </div>
                  </div>
                )}

                {userDetails.isGoogleUser && (
                  <div className="text-center text-gray-500 italic mt-4">
                    Password management is disabled for Google accounts.
                  </div>
                )}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="relative group">
                <div className="absolute inset-0 bg-[rgb(247,219,190)]/20 rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
                <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-10 m-1">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-[rgb(0,0,0)] flex items-center gap-4">
                      <div className="w-12 h-12 bg-[rgb(247,219,190)] rounded-2xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-gray-800" />
                      </div>
                      My Bookings ({bookings.length})
                    </h2>
                  </div>

                  {bookings.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No bookings found</h3>
                      <p className="text-gray-500">You haven't made any bookings yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {bookings.map((booking) => (
                        <div 
                          key={booking._id} 
                          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                          onClick={() => handlePropertyClick(booking.property._id, booking.guests)}
                        >
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3">
                              <img
                                src={getPropertyImage(booking.property)}
                                alt={booking.property.title}
                                className="w-full h-48 md:h-full object-cover"
                              />
                            </div>
                            
                            <div className="md:w-2/3 p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h3 className="text-xl font-bold text-gray-800 mb-2">{booking.property.title}</h3>
                                  <div className="flex items-center text-gray-600 mb-2">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span>{booking.property.location}</span>
                                  </div>
                                  <div className="flex items-center text-gray-600 mb-2">
                                    <User className="w-4 h-4 mr-1" />
                                    <span>{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</span>
                                  </div>
                                </div>
                                
                                <div className="text-right">
                                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.bookingStatus)}`}>
                                    {booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1)}
                                  </span>
                                  <div className="mt-2 text-2xl font-bold text-gray-800">
                                    ${booking.totalPrice}
                                  </div>
                                </div>
                              </div>

                              <div className="grid md:grid-cols-2 gap-4 mt-4">
                                <div className="flex items-center text-gray-600">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  <div>
                                    <span className="text-sm font-medium">Check-in</span>
                                    <div className="font-semibold">{formatDate(booking.checkIn)}</div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center text-gray-600">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  <div>
                                    <span className="text-sm font-medium">Check-out</span>
                                    <div className="font-semibold">{formatDate(booking.checkOut)}</div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center text-sm text-gray-500">
                                  <Clock className="w-4 h-4 mr-1" />
                                  Booked on {formatDate(booking.createdAt)}
                                </div>
                                
                                <div className="flex items-center text-sm">
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    booking.paymentStatus === 'confirmed' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-orange-100 text-orange-800'
                                  }`}>
                                    Payment {booking.paymentStatus}
                                  </span>
                                </div>
                              </div>

                              <div className="mt-4 text-xs text-gray-500">
                                Booking ID: {booking._id}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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