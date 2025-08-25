import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Calendar, Users, ChevronLeft, ChevronRight, ChevronDown, Plus, Minus } from 'lucide-react';
import { createPortal } from "react-dom";

const CustomDatePicker = ({ value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dropdownRef = useRef(null);

  const toggleCalendar = useCallback(() => setIsOpen(!isOpen), [isOpen]);

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

  const formatDate = useCallback((date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }, []);

  const generateCalendar = useCallback(() => {
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
  }, [selectedDate]);

  const isToday = useCallback((date) => date.toDateString() === new Date().toDateString(), []);
  const isSameMonth = useCallback((date) => date.getMonth() === selectedDate.getMonth(), [selectedDate]);
  const isSelected = useCallback((date) => value && date.toDateString() === new Date(value).toDateString(), [value]);
  
  const handleDateSelect = useCallback((date) => { 
    onChange(date.toISOString().split('T')[0]); 
    setIsOpen(false); 
  }, [onChange]);
  
  const nextMonth = useCallback(() => { 
    const newDate = new Date(selectedDate); 
    newDate.setMonth(newDate.getMonth() + 1); 
    setSelectedDate(newDate); 
  }, [selectedDate]);
  
  const prevMonth = useCallback(() => { 
    const newDate = new Date(selectedDate); 
    newDate.setMonth(newDate.getMonth() - 1); 
    setSelectedDate(newDate); 
  }, [selectedDate]);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
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
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={toggleCalendar} />
            <div
              ref={dropdownRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 p-6 w-80 z-[100000]"
            >
              <div className="flex items-center justify-between mb-4">
                <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft className="h-5 w-5" /></button>
                <h3 className="text-lg font-semibold">{monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}</h3>
                <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight className="h-5 w-5" /></button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (<div key={day} className="text-center text-sm font-medium text-gray-500 py-2">{day}</div>))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {generateCalendar().map((date, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(date)}
                    className={`h-10 w-full rounded-lg text-sm font-medium transition-all duration-200
                      ${!isSameMonth(date) ? 'text-gray-300' : 'text-gray-700'}
                      ${isSelected(date) ? 'bg-orange-500 text-white' : ''}
                      ${isToday(date) && !isSelected(date) ? 'bg-blue-500 text-white' : ''}
                      ${!isSelected(date) && !isToday(date) ? 'hover:bg-gray-100' : ''}`}
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

const GuestSelector = React.memo(({ isOpen, onClose, guests, onGuestsChange }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const updateGuestCount = useCallback((type, operation) => {
    const newGuests = { ...guests };
    if (operation === 'increment') newGuests[type] = Math.min(newGuests[type] + 1, type === 'adults' ? 16 : 5);
    else newGuests[type] = Math.max(newGuests[type] - 1, type === 'adults' ? 1 : 0);
    onGuestsChange(newGuests);
  }, [guests, onGuestsChange]);

  const totalGuests = guests.adults + guests.children + guests.infants;
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999]">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div ref={dropdownRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-6 min-w-[320px]">
        <div className="space-y-6">
          {['adults','children','infants'].map((type) => (
            <div key={type} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-black">{type.charAt(0).toUpperCase() + type.slice(1)}</div>
                <div className="text-sm text-gray-500">{type==='adults'?'Ages 13 or above':type==='children'?'Ages 2-12':'Under 2'}</div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => updateGuestCount(type,'decrement')} disabled={guests[type]<= (type==='adults'?1:0)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"><Minus className="h-4 w-4" /></button>
                <span className="w-8 text-center font-medium">{guests[type]}</span>
                <button onClick={() => updateGuestCount(type,'increment')} disabled={guests[type]>= (type==='adults'?16:5)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"><Plus className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
          <div className="pt-4 border-t">
            <button onClick={onClose} className="w-full px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium">Done</button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
});

// Separate typewriter component to isolate re-renders
const TypewriterText = React.memo(() => {
  const [typewriterText, setTypewriterText] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const typewriterTexts = ['Dubai Marina Luxury','Downtown Elegance','Palm Jumeirah Paradise','Emirates Hills Grandeur'];

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
  }, [typewriterText, typewriterIndex, typewriterTexts]);

  return (
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
      {typewriterText}
      <span className="animate-pulse">|</span>
    </h1>
  );
});

const Hero = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState({adults:1, children:0, infants:0});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [guestsOpen, setGuestsOpen] = useState(false);

  const carouselImages = [
    {url:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', title:'Dubai Marina Towers'},
    {url:'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', title:'Burj Khalifa View'},
    {url:'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', title:'Dubai Luxury Hotels'},
    {url:'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', title:'Palm Jumeirah Resort'}
  ];

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, {passive:true});
    return () => {window.removeEventListener('scroll', handleScroll);}
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const handleSearch = useCallback(() => {
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
    // For demo purposes, just log the search params
    console.log('Search params:', searchParams.toString());
  }, [checkIn, checkOut, guests]);

  const handleGuestsChange = useCallback((newGuests) => {
    setGuests(newGuests);
  }, []);

  const handleGuestsClose = useCallback(() => {
    setGuestsOpen(false);
  }, []);

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
                className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`} 
                style={{
                  backgroundImage: `url(${image.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: `translateY(${scrollY * 0.1}px)`
                }} 
              />
            ))}
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 flex flex-col justify-center items-center px-4 text-center">
            <TypewriterText />
            <p className="text-lg md:text-2xl text-white/90 mb-6">Find your dream stay in Dubai</p>

            <div className="flex flex-col md:flex-row gap-4 max-w-4xl w-full mx-auto">
              <CustomDatePicker value={checkIn} onChange={setCheckIn} placeholder="Check-in"/>
              <CustomDatePicker value={checkOut} onChange={setCheckOut} placeholder="Check-out"/>
              <div className="relative w-full">
                <button 
                  onClick={() => setGuestsOpen(true)} 
                  className="w-full h-14 pl-4 pr-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 hover:border-orange-300 hover:shadow-lg bg-white cursor-pointer text-black font-medium text-left"
                >
                  {guestDisplayText}
                </button>
              </div>
              <button 
                onClick={handleSearch} 
                className="h-14 px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5"/>Search
              </button>
            </div>
          </div>
        </section>
        
        <GuestSelector 
          isOpen={guestsOpen} 
          onClose={handleGuestsClose} 
          guests={guests} 
          onGuestsChange={handleGuestsChange}
        />
      </div>
    </>
  );
};

export default Hero;