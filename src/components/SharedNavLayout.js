

import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
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
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md"> {/* Added bg-white and shadow-md for styling */}
                {auth.isLoggedIn ? <NavbarUser user={auth.user} /> : <Navbar />}
            </div>
            <div className="pt-16"> 
                <Outlet />
            </div>
        </div>
    );
};

export default SharedNavLayout;
