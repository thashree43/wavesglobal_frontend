import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Calendar, Users, ChevronLeft, ChevronRight, ChevronDown, Plus, Minus } from 'lucide-react';
import { createPortal } from "react-dom";
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomDatePicker = ({ value, onChange, placeholder, minDate }) => {
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
  
  const isBeforeMinDate = useCallback((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let compareDate = today;
    
    if (minDate) {
      const min = new Date(minDate);
      min.setHours(0, 0, 0, 0);
      compareDate = min > today ? min : today;
    }
    
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    return checkDate < compareDate;
  }, [minDate]);
  
  const handleDateSelect = useCallback((date) => { 
    if (isBeforeMinDate(date)) {
      toast.error('Cannot select past dates', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`; 
    onChange(formattedDate); 
    setIsOpen(false); 
  }, [onChange, isBeforeMinDate]);
  
  
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
        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors z-10" style={{color: 'rgb(4, 80, 115)'}} />
        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors z-10" style={{color: 'rgb(4, 80, 115)'}} />
        <button
          onClick={toggleCalendar}
          className="w-full h-14 pl-12 pr-12 rounded-2xl focus:outline-none transition-all duration-300 hover:shadow-lg bg-white cursor-pointer font-medium text-left"
          style={{
            border: '2px solid rgb(247, 219, 190)',
            color: 'rgb(0, 31, 60)'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgb(231, 121, 0)';
            e.target.style.boxShadow = '0 0 0 4px rgba(231, 121, 0, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgb(247, 219, 190)';
            e.target.style.boxShadow = 'none';
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = 'rgb(231, 121, 0)';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = 'rgb(247, 219, 190)';
          }}
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
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 w-80 z-[100000]"
              style={{border: '1px solid rgb(247, 219, 190)'}}
            >
              <div className="flex items-center justify-between mb-4">
                <button onClick={prevMonth} className="p-2 rounded-full transition-colors" style={{color: 'rgb(4, 80, 115)'}} onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(247, 219, 190)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}><ChevronLeft className="h-5 w-5" /></button>
                <h3 className="text-lg font-semibold" style={{color: 'rgb(0, 31, 60)'}}>{monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}</h3>
                <button onClick={nextMonth} className="p-2 rounded-full transition-colors" style={{color: 'rgb(4, 80, 115)'}} onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(247, 219, 190)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}><ChevronRight className="h-5 w-5" /></button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (<div key={day} className="text-center text-sm font-medium py-2" style={{color: 'rgb(4, 80, 115)'}}>{day}</div>))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {generateCalendar().map((date, index) => {
                  const isPastDate = isBeforeMinDate(date);
                  return (
                    <button
                      key={index}
                      onClick={() => handleDateSelect(date)}
                      disabled={isPastDate}
                      className="h-10 w-full rounded-lg text-sm font-medium transition-all duration-200"
                      style={{
                        color: isPastDate ? 'rgb(200, 200, 200)' :
                               !isSameMonth(date) ? 'rgb(247, 219, 190)' : 
                               isSelected(date) ? 'white' :
                               isToday(date) ? 'white' : 'rgb(0, 31, 60)',
                        backgroundColor: isSelected(date) ? 'rgb(231, 121, 0)' :
                                       isToday(date) ? 'rgb(4, 80, 115)' : 'transparent',
                        cursor: isPastDate ? 'not-allowed' : 'pointer',
                        opacity: isPastDate ? 0.4 : 1
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected(date) && !isToday(date) && !isPastDate) {
                          e.target.style.backgroundColor = 'rgb(247, 219, 190)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected(date) && !isToday(date) && !isPastDate) {
                          e.target.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
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
      <div ref={dropdownRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 min-w-[320px]" style={{border: '1px solid rgb(247, 219, 190)'}}>
        <div className="space-y-6">
          {['adults','children','infants'].map((type) => (
            <div key={type} className="flex items-center justify-between">
              <div>
                <div className="font-medium" style={{color: 'rgb(0, 31, 60)'}}>{type.charAt(0).toUpperCase() + type.slice(1)}</div>
                <div className="text-sm" style={{color: 'rgb(4, 80, 115)'}}>{type==='adults'?'Ages 13 or above':type==='children'?'Ages 2-12':'Under 2'}</div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => updateGuestCount(type,'decrement')} 
                  disabled={guests[type]<= (type==='adults'?1:0)} 
                  className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  style={{border: '1px solid rgb(247, 219, 190)', color: 'rgb(4, 80, 115)'}}
                  onMouseEnter={(e) => {
                    if (!e.target.disabled) {
                      e.target.style.borderColor = 'rgb(231, 121, 0)';
                      e.target.style.color = 'rgb(231, 121, 0)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.target.disabled) {
                      e.target.style.borderColor = 'rgb(247, 219, 190)';
                      e.target.style.color = 'rgb(4, 80, 115)';
                    }
                  }}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-medium" style={{color: 'rgb(0, 31, 60)'}}>{guests[type]}</span>
                <button 
                  onClick={() => updateGuestCount(type,'increment')} 
                  disabled={guests[type]>= (type==='adults'?16:5)} 
                  className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  style={{border: '1px solid rgb(247, 219, 190)', color: 'rgb(4, 80, 115)'}}
                  onMouseEnter={(e) => {
                    if (!e.target.disabled) {
                      e.target.style.borderColor = 'rgb(231, 121, 0)';
                      e.target.style.color = 'rgb(231, 121, 0)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.target.disabled) {
                      e.target.style.borderColor = 'rgb(247, 219, 190)';
                      e.target.style.color = 'rgb(4, 80, 115)';
                    }
                  }}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          <div className="pt-4" style={{borderTop: '1px solid rgb(247, 219, 190)'}}>
            <button 
              onClick={onClose} 
              className="w-full px-4 py-2 text-white rounded-xl transition-colors font-medium"
              style={{backgroundColor: 'rgb(231, 121, 0)'}}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(250, 153, 56)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(231, 121, 0)'}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
});

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
  const [scrollY, setScrollY] = useState(0);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const navigate = useNavigate();

  const carouselImages = [
    {url:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', title:'Dubai Marina Towers'},
    {url:'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', title:'Burj Khalifa View'},
    {url:'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', title:'Dubai Luxury Hotels'},
    {url:'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', title:'Palm Jumeirah Resort'}
  ];

  useEffect(() => {
    setShowWelcomeModal(true);
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

  useEffect(() => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      if (checkOutDate <= checkInDate) {
        const newCheckOut = new Date(checkInDate);
        newCheckOut.setDate(newCheckOut.getDate() + 1);
        const year = newCheckOut.getFullYear();
        const month = String(newCheckOut.getMonth() + 1).padStart(2, "0");
        const day = String(newCheckOut.getDate()).padStart(2, "0");
        setCheckOut(`${year}-${month}-${day}`);
      }
    }
  }, [checkIn, checkOut]);

  const minCheckOutDate = checkIn ? (() => {
    const date = new Date(checkIn);
    date.setDate(date.getDate() + 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  })() : null;

  const handleSearch = useCallback(() => {
    if (!checkIn || !checkOut) {
      toast.error('Please select both check-in and check-out dates', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    const searchParams = new URLSearchParams({
      checkin: checkIn,
      checkout: checkOut,
      adults: guests.adults.toString(),
      children: guests.children.toString(),
      infants: guests.infants.toString()
    });
    navigate(`/property?${searchParams.toString()}`);
  }, [checkIn, checkOut, guests, navigate]);

  const handleGuestsChange = useCallback((newGuests) => {
    setGuests(newGuests);
  }, []);

  const handleGuestsClose = useCallback(() => {
    setGuestsOpen(false);
  }, []);

  const closeWelcomeModal = useCallback(() => {
    setShowWelcomeModal(false);
  }, []);

  const totalGuests = guests.adults + guests.children + guests.infants;
  const guestDisplayText = totalGuests === 1 ? '1 Guest' : `${totalGuests} Guests`;

  const WelcomeModal = () => {
    if (!showWelcomeModal) return null;

    return createPortal(
      <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-black/80"
          onClick={closeWelcomeModal}
        />
        
        <div className="relative z-10 w-full max-w-4xl bg-transparent">
          <button
            onClick={closeWelcomeModal}
            className="absolute -top-12 right-0 z-20 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="w-full">
            <div className="w-full">
              <img
                src="/wave.webp"
                alt="WAVESCATION Dubai"
                className="w-full h-auto rounded-xl"
                onError={(e) => {
                  console.error("Image failed to load:", e.target.src);
                  e.target.src = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
                }}
              />
            </div>
            
            <div className="mt-6 flex justify-center">
              <Link 
                to="/contact"
                onClick={closeWelcomeModal}
                className="px-10 py-4 rounded-xl font-semibold text-lg transition-all"
                style={{
                  backgroundColor: 'rgb(231, 121, 0)',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgb(250, 153, 56)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgb(231, 121, 0)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Know More
              </Link>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <ToastContainer />
      <WelcomeModal />
      
      <div 
        className="relative overflow-x-hidden pt-[90px] mb-[120px]" 
        style={{ backgroundColor: 'rgb(247, 219, 190)' }}
      >
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

          <div 
            className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center"
            style={{
              background: `linear-gradient(to right, 
                rgba(0, 31, 60, 0.8) 0%, 
                rgba(4, 80, 115, 0.6) 50%, 
                rgba(0, 31, 60, 0.4) 100%)`
            }}
          >
            <TypewriterText />
            <p className="text-lg md:text-2xl text-white/90 mb-6">Find your dream stay in Dubai</p>

            <div className="flex flex-col md:flex-row gap-4 max-w-4xl w-full mx-auto">
              <CustomDatePicker value={checkIn} onChange={setCheckIn} placeholder="Check-in"/>
              <CustomDatePicker value={checkOut} onChange={setCheckOut} placeholder="Check-out" minDate={minCheckOutDate}/>
              <div className="relative w-full">
                <button 
                  onClick={() => setGuestsOpen(true)} 
                  className="w-full h-14 pl-4 pr-4 rounded-2xl focus:outline-none transition-all duration-300 hover:shadow-lg bg-white cursor-pointer font-medium text-left"
                  style={{
                    border: '2px solid rgb(247, 219, 190)',
                    color: 'rgb(0, 31, 60)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgb(231, 121, 0)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(231, 121, 0, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgb(247, 219, 190)';
                    e.target.style.boxShadow = 'none';
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = 'rgb(231, 121, 0)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = 'rgb(247, 219, 190)';
                  }}
                >
                  {guestDisplayText}
                </button>
              </div>
              <button 
                onClick={handleSearch} 
                className="h-14 px-6 rounded-2xl transition-colors text-white font-semibold flex items-center justify-center gap-2"
                style={{backgroundColor: 'rgb(231, 121, 0)'}}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(250, 153, 56)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(231, 121, 0)'}
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