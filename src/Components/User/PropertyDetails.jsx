import React, { useEffect, useState } from 'react';
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
WavesLadder,
Shield,
Clock,
Phone,
Mail,
Calendar,
ChevronLeft,
ChevronRight,
Check,
X,
Map as MapIcon,
CalendarDays,
ChevronDown
} from 'lucide-react';
import Navbar from '../../Layout/Navbar';
import Footer from '../../Layout/Footer';
import axios from 'axios';
import { baseurl } from '../../Base/Base';
import { useParams, useLocation, Link, useNavigate } from "react-router-dom"
import GoogleMapsComponent from '../../Layout/Map';


const PropertyDetailsPage = () => {
const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [selectedDates, setSelectedDates] = useState({ checkin: '', checkout: '' });
const [isMapExpanded, setIsMapExpanded] = useState(false);
const [activeTab, setActiveTab] = useState('overview');
const [amenities, setAmenities] = useState({});
const [property, setProperty] = useState({});
const [showCalendar, setShowCalendar] = useState({ checkin: false, checkout: false });
const [selectedGuests, setSelectedGuests] = useState(1);
const [showGuestDropdown, setShowGuestDropdown] = useState(false);
const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date());
const [bookedDates, setBookedDates] = useState([]);
const [loading, setLoading] = useState(true);
const [userId,setuserId] = useState()
const { id } = useParams();
const location = useLocation();
const navigate = useNavigate();

const PropertySkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-300 h-8 w-3/4 mb-2"></div>
    <div className="bg-gray-300 h-4 w-1/2 mb-4"></div>
    <div className="bg-gray-300 h-64 sm:h-80 lg:h-96 rounded-xl mb-4"></div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {Array(4).fill(0).map((_, i) => (
        <div key={i} className="bg-gray-300 h-24 sm:h-32 rounded-lg"></div>
      ))}
    </div>
  </div>
);

const StatsSkeleton = () => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array(4).fill(0).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gray-200">
            <div className="w-5 h-5 bg-gray-300 rounded"></div>
          </div>
          <div>
            <div className="bg-gray-300 h-3 w-16 mb-1"></div>
            <div className="bg-gray-300 h-4 w-20"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SidebarSkeleton = () => (
  <div className="sticky top-6">
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
      <div className="bg-gray-300 h-8 w-1/2 mb-4"></div>
      <div className="space-y-4 mb-6">
        <div className="bg-gray-300 h-12 rounded-2xl"></div>
        <div className="bg-gray-300 h-12 rounded-2xl"></div>
        <div className="bg-gray-300 h-12 rounded-xl"></div>
      </div>
      <div className="bg-gray-300 h-12 rounded-lg mb-4"></div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="bg-gray-300 h-4 w-24"></div>
          <div className="bg-gray-300 h-4 w-16"></div>
        </div>
        <div className="flex justify-between">
          <div className="bg-gray-300 h-4 w-20"></div>
          <div className="bg-gray-300 h-4 w-12"></div>
        </div>
        <div className="flex justify-between">
          <div className="bg-gray-300 h-4 w-20"></div>
          <div className="bg-gray-300 h-4 w-12"></div>
        </div>
        <hr />
        <div className="flex justify-between">
          <div className="bg-gray-300 h-4 w-16"></div>
          <div className="bg-gray-300 h-4 w-20"></div>
        </div>
      </div>
    </div>
  </div>
);

const getUser = async() => {
  try {
    const response = await axios.get(`${baseurl}User/getuser`, {
      withCredentials: true  
    })
    const user = response.data.user
    console.log("firstoooooo",user._id)
    if(user) {
      setuserId(user._id)
    }
  } catch (error) {
    console.error(error)
  }
} 



  const getProperty = async () => {
  try {
    setLoading(true);
    const response = await axios.get(`${baseurl}user/property/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    });
    
    const data = response.data.property;  
    console.log(data,"here")
    if (data) {
      setProperty(data);
      setAmenities(data.amenities);
      
      if (data.bookings && data.bookings.length > 0) {
        const dates = [];
        data.bookings.forEach(booking => {
          if (booking.bookingStatus === 'confirmed') {
            const checkIn = new Date(booking.checkIn);
            const checkOut = new Date(booking.checkOut);
            
            for (let dt = new Date(checkIn); dt <= checkOut; dt.setDate(dt.getDate() + 1)) {
              dates.push(new Date(dt));
            }
          }
        });
        setBookedDates(dates);
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

useEffect(()=>{
  getUser()
},[])

useEffect(() => {
  const urlParams = new URLSearchParams(location.search);
  const checkinParam = urlParams.get('checkin');
  const checkoutParam = urlParams.get('checkout');
  const guestsParam = urlParams.get('guests');

  if (checkinParam && checkoutParam) {
    setSelectedDates({
      checkin: checkinParam,
      checkout: checkoutParam
    });
  }
  
  if (guestsParam) {
    setSelectedGuests(parseInt(guestsParam) || 1);
  }
}, [location.search]);

const nextImage = () => {
  if (property.images?.length > 0) {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  }
};

const prevImage = () => {
  if (property.images?.length > 0) {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  }
};

const formatPrice = (price) => {
  if (!price) return '$0';
  return `AED ${parseInt(price).toLocaleString()}`;
};

const getIconComponent = (iconName) => {
  const iconMap = {
    'Wifi': Wifi,
    'Car': Car,
    'Coffee': Coffee,
    'Tv': Tv,
    'Wind': Wind,
    'Dumbbell': Dumbbell,
    'WavesLadder': WavesLadder,
    'Shield': Shield,
    'Bath': Bath,
    'Bed': Bed,
    'Users': Users,
  };
  return iconMap[iconName] || Wifi;
};

const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const getFirstDayOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

const isDateDisabled = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) return true;
  
  return bookedDates.some(bookedDate => {
    const bookedDateOnly = new Date(bookedDate);
    bookedDateOnly.setHours(0, 0, 0, 0);
    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);
    return bookedDateOnly.getTime() === dateOnly.getTime();
  });
};

const isDateSelected = (date, type) => {
  const selectedDate = type === 'checkin' ? selectedDates.checkin : selectedDates.checkout;
  if (!selectedDate) return false;
  const selected = new Date(selectedDate);
  return date.toDateString() === selected.toDateString();
};

const CustomCalendar = ({ type, onDateSelect, isOpen, onClose }) => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const daysInMonth = getDaysInMonth(currentCalendarMonth);
  const firstDay = getFirstDayOfMonth(currentCalendarMonth);
  const today = new Date();
  
  const nextMonth = () => {
    setCurrentCalendarMonth(new Date(currentCalendarMonth.getFullYear(), currentCalendarMonth.getMonth() + 1));
  };
  
  const prevMonth = () => {
    setCurrentCalendarMonth(new Date(currentCalendarMonth.getFullYear(), currentCalendarMonth.getMonth() - 1));
  };
  
  const handleDateClick = (day) => {
    const selectedDate = new Date(
      currentCalendarMonth.getFullYear(),
      currentCalendarMonth.getMonth(),
      day
    );
    if (!isDateDisabled(selectedDate)) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const date = String(selectedDate.getDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${date}`;
  
      onDateSelect(dateString);
      onClose();
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 z-50">
      <div className="bg-white border-2 border-gray-200 rounded-xl shadow-2xl p-6 max-w-sm">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h3 className="text-lg font-semibold text-gray-800">
            {monthNames[currentCalendarMonth.getMonth()]} {currentCalendarMonth.getFullYear()}
          </h3>
          <button 
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
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
          {Array(firstDay).fill(null).map((_, index) => (
            <div key={`empty-${index}`} className="h-10"></div>
          ))}
          
          {Array(daysInMonth).fill(null).map((_, index) => {
            const day = index + 1;
            const date = new Date(currentCalendarMonth.getFullYear(), currentCalendarMonth.getMonth(), day);
            const isDisabled = isDateDisabled(date);
            const isSelected = isDateSelected(date, type);
            const isToday = date.toDateString() === today.toDateString();
            
            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                disabled={isDisabled}
                className={`
                  h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200
                  ${isSelected 
                    ? 'bg-orange-500 text-white shadow-md' 
                    : isToday 
                      ? 'bg-orange-100 text-orange-600 border border-orange-300'
                      : isDisabled 
                        ? 'text-gray-300 cursor-not-allowed bg-red-50' 
                        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                  }
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button 
            onClick={onClose}
            className="w-full py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Close Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

const CustomDatePicker = ({ label, value, onChange, isOpen, onToggle }) => {
  return (
    <div className="relative">
      <label className="block text-sm font-semibold mb-2 text-gray-700">{label}</label>
      <div 
        className="w-full p-5 border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-orange-300 hover:shadow-md transition-all duration-300 bg-white group"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-xl bg-orange-50 group-hover:bg-orange-100 transition-colors">
              <CalendarDays className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              {value ? (
                <div>
                  <div className="text-gray-900 font-semibold text-lg">
                    {new Date(value).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {new Date(value).toLocaleDateString('en-US', { 
                      year: 'numeric',
                      weekday: 'short'
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-gray-500 font-medium">Select date</div>
                  <div className="text-gray-400 text-sm">Choose {label.toLowerCase()}</div>
                </div>
              )}
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>
      
      <CustomCalendar 
        type={label.toLowerCase()}
        onDateSelect={onChange}
        isOpen={isOpen}
        onClose={() => setShowCalendar({checkin: false, checkout: false})}
      />
    </div>
  );
};

const GuestSelector = () => {
  return (
    <div className="relative">
      <label className="block text-sm font-semibold mb-2 text-gray-700">Guests</label>
      <div 
        className="w-full p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-orange-300 transition-all duration-200 bg-white"
        onClick={() => setShowGuestDropdown(!showGuestDropdown)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-gray-400" />
            <span className="text-gray-900 font-medium">
              {selectedGuests} {selectedGuests === 1 ? 'Guest' : 'Guests'}
            </span>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showGuestDropdown ? 'rotate-180' : ''}`} />
        </div>
      </div>
      
      {showGuestDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <div className="bg-white border-2 border-gray-200 rounded-xl shadow-xl p-4">
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div 
                  key={num}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedGuests === num 
                      ? 'bg-orange-50 text-orange-600 border border-orange-200' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedGuests(num);
                    setShowGuestDropdown(false);
                  }}
                >
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const calculateNights = () => {
  if (selectedDates.checkin && selectedDates.checkout) {
    const checkin = new Date(selectedDates.checkin);
    const checkout = new Date(selectedDates.checkout);
    const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  }
  return 3;
};

const handleBookNow = async() => {
  if (!selectedDates.checkin || !selectedDates.checkout) {
    alert('Please select check-in and check-out dates');
    return;
  }

  const bookingData = {
    propertyId: property._id,
    propertyTitle: property.title,
    checkinDate: selectedDates.checkin,
    checkoutDate: selectedDates.checkout,
    guests: selectedGuests,
    nights: calculateNights(),
    pricePerNight: property.price,
    totalPrice: (property.price * calculateNights()) + 40,
    cleaningFee: 25,
    serviceFee: 15,
    location: property.location,
    hostName: "Wavescation Team",
    propertyImage: property.images?.[0]?.url
  };

  try {
    const response = await axios.post(`${baseurl}user/add-booking`, bookingData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    
    if (response.status === 200 || response.status === 201) {
      const queryParams = new URLSearchParams({
        userId: userId,
        propertyId: property._id,
        checkin: selectedDates.checkin,
        checkout: selectedDates.checkout,
        guests: selectedGuests,
        totalPrice: (property.price * calculateNights()) + 40
      });
      
      navigate(`/checkout?${queryParams.toString()}`);
    }
  } catch (error) {
    console.error(error);
    alert('Booking failed. Please try again.');
  }
};

useEffect(() => {
  getProperty();
}, []);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (!event.target.closest('.date-picker-container') && !event.target.closest('.guest-selector-container')) {
      setShowCalendar({ checkin: false, checkout: false });
      setShowGuestDropdown(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

return (
  <>
    <Navbar />
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(247, 247, 247)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10 mt-20"> 
        
        {loading ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <PropertySkeleton />
              <StatsSkeleton />
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
                <div className="bg-gray-300 h-6 w-1/2 mb-4"></div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array(6).fill(0).map((_, i) => (
                    <div key={i} className="bg-gray-300 h-16 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <SidebarSkeleton />
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-2">
                    {property.title || 'Property Title'}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" style={{ color: 'rgb(230, 116, 19)' }} />
                      <span className="font-semibold">4.8</span>
                      <span>(124 reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{property.location || 'Location'}</span>
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
                      src={property.images?.[currentImageIndex]?.url || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'} 
                      alt="Property" 
                      className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl"
                    />
                  </div>
                  {property.images?.length > 1 && (
                    <>
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
                    </>
                  )}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {property.images?.map((_, index) => (
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
                  {property.images?.slice(1, 5).map((img, index) => (
                    <img 
                      key={index}
                      src={img.url} 
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
                        <p className="font-semibold">{property.guests || '-'} Guests</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgb(248, 252, 255)' }}>
                        <Bed className="w-5 h-5" style={{ color: 'rgb(230, 116, 19)' }} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Bedrooms</p>
                        <p className="font-semibold">{property.bedrooms || '-'} Bedrooms</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgb(248, 252, 255)' }}>
                        <Bed className="w-5 h-5" style={{ color: 'rgb(230, 116, 19)' }} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Beds</p>
                        <p className="font-semibold">{property.beds || '-'} Beds</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgb(248, 252, 255)' }}>
                        <Bath className="w-5 h-5" style={{ color: 'rgb(230, 116, 19)' }} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Bathrooms</p>
                        <p className="font-semibold">{property.bathrooms || '-'} Bathrooms</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-6">
                    <p className="text-sm text-gray-600 mb-2">Property Type</p>
                    <p className="font-semibold text-lg">{property.type || 'Property Type'}</p>
                  </div>
                </div>

                {property.propertyHighlights?.length > 0 && (
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-4">Property Highlights</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {property.propertyHighlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgb(248, 252, 255)' }}>
                          <Wifi className="w-5 h-5" style={{ color: 'rgb(230, 116, 19)' }} />
                          <span className="text-sm">{highlight.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {property.description && (
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-4">About This Property</h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700">{property.description}</p>
                    </div>
                  </div>
                )}

                {property.roomsAndSpaces && (
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-6">Rooms & Spaces</h2>
                    <div className="space-y-6">
                      {property.roomsAndSpaces.livingRoom && (
                        <div className="border-b border-gray-100 pb-6">
                          <h3 className="font-semibold text-lg mb-2">Living Room</h3>
                          <p className="text-gray-700">{property.roomsAndSpaces.livingRoom}</p>
                        </div>
                      )}
                      {property.roomsAndSpaces.masterBedroom && (
                        <div className="border-b border-gray-100 pb-6">
                          <h3 className="font-semibold text-lg mb-2">Master Bedroom</h3>
                          <p className="text-gray-700">{property.roomsAndSpaces.masterBedroom}</p>
                        </div>
                      )}
                      {property.roomsAndSpaces.secondBedroom && (
                        <div className="border-b border-gray-100 pb-6">
                          <h3 className="font-semibold text-lg mb-2">Second Bedroom</h3>
                          <p className="text-gray-700">{property.roomsAndSpaces.secondBedroom}</p>
                        </div>
                      )}
                      {property.roomsAndSpaces.thirdBedroom && (
                        <div className="border-b border-gray-100 pb-6">
                          <h3 className="font-semibold text-lg mb-2">Third Bedroom</h3>
                          <p className="text-gray-700">{property.roomsAndSpaces.thirdBedroom}</p>
                        </div>
                      )}
                      {property.roomsAndSpaces.kitchen && (
                        <div className="border-b border-gray-100 pb-6">
                          <h3 className="font-semibold text-lg mb-2">Kitchen</h3>
                          <p className="text-gray-700">{property.roomsAndSpaces.kitchen}</p>
                        </div>
                      )}
                      {property.roomsAndSpaces.balcony && (
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Balcony</h3>
                          <p className="text-gray-700">{property.roomsAndSpaces.balcony}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {Object.keys(amenities).length > 0 && (
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-6">Amenities</h2>
                    <div className="space-y-6">
                      {Object.entries(amenities).map(([category, items], index) => (
                        <div key={index}>
                          <h3 className="font-semibold text-lg mb-3 capitalize">{category}</h3>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {items.map((amenity, itemIndex) => (
                              <div key={itemIndex} className="flex items-center gap-3">
                                <Wifi className="w-5 h-5" style={{ color: 'rgb(230, 116, 19)' }} />
                                <span className="text-gray-700">{amenity.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
  
  {property.mapLocation?.lat && property.mapLocation?.lng ? (
    <GoogleMapsComponent 
      lat={property.mapLocation.lat}
      lng={property.mapLocation.lng}
      location={property.location}
      isExpanded={isMapExpanded}
    />
  ) : (
    <div className={`bg-gray-200 rounded-lg ${isMapExpanded ? 'h-96' : 'h-64'} flex items-center justify-center transition-all duration-300`}>
      <div className="text-center">
        <MapIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
        <p className="text-gray-600">Interactive Map</p>
        <p className="text-sm text-gray-500">{property.location}</p>
      </div>
    </div>
  )}
  
  {property.nearbyAttractions?.length > 0 && (
    <div className="mt-4 space-y-2">
      <p className="text-sm text-gray-600"><strong>Nearby Attractions:</strong></p>
      <ul className="text-sm text-gray-700 space-y-1">
        {property.nearbyAttractions.map((attraction, index) => (
          <li key={index}>• {attraction.name} - {attraction.distance}km away</li>
        ))}
      </ul>
    </div>
  )}
</div>

                {property.houseRules && (
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100" >
                    <h2 className="text-xl font-bold mb-6">House Rules</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <Clock className="w-5 h-5" style={{ color: 'rgb(230, 116, 19)' }} />
                          <div>
                            <p className="font-semibold">Check-in</p>
                            <p className="text-gray-600">After {property.houseRules.checkIn || '3:00 PM'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                          <Clock className="w-5 h-5" style={{ color: 'rgb(230, 116, 19)' }} />
                          <div>
                            <p className="font-semibold">Check-out</p>
                            <p className="text-gray-600">Before {property.houseRules.checkOut || '11:00 AM'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5" style={{ color: 'rgb(230, 116, 19)' }} />
                          <div>
                            <p className="font-semibold">Maximum Guests</p>
                            <p className="text-gray-600">{property.houseRules.maxGuests || property.guests || 6} Guests</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          {property.houseRules.smoking ? 
                            <Check className="w-5 h-5 text-green-500" /> : 
                            <X className="w-5 h-5 text-red-500" />
                          }
                          <span>{property.houseRules.smoking ? 'Smoking allowed' : 'No smoking'}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {property.houseRules.parties ? 
                            <Check className="w-5 h-5 text-green-500" /> : 
                            <X className="w-5 h-5 text-red-500" />
                          }
                          <span>{property.houseRules.parties ? 'Parties allowed' : 'No parties or events'}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {property.houseRules.pets ? 
                            <Check className="w-5 h-5 text-green-500" /> : 
                            <X className="w-5 h-5 text-red-500" />
                          }
                          <span>{property.houseRules.pets ? 'Pets allowed' : 'No pets'}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {property.houseRules.children ? 
                            <Check className="w-5 h-5 text-green-500" /> : 
                            <X className="w-5 h-5 text-red-500" />
                          }
                          <span>{property.houseRules.children ? 'Children welcome' : 'No children'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {property.extraServices?.length > 0 && (
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-6">Extra Services</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {property.extraServices.map((service, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <h3 className="font-semibold mb-2">{service.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                          <p className="font-semibold" style={{ color: 'rgb(230, 116, 19)' }}>${service.price} per trip</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-6 space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100" style={{backgroundColor: 'rgb(247, 219, 190)'  }}>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-2xl font-bold">{formatPrice(property.price)} <span className="text-base font-normal text-gray-600">/ night</span></p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 fill-current" style={{ color: 'rgb(230, 116, 19)' }} />
                          <span className="text-sm">4.8 (124 reviews)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6 date-picker-container">
                      <CustomDatePicker
                        label="Check-in"
                        value={selectedDates.checkin}
                        onChange={(date) => setSelectedDates({...selectedDates, checkin: date})}
                        isOpen={showCalendar.checkin}
                        onToggle={() => setShowCalendar({checkin: !showCalendar.checkin, checkout: false})}
                      />
                      <CustomDatePicker
                        label="Check-out"
                        value={selectedDates.checkout}
                        onChange={(date) => setSelectedDates({...selectedDates, checkout: date})}
                        isOpen={showCalendar.checkout}
                        onToggle={() => setShowCalendar({checkin: false, checkout: !showCalendar.checkout})}
                      />
                      <div className="guest-selector-container">
                        <GuestSelector />
                      </div>
                    </div>

                    <button 
                      onClick={handleBookNow}
                      className="w-full py-3 rounded-lg font-semibold text-white transition-colors mb-4"
                      style={{ 
                        background: `linear-gradient(to right, rgb(231, 121, 0), rgb(250, 153, 56))`,
                      }}                      >
                      Book Now
                    </button>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>{formatPrice(property.price)} × {calculateNights()} nights</span>
                        <span>{formatPrice(property.price * calculateNights())}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cleaning fee</span>
                        <span>AED 25</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service fee</span>
                        <span>AED 15</span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>{formatPrice((property.price * calculateNights()) + 40)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100" style={{backgroundColor: 'rgb(247, 219, 190)'  }}>
                    <div className="flex items-center gap-4 mb-4">
                      
                      <div>
                        <h3 className="font-semibold text-lg">Wavescation Team</h3>
                        <p className="text-gray-600 text-sm">Professional Property Management</p>
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
                      <button className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 bg-white">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">Call</span>
                      </button>
                      <button className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 bg-white">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">Message</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100" style={{backgroundColor: 'rgb(247, 219, 190)'  }}>
                    <h3 className="font-semibold text-lg mb-4">Quick Info</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property ID</span>
                        <span className="font-medium">#{property._id?.slice(-8) || 'N/A'}</span>
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

            <div className="mt-12 bg-white rounded-xl p-8 shadow-sm border border-gray-100"  style={{backgroundColor: 'rgb(247, 219, 190)'  }}>
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Ready to Book Your Stay?</h2>
                <p className="text-gray-600 mb-6">
                  Experience luxury living with this stunning property. Book now for the best rates and instant confirmation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={handleBookNow}
                    className="px-8 py-3 rounded-lg font-semibold text-white transition-colors"
                    style={{ 
                      background: `linear-gradient(to right, rgb(231, 121, 0), rgb(250, 153, 56))`,
                    }}  
                  >
                    Book Now - {formatPrice(property.price)}/night
                  </button>
                  <Link to="/property">
                    <button className="px-8 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors bg-white">
                      View More Properties
                    </button>
                  </Link>
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
          </>
        )}
      </div>
    </div>
    <Footer/>
  </>
);
};

export default PropertyDetailsPage;