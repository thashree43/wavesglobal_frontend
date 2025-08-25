import React, { useState } from "react";
import AuthModal from "../Components/ReusableComponent/AuthModal";
import OtpModal from "../Components/ReusableComponent/OtpModal";
import logo from '../assets/Waves Globel logo- white.svg'

const Navbar = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleRegisterSuccess = (email) => {
    setRegisteredEmail(email);
    setShowOtpModal(true);
  };

  const handleOtpModalClose = () => {
    setShowOtpModal(false);
    setRegisteredEmail("");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-all duration-200 group-hover:scale-105 bg-orange-600">
              <img src={logo} alt="Wavescation Logo" className="h-20 w-auto" />
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-bold text-black tracking-tight">
                Wavescation
              </div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            {['Home', 'Properties', 'Services', 'About', 'Contact'].map((item) => (
              <a 
                key={item}
                href="#" 
                className="relative group px-3 py-2 text-black font-medium text-base transition-all duration-200 hover:text-orange-600 rounded-lg hover:bg-gray-50"
              >
                <span className="relative z-10">{item}</span>
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-orange-600 group-hover:w-full group-hover:left-0 transition-all duration-200 rounded-full"></span>
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
          <button
  onClick={() => setShowAuthModal(true)}
  className="inline-flex items-center justify-center gap-2 px-6 py-3 !rounded-full font-semibold text-white bg-orange-600 hover:bg-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
>
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
  <span>Sign In</span>
</button>



            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200" 
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-2 mt-4">
              {['Home', 'Properties', 'Services', 'About', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href="#" 
                  className="px-4 py-3 text-black font-medium rounded-xl hover:text-orange-600 hover:bg-gray-50 transition-all duration-200"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <AuthModal
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onRegisterSuccess={handleRegisterSuccess}
      />

      <OtpModal
        show={showOtpModal}
        onClose={handleOtpModalClose}
        email={registeredEmail}
      />
    </>
  );
};

export default Navbar;