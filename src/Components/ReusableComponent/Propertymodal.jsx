import React, { useState, useEffect } from 'react';
import { X, Plus, Upload, Check, Wifi, Wind, Tv, Car, Coffee, Dumbbell, WavesLadder, Shield, MapPin } from 'lucide-react';

const PropertyModal = ({ isOpen, onClose, onSubmit, editingProperty, neighborhoods = [], propertyTypes = [], loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Apartment',
    location: '',
    neighborhood: '',
    price: '',
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
    status: true,
    images: [],
    mapLocation: { lat: '', lng: '' }
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

  useEffect(() => {
    if (editingProperty) {
      const imagesWithIds = editingProperty.images ? editingProperty.images.map((image, index) => ({
        ...image,
        id: image.id || `existing-${index}-${Date.now()}`
      })) : [];

      setFormData({
        ...editingProperty,
        price: editingProperty.price ? editingProperty.price.replace('AED ', '') : '',
        area: editingProperty.area ? editingProperty.area.replace(' sqft', '') : '',
        status: editingProperty.status === 'Available',
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
        price: '',
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
        status: true,
        images: [],
        mapLocation: { lat: '', lng: '' }
      });
    }
  }, [editingProperty]);

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

    onSubmit(formData, !!editingProperty);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
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
                    {neighborhoods.map(area => (
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (AED) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., 15000000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

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
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {formData.images.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-20 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
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