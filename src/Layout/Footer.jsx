import React, { useState, useEffect } from 'react';
import { Phone, Mail } from 'lucide-react';

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
      className="py-16 px-6 bg-gradient-to-br from-gray-100 via-white to-gray-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50/20 to-orange-100/20"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="text-2xl font-bold mb-6 text-orange-500">
              Waves Global
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your gateway to extraordinary luxury staycation experiences across Dubai.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer group">
                <Phone className="h-5 w-5 text-white group-hover:animate-bounce" />
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer group">
                <Mail className="h-5 w-5 text-white group-hover:animate-bounce" />
              </div>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h4 className="text-lg font-semibold text-black mb-6 relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-orange-500"></span>
            </h4>
            <div className="space-y-3">
              <a href="#" className="block text-gray-600 hover:text-orange-500 transition-all duration-300 hover:translate-x-2 hover:scale-105">About Us</a>
              <a href="#" className="block text-gray-600 hover:text-orange-500 transition-all duration-300 hover:translate-x-2 hover:scale-105">Properties</a>
              <a href="#" className="block text-gray-600 hover:text-orange-500 transition-all duration-300 hover:translate-x-2 hover:scale-105">Services</a>
              <a href="#" className="block text-gray-600 hover:text-orange-500 transition-all duration-300 hover:translate-x-2 hover:scale-105">Contact</a>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h4 className="text-lg font-semibold text-black mb-6 relative">
              Dubai Destinations
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-orange-500"></span>
            </h4>
            <div className="space-y-3">
              <a href="#" className="block text-gray-600 hover:text-orange-500 transition-all duration-300 hover:translate-x-2 hover:scale-105">Dubai Marina</a>
              <a href="#" className="block text-gray-600 hover:text-orange-500 transition-all duration-300 hover:translate-x-2 hover:scale-105">Downtown Dubai</a>
              <a href="#" className="block text-gray-600 hover:text-orange-500 transition-all duration-300 hover:translate-x-2 hover:scale-105">Palm Jumeirah</a>
              <a href="#" className="block text-gray-600 hover:text-orange-500 transition-all duration-300 hover:translate-x-2 hover:scale-105">Jumeirah Beach</a>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h4 className="text-lg font-semibold text-black mb-6 relative">
              Support
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-orange-500"></span>
            </h4>
            <div className="space-y-3">
              <a href="#" className="block text-gray-600 hover:text-orange-500 transition-all duration-300 hover:translate-x-2 hover:scale-105">Help Center</a>
              <a href="#" className="block text-gray-600 hover:text-orange-500 transition-all duration-300 hover:translate-x-2 hover:scale-105">Privacy Policy</a>
              <a href="#" className="block text-gray-600 hover:text-orange-500 transition-all duration-300 hover:translate-x-2 hover:scale-105">Terms of Service</a>
              <a href="#" className="block text-gray-600 hover:text-orange-500 transition-all duration-300 hover:translate-x-2 hover:scale-105">Cancellation Policy</a>
            </div>
          </div>
        </div>
        
        <div className={`border-t border-gray-200 pt-8 transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-center text-gray-600 text-lg">
            © 2025 Waves Global. All rights reserved.
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
    </footer>
  );
};

export default Footer;