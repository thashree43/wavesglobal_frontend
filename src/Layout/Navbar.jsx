import React, { useState } from "react";
import AuthModal from "../Components/ReusableComponent/AuthModal";
import OtpModal from "../Components/ReusableComponent/OtpModal";
import logo from "../assets/logo.png";
import axios from "axios";
import { baseurl } from "../Base/Base.js";
import { useNavigate, Link } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ClientId } from "../Base/Base.js";
import { useAuth } from "../Context/Auth";
import { useLocation } from "react-router-dom";


const Navbar = () => {
  const { user, isLogged, checkAuthStatus, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegisterSuccess = (email) => {
    setRegisteredEmail(email);
    setShowOtpModal(true);
  };

  const handleLoginSuccess = async () => {
    try {
      await checkAuthStatus();
      setTimeout(() => {
        setShowAuthModal(false);
      }, 100);
    } catch (error) {
      setShowAuthModal(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${baseurl}User/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      logout();
      setShowProfileDropdown(false);
    } catch (error) {}
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

            <nav className="hidden md:flex items-center space-x-8">
  <Link
    to="/"
    className={`relative group py-2 ${
      location.pathname === "/"
        ? "after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-4 after:h-[2px] after:bg-[rgb(0,31,60)]"
        : ""
    }`}
  >
    <span className="font-medium" style={{ color: "rgb(0,31,60)" }}>Home</span>
  </Link>

  <Link
    to="/property"
    className={`relative group py-2 ${
      location.pathname === "/property"
        ? "after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-4 after:h-[2px] after:bg-[rgb(0,31,60)]"
        : ""
    }`}
  >
    <span className="font-medium" style={{ color: "rgb(0,31,60)" }}>Properties</span>
  </Link>

  <Link
    to="/about"
    className={`relative group py-2 ${
      location.pathname === "/about"
        ? "after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-4 after:h-[2px] after:bg-[rgb(0,31,60)]"
        : ""
    }`}
  >
    <span className="font-medium" style={{ color: "rgb(0,31,60)" }}>About</span>
  </Link>

  <Link
    to="/contact"
    className={`relative group py-2 ${
      location.pathname === "/contact"
        ? "after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-4 after:h-[2px] after:bg-[rgb(0,31,60)]"
        : ""
    }`}
  >
    <span className="font-medium" style={{ color: "rgb(0,31,60)" }}>Contact</span>
  </Link>
</nav>


            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
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
                      onClick={() =>
                        setShowProfileDropdown(!showProfileDropdown)
                      }
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

              {isLogged && (
                <div className="md:hidden relative">
                  <button
                    onClick={() =>
                      setShowProfileDropdown(!showProfileDropdown)
                    }
                    className="inline-flex items-center justify-center p-2 rounded-full font-semibold text-white transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    style={{ backgroundColor: "rgb(4, 80, 115)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm font-bold"
                      style={{ color: "rgb(4, 80, 115)" }}
                    >
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
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

              <button
                className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <span
                  className={`block w-6 h-0.5 transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                  style={{ backgroundColor: "rgb(0, 31, 60)" }}
                />
                <span
                  className={`block w-6 h-0.5 transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                  style={{ backgroundColor: "rgb(0, 31, 60)" }}
                />
                <span
                  className={`block w-6 h-0.5 transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                  style={{ backgroundColor: "rgb(0, 31, 60)" }}
                />
              </button>
            </div>
          </div>

          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <nav className="px-4 py-4 space-y-4">
              <Link
                to="/"
                className="block py-2 text-lg font-medium transition-colors duration-300 active:border-b-2 active:border-[rgb(0,31,60)]"
                style={{ color: "rgb(0, 31, 60)" }}
                onClick={handleMenuItemClick}
              >
                Home
              </Link>

              <Link
                to="/property"
                className="block py-2 text-lg font-medium transition-colors duration-300 active:border-b-2 active:border-[rgb(0,31,60)]"
                style={{ color: "rgb(0, 31, 60)" }}
                onClick={handleMenuItemClick}
              >
                Properties
              </Link>

              <Link
                to="/about"
                className="block py-2 text-lg font-medium transition-colors duration-300 active:border-b-2 active:border-[rgb(0,31,60)]"
                style={{ color: "rgb(0, 31, 60)" }}
                onClick={handleMenuItemClick}
              >
                About
              </Link>

              <Link
                to="/contact"
                className="block py-2 text-lg font-medium transition-colors duration-300 active:border-b-2 active:border-[rgb(0,31,60)]"
                style={{ color: "rgb(0, 31, 60)" }}
                onClick={handleMenuItemClick}
              >
                Contact
              </Link>

              <div
                className="pt-4 border-t"
                style={{ borderColor: "rgb(247, 219, 190)" }}
              >
                {!isLogged ? (
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      handleMenuItemClick();
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full font-semibold text-base text-white transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    style={{
                      background: `linear-gradient(to right, rgb(231, 121, 0), rgb(250, 153, 56))`,
                    }}
                  >
                    <span>Sign In</span>
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div
                      className="px-4 py-3 bg-white rounded-lg"
                      style={{ border: `1px solid rgb(247, 219, 190)` }}
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
                      className="block py-2 text-lg font-medium transition-colors duration-300 active:border-b-2 active:border-[rgb(0,31,60)]"
                      style={{ color: "rgb(0, 31, 60)" }}
                      onClick={handleMenuItemClick}
                    >
                      Profile
                    </Link>

                    <button
                      onClick={() => {
                        handleLogout();
                        handleMenuItemClick();
                      }}
                      className="block w-full text-left py-2 text-lg font-medium transition-colors duration-300 active:border-b-2 active:border-[rgb(0,31,60)]"
                      style={{ color: "rgb(0, 31, 60)" }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </nav>
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
