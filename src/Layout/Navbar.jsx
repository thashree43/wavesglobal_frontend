import React, { useState } from "react";
import AuthModal from "../Components/ReusableComponent/AuthModal";
import OtpModal from "../Components/ReusableComponent/OtpModal";

const Navbar = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-lg shadow-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent animate-pulse">
            Waves Global
          </div>
          <nav className="hidden md:flex space-x-8 text-white">
            <a href="#" className="relative group">
              <span className="hover:text-amber-400 transition-colors duration-300">Home</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="relative group">
              <span className="hover:text-amber-400 transition-colors duration-300">Properties</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="relative group">
              <span className="hover:text-amber-400 transition-colors duration-300">About</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="relative group">
              <span className="hover:text-amber-400 transition-colors duration-300">Contact</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>
          <button
            onClick={() => setShowAuthModal(true)}
            className="relative overflow-hidden px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 hover:from-yellow-500 hover:to-amber-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
          >
            <span className="relative z-10">Sign In</span>
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onRegisterSuccess={() => {
          setShowAuthModal(false);
          setShowOtpModal(true);
        }}
      />

      {/* OTP Modal */}
      <OtpModal
        show={showOtpModal}
        onClose={() => setShowOtpModal(false)}
      />
    </>
  );
};

export default Navbar;
