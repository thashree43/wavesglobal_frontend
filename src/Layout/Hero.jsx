import React, { useState, useEffect, useRef } from 'react';
import { Search, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const CustomDatePicker = ({ value, onChange, placeholder, isOpen, onToggle }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevDate = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: new Date(year, month, day), isCurrentMonth: true });
    }
    
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({ date: new Date(year, month + 1, day), isCurrentMonth: false });
    }
    
    return days;
  };
  
  const handleDateClick = (date) => {
    setSelectedDate(date);
    const dateString = date.toISOString().split('T')[0];
    onChange(dateString);
    onToggle();
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  const days = getDaysInMonth(currentMonth);
  
  return (
    <div className="relative">
      <div className="relative group">
        <Calendar className="absolute left-3 top-3 h-5 w-5 text-slate-500 group-hover:text-amber-500 transition-colors z-10 pointer-events-none" />
        <input
          type="text"
          value={formatDate(selectedDate)}
          onClick={onToggle}
          readOnly
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-400 transition-all duration-300 hover:border-amber-300 focus:ring-2 focus:ring-amber-100 bg-white/90 backdrop-blur-sm text-slate-700 font-medium cursor-pointer"
        />
      </div>
      
      {isOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 z-[99999] min-w-[350px]">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h3 className="text-lg font-semibold text-gray-900">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-4">
            {weekdays.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const isSelected = selectedDate && 
                day.date.getDate() === selectedDate.getDate() &&
                day.date.getMonth() === selectedDate.getMonth() &&
                day.date.getFullYear() === selectedDate.getFullYear();
              
              const isToday = new Date().toDateString() === day.date.toDateString();
              
              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(day.date)}
                  className={`
                    h-10 w-10 rounded-full text-sm font-medium transition-all duration-200
                    ${!day.isCurrentMonth ? 'text-gray-300 hover:text-gray-400' : 'text-gray-900'}
                    ${isSelected ? 'bg-amber-400 text-white shadow-lg scale-110' : ''}
                    ${isToday && !isSelected ? 'border-2 border-amber-400 text-amber-600' : ''}
                    ${!isSelected && day.isCurrentMonth ? 'hover:bg-gray-100' : ''}
                    ${!isSelected && !day.isCurrentMonth ? 'hover:bg-gray-50' : ''}
                  `}
                >
                  {day.date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const Hero = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);

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
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const handleClickOutside = (event) => {
      if (!event.target.closest('.date-picker-container')) {
        setCheckInOpen(false);
        setCheckOutOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
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

  return (
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
        className="absolute left-6 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 z-10 hover:scale-110"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 z-10 hover:scale-110"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-amber-400 scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      <div 
        className="relative z-10 h-full flex items-center justify-center text-center"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Experience
              <span className="block bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent min-h-[1.2em]">
                {typewriterText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
              Discover handpicked luxury properties for unforgettable experiences in Dubai's most prestigious destinations
            </p>
          </div>

          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} relative z-50`}>
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 shadow-2xl max-w-4xl mx-auto border border-white/20 relative z-50 overflow-visible">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                <div className="space-y-2 relative date-picker-container z-50">
                  <label className="block text-sm font-semibold text-slate-700">Check In</label>
                  <CustomDatePicker
                    value={checkIn}
                    onChange={setCheckIn}
                    placeholder="Select check-in date"
                    isOpen={checkInOpen}
                    onToggle={() => {
                      setCheckInOpen(!checkInOpen);
                      setCheckOutOpen(false);
                    }}
                  />
                </div>

                <div className="space-y-2 relative date-picker-container z-50">
                  <label className="block text-sm font-semibold text-slate-700">Check Out</label>
                  <CustomDatePicker
                    value={checkOut}
                    onChange={setCheckOut}
                    placeholder="Select check-out date"
                    isOpen={checkOutOpen}
                    onToggle={() => {
                      setCheckOutOpen(!checkOutOpen);
                      setCheckInOpen(false);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Guests</label>
                  <div className="relative group">
                    <Users className="absolute left-3 top-3 h-5 w-5 text-slate-500 group-hover:text-amber-500 transition-colors" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-400 appearance-none transition-all duration-300 hover:border-amber-300 focus:ring-2 focus:ring-amber-100 bg-white/90 backdrop-blur-sm cursor-pointer text-slate-700 font-medium"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold invisible">Search</label>
                  <button className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                    <Search className="h-5 w-5" />
                    Search Properties
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;