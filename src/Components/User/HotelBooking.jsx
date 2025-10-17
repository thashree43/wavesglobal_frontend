import React, { useState, useEffect } from 'react';
import { ChevronLeft, Loader2, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { baseurl } from '../../Base/Base';
import CheckoutPayment from '../../Layout/Payment';
import CheckoutDetails from '../../Layout/Chekout';
import CheckoutComplete from "../../Layout/BookingComplete"
import Navbar from '../../Layout/Navbar';
import Footer from '../../Layout/Footer';

const HotelCheckout = () => {
  const [bookingDetails, setBookingDetails] = useState({
    roomType: '',
    checkIn: '',
    checkOut: '',
    guests: 0,
    pricingPeriod: 'night',
    units: 0,
    pricePerUnit: 0,
    subtotal: 0,
    cleaningFee: 0,
    serviceFee: 0,
    cityTax: 0,
    vat: 0,
    total: 0,
    propertyId: '',
    userId: '',
    propertyImage: '',
    property: null,
    bookingId: null
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
      propertyId: urlParams.get('propertyId'),
      bookingId: urlParams.get('bookingId'),
      
    };
  };

  const GetBooking = async () => {
    try {
      setLoading(true);
      setError(null);
  
      const urlParams = getUrlParams();
      const token = localStorage.getItem('authToken');
  
      if (!urlParams.bookingId || !urlParams.propertyId) {
        throw new Error('Missing required parameters: bookingId or propertyId');
      }
  
      const response = await axios.get(`${baseurl}user/checkout`, {
        params: {
          propertyId: urlParams.propertyId,
          bookingId: urlParams.bookingId
        },
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
  
      const { propertyData, userData, bookingData } = response.data;
  
      // ✅ Set only the required fields
      setBookingDetails({
        roomType: propertyData?.title || propertyData?.name || 'Property',
        checkIn: bookingData?.checkIn || urlParams.checkin,
        checkOut: bookingData?.checkOut || urlParams.checkout,
        guests: bookingData?.guests || urlParams.guests,
        pricingPeriod: bookingData?.pricingPeriod || urlParams.pricingPeriod,
        units: bookingData?.units || urlParams.units,
        pricePerUnit: bookingData?.pricePerUnit || urlParams.pricePerUnit,
        subtotal: bookingData?.subtotal || urlParams.subtotal,
        cleaningFee: bookingData?.cleaningFee || urlParams.cleaningFee,
        serviceFee: bookingData?.serviceFee || urlParams.serviceFee,
        cityTax: bookingData?.cityTax || urlParams.cityTax,
        vat: bookingData?.vat || urlParams.vat,
        total: bookingData?.totalPrice || urlParams.totalPrice,
        propertyId: bookingData?.property || urlParams.propertyId,
        userId: userData?._id,
        propertyImage: propertyData?.images?.[0]?.url || '',
        property: propertyData,
        bookingId: bookingData?._id || urlParams.bookingId
      });
  
      // ✅ Fill user form data if available
      if (userData) {
        setFormData(prev => ({
          ...prev,
          name: userData.name || userData.fullName || '',
          email: userData.email || '',
          phone: userData.mobile || userData.phone || ''
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
  }

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
      return true;
    }
    return true;
  };

  const handlePaymentSuccess = () => {
    setBookingComplete(true);
    setCurrentStep(3);
  };

  const nextStep = async () => {
    if (validateStep(currentStep)) {
      if (currentStep === 1) {
        setCurrentStep(2);
        setError(null);
      } else if (currentStep === 2) {
        setCurrentStep(3);
        setError(null);
      }
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

  const getPeriodLabel = () => {
    const labels = {
      'night': 'Night',
      'week': 'Week',
      'month': 'Month',
      'year': 'Year'
    };
    return labels[bookingDetails.pricingPeriod] || 'Night';
  };

  const getPeriodLabelPlural = () => {
    const labels = {
      'night': 'Nights',
      'week': 'Weeks',
      'month': 'Months',
      'year': 'Years'
    };
    return labels[bookingDetails.pricingPeriod] || 'Nights';
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
      <Navbar/>
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
                  bookingDetails={bookingDetails}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  validateStep={validateStep}
                  onPaymentSuccess={handlePaymentSuccess}
                />
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
                  <span className="text-gray-600">Property:</span>
                  <span className="font-semibold text-gray-900 text-right">{bookingDetails.roomType}</span>
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
                  <span className="font-semibold text-gray-900">{bookingDetails.guests} {bookingDetails.guests === 1 ? 'Guest' : 'Guests'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Booking Period:</span>
                  <span className="font-semibold text-gray-900">{bookingDetails.units} {bookingDetails.units === 1 ? getPeriodLabel() : getPeriodLabelPlural()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Rate per {getPeriodLabel()}:</span>
                  <span className="font-semibold text-gray-900">AED {bookingDetails.pricePerUnit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-gray-900">AED {bookingDetails.subtotal.toLocaleString()}</span>
                </div>
                {bookingDetails.cleaningFee > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Cleaning Fee:</span>
                    <span className="font-semibold text-gray-900">AED {bookingDetails.cleaningFee.toLocaleString()}</span>
                  </div>
                )}
                {bookingDetails.serviceFee > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Service Fee:</span>
                    <span className="font-semibold text-gray-900">AED {bookingDetails.serviceFee.toLocaleString()}</span>
                  </div>
                )}
                {bookingDetails.cityTax > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">City Tourism Tax:</span>
                    <span className="font-semibold text-gray-900">AED {bookingDetails.cityTax.toLocaleString()}</span>
                  </div>
                )}
                {bookingDetails.vat > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">VAT/GST:</span>
                    <span className="font-semibold text-gray-900">AED {bookingDetails.vat.toLocaleString()}</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center py-4 border-t-2 border-gray-200 bg-gradient-to-r from-orange-50 to-amber-50 -mx-6 px-6 rounded-xl">
                <span className="text-lg font-bold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-orange-600">AED {bookingDetails.total.toLocaleString()}</span>
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
      <Footer/>
    </div>
  );
};

export default HotelCheckout;