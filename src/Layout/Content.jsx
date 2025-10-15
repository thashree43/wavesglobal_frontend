import React, { useEffect, useState, useRef } from 'react';
import {
  Search,
  Calendar,
  Users,
  MapPin,
  Shield,
  Award,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  CalendarDays,
  ArrowRight
} from 'lucide-react';
import Airbnb from "../assets/Airbnb.png";
import Booking from "../assets/Booking.png";
import Expedia from "../assets/Expedia.png";
import Trivago from "../assets/Trivago.png";
import Hotels from "../assets/Hotels.png";
import Agoda from "../assets/Agoda.png";
import axios from 'axios';
import { baseurl } from '../Base/Base';
import { useNavigate } from 'react-router-dom';

const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
      }`}
    >
      {children}
    </div>
  );
};

const FloatingCard = ({ children, delay = 0 }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transform transition-opacity transition-transform duration-500 ease-out will-change-transform ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const LocationSkeleton = () => (
  <div className="relative overflow-hidden rounded-2xl shadow-xl animate-pulse">
    <div className="h-48 bg-gray-300"></div>
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <div className="h-5 bg-gray-400 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-400 rounded w-1/2"></div>
    </div>
  </div>
);

const ContentSections = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [locations, setLocations] = useState([]);
  const [locationsLoading, setLocationsLoading] = useState(true);
  const navigate = useNavigate();

  const getlocation = async () => {
    try {
      sessionStorage.removeItem('homeLocations');
      
      const response = await axios.get(`${baseurl}user/location`);
      const locationData = response.data.location;
      
      console.log('Fetched locations:', locationData);
      
      setLocations(locationData);
      sessionStorage.setItem('homeLocations', JSON.stringify(locationData));
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLocationsLoading(false);
    }
  };

  useEffect(() => {
    getlocation();
  }, []);

  const partners = [
    { name: "Airbnb", logo: Airbnb },
    { name: "Booking.com", logo: Booking },
    { name: "Expedia", logo: Expedia },
    { name: "Trivago", logo: Trivago },
    { name: "Hotels.com", logo: Hotels },
    { name: "Agoda", logo: Agoda },
  ];

  const howItWorks = [
    { step: '1', title: 'Search', desc: 'Browse our curated collection of premium holiday homes', icon: Search },
    { step: '2', title: 'Select', desc: 'Choose your perfect Dubai staycation destination', icon: MapPin },
    { step: '3', title: 'Book', desc: 'Secure your booking with instant confirmation', icon: Calendar },
    { step: '4', title: 'Enjoy', desc: 'Experience exceptional hospitality and comfort', icon: Star }
  ];

  const whyChooseUs = [
    { title: 'Prime Location Focus', desc: 'Specializing in high-demand Dubai tourist zones like Downtown and Palm Jumeirah' },
    { title: '5-Star Hospitality Standards', desc: 'In-house cleaning and maintenance team ensuring exceptional quality' },
    { title: 'Transparent Operations', desc: 'No hidden fees with clear reporting and flexible agreements' },
    { title: 'Guest Satisfaction Guaranteed', desc: 'Exceptional service resulting in repeat bookings and 5-star reviews' }
  ];

  const services = [
    { title: 'Complete Property Management', desc: 'Full handling of operations from listings to guest check-outs', icon: '🏠' },
    { title: '24/7 Guest Hosting', desc: 'Round-the-clock guest communication and concierge services', icon: '🛎️' },
    { title: 'Professional Marketing', desc: 'Premium listings on Airbnb, Booking.com, and Expedia', icon: '📸' },
    { title: 'Dynamic Pricing', desc: 'Market-driven pricing strategies to maximize returns', icon: '💰' },
    { title: 'In-House Maintenance', desc: 'Regular upkeep by our dedicated cleaning and maintenance team', icon: '🔧' },
    { title: 'Creative Event Experiences', desc: 'Unique events and curated experiences through WavesGlobal', icon: '🎉' }
  ];

  const faqs = [
    { q: 'What makes Wavescation different from other holiday home companies?', a: 'We are DTCM-licensed with in-house cleaning and maintenance teams, ensuring 5-star hospitality standards. As part of WavesGlobal Group, we also offer unique event experiences.' },
    { q: 'Do you offer guaranteed minimum returns?', a: 'Yes, we offer property owners complete peace of mind with Guaranteed Minimum Annual Rental Income. If your property doesn\'t reach the agreed target, we cover the balance.' },
    { q: 'Can I use my property for personal stays?', a: 'Absolutely! Owners can block dates and use their property whenever they want for personal stays, offering flexibility unlike long-term leasing.' },
    { q: 'What locations do you specialize in?', a: 'We focus on prime Dubai locations including Downtown Dubai, Jumeirah Beach Residence (JBR), Palm Jumeirah, and other high-demand tourist areas.' },
    { q: 'How flexible are your agreements?', a: 'We offer flexible agreements with no long-term lock-ins. You can cancel with just 30 days\' notice, providing complete flexibility.' }
  ];

  const reviews = [
    { name: 'Sarah Johnson', rating: 5, review: 'Exceptional service and spotless property! The attention to detail was remarkable.', location: 'Downtown Dubai' },
    { name: 'Ahmed Al-Rashid', rating: 5, review: 'The property exceeded expectations. Professional management from start to finish.', location: 'Palm Jumeirah' },
    { name: 'Emma Thompson', rating: 5, review: 'Outstanding hospitality standards. Felt like staying in a luxury hotel!', location: 'JBR' },
    { name: 'Omar Hassan', rating: 5, review: 'Perfect for our family vacation. Will definitely book with Wavescation again!', location: 'Business Bay' }
  ];

  const handleViewAllProperties = () => {
    navigate('/property');
  };

  return (
    <div style={{ paddingTop: '2rem', position: 'relative', zIndex: 1 }}>
      <section className="py-20 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-16" style={{ color: 'rgb(0, 31, 60)' }}>Our Platform Partners</h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <FloatingCard key={index} delay={index * 100}>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group" 
                     style={{ border: '1px solid rgb(247, 219, 190)' }}
                     onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgb(231, 121, 0)'}
                     onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgb(247, 219, 190)'}>
                  <div className="h-16 flex items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-12 max-w-full object-contain transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 relative overflow-hidden" style={{ backgroundColor: 'rgb(247, 219, 190)' }}>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div>
                <h2 className="text-4xl font-bold mb-8" style={{ color: 'rgb(0, 31, 60)' }}>
                  Why Choose Wavescation?
                </h2>
                <p className="text-xl mb-12 leading-relaxed" style={{ color: 'rgb(4, 80, 115)' }}>
                  Dubai's most trusted DTCM-licensed holiday home management company, delivering exceptional experiences through world-class hospitality.
                </p>
                <div className="space-y-8">
                  {whyChooseUs.map((item, index) => (
                    <AnimatedSection key={index} delay={index * 150}>
                      <div className="flex items-start gap-4 group">
                        <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300" style={{ backgroundColor: 'rgb(231, 121, 0)' }}></div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(0, 31, 60)' }}>
                            {item.title}
                          </h3>
                          <p style={{ color: 'rgb(4, 80, 115)' }}>{item.desc}</p>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={300}>
              <div className="relative">
                <div className="rounded-3xl p-8 transform rotate-3 shadow-2xl hover:rotate-6 transition-transform duration-300" style={{ backgroundColor: 'rgb(231, 121, 0)' }}>
                  <div className="bg-white rounded-2xl p-8 transform -rotate-3 hover:-rotate-6 transition-transform duration-300">
                    <div className="text-6xl text-center mb-4">🏖️</div>
                    <h3 className="text-2xl font-bold text-center mb-4" style={{ color: 'rgb(0, 31, 60)' }}>Premium Holiday Homes</h3>
                    <p className="text-center" style={{ color: 'rgb(4, 80, 115)' }}>Steps from everything, Miles from ordinary</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-16" style={{ color: 'rgb(0, 31, 60)' }}>
              How It Works
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <FloatingCard key={index} delay={index * 200}>
                  <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center group transform hover:-translate-y-2" 
                       style={{ border: '1px solid rgb(247, 219, 190)' }}
                       onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgb(231, 121, 0)'}
                       onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgb(247, 219, 190)'}>
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white font-bold text-2xl transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'rgb(231, 121, 0)' }}>
                        {step.step}
                      </div>
                      <div className="absolute -top-2 -right-2 p-2 rounded-full" style={{ backgroundColor: 'rgb(0, 31, 60)' }}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-4" style={{ color: 'rgb(0, 31, 60)' }}>
                      {step.title}
                    </h3>
                    <p style={{ color: 'rgb(4, 80, 115)' }}>{step.desc}</p>
                  </div>
                </FloatingCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: 'rgb(247, 219, 190)' }}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{ color: 'rgb(0, 31, 60)' }}>Prime Dubai Locations</h2>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: 'rgb(4, 80, 115)' }}>
                Discover our premium holiday homes in Dubai's most sought-after destinations
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {locationsLoading ? (
              [...Array(8)].map((_, index) => (
                <LocationSkeleton key={index} />
              ))
            ) : (
              locations.slice(0, 8).map((location, index) => (
                <FloatingCard key={location._id} delay={index * 100}>
                  <div
                    onClick={() => navigate(`/property?locationId=${location._id}`)}
                    className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer transform hover:scale-105"
                  >
                    {location.image ? (
                      <img
                        src={location.image}
                        alt={location.name}
                        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 group-hover:from-black/60 transition-all duration-300" style={{ background: 'linear-gradient(to top, rgba(0, 31, 60, 0.7), rgba(0, 31, 60, 0.2), transparent)' }}></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-lg font-bold mb-1">{location.name}</h3>
                      <p className="text-sm" style={{ color: 'rgb(247, 219, 190)' }}>
                        {location.properties || 0} {location.properties === 1 ? 'Property' : 'Properties'}
                      </p>
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold text-white transform scale-90 group-hover:scale-100 transition-transform duration-300" style={{ backgroundColor: 'rgb(231, 121, 0)' }}>
                      Popular
                    </div>
                  </div>
                </FloatingCard>
              ))
            )}
          </div>
          <AnimatedSection delay={600}>
            <div className="text-center">
              <button 
                onClick={handleViewAllProperties}
                className="px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                style={{ backgroundColor: 'rgb(0, 31, 60)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(4, 80, 115)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(0, 31, 60)'}
              >
                View All Properties
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-16" style={{ color: 'rgb(0, 31, 60)' }}>
              Our Premium Services
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <FloatingCard key={index} delay={index * 150}>
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 group" 
                     style={{ border: '1px solid rgb(247, 219, 190)' }}
                     onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgb(231, 121, 0)'}
                     onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgb(247, 219, 190)'}>
                  <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: 'rgb(0, 31, 60)' }}>
                    {service.title}
                  </h3>
                  <p style={{ color: 'rgb(4, 80, 115)' }}>{service.desc}</p>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: 'rgb(247, 219, 190)' }}>
        <div className="max-w-4xl mx-auto relative">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-16" style={{ color: 'rgb(0, 31, 60)' }}>
              Frequently Asked Questions
            </h2>
          </AnimatedSection>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group" style={{ border: '1px solid rgb(247, 219, 190)' }}>
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-300"
                  >
                    <h3 className="text-lg font-semibold" style={{ color: 'rgb(0, 31, 60)' }}>
                      {faq.q}
                    </h3>
                    <div>
                      {expandedFaq === index ? (
                        <ChevronUp className="h-5 w-5" style={{ color: 'rgb(231, 121, 0)' }} />
                      ) : (
                        <ChevronDown className="h-5 w-5" style={{ color: 'rgb(231, 121, 0)' }} />
                      )}
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-8 pb-6">
                      <p style={{ color: 'rgb(4, 80, 115)' }}>{faq.a}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-16" style={{ color: 'rgb(0, 31, 60)' }}>
              What Our Guests Say
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <FloatingCard key={index} delay={index * 200}>
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2" 
                     style={{ border: '1px solid rgb(247, 219, 190)' }}
                     onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgb(231, 121, 0)'}
                     onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgb(247, 219, 190)'}>
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" style={{ color: 'rgb(231, 121, 0)' }} />
                    ))}
                  </div>
                  <p className="mb-6 text-lg italic" style={{ color: 'rgb(4, 80, 115)' }}>
                    "{review.review}"
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold" style={{ color: 'rgb(0, 31, 60)' }}>
                        {review.name}
                      </h4>
                      <p className="text-sm" style={{ color: 'rgb(4, 80, 115)' }}>{review.location}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: 'rgb(231, 121, 0)' }}>
                      {review.name.charAt(0)}
                    </div>
                  </div>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContentSections;