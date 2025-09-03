import React, { useState, useEffect } from 'react'
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import axios from 'axios';
import { baseurl } from '../Base/Base';
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
  const [isLogged, setIsLogged] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const location = useLocation()

  // Check authentication status on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${baseurl}User/getuser`, {
          withCredentials: true  
        })
        if (response.data.user) {
          setIsLogged(true)
        }
      } catch (error) {
        setIsLogged(false)
      } finally {
        setIsCheckingAuth(false)
      }
    }
    
    checkAuthStatus()
  }, [])

  useEffect(() => {
    if (location.pathname === "/checkout" && !isLogged && !isCheckingAuth) {
      setShowAuthModal(true)
    }
  }, [location, isLogged, isCheckingAuth])

  if (isCheckingAuth) {
    return <div>Loading...</div>
  }

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
      onLoginSuccess={() => {
        setIsLogged(true)
        setShowAuthModal(false)
        window.location.href="/checkout"
      }}
    />
   </>
  )
}

export default UserRoutes