import { Outlet } from "react-router-dom";
import './styles/_Layout.css'

function Layout() {

    // TODO: get available years

    return (
        <>
            

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