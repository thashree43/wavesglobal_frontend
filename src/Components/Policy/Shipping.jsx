import React from 'react';
import logo from '../../assets/logo.png';
import Navbar from '../../Layout/Navbar';
import Footer from '../../Layout/Footer';

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(247,247,247)] via-white to-[rgb(248,252,255)]">
      <div className="h-16 bg-white/80 backdrop-blur-sm border-b border-gray-200 fixed w-full z-10"></div>
      <Navbar/>
      
      <div className="pt-20 pb-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden" style={{ background: 'rgb(247, 219, 190)' }}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
            <div className="mb-6 sm:mb-8 inline-block">
              <img src={logo} alt="Wavescation" className="h-20 sm:h-32 mx-auto" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight text-gray-800">Service Delivery Policy</h1>
            <p className="text-lg sm:text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-gray-700">
              How We Deliver Our Holiday Home Management Services
            </p>
            <div className="mt-8 sm:mt-12 w-24 h-1 bg-gray-600 mx-auto rounded-full"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[rgb(247,247,247)] to-transparent"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Last Updated */}
          <div className="text-center mb-12">
            <div className="inline-block bg-[rgb(247,219,190)]/20 rounded-full px-6 py-2">
              <span className="text-gray-700 font-semibold text-sm uppercase tracking-wider">Last Updated: January 2025</span>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Service Delivery Overview */}
            <section className="bg-gradient-to-br from-[rgb(248,252,255)] via-white to-[rgb(247,247,247)] rounded-3xl p-6 sm:p-8 md:p-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[rgb(247,219,190)] rounded-2xl flex items-center justify-center mr-4 sm:mr-6">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[rgb(0,0,0)]">Service Delivery Overview</h2>
              </div>
              <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
                <p>
                  At Wavescation Holiday Homes, we provide comprehensive property management services rather than physical product shipping. Our "delivery" refers to the seamless execution of our holiday home management services across Dubai's premium locations.
                </p>
                <p>
                  All our services are delivered digitally and through on-site operations, ensuring immediate availability and continuous support for both property owners and guests.
                </p>
              </div>
            </section>

            {/* Service Delivery Timeline */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[rgb(247,219,190)] rounded-2xl flex items-center justify-center mr-4 sm:mr-6">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[rgb(0,0,0)]">Service Delivery Timeline</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="border-l-4 border-[rgb(247,219,190)] pl-6">
                    <h3 className="text-lg sm:text-xl font-bold text-[rgb(0,0,0)] mb-2">Property Onboarding</h3>
                    <p className="text-gray-600 mb-2">Timeline: 7-14 business days</p>
                    <ul className="space-y-1 text-gray-700 text-sm sm:text-base">
                      <li>• Property inspection and photography</li>
                      <li>• Listing creation across platforms</li>
                      <li>• Setup of management systems</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-[rgb(247,219,190)] pl-6">
                    <h3 className="text-lg sm:text-xl font-bold text-[rgb(0,0,0)] mb-2">Guest Services</h3>
                    <p className="text-gray-600 mb-2">Timeline: Immediate/24-7</p>
                    <ul className="space-y-1 text-gray-700 text-sm sm:text-base">
                      <li>• Instant booking confirmations</li>
                      <li>• Real-time guest communication</li>
                      <li>• 24/7 concierge support</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="border-l-4 border-[rgb(247,219,190)] pl-6">
                    <h3 className="text-lg sm:text-xl font-bold text-[rgb(0,0,0)] mb-2">Maintenance Services</h3>
                    <p className="text-gray-600 mb-2">Timeline: Same day - 48 hours</p>
                    <ul className="space-y-1 text-gray-700 text-sm sm:text-base">
                      <li>• Emergency repairs: Immediate</li>
                      <li>• Regular maintenance: 24-48 hours</li>
                      <li>• Deep cleaning: Same day scheduling</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-[rgb(247,219,190)] pl-6">
                    <h3 className="text-lg sm:text-xl font-bold text-[rgb(0,0,0)] mb-2">Reporting & Analytics</h3>
                    <p className="text-gray-600 mb-2">Timeline: Monthly/On-demand</p>
                    <ul className="space-y-1 text-gray-700 text-sm sm:text-base">
                      <li>• Monthly financial reports</li>
                      <li>• Real-time dashboard access</li>
                      <li>• Performance analytics</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Service Areas */}
            <section className="bg-gradient-to-br from-[rgb(248,252,255)] via-white to-[rgb(247,247,247)] rounded-3xl p-6 sm:p-8 md:p-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[rgb(247,219,190)] rounded-2xl flex items-center justify-center mr-4 sm:mr-6">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[rgb(0,0,0)]">Service Coverage Areas</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  'Downtown Dubai',
                  'Jumeirah Beach Residence (JBR)',
                  'Palm Jumeirah',
                  'Dubai Marina',
                  'Business Bay',
                  'DIFC'
                ].map((area, index) => (
                  <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/30 hover:bg-white hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[rgb(247,219,190)] rounded-full mr-3"></div>
                      <span className="font-semibold text-gray-800 text-sm sm:text-base">{area}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-[rgb(247,219,190)]/20 rounded-2xl">
                <p className="text-gray-700 text-center text-sm sm:text-base">
                  <strong>Expanding Soon:</strong> We are continuously expanding our service areas across Dubai's premium locations.
                </p>
              </div>
            </section>

            {/* Emergency Services */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[rgb(247,219,190)] rounded-2xl flex items-center justify-center mr-4 sm:mr-6">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[rgb(0,0,0)]">Emergency Service Delivery</h2>
              </div>
              <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
                <p>
                  Our emergency response team is available 24/7 to handle urgent situations affecting guest stays or property safety.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-[rgb(248,252,255)] rounded-2xl p-6">
                    <h3 className="font-bold text-[rgb(0,0,0)] mb-3">Immediate Response (0-2 hours)</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Plumbing emergencies</li>
                      <li>• Electrical issues</li>
                      <li>• AC/Heating failures</li>
                      <li>• Security concerns</li>
                    </ul>
                  </div>
                  <div className="bg-[rgb(248,252,255)] rounded-2xl p-6">
                    <h3 className="font-bold text-[rgb(0,0,0)] mb-3">Same-Day Response (2-24 hours)</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Appliance malfunctions</li>
                      <li>• Wi-Fi connectivity issues</li>
                      <li>• Cleaning emergencies</li>
                      <li>• Guest accommodation changes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            {/* <section className="bg-gradient-to-r from-[rgb(247,219,190)]/20 via-[rgb(248,252,255)]/50 to-[rgb(247,219,190)]/20 rounded-3xl p-6 sm:p-8 md:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[rgb(0,0,0)] mb-6">Questions About Our Services?</h2>
              <p className="text-gray-700 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
                For more information about our service delivery or to discuss your specific requirements, please contact our team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  <span>+971522596860</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  <span>wavescation.com</span>
                </div>
              </div>
            </section> */}
          </div>
        </div>
      </div>
      <div className="fixed right-4 bottom-20 flex flex-col gap-4 z-50">
        <a
          href="https://wa.me/971522596860"
          target="_blank"
          rel="noopener noreferrer"
          className="animate-pulse bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="h-10 w-10"
          />
        </a>
        <a
          href="mailto:Info@wavescation.com"
          className="animate-pulse bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png"
            alt="Mail"
            className="h-10 w-10"
          />
        </a>
        <a
          href="tel:+971522596860"
          className="animate-pulse bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <svg className="h-10 w-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
          </svg>
        </a>
      </div>
      <Footer/>
    </div>
  );
}