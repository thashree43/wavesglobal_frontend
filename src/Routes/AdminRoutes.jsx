import React from 'react'
import { Route, Routes } from "react-router-dom";
import PropertyPage from '../Components/Admin/Properties';
import UsersList from '../Components/Admin/Users';
import LocationManagement from '../Components/Admin/Location';
function AdminRoutes() {
  return (
   <>
  <Routes>
    <Route path='/property' element={<PropertyPage/>}/>
    <Route path='/users' element={<UsersList/>}/>
    <Route path='/location' element={<LocationManagement/>}/>
  </Routes>
   </>
  )
}

export default AdminRoutes