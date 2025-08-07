import React from 'react'
import { Route, Routes } from "react-router-dom";
import Homepage from '../Components/User/Homepage';
function UserRoutes() {
  return (
   <>
  <Routes>
    <Route path='/' element={<Homepage/>}/>
  </Routes>
   </>
  )
}

export default UserRoutes