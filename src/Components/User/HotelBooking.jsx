import React, { useState, useEffect } from 'react';
import { ChevronLeft, Loader2, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { baseurl } from '../../Base/Base';
import CheckoutPayment from '../../Layout/Payment';
import CheckoutDetails from '../../Layout/Chekout';
import CheckoutComplete from "../../Layout/BookingComplete"

const HotelCheckout = () => {
  const [bookingDetails, setBookingDetails] = useState({
    roomType: '',
    checkIn: '',
    checkOut: '',
    guests: 0,
    nights: 0,
    roomRate: 0,
    taxes: 0,
    total: 0,
    propertyId: '',
    userId: '',
    propertyImage: '',
    property: null
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    country: 'United States',
    specialRequests: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      userId: urlParams.get('userId'),
      propertyId: urlParams.get('propertyId'),
      checkin: urlParams.get('checkin'),
      checkout: urlParams.get('checkout'),
      guests: parseInt(urlParams.get('guests')) || 1,
      totalPrice: parseFloat(urlParams.get('totalPrice')) || 0
    };
  };

  const GetBooking = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const urlParams = getUrlParams();
      
      if (!urlParams.userId || !urlParams.propertyId) {
        throw new Error('Missing required parameters: userId or propertyId');
      }

      const response = await axios.get(`${baseurl}user/checkout`, {
        params: { propertyId: urlParams.propertyId },
        withCredentials: true
      });
      
      const { propertyData, userData } = response.data;

      const checkInDate = new Date(urlParams.checkin);
      const checkOutDate = new Date(urlParams.checkout);
      const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      const roomRate = Math.round(urlParams.totalPrice / nights);
      const taxes = urlParams.totalPrice * 0.13; 
      const total = urlParams.totalPrice + taxes;

      setBookingDetails({
        roomType: propertyData?.title || propertyData?.name || 'Deluxe Suite',
        checkIn: urlParams.checkin,
        checkOut: urlParams.checkout,
        guests: urlParams.guests,
        nights: nights,
        roomRate: roomRate,
        taxes: taxes,
        total: total,
        propertyId: urlParams.propertyId,
        userId: urlParams.userId,
        propertyImage: propertyData?.images?.[0]?.url || '',
        property: propertyData
      });

      if (userData) {
        setFormData(prev => ({
          ...prev,
          name: userData.name || userData.fullName || '',
          email: userData.email || '',
          phone: userData.phone || userData.phoneNumber || ''
        }));
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching booking data:', err);
      let errorMessage = 'Failed to load booking details. Please try again.';
      
      if (err.response) {
        errorMessage = `Server error: ${err.response.status}`;
      } else if (err.request) {
        errorMessage = 'Unable to connect to server. Please check your connection.';
      } else if (err.message.includes('Missing required parameters')) {
        errorMessage = 'Invalid booking URL. Please check the link and try again.';
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    GetBooking();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateStep = (step) => {
    if (step === 1) {
      return formData.name && formData.email && formData.phone;
    }
    if (step === 2) {
      return formData.cardNumber && formData.expiryDate && formData.cvv;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      const bookingData = {
        userId: bookingDetails.userId,
        propertyId: bookingDetails.propertyId,
        checkIn: bookingDetails.checkIn,
        checkOut: bookingDetails.checkOut,
        guests: bookingDetails.guests,
        nights: bookingDetails.nights,
        totalPrice: bookingDetails.total,
        guestDetails: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          specialRequests: formData.specialRequests
        },
        paymentDetails: {
          cardNumber: formData.cardNumber.replace(/\s/g, ''), 
          expiryDate: formData.expiryDate,
          cvv: formData.cvv
        }
      };

      const response = await axios.post(`${baseurl}/add-booking`, bookingData, {
        withCredentials: true
      });
      
      if (response.data.success) {
        setBookingComplete(true);
      } else {
        throw new Error(response.data.message || 'Booking failed');
      }
      
    } catch (err) {
      console.error('Booking submission error:', err);
      let errorMessage = 'Failed to complete booking. Please try again.';
      
      if (err.response) {
        errorMessage = err.response.data.message || `Booking failed: ${err.response.status}`;
      } else if (err.request) {
        errorMessage = 'Unable to connect to server. Please check your connection.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      setError(null);
    } else {
      setError('Please fill in all required fields before continuing.');
    }
  };

  const prevStep = () => {
    setError(null);
    setCurrentStep(currentStep - 1);
  };

  const handleImageClick = () => {
    const urlParams = getUrlParams();
    window.location.href = `http://localhost:5173/property/${bookingDetails.propertyId}?adults=${urlParams.guests}`;
  };

  if (loading && currentStep < 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 pt-24">
          <div className="text-center py-20">
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading booking details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && currentStep < 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 pt-24">
          <div className="text-center py-20">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all duration-300 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (bookingComplete) {
    return (
      <CheckoutComplete
        formData={formData}
        bookingDetails={bookingDetails}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 pt-24 pb-10">
        
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full"></div>
            </div>
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-700 to-orange-600">
              Wavescation
            </div>
          </div>
          <button className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back to Hotel
          </button>
        </header>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              {currentStep === 1 && (
                <CheckoutDetails
                  formData={formData}
                  handleInputChange={handleInputChange}
                  nextStep={nextStep}
                  validateStep={validateStep}
                />
              )}
              
              {currentStep === 2 && (
                <CheckoutPayment
                  formData={formData}
                  handleInputChange={handleInputChange}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  validateStep={validateStep}
                />
              )}
              
              {currentStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8 relative">
                    Confirm Your Booking
                    <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                  </h2>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Special Requests (Optional)</label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      placeholder="Any special requests or preferences?"
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 hover:border-orange-300 hover:shadow-md bg-gray-50 focus:bg-white text-gray-900 resize-none"
                    />
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Your Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium text-gray-900">{formData.name || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium text-gray-900">{formData.email || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium text-gray-900">{formData.phone || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Payment:</span>
                        <span className="font-medium text-gray-900">****{formData.cardNumber.slice(-4)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={prevStep}
                      disabled={loading}
                      className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Back
                    </button>
                    <button 
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex items-center justify-center gap-2 flex-1 py-4 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Confirm Booking'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 relative">
                Booking Summary
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Room Type:</span>
                  <span className="font-semibold text-gray-900">{bookingDetails.roomType}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Check-in:</span>
                  <span className="font-semibold text-gray-900">{bookingDetails.checkIn}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Check-out:</span>
                  <span className="font-semibold text-gray-900">{bookingDetails.checkOut}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Guests:</span>
                  <span className="font-semibold text-gray-900">{bookingDetails.guests} Adults</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Nights:</span>
                  <span className="font-semibold text-gray-900">{bookingDetails.nights} Nights</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Room Rate:</span>
                  <span className="font-semibold text-gray-900">AED {bookingDetails.roomRate}/night</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Taxes & Fees:</span>
                  <span className="font-semibold text-gray-900">AED {bookingDetails.taxes.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-4 border-t-2 border-gray-200 bg-gradient-to-r from-orange-50 to-amber-50 -mx-6 px-6 rounded-xl">
                <span className="text-lg font-bold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-orange-600">AED {bookingDetails.total.toFixed(2)}</span>
              </div>
              
              <div className="mt-6 rounded-xl overflow-hidden shadow-md">
                {bookingDetails.propertyImage ? (
                  <img 
                    src={bookingDetails.propertyImage}
                    alt={bookingDetails.roomType}
                    onClick={handleImageClick}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110 cursor-pointer"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 animate-pulse rounded-xl"></div>
                )}
              </div>
              
              <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-center justify-center gap-2 text-blue-700">
                  <div className="w-5 h-5 text-blue-600">🛡️</div>
                  <span className="text-sm font-medium">Your booking is secured with SSL encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HotelCheckout;