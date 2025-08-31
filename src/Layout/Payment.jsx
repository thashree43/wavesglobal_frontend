import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, User, CreditCard, Check } from 'lucide-react';

const CheckoutPayment = ({ formData, handleInputChange, nextStep, prevStep, validateStep }) => {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async (amount = 100000) => {
    setLoading(true);
    
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    const options = {
      key: 'rzp_test_1234567890',
      amount: amount,
      currency: 'AED',
      name: 'Dubai Store',
      description: 'Product Purchase',
      image: '/logo.png',
      order_id: '',
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        nextStep();
        setLoading(false);
      },
      prefill: {
        name: formData.fullName || '',
        email: formData.email || '',
        contact: formData.phone || ''
      },
      notes: {
        address: formData.address || ''
      },
      theme: {
        color: '#e77900'
      },
      modal: {
        ondismiss: function() {
          setLoading(false);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      alert(`Payment Failed: ${response.error.description}`);
      setLoading(false);
    });
    
    rzp.open();
  };

  return (
    <>
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-8 relative">
          <div className="absolute top-5 left-8 right-8 h-0.5 bg-gray-200"></div>
          <div className="absolute top-5 left-8 w-8 h-0.5 bg-orange-500 transition-all duration-500"></div>
          
          <div className="flex flex-col items-center relative z-10 transition-all duration-300 text-orange-500">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 bg-orange-500 text-white shadow-lg">
              <User className="w-5 h-5" />
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
            <span className="text-sm font-medium">Confirm</span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-8 relative">
        Payment Information
        <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
      </h2>

      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Secure Payment with Razorpay</h3>
        <p className="text-gray-600 text-sm mb-6">Complete your purchase securely through Razorpay payment gateway.</p>
        
        <button 
          onClick={() => handleRazorpayPayment()}
          disabled={loading}
          className="w-full py-4 px-6 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          style={{ 
            background: 'linear-gradient(to right, rgb(231, 121, 0), rgb(250, 153, 56))',
          }}
        >
          {loading ? 'Processing...' : 'Pay AED 1,000 with Razorpay'}
        </button>
      </div>
        
      <div className="flex gap-4">
        <button 
          onClick={prevStep}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button 
            onClick={nextStep}
            disabled={!validateStep(2)}   // ⬅️ this line can crash if validateStep isn't passed
            className="flex items-center justify-center gap-2 flex-1 py-4 px-6 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            style={{ 
              background: 'linear-gradient(to right, rgb(231, 121, 0), rgb(250, 153, 56))',
            }}
          >
            Continue to Confirm 
            <ArrowRight className="w-5 h-5" />
          </button>

      </div>
    </>
  );
};

export default CheckoutPayment;