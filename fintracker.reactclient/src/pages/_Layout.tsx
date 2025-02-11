import { Outlet } from "react-router-dom";
import './styles/_Layout.css'
import { useState } from "react";
import MenuPage from "./MenuPage";

function Layout() {

    return (
        <>
            <MenuPage />
            <Outlet />
        </>
    )
}

export default Layout;

//<div className="nav-bar">
//    <div>
//        Dashboard
//    </div>
//    <div>
//        Year
//    </div>
//    <div>
//        System
//    </div>
//    <div>
//        Import
//    </div>
//</div>