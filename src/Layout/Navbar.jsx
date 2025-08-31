import React, { useEffect, useState } from "react";
import AuthModal from "../Components/ReusableComponent/AuthModal";
import OtpModal from "../Components/ReusableComponent/OtpModal";
import logo from "../assets/logo.png";
import axios from "axios";
import { baseurl } from "../Base/Base.js";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return !!savedUser;
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const handleRegisterSuccess = (email) => {
    setRegisteredEmail(email);
    setShowOtpModal(true);
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`${baseurl}User/getuser`, {
        withCredentials: true,
      });
      if (response.data.user) {
        setIsLogged(true);
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        setIsLogged(false);
        setUser(null);
        localStorage.removeItem("user");
      }
    } catch {
      setIsLogged(false);
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  const handleLoginSuccess = (userData) => {
    setIsLogged(true);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setShowAuthModal(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${baseurl}User/logout`, {}, { withCredentials: true });
      setIsLogged(false);
      setUser(null);
      localStorage.removeItem("user");
      setShowProfileDropdown(false);
    } catch {}
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleOtpModalClose = () => {
    setShowOtpModal(false);
    setRegisteredEmail("");
  };

  return (
    <>
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
              <Link to="/" className="relative group py-2">
                <span
                  className="font-medium transition-colors duration-300"
                  style={{ color: "rgb(0, 31, 60)" }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = "rgb(231, 121, 0)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgb(0, 31, 60)")
                  }
                >
                  Home
                </span>
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: "rgb(231, 121, 0)" }}
                ></span>
              </Link>
              <Link to="/property" className="relative group py-2">
                <span
                  className="font-medium transition-colors duration-300"
                  style={{ color: "rgb(0, 31, 60)" }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = "rgb(231, 121, 0)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgb(0, 31, 60)")
                  }
                >
                  Properties
                </span>
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: "rgb(231, 121, 0)" }}
                ></span>
              </Link>
              <Link to="/about" className="relative group py-2">
                <span
                  className="font-medium transition-colors duration-300"
                  style={{ color: "rgb(0, 31, 60)" }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = "rgb(231, 121, 0)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgb(0, 31, 60)")
                  }
                >
                  About
                </span>
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: "rgb(231, 121, 0)" }}
                ></span>
              </Link>
              <Link to="/contact" className="relative group py-2">
                <span
                  className="font-medium transition-colors duration-300"
                  style={{ color: "rgb(0, 31, 60)" }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = "rgb(231, 121, 0)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgb(0, 31, 60)")
                  }
                >
                  Contact
                </span>
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: "rgb(231, 121, 0)" }}
                ></span>
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
                  onMouseEnter={(e) =>
                    (e.target.style.background = `linear-gradient(to right, rgb(250, 153, 56), rgb(231, 121, 0))`)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.background = `linear-gradient(to right, rgb(231, 121, 0), rgb(250, 153, 56))`)
                  }
                >
                  <svg
                    className="w-4 h-4 text-white"
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
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-3 rounded-full font-semibold text-white transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
                    style={{ backgroundColor: "rgb(4, 80, 115)" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "rgb(0, 31, 60)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "rgb(4, 80, 115)")
                    }
                  >
                    <div
                      className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-bold"
                      style={{ color: "rgb(4, 80, 115)" }}
                    >
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden lg:block">{user?.name}</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        showProfileDropdown ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
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
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "rgb(247, 219, 190)";
                          e.target.style.color = "rgb(0, 31, 60)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "rgb(0, 31, 60)";
                        }}
                        onClick={() => setShowProfileDropdown(false)}
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
                        className="flex items-center w-full px-4 py-2 text-sm transition-colors"
                        style={{ color: "rgb(0, 31, 60)" }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "rgb(247, 219, 190)";
                          e.target.style.color = "rgb(0, 31, 60)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "rgb(0, 31, 60)";
                        }}
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
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-xl transition-all duration-200"
                style={{ backgroundColor: "rgb(247, 219, 190)" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "rgb(231, 121, 0)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "rgb(247, 219, 190)")
                }
              >
                <svg
                  className="w-6 h-6"
                  style={{ color: "rgb(0, 31, 60)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div
              className="md:hidden bg-white"
              style={{ borderTop: `1px solid rgb(247, 219, 190)` }}
            >
              <div className="px-4 pt-4 pb-6 space-y-2">
                {[
                  { name: "Home", href: "/" },
                  { name: "Properties", href: "/property" },
                  { name: "About", href: "/about" },
                  { name: "Contact", href: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={handleMenuItemClick}
                    className="block px-4 py-3 rounded-lg font-medium transition-all duration-200"
                    style={{ color: "rgb(0, 31, 60)" }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "rgb(231, 121, 0)";
                      e.target.style.backgroundColor = "rgb(247, 219, 190)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "rgb(0, 31, 60)";
                      e.target.style.backgroundColor = "transparent";
                    }}
                  >
                    {item.name}
                  </Link>
                ))}

                {isLogged && (
                  <div
                    className="mt-4 pt-4"
                    style={{ borderTop: `1px solid rgb(247, 219, 190)` }}
                  >
                    <div
                      className="px-4 py-3 rounded-lg mb-3"
                      style={{ backgroundColor: "rgb(247, 219, 190)" }}
                    >
                      <p
                        className="font-semibold"
                        style={{ color: "rgb(0, 31, 60)" }}
                      >
                        {user?.name}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "rgb(4, 80, 115)" }}
                      >
                        {user?.email}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={handleMenuItemClick}
                      className="block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200"
                      style={{ color: "rgb(0, 31, 60)" }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "rgb(231, 121, 0)";
                        e.target.style.backgroundColor = "rgb(247, 219, 190)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "rgb(0, 31, 60)";
                        e.target.style.backgroundColor = "transparent";
                      }}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        handleMenuItemClick();
                      }}
                      className="block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200"
                      style={{ color: "rgb(231, 121, 0)" }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "rgb(247, 219, 190)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "transparent")
                      }
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
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
    </>
  );
};

export default Navbar;
