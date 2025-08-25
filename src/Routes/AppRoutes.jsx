import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "../Components/ReusableComponent/Scroll";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";

const AppRoute = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
