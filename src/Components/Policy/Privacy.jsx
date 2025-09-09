import React from 'react';
import logo from '../../assets/logo.png';
import Navbar from '../../Layout/Navbar';
import Footer from '../../Layout/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(247,247,247)] via-white to-[rgb(248,252,255)]">
      <div className="h-16 bg-white/80 backdrop-blur-sm border-b border-gray-200 fixed w-full z-10"></div>
      <Navbar/>
      
      <div className="pt-20 pb-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden" style={{ background: 'rgb(247, 219, 190)' }}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <div className="mb-8 inline-block">
              <img src={logo} alt="Wavescation" className="h-32 mx-auto" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-gray-800">Privacy Policy</h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-gray-700">
              Your privacy is important to us. Learn how we protect your personal information.
            </p>
            <div className="mt-12 w-24 h-1 bg-gray-600 mx-auto rounded-full"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[rgb(247,247,247)] to-transparent"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Last Updated */}
          <div className="py-12">
            <div className="bg-gradient-to-r from-[rgb(248,252,255)]/50 to-[rgb(247,219,190)]/20 rounded-2xl p-6 text-center">
              <p className="text-gray-600 text-lg">
                <span className="font-semibold text-gray-800">Last Updated:</span> September 2025
              </p>
            </div>
          </div>

          {/* Introduction */}
          <div className="py-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border border-white/20">
              <div className="inline-block bg-[rgb(247,219,190)]/20 rounded-full px-6 py-2 mb-6">
                <span className="text-gray-700 font-semibold text-sm uppercase tracking-wider">Introduction</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[rgb(0,0,0)] mb-6">How We Handle Your Information</h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Wavescation Holiday Homes ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our holiday home management services, visit our website, or interact with our platform.
                </p>
                <p className="text-lg">
                  As a DTCM-licensed holiday home management company based in Dubai, we adhere to UAE data protection regulations and international privacy standards to ensure your personal information is handled with the utmost care.
                </p>
              </div>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="py-12">
            <div className="bg-gradient-to-br from-[rgb(248,252,255)] via-white to-[rgb(247,247,247)] rounded-3xl p-8 md:p-12 shadow-lg">
              <div className="inline-block bg-[rgb(247,219,190)]/20 rounded-full px-6 py-2 mb-6">
                <span className="text-gray-700 font-semibold text-sm uppercase tracking-wider">Data Collection</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[rgb(0,0,0)] mb-8">Information We Collect</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/70 rounded-2xl p-6 border border-white/30">
                  <div className="w-12 h-12 bg-[rgb(247,219,190)] rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[rgb(0,0,0)] mb-4">Personal Information</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Name and contact details</li>
                    <li>• Email address and phone number</li>
                    <li>• Property ownership documents</li>
                    <li>• Emirates ID or passport information</li>
                    <li>• Banking and payment information</li>
                  </ul>
                </div>
                
                <div className="bg-white/70 rounded-2xl p-6 border border-white/30">
                  <div className="w-12 h-12 bg-[rgb(247,219,190)] rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[rgb(0,0,0)] mb-4">Technical Information</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Website usage data and analytics</li>
                    <li>• Device information and IP address</li>
                    <li>• Booking platform interactions</li>
                    <li>• Communication records</li>
                    <li>• Property performance metrics</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="py-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border border-white/20">
              <div className="inline-block bg-[rgb(247,219,190)]/20 rounded-full px-6 py-2 mb-6">
                <span className="text-gray-700 font-semibold text-sm uppercase tracking-wider">Data Usage</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[rgb(0,0,0)] mb-8">How We Use Your Information</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                      </svg>
                    ),
                    title: "Service Delivery",
                    description: "Managing your property, processing bookings, and providing our holiday home services"
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                    ),
                    title: "Communication",
                    description: "Contacting you about bookings, payments, maintenance, and service updates"
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    ),
                    title: "Legal Compliance",
                    description: "Meeting DTCM licensing requirements and UAE regulatory obligations"
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center p-6 bg-[rgb(248,252,255)]/30 rounded-2xl border border-white/20">
                    <div className="w-12 h-12 bg-[rgb(247,219,190)] rounded-xl flex items-center justify-center mx-auto mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-[rgb(0,0,0)] mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Information Sharing */}
          <div className="py-12">
            <div className="bg-gradient-to-r from-[rgb(248,252,255)]/50 via-white to-[rgb(247,219,190)]/20 rounded-3xl p-8 md:p-12 shadow-lg">
              <div className="inline-block bg-[rgb(247,219,190)]/20 rounded-full px-6 py-2 mb-6">
                <span className="text-gray-700 font-semibold text-sm uppercase tracking-wider">Data Sharing</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[rgb(0,0,0)] mb-8">When We Share Information</h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div className="bg-white/70 rounded-2xl p-6 border border-white/30">
                  <h3 className="text-xl font-bold text-[rgb(0,0,0)] mb-4">We may share your information with:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[rgb(247,219,190)] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Booking platforms</strong> (Airbnb, Booking.com, Expedia) to manage your property listings and reservations</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[rgb(247,219,190)] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Service providers</strong> including our cleaning team, maintenance contractors, and payment processors</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[rgb(247,219,190)] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>WavesGlobal Event Company</strong> for enhanced guest experiences and event services</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[rgb(247,219,190)] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Legal authorities</strong> when required by UAE law or DTCM regulations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="py-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border border-white/20">
              <div className="inline-block bg-[rgb(247,219,190)]/20 rounded-full px-6 py-2 mb-6">
                <span className="text-gray-700 font-semibold text-sm uppercase tracking-wider">Security</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[rgb(0,0,0)] mb-8">Data Security & Protection</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-[rgb(248,252,255)]/50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-[rgb(0,0,0)] mb-4">Security Measures</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Encrypted data transmission and storage</li>
                      <li>• Secure payment processing systems</li>
                      <li>• Limited access to personal information</li>
                      <li>• Regular security audits and updates</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-[rgb(247,219,190)]/20 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-[rgb(0,0,0)] mb-4">Data Retention</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We retain your personal information only as long as necessary to provide our services, comply with legal obligations, and resolve disputes. Property owner information is retained throughout the service period and for 7 years thereafter as required by UAE business regulations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="py-12">
            <div className="bg-gradient-to-br from-[rgb(248,252,255)] via-white to-[rgb(247,247,247)] rounded-3xl p-8 md:p-12 shadow-lg">
              <div className="inline-block bg-[rgb(247,219,190)]/20 rounded-full px-6 py-2 mb-6">
                <span className="text-gray-700 font-semibold text-sm uppercase tracking-wider">Your Rights</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[rgb(0,0,0)] mb-8">Your Privacy Rights</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                      </svg>
                    ),
                    title: "Access",
                    description: "Request a copy of your personal data"
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                      </svg>
                    ),
                    title: "Correct",
                    description: "Update or correct inaccurate information"
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                    ),
                    title: "Delete",
                    description: "Request deletion of your data"
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                      </svg>
                    ),
                    title: "Restrict",
                    description: "Limit how we use your information"
                  }
                ].map((right, index) => (
                  <div key={index} className="text-center p-6 bg-white/70 rounded-2xl border border-white/30">
                    <div className="w-12 h-12 bg-[rgb(247,219,190)] rounded-xl flex items-center justify-center mx-auto mb-4">
                      {right.icon}
                    </div>
                    <h3 className="text-lg font-bold text-[rgb(0,0,0)] mb-3">{right.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{right.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="py-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border border-white/20">
              <div className="inline-block bg-[rgb(247,219,190)]/20 rounded-full px-6 py-2 mb-6">
                <span className="text-gray-700 font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[rgb(0,0,0)] mb-8">Questions About Your Privacy?</h2>
              <div className="text-gray-700 leading-relaxed">
                <p className="text-lg mb-6">
                  If you have any questions about this Privacy Policy or how we handle your personal information, please contact us:
                </p>
                <div className="space-y-4 text-xl font-light text-gray-700 mt-6">
  <p className="flex items-center space-x-3">
    <a
      href="https://www.google.com/maps/place/Iris+Bay+Tower/@25.1858998,55.2575013,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f69001c8d0399:0x8f6d40395efc45af!8m2!3d25.1858998!4d55.2600762!16s%2Fg%2F11y32dlhtl"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-3 hover:text-gray-900 transition-colors duration-300"
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
    className="flex items-center space-x-3 hover:text-gray-900 transition-colors duration-300"
  >
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
    </svg>
    <span>+971522596860</span>
  </a>

  <a
    href="mailto:info@wavescation.com"
    className="flex items-center space-x-3 hover:text-gray-900 transition-colors duration-300"
  >
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25v.44l-9.75 5.7-9.75-5.7v-.44z" />
      <path d="M2.25 8.66v8.59a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25V8.66l-9.75 5.7-9.75-5.7z" />
    </svg>
    <span>info@wavescation.com</span>
  </a>
</div>


              </div>
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