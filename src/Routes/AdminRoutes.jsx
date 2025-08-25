import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PropertyPage from "../Components/Admin/Properties";
import UsersList from "../Components/Admin/Users";
import LocationManagement from "../Components/Admin/Location";
import Dashboard from "../Components/Admin/Dashboard";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="property" element={<PropertyPage />} />
      <Route path="users" element={<UsersList />} />
      <Route path="location" element={<LocationManagement />} />
      {/* Redirect /admin to /admin/dashboard */}
      <Route path="" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}

export default AdminRoutes;
