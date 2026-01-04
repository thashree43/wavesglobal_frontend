import React, { useState, useEffect } from 'react';
import { User, Lock, Calendar, MapPin, Clock, Eye, EyeOff, Edit, Check, X, Download, XCircle, ChevronDown, ChevronUp, Star, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { baseurl } from '../../Base/Base';
import logo from "../../assets/logo.png";
import Navbar from '../../Layout/Navbar';
import MyReviews from '../../Layout/MyReviews';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in`}>
      <div className="flex items-center gap-2">
        <span>{message}</span>
        <button onClick={onClose} className="ml-2">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const ConfirmModal = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
      <div className="flex items-start gap-4 mb-6">
        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Confirm Cancellation</h3>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onConfirm}
          className="flex-1 px-6 py-3 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-all duration-300 font-semibold"
        >
          Yes, Cancel Booking
        </button>
        <button
          onClick={onCancel}
          className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 transition-all duration-300 font-semibold"
        >
          No, Keep It
        </button>
      </div>
    </div>
  </div>
);

const CancelledBanner = () => (
  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r-lg flex items-start gap-3">
    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
    <div>
      <p className="text-red-800 font-semibold text-sm">This booking has been cancelled</p>
      <p className="text-red-600 text-xs mt-1">No charges will be applied for this booking</p>
    </div>
  </div>
);

const RatingModal = ({ booking, onClose, onSubmit, showToast }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [categories, setCategories] = useState({
    cleanliness: 0,
    accuracy: 0,
    checkIn: 0,
    communication: 0,
    location: 0,
    value: 0
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
      showToast('Please select an overall rating', 'error');
      return;
    }

    const finalCategories = { ...categories };
    Object.keys(finalCategories).forEach(key => {
      if (finalCategories[key] === 0) {
        finalCategories[key] = rating;
      }
    });

    onSubmit(booking._id, rating, review, finalCategories);
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
          <h3 className="text-2xl font-bold text-gray-800">Rate Your Stay</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">{booking.property.title}</h4>
          <p className="text-gray-600">{booking.property.location}</p>
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
            Rate Categories (Optional - will use overall rating if not set)
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
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience... What did you like? What could be improved?"
            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="4"
            maxLength={1000}
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {review.length} / 1000 characters
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all duration-300 font-semibold"
            style={{ backgroundColor: 'rgb(231, 121, 0)' }}
          >
            Submit Review
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

const InvoiceGenerator = ({ booking, logoUrl }) => {
  const generateInvoice = () => {
    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Wavescation Invoice - ${booking._id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
          .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 3px solid #f7dbbd; padding-bottom: 20px; }
          .logo { height: 120px; }
          .header-info { text-align: right; }
          .header h1 { color: #000; margin: 0; font-size: 32px; }
          .header p { color: #666; margin: 5px 0; }
          .invoice-details { display: flex; justify-content: space-between; margin: 30px 0; }
          .section { margin: 20px 0; }
          .section-title { font-weight: bold; font-size: 18px; margin-bottom: 10px; color: #000; border-bottom: 2px solid #f7dbbd; padding-bottom: 5px; }
          .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
          .info-label { font-weight: 600; color: #666; }
          .info-value { color: #000; }
          .property-details { background: #f8fcff; padding: 20px; border-radius: 10px; margin: 20px 0; }
          .pricing-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .pricing-table td { padding: 10px; border-bottom: 1px solid #eee; }
          .pricing-table .label { color: #666; }
          .pricing-table .value { text-align: right; font-weight: 600; }
          .total-row { font-size: 20px; font-weight: bold; background: #f7dbbd; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #f7dbbd; color: #666; }
          .status-badge { display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; }
          .status-confirmed { background: #d4edda; color: #155724; }
          .status-pending { background: #fff3cd; color: #856404; }
          .status-completed { background: #d1ecf1; color: #0c5460; }
          .status-cancelled { background: #f8d7da; color: #721c24; }
          @media print {
            body { padding: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="${logoUrl}" alt="Wavescation" class="logo" />
          <div class="header-info">
            <h1>BOOKING INVOICE</h1>
            <p>Invoice ID: ${booking._id}</p>
            <p>Generated on: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        <div class="invoice-details">
          <div>
            <div class="section-title">Guest Information</div>
            <p><strong>Name:</strong> ${booking.guestName || 'N/A'}</p>
            <p><strong>Email:</strong> ${booking.guestEmail || 'N/A'}</p>
            <p><strong>Phone:</strong> ${booking.guestPhone || 'N/A'}</p>
          </div>
          <div>
            <div class="section-title">Booking Status</div>
            <p><span class="status-badge status-${booking.bookingStatus}">${booking.bookingStatus.toUpperCase()}</span></p>
            <p><strong>Payment:</strong> ${booking.paymentStatus}</p>
            <p><strong>Booked on:</strong> ${new Date(booking.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div class="property-details">
          <div class="section-title">Property Details</div>
          <h2>${booking.property.title}</h2>
          <p><strong>Location:</strong> ${booking.property.location}</p>
          <p><strong>Guests:</strong> ${booking.guests}</p>
        </div>

        <div class="section">
          <div class="section-title">Stay Details</div>
          <div class="info-row">
            <span class="info-label">Check-in Date:</span>
            <span class="info-value">${new Date(booking.checkIn).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Check-out Date:</span>
            <span class="info-value">${new Date(booking.checkOut).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Pricing Period:</span>
            <span class="info-value">${booking.pricingPeriod}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Number of Units:</span>
            <span class="info-value">${booking.units}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Price Breakdown</div>
          <table class="pricing-table">
            <tr>
              <td class="label">Price per ${booking.pricingPeriod}</td>
              <td class="value">AED ${booking.Components.toFixed(2)}</td>
            </tr>
            <tr>
              <td class="label">Subtotal (${booking.units} ${booking.pricingPeriod}${booking.units > 1 ? 's' : ''})</td>
              <td class="value">AED ${booking.subtotal.toFixed(2)}</td>
            </tr>
            ${booking.cleaningFee > 0 ? `
            <tr>
              <td class="label">Cleaning Fee</td>
              <td class="value">AED ${booking.cleaningFee.toFixed(2)}</td>
            </tr>` : ''}
            ${booking.serviceFee > 0 ? `
            <tr>
              <td class="label">Service Fee</td>
              <td class="value">AED ${booking.serviceFee.toFixed(2)}</td>
            </tr>` : ''}
            ${booking.cityTax > 0 ? `
            <tr>
              <td class="label">City Tax</td>
              <td class="value">AED ${booking.cityTax.toFixed(2)}</td>
            </tr>` : ''}
            ${booking.vat > 0 ? `
            <tr>
              <td class="label">VAT</td>
              <td class="value">AED ${booking.vat.toFixed(2)}</td>
            </tr>` : ''}
            <tr class="total-row">
              <td>TOTAL AMOUNT</td>
              <td style="text-align: right;">AED ${booking.totalPrice.toFixed(2)}</td>
            </tr>
          </table>
        </div>

        <div class="section">
          <div class="section-title">Payment Information</div>
          <div class="info-row">
            <span class="info-label">Payment Method:</span>
            <span class="info-value">${booking.paymentMethod.replace(/-/g, ' ').toUpperCase()}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Advance Payment:</span>
            <span class="info-value">${booking.advancePaymentPaid ? 'Paid' : 'Not Paid'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Payment Status:</span>
            <span class="info-value">${booking.paymentStatus.toUpperCase()}</span>
          </div>
        </div>

        <div class="footer">
          <p><strong>Wavescation Holiday Homes</strong></p>
          <p>Iris Bay Tower, Business Bay, Dubai</p>
          <p>Phone: +971 52 259 6860 | Email: Info@wavescation.com</p>
          <p style="margin-top: 20px;">Thank you for choosing Wavescation!</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([invoiceHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Wavescation_Invoice_${booking._id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={generateInvoice}
      className="px-6 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 font-semibold shadow-lg"
    >
      <Download className="w-4 h-4" />
      Download Invoice
    </button>
  );
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmCancel, setConfirmCancel] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedBookingForRating, setSelectedBookingForRating] = useState(null);

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    mobile: '',
    isGoogleUser: false,
    _id: ''
  });

  const [originalUserDetails, setOriginalUserDetails] = useState({
    name: '',
    email: '',
    mobile: '',
    isGoogleUser: false
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const getUserAndBookings = async () => {
    try {
      const response = await axios.get(`${baseurl}User/getuser`, { withCredentials: true });
      if (response.data.user) {
        setUserDetails(response.data.user);
        setOriginalUserDetails(response.data.user);

        const bookingsRes = await axios.get(`${baseurl}User/get-booking`, {
          params: { id: response.data.user._id }
        });

        if (bookingsRes.data && bookingsRes.data.bookings) {
          setBookings(bookingsRes.data.bookings);
        }
      }
    } catch (error) {
      console.error(error);
      showToast('Failed to fetch user details', 'error');
    }
  };

  useEffect(() => {
    getUserAndBookings();
    const savedTab = sessionStorage.getItem('profileActiveTab');
    if (savedTab) {
      setActiveTab(savedTab);
      sessionStorage.removeItem('profileActiveTab');
    }
  }, []);

  const handlePropertyClick = (propertyId, guests) => {
    sessionStorage.setItem('profileActiveTab', activeTab);
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
        showToast(response.data.message || 'Profile updated successfully!', 'success');
        setOriginalUserDetails({ ...userDetails });
        setIsEditingProfile(false);
      } else {
        showToast(response.data.message || 'Failed to update profile', 'error');
      }
    } catch (error) {
      console.error(error);
      showToast(error.response?.data?.message || 'Error updating profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      showToast('New password must be at least 6 characters long', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`${baseurl}User/changepassword`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, { withCredentials: true });

      if (response.data.success) {
        showToast(response.data.message || 'Password changed successfully!', 'success');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setIsChangingPassword(false);
      } else {
        showToast(response.data.message || 'Failed to change password', 'error');
      }
    } catch (error) {
      console.error(error);
      showToast(error.response?.data?.message || 'Error changing password', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    setLoading(true);
    try {
      const response = await axios.put(`${baseurl}user/cancel-booking/${bookingId}`, {}, { withCredentials: true });

      if (response.data.success) {
        showToast('Booking cancelled successfully', 'success');
        getUserAndBookings();
        setExpandedBooking(null);
        setConfirmCancel(null);
      } else {
        showToast(response.data.message || 'Failed to cancel booking', 'error');
      }
    } catch (error) {
      console.error(error);
      showToast(error.response?.data?.message || 'Error cancelling booking', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRatingSubmit = async (bookingId, rating, review, categories) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseurl}user/${bookingId}/review`,
        {
          rating,
          review,
          categories
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        showToast('Review submitted successfully!', 'success');
        setShowRatingModal(false);
        setSelectedBookingForRating(null);
        getUserAndBookings();
      } else {
        showToast(response.data.message || 'Failed to submit review', 'error');
      }
    } catch (error) {
      console.error(error);
      showToast(error.response?.data?.message || 'Error submitting review', 'error');
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
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
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
    if (property && property.images && property.images.length > 0) {
      return property.images[0].url || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=250&fit=crop';
    }
    return 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=250&fit=crop';
  };

  const canRateBooking = (booking) => {
    return booking.checkedOut === true && !booking.rated;
  };

  const canCancelBooking = (booking) => {
    return booking.bookingStatus !== 'cancelled' &&
      booking.bookingStatus !== 'completed' &&
      booking.checkedOut !== true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(247,247,247)] via-white to-[rgb(248,252,255)]">
      <Navbar />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {confirmCancel && (
        <ConfirmModal
          message="Are you sure you want to cancel this booking? This action cannot be undone."
          onConfirm={() => handleCancelBooking(confirmCancel)}
          onCancel={() => setConfirmCancel(null)}
        />
      )}

      {showRatingModal && selectedBookingForRating && (
        <RatingModal
          booking={selectedBookingForRating}
          onClose={() => {
            setShowRatingModal(false);
            setSelectedBookingForRating(null);
          }}
          onSubmit={handleRatingSubmit}
          showToast={showToast}
        />
      )}

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
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 flex items-center gap-3 font-semibold ${activeTab === 'reviews'
                      ? 'bg-[rgb(247,219,190)]/30 text-gray-800 border border-[rgb(247,219,190)]/50 shadow-lg transform scale-105'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                      }`}
                  >
                    <Star className="w-5 h-5" /> My Reviews
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
                          <input type="text" value={userDetails.name} onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[rgb(247,219,190)] focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-800 font-medium transition-all duration-300" />
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
                          <input type="tel" value={userDetails.mobile} onChange={(e) => setUserDetails({ ...userDetails, mobile: e.target.value })} className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[rgb(247,219,190)] focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-800 font-medium transition-all duration-300" />
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
                              <input type={showPassword ? 'text' : 'password'} value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} className="w-full px-6 py-4 pr-14 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[rgb(247,219,190)] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300" placeholder="Enter current password" />
                              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">New Password</label>
                            <div className="relative">
                              <input type={showNewPassword ? 'text' : 'password'} value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} className="w-full px-6 py-4 pr-14 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[rgb(247,219,190)] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300" placeholder="Enter new password" />
                              <button onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Confirm New Password</label>
                            <div className="relative">
                              <input type={showConfirmPassword ? 'text' : 'password'} value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} className="w-full px-6 py-4 pr-14 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[rgb(247,219,190)] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300" placeholder="Confirm new password" />
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
                      {bookings.map((booking) => {
                        const isCancelled = booking.bookingStatus === 'cancelled';
                        return (
                          <div key={booking._id} className={`bg-white rounded-2xl shadow-lg border overflow-hidden hover:shadow-xl transition-all duration-300 ${isCancelled ? 'border-red-200 opacity-75' : 'border-gray-100'}`}>
                            {isCancelled && <CancelledBanner />}
                            <div className="flex flex-col md:flex-row">
                              <div
                                className="md:w-1/3 cursor-pointer relative"
                                onClick={() => handlePropertyClick(booking.property._id, booking.guests)}
                              >
                                <img
                                  src={getPropertyImage(booking.property)}
                                  alt={booking.property.title}
                                  className={`w-full h-48 md:h-full object-cover hover:scale-105 transition-transform duration-300 ${isCancelled ? 'grayscale' : ''}`}
                                />
                                {isCancelled && (
                                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">CANCELLED</span>
                                  </div>
                                )}
                              </div>

                              <div className="md:w-2/3 p-6">
                                <div className="flex items-start justify-between mb-4">
                                  <div
                                    className="cursor-pointer flex-1"
                                    onClick={() => handlePropertyClick(booking.property._id, booking.guests)}
                                  >
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-[rgb(247,219,190)] transition-colors">{booking.property.title}</h3>
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
                                    <div className={`mt-2 text-2xl font-bold ${isCancelled ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                                      AED {booking.totalPrice}
                                    </div>
                                    {isCancelled && (
                                      <div className="text-sm text-red-600 font-semibold mt-1">Refunded</div>
                                    )}
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

                                  <button
                                    onClick={() => setExpandedBooking(expandedBooking === booking._id ? null : booking._id)}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[rgb(247,219,190)] transition-colors"
                                  >
                                    {expandedBooking === booking._id ? (
                                      <>
                                        <ChevronUp className="w-4 h-4" /> Hide Details
                                      </>
                                    ) : (
                                      <>
                                        <ChevronDown className="w-4 h-4" /> View Details
                                      </>
                                    )}
                                  </button>
                                </div>

                                {expandedBooking === booking._id && (
                                  <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase">Guest Information</h4>
                                        <div className="space-y-1 text-sm">
                                          <p><span className="font-medium">Name:</span> {booking.guestName || 'N/A'}</p>
                                          <p><span className="font-medium">Email:</span> {booking.guestEmail || 'N/A'}</p>
                                          <p><span className="font-medium">Phone:</span> {booking.guestPhone || 'N/A'}</p>
                                        </div>
                                      </div>

                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase">Booking Details</h4>
                                        <div className="space-y-1 text-sm">
                                          <p><span className="font-medium">Pricing Period:</span> {booking.pricingPeriod}</p>
                                          <p><span className="font-medium">Units:</span> {booking.units}</p>
                                          <p><span className="font-medium">Price per Unit:</span> AED {booking.pricePerUnit}</p>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase">Price Breakdown</h4>
                                      <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span>Subtotal</span>
                                          <span className="font-semibold">AED {booking.subtotal.toFixed(2)}</span>
                                        </div>
                                        {booking.cleaningFee > 0 && (
                                          <div className="flex justify-between">
                                            <span>Cleaning Fee</span>
                                            <span className="font-semibold">AED {booking.cleaningFee.toFixed(2)}</span>
                                          </div>
                                        )}
                                        {booking.serviceFee > 0 && (
                                          <div className="flex justify-between">
                                            <span>Service Fee</span>
                                            <span className="font-semibold">AED {booking.serviceFee.toFixed(2)}</span>
                                          </div>
                                        )}
                                        {booking.cityTax > 0 && (
                                          <div className="flex justify-between">
                                            <span>City Tax</span>
                                            <span className="font-semibold">AED {booking.cityTax.toFixed(2)}</span>
                                          </div>
                                        )}
                                        {booking.vat > 0 && (
                                          <div className="flex justify-between">
                                            <span>VAT</span>
                                            <span className="font-semibold">AED {booking.vat.toFixed(2)}</span>
                                          </div>
                                        )}
                                        <div className="flex justify-between pt-2 border-t border-gray-200 font-bold text-base">
                                          <span>Total</span>
                                          <span className={isCancelled ? 'line-through text-gray-400' : ''}>
                                          AED {booking.totalPrice.toFixed(2)}
                                          </span>
                                        </div>
                                        {isCancelled && (
                                          <div className="flex justify-between pt-2 text-red-600 font-bold">
                                            <span>Amount Refunded</span>
                                            <span>AED {booking.totalPrice.toFixed(2)}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div>
                                      <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase">Payment Information</h4>
                                      <div className="space-y-1 text-sm">
                                        <p><span className="font-medium">Method:</span> {booking.paymentMethod.replace(/-/g, ' ').toUpperCase()}</p>
                                        <p>
                                          <span className="font-medium">Status:</span>{' '}
                                          <span className={`px-2 py-1 rounded text-xs font-medium ${isCancelled
                                            ? 'bg-red-100 text-red-800'
                                            : booking.paymentStatus === 'paid'
                                              ? 'bg-green-100 text-green-800'
                                              : 'bg-orange-100 text-orange-800'
                                            }`}>
                                            {isCancelled ? 'REFUNDED' : booking.paymentStatus.toUpperCase()}
                                          </span>
                                        </p>
                                        <p><span className="font-medium">Advance Payment:</span> {booking.advancePaymentPaid ? 'Paid' : 'Not Paid'}</p>
                                      </div>
                                    </div>

                                    {!isCancelled && (
                                      <div className="flex gap-4 mt-6 pt-4 border-t border-gray-200 flex-wrap">
                                        <InvoiceGenerator booking={booking} logoUrl='https://www.wavescation.com/assets/logo-DC0iQ2p5.png' />

                                        {canRateBooking(booking) && (
                                          <button
                                            onClick={() => {
                                              setSelectedBookingForRating(booking);
                                              setShowRatingModal(true);
                                            }}
                                            className="px-6 py-3 bg-yellow-500 text-white rounded-2xl hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 font-semibold shadow-lg"
                                          >
                                            <Star className="w-4 h-4" />
                                            Rate & Review
                                          </button>
                                        )}

                                        {canCancelBooking(booking) && (
                                          <button
                                            onClick={() => setConfirmCancel(booking._id)}
                                            disabled={loading}
                                            className="px-6 py-3 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 font-semibold shadow-lg disabled:opacity-50"
                                          >
                                            <XCircle className="w-4 h-4" />
                                            Cancel Booking
                                          </button>
                                        )}
                                      </div>
                                    )}

                                    {isCancelled && booking.updatedAt && (
                                      <div className="text-xs text-red-600 mt-4 pt-4 border-t border-red-200">
                                        Cancelled on {formatDate(booking.updatedAt)}
                                      </div>
                                    )}

                                    <div className="mt-4 text-xs text-gray-500">
                                      Booking ID: {booking._id}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <MyReviews />
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;