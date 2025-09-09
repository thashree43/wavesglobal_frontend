import React from 'react';
import logo from '../../assets/logo.png'
import Navbar from '../../Layout/Navbar';
import Footer from '../../Layout/Footer';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(247,247,247)] via-white to-[rgb(248,252,255)]">
      <div className="h-16 bg-white/80 backdrop-blur-sm border-b border-gray-200 fixed w-full z-10"></div>
      <Navbar/>
      
      <div className="pt-20 pb-16">
        <div className="relative overflow-hidden" style={{ background: 'rgb(247, 219, 190)' }}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <div className="mb-8 inline-block">
              <img src={logo} alt="Wavescation" className="h-32 mx-auto" />
            </div>
            <h1 className="text-6xl font-bold mb-6 tracking-tight text-gray-800">About Wavescation</h1>
            <p className="text-2xl font-light max-w-3xl mx-auto leading-relaxed text-gray-700">
              Steps from everything, Miles from ordinary
            </p>
            <div className="mt-12 w-24 h-1 bg-gray-600 mx-auto rounded-full"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[rgb(247,247,247)] to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <div className="inline-block bg-[rgb(247,219,190)]/20 rounded-full px-6 py-2 mb-6">
                    <span className="text-gray-700 font-semibold text-sm uppercase tracking-wider">Who We Are</span>
                  </div>
                  <h2 className="text-4xl font-bold text-[rgb(0,0,0)] mb-8 leading-tight">Redefining Holiday Home Excellence in Dubai</h2>
                </div>
                
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Wavescation Holiday Homes is a DTCM-licensed holiday home management company based in Dubai, specializing in premium short-term rentals in Downtown Dubai, Jumeirah Beach Residence (JBR), Palm Jumeirah and other high-demand locations.
                  </p>
                  <p>
                    We pride ourselves on providing end-to-end property management, supported by our in-house cleaning and maintenance team to ensure every property is maintained to 5-star hospitality standards.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-[rgb(247,219,190)]/30 to-[rgb(248,252,255)] p-12 rounded-3xl transform hover:scale-105 transition-all duration-500">
                  <div className="bg-white rounded-2xl p-8 shadow-xl">
                    <img src={logo} alt="Wavescation Logo" className="h-40 mx-auto" />
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-[rgb(247,219,190)]/30 rounded-full blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[rgb(248,252,255)] rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>

          <div className="py-24 bg-gradient-to-r from-transparent via-[rgb(248,252,255)]/50 to-transparent rounded-3xl my-16">
            <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto px-8">
              
              <div className="relative group">
                <div className="absolute inset-0 bg-[rgb(247,219,190)] rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
                <div className="relative bg-white rounded-3xl p-12 m-1 shadow-2xl h-full">
                  <div className="w-16 h-16 bg-[rgb(247,219,190)] rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-12 transition-all duration-500">
                    <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-[rgb(0,0,0)] mb-6">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    To be Dubai's most trusted and innovative holiday home brand, where every guest stay feels like a luxury vacation and every property owner enjoys effortless, maximized returns — powered by world-class hospitality, meticulous in-house services, and creative event experiences.
                  </p>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-[rgb(247,219,190)] rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
                <div className="relative bg-white rounded-3xl p-12 m-1 shadow-2xl h-full">
                  <div className="w-16 h-16 bg-[rgb(247,219,190)] rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-12 transition-all duration-500">
                    <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-[rgb(0,0,0)] mb-6">Our Mission</h3>
                  <div className="space-y-4 text-gray-600 text-lg">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p><span className="font-bold text-[rgb(0,0,0)]">Exceptional Guest Experiences</span> – Through premium properties, spotless in-house cleaning, and 24/7 support.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p><span className="font-bold text-[rgb(0,0,0)]">Owner Success</span> – With transparent operations, dynamic pricing, and guaranteed care for every property.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p><span className="font-bold text-[rgb(0,0,0)]">Creative Lifestyle Add-Ons</span> – Leveraging WavesGlobal Event Company to provide unique events and curated experiences.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="py-24">
            <div className="text-center mb-20">
              <div className="inline-block bg-[rgb(247,219,190)]/20 rounded-full px-6 py-2 mb-6">
                <span className="text-gray-700 font-semibold text-sm uppercase tracking-wider">What We Offer</span>
              </div>
              <h2 className="text-5xl font-bold text-[rgb(0,0,0)] mb-8">Our Services</h2>
              <div className="w-24 h-1 bg-gray-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[
                {
                  icon: (
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                  ),
                  title: "Full Property Management",
                  description: "Complete handling of operations, from listings to guest check-outs"
                },
                {
                  icon: (
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                    </svg>
                  ),
                  title: "Dynamic Pricing",
                  description: "Maximizing owner returns using market-driven pricing strategies"
                },
                {
                  icon: (
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
                    </svg>
                  ),
                  title: "Guest Hosting",
                  description: "24/7 guest communication, concierge services, and check-in/out assistance"
                },
                {
                  icon: (
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
                    </svg>
                  ),
                  title: "Property Marketing",
                  description: "Professional photography, premium listings on Airbnb, Booking.com, and Expedia"
                },
                {
                  icon: (
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ),
                  title: "Maintenance & Housekeeping",
                  description: "Regular upkeep to maintain top quality standards"
                },
                {
                  icon: (
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z"/>
                    </svg>
                  ),
                  title: "Owner Reporting",
                  description: "Monthly income statements and performance analytics"
                }
              ].map((service, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-[rgb(247,219,190)]/20 rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
                  <div className="relative p-8 text-center bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20 hover:bg-white/80 transition-all duration-500">
                    <div className="w-20 h-20 bg-[rgb(247,219,190)] rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-6 transition-all duration-500">
                      <div className="text-gray-700">
                        {service.icon}
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-[rgb(0,0,0)] mb-4">{service.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="py-24 bg-gradient-to-br from-[rgb(248,252,255)] via-white to-[rgb(247,247,247)] rounded-3xl my-16">
            <div className="text-center mb-20 px-8">
              <div className="inline-block bg-[rgb(247,219,190)]/20 rounded-full px-6 py-2 mb-6">
                <span className="text-gray-700 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
              </div>
              <h2 className="text-5xl font-bold text-[rgb(0,0,0)] mb-8">Why Choose Wavescation</h2>
              <div className="w-24 h-1 bg-gray-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-8">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                  ),
                  title: "Prime Location Focus",
                  description: "Specializing in high-demand Dubai tourist zones"
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  ),
                  title: "Guaranteed Returns",
                  description: "Peace of mind with guaranteed minimum returns"
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 1a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                    </svg>
                  ),
                  title: "Flexible Agreements",
                  description: "No long-term lock-ins, cancel with 30 days' notice"
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4z" clipRule="evenodd"/>
                      <path d="M11 15a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zM11 7a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V7zM11 3a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V3z"/>
                    </svg>
                  ),
                  title: "Transparent Operations",
                  description: "No hidden fees with clear reporting"
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                    </svg>
                  ),
                  title: "Guest Satisfaction",
                  description: "Exceptional service resulting in repeat bookings and 5-star reviews"
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                  ),
                  title: "WavesGlobal Partnership",
                  description: "Creative event experiences through our sister company"
                }
              ].map((feature, index) => (
                <div key={index} className="group text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/30 hover:bg-white hover:shadow-xl transition-all duration-500">
                  <div className="w-16 h-16 bg-[rgb(247,219,190)] rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-all duration-500">
                    <div className="text-gray-700">
                      {feature.icon}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-[rgb(0,0,0)] mb-3">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="relative" style={{ background: 'rgb(247, 219, 190)' }}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <div className="mb-8">
              <svg className="w-16 h-16 text-gray-700 mx-auto mb-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-4xl font-bold mb-8 text-gray-800">Get In Touch With Us</h3>
            <div className="space-y-4 text-xl font-light text-gray-700">
              <p className="flex items-center justify-center space-x-3">
              <a
  href="https://www.google.com/maps/place/Iris+Bay+Tower/@25.1858998,55.2575013,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f69001c8d0399:0x8f6d40395efc45af!8m2!3d25.1858998!4d55.2600762!16s%2Fg%2F11y32dlhtl"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center space-x-3 hover:text-gray-900 transition-colors duration-300"
>
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
  <span>Iris Bay Tower, Business Bay, Dubai</span>
</a>

              </p>
              <a 
                href="tel:+971522596860" 
                className="flex items-center justify-center space-x-3 hover:text-gray-900 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <span>+971522596860</span>
              </a>
              <a 
                href="mailto:Info@wavescation.com" 
                className="flex items-center justify-center space-x-3 hover:text-gray-900 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <span>Info@wavescation.com</span>
              </a>
            </div>
            <div className="mt-12">
              <a
                href="mailto:Info@wavescation.com"
                className="bg-white text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg inline-block"
              >
                Contact Us Today
              </a>
            </div>
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