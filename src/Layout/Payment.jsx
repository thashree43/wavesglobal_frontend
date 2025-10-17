import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowRight, ArrowLeft, CreditCard, Check, Shield, AlertTriangle, Loader2, Building, Lock } from 'lucide-react';
import { baseurl } from '../Base/Base';

const CheckoutPayment = ({ 
  formData, 
  handleInputChange, 
  bookingDetails, 
  nextStep, 
  prevStep, 
  validateStep, 
  onPaymentSuccess 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('pay-at-property');

  useEffect(() => {
    if (!bookingDetails.bookingId) {
      createBooking();
    }
  }, []);

  const createBooking = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');

      const response = await axios.post(
        `${baseurl}user/add-booking`,
        {
          userId,
          propertyId: bookingDetails.propertyId,
          checkinDate: bookingDetails.checkIn,
          checkoutDate: bookingDetails.checkOut,
          guests: bookingDetails.guests,
          pricingPeriod: bookingDetails.pricingPeriod,
          units: bookingDetails.units,
          pricePerUnit: bookingDetails.pricePerUnit,
          subtotal: bookingDetails.subtotal,
          cleaningFee: bookingDetails.cleaningFee,
          serviceFee: bookingDetails.serviceFee,
          cityTax: bookingDetails.cityTax,
          vat: bookingDetails.vat,
          totalPrice: bookingDetails.total
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        bookingDetails.bookingId = response.data.booking._id;
      }
    } catch (err) {
      console.error('Booking creation failed:', err);
      setError(err.response?.data?.message || 'Failed to create booking');
    }
  };

  const handleConfirmBooking = async () => {
    if (!bookingDetails.bookingId) {
      setError('Booking ID not generated. Please refresh and try again.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('authToken');
      
      const response = await axios.post(
        `${baseurl}user/confirm-booking`,
        { 
          bookingId: bookingDetails.bookingId,
          paymentMethod: selectedPayment
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        if (onPaymentSuccess) {
          onPaymentSuccess();
        } else {
          nextStep();
        }
      } else {
        throw new Error('Booking confirmation failed');
      }
    } catch (err) {
      console.error('Booking confirmation failed:', err);
      setError(
        err.response?.data?.message || 
        'Failed to confirm booking. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const isPaymentReady = () => {
    return bookingDetails.bookingId && !loading && selectedPayment;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-8 relative">
          <div className="absolute top-5 left-8 right-8 h-0.5 bg-gray-200"></div>
          <div className="absolute top-5 left-8 w-full h-0.5 bg-orange-500 transition-all duration-500"></div>
          
          <div className="flex flex-col items-center relative z-10 transition-all duration-300 text-orange-500">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 bg-orange-500 text-white shadow-lg">
              <Check className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Details</span>
          </div>
          
          <div className="flex flex-col items-center relative z-10 transition-all duration-300 text-orange-500">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 bg-orange-500 text-white shadow-lg">
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Payment</span>
          </div>
          
          <div className="flex flex-col items-center relative z-10 transition-all duration-300 text-gray-400">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 bg-gray-200 text-gray-400">
              <Check className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Complete</span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-8 relative">
        Complete Your Booking
        <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
        
        <div className="bg-white rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Booking ID:</span>
            <span className="font-mono text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded">
              {bookingDetails.bookingId ? bookingDetails.bookingId.substring(0, 8).toUpperCase() : 'Generating...'}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Property:</span>
            <span className="font-medium text-gray-900">{bookingDetails.roomType}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Check-in:</span>
            <span className="font-medium text-gray-900">{bookingDetails.checkIn}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Check-out:</span>
            <span className="font-medium text-gray-900">{bookingDetails.checkOut}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Guests:</span>
            <span className="font-medium text-gray-900">{bookingDetails.guests} {bookingDetails.guests === 1 ? 'Guest' : 'Guests'}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Duration:</span>
            <span className="font-medium text-gray-900">{bookingDetails.units} {bookingDetails.units === 1 ? 'Night' : 'Nights'}</span>
          </div>

          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Rate per Night:</span>
              <span className="text-gray-900">AED {bookingDetails.pricePerUnit.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-gray-900">AED {bookingDetails.subtotal.toLocaleString()}</span>
            </div>

            {bookingDetails.cleaningFee > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Cleaning Fee:</span>
                <span className="text-gray-900">AED {bookingDetails.cleaningFee.toLocaleString()}</span>
              </div>
            )}

            {bookingDetails.serviceFee > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Service Fee:</span>
                <span className="text-gray-900">AED {bookingDetails.serviceFee.toLocaleString()}</span>
              </div>
            )}

            {bookingDetails.cityTax > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">City Tourism Tax:</span>
                <span className="text-gray-900">AED {bookingDetails.cityTax.toLocaleString()}</span>
              </div>
            )}

            {bookingDetails.vat > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">VAT/GST:</span>
                <span className="text-gray-900">AED {bookingDetails.vat.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between items-center font-bold text-lg pt-3 border-t mt-3">
              <span className="text-gray-900">Total Amount:</span>
              <span className="text-orange-600">AED {bookingDetails.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
        
        <div className="space-y-3">
          <div 
            onClick={() => setSelectedPayment('online-payment')}
            className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 cursor-not-allowed bg-gray-50 opacity-60"
          >
            <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3 flex-shrink-0">
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-600">Online Payment (Card/Wallet)</div>
                  <div className="text-sm text-gray-500">Currently not available</div>
                </div>
              </div>
            </div>
          </div>

          <div 
            onClick={() => setSelectedPayment('netbanking')}
            className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 cursor-not-allowed bg-gray-50 opacity-60"
          >
            <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3 flex-shrink-0">
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-600">Net Banking</div>
                  <div className="text-sm text-gray-500">Currently not available</div>
                </div>
              </div>
            </div>
          </div>

          <div 
            onClick={() => setSelectedPayment('pay-at-property')}
            className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
              selectedPayment === 'pay-at-property' 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-200 hover:border-orange-300 bg-white'
            }`}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 ${
              selectedPayment === 'pay-at-property'
                ? 'border-orange-500 bg-orange-500'
                : 'border-gray-300'
            }`}>
              {selectedPayment === 'pay-at-property' && (
                <Check className="w-3 h-3 text-white" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="font-medium text-gray-900">Pay at Property</div>
                  <div className="text-sm text-gray-600">Payment will be collected during check-in</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Booking Details</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Your booking will be confirmed instantly</li>
              <li>• Payment will be collected at the property during check-in</li>
              <li>• You will receive a confirmation email with all booking details</li>
              <li>• A valid ID proof is required at the time of check-in</li>
              <li>• We will contact you on the provided phone number for confirmation</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleConfirmBooking}
          disabled={!isPaymentReady()}
          className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Confirming Booking...
            </>
          ) : !bookingDetails.bookingId ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Booking ID...
            </>
          ) : (
            <>
              <Shield className="w-5 h-5" />
              Confirm Booking
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        <div className="flex justify-start">
          <button
            onClick={prevStep}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Review
          </button>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        Having trouble? Contact our support team at{' '}
        <a href="mailto:info@wavescation.com" className="text-orange-600 hover:text-orange-700 font-medium">
          info@wavescation.com
        </a>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4 text-center">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirming Booking</h3>
            <p className="text-gray-600 text-sm">Please wait while we confirm your booking</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPayment;