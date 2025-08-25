import React, { useEffect, useState } from "react";
import AuthModal from "../Components/ReusableComponent/AuthModal";
import OtpModal from "../Components/ReusableComponent/OtpModal";
import logo from '../assets/logo.png'
import axios from 'axios'
import {baseurl} from "../Base/Base.js"
import { useNavigate ,Link} from 'react-router-dom';

const Navbar = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogged, setisLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const handleRegisterSuccess = (email) => {
    setRegisteredEmail(email);
    setShowOtpModal(true);
  };

  const getUser = async() => {
    try {
      const response = await axios.get(`${baseurl}User/getuser`, {
        withCredentials: true
      })
      if(response.data.user) {
        setisLogged(true);
        setUser(response.data.user);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleLoginSuccess = (userData) => {
    console.log("Navbar received user data:", userData);
    setisLogged(true);
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleLogout = async() => {
    try {
      await axios.post(`${baseurl}User/logout`, {}, {
        withCredentials: true
      });
      setisLogged(false);
      setUser(null);
      setShowProfileDropdown(false);
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    getUser()
  }, [])

  const handleOtpModalClose = () => {
    setShowOtpModal(false);
    setRegisteredEmail("");
  };

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div 
                onClick={handleLogoClick}
                className="cursor-pointer flex-shrink-0 flex items-center"
              >
                <img 
                  className="h-12 w-auto" 
                  src={logo} 
                  alt="Logo" 
                />
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200">
                Home
              </Link>
              <Link to="/property" className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200">
                Properties
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200">
                About
              </Link>
              <Link to="/contack" className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200">
                Contact
              </Link>
            </div>

            <div className="hidden lg:flex items-center">
              {!isLogged ? (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 !rounded-full font-semibold text-white bg-orange-600 hover:bg-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Sign In
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full font-semibold text-white bg-orange-600 hover:bg-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <div className="w-8 h-8 bg-white text-orange-600 rounded-full flex items-center justify-center font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    {user?.name}
                  </button>

                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                      </div>
                      <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200">
                        Profile
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="lg:hidden flex items-center space-x-3">
              {!isLogged && (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-full transition-all duration-200 shadow-md"
                >
                  Sign In
                </button>
              )}
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200"
              >
                <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {isMenuOpen && (
  <div className="lg:hidden border-t border-gray-100">
    <div className="px-4 pt-4 pb-6 space-y-2">
      {[
        { name: 'Home', href: '/' },
        { name: 'Properties', href: '/property' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' }
      ].map((item) => (
        <Link
          key={item.name}
          to={item.href}
          onClick={handleMenuItemClick}
          className="block px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg font-medium transition-all duration-200"
        >
          {item.name}
        </Link>
      ))}

      {isLogged && (
        <div className="border-t border-gray-100 mt-4 pt-4">
          <div className="px-4 py-3 bg-gray-50 rounded-lg mb-3">
            <p className="font-semibold text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
          
          <Link
            to="/profile"
            onClick={handleMenuItemClick}
            className="block w-full text-left px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg font-medium transition-all duration-200"
          >
            Profile
          </Link>

          <Link
            to="/"
            onClick={handleLogout}
            className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-all duration-200"
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  </div>
)}

        </div>
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onRegisterSuccess={handleRegisterSuccess}
        onLoginSuccess={handleLoginSuccess}
      />

      <OtpModal
        isOpen={showOtpModal}
        onClose={handleOtpModalClose}
        email={registeredEmail}
      />
    </>
  );
};

export default Navbar;