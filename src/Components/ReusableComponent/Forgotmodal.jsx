import React, { useState } from "react";
import axios from "axios";
import { baseurl } from "../../Base/Base";
import { toast } from 'react-toastify';

const ForgotPasswordModal = ({ show, onClose }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  if (!show) return null;

  const resetForm = () => {
    setEmail("");
    setIsEmailSent(false);
    setIsLoading(false);
  };

  const handleSendResetLink = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${baseurl}User/forgot-password`,
        { email },
        { withCredentials: true }
      );

      console.log("Reset link sent:", res.data);
      setIsEmailSent(true);
      toast.success("Reset link sent to your email!");
    } catch (error) {
      console.error("Forgot Password Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-xl border border-gray-100 overflow-hidden">
        
        <div className="relative px-6 py-6" style={{ backgroundColor: 'rgb(248, 252, 255)' }}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-black mb-1">
                {isEmailSent ? 'Check Your Email' : 'Forgot Password'}
              </h2>
              <p className="text-gray-600 text-xs">
                {isEmailSent 
                  ? 'We\'ve sent a reset link to your email' 
                  : 'Enter your email to reset your password'
                }
              </p>
            </div>
            <button 
              onClick={handleModalClose}
              className="text-gray-400 hover:text-black text-xl w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all duration-200"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="px-6 py-4">
          {!isEmailSent ? (
            <form onSubmit={handleSendResetLink} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-black mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm"
                  style={{ backgroundColor: 'rgb(247, 247, 247)' }}
                  placeholder="Enter your email address"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 text-white rounded-full font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                style={{background: `linear-gradient(to right, rgb(231, 121, 0), rgb(250, 153, 56))`}}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgb(248, 252, 255)' }}>
                <svg className="w-8 h-8" style={{ color: 'rgb(230, 116, 19)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-black mb-2">Email Sent Successfully!</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  We've sent a password reset link to <strong>{email}</strong>. 
                  Check your inbox and follow the instructions to reset your password.
                </p>
              </div>
              <button
                onClick={handleModalClose}
                className="w-full py-3 text-white rounded-full font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-sm"
                style={{background: `linear-gradient(to right, rgb(231, 121, 0), rgb(250, 153, 56))`}}
              >
                Done
              </button>
            </div>
          )}
        </div>

        {!isEmailSent && (
          <div className="px-6 pb-4">
            <div className="text-center">
              <button 
                onClick={handleModalClose}
                className="text-xs font-medium transition-colors duration-200 hover:underline"
                style={{ color: 'rgb(230, 116, 19)' }}
              >
                Back to Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;