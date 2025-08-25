import React, { useEffect, useState } from "react";
import AuthModal from "../Components/ReusableComponent/AuthModal";
import OtpModal from "../Components/ReusableComponent/OtpModal";
import logo from '../assets/logo.png'
import axios from 'axios'
import {baseurl} from "../Base/Base.js"
import { useNavigate ,Link} from 'react-router-dom'; // Add this import
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
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  // Add logo click handler
  const handleLogoClick = () => {
    navigate('/');
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
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3 group cursor-pointer">
        <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
  <img src={logo} alt="Logo" className="h-20 w-auto object-contain hover:scale-105 transition-transform duration-200" />
</div>

</div>

            <nav className="hidden md:flex space-x-8 text-black">
              <Link to="/" className="relative group">
                <span className="hover:text-orange-500 transition-colors duration-300">Home</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/property" className="relative group">
                <span className="hover:text-orange-500 transition-colors duration-300">Properties</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/about" className="relative group">
                <span className="hover:text-orange-500 transition-colors duration-300">About</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/contact" className="relative group">
                <span className="hover:text-orange-500 transition-colors duration-300">Contact</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>
          <div className="flex items-center space-x-4">
            {!isLogged ? (
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
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full font-semibold text-white bg-orange-600 hover:bg-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div className="w-6 h-6 rounded-full bg-white text-orange-600 flex items-center justify-center text-xs font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block">{user?.name}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-3"
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
                    Profile
                  </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

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
              {[
                { name: 'Home', href: '/' },
                { name: 'Properties', href: '/property' },
                { name: 'Services', href: '#' },
                { name: 'About', href: '#' },
                { name: 'Contact', href: '#' }
              ].map((item) => (
                <a 
                  key={item.name}
                  href={item.href} 
                  className="px-4 py-3 text-black font-medium rounded-xl hover:text-orange-600 hover:bg-gray-50 transition-all duration-200"
                >
                  {item.name}
                </a>
              ))}
              {isLogged && (
                <>
                  <hr className="my-2 border-gray-200" />
                  <div className="px-4 py-2">
                    <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <a href="/profile" className="px-4 py-3 text-black font-medium rounded-xl hover:text-orange-600 hover:bg-gray-50 transition-all duration-200 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </a>
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-3 text-black font-medium rounded-xl hover:text-orange-600 hover:bg-gray-50 transition-all duration-200 flex items-center w-full text-left"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      <AuthModal
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onRegisterSuccess={handleRegisterSuccess}
        onLoginSuccess={handleLoginSuccess}
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