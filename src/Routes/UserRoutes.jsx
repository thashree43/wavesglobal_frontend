import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Homepage from "../Components/User/Homepage";
import PropertyDetailsPage from "../Components/User/PropertyDetails";
import Propertypage from "../Components/User/Properties";
import AboutUs from "../Components/User/About";
import ProfilePage from "../Components/User/Profile";
import ContactPage from "../Components/User/Contatct";
import HotelCheckout from "../Components/User/HotelBooking";
import AuthModal from "../Components/ReusableComponent/AuthModal";
import ResetPassword from "../Components/ReusableComponent/Resetpass";
import PrivacyPolicy from "../Components/Policy/Privacy";
import TermsConditions from "../Components/Policy/Terms";
import CancellationsRefunds from "../Components/Policy/Refund";
import ShippingPolicy from "../Components/Policy/Shipping";
import { useAuth } from "../Context/Auth";

const ProtectedCheckout = ({ isLogged }) => {
  const bookingCompleted = sessionStorage.getItem('bookingCompleted');
  
  if (bookingCompleted === 'true') {
    sessionStorage.removeItem('bookingCompleted');
    return <Navigate to="/" replace />;
  }
  
  if (!isLogged) {
    return <Navigate to="/" replace />;
  }
  
  return <HotelCheckout />;
};

function UserRoutes() {
  const { user, isLogged, isCheckingAuth, checkAuthStatus } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/checkout" && !isLogged && !isCheckingAuth) {
      setShowAuthModal(true);
    }
  }, [location, isLogged, isCheckingAuth]);

  const handleLoginSuccess = async () => {
    await checkAuthStatus();
    setShowAuthModal(false);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/property" element={<Propertypage />} />
        <Route
          path="/property/:id"
          element={
            <PropertyDetailsPage
              user={user}
              isLogged={isLogged}
              onAuthRequired={() => setShowAuthModal(true)}
            />
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
        <Route path="/refund-policy" element={<CancellationsRefunds />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/checkout"
          element={<ProtectedCheckout isLogged={isLogged} />}
        />
      </Routes>

      <AuthModal
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onRegisterSuccess={() => {}}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

export default UserRoutes;