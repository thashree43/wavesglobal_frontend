import React from "react";
import { Route,BrowserRouter as Router,Routes } from "react-router-dom";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";


const AppRoute = ()=>{
    return(
        <Router>
            <Routes>
                <Route path="/*" element={<UserRoutes/>}/>
                <Route path="/admin/*" element={<AdminRoutes/>}/>
            </Routes>
        </Router>
    )
}


export default AppRoute