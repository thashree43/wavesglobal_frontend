import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, User, ChevronDown } from 'lucide-react';
import axios from 'axios';
const PropertyReviews = ({ propertyId, baseurl }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [stats, setStats] = useState({
  });

  useEffect(() => {
    fetchReviews();
  }, [propertyId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseurl}user/review/${propertyId}`);
      const data = await response.json();
      
      if (data.success) {
        setReviews(data.reviews);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add this function inside PropertyReviews component
  const handleMarkHelpful = async (reviewId) => {
    try {
      const response = await axios.post(
        `${baseurl}user/review/${reviewId}/helpful`,
        {},
        { withCredentials: true }
      );
  
      if (response.data.success) {
        setReviews(reviews.map(review =>
          review._id === reviewId
            ? { ...review, helpfulCount: response.data.helpfulCount }
            : review
        ));
      }
    } catch (error) {
      console.error('Error marking review helpful:', error);
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'fill-current text-orange-500' : 'text-gray-300'}`}
      />
    ));
  };

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
        <div className="bg-gray-300 h-8 w-1/3 mb-6 rounded"></div>
        <div className="space-y-4">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Star className="w-6 h-6 fill-current text-orange-500" />
          <h2 className="text-2xl font-bold">
            {stats.average} · {stats.total} reviews
          </h2>
        </div>

        {/* Rating Breakdown */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Star Distribution */}
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const percentage = (stats.breakdown[rating] / stats.total) * 100;
              return (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-8">{rating} ★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">
                    {stats.breakdown[rating]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Category Ratings */}
          <div className="space-y-3">
            {Object.entries(stats.categories).map(([category, rating]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm capitalize">{category}</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {renderStars(Math.round(rating))}
                  </div>
                  <span className="text-sm font-semibold w-8">{rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review._id} className="border-b border-gray-100 pb-6 last:border-0">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                {review.userAvatar ? (
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-orange-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-orange-500" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{review.userName}</h4>
                    <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                </div>

                <p className="text-gray-700 mb-3">{review.comment}</p>

                <button 
                onClick={() => handleMarkHelpful(review._id)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-500 transition-colors"
                >
                <ThumbsUp className="w-4 h-4" />
                <span>Helpful ({review.helpfulCount})</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {reviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <span className="font-medium">
            {showAll ? 'Show Less' : `Show All ${stats.total} Reviews`}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`}
          />
        </button>
      )}
    </div>
  );
};

export default PropertyReviews;