import React from 'react'
import { Route, Routes } from "react-router-dom";
import Homepage from '../Components/User/Homepage';
import PropertyDetailsPage from '../Components/User/PropertyDetails';
function UserRoutes() {
  return (
   <>
  <Routes>
    <Route path='/' element={<Homepage/>}/>
    <Route path='/p' element={<PropertyDetailsPage/>}/>
  </Routes>
   </>
  )
}

export default UserRoutes