import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./main-screens/Footer";
import { useLocation } from "react-router-dom";
import NavbarUser from "./NavbarUser";
import { AuthContext } from "./AuthContent";

const SharedNavLayout = () => {
    const { pathname } = useLocation();
    const { auth } = useContext(AuthContext);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <div>
            {auth.isLoggedIn ? <NavbarUser user={auth.user} /> : <Navbar />}
            <div className="children">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default SharedNavLayout;