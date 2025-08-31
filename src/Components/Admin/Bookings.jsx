import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseurl } from '../../Base/Base';
import { User, Eye, Calendar, MapPin, DollarSign, Home, Users, BarChart3, FileText, Bell, Settings, Menu, Search, X, CheckCircle, XCircle, Clock } from 'lucide-react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const BookingsList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('bookings');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3, route: '/dashboard' },
    { id: 'properties', name: 'Properties', icon: Home, route: '/admin/property' },
    { id: 'locations', name: 'Locations', icon: MapPin, route: '/admin/location' },
    { id: 'bookings', name: 'Bookings', icon: Calendar, route: '/bookings' },
    { id: 'revenue', name: 'Revenue', icon: DollarSign, route: '/revenue' },
    { id: 'users', name: 'Users', icon: Users, route: '/users' },
    { id: 'reports', name: 'Reports', icon: FileText, route: '/reports' },
    { id: 'notifications', name: 'Notifications', icon: Bell, route: '/notifications' },
    { id: 'settings', name: 'Settings', icon: Settings, route: '/settings' },
  ];

  const getBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}admin/bookings`);
      console.log(response.data)
      if (response.data) {
        setBookings(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    getBookings();
  }, []);


  console.log(bookings,"mayyy")
  const handleSidebarClick = (itemId, route) => {
    setActiveTab(itemId);
    setSidebarOpen(false);
    if (route) navigate(route);
  };

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setModalOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return <CheckCircle size={12} />;
      case 'pending':
        return <Clock size={12} />;
      case 'cancelled':
        return <XCircle size={12} />;
      case 'completed':
        return <CheckCircle size={12} />;
      default:
        return <Clock size={12} />;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.property?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || booking.status?.toLowerCase() === filterStatus.toLowerCase();
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
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Booking Management</h1>
                      <p className="text-gray-600 text-sm sm:text-base">Manage property bookings and reservations</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-sm text-green-700">
                      Confirmed: {bookings.filter(b => b.status?.toLowerCase() === 'confirmed').length}
                    </span>
                  </div>
                  <div className="flex items-center bg-yellow-50 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                    <span className="text-sm text-yellow-700">
                      Pending: {bookings.filter(b => b.status?.toLowerCase() === 'pending').length}
                    </span>
                  </div>
                  <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                    <span className="text-sm text-blue-700">
                      Completed: {bookings.filter(b => b.status?.toLowerCase() === 'completed').length}
                    </span>
                  </div>
                  <div className="flex items-center bg-red-50 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                    <span className="text-sm text-red-700">
                      Cancelled: {bookings.filter(b => b.status?.toLowerCase() === 'cancelled').length}
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
                          placeholder="Search bookings..."
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
                        <option value="Confirmed">Confirmed</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-hidden px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
                <div className="h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                  {loading && (
                    <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  )}

                  <div className="hidden sm:block flex-shrink-0 overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Booking ID</th>
                          <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Guest</th>
                          <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Property</th>
                          <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Check-in</th>
                          <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Check-out</th>
                          <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Amount</th>
                          <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Status</th>
                          <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Actions</th>
                        </tr>
                      </thead>
                    </table>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    <table className="hidden sm:table w-full">
                      <tbody className="divide-y divide-gray-200">
                        {filteredBookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-gray-50">
                            <td className="py-4 px-3 sm:px-6">
                              <span className="font-mono text-sm text-gray-900">
                              #{booking._id?.slice(-5).toUpperCase()}

                              </span>
                            </td>
                            <td className="py-4 px-3 sm:px-6">
                              <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <User className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{booking.user?.name}</div>
                                  <div className="text-xs text-gray-500">{booking.user?.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-3 sm:px-6">
                              <div className="flex items-center gap-2">
                                <Home className="h-4 w-4 text-gray-400" />
                                <div>
                                  <div className="font-medium text-gray-900">{booking.property?.name}</div>
                                  <div className="text-xs text-gray-500">{booking.property?.location}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-3 sm:px-6">
                              <span className="text-gray-600">
                                {booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : 'N/A'}
                              </span>
                            </td>
                            <td className="py-4 px-3 sm:px-6">
                              <span className="text-gray-600">
                                {booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : 'N/A'}
                              </span>
                            </td>
                            <td className="py-4 px-3 sm:px-6">
                              <span className="font-semibold text-gray-900">
                                ${booking.totalAmount || booking.amount || '0'}
                              </span>
                            </td>
                            <td className="py-4 px-3 sm:px-6">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                {getStatusIcon(booking.status)}
                                {booking.status || 'Pending'}
                              </span>
                            </td>
                            <td className="py-4 px-3 sm:px-6">
                              <button
                                onClick={() => openModal(booking)}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs sm:text-sm transition-colors text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100"
                              >
                                <Eye size={12} />
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="sm:hidden space-y-4 p-4">
                      {filteredBookings.map(booking => (
                        <div key={booking.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-mono text-xs text-gray-600">
                                  {booking.bookingId || `#${booking.id}`}
                                </span>
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                  {getStatusIcon(booking.status)}
                                  {booking.status || 'Pending'}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <User className="h-4 w-4 text-blue-600" />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-medium text-gray-900 text-sm">{booking.user?.name}</div>
                                  <div className="text-xs text-gray-500 truncate">{booking.user?.email}</div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 mb-2">
                                <Home className="h-4 w-4 text-gray-400" />
                                <div className="min-w-0">
                                  <div className="font-medium text-gray-900 text-sm">{booking.property?.name}</div>
                                  <div className="text-xs text-gray-500">{booking.property?.location}</div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                                <span>Check-in: {booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : 'N/A'}</span>
                                <span>Check-out: {booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : 'N/A'}</span>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-gray-900">
                                  ${booking.totalAmount || booking.amount || '0'}
                                </span>
                                <button
                                  onClick={() => openModal(booking)}
                                  className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-lg transition-colors text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100"
                                >
                                  <Eye size={12} />
                                  View
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredBookings.length === 0 && !loading && (
                      <div className="text-center py-12">
                        <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
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

      {modalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
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
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Booking Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Booking ID:</span>
                        <span className="font-mono text-sm">{selectedBooking.bookingId || `#${selectedBooking.id}`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBooking.status)}`}>
                          {getStatusIcon(selectedBooking.status)}
                          {selectedBooking.status || 'Pending'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Booking Date:</span>
                        <span>{selectedBooking.createdAt ? new Date(selectedBooking.createdAt).toLocaleDateString() : 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Guest Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{selectedBooking.user?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span>{selectedBooking.user?.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span>{selectedBooking.user?.phone || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Property Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property:</span>
                        <span className="font-medium">{selectedBooking.property?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span>{selectedBooking.property?.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span>{selectedBooking.property?.type || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Stay Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-in:</span>
                        <span className="font-medium">
                          {selectedBooking.checkIn ? new Date(selectedBooking.checkIn).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-out:</span>
                        <span className="font-medium">
                          {selectedBooking.checkOut ? new Date(selectedBooking.checkOut).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guests:</span>
                        <span>{selectedBooking.guests || selectedBooking.guestCount || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Payment Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>${selectedBooking.subtotal || selectedBooking.baseAmount || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes & Fees:</span>
                    <span>${selectedBooking.taxes || selectedBooking.fees || '0'}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
                    <span>Total Amount:</span>
                    <span>${selectedBooking.totalAmount || selectedBooking.amount || '0'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Payment Status:</span>
                    <span className={`font-medium ${
                      selectedBooking.paymentStatus === 'paid' ? 'text-green-600' : 
                      selectedBooking.paymentStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {selectedBooking.paymentStatus || 'Pending'}
                    </span>
                  </div>
                </div>
              </div>

              {selectedBooking.specialRequests && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Special Requests</h3>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700">{selectedBooking.specialRequests}</p>
                  </div>
                </div>
              )}

              {selectedBooking.notes && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Admin Notes</h3>
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700">{selectedBooking.notes}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Close
              </button>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsList;