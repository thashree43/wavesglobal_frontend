import React from 'react'
import { Route, Routes } from "react-router-dom";
import Homepage from '../Components/User/Homepage';
import PropertyDetailsPage from '../Components/User/PropertyDetails';
import Propertypage from "../Components/User/Properties"
import AboutUs from '../Components/User/About';
import ProfilePage from '../Components/User/Profile';
import ContactPage from '../Components/User/Contatct';
import HotelCheckout from '../Components/User/HotelBooking';

function UserRoutes() {
  return (
   <>
  <Routes>
    <Route path='/' element={<Homepage/>}/>
    <Route path='/property' element={<Propertypage/>}/>
    <Route path='/property/:id' element={<PropertyDetailsPage/>}/>
    <Route path='/about' element={<AboutUs/>}/>
    <Route path='/profile' element={<ProfilePage/>}/>
    <Route path='/contact' element={<ContactPage/>}/>
    <Route path='/Hotelbook' element={<HotelCheckout/>}/>
  </Routes>
   </>
  )
}

export default UserRoutes