import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseurl } from '../../Base/Base';
import { User, Eye, Calendar, MapPin, DollarSign, Home, Users, BarChart3, FileText, Bell, Settings, Menu, Search, X, CheckCircle, XCircle, Clock, LogOut, Trash2 } from 'lucide-react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const BookingsList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('bookings');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [bookingToCheckout, setBookingToCheckout] = useState(null);
  const [bookingFilter, setBookingFilter] = useState('active');
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3, route: '/dashboard' },
    { id: 'properties', name: 'Properties', icon: Home, route: '/admin/property' },
    { id: 'locations', name: 'Locations', icon: MapPin, route: '/admin/location' },
    { id: 'bookings', name: 'Bookings', icon: Calendar, route: '/bookings' },
    { id: 'revenue', name: 'Revenue', icon: DollarSign, route: '/revenue' },
    { id: 'users', name: 'Users', icon: Users, route: '/users' },
    { id: 'reports', name: 'Reports', icon: FileText, route: '/reports' },
    { id: 'notifications', name: 'Notifications', icon: Bell, route: '/notifications' },
    { id: 'settings', name: 'Settings', icon: Settings, route: '/admin/settings' },
  ];

  useEffect(() => {
    getBookings();
  }, [token]);

  const getBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}admin/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data && Array.isArray(response.data)) {
        setBookings(response.data);
      } else if (response.data) {
        setBookings(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const openCheckoutModal = (booking) => {
    setBookingToCheckout(booking);
    setCheckoutModalOpen(true);
  };

  const closeCheckoutModal = () => {
    setBookingToCheckout(null);
    setCheckoutModalOpen(false);
  };

  const handleCheckout = async () => {
    if (!bookingToCheckout) return;
  
    try {
      setActionLoading(bookingToCheckout._id);
      const response = await axios.put(
        `${baseurl}admin/update-checkout/${bookingToCheckout._id}`,
        { checkedOut: true },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      if (response.data) {
        setBookings(bookings.map(b => 
          b._id === bookingToCheckout._id ? { ...b, checkedOut: true } : b
        ));
        
        if (selectedBooking?._id === bookingToCheckout._id) {
          setSelectedBooking({ ...selectedBooking, checkedOut: true });
        }
        
        closeCheckoutModal();
        toast.success('Booking checked out successfully');
      }
    } catch (error) {
      console.error('Error updating checkout status:', error);
      toast.error('Failed to update checkout status');
    } finally {
      setActionLoading(null);
    }
  };

  const openCancelModal = (booking) => {
    setBookingToCancel(booking);
    setCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setBookingToCancel(null);
    setCancelModalOpen(false);
  };

  const handleCancelBooking = async () => {
    if (!bookingToCancel) return;
  
    try {
      setActionLoading(bookingToCancel._id);
      const response = await axios.put(
        `${baseurl}admin/cancel-booking/${bookingToCancel._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      if (response.data) {
        setBookings(bookings.map(b => 
          b._id === bookingToCancel._id ? { ...b, bookingStatus: 'cancelled' } : b
        ));
        
        if (selectedBooking?._id === bookingToCancel._id) {
          closeModal();
        }
        
        closeCancelModal();
        toast.success('Booking cancelled successfully');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    } finally {
      setActionLoading(null);
    }
  };

  const handleSidebarClick = (itemId, route) => {
    setActiveTab(itemId);
    setSidebarOpen(false);
    if (route) navigate(route);
  };

  const openModal = (booking) => {
    const fullBooking = {
      ...booking,
      user: booking.user || {},
      property: booking.property || {}
    };
    setSelectedBooking(fullBooking);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setModalOpen(false);
  };

  const getPaymentStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return <CheckCircle size={12} />;
      case 'pending':
        return <Clock size={12} />;
      case 'failed':
        return <XCircle size={12} />;
      default:
        return <Clock size={12} />;
    }
  };

  const getBookingStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBookingStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return <CheckCircle size={12} />;
      case 'pending':
        return <Clock size={12} />;
      case 'cancelled':
        return <XCircle size={12} />;
      default:
        return <Clock size={12} />;
    }
  };

  const formatValue = (value, prefix = '', defaultValue = 'N/A') => {
    if (value === null || value === undefined || value === '' || (typeof value === 'number' && value === 0 && prefix === '$')) {
      return defaultValue;
    }
    return `${prefix}${value}`;
  };

  const getFilteredBookings = () => {
    if (bookingFilter === 'active') {
      return bookings.filter(booking => booking.bookingStatus !== 'cancelled' && !booking.checkedOut);
    } else if (bookingFilter === 'cancelled') {
      return bookings.filter(booking => booking.bookingStatus === 'cancelled');
    } else if (bookingFilter === 'checkedout') {
      return bookings.filter(booking => booking.checkedOut === true);
    }
    return bookings;
  };

  const filteredBookings = getFilteredBookings().filter(booking => {
    const userName = booking.user?.name || '';
    const userEmail = booking.user?.email || '';
    const propertyName = booking.property?.title || '';
    const propertyLocation = booking.property?.location || '';
    const bookingId = booking._id || '';

    const matchesSearch = 
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      propertyLocation.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
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
            <h1 className="text-lg font-semibold text-gray-900">Bookings</h1>
            <div className="w-10" />
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {activeTab === 'bookings' ? (
            <div className="h-full flex flex-col">
              <div className="flex-shrink-0 p-4 sm:p-6 lg:p-8 bg-white border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="text-blue-600 flex-shrink-0" size={32} />
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Bookings</h1>
                      <p className="text-gray-600 text-sm sm:text-base">Manage all property bookings</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-sm text-green-700">
                      Total Bookings: {bookings.length}
                    </span>
                  </div>
                  <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                    <span className="text-sm text-blue-700">
                      Active: {bookings.filter(b => b.bookingStatus !== 'cancelled' && !b.checkedOut).length}
                    </span>
                  </div>
                  <div className="flex items-center bg-purple-50 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    <span className="text-sm text-purple-700">
                      Checked Out: {bookings.filter(b => b.checkedOut === true).length}
                    </span>
                  </div>
                  <div className="flex items-center bg-red-50 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                    <span className="text-sm text-red-700">
                      Cancelled: {bookings.filter(b => b.bookingStatus === 'cancelled').length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 py-4 bg-white border-b border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setBookingFilter('active')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        bookingFilter === 'active'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => setBookingFilter('checkedout')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        bookingFilter === 'checkedout'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Checked Out
                    </button>
                    <button
                      onClick={() => setBookingFilter('cancelled')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        bookingFilter === 'cancelled'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Cancelled
                    </button>
                  </div>

                  <div className="flex-1 bg-white p-4 sm:p-0 rounded-xl sm:rounded-none shadow-sm sm:shadow-none border sm:border-0 border-gray-200">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Search by guest name, property, email or booking ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      />
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

                  <div className="flex-1 overflow-y-auto">
                    <div className="hidden sm:block overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Booking ID</th>
                            <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Guest Info</th>
                            <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Property</th>
                            <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Check-in</th>
                            <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Check-out</th>
                            <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Amount</th>
                            <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Status</th>
                            <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {filteredBookings.map((booking) => (
                            <tr key={booking._id} className="hover:bg-gray-50">
                              <td className="py-4 px-3 sm:px-6">
                                <span className="font-mono text-sm text-gray-900">
                                  #{booking._id?.slice(-5).toUpperCase()}
                                </span>
                              </td>
                              <td className="py-4 px-3 sm:px-6">
                                <div>
                                  <div className="font-medium text-gray-900 text-sm">{booking.user?.name || 'N/A'}</div>
                                  <div className="text-xs text-gray-500">{booking.user?.email || 'N/A'}</div>
                                </div>
                              </td>
                              <td className="py-4 px-3 sm:px-6">
                                <div>
                                  <div className="font-medium text-gray-900 text-sm">{booking.property?.title || 'N/A'}</div>
                                  <div className="text-xs text-gray-500">{booking.property?.location || 'N/A'}</div>
                                </div>
                              </td>
                              <td className="py-4 px-3 sm:px-6">
                                <span className="text-gray-600 text-sm">
                                  {booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : 'N/A'}
                                </span>
                              </td>
                              <td className="py-4 px-3 sm:px-6">
                                <span className="text-gray-600 text-sm">
                                  {booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : 'N/A'}
                                </span>
                              </td>
                              <td className="py-4 px-3 sm:px-6">
                                <span className="font-semibold text-gray-900 text-sm">
                                  ${booking.totalPrice || '0'}
                                </span>
                              </td>
                              <td className="py-4 px-3 sm:px-6">
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getBookingStatusColor(booking.bookingStatus)}`}>
                                  {getBookingStatusIcon(booking.bookingStatus)}
                                  {booking.bookingStatus ? booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1) : 'Pending'}
                                </span>
                              </td>
                              <td className="py-4 px-3 sm:px-6">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => openModal(booking)}
                                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100"
                                  >
                                    <Eye size={12} />
                                    View
                                  </button>
                                  {booking.bookingStatus !== 'cancelled' && !booking.checkedOut && (
                                    <>
                                      <button
                                        onClick={() => openCheckoutModal(booking)}
                                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors text-green-700 bg-green-50 border border-green-200 hover:bg-green-100"
                                      >
                                        <LogOut size={12} />
                                        Checkout
                                      </button>
                                      <button
                                        onClick={() => openCancelModal(booking)}
                                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors text-red-700 bg-red-50 border border-red-200 hover:bg-red-100"
                                      >
                                        <Trash2 size={12} />
                                        Cancel
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="sm:hidden space-y-4 p-4">
                      {filteredBookings.map(booking => (
                        <div key={booking._id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                          <div className="flex items-start justify-between mb-3">
                            <span className="font-mono text-xs text-gray-600">#{booking._id?.slice(-5).toUpperCase()}</span>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getBookingStatusColor(booking.bookingStatus)}`}>
                              {getBookingStatusIcon(booking.bookingStatus)}
                              {booking.bookingStatus ? booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1) : 'Pending'}
                            </span>
                          </div>
                          
                          <div className="mb-3 space-y-2">
                            <div>
                              <div className="font-medium text-gray-900 text-sm">{booking.user?.name || 'N/A'}</div>
                              <div className="text-xs text-gray-500">{booking.user?.email || 'N/A'}</div>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm">{booking.property?.title || 'N/A'}</div>
                              <div className="text-xs text-gray-500">{booking.property?.location || 'N/A'}</div>
                            </div>
                            <div className="text-xs text-gray-600">
                              <div>Check-in: {booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : 'N/A'}</div>
                              <div>Check-out: {booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : 'N/A'}</div>
                            </div>
                            <div className="font-semibold text-gray-900 text-sm">
                              Total: ${booking.totalPrice || '0'}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => openModal(booking)}
                              className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-2 text-xs rounded-lg transition-colors text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100"
                            >
                              <Eye size={12} />
                              View
                            </button>
                            {booking.bookingStatus !== 'cancelled' && !booking.checkedOut && (
                              <>
                                <button
                                  onClick={() => openCheckoutModal(booking)}
                                  className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-2 text-xs rounded-lg transition-colors text-green-700 bg-green-50 border border-green-200 hover:bg-green-100"
                                >
                                  <LogOut size={12} />
                                  Checkout
                                </button>
                                <button
                                  onClick={() => openCancelModal(booking)}
                                  className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-2 text-xs rounded-lg transition-colors text-red-700 bg-red-50 border border-red-200 hover:bg-red-100"
                                >
                                  <Trash2 size={12} />
                                  Cancel
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredBookings.length === 0 && !loading && (
                      <div className="text-center py-12">
                        <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter.</p>
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
                  {React.createElement(sidebarItems.find(item => item.id === activeTab)?.icon || Calendar, { 
                    size: window.innerWidth < 640 ? 32 : 48, 
                    className: "text-blue-600" 
                  })}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {sidebarItems.find(item => item.id === activeTab)?.name} Page
                </h3>
                <p className="text-gray-500 mb-6 text-sm sm:text-base">This page is under development</p>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <Calendar size={16} />
                  Go to Bookings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {checkoutModalOpen && bookingToCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full mb-4">
                <LogOut className="text-green-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Confirm Checkout</h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to mark this booking as checked out? This will remove the booking from the property.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-mono">#{bookingToCheckout._id?.slice(-5).toUpperCase()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Guest:</span>
                  <span className="font-medium">{bookingToCheckout.user?.name || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Property:</span>
                  <span className="font-medium">{bookingToCheckout.property?.title || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Check-out Date:</span>
                  <span className="font-medium">
                    {bookingToCheckout.checkOut ? new Date(bookingToCheckout.checkOut).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={closeCheckoutModal}
                  disabled={actionLoading === bookingToCheckout._id}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={actionLoading === bookingToCheckout._id}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
                >
                  {actionLoading === bookingToCheckout._id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <LogOut size={16} />
                      Confirm Checkout
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {cancelModalOpen && bookingToCancel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                <Trash2 className="text-red-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Cancel Booking</h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to cancel this booking? This action cannot be undone.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-mono">#{bookingToCancel._id?.slice(-5).toUpperCase()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Guest:</span>
                  <span className="font-medium">{bookingToCancel.user?.name || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Property:</span>
                  <span className="font-medium">{bookingToCancel.property?.title || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold">${bookingToCancel.totalPrice || '0'}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={closeCancelModal}
                  disabled={actionLoading === bookingToCancel._id}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium disabled:opacity-50"
                >
                  Keep Booking
                </button>
                <button
                  onClick={handleCancelBooking}
                  disabled={actionLoading === bookingToCancel._id}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
                >
                  {actionLoading === bookingToCancel._id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      Cancel Booking
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Booking Information</h3>
                    <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Booking ID:</span>
                        <span className="font-mono text-sm">#{selectedBooking._id?.slice(-5).toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Booking Status:</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getBookingStatusColor(selectedBooking.bookingStatus)}`}>
                          {getBookingStatusIcon(selectedBooking.bookingStatus)}
                          {selectedBooking.bookingStatus ? selectedBooking.bookingStatus.charAt(0).toUpperCase() + selectedBooking.bookingStatus.slice(1) : 'Pending'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Status:</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(selectedBooking.paymentStatus)}`}>
                          {getPaymentStatusIcon(selectedBooking.paymentStatus)}
                          {selectedBooking.paymentStatus ? selectedBooking.paymentStatus.charAt(0).toUpperCase() + selectedBooking.paymentStatus.slice(1) : 'Pending'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Checkout Status:</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          selectedBooking.checkedOut 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {selectedBooking.checkedOut ? <CheckCircle size={12} /> : <Clock size={12} />}
                          {selectedBooking.checkedOut ? 'Checked Out' : 'Pending Checkout'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Booking Date:</span>
                        <span className="text-sm">{selectedBooking.createdAt ? new Date(selectedBooking.createdAt).toLocaleDateString() : 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Guest Information</h3>
                    <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium text-sm">{formatValue(selectedBooking.user?.name)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="text-sm break-all">{formatValue(selectedBooking.user?.email)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="text-sm">{formatValue(selectedBooking.user?.mobile)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guest Phone:</span>
                        <span className="text-sm">{formatValue(selectedBooking.guestPhone)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guest Email:</span>
                        <span className="text-sm break-all">{formatValue(selectedBooking.guestEmail)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guest Name:</span>
                        <span className="text-sm">{formatValue(selectedBooking.guestName)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Property Information</h3>
                    <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property:</span>
                        <span className="font-medium text-sm">{formatValue(selectedBooking.property?.title)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="text-sm">{formatValue(selectedBooking.property?.location)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="text-sm">{formatValue(selectedBooking.property?.type)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Stay Information</h3>
                    <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-in:</span>
                        <span className="font-medium text-sm">
                          {selectedBooking.checkIn ? new Date(selectedBooking.checkIn).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-out:</span>
                        <span className="font-medium text-sm">
                          {selectedBooking.checkOut ? new Date(selectedBooking.checkOut).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guests:</span>
                        <span className="text-sm">{formatValue(selectedBooking.guests)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nights:</span>
                        <span className="text-sm">
                          {selectedBooking.checkIn && selectedBooking.checkOut
                            ? Math.ceil((new Date(selectedBooking.checkOut) - new Date(selectedBooking.checkIn)) / (1000 * 60 * 60 * 24))
                            : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Payment Details</h3>
                    <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="text-sm">${selectedBooking.subtotal || '0'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cleaning Fee:</span>
                        <span className="text-sm">${selectedBooking.cleaningFee || '0'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service Fee:</span>
                        <span className="text-sm">${selectedBooking.serviceFee || '0'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">City Tax:</span>
                        <span className="text-sm">${selectedBooking.cityTax || '0'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">VAT:</span>
                        <span className="text-sm">${selectedBooking.vat || '0'}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2 mt-2">
                        <span>Total Amount:</span>
                        <span>${selectedBooking.totalPrice || '0'}</span>
                      </div>
                      <div className="flex justify-between text-sm pt-2">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="capitalize text-sm">{selectedBooking.paymentMethod?.replace('-', ' ') || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Advance Paid:</span>
                        <span className={`font-medium ${selectedBooking.advancePaymentPaid ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedBooking.advancePaymentPaid ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Payment Status:</span>
                        <span className={`font-medium ${
                          selectedBooking.paymentStatus === 'paid' ? 'text-green-600' : 
                          selectedBooking.paymentStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {selectedBooking.paymentStatus ? selectedBooking.paymentStatus.charAt(0).toUpperCase() + selectedBooking.paymentStatus.slice(1) : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedBooking.bookingStatus !== 'cancelled' && !selectedBooking.checkedOut && (
                <div className="border-t border-gray-200 pt-6 flex gap-3">
                  <button
                    onClick={() => {
                      closeModal();
                      openCheckoutModal(selectedBooking);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors text-green-700 bg-green-50 border border-green-200 hover:bg-green-100"
                  >
                    <LogOut size={16} />
                    Mark as Checked Out
                  </button>
                </div>
              )}

              <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsList;