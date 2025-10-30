import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ArrowRight, ArrowLeft, CreditCard, Check, Shield, AlertTriangle, Loader2, Building } from 'lucide-react';
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
  const [showPaymentWidget, setShowPaymentWidget] = useState(false);
  const [checkoutId, setCheckoutId] = useState(null);
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const paymentFormRef = useRef(null);
  const scriptRef = useRef(null);
  const widgetInitialized = useRef(false); // ✅ NEW: Prevent double initialization

  // Store booking info
  useEffect(() => {
    if (bookingDetails.bookingId) {
      sessionStorage.setItem('currentBookingId', bookingDetails.bookingId);
      sessionStorage.setItem('currentPropertyId', bookingDetails.propertyId || '');
    }
  }, [bookingDetails.bookingId]);

  // Handle success redirect from PaymentReturn
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('paymentSuccess');
    
    if (paymentSuccess === 'true') {
      console.log('✅ Payment successful, proceeding to completion');
      window.history.replaceState({}, '', window.location.pathname);
      
      if (onPaymentSuccess) {
        onPaymentSuccess(bookingDetails);
      } else {
        nextStep();
      }
    }
  }, []);

  // Load widget when checkoutId is ready
  useEffect(() => {
    if (showPaymentWidget && checkoutId && !widgetInitialized.current) {
      widgetInitialized.current = true;
      loadPaymentWidget();
    }
    return () => {
      if (!showPaymentWidget) {
        cleanupWidget();
        widgetInitialized.current = false;
      }
    };
  }, [showPaymentWidget, checkoutId]);

  // Handle widget expiration
  useEffect(() => {
    if (widgetLoaded && checkoutId) {
      const warningTimer = setTimeout(() => {
        setError('⚠️ Payment session expires in 5 minutes! Please complete payment soon.');
      }, 25 * 60 * 1000);

      const refreshTimer = setTimeout(() => {
        console.log('🔄 Checkout expired, refreshing...');
        setError('Payment session expired. Refreshing automatically...');
        setWidgetLoaded(false);
        widgetInitialized.current = false;
        cleanupWidget();
        
        setTimeout(() => {
          handleOnlinePayment();
        }, 2000);
      }, 28 * 60 * 1000);

      return () => {
        clearTimeout(warningTimer);
        clearTimeout(refreshTimer);
      };
    }
  }, [widgetLoaded, checkoutId]);

  const cleanupWidget = () => {
    if (scriptRef.current && scriptRef.current.parentNode) {
      scriptRef.current.parentNode.removeChild(scriptRef.current);
      scriptRef.current = null;
    }
    if (window.wpwlOptions) delete window.wpwlOptions;
    setWidgetLoaded(false);
  };

  // ✅ CRITICAL FIX: Properly configure the payment widget
  const loadPaymentWidget = () => {
    console.log('🚀 Loading payment widget for checkoutId:', checkoutId);
    cleanupWidget();
    
    if (paymentFormRef.current) {
      paymentFormRef.current.innerHTML = '';
    }
  
    // ✅ Create form that AFS widget will populate
    const form = document.createElement('form');
    form.action = `${window.location.origin}/payment-return`; // ✅ Set proper return URL
    form.className = 'paymentWidgets';
    form.setAttribute('data-brands', 'VISA MASTER AMEX');
    
    if (paymentFormRef.current) {
      paymentFormRef.current.appendChild(form);
    }
  
    // ✅ Configure widget options
    window.wpwlOptions = {
      style: "card",
      locale: "en",
      brandDetection: true,
      brandDetectionType: "binlist",
      brandDetectionPriority: ["VISA", "MASTER", "AMEX"],
      
      onReady: function() {
        console.log('✅ Payment widget ready');
        setWidgetLoaded(true);
        setError(null);
      },
      
      onError: function(error) {
        console.error('❌ Widget error:', error);
        setError(`Payment form error: ${error.message || 'Please try again'}`);
        setWidgetLoaded(false);
      }
    };
  
    // ✅ CRITICAL FIX: Use TEST URL - the widget URL MUST match the checkout creation endpoint
    const script = document.createElement('script');
    const afsWidgetUrl = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
    
    console.log('📦 Loading widget from:', afsWidgetUrl);
    
    script.src = afsWidgetUrl;
    script.async = true;
    
    script.onload = () => {
      console.log('✅ Payment script loaded successfully');
    };
  
    script.onerror = (error) => {
      console.error('❌ Failed to load payment script:', error);
      setError('Failed to load payment system. Please refresh and try again.');
      setWidgetLoaded(false);
      widgetInitialized.current = false;
    };
  
    document.body.appendChild(script);
    scriptRef.current = script;
  };

  // Initialize online payment with better error handling
  const handleOnlinePayment = async () => {
    if (!bookingDetails.bookingId) {
      setError('Booking ID not generated. Please refresh and try again.');
      return;
    }

    setLoading(true);
    setError(null);
    widgetInitialized.current = false; // ✅ Reset initialization flag

    try {
      const token = localStorage.getItem('authToken');
      
      console.log('🔄 Initializing payment for booking:', bookingDetails.bookingId);
      
      const response = await axios.post(
        `${baseurl}user/initialize-afs-payment`,
        { bookingId: bookingDetails.bookingId },
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 30000 // 30 second timeout
        }
      );

      console.log('📥 Payment initialization response:', response.data);

      if (response.data.success && response.data.checkoutId) {
        console.log('✅ Payment initialized with checkoutId:', response.data.checkoutId);
        
        // ✅ Small delay to ensure state is clean
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setCheckoutId(response.data.checkoutId);
        setShowPaymentWidget(true);
        sessionStorage.setItem('currentBookingId', bookingDetails.bookingId);
        sessionStorage.setItem('checkoutCreatedAt', Date.now().toString());
      } else {
        throw new Error(response.data.message || 'Payment initialization failed');
      }
    } catch (err) {
      console.error('❌ Payment initialization failed:', err);
      
      // Handle specific error cases
      if (err.response?.status === 400 && err.response?.data?.expired) {
        setError('Your booking session has expired. Please create a new booking.');
        setTimeout(() => {
          window.location.href = `/properties`;
        }, 3000);
      } else if (err.code === 'ECONNABORTED') {
        setError('Request timeout. Please check your internet connection and try again.');
      } else {
        setError(err.response?.data?.message || 'Failed to initialize payment. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handles booking confirmation (for pay-at-property)
  const handleConfirmBooking = async () => {
    if (selectedPayment === 'online-payment') {
      await handleOnlinePayment();
      return;
    }

    // Pay at property flow
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
          headers: { Authorization: `Bearer ${token}` }
        }
      );
  
      if (response.data.success) {
        if (onPaymentSuccess) {
          onPaymentSuccess(response.data.booking);
        } else {
          nextStep();
        }
      } else {
        throw new Error('Booking confirmation failed');
      }
    } catch (err) {
      console.error('Booking confirmation failed:', err);
      setError(err.response?.data?.message || 'Failed to confirm booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Retry widget loading
  const retryWidget = () => {
    setError(null);
    setWidgetLoaded(false);
    widgetInitialized.current = false;
    cleanupWidget();
    setTimeout(() => {
      handleOnlinePayment(); // ✅ Re-initialize from scratch
    }, 500);
  };

  // Payment widget view
  if (showPaymentWidget) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 relative">
          Complete Payment
          <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-700 text-sm mb-3">{error}</p>
                {!error.includes('expired') && !error.includes('Booking session') && (
                  <button
                    onClick={retryWidget}
                    disabled={loading}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Refreshing...' : 'Retry Payment Form'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Amount to pay:</p>
            <p className="text-3xl font-bold text-orange-600">
              AED {bookingDetails.total.toLocaleString()}
            </p>
          </div>
          
          {/* Payment form container */}
          <div 
            ref={paymentFormRef}
            className="payment-widget-container min-h-[400px]"
          />

          {/* Loading state */}
          {!widgetLoaded && !error && (
            <div className="text-center py-12">
              <Loader2 className="w-10 h-10 text-orange-500 animate-spin mx-auto mb-4" />
              <p className="text-gray-700 font-medium mb-2">
                Loading secure payment form...
              </p>
              <p className="text-gray-500 text-sm">
                This may take a few moments. Please don't refresh the page.
              </p>
            </div>
          )}

          {/* Success state */}
          {widgetLoaded && !error && (
            <>
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-700 mb-2">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Payment form ready</span>
                </div>
                <p className="text-green-600 text-sm mb-2">
                  Enter your card details above and click "Pay Now". You'll be redirected automatically after payment.
                </p>
                <p className="text-green-700 text-xs font-medium">
                  ⚠️ Do not close the window during payment processing.
                </p>
              </div>

              {/* Payment time limit notice */}
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-yellow-800 font-medium mb-1">
                      Complete payment within 30 minutes
                    </p>
                    <p className="text-xs text-yellow-700">
                      For security, this payment session will expire after 30 minutes. If it expires, we'll automatically refresh the page for you.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Security info */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-sm font-medium text-blue-800 block mb-1">
                  Secure Payment
                </span>
                <p className="text-xs text-blue-600">
                  Powered by AFS Payment Gateway. All transactions are encrypted and PCI DSS compliant.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back button */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => {
              cleanupWidget();
              widgetInitialized.current = false;
              setShowPaymentWidget(false);
              setCheckoutId(null);
              setError(null);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Payment Options
          </button>
        </div>
      </div>
    );
  }

  // Main payment selection view
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Progress steps */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-8 relative">
          <div className="absolute top-5 left-8 right-8 h-0.5 bg-gray-200"></div>
          <div className="absolute top-5 left-8 w-full h-0.5 bg-orange-500"></div>
          
          <div className="flex flex-col items-center relative z-10 text-orange-500">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2 bg-orange-500 text-white shadow-lg">
              <Check className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Details</span>
          </div>
          
          <div className="flex flex-col items-center relative z-10 text-orange-500">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2 bg-orange-500 text-white shadow-lg">
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Payment</span>
          </div>
          
          <div className="flex flex-col items-center relative z-10 text-gray-400">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2 bg-gray-200">
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

      {/* Booking Summary */}
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
            <span className="text-gray-600">Duration:</span>
            <span className="font-medium text-gray-900">
              {bookingDetails.units} {bookingDetails.units === 1 ? 'Night' : 'Nights'}
            </span>
          </div>

          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between items-center font-bold text-lg">
              <span className="text-gray-900">Total Amount:</span>
              <span className="text-orange-600">AED {bookingDetails.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
        
        <div className="space-y-3">
          <div 
            onClick={() => setSelectedPayment('online-payment')}
            className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
              selectedPayment === 'online-payment' 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-200 hover:border-orange-300'
            }`}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
              selectedPayment === 'online-payment'
                ? 'border-orange-500 bg-orange-500'
                : 'border-gray-300'
            }`}>
              {selectedPayment === 'online-payment' && <Check className="w-3 h-3 text-white" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="font-medium text-gray-900">Pay Online</div>
                  <div className="text-sm text-gray-600">Credit/Debit Card (VISA, MasterCard, AMEX)</div>
                </div>
              </div>
            </div>
          </div>

          <div 
            onClick={() => setSelectedPayment('pay-at-property')}
            className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
              selectedPayment === 'pay-at-property' 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-200 hover:border-orange-300'
            }`}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
              selectedPayment === 'pay-at-property'
                ? 'border-orange-500 bg-orange-500'
                : 'border-gray-300'
            }`}>
              {selectedPayment === 'pay-at-property' && <Check className="w-3 h-3 text-white" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="font-medium text-gray-900">Pay at Property</div>
                  <div className="text-sm text-gray-600">Payment during check-in</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">
              {selectedPayment === 'online-payment' ? 'Secure Payment' : 'Booking Guarantee'}
            </h4>
            <ul className="text-blue-700 text-sm space-y-1">
              {selectedPayment === 'online-payment' ? (
                <>
                  <li>• 256-bit SSL encryption</li>
                  <li>• PCI DSS compliant payment processing</li>
                  <li>• Instant booking confirmation</li>
                </>
              ) : (
                <>
                  <li>• Instant booking confirmation</li>
                  <li>• Payment at property during check-in</li>
                  <li>• Valid ID required at check-in</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={handleConfirmBooking}
          disabled={!bookingDetails.bookingId || loading}
          className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : !bookingDetails.bookingId ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Booking...
            </>
          ) : (
            <>
              <Shield className="w-5 h-5" />
              {selectedPayment === 'online-payment' ? 'Proceed to Payment' : 'Confirm Booking'}
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        <button
          type="button"
          onClick={prevStep}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Support */}
      <div className="text-center text-sm text-gray-500">
        Need help? Contact{' '}
        <a href="mailto:info@wavescation.com" className="text-orange-600 hover:text-orange-700 font-medium">
          info@wavescation.com
        </a>
      </div>
    </div>
  );
};

export default CheckoutPayment;