import React, { useState, useEffect } from 'react'
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Homepage from '../Components/User/Homepage';
import PropertyDetailsPage from '../Components/User/PropertyDetails';
import Propertypage from "../Components/User/Properties"
import AboutUs from '../Components/User/About';
import ProfilePage from '../Components/User/Profile';
import ContactPage from '../Components/User/Contatct';
import HotelCheckout from '../Components/User/HotelBooking';
import AuthModal from "../Components/ReusableComponent/AuthModal";

function UserRoutes() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLogged] = useState(() => {
    const savedUser = localStorage.getItem("user")
    return !!savedUser
  })
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === "/checkout" && !isLogged) {
      setShowAuthModal(true)
    }
  }, [location, isLogged])

  return (
   <>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/property' element={<Propertypage/>}/>
      <Route path='/property/:id' element={<PropertyDetailsPage/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path='/contact' element={<ContactPage/>}/>
      <Route
        path='/checkout'
        element={isLogged ? <HotelCheckout/> : <Navigate to="/" />}
      />
    </Routes>

    <AuthModal
      show={showAuthModal}
      onClose={() => setShowAuthModal(false)}
      onRegisterSuccess={() => {}}
      onLoginSuccess={() => {window.location.href="/checkout"}}
    />
   </>
  )
}

export default UserRoutes
