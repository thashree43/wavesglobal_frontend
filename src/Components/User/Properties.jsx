/* eslint-disable no-undef */
import React, { useState, useEffect, Suspense } from "react";
import {
  Search,
  Heart,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  SlidersHorizontal,
  MapPin,
  Bed,
  Bath,
  Users,
  Square,
  Star,
  Loader2,
  AlertCircle,
  Home,
  Hotel,
  Castle,
  Mountain,
  Waves,
  Globe
} from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import axios from "axios";

// Lazy load the HotelBooking component
const HotelBooking = React.lazy(() => import("../ReusableComponent/HotelBooking"));

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [likedProperties, setLikedProperties] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [properties, setProperties] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    guests: "",
    amenities: []
  });

  // Property types with icons
  const propertyTypes = [
    { value: "Apartment", label: "Apartment", icon: <Home size={16} /> },
    { value: "Villa", label: "Villa", icon: <Hotel size={16} /> },
    { value: "Penthouse", label: "Penthouse", icon: <Castle size={16} /> },
    { value: "Beach House", label: "Beach House", icon: <Waves size={16} /> },
    { value: "Mountain Cabin", label: "Mountain Cabin", icon: <Mountain size={16} /> }
  ];

  // Amenities options
  const amenitiesOptions = [
    { value: "wifi", label: "WiFi" },
    { value: "pool", label: "Swimming Pool" },
    { value: "gym", label: "Gym" },
    { value: "parking", label: "Parking" },
    { value: "ac", label: "Air Conditioning" },
    { value: "kitchen", label: "Kitchen" }
  ];

  // Popular locations data
  const popularLocations = [
    { name: "Dubai Marina", count: 45, popular: true },
    { name: "Downtown Dubai", count: 38, popular: true },
    { name: "Palm Jumeirah", count: 62, popular: true },
    { name: "Jumeirah Beach", count: 29, popular: true },
    { name: "Business Bay", count: 34, popular: true },
    { name: "DIFC", count: 27, popular: true }
  ];

  // Fetch properties from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:3000/api/user/properties');
        
        console.log('Fetched properties:', response.data);
        
        if (response.data.success && Array.isArray(response.data.data)) {
          // Simulate loading delay for demo purposes
          await new Promise(resolve => setTimeout(resolve, 1500));
          setProperties(response.data.data);
        } else {
          throw new Error('Invalid data format received from API');
        }
        
      } catch (err) {
        let errorMessage = 'Failed to fetch properties';
        if (err.response) {
          errorMessage = `Server error: ${err.response.status} - ${err.response.statusText}`;
          console.error('Response data:', err.response.data);
        } else if (err.request) {
          errorMessage = 'No response received from server';
        } else {
          errorMessage = err.message || errorMessage;
        }
        
        setError(errorMessage);
        console.error('Error fetching properties:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleLike = (id) => {
    setLikedProperties((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleImageChange = (id, dir, imagesLength) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) + dir + imagesLength) % imagesLength,
    }));
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleAmenity = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 10000],
      propertyType: "",
      bedrooms: "",
      bathrooms: "",
      guests: "",
      amenities: []
    });
  };

  // Filter and sort properties
  const filteredAndSortedProperties = () => {
    let filtered = properties.filter((property) => {
      const matchesSearch = property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1];
      const matchesType = !filters.propertyType || property.type === filters.propertyType;
      const matchesBedrooms = !filters.bedrooms || property.bedrooms >= parseInt(filters.bedrooms);
      const matchesBathrooms = !filters.bathrooms || property.bathrooms >= parseInt(filters.bathrooms);
      const matchesGuests = !filters.guests || property.guests >= parseInt(filters.guests);
      const matchesAmenities = filters.amenities.length === 0 || 
                            filters.amenities.every(amenity => 
                              property.amenities?.includes(amenity));

      return matchesSearch && matchesPrice && matchesType && 
             matchesBedrooms && matchesBathrooms && matchesGuests &&
             matchesAmenities;
    });

    // Sort properties
    switch (sortBy) {
      case "priceLow":
        return filtered.sort((a, b) => a.price - b.price);
      case "priceHigh":
        return filtered.sort((a, b) => b.price - a.price);
      case "newest":
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "rating":
        return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return filtered;
    }
  };

  // Loading skeleton component with shimmer effect
  const PropertySkeleton = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl shadow-sm overflow-hidden relative overflow-hidden"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent animate-shimmer" />
      
      <div className="h-64 bg-gradient-to-r from-gray-100 to-gray-200 relative z-10">
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      </div>
      <div className="p-6 space-y-4 relative z-10">
        <div className="h-6 bg-gray-100 rounded-lg animate-pulse"></div>
        <div className="h-4 bg-gray-100 rounded w-2/3 animate-pulse"></div>
        <div className="flex gap-4">
          <div className="h-4 bg-gray-100 rounded w-16 animate-pulse"></div>
          <div className="h-4 bg-gray-100 rounded w-16 animate-pulse"></div>
          <div className="h-4 bg-gray-100 rounded w-16 animate-pulse"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-100 rounded w-20 animate-pulse"></div>
          <div className="h-8 bg-gray-100 rounded w-20 animate-pulse"></div>
        </div>
      </div>
    </motion.div>
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md"
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition-all duration-300"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      
      <LayoutGroup>
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container mx-auto px-4 py-8"
        >
          {/* Hero Section */}
          <motion.section 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-12 text-center"
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Discover Luxury Stays in Dubai
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Find your perfect accommodation from our curated collection of premium properties
            </motion.p>
          </motion.section>

          {/* Popular Locations */}
          <motion.section 
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Globe className="text-blue-500" />
              Popular Areas
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularLocations.map((location, index) => (
                <motion.div
                  key={location.name}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100 p-4 cursor-pointer transition-all duration-300"
                >
                  <h3 className="font-semibold text-gray-800">{location.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-500">{location.count} properties</span>
                    {location.popular && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Search and Filters */}
          <motion.section 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search Bar */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative flex-1 max-w-2xl"
              >
                <div className="flex items-center gap-3 bg-white shadow-sm border border-gray-200 px-4 py-3 rounded-xl hover:shadow-md transition-all duration-300">
                  <Search className="text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by property name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 outline-none bg-transparent placeholder-gray-400 text-gray-700"
                  />
                </div>
              </motion.div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <motion.button
                  layout
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterOpen(!filterOpen)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-sm transition-all duration-300 ${
                    filterOpen 
                      ? 'bg-black text-white' 
                      : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
                  }`}
                >
                  <SlidersHorizontal size={18} />
                  <span className="hidden sm:inline">Filters</span>
                </motion.button>

                <motion.select
                  whileHover={{ scale: 1.02 }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 rounded-xl shadow-sm bg-white border border-gray-200 outline-none hover:bg-gray-50 transition-all duration-300 text-gray-700"
                >
                  <option value="featured">Featured</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="rating">Top Rated</option>
                </motion.select>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            <AnimatePresence>
              {filterOpen && (
                <motion.div
                  layout
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 mt-4 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-800">Filter Properties</h3>
                      <button
                        onClick={resetFilters}
                        className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors"
                      >
                        Reset All
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Price Range */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price Range (${filters.priceRange[0]} - ${filters.priceRange[1]})
                        </label>
                        <div className="space-y-2">
                          <input
                            type="range"
                            min="0"
                            max="10000"
                            step="100"
                            value={filters.priceRange[1]}
                            onChange={(e) => handleFilterChange('priceRange', [0, +e.target.value])}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>

                      {/* Property Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Property Type
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {propertyTypes.map((type) => (
                            <motion.button
                              key={type.value}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleFilterChange('propertyType', type.value)}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                                filters.propertyType === type.value
                                  ? 'bg-black text-white'
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                              }`}
                            >
                              {type.icon}
                              {type.label}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Bedrooms */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bedrooms
                        </label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4].map(num => (
                            <motion.button
                              key={num}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleFilterChange('bedrooms', num)}
                              className={`px-3 py-2 rounded-lg text-sm transition-all ${
                                filters.bedrooms === num.toString()
                                  ? 'bg-black text-white'
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                              }`}
                            >
                              {num}+
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Amenities */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Amenities
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {amenitiesOptions.map(amenity => (
                            <motion.button
                              key={amenity.value}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => toggleAmenity(amenity.value)}
                              className={`px-3 py-2 rounded-lg text-sm transition-all ${
                                filters.amenities.includes(amenity.value)
                                  ? 'bg-black text-white'
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                              }`}
                            >
                              {amenity.label}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Properties Grid */}
          {isLoading ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[...Array(8)].map((_, i) => (
                <PropertySkeleton key={i} />
              ))}
            </motion.div>
          ) : filteredAndSortedProperties().length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md mx-auto">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No properties found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchTerm("");
                    resetFilters();
                  }}
                  className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition-all duration-300"
                >
                  Clear Search
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              layout
            >
              {filteredAndSortedProperties().map((property, index) => (
                <motion.article
                  key={property._id || index}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300"
                >
                  {/* Image Gallery */}
                  <div className="relative h-64 overflow-hidden">
                    {property.images && property.images.length > 0 ? (
                      <>
                        <LazyLoadImage
                          src={property.images[currentImageIndex[property._id] || 0]}
                          alt={property.title}
                          effect="blur"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          wrapperClassName="w-full h-full"
                        />
                        
                        {property.images.length > 1 && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleImageChange(property._id, -1, property.images.length)}
                              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                            >
                              <ChevronLeft size={16} className="text-gray-700" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleImageChange(property._id, 1, property.images.length)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                            >
                              <ChevronRight size={16} className="text-gray-700" />
                            </motion.button>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}

                    {/* Property Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium">
                        {property.type}
                      </span>
                    </div>

                    {/* Like Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleLike(property._id)}
                      className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all duration-300 ${
                        likedProperties.includes(property._id)
                          ? "bg-red-500 text-white"
                          : "bg-white/90 hover:bg-white text-gray-600"
                      }`}
                    >
                      <Heart 
                        size={18} 
                        fill={likedProperties.includes(property._id) ? "currentColor" : "none"} 
                      />
                    </motion.button>

                    {/* Rating Badge */}
                    {property.rating && (
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">{property.rating.toFixed(1)}</span>
                      </div>
                    )}

                    {/* Image Indicators */}
                    {property.images && property.images.length > 1 && (
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                        {property.images.map((_, imgIndex) => (
                          <div
                            key={imgIndex}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              imgIndex === (currentImageIndex[property._id] || 0)
                                ? 'bg-white'
                                : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Property Details */}
                  <div className="p-5">
                    <div className="mb-3">
                      <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {property.title || "Untitled Property"}
                      </h3>
                      <div className="flex items-center text-gray-500 text-sm gap-1">
                        <MapPin size={14} />
                        <span className="line-clamp-1">{property.location || "Location not specified"}</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
                      {property.bedrooms && (
                        <span className="flex items-center gap-1">
                          <Bed size={14} />
                          {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}
                        </span>
                      )}
                      {property.bathrooms && (
                        <span className="flex items-center gap-1">
                          <Bath size={14} />
                          {property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}
                        </span>
                      )}
                      {property.area && (
                        <span className="flex items-center gap-1">
                          <Square size={14} />
                          {property.area} m²
                        </span>
                      )}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-xl font-bold text-gray-900">
                          ${property.price?.toLocaleString() || "N/A"}
                        </span>
                        <span className="text-gray-500 text-sm ml-1">/night</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedProperty(property)}
                        className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        <Eye size={16} />
                        <span>View</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </motion.main>
      </LayoutGroup>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedProperty(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </motion.button>
                <Suspense fallback={
                  <div className="min-h-[400px] flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                    />
                  </div>
                }>
                  <HotelBooking 
                    property={selectedProperty} 
                    onClose={() => setSelectedProperty(null)} 
                  />
                </Suspense>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Properties;