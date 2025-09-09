import React from 'react';
import logo from '../../assets/logo.png';
import Navbar from '../../Layout/Navbar';
import Footer from '../../Layout/Footer';

export default function TermsConditions() {
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
              <img src={logo} alt="Wavescation" className="h-24 mx-auto" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-gray-800">Terms & Conditions</h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-gray-700">
              Please read these terms carefully before using our services
            </p>
            <div className="mt-12 w-24 h-1 bg-gray-600 mx-auto rounded-full"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[rgb(247,247,247)] to-transparent"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Last Updated */}
          <div className="mb-12 text-center">
            <div className="inline-block bg-[rgb(247,219,190)]/20 rounded-full px-6 py-2">
              <span className="text-gray-700 font-semibold text-sm uppercase tracking-wider">Last Updated: January 2025</span>
            </div>
          </div>

          <div className="space-y-12">
            {/* Introduction */}
            <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30">
              <h2 className="text-2xl md:text-3xl font-bold text-[rgb(0,0,0)] mb-6">1. Introduction</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Welcome to Wavescation Holiday Homes. These Terms and Conditions ("Terms") govern your use of our holiday home rental services and website. By accessing or using our services, you agree to be bound by these Terms.
                </p>
                <p>
                  Wavescation Holiday Homes is a DTCM-licensed holiday home management company based in Dubai, specializing in premium short-term rentals in prime locations including Downtown Dubai, Jumeirah Beach Residence (JBR), and Palm Jumeirah.
                </p>
              </div>
            </section>

            {/* Definitions */}
            <section className="bg-gradient-to-r from-[rgb(248,252,255)]/50 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30">
              <h2 className="text-2xl md:text-3xl font-bold text-[rgb(0,0,0)] mb-6">2. Definitions</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <p><span className="font-bold text-[rgb(0,0,0)]">"Service"</span> - Holiday home rental and management services provided by Wavescation</p>
                    <p><span className="font-bold text-[rgb(0,0,0)]">"Guest"</span> - Any person booking or staying at our properties</p>
                    <p><span className="font-bold text-[rgb(0,0,0)]">"Property"</span> - Any accommodation managed by Wavescation</p>
                  </div>
                  <div className="space-y-3">
                    <p><span className="font-bold text-[rgb(0,0,0)]">"Owner"</span> - Property owner partnering with Wavescation</p>
                    <p><span className="font-bold text-[rgb(0,0,0)]">"Agreement"</span> - The booking contract between guest and Wavescation</p>
                    <p><span className="font-bold text-[rgb(0,0,0)]">"Platform"</span> - Our website and booking systems</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Booking Terms */}
            <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30">
              <h2 className="text-2xl md:text-3xl font-bold text-[rgb(0,0,0)] mb-6">3. Booking Terms</h2>
              <div className="space-y-6">
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <h3 className="text-xl font-bold text-[rgb(0,0,0)]">3.1 Reservation Process</h3>
                  <div className="space-y-2 pl-4">
                    <p>• All bookings are subject to availability and confirmation</p>
                    <p>• A valid credit card is required to secure your reservation</p>
                    <p>• Full payment is typically required at the time of booking</p>
                    <p>• Confirmation will be sent within 24 hours of booking</p>
                  </div>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <h3 className="text-xl font-bold text-[rgb(0,0,0)]">3.2 Minimum Stay Requirements</h3>
                  <p>Properties may have minimum stay requirements, especially during peak seasons and holidays. These requirements will be clearly stated at the time of booking.</p>
                </div>
              </div>
            </section>

            {/* Payment Terms */}
            <section className="bg-gradient-to-r from-[rgb(248,252,255)]/50 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30">
              <h2 className="text-2xl md:text-3xl font-bold text-[rgb(0,0,0)] mb-6">4. Payment Terms</h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-[rgb(0,0,0)]">4.1 Payment Methods</h3>
                    <div className="space-y-2 text-gray-700">
                      <p>• Credit/Debit Cards</p>
                      <p>• Bank Transfers</p>
                      <p>• Digital Wallets</p>
                      <p>• Cash (in specific circumstances)</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-[rgb(0,0,0)]">4.2 Additional Fees</h3>
                    <div className="space-y-2 text-gray-700">
                      <p>• Tourism Dirham (as per DTCM rates)</p>
                      <p>• Security Deposit (refundable)</p>
                      <p>• Cleaning Fee (if applicable)</p>
                      <p>• Late Check-out Charges</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Guest Responsibilities */}
            <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30">
              <h2 className="text-2xl md:text-3xl font-bold text-[rgb(0,0,0)] mb-6">5. Guest Responsibilities</h2>
              <div className="space-y-6">
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <h3 className="text-xl font-bold text-[rgb(0,0,0)]">5.1 Property Care</h3>
                  <p>Guests are responsible for treating the property with care and respect, as they would their own home. Any damages beyond normal wear and tear will be charged to the guest.</p>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <h3 className="text-xl font-bold text-[rgb(0,0,0)]">5.2 House Rules</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p>• No smoking inside properties</p>
                      <p>• Respect noise policies and neighbors</p>
                      <p>• Maximum occupancy limits must be observed</p>
                      <p>• No unauthorized parties or events</p>
                    </div>
                    <div className="space-y-2">
                      <p>• Proper waste disposal</p>
                      <p>• Report any issues immediately</p>
                      <p>• Follow building rules and regulations</p>
                      <p>• Return keys/access cards on checkout</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Liability */}
            <section className="bg-gradient-to-r from-[rgb(248,252,255)]/50 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30">
              <h2 className="text-2xl md:text-3xl font-bold text-[rgb(0,0,0)] mb-6">6. Liability and Insurance</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Wavescation Holiday Homes maintains comprehensive insurance coverage for all managed properties. However, guests are advised to obtain travel insurance to cover personal belongings and potential medical expenses.
                </p>
                <p>
                  We are not liable for any loss, damage, or injury to guests or their belongings unless directly caused by our negligence. Guests participate in all activities at their own risk.
                </p>
              </div>
            </section>

            {/* Termination */}
            <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30">
              <h2 className="text-2xl md:text-3xl font-bold text-[rgb(0,0,0)] mb-6">7. Termination</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We reserve the right to terminate any booking and require immediate departure if guests violate these terms, engage in illegal activities, or behave in a manner that disturbs other guests or neighbors.
                </p>
                <p>
                  No refund will be provided in cases of termination due to guest misconduct.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            {/* <section className="bg-[rgb(247,219,190)]/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[rgb(0,0,0)] mb-6">Questions About These Terms?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  <span>+971522596860</span>
                </p>
                <p className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  <span>wavescation.com</span>
                </p>
                <p className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  <span>Iris Tower, Business Bay, Dubai</span>
                </p>
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