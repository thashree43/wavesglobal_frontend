import React from 'react'
import { Route, Routes } from "react-router-dom";
import PropertyPage from '../Components/Admin/Properties';
import UsersList from '../Components/Admin/Users';
import LocationManagement from '../Components/Admin/Location';
import Dashboard from '../Components/Admin/Dashboard';
import BookingsList from '../Components/Admin/Bookings';
function AdminRoutes() {
  return (
   <>
  <Routes>
    <Route path='/property' element={<PropertyPage/>}/>
    <Route path='/users' element={<UsersList/>}/>
    <Route path='/location' element={<LocationManagement/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/bookings' element={<BookingsList/>}/>
  
  </Routes>
   </>
  )
}

export default AdminRoutes