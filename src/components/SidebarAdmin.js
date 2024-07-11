import { useState } from "react";
import { Link } from 'react-router-dom';
import Control from '../assets/sidebar/control.png';
import LogoRound from '../assets/sidebar/logoRound.png';
import Products from '../assets/sidebar/products.png';
import Orders from '../assets/sidebar/orders.png';
import Categories from '../assets/sidebar/categories.png';
import Users from '../assets/sidebar/users.png';

const SidebarAdmin = () => {
    const [open, setOpen] = useState(true);
    const Menus = [
        { title: "Products", src: Products, path: "/admin/products", gap: true },
        { title: "Orders", src: Orders, path: "/admin/orders" },
        { title: "Categories", src: Categories, path: "/admin/categories" },
        { title: "Users", src: Users, path: "/admin/users" },
    ];

    return (
        <div className="flex">
            {/* Open/Close button */}
            {/* <div className={`${open ? "w-72" : "w-20"} bg-gray-200 border-r border-white h-screen p-5 pt-8 relative duration-300`}> */}
            <div className={`${open ? "w-72" : "w-20"} bg-white-800 shadow-lg border-r border-white h-screen p-5 pt-8 relative duration-300`}>

                <img
                    src={Control}
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-gray-700 border-2 rounded-full ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />

                {/* Logo Animation */}
                <div className="flex gap-x-4 items-center">
                    <img
                        src={LogoRound}
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
                    />
                </div>

                {/* List of items */}
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex rounded-md p-2 cursor-pointer hover:bg-gray-400 text-gray-700 text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-gray-300"}`}
                        >
                            <Link to={Menu.path} className="flex items-center gap-x-4">
                                <img src={Menu.src} />
                                <span className={`${!open && "hidden"} origin-left duration-200`}>
                                    {Menu.title}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SidebarAdmin;
