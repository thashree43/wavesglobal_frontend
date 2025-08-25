import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  Building,
  Building2,
  Crown,
  Hotel,
  Briefcase,
  Calendar,
  ChevronDown,
  Plus,
  Minus
} from "lucide-react";
import { createPortal } from "react-dom";
import axios from "axios";
import { baseurl } from "../../Base/Base";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";

const CustomDatePicker = ({ value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dropdownRef = useRef(null);

  const toggleCalendar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const generateCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      days.push(currentDate);
    }
    
    return days;
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameMonth = (date) => {
    return date.getMonth() === selectedDate.getMonth();
  };

  const isSelected = (date) => {
    return value && date.toDateString() === new Date(value).toDateString();
  };

  const handleDateSelect = (date) => {
    onChange(date.toISOString().split('T')[0]);
    setIsOpen(false);
  };

  const nextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  const prevMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="relative w-full">
      <div className="relative group">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-orange-500 transition-colors z-10" />
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-orange-500 transition-colors z-10" />
        <button
          onClick={toggleCalendar}
          className="w-full h-11 pl-10 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-300 hover:border-orange-300 hover:shadow-md bg-white cursor-pointer text-gray-900 text-sm text-left"
        >
          {value ? formatDate(new Date(value)) : placeholder}
        </button>
      </div>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-[99999]">
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={toggleCalendar}
            />
            <div
              ref={dropdownRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                         bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 
                         p-6 w-80 z-[100000]"
            >
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={prevMonth}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h3 className="text-lg font-semibold">
                  {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                </h3>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {generateCalendar().map((date, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(date)}
                    className={`
                      h-10 w-full rounded-lg text-sm font-medium transition-all duration-200
                      ${!isSameMonth(date) ? 'text-gray-300' : 'text-gray-700'}
                      ${isSelected(date) ? 'bg-orange-500 text-white' : ''}
                      ${isToday(date) && !isSelected(date) ? 'bg-blue-500 text-white' : ''}
                      ${!isSelected(date) && !isToday(date) ? 'hover:bg-gray-100' : ''}
                    `}
                  >
                    {date.getDate()}
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

const GuestSelector = ({ isOpen, onClose, guests, onGuestsChange }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const updateGuestCount = (type, operation) => {
    const newGuests = { ...guests };
    if (operation === 'increment') {
      newGuests[type] = Math.min(newGuests[type] + 1, type === 'adults' ? 16 : 5);
    } else {
      newGuests[type] = Math.max(newGuests[type] - 1, type === 'adults' ? 1 : 0);
    }
    onGuestsChange(newGuests);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999]">
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div 
        ref={dropdownRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-6 min-w-[320px]"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-black">Adults</div>
              <div className="text-sm text-gray-500">Ages 13 or above</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateGuestCount('adults', 'decrement')}
                disabled={guests.adults <= 1}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-medium">{guests.adults}</span>
              <button
                onClick={() => updateGuestCount('adults', 'increment')}
                disabled={guests.adults >= 16}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-black">Children</div>
              <div className="text-sm text-gray-500">Ages 2-12</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateGuestCount('children', 'decrement')}
                disabled={guests.children <= 0}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-medium">{guests.children}</span>
              <button
                onClick={() => updateGuestCount('children', 'increment')}
                disabled={guests.children >= 5}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-black">Infants</div>
              <div className="text-sm text-gray-500">Under 2</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateGuestCount('infants', 'decrement')}
                disabled={guests.infants <= 0}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-medium">{guests.infants}</span>
              <button
                onClick={() => updateGuestCount('infants', 'increment')}
                disabled={guests.infants >= 5}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="pt-4 border-t">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const NeighborhoodScroller = ({ neighborhoods, filters, onNeighborhoodClick }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, [neighborhoods]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (neighborhoods.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="relative bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Neighborhoods</h3>
        
        <div className="relative">
          {showLeftButton && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-gray-200 hover:bg-gray-50 p-2 rounded-full transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
          )}
          
          {showRightButton && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-gray-200 hover:bg-gray-50 p-2 rounded-full transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          )}
          
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-8"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
          >
            {neighborhoods.map((neighborhood) => (
              <button
                key={neighborhood.name || neighborhood._id}
                onClick={() => onNeighborhoodClick(neighborhood.name)}
                className={`flex-shrink-0 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  filters.neighborhood === neighborhood.name
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700'
                }`}
              >
                {neighborhood.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [likedProperties, setLikedProperties] = useState([]);
  const [hoveredProperty, setHoveredProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [properties, setProperties] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 });
  const [guestsOpen, setGuestsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [filters, setFilters] = useState({
    priceRange: [0, 200000],
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    guests: "",
    minArea: "",
    neighborhood: ""
  });

  const propertyTypes = [
    { value: "Apartment", label: "Apartment", icon: <Building size={16} /> },
    { value: "Villa", label: "Villa", icon: <Home size={16} /> },
    { value: "Studio", label: "Studio", icon: <Building2 size={16} /> },
    { value: "Penthouse", label: "Penthouse", icon: <Crown size={16} /> },
    { value: "Townhouse", label: "Townhouse", icon: <Hotel size={16} /> },
    { value: "Office", label: "Office", icon: <Briefcase size={16} /> }
  ];

  const getUrlParams = () => {
    const searchParams = new URLSearchParams(location.search);
    const params = {};
    
    if (searchParams.get('checkin')) {
      params.checkin = searchParams.get('checkin');
      setCheckIn(searchParams.get('checkin'));
    }
    if (searchParams.get('checkout')) {
      params.checkout = searchParams.get('checkout');
      setCheckOut(searchParams.get('checkout'));
    }
    if (searchParams.get('adults')) {
      params.adults = searchParams.get('adults');
      setGuests(prev => ({ ...prev, adults: parseInt(searchParams.get('adults')) || 1 }));
    }
    if (searchParams.get('children')) {
      params.children = searchParams.get('children');
      setGuests(prev => ({ ...prev, children: parseInt(searchParams.get('children')) || 0 }));
    }
    if (searchParams.get('infants')) {
      params.infants = searchParams.get('infants');
      setGuests(prev => ({ ...prev, infants: parseInt(searchParams.get('infants')) || 0 }));
    }
    
    return params;
  };

  const buildQueryString = () => {
    const params = new URLSearchParams();
    
    if (checkIn) params.set('checkin', checkIn);
    if (checkOut) params.set('checkout', checkOut);
    params.set('adults', guests.adults.toString());
    if (guests.children > 0) params.set('children', guests.children.toString());
    if (guests.infants > 0) params.set('infants', guests.infants.toString());
    
    return params.toString();
  };

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const urlParams = getUrlParams();
      let endpoint = `${baseurl}user/properties`;
      
      if (Object.keys(urlParams).length > 0) {
        const queryString = new URLSearchParams(urlParams).toString();
        endpoint += `?${queryString}`;
      }
      
      const response = await axios.get(endpoint);
      
      if (response.data.success) {
        setProperties(response.data.data);
      } else {
        setError("Failed to load properties");
      }
    } catch (error) {
      setError("Failed to load properties. Please try again.");
      console.error("Error fetching properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNeighborhoods = async () => {
    try {
      const response = await axios.get(`${baseurl}user/location`);
      if (response.data && response.data.location) {
        setNeighborhoods(response.data.location);
      }
    } catch (error) {
      console.error("Error fetching neighborhoods:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
    fetchNeighborhoods();
  }, [location.search]);

  const toggleLike = (id) => {
    setLikedProperties((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 200000],
      propertyType: "",
      bedrooms: "",
      bathrooms: "",
      guests: "",
      minArea: "",
      neighborhood: ""
    });
  };

  const handlePropertyClick = (propertyId) => {
    const queryString = buildQueryString();
    const url = queryString ? `/property/${propertyId}?${queryString}` : `/property/${propertyId}`;
    navigate(url);
  };

  const handleNeighborhoodClick = (neighborhood) => {
    handleFilterChange('neighborhood', filters.neighborhood === neighborhood ? "" : neighborhood);
  };

  const handleNewSearch = () => {
    const searchParams = new URLSearchParams();
    
    if (checkIn) searchParams.set('checkin', checkIn);
    if (checkOut) searchParams.set('checkout', checkOut);
    searchParams.set('adults', guests.adults.toString());
    if (guests.children > 0) searchParams.set('children', guests.children.toString());
    if (guests.infants > 0) searchParams.set('infants', guests.infants.toString());
    
    navigate(`/property?${searchParams.toString()}`);
  };

  const filteredAndSortedProperties = () => {
    if (!properties || properties.length === 0) return [];

    let filtered = properties.filter((property) => {
      if (!property || !property.status) return false;

      const matchesSearch = !searchTerm || 
        (property.title && property.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (property.location && property.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (property.neighborhood?.name && property.neighborhood.name.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesPrice = !filters.priceRange || 
        (property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]);

      const matchesType = !filters.propertyType || property.type === filters.propertyType;

      const matchesBedrooms = !filters.bedrooms || 
        (property.bedrooms && property.bedrooms >= Number(filters.bedrooms));

      const matchesBathrooms = !filters.bathrooms || 
        (property.bathrooms && property.bathrooms >= Number(filters.bathrooms));

      const matchesGuests = !filters.guests || 
        (property.guests && property.guests >= Number(filters.guests));

      const matchesArea = !filters.minArea || 
        (property.area && property.area >= Number(filters.minArea));

      const matchesNeighborhood = !filters.neighborhood || 
        (property.neighborhood?.name && property.neighborhood.name === filters.neighborhood);

      return matchesSearch && matchesPrice && matchesType && 
             matchesBedrooms && matchesBathrooms && matchesGuests && 
             matchesArea && matchesNeighborhood;
    });

    switch (sortBy) {
      case "priceLow":
        return filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
      case "priceHigh":
        return filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
      case "newest":
        return filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      case "area":
        return filtered.sort((a, b) => (b.area || 0) - (a.area || 0));
      default:
        return filtered;
    }
  };

  const PropertySkeleton = () => (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
      <div className="h-64 bg-gradient-to-r from-gray-100 to-gray-200"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-200 rounded-lg"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="flex gap-4">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-8 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );

  const totalGuests = guests.adults + guests.children + guests.infants;
  const guestDisplayText = totalGuests === 1 ? '1 Guest' : `${totalGuests} Guests`;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          <Navbar />

          <main className="container mx-auto px-4 pt-24 pb-10">
            <section className="mb-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-700 to-orange-600">
                Discover Premium Properties
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find your perfect accommodation from our curated collection of luxury properties
              </p>
            </section>

            <section className="mb-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Check In</label>
                    <CustomDatePicker
                      value={checkIn}
                      onChange={setCheckIn}
                      placeholder="Select date"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Check Out</label>
                    <CustomDatePicker
                      value={checkOut}
                      onChange={setCheckOut}
                      placeholder="Select date"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                    <div className="relative group">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-orange-500 transition-colors z-10" />
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-orange-500 transition-colors z-10" />
                      <button
                        onClick={() => setGuestsOpen(!guestsOpen)}
                        className="w-full h-11 pl-10 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-300 hover:border-orange-300 hover:shadow-md bg-white cursor-pointer text-gray-900 text-sm text-left"
                      >
                        {guestDisplayText}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={handleNewSearch}
                      className="w-full h-11 rounded-xl font-medium text-white bg-orange-500 hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <Search className="h-4 w-4" />
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <NeighborhoodScroller 
              neighborhoods={neighborhoods}
              filters={filters}
              onNeighborhoodClick={handleNeighborhoodClick}
            />

            <section className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="relative flex-1 max-w-2xl">
                  <div className="flex items-center gap-3 bg-white shadow-sm border border-gray-200 px-4 py-3 rounded-xl hover:shadow-md transition-all duration-300">
                    <Search className="text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search by property name, location, or neighborhood..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 outline-none bg-transparent placeholder-gray-400 text-gray-700"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-sm transition-all duration-300 ${
                      filterOpen 
                        ? 'bg-black text-white' 
                        : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
                    }`}
                  >
                    <SlidersHorizontal size={18} />
                    <span className="hidden sm:inline">Filters</span>
                  </button>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 rounded-xl shadow-sm bg-white border border-gray-200 outline-none hover:bg-gray-50 transition-all duration-300 text-gray-700"
                  >
                    <option value="featured">Featured</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                    <option value="area">Largest Area</option>
                  </select>
                </div>
              </div>

              {filterOpen && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 mt-4 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-800">Filter Properties</h3>
                      <button
                        onClick={resetFilters}
                        className="text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors"
                      >
                        Reset All
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Price Range (${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()})
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="200000"
                          step="5000"
                          value={filters.priceRange[1]}
                          onChange={(e) => handleFilterChange('priceRange', [0, +e.target.value])}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Property Type
                        </label>
                        <select
                          value={filters.propertyType}
                          onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none hover:border-gray-300 transition-colors"
                        >
                          <option value="">All Types</option>
                          {propertyTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Neighborhood
                        </label>
                        <select
                          value={filters.neighborhood}
                          onChange={(e) => handleFilterChange('neighborhood', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none hover:border-gray-300 transition-colors"
                        >
                          <option value="">All Neighborhoods</option>
                          {neighborhoods.map((neighborhood) => (
                            <option key={neighborhood._id || neighborhood.name} value={neighborhood.name}>
                              {neighborhood.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Minimum Area (m²)
                        </label>
                        <input
                          type="number"
                          value={filters.minArea}
                          onChange={(e) => handleFilterChange('minArea', e.target.value)}
                          placeholder="Any size"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none hover:border-gray-300 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Min Bedrooms
                        </label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map(num => (
                            <button
                              key={num}
                              onClick={() => handleFilterChange('bedrooms', 
                                filters.bedrooms === num.toString() ? "" : num.toString())}
                              className={`px-3 py-2 rounded-lg text-sm transition-all ${
                                filters.bedrooms === num.toString()
                                  ? 'bg-orange-500 text-white'
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                              }`}
                            >
                              {num}+
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Min Bathrooms
                        </label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4].map(num => (
                            <button
                              key={num}
                              onClick={() => handleFilterChange('bathrooms', 
                                filters.bathrooms === num.toString() ? "" : num.toString())}
                              className={`px-3 py-2 rounded-lg text-sm transition-all ${
                                filters.bathrooms === num.toString()
                                  ? 'bg-orange-500 text-white'
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                              }`}
                            >
                              {num}+
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Min Guests
                        </label>
                        <div className="flex gap-2">
                          {[1, 2, 4, 6, 8].map(num => (
                            <button
                              key={num}
                              onClick={() => handleFilterChange('guests', 
                                filters.guests === num.toString() ? "" : num.toString())}
                              className={`px-3 py-2 rounded-lg text-sm transition-all ${
                                filters.guests === num.toString()
                                  ? 'bg-orange-500 text-white'
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                              }`}
                            >
                              {num}+
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredAndSortedProperties().length} of {properties.length} properties
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <PropertySkeleton key={i} />
                ))}
              </div>
            ) : filteredAndSortedProperties().length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md mx-auto">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No properties found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      resetFilters();
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition-all duration-300"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedProperties().map((property, index) => (
                  <article
                    key={property._id || index}
                    onMouseEnter={() => setHoveredProperty(property._id)}
                    onMouseLeave={() => setHoveredProperty(null)}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 cursor-pointer hover:translate-y-[-4px]"
                    onClick={() => handlePropertyClick(property._id)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      {property.images && property.images.length > 0 ? (
                        <img
                          src={hoveredProperty === property._id && property.images[1] 
                            ? property.images[1].url 
                            : property.images[0].url}
                          alt={property.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}

                      <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                          {propertyTypes.find(t => t.value === property.type)?.icon}
                          <span>{property.type}</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(property._id);
                        }}
                        className={`absolute top-4 right-4 p-2.5 rounded-full shadow-lg transition-all duration-300 ${
                          likedProperties.includes(property._id)
                            ? "bg-red-500 text-white scale-110"
                            : "bg-white/95 hover:bg-white text-gray-700"
                        }`}
                      >
                        <Heart 
                          size={18} 
                          fill={likedProperties.includes(property._id) ? "currentColor" : "none"} 
                        />
                      </button>

                      {property.images && property.images.length > 1 && (
                        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium">
                          1/{property.images.length}
                        </div>
                      )}

                      {property.propertyHighlights && property.propertyHighlights.length > 0 && (
                        <div className="absolute bottom-4 left-4">
                          <div className="bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium">
                            {property.propertyHighlights[0].name}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                          {property.title || "Untitled Property"}
                        </h3>
                        <div className="flex items-center text-gray-500 text-sm gap-1 mb-1">
                          <MapPin size={14} />
                          <span className="line-clamp-1">
                            {property.neighborhood?.name || property.location || "Location not specified"}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                        {property.bedrooms && (
                          <div className="flex items-center gap-2">
                            <Bed size={16} className="text-gray-400" />
                            <span>{property.bedrooms} Bed{property.bedrooms !== 1 ? 's' : ''}</span>
                          </div>
                        )}
                        {property.bathrooms && (
                          <div className="flex items-center gap-2">
                            <Bath size={16} className="text-gray-400" />
                            <span>{property.bathrooms} Bath{property.bathrooms !== 1 ? 's' : ''}</span>
                          </div>
                        )}
                        {property.guests && (
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-gray-400" />
                            <span>{property.guests} Guest{property.guests !== 1 ? 's' : ''}</span>
                          </div>
                        )}
                        {property.area && (
                          <div className="flex items-center gap-2">
                            <Square size={16} className="text-gray-400" />
                            <span>{property.area} m²</span>
                          </div>
                        )}
                      </div>

                      {property.amenities && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {property.amenities.general?.slice(0, 3).map((amenity, idx) => (
                              <span key={idx} className="bg-gray-50 text-gray-600 px-2 py-1 rounded-full text-xs">
                                {amenity.name}
                              </span>
                            ))}
                            {property.amenities.general?.length > 3 && (
                              <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded-full text-xs">
                                +{property.amenities.general.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">
                            ${property.price?.toLocaleString() || "N/A"}
                          </span>
                          <span className="text-gray-500 text-sm ml-1">/night</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePropertyClick(property._id);
                          }}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-orange-500 hover:text-white text-gray-700 rounded-lg transition-all duration-300 text-xs font-medium"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
      
      <GuestSelector 
        isOpen={guestsOpen}
        onClose={() => setGuestsOpen(false)}
        guests={guests}
        onGuestsChange={setGuests}
      />
      
      <Footer/>

      <style>
        {`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        `}
      </style>
    </>
  );
};

export default Properties;