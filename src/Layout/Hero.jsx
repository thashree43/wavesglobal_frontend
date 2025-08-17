import React, { useState, useEffect, useRef } from 'react';
import { Search, Calendar, Users, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const CustomDatePicker = ({ value, onChange, placeholder, isOpen, onToggle }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const dropdownRef = useRef(null);
  
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
        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors z-10 pointer-events-none" />
        <input
          type="text"
          value={formatDate(selectedDate)}
          onClick={onToggle}
          readOnly
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 hover:border-orange-300 hover:shadow-lg bg-white text-black font-medium cursor-pointer placeholder:text-gray-400"
        />
      </div>
      
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="fixed bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 p-8 min-w-[380px]"
          style={{
            zIndex: 10000,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={prevMonth}
              className="p-3 hover:bg-orange-50 rounded-2xl transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="h-5 w-5 text-black" />
            </button>
            <h3 className="text-xl font-bold text-black">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              onClick={nextMonth}
              className="p-3 hover:bg-orange-50 rounded-2xl transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="h-5 w-5 text-black" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-6">
            {weekdays.map(day => (
              <div key={day} className="text-center text-sm font-semibold text-gray-500 py-3">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
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
                    h-12 w-12 rounded-2xl text-sm font-semibold transition-all duration-300
                    ${!day.isCurrentMonth ? 'text-gray-300 hover:text-gray-400 hover:bg-gray-50' : 'text-black'}
                    ${isSelected ? 'bg-orange-500 text-white shadow-lg scale-110 hover:shadow-xl' : ''}
                    ${isToday && !isSelected ? 'border-2 border-orange-500 text-orange-500 bg-orange-50' : ''}
                    ${!isSelected && day.isCurrentMonth ? 'hover:bg-gray-50 hover:scale-105' : ''}
                    ${!isSelected && !day.isCurrentMonth ? 'hover:bg-gray-25' : ''}
                  `}
                >
                  {day.date.getDate()}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={onToggle}
            className="absolute top-6 right-6 text-gray-400 hover:text-black text-2xl font-bold hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300"
          >
            ×
          </button>
        </div>
      )}
      
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          style={{ zIndex: 9999 }}
          onClick={onToggle}
        />
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

  return (
    <div className="overflow-x-hidden">
      <section className="relative h-screen overflow-hidden">
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

        <div 
          className="relative z-10 h-full flex items-center justify-center text-center"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 text-white leading-tight">
                Experience
                <span className="block text-orange-500 min-h-[1.2em]">
                  {typewriterText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-16 max-w-4xl mx-auto leading-relaxed">
                Discover handpicked luxury properties for unforgettable experiences in Dubai's most prestigious destinations
              </p>
            </div>

            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} relative`}>
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl max-w-5xl mx-auto border border-gray-100 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="space-y-3 relative">
                    <label className="block text-sm font-bold text-black mb-2">Check In</label>
                    <CustomDatePicker
                      value={checkIn}
                      onChange={setCheckIn}
                      placeholder="Select check-in date"
                      isOpen={checkInOpen}
                      onToggle={() => {
                        setCheckInOpen(!checkInOpen);
                        setCheckOutOpen(false);
                        setGuestsOpen(false);
                      }}
                    />
                  </div>

                  <div className="space-y-3 relative">
                    <label className="block text-sm font-bold text-black mb-2">Check Out</label>
                    <CustomDatePicker
                      value={checkOut}
                      onChange={setCheckOut}
                      placeholder="Select check-out date"
                      isOpen={checkOutOpen}
                      onToggle={() => {
                        setCheckOutOpen(!checkOutOpen);
                        setCheckInOpen(false);
                        setGuestsOpen(false);
                      }}
                    />
                  </div>

                  <div className="space-y-3 relative">
                    <label className="block text-sm font-bold text-black mb-2">Guests</label>
                    <div className="relative group">
                      <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors z-10" />
                      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors z-10" />
                      <button
                        onClick={() => {
                          setGuestsOpen(!guestsOpen);
                          setCheckInOpen(false);
                          setCheckOutOpen(false);
                        }}
                        className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 hover:border-orange-300 hover:shadow-lg bg-white cursor-pointer text-black font-medium text-left"
                      >
                        {guests} Guest{guests > 1 ? 's' : ''}
                      </button>
                      
                      {guestsOpen && (
                        <div className="absolute top-full mt-2 w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 py-4 z-50">
                          {[...Array(10)].map((_, i) => (
                            <button
                              key={i + 1}
                              onClick={() => {
                                setGuests(i + 1);
                                setGuestsOpen(false);
                              }}
                              className="w-full px-6 py-3 text-left hover:bg-orange-50 transition-all duration-200 font-medium text-black hover:text-orange-500"
                            >
                              {i + 1} Guest{i > 0 ? 's' : ''}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-bold invisible">Search</label>
                    <button className="w-full py-4 rounded-2xl font-bold text-white bg-black hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl group">
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
      
      {(guestsOpen || checkInOpen || checkOutOpen) && (
        <div 
          className="fixed inset-0 bg-transparent z-40"
          onClick={() => {
            setGuestsOpen(false);
            setCheckInOpen(false);
            setCheckOutOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Hero;