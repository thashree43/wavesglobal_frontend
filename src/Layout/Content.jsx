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
  CalendarDays
} from 'lucide-react';

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

const ContentSections = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const partners = [
    { name: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg' },
    { name: 'Booking.com', logo: 'https://logos-world.net/wp-content/uploads/2021/08/Booking-Logo.png' },
    { name: 'Expedia', logo: 'https://logos-world.net/wp-content/uploads/2020/05/Expedia-Logo.png' },
    { name: 'Trivago', logo: 'https://logos-world.net/wp-content/uploads/2020/05/Trivago-Logo.png' },
    { name: 'Hotels.com', logo: 'https://logos-world.net/wp-content/uploads/2020/05/Hotels.com-Logo.png' },
    { name: 'Agoda', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Agoda_transparent_logo.png' }
  ];

  const howItWorks = [
    { step: '1', title: 'Search', desc: 'Browse our curated collection of luxury properties', icon: Search },
    { step: '2', title: 'Select', desc: 'Choose your perfect staycation destination', icon: MapPin },
    { step: '3', title: 'Book', desc: 'Secure your booking with instant confirmation', icon: Calendar },
    { step: '4', title: 'Enjoy', desc: 'Experience unparalleled luxury and comfort', icon: Star }
  ];

  const whyChooseUs = [
    { title: 'Handpicked Properties', desc: 'Every property is carefully selected for luxury and comfort' },
    { title: '24/7 Concierge', desc: 'Round-the-clock support for all your needs' },
    { title: 'Best Price Guarantee', desc: 'We ensure you get the best deals available' },
    { title: 'Instant Booking', desc: 'Secure your dream stay in just a few clicks' }
  ];

  const locations = [
    { name: 'Dubai Marina', properties: 45, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Downtown Dubai', properties: 38, image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Palm Jumeirah', properties: 62, image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Jumeirah Beach', properties: 29, image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Business Bay', properties: 34, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'DIFC', properties: 41, image: 'https://images.unsplash.com/photo-1605106715994-18d3fecffb98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
  ];

  const services = [
    { title: 'Airport Transfers', desc: 'Luxury vehicle transfers to and from airports', icon: '✈️' },
    { title: 'Personal Chef', desc: 'Gourmet dining experiences in your accommodation', icon: '👨‍🍳' },
    { title: 'Spa Services', desc: 'In-room spa and wellness treatments', icon: '💆‍♀️' },
    { title: 'Event Planning', desc: 'Perfect venues for special occasions', icon: '🎉' },
    { title: 'Tour Guide', desc: 'Local expert guides for cultural experiences', icon: '🗺️' },
    { title: 'Housekeeping', desc: 'Daily housekeeping and maintenance services', icon: '🧹' }
  ];

  const faqs = [
    { q: 'How do I make a reservation?', a: 'Simply select your dates, choose your property, and complete the booking process online. You\'ll receive instant confirmation.' },
    { q: 'What is included in the price?', a: 'Our prices include accommodation, basic amenities, and 24/7 customer support. Additional services can be added during booking.' },
    { q: 'Can I cancel or modify my booking?', a: 'Yes, cancellation and modification policies vary by property. Details are provided during booking and in your confirmation email.' },
    { q: 'Are pets allowed?', a: 'Pet policies vary by property. Look for pet-friendly badges on listings or contact our support team for specific requirements.' },
    { q: 'Is there a minimum stay requirement?', a: 'Minimum stay requirements depend on the property and season. This information is displayed on each property listing.' }
  ];

  const reviews = [
    { name: 'Sarah Johnson', rating: 5, review: 'Absolutely stunning property with impeccable service. Every detail was perfect!', location: 'Dubai Marina' },
    { name: 'Ahmed Al-Rashid', rating: 5, review: 'The luxury villa exceeded all expectations. Will definitely book again!', location: 'Palm Jumeirah' },
    { name: 'Emma Thompson', rating: 5, review: 'Outstanding experience from booking to checkout. Highly recommended!', location: 'Downtown Dubai' },
    { name: 'Omar Hassan', rating: 5, review: 'Perfect for our anniversary celebration. The staff went above and beyond!', location: 'Jumeirah Beach' }
  ];

  return (
    <div style={{ paddingTop: '2rem', position: 'relative', zIndex: 1 }}>
      <section className="py-20 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-16 text-black">Our Trusted Partners</h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <FloatingCard key={index} delay={index * 100}>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 hover:border-orange-300 group">
                  <div className="h-16 flex items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-12 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-gray-100 via-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/30 via-transparent to-orange-50/20"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div>
                <h2 className="text-4xl font-bold mb-8 text-orange-500">
                  Why Choose Waves Global?
                </h2>
                <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                  We curate exceptional luxury experiences that go beyond ordinary stays.
                </p>
                <div className="space-y-8">
                  {whyChooseUs.map((item, index) => (
                    <AnimatedSection key={index} delay={index * 150}>
                      <div className="flex items-start gap-4 group">
                        <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0 bg-orange-500 group-hover:scale-150 transition-transform duration-300"></div>
                        <div>
                          <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-orange-500 transition-colors duration-300">{item.title}</h3>
                          <p className="text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={300}>
              <div className="relative">
                <div className="bg-orange-500 rounded-3xl p-8 transform rotate-3 shadow-2xl hover:rotate-6 transition-transform duration-300">
                  <div className="bg-white rounded-2xl p-8 transform -rotate-3 hover:-rotate-6 transition-transform duration-300">
                    <div className="text-6xl text-center mb-4">🏰</div>
                    <h3 className="text-2xl font-bold text-center mb-4 text-black">Premium Experiences</h3>
                    <p className="text-center text-gray-600">Luxury redefined for the discerning traveler</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-16 text-black">
              How It Works
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <FloatingCard key={index} delay={index * 200}>
                  <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center group border border-gray-100 hover:border-orange-300 transform hover:-translate-y-2">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white font-bold text-2xl transition-all duration-300 group-hover:scale-110 bg-orange-500">
                        {step.step}
                      </div>
                      <div className="absolute -top-2 -right-2 p-2 rounded-full bg-black group-hover:bg-orange-600 transition-colors duration-300">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-black group-hover:text-orange-500 transition-colors duration-300">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </FloatingCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-black">Popular Dubai Destinations</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore Dubai's most luxurious neighborhoods and iconic locations
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {locations.map((location, index) => (
              <FloatingCard key={index} delay={index * 200}>
                <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer transform hover:scale-105">
                  <div
                    className="h-64 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${location.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold mb-2">{location.name}</h3>
                    <p className="text-gray-200">{location.properties} Properties</p>
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold bg-orange-500 text-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    Popular
                  </div>
                </div>
              </FloatingCard>
            ))}
          </div>
          <AnimatedSection delay={600}>
            <div className="text-center">
              <button className="px-8 py-3 rounded-lg font-semibold bg-black text-white hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                View More Locations
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-16 text-black">
              Premium Services
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <FloatingCard key={index} delay={index * 150}>
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border border-gray-100 hover:border-orange-300 group">
                  <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-4 text-black group-hover:text-orange-500 transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-gray-100 via-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-orange-100/20 via-transparent to-orange-50/10"></div>
        <div className="max-w-4xl mx-auto relative">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-16 text-orange-500">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-300 group-hover:bg-orange-50"
                  >
                    <h3 className="text-lg font-semibold text-black group-hover:text-orange-500 transition-colors duration-300">{faq.q}</h3>
                    <div className="transform transition-transform duration-300 group-hover:scale-110">
                      {expandedFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-600 group-hover:text-orange-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-600 group-hover:text-orange-500" />
                      )}
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-8 pb-6">
                      <p className="text-gray-600">{faq.a}</p>
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
            <h2 className="text-4xl font-bold text-center mb-16 text-black">
              What Our Guests Say
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <FloatingCard key={index} delay={index * 200}>
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-300 group transform hover:-translate-y-2">
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-orange-500 transform group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
                    ))}
                  </div>
                  <p className="mb-6 text-lg italic text-gray-700 group-hover:text-black transition-colors duration-300">"{review.review}"</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-black group-hover:text-orange-500 transition-colors duration-300">{review.name}</h4>
                      <p className="text-sm text-gray-600">{review.location}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold bg-orange-500 transform group-hover:scale-110 transition-all duration-300">
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