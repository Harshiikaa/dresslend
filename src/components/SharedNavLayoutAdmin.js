import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";

const SharedNavLayoutAdmin = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <div>
            <NavbarAdmin />
            <div className="children">
                <Outlet />
            </div>
        </div>
    );
};

export default SharedNavLayoutAdmin;