import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Eye, MapPin, Home, Search, Menu, BarChart3, DollarSign, Settings, Users, FileText, Bell, Image, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import PropertyModal from '../ReusableComponent/Propertymodal';
import DeleteModal from '../ReusableComponent/Deletemodal';
import {baseurl} from '../../Base/Base';

const PropertyPage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [deletingProperty, setDeletingProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('properties');
  const [currentPage, setCurrentPage] = useState(1);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const propertiesPerPage = 10;

  const propertyTypes = ['Apartment', 'Villa', 'Studio', 'Penthouse', 'Townhouse', 'Office'];

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

  const getProperty = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}admin/getproperty`);
      if (response.data.success) {
        setProperties(response.data.property);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getArea = async () => {
    try {
      const response = await axios.get(`${baseurl}admin/getlocation`);
      if (response.data.success) {
        setNeighborhoods(response.data.location);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSidebarClick = (itemId, route) => {
    setActiveTab(itemId);
    setSidebarOpen(false);
    if (route) {
      navigate(route);
    }
  };

  const handleAddProperty = () => {
    setEditingProperty(null);
    setShowModal(true);
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setShowModal(true);
  };

  const handleDeleteClick = (property) => {
    setDeletingProperty(property);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingProperty) return;
    
    try {
      setLoading(true);
      await axios.delete(`${baseurl}admin/deleteproperty/${deletingProperty.id}`);
      setProperties(properties.filter(prop => prop.id !== deletingProperty.id));
      setShowDeleteModal(false);
      setDeletingProperty(null);
    } catch (error) {
      console.error('Error deleting property:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePropertySubmit = async (formData, isEdit = false) => {
    try {
      setLoading(true);
      
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'images') {
          formData[key].forEach((img) => {
            if (img.url.startsWith('data:')) {
              const byteString = atob(img.url.split(',')[1]);
              const mimeString = img.url.split(',')[0].split(':')[1].split(';')[0];
              const ab = new ArrayBuffer(byteString.length);
              const ia = new Uint8Array(ab);
              for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
              }
              const file = new File([ab], img.name, { type: mimeString });
              formDataToSend.append('images', file);
            }
          });
        } else if (typeof formData[key] === 'object') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      let response;
      if (isEdit) {
        response = await axios.put(
          `${baseurl}admin/updateproperty/${editingProperty.id}`,
          formDataToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      } else {
        response = await axios.post(
          `${baseurl}admin/addproperty`,
          formDataToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      }

      if (response.data.success) {
        if (isEdit) {
          setProperties(properties.map(prop => 
            prop.id === editingProperty.id 
              ? { ...prop, ...formData, price: `AED ${formData.price}`, area: `${formData.area} sqft` }
              : prop
          ));
        } else {
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
        }
      }

      setShowModal(false);
      setEditingProperty(null);
    } catch (error) {
      console.error('Error saving property:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location?.toLowerCase().includes(searchTerm.toLowerCase());
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

  useEffect(() => {
    getArea();
    getProperty();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
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
                    onClick={handleAddProperty}
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
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
                {loading && (
                  <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                )}
                
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
                              <span className="text-sm text-gray-600">{property.images?.length || 0}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Eye size={16} />
                              </button>
                              <button 
                                onClick={() => handleEditProperty(property)}
                                className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeleteClick(property)}
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
                
                {currentProperties.length === 0 && !loading && (
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
        <PropertyModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingProperty(null);
          }}
          onSubmit={handlePropertySubmit}
          editingProperty={editingProperty}
          neighborhoods={neighborhoods}
          propertyTypes={propertyTypes}
          loading={loading}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setDeletingProperty(null);
          }}
          onConfirm={handleDeleteConfirm}
          property={deletingProperty}
          loading={loading}
        />
      )}
    </div>
  );
};

export default PropertyPage;