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
  const [pollCount, setPollCount] = useState(0);
  const hasVerified = useRef(false);
  const pollingInterval = useRef(null);

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    const handlePaymentReturn = async () => {
      const resourcePath = searchParams.get('resourcePath');
      const id = searchParams.get('id');
      
      console.log('🔍 Payment return params:', { resourcePath, id });

      // ✅ CRITICAL: Check for AFS error in URL
      const resultIndicator = searchParams.get('resultIndicator');
      if (resultIndicator) {
        console.log('⚠️ Result indicator found:', resultIndicator);
      }

      // Get booking context
      const bookingId = sessionStorage.getItem('currentBookingId');
      const propertyId = sessionStorage.getItem('currentPropertyId');
      
      if (!bookingId) {
        setError('Booking session expired. Please start a new booking.');
        setStatus('error');
        setTimeout(() => {
          navigate('/properties', { replace: true });
        }, 3000);
        return;
      }

      // ✅ If no id or resourcePath, user likely cancelled or error occurred
      if (!id && !resourcePath) {
        console.log('❌ No payment ID - payment may have been cancelled');
        setError('Payment was not completed. Redirecting back to checkout...');
        setStatus('cancelled');
        setTimeout(() => {
          navigate(`/checkout?bookingId=${bookingId}&propertyId=${propertyId}`, { replace: true });
        }, 3000);
        return;
      }

      // ✅ Start polling immediately - don't verify first
      console.log('🔄 Starting payment status polling...');
      setStatus('polling');
      startPolling(bookingId, propertyId);
    };

    handlePaymentReturn();

    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, []);

  const startPolling = (bookingId, propertyId) => {
    console.log('🔄 Starting payment status polling...');
    
    let pollAttempts = 0;
    const maxPolls = 30; // Increased from 20 to 30 (90 seconds total)

    pollingInterval.current = setInterval(async () => {
      pollAttempts++;
      setPollCount(pollAttempts);
      
      console.log(`🔍 Polling attempt ${pollAttempts}/${maxPolls}`);

      try {
        const token = localStorage.getItem('authToken');
        
        const response = await axios.get(
          `${baseurl}user/payment-status/${bookingId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        console.log('📥 Poll response:', response.data);

        if (response.data.confirmed) {
          console.log('✅ Payment confirmed via polling!');
          clearInterval(pollingInterval.current);
          setStatus('success');
          
          setTimeout(() => {
            navigate(
              `/checkout?bookingId=${bookingId}&propertyId=${propertyId}&paymentSuccess=true`, 
              { replace: true }
            );
          }, 1500);
          
        } else if (response.data.paymentStatus === 'failed') {
          console.log('❌ Payment failed');
          clearInterval(pollingInterval.current);
          setError('Payment failed. Please try again with a different payment method.');
          setStatus('error');
          
          setTimeout(() => {
            navigate(`/checkout?bookingId=${bookingId}&propertyId=${propertyId}`, { replace: true });
          }, 4000);
          
        } else if (pollAttempts >= maxPolls) {
          console.log('⏰ Polling timeout');
          clearInterval(pollingInterval.current);
          setError('Payment confirmation is taking longer than expected. Please check your email or contact support.');
          setStatus('timeout');
          
          setTimeout(() => {
            navigate('/my-bookings', { replace: true });
          }, 5000);
        }
      } catch (err) {
        console.error('Polling error:', err);
        
        if (pollAttempts >= maxPolls) {
          clearInterval(pollingInterval.current);
          setError('Unable to confirm payment status. Please check your bookings or contact support.');
          setStatus('error');
          
          setTimeout(() => {
            navigate('/my-bookings', { replace: true });
          }, 5000);
        }
      }
    }, 3000); // Poll every 3 seconds
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">Your booking has been confirmed</p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Preparing your confirmation...</span>
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

  if (status === 'error' || status === 'timeout') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {status === 'timeout' ? 'Payment Verification Timeout' : 'Payment Issue'}
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          {status === 'timeout' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800">
                <strong>Don't worry!</strong> If your payment was successful, you'll receive a confirmation email shortly.
              </p>
            </div>
          )}
          <p className="text-sm text-gray-500">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Confirming Payment
        </h2>
        <p className="text-gray-600 mb-4">
          Waiting for payment confirmation from the gateway...
        </p>
        
        {pollCount > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full bg-orange-500 animate-pulse`}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              Checking status... ({pollCount}/30)
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(pollCount / 30) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-4">
              This usually takes 10-30 seconds
            </p>
          </div>
        )}
        
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-xs text-yellow-800">
            <strong>Important:</strong> Do not close this window or press the back button. We're waiting for confirmation from the payment gateway.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentReturn;