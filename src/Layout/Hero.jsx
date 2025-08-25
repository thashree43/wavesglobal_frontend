import React, { useState, useEffect, useRef } from 'react';
import { Search, Calendar, Users, ChevronLeft, ChevronRight, ChevronDown, Plus, Minus } from 'lucide-react';
import { createPortal } from "react-dom";

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
        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors z-10" />
        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors z-10" />
        <button
          onClick={toggleCalendar}
          className="w-full h-14 pl-12 pr-12 border border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 hover:border-orange-300 hover:shadow-lg bg-white cursor-pointer text-black font-medium text-left"
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
                         bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 
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

  const totalGuests = guests.adults + guests.children + guests.infants;

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
        <div className="space-y-6">
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

const Hero = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [guestsOpen, setGuestsOpen] = useState(false);

  const typewriterTexts = [
    'Dubai Marina Luxury',
    'Downtown Elegance',
    'Palm Jumeirah Paradise',
    'Emirates Hills Grandeur'
  ];

  const carouselImages = [
    {
      url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Dubai Marina Towers'
    },
    {
      url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Burj Khalifa View'
    },
    {
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Dubai Luxury Hotels'
    },
    {
      url: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Palm Jumeirah Resort'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const currentText = typewriterTexts[typewriterIndex];
    if (typewriterText.length < currentText.length) {
      const timeout = setTimeout(() => {
        setTypewriterText(currentText.slice(0, typewriterText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTypewriterText('');
        setTypewriterIndex((prev) => (prev + 1) % typewriterTexts.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [typewriterText, typewriterIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      alert('Please select both check-in and check-out dates');
      return;
    }

    const searchParams = new URLSearchParams({
      checkin: checkIn,
      checkout: checkOut,
      adults: guests.adults.toString(),
      children: guests.children.toString(),
      infants: guests.infants.toString()
    });

    window.location.href = `/property?${searchParams.toString()}`;
  };

  const totalGuests = guests.adults + guests.children + guests.infants;
  const guestDisplayText = totalGuests === 1 ? '1 Guest' : `${totalGuests} Guests`;

  return (
    <>
<div className="relative overflow-x-hidden pt-[90px] mb-[120px]">
  <section className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
                style={{
                  backgroundImage: `url(${image.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: `translateY(${scrollY * 0.1}px)`
                }}
              />
            ))}
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 p-4 rounded-2xl bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300 z-10 hover:scale-110 hover:shadow-xl"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 p-4 rounded-2xl bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300 z-10 hover:scale-110 hover:shadow-xl"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-orange-500 scale-125 shadow-lg' : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
            <div className="max-w-6xl mx-auto w-full">
              <div className={`transition-all duration-1000 mb-12 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-8 text-white leading-tight">
                  Experience
                  <span className="block text-orange-500 h-16 sm:h-20 md:h-24 overflow-hidden flex items-center justify-center">
                    {typewriterText}
                    <span className="animate-pulse">|</span>
                  </span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed px-4">
                  Discover handpicked luxury properties for unforgettable experiences in Dubai's most prestigious destinations
                </p>
              </div>

              <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl max-w-6xl mx-auto border border-gray-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-black mb-2">Check In</label>
                      <CustomDatePicker
                        value={checkIn}
                        onChange={setCheckIn}
                        placeholder="Select"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-black mb-2">Check Out</label>
                      <CustomDatePicker
                        value={checkOut}
                        onChange={setCheckOut}
                        placeholder="Select"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-black mb-2">Guests</label>
                      <div className="relative group">
                        <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors z-10" />
                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors z-10" />
                        <button
                          onClick={() => setGuestsOpen(!guestsOpen)}
                          className="w-full h-14 pl-12 pr-12 border border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 hover:border-orange-300 hover:shadow-lg bg-white cursor-pointer text-black font-medium text-left"
                        >
                          {guestDisplayText}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3 sm:col-span-2 lg:col-span-1">
                      <label className="block text-sm font-bold invisible">Search</label>
                      <button 
                        onClick={handleSearch}
                        className="w-full h-14 rounded-2xl font-bold text-white bg-black hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl group"
                      >
                        <Search className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                        <span className="tracking-wide">Search Properties</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <GuestSelector 
        isOpen={guestsOpen}
        onClose={() => setGuestsOpen(false)}
        guests={guests}
        onGuestsChange={setGuests}
      />
    </>
  );
};

export default Hero;