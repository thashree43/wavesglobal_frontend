import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import ScrollToTop from "../Components/ReusableComponent/Scroll";

const AppRoute = () => {
  return (
    <Router>
      <ScrollToTop /> 
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
