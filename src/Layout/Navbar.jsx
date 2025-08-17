import React, { useState } from "react";

const AuthModal = ({ show, onClose, onRegisterSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin) {
      onRegisterSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button 
            onClick={onClose}
            className="text-black hover:text-orange-500 text-2xl font-light transition-colors duration-300"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-black mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-300 bg-gray-50"
                required
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-300 bg-gray-50"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-300 bg-gray-50"
              required
            />
          </div>
          
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-orange-500 text-white rounded-2xl font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-[1.02]"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-500 hover:text-orange-600 transition-colors duration-300 font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

const OtpModal = ({ show, onClose }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  if (!show) return null;

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Verify Your Email</h2>
          <button 
            onClick={onClose}
            className="text-black hover:text-orange-500 text-2xl font-light transition-colors duration-300"
          >
            ×
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">Enter the 6-digit code sent to your email</p>
        
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className="w-12 h-12 text-center text-lg font-semibold border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-300 bg-gray-50"
              maxLength={1}
            />
          ))}
        </div>
        
        <button
          onClick={() => {}}
          className="w-full py-3 bg-orange-500 text-white rounded-2xl font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-[1.02]"
        >
          Verify Code
        </button>
        
        <div className="mt-4 text-center">
          <button className="text-orange-500 hover:text-orange-600 transition-colors duration-300 font-medium">
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-3xl font-bold text-orange-500">
            Waves Global
          </div>
          <nav className="hidden md:flex space-x-8 text-black">
            <a href="#" className="relative group">
              <span className="hover:text-orange-500 transition-colors duration-300">Home</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="relative group">
              <span className="hover:text-orange-500 transition-colors duration-300">Properties</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="relative group">
              <span className="hover:text-orange-500 transition-colors duration-300">About</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="relative group">
              <span className="hover:text-orange-500 transition-colors duration-300">Contact</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-6 py-2 rounded-2xl font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Sign In
          </button>
        </div>
      </header>

      <AuthModal
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onRegisterSuccess={() => {
          setShowAuthModal(false);
          setShowOtpModal(true);
        }}
      />

      <OtpModal
        show={showOtpModal}
        onClose={() => setShowOtpModal(false)}
      />
    </>
  );
};

export default Navbar;