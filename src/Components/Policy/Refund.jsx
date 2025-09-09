import React from 'react';
import logo from '../../assets/logo.png';
import Navbar from '../../Layout/Navbar';
import Footer from '../../Layout/Footer';

export default function CancellationsRefunds() {
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-gray-800">
              Cancellations & Refunds
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-gray-700">
              Understanding our cancellation policy and refund procedures
            </p>
            <div className="mt-12 w-24 h-1 bg-gray-600 mx-auto rounded-full"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[rgb(247,247,247)] to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Last Updated */}
          <div className="py-12">
            <div className="text-center">
              <div className="inline-block bg-[rgb(247,219,190)]/20 rounded-full px-6 py-2 mb-6">
                <span className="text-gray-700 font-semibold text-sm uppercase tracking-wider">
                  Last Updated: January 2025
                </span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="py-16">
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <div className="sticky top-32">
                  <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl">
                    <h3 className="text-2xl font-bold text-[rgb(0,0,0)] mb-6">Quick Navigation</h3>
                    <nav className="space-y-4">
                      {[
                        { title: "Guest Cancellations", href: "#guest-cancellations" },
                        { title: "Refund Process", href: "#refund-process" },
                        { title: "Owner Cancellations", href: "#owner-cancellations" },
                        { title: "Force Majeure", href: "#force-majeure" },
                        { title: "Contact Information", href: "#contact-info" }
                      ].map((item, index) => (
                        <a
                          key={index}
                          href={item.href}
                          className="block text-gray-700 hover:text-[rgb(0,0,0)] font-medium transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-[rgb(247,219,190)]/20"
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2 space-y-16">
                
                {/* Guest Cancellations */}
                <section id="guest-cancellations" className="group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[rgb(247,219,190)]/10 rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
                    <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/30 shadow-xl">
                      <div className="flex items-center mb-8">
                        <div className="w-16 h-16 bg-[rgb(247,219,190)] rounded-2xl flex items-center justify-center mr-6">
                          <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[rgb(0,0,0)]">Guest Cancellations</h2>
                      </div>

                      <div className="space-y-8 text-gray-700">
                        <div>
                          <h3 className="text-2xl font-bold text-[rgb(0,0,0)] mb-4">Flexible Cancellation Policy</h3>
                          <p className="text-lg leading-relaxed mb-6">
                            At Wavescation, we understand that travel plans can change unexpectedly. Our cancellation policy is designed to be fair and flexible while protecting both our guests and property owners.
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-[rgb(248,252,255)]/50 to-white/50 rounded-2xl p-6 border border-gray-100">
                          <h4 className="text-xl font-bold text-[rgb(0,0,0)] mb-4">Cancellation Timeline & Refunds:</h4>
                          <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-semibold text-[rgb(0,0,0)]">48+ hours before check-in:</p>
                                <p>Full refund minus processing fees (typically 3-5% of booking value)</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-semibold text-[rgb(0,0,0)]">24-48 hours before check-in:</p>
                                <p>50% refund of the total booking amount</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="font-semibold text-[rgb(0,0,0)]">Less than 24 hours or no-show:</p>
                                <p>No refund available</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xl font-bold text-[rgb(0,0,0)] mb-4">How to Cancel Your Booking:</h4>
                          <div className="space-y-3 text-lg">
                            <p>• Contact our support team at +971522596860</p>
                            <p>• Email us with your booking reference number</p>
                            <p>• Use the cancellation link in your booking confirmation</p>
                            <p>• Cancel through the platform where you made your reservation</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Refund Process */}
                <section id="refund-process" className="group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[rgb(247,219,190)]/10 rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
                    <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/30 shadow-xl">
                      <div className="flex items-center mb-8">
                        <div className="w-16 h-16 bg-[rgb(247,219,190)] rounded-2xl flex items-center justify-center mr-6">
                          <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
                          </svg>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[rgb(0,0,0)]">Refund Process</h2>
                      </div>

                      <div className="space-y-8 text-gray-700">
                        <div className="bg-gradient-to-r from-[rgb(248,252,255)]/50 to-white/50 rounded-2xl p-6 border border-gray-100">
                          <h4 className="text-xl font-bold text-[rgb(0,0,0)] mb-4">Processing Timeline:</h4>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="text-center p-4 bg-white/80 rounded-xl">
                              <div className="text-3xl font-bold text-[rgb(0,0,0)] mb-2">3-5 Days</div>
                              <p className="text-sm">Credit Card Refunds</p>
                            </div>
                            <div className="text-center p-4 bg-white/80 rounded-xl">
                              <div className="text-3xl font-bold text-[rgb(0,0,0)] mb-2">5-10 Days</div>
                              <p className="text-sm">Bank Transfer Refunds</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xl font-bold text-[rgb(0,0,0)] mb-4">Refund Methods:</h4>
                          <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                              <p>Refunds are processed to the original payment method</p>
                            </div>
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                              <p>Alternative refund methods may be available upon request</p>
                            </div>
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                              <p>Processing fees are non-refundable</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-[rgb(247,219,190)]/20 rounded-2xl p-6 border border-[rgb(247,219,190)]/30">
                          <h4 className="text-xl font-bold text-[rgb(0,0,0)] mb-3">Important Note:</h4>
                          <p className="text-lg">
                            Refund processing times may vary depending on your bank or payment provider. 
                            We'll provide you with a refund confirmation once the process is initiated.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Owner Cancellations */}
                <section id="owner-cancellations" className="group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[rgb(247,219,190)]/10 rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
                    <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/30 shadow-xl">
                      <div className="flex items-center mb-8">
                        <div className="w-16 h-16 bg-[rgb(247,219,190)] rounded-2xl flex items-center justify-center mr-6">
                          <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                          </svg>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[rgb(0,0,0)]">Owner Cancellations</h2>
                      </div>

                      <div className="space-y-8 text-gray-700">
                        <div>
                          <p className="text-lg leading-relaxed mb-6">
                            In the rare event that a property owner needs to cancel a confirmed booking, 
                            Wavescation takes full responsibility to ensure our guests are properly accommodated.
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-[rgb(248,252,255)]/50 to-white/50 rounded-2xl p-6 border border-gray-100">
                          <h4 className="text-xl font-bold text-[rgb(0,0,0)] mb-4">Our Guarantee to Guests:</h4>
                          <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <p><span className="font-semibold text-[rgb(0,0,0)]">Full Refund:</span> Immediate refund of all payments made</p>
                            </div>
                            <div className="flex items-start space-x-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <p><span className="font-semibold text-[rgb(0,0,0)]">Alternative Accommodation:</span> We'll find you comparable or upgraded accommodation at no extra cost</p>
                            </div>
                            <div className="flex items-start space-x-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <p><span className="font-semibold text-[rgb(0,0,0)]">Compensation:</span> Additional compensation for any inconvenience caused</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Force Majeure */}
                <section id="force-majeure" className="group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[rgb(247,219,190)]/10 rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
                    <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/30 shadow-xl">
                      <div className="flex items-center mb-8">
                        <div className="w-16 h-16 bg-[rgb(247,219,190)] rounded-2xl flex items-center justify-center mr-6">
                          <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[rgb(0,0,0)]">Force Majeure & Extraordinary Circumstances</h2>
                      </div>

                      <div className="space-y-8 text-gray-700">
                        <div>
                          <p className="text-lg leading-relaxed mb-6">
                            In cases of extraordinary circumstances beyond our control, special cancellation and refund policies may apply.
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-[rgb(248,252,255)]/50 to-white/50 rounded-2xl p-6 border border-gray-100">
                          <h4 className="text-xl font-bold text-[rgb(0,0,0)] mb-4">Covered Circumstances Include:</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0"></div>
                                <p>Natural disasters</p>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0"></div>
                                <p>Government travel restrictions</p>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0"></div>
                                <p>Pandemic-related closures</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0"></div>
                                <p>Civil unrest or political instability</p>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0"></div>
                                <p>Infrastructure failures</p>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-gray-600 rounded-full flex-shrink-0"></div>
                                <p>Medical emergencies</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-[rgb(247,219,190)]/20 rounded-2xl p-6 border border-[rgb(247,219,190)]/30">
                          <h4 className="text-xl font-bold text-[rgb(0,0,0)] mb-3">Our Response:</h4>
                          <p className="text-lg mb-4">
                            In such circumstances, we work with guests on a case-by-case basis to provide:
                          </p>
                          <div className="space-y-2">
                            <p>• Full refunds or rebooking options</p>
                            <p>• Credit vouchers for future stays</p>
                            <p>• Flexible date changes without penalties</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </div>

          {/* Contact Section */}
          {/* <section id="contact-info" className="py-24 bg-gradient-to-br from-[rgb(248,252,255)] via-white to-[rgb(247,247,247)] rounded-3xl my-16">
            <div className="text-center mb-12 px-8">
              <div className="inline-block bg-[rgb(247,219,190)]/20 rounded-full px-6 py-2 mb-6">
                <span className="text-gray-700 font-semibold text-sm uppercase tracking-wider">Need Help?</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[rgb(0,0,0)] mb-8">Contact Our Support Team</h2>
              <div className="w-24 h-1 bg-gray-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="max-w-4xl mx-auto px-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl">
                  <div className="w-16 h-16 bg-[rgb(247,219,190)] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[rgb(0,0,0)] mb-4">Phone Support</h3>
                  <p className="text-xl text-gray-700 mb-4">+971522596860</p>
                  <p className="text-gray-600">Available 24/7 for urgent matters</p>
                </div>
                
                <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl">
                  <div className="w-16 h-16 bg-[rgb(247,219,190)] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[rgb(0,0,0)] mb-4">Email Support</h3>
                  <p className="text-xl text-gray-700 mb-4">support@wavescation.com</p>
                  <p className="text-gray-600">Response within 2-4 hours</p>
                </div>
              </div>
              
              <div className="text-center mt-12">
                <p className="text-lg text-gray-700 mb-8">
                  When contacting us about cancellations, please have your booking reference number ready.
                </p>
                <button className="bg-[rgb(247,219,190)] text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-[rgb(237,209,180)] transform hover:scale-105 transition-all duration-300 shadow-lg">
                  Contact Support Now
                </button>
              </div>
            </div>
          </section> */}

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