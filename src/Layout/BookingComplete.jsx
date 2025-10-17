import React, { useState, useEffect } from 'react';
import { Check, Calendar, MapPin, Users, Mail, Phone, FileText, Share2, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CheckoutComplete = ({ formData, bookingDetails }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [animateCheck, setAnimateCheck] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setAnimateCheck(true), 300);
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

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

  const handleDownload = () => {
    navigate('/profile') 
 };

  const handleShare = () => {
    alert('Sharing booking details...');
  };

  const handleBackHome = () => {
    navigate('/') 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: ['#ff6b35', '#f7931e', '#4ecdc4', '#45b7d1', '#f9ca24'][Math.floor(Math.random() * 5)]
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fadeInDown">
            <div className="relative inline-block mb-6">
              <div className={`w-32 h-32 mx-auto bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-1000 ${animateCheck ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
                <Check className="w-16 h-16 text-white animate-checkmark" strokeWidth={3} />
              </div>
              <div className="absolute -inset-4 bg-green-400 rounded-full opacity-20 animate-ping"></div>
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-4 animate-slideUp">
              Booking <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 animate-shimmer">Confirmed!</span>
            </h1>
            <p className="text-xl text-gray-600 animate-slideUp animation-delay-200">
              Your reservation has been successfully confirmed
            </p>
            <p className="text-sm text-gray-500 mt-2 animate-slideUp animation-delay-300">
              Booking ID: #{bookingDetails.bookingId || 'WVS' + Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 animate-fadeInLeft">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 relative inline-block">
                  Booking Details
                  <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Home className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{bookingDetails.roomType}</h3>
                      <p className="text-gray-600 text-sm">Property Name</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Check-in</p>
                        <p className="font-bold text-gray-900">{bookingDetails.checkIn}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Check-out</p>
                        <p className="font-bold text-gray-900">{bookingDetails.checkOut}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Guests</p>
                      <p className="font-bold text-gray-900">{bookingDetails.guests} {bookingDetails.guests === 1 ? 'Guest' : 'Guests'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Duration</p>
                      <p className="font-bold text-gray-900">{bookingDetails.units} {bookingDetails.units === 1 ? getPeriodLabel() : getPeriodLabelPlural()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 animate-fadeInLeft animation-delay-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 relative inline-block">
                  Guest Information
                  <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                      {formData.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="font-semibold text-gray-900">{formData.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">{formData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold text-gray-900">{formData.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-6 animate-fadeInRight">
                <h2 className="text-xl font-bold text-gray-900 mb-6 relative">
                  Payment Summary
                  <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">Subtotal</span>
                    <span className="font-semibold text-gray-900">AED {bookingDetails.subtotal.toLocaleString()}</span>
                  </div>
                  {bookingDetails.cleaningFee > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 text-sm">Cleaning Fee</span>
                      <span className="font-semibold text-gray-900">AED {bookingDetails.cleaningFee.toLocaleString()}</span>
                    </div>
                  )}
                  {bookingDetails.serviceFee > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 text-sm">Service Fee</span>
                      <span className="font-semibold text-gray-900">AED {bookingDetails.serviceFee.toLocaleString()}</span>
                    </div>
                  )}
                  {bookingDetails.cityTax > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 text-sm">City Tax</span>
                      <span className="font-semibold text-gray-900">AED {bookingDetails.cityTax.toLocaleString()}</span>
                    </div>
                  )}
                  {bookingDetails.vat > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 text-sm">VAT/GST</span>
                      <span className="font-semibold text-gray-900">AED {bookingDetails.vat.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center py-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl px-4 mb-6">
                  <span className="text-lg font-bold text-gray-900">Total Paid</span>
                  <span className="text-2xl font-bold text-green-600">AED {bookingDetails.total.toLocaleString()}</span>
                </div>

                {bookingDetails.propertyImage && (
                  <div className="mb-6 rounded-xl overflow-hidden shadow-md">
                    <img 
                      src={bookingDetails.propertyImage}
                      alt={bookingDetails.roomType}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <button 
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <FileText className="w-5 h-5" />
                     View Details
                  </button>
{/* 
                  <button 
                    onClick={handleShare}
                    className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold transition-all duration-300 border-2 border-gray-200 hover:border-gray-300"
                  >
                    <Share2 className="w-5 h-5" />
                    Share Booking
                  </button> */}

                  <button 
                    onClick={handleBackHome}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <Home className="w-5 h-5" />
                    Back to Home
                  </button>
                </div>

                <div className="mt-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200">
                  <p className="text-sm text-center text-yellow-800 font-medium">
                    📧 Confirmation email sent to<br />{formData.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
        className="rounded-2xl shadow-xl p-8 text-white text-center animate-fadeInUp"
        style={{ backgroundColor: 'rgb(231, 121, 0)' }}
      >
        <h3 className="text-2xl font-bold mb-3">Thank You for Choosing Wavescation! 🎉</h3>
        <p className="text-blue-100 text-lg">
          We're excited to host you. If you have any questions, our support team is here to help 24/7.
        </p>
      </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes checkmark {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes confettiFall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }

        .animate-checkmark {
          stroke-dasharray: 100;
          animation: checkmark 0.8s ease-out forwards;
          animation-delay: 0.5s;
        }

        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: 1000;
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10px;
          animation: confettiFall 3s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default CheckoutComplete;