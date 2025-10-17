import React from 'react';
import { ArrowRight, User, CreditCard, Check } from 'lucide-react';
import axios from 'axios';
import { baseurl } from '../Base/Base';

const CheckoutDetails = ({ formData, handleInputChange, nextStep, validateStep }) => {
  const token = localStorage.getItem('authToken');


  const urlParams = new URLSearchParams(window.location.search);
  const bookingId = urlParams.get("bookingId");
  const sendDetails = async () => {
    try {
      const response = await axios.put(
        `${baseurl}user/update-details`,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          bookingId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        return true; 
      } else {
        return false; 
      }
    } catch (error) {
      console.error(error);
      return false; 
    }
  };
  
  const handleNext = async () => {
    const success = await sendDetails();
    if (success) {
      nextStep(); 
    } else {
      console.log("Failed to update details. Please try again.");
    }
  };
  

  return (
    <>
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-8 relative">
          <div className="absolute top-5 left-8 right-8 h-0.5 bg-gray-200"></div>
          <div className="flex flex-col items-center relative z-10 transition-all duration-300 text-orange-500">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 bg-orange-500 text-white shadow-lg">
              <User className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Details</span>
          </div>
          <div className="flex flex-col items-center relative z-10 transition-all duration-300 text-gray-400">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 bg-gray-200 text-gray-400">
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
        Guest Information
        <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
      </h2>
      
      <div className="space-y-6 animate-fadeIn">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 hover:border-orange-300 hover:shadow-md bg-gray-50 focus:bg-white text-gray-900"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 hover:border-orange-300 hover:shadow-md bg-gray-50 focus:bg-white text-gray-900"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Phone Number/Whatsapp Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 hover:border-orange-300 hover:shadow-md bg-gray-50 focus:bg-white text-gray-900"
          />
        </div>
        
        <button 
          onClick={handleNext}
          disabled={!validateStep(1)}
          className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Continue to Payment 
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

export default CheckoutDetails;
