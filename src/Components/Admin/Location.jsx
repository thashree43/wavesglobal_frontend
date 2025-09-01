import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {baseurl} from '../../Base/Base.js'
import {User, Shield, ShieldOff, Home, Users, Settings, BarChart3,  FileText,  Bell,  DollarSign, Menu, X, Search, Filter, MapPin, Plus,Edit, Trash2, Camera,Save,XCircle,Upload, ImageIcon} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import Sidebar from './Sidebar';

const LocationManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('locations');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    status: 'active'
  });
  const navigate = useNavigate()
  const [locations, setLocations] = useState([]);
  const token = localStorage.getItem("adminToken");


  const handleSidebarClick = (itemId, route) => {
    setActiveTab(itemId);
    setSidebarOpen(false);
    
    if (route) {
      navigate(route);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image: null,
      status: 'active'
    });
    setEditingLocation(null);
  };

  const handleAddLocation = () => {
    resetForm();
    setShowModal(true);
  };

  const handleEditLocation = (location) => {
    console.log('Editing location:', location);
    let imageData = null;
    
    if (location.image) {
      const imageUrl = location.image.startsWith('http') 
        ? location.image 
        : `${baseurl}${location.image}`;
      
      imageData = {
        preview: imageUrl,
        name: location.image.split('/').pop() || 'image',
        isExisting: true
      };
    }
    
    setFormData({
      name: location.name,
      description: location.description,
      image: imageData,
      status: location.status
    });
    setEditingLocation(location);
    setShowModal(true);
  };

  const handleDeleteLocation = (locationId) => {
    setLocations(locations.filter(location => location.id !== locationId));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (formData.image && formData.image.preview && formData.image.preview.startsWith('blob:')) {
      URL.revokeObjectURL(formData.image.preview);
    }
    
    const newImage = {
      id: Date.now(),
      file: file,
      preview: URL.createObjectURL(file),
      name: file.name,
      isExisting: false
    };
    
    setFormData(prev => ({
      ...prev,
      image: newImage
    }));
  };

  const handleRemoveImage = () => {
    if (formData.image && formData.image.preview && formData.image.preview.startsWith('blob:')) {
      URL.revokeObjectURL(formData.image.preview);
    }
    
    setFormData(prev => ({
      ...prev,
      image: null
    }));
  };

  const handleSubmit = async() => {
    if (!formData.name || !formData.description) {
      return;
    }
    
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('status', formData.status);
    
    if (formData.image && formData.image.file) {
      formDataToSend.append('image', formData.image.file);
    }

    try {
      console.log("Submitting location data");
      console.log(formData)
      
      let response;
      if (editingLocation) {
        formDataToSend.append('id', editingLocation._id);
        response = await axios.put(`${baseurl}admin/updatelocation`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        response = await axios.post(`${baseurl}admin/addlocation`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      
      getlocation();
    } catch (error) {
      console.error('Error submitting location:', error);
    }
    
    setShowModal(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || location.status === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const getlocation = async()=>{
    try {
      const response = await axios.get(`${baseurl}admin/getlocation`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('Get location response:', response.data);
      if(response.data.success){
        setLocations(response.data.location)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    getlocation()
  },[])

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

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        handleSidebarClick={handleSidebarClick}
      />

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 lg:ml-0 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Locations</h1>
            <div className="w-10" />
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {activeTab === 'locations' ? (
            <div className="h-full flex flex-col">
              {/* Page Header - Fixed alignment */}
              <div className="flex-shrink-0 p-4 sm:p-6 lg:p-8 bg-white border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  {/* Left side - Title */}
                  <div className="flex items-center gap-3">
                    <MapPin className="text-blue-600 flex-shrink-0" size={32} />
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Location Management
                      </h1>
                      <p className="text-gray-600 text-sm sm:text-base">Manage property locations and details</p>
                    </div>
                  </div>
                  
                  {/* Right side - Add Button */}
                  <button
                    onClick={handleAddLocation}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium whitespace-nowrap"
                  >
                    <Plus size={16} />
                    Add Location
                  </button>
                </div>
                
                {/* Stats Section - Below header */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-sm text-green-700">
                      Active: {locations.filter(l => l.status === 'active').length}
                    </span>
                  </div>
                  <div className="flex items-center bg-red-50 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                    <span className="text-sm text-red-700">
                      Inactive: {locations.filter(l => l.status === 'inactive').length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Search and Filter Section */}
              <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 py-4">
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          placeholder="Search locations..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Section - Maintains original scrolling behavior */}
              <div className="flex-1 overflow-hidden px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
                <div className="h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                  {/* Desktop Table Header */}
                  <div className="hidden sm:block flex-shrink-0 overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Location</th>
                          <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Description</th>
                          <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Image</th>
                          <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Properties</th>
                          <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Status</th>
                          <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Created</th>
                          <th className="text-left py-4 px-3 sm:px-6 font-semibold text-gray-900 text-sm">Actions</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                  
                  {/* Table Body - Scrollable */}
                  <div className="flex-1 overflow-y-auto">
                    {/* Desktop Table */}
                    <table className="hidden sm:table w-full">
                      <tbody className="divide-y divide-gray-200">
                        {filteredLocations.map((location) => (
                          <tr key={location.id} className="hover:bg-gray-50">
                            <td className="py-4 px-3 sm:px-6">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                </div>
                                <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                                  <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">{location.name}</h3>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-3 sm:px-6">
                              <span className="text-xs sm:text-sm text-gray-600 line-clamp-2">{location.description}</span>
                            </td>
                            <td className="py-4 px-3 sm:px-6">
                              <div className="flex items-center gap-2">
                                {location.image ? (
                                  <div className="flex items-center gap-2">
                                    <img 
                                      src={location.image.startsWith('http') ? location.image : `${baseurl}${location.image}`} 
                                      alt="Location" 
                                      className="h-6 w-6 sm:h-8 sm:w-8 rounded object-cover"
                                      onError={(e) => {
                                        console.error('Image load error:', location.image);
                                        e.target.style.display = 'none';
                                      }}
                                    />
                                    <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">Image</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <ImageIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                                    <span className="text-xs sm:text-sm text-gray-400 hidden sm:inline">No image</span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-3 sm:px-6">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {location.propertyCount || 0}
                              </span>
                            </td>
                            <td className="py-4 px-3 sm:px-6">
                              <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                                location.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {location.status}
                              </span>
                            </td>
                            <td className="py-4 px-3 sm:px-6">
                              <span className="text-xs sm:text-sm text-gray-600">
                                {new Date(location.createdAt || location.createdDate).toLocaleDateString('en-US', {
                                  year: '2-digit',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </td>
                            <td className="py-4 px-3 sm:px-6">
                              <button
                                onClick={() => handleEditLocation(location)}
                                className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg text-xs sm:text-sm transition-colors"
                              >
                                <Edit size={12} className="sm:w-3.5 sm:h-3.5" />
                                <span className="hidden sm:inline">Edit</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Mobile Cards */}
                    <div className="sm:hidden space-y-4 p-4">
                      {filteredLocations.map((location) => (
                        <div key={location.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <MapPin className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="font-medium text-gray-900 truncate">{location.name}</h3>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                                  location.status === 'active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {location.status}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleEditLocation(location)}
                              className="inline-flex items-center gap-1 px-3 py-1 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm transition-colors"
                            >
                              <Edit size={14} />
                              Edit
                            </button>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{location.description}</p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                {location.image ? (
                                  <>
                                    <img 
                                      src={location.image.startsWith('http') ? location.image : `${baseurl}${location.image}`} 
                                      alt="Location" 
                                      className="h-4 w-4 rounded object-cover"
                                      onError={(e) => {
                                        console.error('Image load error:', location.image);
                                        e.target.style.display = 'none';
                                      }}
                                    />
                                    <span>Image</span>
                                  </>
                                ) : (
                                  <>
                                    <ImageIcon className="h-4 w-4 text-gray-400" />
                                    <span>No image</span>
                                  </>
                                )}
                              </div>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                {location.propertyCount || 0} Properties
                              </span>
                            </div>
                            <span>
                              {new Date(location.createdAt || location.createdDate).toLocaleDateString('en-US', {
                                year: '2-digit',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {filteredLocations.length === 0 && (
                      <div className="text-center py-12">
                        <MapPin className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No locations found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-4 sm:p-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center max-w-md w-full">
                <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  {React.createElement(sidebarItems.find(item => item.id === activeTab)?.icon || MapPin, { 
                    size: window.innerWidth < 640 ? 32 : 48, 
                    className: "text-blue-600" 
                  })}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {sidebarItems.find(item => item.id === activeTab)?.name} Page
                </h3>
                <p className="text-gray-500 mb-6 text-sm sm:text-base">This page is under development</p>
                <button
                  onClick={() => setActiveTab('locations')}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <MapPin size={16} />
                  Go to Locations
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal - Fully responsive */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {editingLocation ? 'Edit Location' : 'Add New Location'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter location name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
                  placeholder="Enter location description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Location Image
                </label>

                {!formData.image ? (
                  <div className="mb-4">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors">
                        <Upload className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mb-2 sm:mb-4" />
                        <div className="text-sm text-gray-600">
                          <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="relative group">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden w-full sm:max-w-md">
                      <img
                        src={formData.image.preview}
                        alt="Location image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 rounded-b-lg">
                      <div className="truncate">{formData.image.name}</div>
                    </div>
                    <div className="mt-2">
                      <label className="cursor-pointer text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        Change Image
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 sm:pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <XCircle size={16} />
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                >
                  <Save size={16} />
                  {editingLocation ? 'Update Location' : 'Add Location'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationManagement;