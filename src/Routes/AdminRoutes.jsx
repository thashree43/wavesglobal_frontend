import React from 'react'
import { Route, Routes } from "react-router-dom"
import PropertyPage from '../Components/Admin/Properties'
import UsersList from '../Components/Admin/Users'
import LocationManagement from '../Components/Admin/Location'
import Dashboard from '../Components/Admin/Dashboard'
import BookingsList from '../Components/Admin/Bookings'
import LoginPage from '../Components/Admin/AdminLogin'
import PrivateRoute from './Private'
import AdminSettings from '../Components/Admin/AdminSettings'

function AdminRoutes() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route
        path='/property'
        element={
          <PrivateRoute>
            <PropertyPage />
          </PrivateRoute>
        }
      />
      <Route
        path='/users'
        element={
          <PrivateRoute>
            <UsersList />
          </PrivateRoute>
        }
      />
      <Route
        path='/location'
        element={
          <PrivateRoute>
            <LocationManagement />
          </PrivateRoute>
        }
      />
      <Route
        path='/dashboard'
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path='/bookings'
        element={
          <PrivateRoute>
            <BookingsList />
          </PrivateRoute>
        }
      />
      <Route
        path='/settings'
        element={
          <PrivateRoute>
            <AdminSettings />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default AdminRoutes
