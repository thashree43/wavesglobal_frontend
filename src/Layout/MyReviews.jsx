import React, { useState, useEffect } from 'react';
import { Star, Edit, Trash2, X, MapPin, Calendar } from 'lucide-react';
import axios from 'axios';
import { baseurl } from '../Base/Base';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50`}>
      <div className="flex items-center gap-2">
        <span>{message}</span>
        <button onClick={onClose} className="ml-2">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Action</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-all duration-300 font-semibold"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 transition-all duration-300 font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const EditReviewModal = ({ review, onClose, onSubmit, showToast }) => {
  const [rating, setRating] = useState(review.rating);
  const [reviewText, setReviewText] = useState(review.review);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [categories, setCategories] = useState({
    cleanliness: review.categories?.cleanliness || 0,
    accuracy: review.categories?.accuracy || 0,
    checkIn: review.categories?.checkIn || 0,
    communication: review.categories?.communication || 0,
    location: review.categories?.location || 0,
    value: review.categories?.value || 0
  });
  const [hoveredCategory, setHoveredCategory] = useState({});

  const categoryLabels = {
    cleanliness: 'Cleanliness',
    accuracy: 'Accuracy',
    checkIn: 'Check-in',
    communication: 'Communication',
    location: 'Location',
    value: 'Value'
  };

  const handleSubmit = () => {
    if (rating === 0) {
      showToast('Please select a rating', 'error');
      return;
    }
    
    const finalCategories = { ...categories };
    Object.keys(finalCategories).forEach(key => {
      if (finalCategories[key] === 0) {
        finalCategories[key] = rating;
      }
    });
    
    onSubmit(review._id, rating, reviewText, finalCategories);
  };

  const renderStars = (count, onHover, onLeave, onClick, hoveredValue) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        onClick={() => onClick(star)}
        onMouseEnter={() => onHover(star)}
        onMouseLeave={() => onLeave()}
        className="transition-transform hover:scale-110 focus:outline-none"
        type="button"
      >
        <Star
          className={`w-8 h-8 ${
            star <= (hoveredValue || count)
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
          }`}
        />
      </button>
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl my-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Edit Your Review</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">{review.property?.title}</h4>
          <p className="text-gray-600">{review.property?.location}</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Overall Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            {renderStars(
              rating,
              setHoveredRating,
              () => setHoveredRating(0),
              setRating,
              hoveredRating
            )}
            {rating > 0 && (
              <span className="ml-3 text-lg font-semibold text-gray-700">
                {rating} / 5
              </span>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            Category Ratings (Optional)
          </label>
          <div className="space-y-4 bg-gray-50 p-4 rounded-2xl">
            {Object.keys(categories).map((category) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 w-32">
                  {categoryLabels[category]}
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setCategories({ ...categories, [category]: star })}
                      onMouseEnter={() => setHoveredCategory({ ...hoveredCategory, [category]: star })}
                      onMouseLeave={() => setHoveredCategory({ ...hoveredCategory, [category]: 0 })}
                      className="transition-transform hover:scale-110 focus:outline-none"
                      type="button"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (hoveredCategory[category] || categories[category])
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {categories[category] > 0 && (
                  <span className="text-sm font-semibold text-gray-600 w-16 text-right">
                    {categories[category]} / 5
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Your Review (Optional)
          </label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your experience..."
            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="4"
            maxLength={1000}
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {reviewText.length} / 1000 characters
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all duration-300 font-semibold"
            style={{backgroundColor: 'rgb(231, 121, 0)'}}
          >
            Update Review
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 transition-all duration-300 font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');

      const response = await axios.get(`${baseurl}user/user-reviews`, {
        params: { page, limit: 10 },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setReviews(response.data.reviews);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error(error);
      showToast(error.response?.data?.message || 'Failed to fetch reviews', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [page]);

  const handleUpdateReview = async (reviewId, rating, review, categories) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');

      const response = await axios.put(
        `${baseurl}user/review/${reviewId}`,
        { rating, review, categories },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        showToast('Review updated successfully!', 'success');
        setEditingReview(null);
        fetchReviews();
      }
    } catch (error) {
      console.error(error);
      showToast(error.response?.data?.message || 'Failed to update review', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');

      const response = await axios.delete(
        `${baseurl}user/review/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        showToast('Review deleted successfully!', 'success');
        setConfirmDelete(null);
        fetchReviews();
      }
    } catch (error) {
      console.error(error);
      showToast(error.response?.data?.message || 'Failed to delete review', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-5 h-5 ${
          star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="relative group">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {confirmDelete && (
        <ConfirmModal
          message="Are you sure you want to delete this review? This action cannot be undone."
          onConfirm={() => handleDeleteReview(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      {editingReview && (
        <EditReviewModal
          review={editingReview}
          onClose={() => setEditingReview(null)}
          onSubmit={handleUpdateReview}
          showToast={showToast}
        />
      )}

      <div className="absolute inset-0 bg-[rgb(247,219,190)]/20 rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
      <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-10 m-1">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[rgb(0,0,0)] flex items-center gap-4">
            <div className="w-12 h-12 bg-[rgb(247,219,190)] rounded-2xl flex items-center justify-center">
              <Star className="w-6 h-6 text-gray-800" />
            </div>
            My Reviews ({pagination.totalReviews || 0})
          </h2>
        </div>

        {loading && reviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No reviews yet</h3>
            <p className="text-gray-500">You haven't written any reviews yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {review.property?.title || 'Property'}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{review.property?.location || 'N/A'}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Reviewed on {formatDate(review.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingReview(review)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit review"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(review._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete review"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-lg font-semibold text-gray-700">
                      {review.rating} / 5
                    </span>
                  </div>
                </div>

                {review.review && (
                  <div className="mb-4">
                    <p className="text-gray-700 leading-relaxed">{review.review}</p>
                  </div>
                )}

                {review.categories && Object.values(review.categories).some(v => v > 0) && (
                  <div className="bg-gray-50 rounded-xl p-4 mt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Category Ratings</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {Object.entries(review.categories).map(([key, value]) => {
                        if (value === 0) return null;
                        const labels = {
                          cleanliness: 'Cleanliness',
                          accuracy: 'Accuracy',
                          checkIn: 'Check-in',
                          communication: 'Communication',
                          location: 'Location',
                          value: 'Value'
                        };
                        return (
                          <div key={key} className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">{labels[key]}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-semibold">{value}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {review.booking && (
                  <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                    Stay dates: {formatDate(review.booking.checkIn)} - {formatDate(review.booking.checkOut)}
                  </div>
                )}
              </div>
            ))}

            {pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-700">
                  Page {page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                  disabled={page === pagination.totalPages}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;