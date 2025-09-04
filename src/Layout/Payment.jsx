import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowRight, ArrowLeft, User, CreditCard, Check, Shield, AlertTriangle, Loader2 } from 'lucide-react';
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
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        setScriptLoaded(true);
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        setScriptLoaded(true);
        resolve(true);
      };
      script.onerror = () => {
        setScriptLoaded(false);
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    if (!bookingDetails.bookingId) {
      setError('Booking not created. Please go back and try again.');
      return;
    }

    if (!scriptLoaded) {
      setError('Payment gateway is not ready. Please refresh the page and try again.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post(
        `${baseurl}user/create-order`,
        { 
          bookingId: bookingDetails.bookingId, 
          amount: Math.round(bookingDetails.total * 100) 
        },
        { withCredentials: true }
      );

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency || 'AED',
        name: 'Wavescation',
        description: `Hotel Booking - ${bookingDetails.roomType}`,
        order_id: data.orderId,
        handler: async function (response) {
          try {
            setLoading(true);
            
            const verificationResponse = await axios.post(
              `${baseurl}user/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: bookingDetails.bookingId,
              },
              { withCredentials: true }
            );
            
            if (verificationResponse.data.success) {
              if (onPaymentSuccess) {
                onPaymentSuccess();
              } else {
                nextStep();
              }
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (err) {
            console.error('Payment verification failed:', err);
            setError(
              err.response?.data?.message || 
              'Payment verification failed. Please contact support with your payment ID: ' + response.razorpay_payment_id
            );
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: formData.name || '',
          email: formData.email || '',
          contact: formData.phone || '',
        },
        notes: {
          bookingId: bookingDetails.bookingId,
          propertyId: bookingDetails.propertyId,
          checkIn: bookingDetails.checkIn,
          checkOut: bookingDetails.checkOut,
          guests: bookingDetails.guests.toString(),
        },
        theme: {
          color: '#f97316',  
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setError('Payment cancelled. You can try again anytime.');
          },
        },
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        setError(
          response.error.description || 
          'Payment failed. Please check your payment details and try again.'
        );
        setLoading(false);
      });
      
      rzp.open();
      
    } catch (err) {
      console.error('Order creation failed:', err);
      let errorMessage = 'Failed to initiate payment. Please try again.';
      
      if (err.response) {
        errorMessage = err.response.data.message || `Payment failed: ${err.response.status}`;
      } else if (err.request) {
        errorMessage = 'Unable to connect to payment server. Please check your internet connection.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  const isPaymentReady = () => {
    return bookingDetails.bookingId && scriptLoaded && !loading;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Progress Steps */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-8 relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-8 right-8 h-0.5 bg-gray-200"></div>
          <div className="absolute top-5 left-8 w-24 h-0.5 bg-orange-500 transition-all duration-500"></div>
          
          {/* Step 1 - Details (Complete) */}
          <div className="flex flex-col items-center relative z-10 transition-all duration-300 text-orange-500">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 bg-orange-500 text-white shadow-lg">
              <Check className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Details</span>
          </div>
          
          {/* Step 2 - Payment (Current) */}
          <div className="flex flex-col items-center relative z-10 transition-all duration-300 text-orange-500">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 bg-orange-500 text-white shadow-lg">
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Payment</span>
          </div>
          
          {/* Step 3 - Complete */}
          <div className="flex flex-col items-center relative z-10 transition-all duration-300 text-gray-400">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 bg-gray-200 text-gray-400">
              <Check className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Complete</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-8 relative">
        Complete Your Payment
        <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
      </h2>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Booking Summary Card */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
        
        <div className="bg-white rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Booking ID:</span>
            <span className="font-mono text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded">
              {bookingDetails.bookingId || 'Generating...'}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Room:</span>
            <span className="font-medium text-gray-900">{bookingDetails.roomType}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Duration:</span>
            <span className="font-medium text-gray-900">
              {bookingDetails.nights} night{bookingDetails.nights > 1 ? 's' : ''}, {bookingDetails.guests} guest{bookingDetails.guests > 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Room Rate:</span>
              <span className="text-gray-900">AED {(bookingDetails.total - bookingDetails.taxes).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Taxes & Fees:</span>
              <span className="text-gray-900">AED {bookingDetails.taxes?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg pt-2 border-t">
              <span className="text-gray-900">Total Amount:</span>
              <span className="text-orange-600">AED {bookingDetails.total?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h3>
        
        <div className="space-y-3">
          <label className="flex items-center p-4 border-2 border-orange-200 rounded-xl cursor-pointer bg-orange-50 transition-all duration-200">
            <input
              type="radio"
              name="paymentMethod"
              value="razorpay"
              checked={paymentMethod === 'razorpay'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="sr-only"
            />
            <div className="w-5 h-5 rounded-full border-2 border-orange-500 flex items-center justify-center mr-3">
              {paymentMethod === 'razorpay' && (
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="font-medium text-gray-900">Razorpay</div>
                  <div className="text-sm text-gray-600">Credit Card, Debit Card, UPI, Net Banking</div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-orange-600">Recommended</div>
            </div>
          </label>
        </div>
      </div>

      {/* Security Info */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Secure Payment</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Your payment is processed securely via Razorpay</li>
              <li>• All transactions are encrypted with 256-bit SSL</li>
              <li>• Your booking is confirmed instantly after successful payment</li>
              <li>• You will receive a confirmation email with booking details</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <div className="space-y-4">
        <button
          onClick={handleRazorpayPayment}
          disabled={!isPaymentReady()}
          className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing Payment...
            </>
          ) : !bookingDetails.bookingId ? (
            'Waiting for Booking ID...'
          ) : !scriptLoaded ? (
            'Loading Payment Gateway...'
          ) : (
            <>
              <Shield className="w-5 h-5" />
              Pay AED {bookingDetails.total?.toFixed(2) || '0.00'} Securely
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        {/* Back Button */}
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

      {/* Help Text */}
      <div className="text-center text-sm text-gray-500">
        Having trouble? Contact our support team at{' '}
        <a href="mailto:support@wavescation.com" className="text-orange-600 hover:text-orange-700 font-medium">
          support@wavescation.com
        </a>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4 text-center">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Payment</h3>
            <p className="text-gray-600 text-sm">Please do not refresh or close this page</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPayment;