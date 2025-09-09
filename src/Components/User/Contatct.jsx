import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, User, Building } from 'lucide-react';
import { toast } from 'react-toastify';
import Navbar from '../../Layout/Navbar';
import Footer from '../../Layout/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Office Address',
      details: ['Iris Tower, Business Bay', 'Dubai, UAE'],
      color: 'text-gray-700',
      href: 'https://maps.google.com/?q=Iris+Tower+Business+Bay+Dubai+UAE'
    },
    {
      icon: Phone,
      title: 'Phone Number',
      details: ['+971 52 259 6860'],
      color: 'text-gray-700',
      href: 'tel:+971522596860'
    },
    {
      icon: Mail,
      title: 'Email Address',
      details: ['info@wavesglobal.ae'],
      color: 'text-gray-700',
      href: 'mailto:info@wavesglobal.ae'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat - Sun: 10:00 AM - 4:00 PM'],
      color: 'text-gray-700'
    }
  ];

  const teamMembers = [
    {
      name: 'Mrs. Surya Sijil',
      position: 'Managing Director',
      icon: User
    },
    {
      name: 'Mr. Sijil Sidharthan',
      position: 'CEO',
      icon: User
    },
    {
      name: 'Mr. Aghil Shajahan',
      position: 'Operation Manager',
      icon: User
    }
  ];

  const services = [
    'Full Property Management',
    'Dynamic Pricing Strategies',
    '24/7 Guest Communication',
    'Professional Photography',
    'Maintenance & Housekeeping',
    'Owner Reporting'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-28">
        
        <div style={{ background: 'rgb(247, 219, 190)' }} className="text-gray-800 py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your property into a premium holiday home? Contact Wavescation today and discover how we can maximize your returns while providing exceptional guest experiences.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
                  <Send className="w-6 h-6 text-gray-700" />
                  Send Us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type</label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="property">Property Management</option>
                        <option value="booking">Guest Booking</option>
                        <option value="partnership">Partnership</option>
                        <option value="support">Support</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                      placeholder="Enter message subject"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-transparent resize-none"
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{ backgroundColor: 'rgb(247, 219, 190)' }}
                    className="w-full text-gray-800 py-3 px-6 rounded-xl hover:bg-opacity-80 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 font-medium"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-black mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div style={{ backgroundColor: 'rgba(247, 219, 190, 0.2)' }} className="w-12 h-12 rounded-xl flex items-center justify-center">
                            <IconComponent className={`w-6 h-6 ${info.color}`} />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-black mb-1">{info.title}</h4>
                          {info.details.map((detail, idx) => (
                            info.href ? (
                              <a key={idx} href={info.href} className="text-blue-600 hover:text-blue-800 text-sm block">
                                {detail}
                              </a>
                            ) : (
                              <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                            )
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">Why Choose Wavescation?</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Dubai's most trusted holiday home management company, specializing in premium short-term rentals in Downtown Dubai, JBR, Palm Jumeirah and other high-demand locations.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgb(247, 219, 190)' }} className="text-gray-800 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Join the WavesGlobal Group family and experience hassle-free property management with guaranteed minimum returns and exceptional guest experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+971522596860"
                className="bg-white text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
              <a
                href="https://www.wavescation.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-white hover:text-gray-800 transition-colors"
              >
                Visit Our Website
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
      <Footer />
    </div>
  );
};

export default ContactPage;