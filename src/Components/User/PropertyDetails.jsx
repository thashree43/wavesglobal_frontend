import React, { useState } from 'react';
import {
  Heart,
  Share2,
  Star,
  MapPin,
  Users,
  Bed,
  Bath,
  Wifi,
  Car,
  Coffee,
  Tv,
  Wind,
  Dumbbell,
  WavesLadder,  // → Replaced Pool
  Shield,
  Clock,
  Phone,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Map as MapIcon
} from 'lucide-react';
import { Navbar } from 'react-bootstrap';

const PropertyDetailsPage = () => {


  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDates, setSelectedDates] = useState({ checkin: '', checkout: '' });
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const propertyImages = [
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&h=600&fit=crop'
  ];

  const amenities = [
    { category: 'General', items: [
      { icon: Wifi, name: 'Free WiFi' },
      { icon: Wind, name: 'Air Conditioning' },
      { icon: Tv, name: 'Smart TV' },
      { icon: Car, name: 'Free Parking' }
    ]},
    { category: 'Kitchen', items: [
      { icon: Coffee, name: 'Coffee Machine' },
      { icon: Coffee, name: 'Microwave' },
      { icon: Coffee, name: 'Refrigerator' },
      { icon: Coffee, name: 'Dishwasher' }
    ]},
    { category: 'Recreation', items: [
      { icon: WavesLadder, name: 'Swimming Pool' },
      { icon: Dumbbell, name: 'Gym Access' },
      { icon: MapIcon, name: 'Balcony View' }
    ]},
    { category: 'Safety', items: [
      { icon: Shield, name: 'Security System' },
      { icon: Shield, name: 'Fire Extinguisher' },
      { icon: Shield, name: '24/7 Security' }
    ]}
  ];

  const reviews = [
    { id: 1, name: 'Sarah Johnson', rating: 5, date: '2024-02-15', comment: 'Absolutely stunning property with amazing views. The host was incredibly responsive and helpful throughout our stay.' },
    { id: 2, name: 'Michael Chen', rating: 4, date: '2024-02-10', comment: 'Great location and clean apartment. Minor issues with WiFi but overall excellent experience.' },
    { id: 3, name: 'Emma Wilson', rating: 5, date: '2024-02-05', comment: 'Perfect for our family vacation. Kids loved the pool and the space was exactly as described.' }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + propertyImages.length) % propertyImages.length);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(247, 247, 247)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-2">
                Luxury Downtown Apartment with Stunning Views
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" style={{ color: 'rgb(230, 116, 19)' }} />
                  <span className="font-semibold">4.8</span>
                  <span>(124 reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Downtown Dubai, UAE</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4 lg:mt-0">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            <div className="relative">
              <div className="aspect-w-16 aspect-h-10 lg:aspect-h-8">
                <img 
                  src={propertyImages[currentImageIndex]} 
                  alt="Property" 
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl"
                />
              </div>
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {propertyImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {propertyImages.slice(1, 5).map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`Property view ${index + 2}`}
                  className="w-full h-24 sm:h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setCurrentImageIndex(index + 1)}
                />
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgb(248, 252, 255)' }}>
                    <Users className="w-5 h-5" style={{ color: 'rgb(230, 116, 19)' }} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Guests</p>
                    <p className="font-semibold">6 Guests</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgb(248, 252, 255)' }}>
                    <Bed className="w-5 h-5" style={{ color: 'rgb(230, 116, 19)' }} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Bedrooms</p>
                    <p className="font-semibold">3 Bedrooms</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgb(248, 252, 255)' }}>
                    <Bed className="w-5 h-5" style={{ color: 'rgb(230, 116, 19)' }} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Beds</p>
                    <p className="font-semibold">4 Beds</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgb(248, 252, 255)' }}>
                    <Bath className="w-5 h-5" style={{ color: 'rgb(230, 116, 19)' }} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Bathrooms</p>
                    <p className="font-semibold">2 Bathrooms</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-6">
                <p className="text-sm text-gray-600 mb-2">Property Type</p>
                <p className="font-semibold text-lg">Modern Apartment</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Property Highlights</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgb(248, 252, 255)' }}>
                  <Wifi className="w-5 h-5" style={{ color: 'rgb(230, 116, 19)' }} />
                  <span className="text-sm">High-Speed WiFi</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgb(248, 252, 255)' }}>
                  <WavesLadder className="w-5 h-5" style={{ color: 'rgb(230, 116, 19)' }} />
                  <span className="text-sm">Swimming Pool</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgb(248, 252, 255)' }}>
                  <MapPin className="w-5 h-5" style={{ color: 'rgb(230, 116, 19)' }} />
                  <span className="text-sm">2km to Burj Khalifa</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgb(248, 252, 255)' }}>
                  <Car className="w-5 h-5" style={{ color: 'rgb(230, 116, 19)' }} />
                  <span className="text-sm">Free Parking</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgb(248, 252, 255)' }}>
                  <Dumbbell className="w-5 h-5" style={{ color: 'rgb(230, 116, 19)' }} />
                  <span className="text-sm">Gym Access</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgb(248, 252, 255)' }}>
                  <Shield className="w-5 h-5" style={{ color: 'rgb(230, 116, 19)' }} />
                  <span className="text-sm">24/7 Security</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4">About This Property</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Experience luxury living in the heart of Downtown Dubai with this stunning 3-bedroom apartment offering breathtaking views of the city skyline. Located just minutes away from the iconic Burj Khalifa and Dubai Mall, this modern property provides the perfect base for your Dubai adventure.
                </p>
                <p className="text-gray-700 mb-4">
                  The apartment features contemporary design with premium furnishings, floor-to-ceiling windows that flood the space with natural light, and a spacious balcony perfect for morning coffee or evening relaxation. The fully equipped kitchen includes top-of-the-line appliances, while the living area provides ample space for entertaining.
                </p>
                <p className="text-gray-700">
                  Guests will enjoy access to world-class amenities including a rooftop swimming pool, state-of-the-art fitness center, and 24-hour concierge service. The building offers direct access to the Dubai Metro, making it easy to explore the city's attractions, shopping destinations, and dining establishments.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6">Rooms & Spaces</h2>
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-lg mb-2">Living Room</h3>
                  <p className="text-gray-700">Spacious open-plan living area with comfortable seating for 6, smart TV, and floor-to-ceiling windows with city views. Features modern decor and direct access to the balcony.</p>
                </div>
                <div className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-lg mb-2">Master Bedroom</h3>
                  <p className="text-gray-700">King-size bed with premium bedding, walk-in closet, en-suite bathroom with rainfall shower, and private balcony access with stunning city views.</p>
                </div>
                <div className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-lg mb-2">Second Bedroom</h3>
                  <p className="text-gray-700">Queen-size bed with luxury linens, built-in wardrobes, and large window with natural light. Perfect for couples or single travelers.</p>
                </div>
                <div className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-lg mb-2">Third Bedroom</h3>
                  <p className="text-gray-700">Two single beds that can be converted to a king-size bed, ideal for children or additional guests. Features ample storage space.</p>
                </div>
                <div className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-lg mb-2">Kitchen</h3>
                  <p className="text-gray-700">Fully equipped modern kitchen with stainless steel appliances, dishwasher, microwave, coffee machine, and complete cookware. Breakfast bar for casual dining.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Balcony</h3>
                  <p className="text-gray-700">Private balcony with outdoor furniture, perfect for dining al fresco or enjoying the sunset views over Downtown Dubai.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6">Amenities</h2>
              <div className="space-y-6">
                {amenities.map((category, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-lg mb-3">{category.category}</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {category.items.map((amenity, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-3">
                          <amenity.icon className="w-5 h-5" style={{ color: 'rgb(230, 116, 19)' }} />
                          <span className="text-gray-700">{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Location</h2>
                <button 
                  onClick={() => setIsMapExpanded(!isMapExpanded)}
                  className="text-sm px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  {isMapExpanded ? 'Collapse' : 'Expand'} Map
                </button>
              </div>
              <div className={`bg-gray-200 rounded-lg ${isMapExpanded ? 'h-96' : 'h-64'} flex items-center justify-center transition-all duration-300`}>
                <div className="text-center">
                  <MapIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-600">Interactive Map</p>
                  <p className="text-sm text-gray-500">Downtown Dubai, UAE</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600"><strong>Nearby Attractions:</strong></p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Burj Khalifa - 2.1 km</li>
                  <li>• Dubai Mall - 1.8 km</li>
                  <li>• Dubai Metro Station - 0.3 km</li>
                  <li>• Dubai International Airport - 15 km</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-6 h-6 fill-current" style={{ color: 'rgb(230, 116, 19)' }} />
                <h2 className="text-xl font-bold">4.8 · 124 Reviews</h2>
              </div>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold">{review.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" style={{ color: 'rgb(230, 116, 19)' }} />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Show All Reviews
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6">House Rules</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5" style={{ color: 'rgb(230, 116, 19)' }} />
                    <div>
                      <p className="font-semibold">Check-in</p>
                      <p className="text-gray-600">After 3:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5" style={{ color: 'rgb(230, 116, 19)' }} />
                    <div>
                      <p className="font-semibold">Check-out</p>
                      <p className="text-gray-600">Before 11:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5" style={{ color: 'rgb(230, 116, 19)' }} />
                    <div>
                      <p className="font-semibold">Maximum Guests</p>
                      <p className="text-gray-600">6 Guests</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <X className="w-5 h-5 text-red-500" />
                    <span>No smoking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <X className="w-5 h-5 text-red-500" />
                    <span>No parties or events</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Pets allowed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Children welcome</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6">Extra Services</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold mb-2">Airport Transfer</h3>
                  <p className="text-gray-600 text-sm mb-2">Private car pickup from Dubai International Airport</p>
                  <p className="font-semibold" style={{ color: 'rgb(230, 116, 19)' }}>$45 per trip</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold mb-2">Extra Cleaning</h3>
                  <p className="text-gray-600 text-sm mb-2">Additional deep cleaning service during your stay</p>
                  <p className="font-semibold" style={{ color: 'rgb(230, 116, 19)' }}>$25 per session</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold mb-2">Baby Equipment</h3>
                  <p className="text-gray-600 text-sm mb-2">Crib, high chair, and baby safety equipment</p>
                  <p className="font-semibold" style={{ color: 'rgb(230, 116, 19)' }}>$15 per night</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold mb-2">Grocery Delivery</h3>
                  <p className="text-gray-600 text-sm mb-2">Pre-arrival grocery shopping and stocking</p>
                  <p className="font-semibold" style={{ color: 'rgb(230, 116, 19)' }}>$20 + groceries</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-2xl font-bold">$125 <span className="text-base font-normal text-gray-600">/ night</span></p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-current" style={{ color: 'rgb(230, 116, 19)' }} />
                      <span className="text-sm">4.8 (124 reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Check-in</label>
                    <input 
                      type="date" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none"
                      value={selectedDates.checkin}
                      onChange={(e) => setSelectedDates({...selectedDates, checkin: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Check-out</label>
                    <input 
                      type="date" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none"
                      value={selectedDates.checkout}
                      onChange={(e) => setSelectedDates({...selectedDates, checkout: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Guests</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none">
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4 Guests</option>
                      <option>5 Guests</option>
                      <option>6 Guests</option>
                    </select>
                  </div>
                </div>

                <button 
                  className="w-full py-3 rounded-lg font-semibold text-white transition-colors mb-4"
                  style={{ backgroundColor: 'rgb(230, 116, 19)' }}
                >
                  Book Now
                </button>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>$125 × 3 nights</span>
                    <span>$375</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>$25</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>$15</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>$415</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xl font-semibold">AH</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Ahmed Hassan</h3>
                    <p className="text-gray-600 text-sm">Superhost · 3 years hosting</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Responds within an hour</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🇦🇪 🇬🇧 🇺🇸</span>
                    <span className="text-sm">Arabic, English</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">Call</span>
                  </button>
                  <button className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">Message</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-lg mb-4">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property ID</span>
                    <span className="font-medium">#DXB2024001</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Minimum Stay</span>
                    <span className="font-medium">2 nights</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cancellation</span>
                    <span className="font-medium">Free until 48h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Security Deposit</span>
                    <span className="font-medium">$200</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Ready to Book Your Stay?</h2>
            <p className="text-gray-600 mb-6">
              Experience luxury living in the heart of Dubai with this stunning property. Book now for the best rates and instant confirmation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="px-8 py-3 rounded-lg font-semibold text-white transition-colors"
                style={{ backgroundColor: 'rgb(230, 116, 19)' }}
              >
                Book Now - $125/night
              </button>
              <button className="px-8 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                View More Properties
              </button>
            </div>
          </div>
        </div>

        <footer className="mt-12 py-8 border-t border-gray-200">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-black transition-colors">Support</a>
              <a href="#" className="hover:text-black transition-colors">Contact</a>
            </div>
            <div className="text-sm text-gray-600">
              © 2024 Property Rentals. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
    </>
  );
};

export default PropertyDetailsPage;