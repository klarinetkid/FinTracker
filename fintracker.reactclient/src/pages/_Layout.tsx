import { Outlet } from "react-router-dom";
import '../styles/_Layout.css';
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