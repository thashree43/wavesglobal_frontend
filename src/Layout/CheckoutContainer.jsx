
import React, { useState } from 'react';
import CheckoutDetails from './Chekout';
import CheckoutPayment from './Payment';

const CheckoutContainer = ({ bookingDetails }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep = (step) => {
    if (step === 1) {
      return formData.name && formData.email && formData.phone;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePaymentSuccess = () => {
    setCurrentStep(3);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
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

      {currentStep === 3 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-green-900 mb-2">Booking Confirmed!</h2>
          <p className="text-green-700">Check your email for confirmation details</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutContainer;
