import React, { useState, useEffect } from "react";

const OtpModal = ({ show, onClose, email }) => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (show) {
      setTimeLeft(60);
      setCanResend(false);
    }
  }, [show]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  if (!show) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          otp
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      window.location.href = "/";
    } catch (error) {
      alert(error.message || "OTP verification failed");
    }
  };

  const handleResend = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }
      
      setTimeLeft(60);
      setCanResend(false);
    } catch (error) {
      alert("Failed to resend OTP");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: 'rgb(247, 247, 247)' }}>
            <svg className="w-8 h-8" style={{ color: 'rgb(230, 116, 19)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We've sent a 6-digit verification code to<br/>
            <span className="font-semibold" style={{ color: 'rgb(230, 116, 19)' }}>{email}</span>
          </p>
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-black text-2xl w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all duration-200"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-6">
          {/* OTP Input */}
          <div>
            <label className="block text-sm font-semibold text-black mb-4 text-center">Enter Verification Code</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').substring(0, 6))}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-black placeholder-gray-400 text-center text-xl tracking-widest font-bold"
              style={{ backgroundColor: 'rgb(247, 247, 247)' }}
              placeholder="000000"
              maxLength={6}
            />
          </div>
          
          {/* Timer */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-200" style={{ backgroundColor: 'rgb(248, 252, 255)' }}>
              <svg className="w-4 h-4" style={{ color: 'rgb(230, 116, 19)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-600 text-sm font-medium">
                Time remaining: <span className="font-bold" style={{ color: 'rgb(230, 116, 19)' }}>{formatTime(timeLeft)}</span>
              </span>
            </div>
          </div>
          
          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={otp.length !== 6}
            className="w-full py-4 text-white rounded-full font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:bg-gray-400 text-lg tracking-wide"
            style={{ 
              backgroundColor: otp.length === 6 ? 'rgb(230, 116, 19)' : 'rgb(156, 163, 175)' 
            }}
          >
            {otp.length === 6 ? 'Verify Code' : `Enter ${6 - otp.length} more digits`}
          </button>
          
          {/* Resend Button */}
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-3">Didn't receive the code?</p>
            <button
              onClick={handleResend}
              disabled={!canResend}
              className="font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:underline text-base"
              style={{ 
                color: canResend ? 'rgb(230, 116, 19)' : 'rgb(107, 114, 128)' 
              }}
            >
              {canResend ? 'Resend Code' : `Resend in ${formatTime(timeLeft)}`}
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 rounded-xl border border-gray-200" style={{ backgroundColor: 'rgb(248, 252, 255)' }}>
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-black text-sm font-medium mb-1">Having trouble?</p>
              <p className="text-gray-600 text-xs leading-relaxed">
                Check your spam folder or ensure your email address is correct. The code expires in 10 minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;