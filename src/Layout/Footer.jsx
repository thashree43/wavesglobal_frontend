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
      className="py-16 px-6 relative overflow-hidden"
      style={ {backgroundColor: 'rgb(247, 219, 190)' }}
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
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer group" 
                   style={{ backgroundColor: 'rgb(231, 121, 0)' }}
                   onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(250, 153, 56)'}
                   onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(231, 121, 0)'}>
                <Phone className="h-5 w-5 text-white group-hover:animate-bounce" />
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer group" 
                   style={{ backgroundColor: 'rgb(231, 121, 0)' }}
                   onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(250, 153, 56)'}
                   onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(231, 121, 0)'}>
                <Mail className="h-5 w-5 text-white group-hover:animate-bounce" />
              </div>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h4 className="text-lg font-semibold mb-6 relative" style={{ color: 'rgb(0, 31, 60)' }}>
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-0.5" style={{ backgroundColor: 'rgb(231, 121, 0)' }}></span>
            </h4>
            <div className="space-y-3">
              <a href="#" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                About Us
              </a>
              <a href="#" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                Properties
              </a>
              <a href="#" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                Services
              </a>
              <a href="#" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                Contact
              </a>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h4 className="text-lg font-semibold mb-6 relative" style={{ color: 'rgb(0, 31, 60)' }}>
              Dubai Destinations
              <span className="absolute -bottom-2 left-0 w-8 h-0.5" style={{ backgroundColor: 'rgb(231, 121, 0)' }}></span>
            </h4>
            <div className="space-y-3">
              <a href="#" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                Dubai Marina
              </a>
              <a href="#" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                Downtown Dubai
              </a>
              <a href="#" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                Palm Jumeirah
              </a>
              <a href="#" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                Jumeirah Beach
              </a>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h4 className="text-lg font-semibold mb-6 relative" style={{ color: 'rgb(0, 31, 60)' }}>
              Support
              <span className="absolute -bottom-2 left-0 w-8 h-0.5" style={{ backgroundColor: 'rgb(231, 121, 0)' }}></span>
            </h4>
            <div className="space-y-3">
              <a href="#" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                Help Center
              </a>
              <a href="#" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                Privacy Policy
              </a>
              <a href="#" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                Terms of Service
              </a>
              <a href="#" className="block transition-all duration-300 hover:translate-x-2 hover:scale-105" 
                 style={{ color: 'rgb(4, 80, 115)' }}
                 onMouseEnter={(e) => e.target.style.color = 'rgb(231, 121, 0)'}
                 onMouseLeave={(e) => e.target.style.color = 'rgb(4, 80, 115)'}>
                Cancellation Policy
              </a>
            </div>
          </div>
        </div>
        
        <div className={`pt-8 transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} 
             style={{ borderTop: '1px solid rgb(247, 219, 190)' }}>
          <p className="text-center text-lg" style={{ color: 'rgb(4, 80, 115)' }}>
            © 2025 Wavescation. All rights reserved.
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(231, 121, 0, 0.2), transparent)' }}></div>
    </footer>
  );
};

export default Footer;