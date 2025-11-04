import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';

const baseurl = 'https://wavesgobal-backend.onrender.com/api/';

const PaymentReturn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('Verifying your payment...');
  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    const verifyPayment = async () => {
      try {
        const resourcePath = searchParams.get('resourcePath');
        const id = searchParams.get('id');
        
        console.log('🔍 Payment return:', { resourcePath, id });

        // Get booking context
        const bookingId = sessionStorage.getItem('currentBookingId');
        const propertyId = sessionStorage.getItem('currentPropertyId');
        
        if (!bookingId) {
          setError('Session expired. Please start a new booking.');
          setStatus('error');
          setTimeout(() => navigate('/properties', { replace: true }), 3000);
          return;
        }

        // User cancelled payment (closed widget without submitting)
        if (!id && !resourcePath) {
          console.log('❌ Payment cancelled by user');
          setError('Payment was cancelled. Redirecting...');
          setStatus('cancelled');
          setTimeout(() => {
            navigate(`/checkout?bookingId=${bookingId}&propertyId=${propertyId}`, { replace: true });
          }, 3000);
          return;
        }

        // ============================================
        // CALL VERIFY PAYMENT API (Status API)
        // ============================================
        console.log('🔍 Verifying payment via Status API...');
        setMessage('Verifying payment with gateway...');
        
        const token = localStorage.getItem('authToken');
        
        try {
          const response = await axios.get(
            `${baseurl}user/verify-payment`,
            {
              params: { resourcePath, id, bookingId },
              headers: { Authorization: `Bearer ${token}` },
              timeout: 20000 // Increased timeout for Status API call
            }
          );

          console.log('📥 Verify response:', response.data);

          // ✅ Payment Confirmed
          if (response.data.success && response.data.confirmed) {
            console.log('✅ Payment confirmed!');
            handleSuccess(bookingId, propertyId);
            return;
          }

          // ❌ Payment Failed
          if (response.data.failed) {
            console.log('❌ Payment failed');
            handleFailure(response.data.message, bookingId, propertyId);
            return;
          }

          // ⚠️ Payment Cancelled
          if (response.data.cancelled) {
            console.log('⚠️ Payment cancelled');
            setError('Payment was not completed. Redirecting...');
            setStatus('cancelled');
            setTimeout(() => {
              navigate(`/checkout?bookingId=${bookingId}&propertyId=${propertyId}`, { replace: true });
            }, 3000);
            return;
          }

          // ⏳ Still Pending (rare with Status API)
          if (response.data.pending) {
            console.log('⏳ Payment still pending, starting fallback polling...');
            startFallbackPolling(bookingId, propertyId);
            return;
          }

          // Unknown status
          console.error('⚠️ Unknown response status:', response.data);
          setError('Unable to verify payment status. Please check "My Bookings".');
          setStatus('error');
          setTimeout(() => navigate('/profile', { replace: true }), 4000);

        } catch (verifyError) {
          console.error('❌ Verification API error:', verifyError.message);
          
          // Network error or timeout - start fallback polling
          if (verifyError.code === 'ECONNABORTED' || verifyError.message.includes('timeout')) {
            console.log('⏰ Verification timeout, starting fallback polling...');
            startFallbackPolling(bookingId, propertyId);
          } else {
            setError('Unable to verify payment. Please check "My Bookings".');
            setStatus('error');
            setTimeout(() => navigate('/profile', { replace: true }), 4000);
          }
        }
        
      } catch (err) {
        console.error('❌ Verification error:', err);
        setError('Payment verification failed. Please check "My Bookings".');
        setStatus('error');
        setTimeout(() => navigate('/profile', { replace: true }), 4000);
      }
    };

    verifyPayment();
  }, []);

  // Fallback polling (only if Status API fails or is slow)
  const startFallbackPolling = (bookingId, propertyId) => {
    console.log('🔄 Starting fallback polling...');
    setStatus('pending');
    setMessage('Payment is processing. Please wait...');
    pollPaymentStatus(bookingId, propertyId, 0);
  };

  const pollPaymentStatus = async (bookingId, propertyId, attempts) => {
    const maxAttempts = 10; // Reduced from 40 since Status API should have worked
    
    if (attempts >= maxAttempts) {
      console.log('⏰ Polling timeout');
      setError('Payment verification is taking too long. Please check "My Bookings" in a moment.');
      setStatus('error');
      setTimeout(() => navigate('/profile', { replace: true }), 3000);
      return;
    }
  
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(
        `${baseurl}user/payment-status/${bookingId}`,
        { 
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000
        }
      );
  
      console.log(`🔍 Poll ${attempts + 1}/${maxAttempts}:`, response.data.paymentStatus);
  
      if (response.data.confirmed) {
        handleSuccess(bookingId, propertyId);
      } else if (response.data.failed) {
        handleFailure('Payment was declined', bookingId, propertyId);
      } else {
        // Continue polling every 3 seconds
        setTimeout(() => pollPaymentStatus(bookingId, propertyId, attempts + 1), 3000);
      }
      
    } catch (err) {
      console.error('Poll error:', err.message);
      // Continue polling even on error
      setTimeout(() => pollPaymentStatus(bookingId, propertyId, attempts + 1), 3000);
    }
  };

  const handleSuccess = (bookingId, propertyId) => {
    setStatus('success');
    setMessage('Payment confirmed! Redirecting...');
    
    // Clear session
    sessionStorage.removeItem('currentBookingId');
    sessionStorage.removeItem('currentPropertyId');
    sessionStorage.removeItem('checkoutCreatedAt');
    
    // Redirect to success page
    setTimeout(() => {
      navigate(
        `/checkout?bookingId=${bookingId}&propertyId=${propertyId}&paymentSuccess=true`,
        { replace: true }
      );
    }, 2000);
  };

  const handleFailure = (errorMessage, bookingId, propertyId) => {
    setError(errorMessage || 'Payment failed');
    setStatus('error');
    
    setTimeout(() => {
      navigate(`/checkout?bookingId=${bookingId}&propertyId=${propertyId}`, { replace: true });
    }, 4000);
  };

  // ============================================
  // UI STATES
  // ============================================

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">{message}</p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Redirecting to confirmation...</span>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'cancelled') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Cancelled</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Returning to checkout...</span>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Issue</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-800">
              💡 <strong>What to do:</strong> Check your "My Bookings" page. If payment was deducted, it will be refunded within 5-7 business days.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Redirecting...</span>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment</h2>
          <p className="text-gray-600 mb-6">{message}</p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-xs text-yellow-800">
              <strong>Please wait:</strong> Payment verification in progress. This usually takes 5-10 seconds.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Default: Verifying
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-xs text-blue-800">
            <strong>Please wait:</strong> Do not close this window or press back.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentReturn;