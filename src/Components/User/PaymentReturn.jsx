import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import { baseurl } from '../../Base/Base';

const PaymentReturn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('Processing your payment...');
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

        // User cancelled payment
        if (!id && !resourcePath) {
          console.log('❌ Payment cancelled by user');
          setError('Payment was cancelled. Redirecting...');
          setStatus('cancelled');
          setTimeout(() => {
            navigate(`/checkout?bookingId=${bookingId}&propertyId=${propertyId}`, { replace: true });
          }, 3000);
          return;
        }

        // Verify payment with backend
        console.log('🔍 Verifying payment...');
        setMessage('Verifying payment with gateway...');
        
        const token = localStorage.getItem('authToken');
        const response = await axios.get(
          `${baseurl}user/verify-payment`,
          {
            params: { resourcePath, id, bookingId },
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        console.log('📥 Verify response:', response.data);

        if (response.data.success && response.data.confirmed) {
          console.log('✅ Payment CONFIRMED!');
          setStatus('success');
          setMessage('Payment successful! Redirecting...');
          
          // Clear session
          sessionStorage.removeItem('currentBookingId');
          sessionStorage.removeItem('currentPropertyId');
          sessionStorage.removeItem('checkoutCreatedAt');
          
          // Redirect to success
          setTimeout(() => {
            navigate(
              `/checkout?bookingId=${bookingId}&propertyId=${propertyId}&paymentSuccess=true`,
              { replace: true }
            );
          }, 2000);
          
        } else if (response.data.pending) {
          console.log('⏳ Payment pending');
          setStatus('pending');
          setMessage('Payment is being processed. Please wait...');
          
          // Poll for status
          setTimeout(() => pollPaymentStatus(bookingId, propertyId), 3000);
          
        } else if (response.data.failed) {
          console.log('❌ Payment FAILED');
          setError(response.data.message || 'Payment failed');
          setStatus('error');
          
          setTimeout(() => {
            navigate(`/checkout?bookingId=${bookingId}&propertyId=${propertyId}`, { replace: true });
          }, 4000);
        }
        
      } catch (err) {
        console.error('❌ Verification error:', err);
        setError(err.response?.data?.message || 'Failed to verify payment');
        setStatus('error');
        
        setTimeout(() => {
          const bookingId = sessionStorage.getItem('currentBookingId');
          const propertyId = sessionStorage.getItem('currentPropertyId');
          if (bookingId && propertyId) {
            navigate(`/checkout?bookingId=${bookingId}&propertyId=${propertyId}`, { replace: true });
          } else {
            navigate('/properties', { replace: true });
          }
        }, 4000);
      }
    };

    verifyPayment();
  }, []);

  const pollPaymentStatus = async (bookingId, propertyId, attempts = 0) => {
    const maxAttempts = 30; // 90 seconds total
    
    if (attempts >= maxAttempts) {
      setError('Payment verification timeout. Please check your bookings or contact support.');
      setStatus('error');
      setTimeout(() => navigate('/my-bookings', { replace: true }), 5000);
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(
        `${baseurl}user/payment-status/${bookingId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(`🔍 Poll ${attempts + 1}/${maxAttempts}:`, response.data.paymentStatus);

      if (response.data.confirmed) {
        console.log('✅ Payment confirmed via polling!');
        setStatus('success');
        setMessage('Payment confirmed! Redirecting...');
        
        sessionStorage.removeItem('currentBookingId');
        sessionStorage.removeItem('currentPropertyId');
        sessionStorage.removeItem('checkoutCreatedAt');
        
        setTimeout(() => {
          navigate(
            `/checkout?bookingId=${bookingId}&propertyId=${propertyId}&paymentSuccess=true`,
            { replace: true }
          );
        }, 2000);
        
      } else if (response.data.paymentStatus === 'failed') {
        setError('Payment failed');
        setStatus('error');
        setTimeout(() => {
          navigate(`/checkout?bookingId=${bookingId}&propertyId=${propertyId}`, { replace: true });
        }, 3000);
        
      } else {
        // Continue polling
        setTimeout(() => pollPaymentStatus(bookingId, propertyId, attempts + 1), 3000);
      }
      
    } catch (err) {
      console.error('Polling error:', err);
      setTimeout(() => pollPaymentStatus(bookingId, propertyId, attempts + 1), 3000);
    }
  };

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
            <span>Redirecting...</span>
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
            <span>Redirecting...</span>
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
              If payment was deducted, it will be refunded within 5-7 business days.
            </p>
          </div>
          <p className="text-sm text-gray-500">Redirecting...</p>
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
          <p className="text-gray-600 mb-4">{message}</p>
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-xs text-yellow-800">
              This can take up to 2 minutes. Please don't close this window.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment</h2>
        <p className="text-gray-600 mb-4">{message}</p>
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-xs text-yellow-800">
            <strong>Please wait:</strong> Do not close this window or press back.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentReturn;