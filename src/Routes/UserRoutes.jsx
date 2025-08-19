import React from 'react'
import { Route, Routes } from "react-router-dom";
import Homepage from '../Components/User/Homepage';
import PropertyDetailsPage from '../Components/User/PropertyDetails';
import Propertypage from "../Components/User/Properties"

function UserRoutes() {
  return (
   <>
  <Routes>
    <Route path='/' element={<Homepage/>}/>
    <Route path='/property' element={<Propertypage/>}/>
    <Route path='/p' element={<PropertyDetailsPage/>}/>
  </Routes>
   </>
  )
}

export default UserRoutes