import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseurl } from '../../Base/Base';
import { Star, Trash2, Eye, MessageSquare, Calendar, MapPin, Home, Users, BarChart3, FileText, Bell, DollarSign, Settings, Menu, Search, X, User } from 'lucide-react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const ReviewsList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('reviews');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({});
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3, route: '/dashboard' },
    { id: 'properties', name: 'Properties', icon: Home, route: '/admin/property' },
    { id: 'locations', name: 'Locations', icon: MapPin, route: '/admin/location' },
    { id: 'revenue', name: 'Revenue', icon: DollarSign, route: '/revenue' },
    { id: 'users', name: 'Users', icon: Users, route: '/users' },
    { id: 'reviews', name: 'Reviews', icon: MessageSquare, route: '/admin/reviews' },
    { id: 'reports', name: 'Reports', icon: FileText, route: '/reports' },
    { id: 'notifications', name: 'Notifications', icon: Bell, route: '/notifications' },
    { id: 'settings', name: 'Settings', icon: Settings, route: '/admin/settings' },
  ];

  useEffect(() => {
    getReviews();
  }, [token]);

  const getReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}admin/reviews`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data) {
        setReviews(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      setActionLoading(prev => ({ ...prev, [reviewId]: true }));
      await axios.delete(`${baseurl}admin/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(reviews.filter(review => review._id !== reviewId));
      setDeleteConfirm(null);
      if (selectedReview?._id === reviewId) {
        setShowModal(false);
        setSelectedReview(null);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    } finally {
      setActionLoading(prev => ({ ...prev, [reviewId]: false }));
    }
  };

  const handleSidebarClick = (itemId, route) => {
    setActiveTab(itemId);
    setSidebarOpen(false);
    if (route) navigate(route);
  };

  const openReviewModal = async (reviewId) => {
    try {
      setViewLoading(true);
      setShowModal(true);
      const response = await axios.get(`${baseurl}admin/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data,"mau here")
      if (response.data) {
        setSelectedReview(response.data);
      }
    } catch (error) {
      console.error('Error fetching review details:', error);
      setShowModal(false);
    } finally {
      setViewLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReview(null);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.property?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.review?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = filterRating === 'All' || review.rating === parseInt(filterRating);
    const matchesStatus = filterStatus === 'All' || review.status === filterStatus;
    return matchesSearch && matchesRating && matchesStatus;
  });

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

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
            <h1 className="text-lg font-semibold text-gray-900">Reviews</h1>
            <div className="w-10" />
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {activeTab === 'reviews' ? (
            <div className="h-full flex flex-col">
              <div className="flex-shrink-0 p-4 sm:p-6 lg:p-8 bg-white border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="text-blue-600 flex-shrink-0" size={32} />
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reviews Management</h1>
                      <p className="text-gray-600 text-sm sm:text-base">Manage and moderate property reviews</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
                    <Star className="text-yellow-400 mr-2 fill-yellow-400" size={16} />
                    <span className="text-sm text-blue-700">Average: {averageRating}</span>
                  </div>
                  <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-sm text-green-700">
                      Active: {reviews.filter(r => r.status === 'active').length}
                    </span>
                  </div>
                  <div className="flex items-center bg-red-50 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                    <span className="text-sm text-red-700">
                      Reported: {reviews.filter(r => r.status === 'reported').length}
                    </span>
                  </div>
                  <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-700">Total: {reviews.length}</span>
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
                          placeholder="Search reviews..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={filterRating}
                        onChange={(e) => setFilterRating(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      >
                        <option value="All">All Ratings</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                      </select>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      >
                        <option value="All">All Status</option>
                        <option value="active">Active</option>
                        <option value="hidden">Hidden</option>
                        <option value="reported">Reported</option>
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

                  <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full min-w-full">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="text-left py-4 px-4 font-semibold text-gray-900 text-sm w-[15%]">User</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-900 text-sm w-[20%]">Property</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-900 text-sm w-[12%]">Rating</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-900 text-sm w-[23%]">Review</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-900 text-sm w-[10%]">Status</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-900 text-sm w-[10%]">Date</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-900 text-sm w-[10%]">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredReviews.map((review) => (
                          <tr key={review._id} className="hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <User className="h-4 w-4 text-blue-600" />
                                </div>
                                <span className="font-medium text-gray-900 text-sm truncate">{review.user?.name || 'Unknown'}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-gray-900 text-sm font-medium truncate block">{review.property?.title || 'N/A'}</span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-1">
                                {renderStars(review.rating)}
                                <span className="ml-1 text-sm text-gray-600">{review.rating}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <p className="text-gray-600 text-sm truncate">{review.review || 'No comment'}</p>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                review.status === 'active' ? 'bg-green-100 text-green-800' : 
                                review.status === 'reported' ? 'bg-red-100 text-red-800' : 
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {review.status}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-gray-600 text-sm whitespace-nowrap">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => openReviewModal(review._id)}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="View Details"
                                >
                                  <Eye size={16} />
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(review._id)}
                                  disabled={actionLoading[review._id]}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                  title="Delete"
                                >
                                  {actionLoading[review._id] ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                  ) : (
                                    <Trash2 size={16} />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="sm:hidden overflow-y-auto p-4">
                    <div className="space-y-4">
                      {filteredReviews.map(review => (
                        <div key={review._id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900 text-sm">{review.user?.name || 'Unknown'}</h3>
                              <p className="text-xs text-gray-600 truncate">{review.property?.title || 'N/A'}</p>
                            </div>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              review.status === 'active' ? 'bg-green-100 text-green-800' : 
                              review.status === 'reported' ? 'bg-red-100 text-red-800' : 
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {review.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">{renderStars(review.rating)}</div>
                            <span className="text-xs text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                            {review.review || 'No comment'}
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => openReviewModal(review._id)}
                              className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 text-blue-600 bg-blue-50 border border-blue-200 rounded-lg text-xs hover:bg-blue-100"
                            >
                              <Eye size={14} />
                              View
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(review._id)}
                              disabled={actionLoading[review._id]}
                              className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 text-red-600 bg-red-50 border border-red-200 rounded-lg text-xs hover:bg-red-100 disabled:opacity-50"
                            >
                              {actionLoading[review._id] ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                              ) : (
                                <>
                                  <Trash2 size={14} />
                                  Delete
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {filteredReviews.length === 0 && !loading && (
                    <div className="text-center py-12">
                      <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews found</h3>
                      <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-4 sm:p-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center max-w-md w-full">
                <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  {React.createElement(sidebarItems.find(item => item.id === activeTab)?.icon || MessageSquare, { 
                    size: window.innerWidth < 640 ? 32 : 48, 
                    className: "text-blue-600" 
                  })}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {sidebarItems.find(item => item.id === activeTab)?.name} Page
                </h3>
                <p className="text-gray-500 mb-6 text-sm sm:text-base">This page is under development</p>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <MessageSquare size={16} />
                  Go to Reviews
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Review Details</h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            {viewLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : selectedReview ? (
              <div className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{selectedReview.user?.name || 'Unknown User'}</h3>
                    <p className="text-sm text-gray-600">{selectedReview.user?.email || 'N/A'}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {new Date(selectedReview.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedReview.status === 'active' ? 'bg-green-100 text-green-800' : 
                    selectedReview.status === 'reported' ? 'bg-red-100 text-red-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedReview.status}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Home size={18} className="text-gray-400" />
                    <h4 className="font-semibold text-gray-900">Property</h4>
                  </div>
                  <p className="text-gray-700">{selectedReview.property?.title || 'N/A'}</p>
                  <p className="text-sm text-gray-600 mt-1">{selectedReview.property?.location || 'N/A'}</p>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Overall Rating</h4>
                  <div className="flex items-center gap-3">
                    <div className="flex">{renderStars(selectedReview.rating)}</div>
                    <span className="text-2xl font-bold text-gray-900">{selectedReview.rating}.0</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Category Ratings</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { key: 'cleanliness', label: 'Cleanliness' },
                      { key: 'accuracy', label: 'Accuracy' },
                      { key: 'checkIn', label: 'Check-in' },
                      { key: 'communication', label: 'Communication' },
                      { key: 'location', label: 'Location' },
                      { key: 'value', label: 'Value' }
                    ].map(category => (
                      <div key={category.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">{category.label}</span>
                        <div className="flex items-center gap-2">
                          <div className="flex">{renderStars(selectedReview.categories?.[category.key] || 0)}</div>
                          <span className="text-sm font-semibold text-gray-900">
                            {selectedReview.categories?.[category.key] || 0}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedReview.review && (
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Review Comment</h4>
                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                      {selectedReview.review}
                    </p>
                  </div>
                )}

                {selectedReview.response?.text && (
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Host Response</h4>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-gray-700 leading-relaxed mb-2">
                        {selectedReview.response.text}
                      </p>
                      <p className="text-xs text-gray-600">
                        {new Date(selectedReview.response.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Helpful votes</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedReview.helpfulCount || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Booking ID</p>
                      <p className="text-sm font-mono text-gray-900">
                        {selectedReview.booking?._id || selectedReview.booking || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 flex gap-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setDeleteConfirm(selectedReview._id);
                      closeModal();
                    }}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete Review
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="text-red-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Review</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this review? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  disabled={actionLoading[deleteConfirm]}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteReview(deleteConfirm)}
                  disabled={actionLoading[deleteConfirm]}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  {actionLoading[deleteConfirm] ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsList;