import axios from "axios";
import React, { useState } from "react";
import { baseurl } from "../../Base/Base";
import { toast } from 'react-toastify';

const AuthModal = ({ show, onClose, onRegisterSuccess, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!show) return null;

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setRegEmail("");
    setPhone("");
    setRegPassword("");
    setConfirmPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${baseurl}User/login`,
        { email, password },
        { withCredentials: true }
      );
  
      console.log("Login Success:", res.data);
  
      resetForm();
      if (res.data.user) {
        onLoginSuccess(res.data.user);
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
        { withCredentials: true }
      );
      
      console.log("Registration Success:", res.data);
      
      resetForm();
      onClose();
      onRegisterSuccess(regEmail);
    } catch (error) {
      console.error("Registration Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  const handleModalClose = () => {
    resetForm();
    setIsLogin(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-xl border border-gray-100 overflow-hidden">
        
        <div className="relative px-6 py-6" style={{ backgroundColor: 'rgb(248, 252, 255)' }}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-black mb-1">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-600 text-xs">
                {isLogin ? 'Sign in to your account' : 'Join Waves Global'}
              </p>
            </div>
            <button 
              onClick={handleModalClose}
              className="text-gray-400 hover:text-black text-xl w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all duration-200"
            >
              ×
            </button>
          </div>

          <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-100">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-all duration-200 ${
                isLogin 
                  ? 'bg-orange-500 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-black hover:bg-gray-50'
              }`}
              style={isLogin ? {background: `linear-gradient(to right, rgb(231, 121, 0), rgb(250, 153, 56))`,    } : {}}  >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-all duration-200 ${
                !isLogin 
                  ? 'bg-orange-500 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-black hover:bg-gray-50'
              }`}
              style={!isLogin ? {background: `linear-gradient(to right, rgb(231, 121, 0), rgb(250, 153, 56))`,    }  : {}}
            >
              Sign Up
            </button>
          </div>
        </div>
        
        <div className="px-6 py-4">
          {isLogin ? (
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
                style={{background: `linear-gradient(to right, rgb(231, 121, 0), rgb(250, 153, 56))`,    } }
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
              
              <button
                type="button"
                className="w-full py-2.5 bg-white border border-gray-200 text-black rounded-lg font-medium hover:border-gray-300 transition-all duration-200 transform hover:scale-[1.01] shadow-sm hover:shadow-md flex items-center justify-center space-x-2 text-sm"
                style={{ backgroundColor: 'rgb(247, 247, 247)' }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
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
                style={{background: `linear-gradient(to right, rgb(231, 121, 0), rgb(250, 153, 56))`,    } }
              >
                Create Your Account
              </button>
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
  );
};

export default AuthModal;