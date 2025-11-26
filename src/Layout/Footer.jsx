import React, { useState, useEffect } from 'react';
import { Phone, Mail, Instagram, Facebook, Linkedin, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById('footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer 
      id="footer" 
      className="py-16 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'rgb(247, 219, 190)' }}
    >
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(231, 121, 0, 0.05), rgba(231, 121, 0, 0.1))' }}></div>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(231, 121, 0, 0.3), transparent)' }}></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="text-2xl font-bold mb-6" style={{ color: 'rgb(231, 121, 0)' }}>
              Wavescation
            </h3>
            <p className="mb-6 leading-relaxed" style={{ color: 'rgb(4, 80, 115)' }}>
              Your gateway to extraordinary luxury staycation experiences across Dubai.
            </p>
            <div className="flex space-x-3">
              <a 
                href="tel:+971522596860" 
                className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer group" 
                style={{ backgroundColor: 'rgb(231, 121, 0)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(250, 153, 56)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(231, 121, 0)'}
              >
                <Phone className="h-4 w-4 text-white group-hover:animate-bounce" />
              </a>
              <a 
                href="mailto:Info@wavescation.com"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer group" 
                style={{ backgroundColor: 'rgb(231, 121, 0)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(250, 153, 56)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(231, 121, 0)'}
              >
                <Mail className="h-4 w-4 text-white group-hover:animate-bounce" />
              </a>
              <a 
                href="https://www.instagram.com/wavescation_holidayhomes?igsh=MThxb2Z4ZmpqMmQxZA%3D%3D&utm_source=qr"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer group" 
                style={{ backgroundColor: 'rgb(231, 121, 0)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(250, 153, 56)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(231, 121, 0)'}
              >
                <Instagram className="h-4 w-4 text-white group-hover:animate-bounce" />
              </a>
              <a 
                href="https://www.facebook.com/share/17PS5QDDa7/?mibextid=wwXIfr"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer group" 
                style={{ backgroundColor: 'rgb(231, 121, 0)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(250, 153, 56)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(231, 121, 0)'}
              >
                <Facebook className="h-4 w-4 text-white group-hover:animate-bounce" />
              </a>
              <a 
                href="https://www.linkedin.com/company/wavescation-holiday-homes/"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer group" 
                style={{ backgroundColor: 'rgb(231, 121, 0)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(250, 153, 56)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(231, 121, 0)'}
              >
                <Linkedin className="h-4 w-4 text-white group-hover:animate-bounce" />
              </a>
              <a 
                href="https://wa.me/971522596860"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer group" 
                style={{ backgroundColor: 'rgb(231, 121, 0)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(250, 153, 56)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(231, 121, 0)'}
              >
                <MessageCircle className="h-4 w-4 text-white group-hover:animate-bounce" />
              </a>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h4 className="text-lg font-semibold mb-6 relative" style={{ color: 'rgb(0, 31, 60)' }}>
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-0.5" style={{ backgroundColor: 'rgb(231, 121, 0)' }}></span>
            </h4>
            <div className="space-y-3">
              <Link to="/about" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                About Us
              </Link>
              <Link to="/property" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                Properties
              </Link>
              <Link to="/contact" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                Contact
              </Link>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h4 className="text-lg font-semibold mb-6 relative" style={{ color: 'rgb(0, 31, 60)' }}>
              Dubai Destinations
              <span className="absolute -bottom-2 left-0 w-8 h-0.5" style={{ backgroundColor: 'rgb(231, 121, 0)' }}></span>
            </h4>
            <div className="space-y-3">
              <a href="/property" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                Dubai Marina
              </a>
              <a href="/property" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                Downtown Dubai
              </a>
              <a href="/property" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                Palm Jumeirah
              </a>
              <a href="/property" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                Jumeirah Beach
              </a>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h4 className="text-lg font-semibold mb-6 relative" style={{ color: 'rgb(0, 31, 60)' }}>
              Policies
              <span className="absolute -bottom-2 left-0 w-8 h-0.5" style={{ backgroundColor: 'rgb(231, 121, 0)' }}></span>
            </h4>
            <div className="space-y-3">
              <Link to="/privacy-policy" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                Privacy Policy
              </Link>
              <Link to="/terms-and-conditions" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                Terms & Conditions
              </Link>
              <Link to="/refund-policy" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                Refund Policy
              </Link>
              <Link to="/shipping-policy" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
        
        <div
  className={`pt-8 transition-all duration-1000 delay-800 ${
    isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
  }`}
  style={{ borderTop: "1px solid rgb(247, 219, 190)" }}
>
  <p
    className="text-center text-lg flex flex-col items-center gap-1"
    style={{ color: "rgb(4, 80, 115)" }}
  >
    © 2025 Wavescation. All rights reserved.

    <span className="flex items-center gap-2 text-base">
      Designed & Developed by FlyHomies Associates
      <a
        href="https://www.instagram.com/flyhomies_associates/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-70 transition"
      >
        <FaInstagram size={18} color="rgb(4, 80, 115)" />
      </a>
    </span>
  </p>
</div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(231, 121, 0, 0.2), transparent)' }}></div>
    </footer>
  );
};

export default Footer;
