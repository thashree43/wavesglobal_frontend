import React, { useState, useEffect } from 'react';
import { X, Plus, Upload, Check, Wifi, Wind, Tv, Car, Coffee, Dumbbell, WavesLadder, Shield, MapPin, Calendar, ChevronLeft, ChevronRight, Edit2 } from 'lucide-react';

const PropertyModal = ({ isOpen, onClose, onSubmit, editingProperty, neighborhoods = [], propertyTypes = [], loading }) => {
  const safeNeighborhoods = neighborhoods || [];
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Apartment',
    location: '',
    neighborhood: '',
    pricing: {
      night: '',
      week: '',
      month: '',
      year: '',
      weekdays: {
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: ''
      },
      customDates: []
    },
    fees: {
      cleaningFee: '',
      serviceFee: '',
      cityTourismTax: '',
      vatGst: '',
      damageDeposit: ''
    },
    bedrooms: '',
    bathrooms: '',
    area: '',
    guests: '',
    beds: '',
    propertyHighlights: [],
    amenities: {
      general: [],
      kitchen: [],
      recreation: [],
      safety: []
    },
    roomsAndSpaces: {
      livingRoom: '',
      masterBedroom: '',
      secondBedroom: '',
      thirdBedroom: '',
      kitchen: '',
      balcony: ''
    },
    nearbyAttractions: [],
    houseRules: {
      checkIn: '15:00',
      checkOut: '11:00',
      maxGuests: '',
      smoking: false,
      parties: false,
      pets: false,
      children: false
    },
    extraServices: [],
    availability: {
      blockedDates: []
    },
    status: true,
    images: [],
    mapLocation: { lat: '', lng: '' }
  });

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [customPriceInput, setCustomPriceInput] = useState('');
  const [customPriceLabel, setCustomPriceLabel] = useState('');
  const [editingCustomPrice, setEditingCustomPrice] = useState(null);
  const [newBlockedDate, setNewBlockedDate] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  });

  const propertyHighlightsOptions = [
    { icon: Wifi, name: 'High-Speed WiFi' },
    { icon: WavesLadder, name: 'Swimming Pool' },
    { icon: MapPin, name: '2km to Burj Khalifa' },
    { icon: Car, name: 'Free Parking' },
    { icon: Dumbbell, name: 'Gym Access' },
    { icon: Shield, name: '24/7 Security' },
    { icon: Wind, name: 'Air Conditioning' },
    { icon: Tv, name: 'Smart TV' }
  ];

  const amenitiesOptions = {
    general: [
      { icon: Wifi, name: 'Free WiFi' },
      { icon: Wind, name: 'Air Conditioning' },
      { icon: Tv, name: 'Smart TV' },
      { icon: Car, name: 'Free Parking' },
      { icon: Shield, name: 'Elevator' },
      { icon: Wifi, name: 'High-Speed Internet' }
    ],
    kitchen: [
      { icon: Coffee, name: 'Coffee Machine' },
      { icon: Coffee, name: 'Microwave' },
      { icon: Coffee, name: 'Refrigerator' },
      { icon: Coffee, name: 'Dishwasher' },
      { icon: Coffee, name: 'Oven' },
      { icon: Coffee, name: 'Stovetop' }
    ],
    recreation: [
      { icon: WavesLadder, name: 'Swimming Pool' },
      { icon: Dumbbell, name: 'Gym Access' },
      { icon: MapPin, name: 'Balcony View' },
      { icon: Tv, name: 'Game Room' },
      { icon: Car, name: 'Tennis Court' },
      { icon: WavesLadder, name: 'Spa Access' }
    ],
    safety: [
      { icon: Shield, name: 'Security System' },
      { icon: Shield, name: 'Fire Extinguisher' },
      { icon: Shield, name: '24/7 Security' },
      { icon: Shield, name: 'Smoke Detector' },
      { icon: Shield, name: 'First Aid Kit' },
      { icon: Shield, name: 'Safe' }
    ]
  };

  const extraServicesOptions = [
    { name: 'Airport Transfer', description: 'Private car pickup from Dubai International Airport', price: '45' },
    { name: 'Extra Cleaning', description: 'Additional deep cleaning service during your stay', price: '25' },
    { name: 'Baby Equipment', description: 'Crib, high chair, and baby safety equipment', price: '15' },
    { name: 'Grocery Delivery', description: 'Pre-arrival grocery shopping and stocking', price: '20' }
  ];

  const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const getMonthDays = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const formatDateString = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isDateInRange = (date, start, end) => {
    if (!date || !start || !end) return false;
    const dateTime = date.getTime();
    const startTime = start.getTime();
    const endTime = end.getTime();
    return dateTime >= startTime && dateTime <= endTime;
  };

  const getPriceForDate = (date) => {
    if (!date) return null;
    
    const dateStr = formatDateString(date);
    const customPrice = formData.pricing.customDates.find(custom => {
      return isDateInRange(date, new Date(custom.startDate), new Date(custom.endDate));
    });
    
    if (customPrice) {
      return customPrice.price;
    }
    
    const dayName = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][date.getDay()];
    if (formData.pricing.weekdays[dayName]) {
      return formData.pricing.weekdays[dayName];
    }
    
    return formData.pricing.night || null;
  };

  const handleDateClick = (date) => {
    if (!date) return;
    
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: date, end: null });
    } else {
      if (date < selectedRange.start) {
        setSelectedRange({ start: date, end: selectedRange.start });
      } else {
        setSelectedRange({ start: selectedRange.start, end: date });
      }
    }
  };

  const handleSetCustomPrice = () => {
    if (!selectedRange.start || !selectedRange.end) {
      alert('Please select a date range first');
      return;
    }
    
    if (!customPriceInput || parseFloat(customPriceInput) <= 0) {
      alert('Please enter a valid price');
      return;
    }

    const newCustomDate = {
      startDate: formatDateString(selectedRange.start),
      endDate: formatDateString(selectedRange.end),
      price: parseFloat(customPriceInput),
      label: customPriceLabel || ''
    };

    if (editingCustomPrice !== null) {
      const updatedCustomDates = [...formData.pricing.customDates];
      updatedCustomDates[editingCustomPrice] = newCustomDate;
      setFormData(prev => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          customDates: updatedCustomDates
        }
      }));
      setEditingCustomPrice(null);
    } else {
      setFormData(prev => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          customDates: [...prev.pricing.customDates, newCustomDate]
        }
      }));
    }

    setSelectedRange({ start: null, end: null });
    setCustomPriceInput('');
    setCustomPriceLabel('');
  };

  const handleEditCustomPrice = (index) => {
    const customDate = formData.pricing.customDates[index];
    setSelectedRange({
      start: new Date(customDate.startDate),
      end: new Date(customDate.endDate)
    });
    setCustomPriceInput(customDate.price.toString());
    setCustomPriceLabel(customDate.label || '');
    setEditingCustomPrice(index);
  };

  const handleRemoveCustomPrice = (index) => {
    setFormData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        customDates: prev.pricing.customDates.filter((_, i) => i !== index)
      }
    }));
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  useEffect(() => {
    if (editingProperty) {
      const imagesWithIds = editingProperty.images ? editingProperty.images.map((image, index) => ({
        ...image,
        id: image.id || `existing-${index}-${Date.now()}`
      })) : [];
  
      let neighborhoodValue = '';
      if (editingProperty.neighborhood && neighborhoods && neighborhoods.length > 0) {
        if (typeof editingProperty.neighborhood === 'object' && editingProperty.neighborhood._id) {
          neighborhoodValue = editingProperty.neighborhood._id;
        } else if (typeof editingProperty.neighborhood === 'string') {
          const matchedNeighborhood = neighborhoods.find(
            n => n._id === editingProperty.neighborhood || n.name === editingProperty.neighborhood
          );
          neighborhoodValue = matchedNeighborhood ? matchedNeighborhood._id : '';
        }
      }

      const cleanPricing = {
        night: editingProperty.pricing?.night ? editingProperty.pricing.night.toString().replace('AED ', '').replace(/,/g, '') : '',
        week: editingProperty.pricing?.week ? editingProperty.pricing.week.toString().replace('AED ', '').replace(/,/g, '') : '',
        month: editingProperty.pricing?.month ? editingProperty.pricing.month.toString().replace('AED ', '').replace(/,/g, '') : '',
        year: editingProperty.pricing?.year ? editingProperty.pricing.year.toString().replace('AED ', '').replace(/,/g, '') : '',
        weekdays: {
          monday: editingProperty.pricing?.weekdays?.monday || '',
          tuesday: editingProperty.pricing?.weekdays?.tuesday || '',
          wednesday: editingProperty.pricing?.weekdays?.wednesday || '',
          thursday: editingProperty.pricing?.weekdays?.thursday || '',
          friday: editingProperty.pricing?.weekdays?.friday || '',
          saturday: editingProperty.pricing?.weekdays?.saturday || '',
          sunday: editingProperty.pricing?.weekdays?.sunday || ''
        },
        customDates: editingProperty.pricing?.customDates || []
      };

      const cleanFees = {
        cleaningFee: editingProperty.fees?.cleaningFee ? editingProperty.fees.cleaningFee.toString() : '',
        serviceFee: editingProperty.fees?.serviceFee ? editingProperty.fees.serviceFee.toString() : '',
        cityTourismTax: editingProperty.fees?.cityTourismTax ? editingProperty.fees.cityTourismTax.toString() : '',
        vatGst: editingProperty.fees?.vatGst ? editingProperty.fees.vatGst.toString() : '',
        damageDeposit: editingProperty.fees?.damageDeposit ? editingProperty.fees.damageDeposit.toString() : ''
      };

      setFormData({
        ...editingProperty,
        pricing: cleanPricing,
        fees: cleanFees,
        area: editingProperty.area ? editingProperty.area.toString().replace(' sqft', '') : '',
        status: editingProperty.status === 'Available' || editingProperty.status === true,
        neighborhood: neighborhoodValue,
        propertyHighlights: editingProperty.propertyHighlights || [],
        amenities: editingProperty.amenities || {
          general: [],
          kitchen: [],
          recreation: [],
          safety: []
        },
        roomsAndSpaces: editingProperty.roomsAndSpaces || {
          livingRoom: '',
          masterBedroom: '',
          secondBedroom: '',
          thirdBedroom: '',
          kitchen: '',
          balcony: ''
        },
        nearbyAttractions: editingProperty.nearbyAttractions || [],
        houseRules: editingProperty.houseRules || {
          checkIn: '15:00',
          checkOut: '11:00',
          maxGuests: '',
          smoking: false,
          parties: false,
          pets: false,
          children: false
        },
        extraServices: editingProperty.extraServices || [],
        availability: editingProperty.availability || {
          blockedDates: []
        },
        images: imagesWithIds,
        mapLocation: editingProperty.mapLocation || { lat: '', lng: '' }
      });
    } else {
      setFormData({
        title: '',
        description: '',
        type: 'Apartment',
        location: '',
        neighborhood: '',
        pricing: {
          night: '',
          week: '',
          month: '',
          year: '',
          weekdays: {
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
            saturday: '',
            sunday: ''
          },
          customDates: []
        },
        fees: {
          cleaningFee: '',
          serviceFee: '',
          cityTourismTax: '',
          vatGst: '',
          damageDeposit: ''
        },
        bedrooms: '',
        bathrooms: '',
        area: '',
        guests: '',
        beds: '',
        propertyHighlights: [],
        amenities: {
          general: [],
          kitchen: [],
          recreation: [],
          safety: []
        },
        roomsAndSpaces: {
          livingRoom: '',
          masterBedroom: '',
          secondBedroom: '',
          thirdBedroom: '',
          kitchen: '',
          balcony: ''
        },
        nearbyAttractions: [],
        houseRules: {
          checkIn: '15:00',
          checkOut: '11:00',
          maxGuests: '',
          smoking: false,
          parties: false,
          pets: false,
          children: false
        },
        extraServices: [],
        availability: {
          blockedDates: []
        },
        status: true,
        images: [],
        mapLocation: { lat: '', lng: '' }
      });
    }
  }, [editingProperty, neighborhoods]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'lat' || name === 'lng') {
      setFormData(prev => ({
        ...prev,
        mapLocation: {
          ...prev.mapLocation,
          [name]: value
        }
      }));
    } else if (name.startsWith('pricing.weekdays.')) {
      const day = name.split('.')[2];
      setFormData(prev => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          weekdays: {
            ...prev.pricing.weekdays,
            [day]: value
          }
        }
      }));
    } else if (name.startsWith('pricing.')) {
      const pricingField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          [pricingField]: value
        }
      }));
    } else if (name.startsWith('fees.')) {
      const feeField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        fees: {
          ...prev.fees,
          [feeField]: value
        }
      }));
    } else if (name.startsWith('rooms.')) {
      const roomField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        roomsAndSpaces: {
          ...prev.roomsAndSpaces,
          [roomField]: value
        }
      }));
    } else if (name.startsWith('rules.')) {
      const ruleField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        houseRules: {
          ...prev.houseRules,
          [ruleField]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleHighlightToggle = (highlight) => {
    setFormData(prev => ({
      ...prev,
      propertyHighlights: prev.propertyHighlights.find(h => h.name === highlight.name)
        ? prev.propertyHighlights.filter(h => h.name !== highlight.name)
        : [...prev.propertyHighlights, highlight]
    }));
  };

  const handleAmenityToggle = (category, amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [category]: prev.amenities[category].find(a => a.name === amenity.name)
          ? prev.amenities[category].filter(a => a.name !== amenity.name)
          : [...prev.amenities[category], amenity]
      }
    }));
  };

  const handleExtraServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      extraServices: prev.extraServices.find(s => s.name === service.name)
        ? prev.extraServices.filter(s => s.name !== service.name)
        : [...prev.extraServices, service]
    }));
  };

  const handleNearbyAttractionChange = (index, field, value) => {
    const newAttractions = [...formData.nearbyAttractions];
    if (!newAttractions[index]) {
      newAttractions[index] = { name: '', distance: '' };
    }
    newAttractions[index][field] = value;
    setFormData(prev => ({
      ...prev,
      nearbyAttractions: newAttractions
    }));
  };

  const addNearbyAttraction = () => {
    setFormData(prev => ({
      ...prev,
      nearbyAttractions: [...prev.nearbyAttractions, { name: '', distance: '' }]
    }));
  };

  const removeNearbyAttraction = (index) => {
    setFormData(prev => ({
      ...prev,
      nearbyAttractions: prev.nearbyAttractions.filter((_, i) => i !== index)
    }));
  };

  const handleAddBlockedDate = () => {
    if (!newBlockedDate.startDate || !newBlockedDate.endDate) {
      alert('Please select both start and end dates');
      return;
    }
    if (new Date(newBlockedDate.startDate) > new Date(newBlockedDate.endDate)) {
      alert('End date must be after start date');
      return;
    }
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        blockedDates: [
          ...prev.availability.blockedDates,
          {
            startDate: newBlockedDate.startDate,
            endDate: newBlockedDate.endDate,
            reason: newBlockedDate.reason || 'Blocked by admin'
          }
        ]
      }
    }));
    setNewBlockedDate({ startDate: '', endDate: '', reason: '' });
  };

  const removeBlockedDate = (index) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        blockedDates: prev.availability.blockedDates.filter((_, i) => i !== index)
      }
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const currentImageCount = formData.images.length;
    const remainingSlots = 10 - currentImageCount;
    const filesToProcess = files.slice(0, remainingSlots);
    if (files.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots} more images. Maximum 10 images allowed.`);
    }
    const imagePromises = filesToProcess.map((file, index) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            id: `new-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
            url: e.target.result,
            name: file.name
          });
        };
        reader.readAsDataURL(file);
      });
    });
    Promise.all(imagePromises).then(images => {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...images]
      }));
    });
  };

  const removeImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.images.length < 5) {
      alert('Please upload at least 5 images (minimum required)');
      return;
    }
    if (!formData.pricing.night && !formData.pricing.week && !formData.pricing.month && !formData.pricing.year) {
      alert('Please provide at least one pricing option (night, week, month, or year)');
      return;
    }
    onSubmit(formData, !!editingProperty);
  };

  if (!isOpen) return null;

  const monthDays = getMonthDays(currentDate.getFullYear(), currentDate.getMonth());
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900">
            {editingProperty ? 'Edit Property' : 'Add New Property'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Luxury Penthouse Marina View"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Full details, amenities, surrounding areas..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Neighborhood/Area
                  </label>
                  <select
  name="neighborhood"
  value={formData.neighborhood}
  onChange={handleInputChange}
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
>
  <option value="">Select Neighborhood</option>
  {neighborhoods && neighborhoods.map(area => (
    <option key={area._id} value={area._id}>
      {area.name}
    </option>
  ))}
</select>
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Address *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Full address with map integration"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Latitude *
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="lat"
                    value={formData.mapLocation.lat}
                    onChange={handleInputChange}
                    placeholder="e.g., 25.0772"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Longitude *
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="lng"
                    value={formData.mapLocation.lng}
                    onChange={handleInputChange}
                    placeholder="e.g., 55.1369"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing (Add at least one) *</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Per Night (AED)
                  </label>
                  <input
                    type="number"
                    name="pricing.night"
                    value={formData.pricing.night}
                    onChange={handleInputChange}
                    placeholder="e.g., 500"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Per Week (AED)
                  </label>
                  <input
                    type="number"
                    name="pricing.week"
                    value={formData.pricing.week}
                    onChange={handleInputChange}
                    placeholder="e.g., 3000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Per Month (AED)
                  </label>
                  <input
                    type="number"
                    name="pricing.month"
                    value={formData.pricing.month}
                    onChange={handleInputChange}
                    placeholder="e.g., 10000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Per Year (AED)
                  </label>
                  <input
                    type="number"
                    name="pricing.year"
                    value={formData.pricing.year}
                    onChange={handleInputChange}
                    placeholder="e.g., 100000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="border-t border-gray-300 pt-4 mb-6">
                <h4 className="text-md font-semibold text-gray-800 mb-3">Weekday-Specific Pricing (Optional)</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {weekdays.map(day => (
                    <div key={day}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                        {day} (AED/night)
                      </label>
                      <input
                        type="number"
                        name={`pricing.weekdays.${day}`}
                        value={formData.pricing.weekdays[day]}
                        onChange={handleInputChange}
                        placeholder={`e.g., ${day === 'friday' || day === 'saturday' ? '700' : '450'}`}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  If weekday prices are set, they override the general nightly price for specific days
                </p>
              </div>

              <div className="border-t border-gray-300 pt-4">
                <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Calendar size={18} />
                  Custom Date Pricing (Optional)
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Set specific prices for date ranges (holidays, peak seasons, etc.)
                </p>

                <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      type="button"
                      onClick={() => navigateMonth(-1)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <h5 className="font-semibold text-gray-900">{monthName}</h5>
                    <button
                      type="button"
                      onClick={() => navigateMonth(1)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-xs font-medium text-gray-600 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {monthDays.map((date, index) => {
                      if (!date) {
                        return <div key={`empty-${index}`} className="aspect-square"></div>;
                      }

                      const price = getPriceForDate(date);
                      const isInSelectedRange = selectedRange.start && selectedRange.end && 
                        isDateInRange(date, selectedRange.start, selectedRange.end);
                      const isStartDate = selectedRange.start && date.getTime() === selectedRange.start.getTime();
                      const isEndDate = selectedRange.end && date.getTime() === selectedRange.end.getTime();
                      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => !isPast && handleDateClick(date)}
                          disabled={isPast}
                          className={`aspect-square p-1 border rounded-lg text-sm transition-colors relative ${
                            isPast
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : isStartDate || isEndDate
                              ? 'bg-blue-500 text-white border-blue-600'
                              : isInSelectedRange
                              ? 'bg-blue-100 border-blue-300'
                              : 'bg-white hover:bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="font-medium">{date.getDate()}</div>
                          {price && (
                            <div className="text-[9px] leading-tight mt-0.5">
                              د.إ{price}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedRange.start && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-blue-900 mb-3">
                      {selectedRange.end
                        ? `Selected: ${selectedRange.start.toLocaleDateString()} - ${selectedRange.end.toLocaleDateString()}`
                        : `Start Date: ${selectedRange.start.toLocaleDateString()} (Click another date to complete range)`
                      }
                    </p>

                    {selectedRange.end && (
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price Per Night (AED) *
                          </label>
                          <input
                            type="number"
                            value={customPriceInput}
                            onChange={(e) => setCustomPriceInput(e.target.value)}
                            placeholder="e.g., 800"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Label (Optional)
                          </label>
                          <input
                            type="text"
                            value={customPriceLabel}
                            onChange={(e) => setCustomPriceLabel(e.target.value)}
                            placeholder="e.g., Holiday Season"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <button
                            type="button"
                            onClick={handleSetCustomPrice}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            {editingCustomPrice !== null ? 'Update Price' : 'Set Price'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedRange({ start: null, end: null });
                              setCustomPriceInput('');
                              setCustomPriceLabel('');
                              setEditingCustomPrice(null);
                            }}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {formData.pricing.customDates.length > 0 && (
                  <div>
                    <h5 className="text-sm font-semibold text-gray-800 mb-3">Custom Price Ranges</h5>
                    <div className="space-y-2">
                      {formData.pricing.customDates.map((custom, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(custom.startDate).toLocaleDateString()} - {new Date(custom.endDate).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-600">
                              AED {custom.price}/night
                              {custom.label && <span className="ml-2 text-green-700">({custom.label})</span>}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleEditCustomPrice(index)}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveCustomPrice(index)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Fees & Charges</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cleaning Fee (AED)
                  </label>
                  <input
                    type="number"
                    name="fees.cleaningFee"
                    value={formData.fees.cleaningFee}
                    onChange={handleInputChange}
                    placeholder="e.g., 150"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Fee (AED)
                  </label>
                  <input
                    type="number"
                    name="fees.serviceFee"
                    value={formData.fees.serviceFee}
                    onChange={handleInputChange}
                    placeholder="e.g., 100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City / Tourism Tax (%)
                  </label>
                  <input
                    type="number"
                    name="fees.cityTourismTax"
                    value={formData.fees.cityTourismTax}
                    onChange={handleInputChange}
                    placeholder="e.g., 50"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    VAT / GST (%)
                  </label>
                  <input
                    type="number"
                    name="fees.vatGst"
                    value={formData.fees.vatGst}
                    onChange={handleInputChange}
                    placeholder="e.g., 75"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Damage Deposit (AED)
                  </label>
                  <input
                    type="number"
                    name="fees.damageDeposit"
                    value={formData.fees.damageDeposit}
                    onChange={handleInputChange}
                    placeholder="e.g., 500"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar size={20} />
                Availability Management
              </h3>
              <div className="mb-4">
                <h4 className="text-md font-medium text-gray-800 mb-3">Block Dates</h4>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={newBlockedDate.startDate}
                      onChange={(e) => setNewBlockedDate(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={newBlockedDate.endDate}
                      onChange={(e) => setNewBlockedDate(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason (Optional)
                    </label>
                    <input
                      type="text"
                      value={newBlockedDate.reason}
                      onChange={(e) => setNewBlockedDate(prev => ({ ...prev, reason: e.target.value }))}
                      placeholder="e.g., Maintenance"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddBlockedDate}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Plus size={16} />
                  Block These Dates
                </button>
              </div>
              {formData.availability.blockedDates.length > 0 && (
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-3">Blocked Dates List</h4>
                  <div className="space-y-2">
                    {formData.availability.blockedDates.map((blocked, index) => (
                      <div key={index} className="flex items-center justify-between bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(blocked.startDate).toLocaleDateString()} - {new Date(blocked.endDate).toLocaleDateString()}
                          </p>
                          {blocked.reason && (
                            <p className="text-xs text-gray-600 mt-1">{blocked.reason}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeBlockedDate(index)}
                          className="px-3 py-1 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area (sq ft)
                  </label>
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="e.g., 3500"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guests
                  </label>
                  <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    placeholder="e.g., 6"
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    placeholder="e.g., 4"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    placeholder="e.g., 5"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Beds
                  </label>
                  <input
                    type="number"
                    name="beds"
                    value={formData.beds}
                    onChange={handleInputChange}
                    placeholder="e.g., 4"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Highlights</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {propertyHighlightsOptions.map((highlight) => {
                  const Icon = highlight.icon;
                  const isSelected = formData.propertyHighlights.find(h => h.name === highlight.name);
                  return (
                    <button
                      key={highlight.name}
                      type="button"
                      onClick={() => handleHighlightToggle(highlight)}
                      className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
                        isSelected
                          ? 'bg-blue-50 border-blue-300 text-blue-700'
                          : 'bg-white border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={16} />
                      <span className="text-sm">{highlight.name}</span>
                      {isSelected && <Check size={14} className="ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
              {Object.entries(amenitiesOptions).map(([category, amenities]) => (
                <div key={category} className="mb-6 last:mb-0">
                  <h4 className="font-medium text-gray-800 mb-3 capitalize">{category}</h4>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {amenities.map((amenity) => {
                      const Icon = amenity.icon;
                      const isSelected = formData.amenities[category].find(a => a.name === amenity.name);
                      return (
                        <button
                          key={amenity.name}
                          type="button"
                          onClick={() => handleAmenityToggle(category, amenity)}
                          className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
                            isSelected
                              ? 'bg-blue-50 border-blue-300 text-blue-700'
                              : 'bg-white border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <Icon size={16} />
                          <span className="text-sm">{amenity.name}</span>
                          {isSelected && <Check size={14} className="ml-auto" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rooms & Spaces</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Living Room
                  </label>
                  <textarea
                    name="rooms.livingRoom"
                    value={formData.roomsAndSpaces.livingRoom}
                    onChange={handleInputChange}
                    rows="2"
                    placeholder="Describe the living room..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Master Bedroom
                  </label>
                  <textarea
                    name="rooms.masterBedroom"
                    value={formData.roomsAndSpaces.masterBedroom}
                    onChange={handleInputChange}
                    rows="2"
                    placeholder="Describe the master bedroom..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Second Bedroom
                  </label>
                  <textarea
                    name="rooms.secondBedroom"
                    value={formData.roomsAndSpaces.secondBedroom}
                    onChange={handleInputChange}
                    rows="2"
                    placeholder="Describe the second bedroom..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Third Bedroom
                  </label>
                  <textarea
                    name="rooms.thirdBedroom"
                    value={formData.roomsAndSpaces.thirdBedroom}
                    onChange={handleInputChange}
                    rows="2"
                    placeholder="Describe the third bedroom..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kitchen
                  </label>
                  <textarea
                    name="rooms.kitchen"
                    value={formData.roomsAndSpaces.kitchen}
                    onChange={handleInputChange}
                    rows="2"
                    placeholder="Describe the kitchen..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Balcony
                  </label>
                  <textarea
                    name="rooms.balcony"
                    value={formData.roomsAndSpaces.balcony}
                    onChange={handleInputChange}
                    rows="2"
                    placeholder="Describe the balcony..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nearby Attractions</h3>
              {formData.nearbyAttractions.map((attraction, index) => (
                <div key={index} className="flex gap-4 mb-3">
                  <input
                    type="text"
                    placeholder="Attraction name"
                    value={attraction.name}
                    onChange={(e) => handleNearbyAttractionChange(index, 'name', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Distance"
                    value={attraction.distance}
                    onChange={(e) => handleNearbyAttractionChange(index, 'distance', e.target.value)}
                    className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removeNearbyAttraction(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addNearbyAttraction}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Plus size={16} />
                Add Attraction
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">House Rules</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in Time
                  </label>
                  <input
                    type="time"
                    name="rules.checkIn"
                    value={formData.houseRules.checkIn}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out Time
                  </label>
                  <input
                    type="time"
                    name="rules.checkOut"
                    value={formData.houseRules.checkOut}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Guests
                  </label>
                  <input
                    type="number"
                    name="rules.maxGuests"
                    value={formData.houseRules.maxGuests}
                    onChange={handleInputChange}
                    placeholder="e.g., 6"
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="rules.smoking"
                        checked={formData.houseRules.smoking}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm">Smoking Allowed</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="rules.parties"
                        checked={formData.houseRules.parties}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm">Parties Allowed</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="rules.pets"
                        checked={formData.houseRules.pets}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm">Pets Allowed</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="rules.children"
                        checked={formData.houseRules.children}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm">Children Welcome</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Extra Services</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {extraServicesOptions.map((service) => {
                  const isSelected = formData.extraServices.find(s => s.name === service.name);
                  return (
                    <div
                      key={service.name}
                      onClick={() => handleExtraServiceToggle(service)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-blue-50 border-blue-300'
                          : 'bg-white border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{service.name}</h4>
                        {isSelected && <Check size={16} className="text-blue-600" />}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                      <p className="text-sm font-medium text-orange-600">AED {service.price}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Images * (5-10 images required)</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    Click to upload images or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB each (Max 10 images)
                  </p>
                </label>
              </div>
              {formData.images.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Uploaded Images ({formData.images.length}/10 - Min 5 required)
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {formData.images.map((image) => (
                      <div key={image.id} className="relative">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-20 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeImage(image.id);
                          }}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors touch-manipulation"
                          style={{ minWidth: '24px', minHeight: '24px' }}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Available for Sale/Rent
                </span>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
            >
              {loading ? 'Saving...' : (editingProperty ? 'Update Property' : 'Add Property')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyModal;