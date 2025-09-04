import React, { useState } from "react";
import AuthModal from "../Components/ReusableComponent/AuthModal";
import OtpModal from "../Components/ReusableComponent/OtpModal";
import logo from "../assets/logo.png";
import axios from "axios";
import { baseurl } from "../Base/Base.js";
import { useNavigate, Link } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ClientId } from "../Base/Base.js";
import { useAuth } from "../Context/Auth"; // ✅ use AuthContext

const Navbar = () => {
  const { user, isLogged, checkAuthStatus, logout } = useAuth(); // ✅ global state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const handleRegisterSuccess = (email) => {
    setRegisteredEmail(email);
    setShowOtpModal(true);
  };

  const handleLoginSuccess = async () => {
    await checkAuthStatus(); // ✅ update context immediately
    setShowAuthModal(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${baseurl}User/logout`, {}, { withCredentials: true });
      logout(); // ✅ clear global state
      setShowProfileDropdown(false);
    } catch {}
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const handleOtpModalClose = () => {
    setShowOtpModal(false);
    setRegisteredEmail("");
  };

  return (
    <GoogleOAuthProvider clientId={ClientId}>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b"
        style={{
          borderColor: "rgb(247, 219, 190)",
          backgroundColor: "rgb(247, 219, 190)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div
              className="flex items-center cursor-pointer"
              onClick={handleLogoClick}
            >
              <img
                src={logo}
                alt="Logo"
                className="h-28 md:h-36 lg:h-32 w-auto object-contain hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* ✅ your old nav design kept as-is */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="relative group py-2">
                <span
                  className="font-medium transition-colors duration-300"
                  style={{ color: "rgb(0, 31, 60)" }}
                >
                  Home
                </span>
              </Link>
              <Link to="/property" className="relative group py-2">
                <span
                  className="font-medium transition-colors duration-300"
                  style={{ color: "rgb(0, 31, 60)" }}
                >
                  Properties
                </span>
              </Link>
              <Link to="/about" className="relative group py-2">
                <span
                  className="font-medium transition-colors duration-300"
                  style={{ color: "rgb(0, 31, 60)" }}
                >
                  About
                </span>
              </Link>
              <Link to="/contact" className="relative group py-2">
                <span
                  className="font-medium transition-colors duration-300"
                  style={{ color: "rgb(0, 31, 60)" }}
                >
                  Contact
                </span>
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              {!isLogged ? (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-full font-semibold text-sm md:text-base text-white transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{
                    background: `linear-gradient(to right, rgb(231, 121, 0), rgb(250, 153, 56))`,
                  }}
                >
                  <span>Sign In</span>
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-3 rounded-full font-semibold text-white transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
                    style={{ backgroundColor: "rgb(4, 80, 115)" }}
                  >
                    <div
                      className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-bold"
                      style={{ color: "rgb(4, 80, 115)" }}
                    >
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden lg:block">{user?.name}</span>
                  </button>

                  {showProfileDropdown && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50"
                      style={{ border: `1px solid rgb(247, 219, 190)` }}
                    >
                      <div
                        className="px-4 py-2 border-b"
                        style={{ borderColor: "rgb(247, 219, 190)" }}
                      >
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "rgb(0, 31, 60)" }}
                        >
                          {user?.name}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "rgb(4, 80, 115)" }}
                        >
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm transition-colors"
                        style={{ color: "rgb(0, 31, 60)" }}
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm transition-colors"
                        style={{ color: "rgb(0, 31, 60)" }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
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
    </GoogleOAuthProvider>
  );
};

export default Navbar;
