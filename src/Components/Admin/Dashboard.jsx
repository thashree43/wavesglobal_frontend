import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import {
  Home,
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  TrendingDown,
  MapPin,
  Star,
  Eye,
  BookOpen,
  Clock,
  AlertCircle,
  CheckCircle,
  Menu,
  X,
  RefreshCw,
  BarChart3,
  FileText,
  Bell,
  Settings
} from 'lucide-react';
import axios from 'axios';
import { baseurl } from '../../Base/Base';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");


  const [dashboardData, setDashboardData] = useState({
    stats: {},
    monthlyRevenue: [
      
    ],
    userGrowth: [
      
    ],
    propertyTypes: [
      
    ],
    bookingStatus: [
     
    ],
    recentBookings: [
      
    ],
    topLocations: [
     
    ]
  });


  const getDashboarddata = async()=>{
    try {
    const response = await axios.get(`${baseurl}admin/data`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if(response.data.success){
        setDashboardData(response.data.data)
    }
    } catch (error) {
        console.error(error)
    }
  }

  useEffect(()=>{
   getDashboarddata()
  },[])

  const handleSidebarClick = (itemId, route) => {
    setActiveTab(itemId);
    setSidebarOpen(false);
    if (route) {
      navigate(route); 
    }
  };
  

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const StatCard = ({ icon: Icon, title, value, change, changeType, color = "blue" }) => {
    const colorClasses = {
      blue: "bg-blue-50 text-blue-600 border-blue-200",
      green: "bg-green-50 text-green-600 border-green-200",
      orange: "bg-orange-50 text-orange-600 border-orange-200",
      purple: "bg-purple-50 text-purple-600 border-purple-200"
    };

    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon size={24} />
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change !== undefined && change !== null && (
              <div className={`flex items-center text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span className="ml-1">{Math.abs(change)}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <RefreshCw size={16} className="mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

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
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
            <button
              onClick={handleRefresh}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {activeTab === 'dashboard' ? (
            <div className="h-full flex flex-col">
              <div className="flex-shrink-0 p-4 sm:p-6 lg:p-8 bg-white border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="text-blue-600 flex-shrink-0" size={32} />
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Dashboard Overview
                      </h1>
                      <p className="text-gray-600 text-sm sm:text-base">Welcome back! Here's what's happening with your properties.</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleRefresh}
                    className="hidden lg:flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <RefreshCw size={16} className="mr-2" />
                    Refresh
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <StatCard
                    icon={Users}
                    title="Total Users"
                    value={dashboardData.stats.totalUsers?.toLocaleString() || '0'}
                    change={dashboardData.stats.monthlyGrowth}
                    changeType={dashboardData.stats.monthlyGrowth >= 0 ? "positive" : "negative"}
                    color="blue"
                  />
                  <StatCard
                    icon={Home}
                    title="Total Properties"
                    value={dashboardData.stats.totalProperties?.toString() || '0'}
                    color="green"
                  />
                  <StatCard
                    icon={Calendar}
                    title="Total Bookings"
                    value={dashboardData.stats.totalBookings?.toString() || '0'}
                    color="orange"
                  />
                  <StatCard
                    icon={DollarSign}
                    title="Total Revenue"
                    value={`AED ${dashboardData.stats.totalRevenue?.toLocaleString() || '0'}`}
                    color="purple"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue & Bookings</h3>
                    {dashboardData.monthlyRevenue && dashboardData.monthlyRevenue.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={dashboardData.monthlyRevenue}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis yAxisId="revenue" orientation="left" />
                          <YAxis yAxisId="bookings" orientation="right" />
                          <Tooltip />
                          <Legend />
                          <Area
                            yAxisId="revenue"
                            type="monotone"
                            dataKey="revenue"
                            stroke="#3B82F6"
                            fill="#3B82F6"
                            fillOpacity={0.3}
                            name="Revenue (AED)"
                          />
                          <Line
                            yAxisId="bookings"
                            type="monotone"
                            dataKey="bookings"
                            stroke="#10B981"
                            strokeWidth={3}
                            name="Bookings"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-[300px] flex items-center justify-center text-gray-500">
                        No revenue data available
                      </div>
                    )}
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
                    {dashboardData.userGrowth && dashboardData.userGrowth.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dashboardData.userGrowth}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="users"
                            stroke="#8B5CF6"
                            strokeWidth={3}
                            dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                            name="Active Users"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-[300px] flex items-center justify-center text-gray-500">
                        No user growth data available
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Types Distribution</h3>
                    {dashboardData.propertyTypes && dashboardData.propertyTypes.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={dashboardData.propertyTypes}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {dashboardData.propertyTypes.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-[300px] flex items-center justify-center text-gray-500">
                        No property type data available
                      </div>
                    )}
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Status</h3>
                    {dashboardData.bookingStatus && dashboardData.bookingStatus.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={dashboardData.bookingStatus}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}`}
                          >
                            {dashboardData.bookingStatus.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-[300px] flex items-center justify-center text-gray-500">
                        No booking status data available
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
                    </div>
                    <div className="p-6">
                      {dashboardData.recentBookings && dashboardData.recentBookings.length > 0 ? (
                        <div className="space-y-4">
                          {dashboardData.recentBookings.map((booking) => (
                            <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{booking.user}</h4>
                                <p className="text-sm text-gray-600">{booking.property}</p>
                                <p className="text-xs text-gray-500">
                                  {booking.checkIn} to {booking.checkOut}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-gray-900">AED {booking.amount?.toLocaleString() || '0'}</p>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  booking.status === 'confirmed'
                                    ? 'bg-green-100 text-green-800'
                                    : booking.status === 'completed'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {booking.status === 'confirmed' || booking.status === 'completed' ? 
                                    <CheckCircle size={12} className="mr-1" /> : 
                                    <Clock size={12} className="mr-1" />
                                  }
                                  {booking.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          No recent bookings available
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Top Locations</h3>
                    </div>
                    <div className="p-6">
                      {dashboardData.topLocations && dashboardData.topLocations.length > 0 ? (
                        <div className="space-y-4">
                          {dashboardData.topLocations.map((location, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                                  index === 0 ? 'bg-yellow-500' : 
                                  index === 1 ? 'bg-gray-400' : 
                                  index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                                }`}>
                                  {index + 1}
                                </div>
                                <div className="ml-3">
                                  <p className="font-medium text-gray-900">{location.name}</p>
                                  <p className="text-sm text-gray-600">{location.properties} properties</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-gray-900">{location.bookings}</p>
                                <p className="text-xs text-gray-500">bookings</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          No location data available
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-4 sm:p-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center max-w-md w-full">
                <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 size={32} className="text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {activeTab} Page
                </h3>
                <p className="text-gray-500 mb-6 text-sm sm:text-base">This page is under development</p>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <BarChart3 size={16} />
                  Go to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;