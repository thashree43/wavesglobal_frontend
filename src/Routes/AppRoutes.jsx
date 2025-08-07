import React from "react";
import { Route,BrowserRouter as Router,Routes } from "react-router-dom";
import UserRoutes from "./UserRoutes";


const AppRoute = ()=>{
    return(
        <Router>
            <Routes>
                <Route path="/*" element={<UserRoutes/>}/>
            </Routes>
        </Router>
    )
}


export default AppRoute