import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Eye, MapPin, Home, X, Search, Filter, Menu, BarChart3, DollarSign, Settings, Users, FileText, Bell, Upload, Image, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {baseurl} from '../../Base/Base.js';

const PropertyPage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('properties');
  const [currentPage, setCurrentPage] = useState(1);
  const [neighborhoods,setneighborhoods] = useState([]);
  const propertiesPerPage = 10;

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
    status: true,
    images: [],
    mapLocation: { lat: '', lng: '' }
  });

  const getProperty = async(req,res)=>{
    try {
      const response = await axios.get(`${baseurl}admin/getproperty`)
      if(response.data.success){
        setProperties(response.data.property)
      }
    } catch (error) {
      
    }
  }

  const propertyTypes = ['Apartment', 'Villa', 'Studio', 'Penthouse', 'Townhouse', 'Office'];

  const getArea = async()=>{
    try {
      const response = await axios.get(`${baseurl}admin/getlocation`)
      if(response.data.success){
        setneighborhoods(response.data.location)
      }
    } catch (error) {
      
    }
  }

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3, route: '/dashboard' },
    { id: 'properties', name: 'Properties', icon: Home, route: '/admin/property' },
    { id: 'locations', name: 'Locations', icon: MapPin, route: '/admin/location' },
    { id: 'revenue', name: 'Revenue', icon: DollarSign, route: '/revenue' },
    { id: 'users', name: 'Users', icon: Users, route: '/users' },
    { id: 'reports', name: 'Reports', icon: FileText, route: '/reports' },
    { id: 'notifications', name: 'Notifications', icon: Bell, route: '/notifications' },
    { id: 'settings', name: 'Settings', icon: Settings, route: '/settings' },
  ];

  const handleSidebarClick = (itemId, route) => {
    setActiveTab(itemId);
    setSidebarOpen(false);
    
    if (route) {
      navigate(route);
    }
  };

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
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const currentImageCount = formData.images.length;
    const remainingSlots = 10 - currentImageCount;
    const filesToProcess = files.slice(0, remainingSlots);
    
    if (files.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots} more images. Maximum 10 images allowed.`);
    }
    
    const imagePromises = filesToProcess.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            id: Date.now() + Math.random(),
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.images.length < 5) {
      alert('Please upload at least 5 images (minimum required)');
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('type', formData.type);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('neighborhood', formData.neighborhood);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('bedrooms', formData.bedrooms);
    formDataToSend.append('bathrooms', formData.bathrooms);
    formDataToSend.append('area', formData.area);
    formDataToSend.append('status', formData.status);
    formDataToSend.append('mapLocation[lat]', formData.mapLocation.lat);
    formDataToSend.append('mapLocation[lng]', formData.mapLocation.lng);
  
    formData.images.forEach((img) => {
      const byteString = atob(img.url.split(',')[1]);
      const mimeString = img.url.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const file = new File([ab], img.name, { type: mimeString });
      formDataToSend.append('images', file);
    });
  
    try {
      const response = await axios.post(
        `${baseurl}admin/addproperty`,
        formDataToSend,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
  
      setProperties([
        {
          id: Date.now(),
          ...formData,
          price: `AED ${formData.price}`,
          area: `${formData.area} sqft`,
          status: formData.status ? 'Available' : 'Not Available',
          addedDate: new Date().toISOString().split('T')[0],
        },
        ...properties,
      ]);
  
      setShowModal(false);
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
        status: true,
        images: [],
        mapLocation: { lat: '', lng: '' },
      });
      setCurrentPage(1);
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(prop => prop.id !== id));
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || property.status === filterStatus;
    const matchesType = filterType === 'All' || property.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const currentProperties = filteredProperties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(()=>{
    getArea(),
    getProperty()
  },[])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Home className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">PropManage</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6 px-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleSidebarClick(item.id, item.route)}
                className={`w-full flex items-center gap-3 px-3 py-3 mb-1 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900">Need Help?</h3>
            <p className="text-xs text-blue-700 mt-1">Contact support for assistance</p>
            <button className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">
              Get Support
            </button>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 lg:ml-0 flex flex-col h-screen">
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Properties</h1>
            <div className="w-10" />
          </div>
        </div>

        <div className="flex-1 p-4 lg:p-8 overflow-auto">
          {activeTab === 'properties' ? (
            <>
              <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                      <Home className="text-blue-600" />
                      Property Management
                    </h1>
                    <p className="text-gray-600 mt-1">Manage your property listings</p>
                  </div>
                  <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <Plus size={20} />
                    Add Property
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Search properties..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="All">All Status</option>
                      <option value="Available">Available</option>
                      <option value="Not Available">Not Available</option>
                    </select>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="All">All Types</option>
                      {propertyTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Property</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Type</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Location</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Price</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Details</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Images</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentProperties.map((property) => (
                        <tr key={property.id} className="hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <div>
                              <h3 className="font-medium text-gray-900">{property.title}</h3>
                              <p className="text-sm text-gray-500">Added: {property.addedDate}</p>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                              {property.type}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <MapPin size={16} className="text-gray-400" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{property.neighborhood}</p>
                                <p className="text-xs text-gray-500">{property.location}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-semibold text-gray-900">{property.price}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              property.status === 'Available' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {property.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-sm text-gray-600">
                              <p>{property.bedrooms} bed • {property.bathrooms} bath</p>
                              <p>{property.area}</p>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-1">
                              <Image size={16} className="text-gray-400" />
                              <span className="text-sm text-gray-600">{property.images.length}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Eye size={16} />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors">
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => handleDelete(property.id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {currentProperties.length === 0 && (
                  <div className="text-center py-12">
                    <Home className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No properties found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
                  </div>
                )}

                {totalPages > 1 && (
                  <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Showing {(currentPage - 1) * propertiesPerPage + 1} to {Math.min(currentPage * propertiesPerPage, filteredProperties.length)} of {filteredProperties.length} results
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 rounded-lg border ${
                            currentPage === page
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                {React.createElement(sidebarItems.find(item => item.id === activeTab)?.icon || Home, { 
                  size: 48, 
                  className: "text-blue-600" 
                })}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {sidebarItems.find(item => item.id === activeTab)?.name} Page
              </h3>
              <p className="text-gray-500 mb-6">This page is under development</p>
              <button
                onClick={() => setActiveTab('properties')}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Home size={16} />
                Go to Properties
              </button>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Add New Property</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
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

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Images * (5-10 images required)
                  </label>
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

                <div className="lg:col-span-2">
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

              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  Add Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyPage;