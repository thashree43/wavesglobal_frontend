import React from "react"
import { Navigate } from "react-router-dom"


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken")
  return token ? children : <Navigate to="/admin/" replace />
}

export default PrivateRoute
