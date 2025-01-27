import { Outlet } from "react-router-dom";

function Layout() {

    // TODO: get available years

    return (
        <>
            {/*<div>
            //    <div>
            //        <div>
            //            <Link to="/">Home</Link>
            //        </div>
            //        <div>
            //            <Link to="/blogs">Blogs</Link>
            //        </div>
            //        <div>
            //            <Link to="/contact">Contact</Link>
            //        </div>
            //    </div>
            //</div>*/}

            <Outlet />
        </>
    )
}

export default Layout;