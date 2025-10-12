import axios from "axios";
import React, { useState } from "react";
import { baseurl } from "../../Base/Base";
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import ForgotPasswordModal from './Forgotmodal';
import { useAuth } from "../../Context/Auth";

const AuthModal = ({ show, onClose }) => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

  if (!show) return null;

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setRegEmail("");
    setPhone("");
    setRegPassword("");
    setConfirmPassword("");
    setOtp("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${baseurl}User/login`,
        { email, password },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      console.log("Login Success:", res.data);
      
      if (res.data.success && res.data.user && res.data.token) {
        login(res.data.user, res.data.token);
        resetForm();
        onClose();
        toast.success("Login successful!");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (regPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post(
        `${baseurl}User/register`,
        {
          username,
          email: regEmail,
          phone,
          password: regPassword,
        },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log("Registration Success:", res.data);
      
      if (res.data.success) {
        setPendingEmail(regEmail);
        setShowOtpVerification(true);
        toast.success("OTP sent to your email!");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${baseurl}User/verify-otp`,
        {
          email: pendingEmail,
          otp: otp
        },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log("OTP Verification Success:", res.data);
      
      if (res.data.success && res.data.user && res.data.token) {
        login(res.data.user, res.data.token);
        resetForm();
        setShowOtpVerification(false);
        setPendingEmail("");
        onClose();
        toast.success("Account verified successfully!");
      } else {
        toast.error("Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Invalid OTP");
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await axios.post(
        `${baseurl}User/resend-otp`,
        { email: pendingEmail },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (res.data.success) {
        toast.success("New OTP sent to your email!");
      } else {
        toast.error("Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${baseurl}User/google-auth`,
        { 
          credential: credentialResponse.credential 
        },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Google Auth Success:", res.data);
      
      if (res.data.success && res.data.user && res.data.token) {
        login(res.data.user, res.data.token);
        resetForm();
        onClose();
        toast.success("Login successful!");
      } else {
        toast.error("Authentication failed. Please try again.");
      }
    } catch (error) {
      console.error("Google Auth Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Google authentication failed");
    }
  };

  const handleGoogleError = () => {
    console.error("Google Auth Error");
    toast.error("Google authentication failed");
  };

  const handleModalClose = () => {
    resetForm();
    setIsLogin(true);
    setShowOtpVerification(false);
    setPendingEmail("");
    onClose();
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleForgotPasswordClose = () => {
    setShowForgotPassword(false);
  };

  const handleBackFromOtp = () => {
    setShowOtpVerification(false);
    setPendingEmail("");
    setOtp("");
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl max-w-sm w-full shadow-xl border border-gray-100 overflow-hidden">
          
          <div className="relative px-6 py-6" style={{ backgroundColor: 'rgb(248, 252, 255)' }}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-black mb-1">
                  {showOtpVerification ? 'Verify OTP' : isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-600 text-xs">
                  {showOtpVerification 
                    ? `Enter the OTP sent to ${pendingEmail}`
                    : isLogin ? 'Sign in to your account' : 'Join Waves Global'}
                </p>
              </div>
              <button 
                onClick={handleModalClose}
                className="text-gray-400 hover:text-black text-xl w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all duration-200"
              >
                ×
              </button>
            </div>

            {!showOtpVerification && (
              <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-100">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-all duration-200 ${
                    isLogin 
                      ? 'bg-orange-500 text-white shadow-sm' 
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                  style={isLogin ? {background: `linear-gradient(to right, rgb(231, 121, 0), rgb(250, 153, 56))`} : {}}>
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-all duration-200 ${
                    !isLogin 
                      ? 'bg-orange-500 text-white shadow-sm' 
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                  style={!isLogin ? {background: `linear-gradient(to right, rgb(231, 121, 0), rgb(250, 153, 56))`} : {}}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
          
          <div className="px-6 py-4">
            {showOtpVerification ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-black mb-1">Enter OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm text-center tracking-widest"
                    style={{ backgroundColor: 'rgb(247, 247, 247)' }}
                    placeholder="000000"
                    required
                  />
                </div>

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="w-full py-3 text-white rounded-full font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-sm"
                  style={{background: `linear-gradient(to right, rgb(231, 121, 0), rgb(250, 153, 56))`}}
                >
                  Verify OTP
                </button>

                <div className="text-center space-y-2">
                  <button 
                    type="button" 
                    onClick={handleResendOtp}
                    className="text-xs font-medium transition-colors duration-200 hover:underline"
                    style={{ color: 'rgb(230, 116, 19)' }}
                  >
                    Resend OTP
                  </button>
                  <br />
                  <button 
                    type="button" 
                    onClick={handleBackFromOtp}
                    className="text-xs font-medium text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    Back to Registration
                  </button>
                </div>
              </div>
            ) : isLogin ? (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-black mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm"
                      style={{ backgroundColor: 'rgb(247, 247, 247)' }}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-black mb-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm"
                      style={{ backgroundColor: 'rgb(247, 247, 247)' }}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>
                
                <div className="text-right">
                  <button 
                    type="button" 
                    onClick={handleForgotPasswordClick}
                    className="text-xs font-medium transition-colors duration-200 hover:underline"
                    style={{ color: 'rgb(230, 116, 19)' }}
                  >
                    Forgot password?
                  </button>
                </div>
                
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full py-3 text-white rounded-full font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-sm"
                  style={{background: `linear-gradient(to right, rgb(231, 121, 0), rgb(250, 153, 56))`}}
                >
                  Sign In to Your Account
                </button>
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-white text-gray-500 font-medium">Or continue with</span>
                  </div>
                </div>
                
                <div className="w-full">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    theme="outline"
                    size="large"
                    width="100%"
                    text="signin_with"
                    shape="rectangular"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-black mb-1">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm"
                      style={{ backgroundColor: 'rgb(247, 247, 247)' }}
                      placeholder="Username"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-black mb-1">Phone</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm"
                      style={{ backgroundColor: 'rgb(247, 247, 247)' }}
                      placeholder="Phone"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-black mb-1">Email Address</label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm"
                    style={{ backgroundColor: 'rgb(247, 247, 247)' }}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-black mb-1">Password</label>
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm"
                      style={{ backgroundColor: 'rgb(247, 247, 247)' }}
                      placeholder="Password"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-black mb-1">Confirm</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm"
                      style={{ backgroundColor: 'rgb(247, 247, 247)' }}
                      placeholder="Confirm"
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={handleRegister}
                  className="w-full py-3 text-white rounded-full font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-sm"
                  style={{background: `linear-gradient(to right, rgb(231, 121, 0), rgb(250, 153, 56))`}}
                >
                  Create Your Account
                </button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-white text-gray-500 font-medium">Or continue with</span>
                  </div>
                </div>
                
                <div className="w-full">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    theme="outline"
                    size="large"
                    width="100%"
                    text="signup_with"
                    shape="rectangular"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="px-6 pb-4">
            <div className="text-center">
              <div className="text-xs text-gray-500 leading-relaxed">
                By continuing, you agree to our{' '}
                <button className="font-medium hover:underline" style={{ color: 'rgb(230, 116, 19)' }}>
                  Terms of Service
                </button>
                {' '}and{' '}
                <button className="font-medium hover:underline" style={{ color: 'rgb(230, 116, 19)' }}>
                  Privacy Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ForgotPasswordModal
        show={showForgotPassword}
        onClose={handleForgotPasswordClose}
      />
    </>
  );
};

export default AuthModal;