import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../../Base/Base";
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      try {
        await axios.get(`${baseurl}User/validate-reset-token/${token}`);
        setIsValidToken(true);
      } catch (error) {
        setIsValidToken(false);
        toast.error("Invalid or expired reset link");
      }
    };

    if (token) {
      validateToken();
    } else {
      setIsValidToken(false);
    }
  }, [token]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${baseurl}User/reset-password`,
        { token, password },
        { withCredentials: true }
      );

      console.log("Password reset success:", res.data);
      toast.success("Password reset successfully!");
      
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Reset Password Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  if (isValidToken === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full shadow-xl border border-gray-100 p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'rgb(230, 116, 19)' }}></div>
          <p className="text-gray-600">Validating reset link...</p>
        </div>
      </div>
    );
  }

  if (isValidToken === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full shadow-xl border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-black mb-2">Invalid Reset Link</h2>
          <p className="text-gray-600 text-sm mb-6">
            This password reset link is invalid or has expired. Please request a new one.
          </p>
          <button
            onClick={handleGoHome}
            className="w-full py-3 text-white rounded-full font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-sm"
            style={{background: `linear-gradient(to right, rgb(231, 121, 0), rgb(250, 153, 56))`}}
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-xl border border-gray-100 overflow-hidden">
        
        <div className="px-8 py-6" style={{ backgroundColor: 'rgb(248, 252, 255)' }}>
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-black mb-2">Reset Password</h2>
            <p className="text-gray-600 text-sm">Enter your new password below</p>
          </div>
        </div>
        
        <div className="px-8 py-6">
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                style={{ backgroundColor: 'rgb(247, 247, 247)' }}
                placeholder="Enter your new password"
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                style={{ backgroundColor: 'rgb(247, 247, 247)' }}
                placeholder="Confirm your new password"
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-white rounded-full font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              style={{background: `linear-gradient(to right, rgb(231, 121, 0), rgb(250, 153, 56))`}}
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>

        <div className="px-8 pb-6">
          <div className="text-center">
            <button 
              onClick={handleGoHome}
              className="text-sm font-medium transition-colors duration-200 hover:underline"
              style={{ color: 'rgb(230, 116, 19)' }}
            >
              Back to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;