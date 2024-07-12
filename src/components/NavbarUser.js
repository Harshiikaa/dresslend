
import React, { useEffect, useState } from 'react';
import { HeartIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline';
import logo from '../assets/images/logo.png';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import UserProfileDropdown from './UserProfileDropdown';

const NavItem = ({ href, text, onClick }) => (
    <button
        onClick={onClick}
        className="text-black-300 hover:text-[#F1A501] px-3 py-2 rounded-md text-sm font-medium cursor-pointer focus:outline-none"
    >
        {text}
    </button>
);

const IconLink = ({ href, IconComponent }) => (
    <a
        href={href}
        className="text-black-300 hover:text-[#F1A501] px-3 py-5 rounded-md flex items-center space-x-2 text-sm font-medium"
    >
        <IconComponent className="h-5 w-5 text-black" />
    </a>
);

const NavbarUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get user data from local storage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);
    // for the search
    const handleSearch = (query) => {
        console.log(`Searching for: ${query}`);
    };



    return (
        <>
            <nav className="bg-white-800 shadow-lg">
                <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-8">
                    <div className="relative flex items-center justify-between h-24">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <img className="h-20 w-auto" src={logo} alt="Workflow" />
                        </div>

                        {/* Navigation Items */}
                        <div className="hidden sm:flex sm:ml-3 space-x-4 text-xs">
                            <NavItem href="landingPage" text="Home" />
                            <NavItem href="ethnicWear" text="Ethnic Wear" />
                            <NavItem href="westernWear" text="Western Wear" />
                            <NavItem href="accessories" text="Accessories" />
                            <NavItem href="aboutUs" text="About Us" />
                            <NavItem href="help" text="Help" />
                        </div>

                        {/* Searchbar */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-4 pr-10 py-3 mt-2.5 border rounded-md border-black focus:outline-none w-48 h-10"
                            />
                            <button
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                onClick={() => handleSearch()}
                            >
                                <SearchIcon className="h-5 w-5 text-black hover:text-[#F1A501]" />
                            </button>
                        </div>

                        {/* Favorite and Shopping Bag */}
                        <div className="hidden sm:flex sm:ml-2 space-x-2">
                            <IconLink href="favorites" IconComponent={HeartIcon} />
                            <IconLink href="shoppingBag" IconComponent={ShoppingBagIcon} />
                        </div>

                        {/* User Details */}
                        <div className="hidden sm:flex sm:ml-2 space-x-2">
                            <UserProfileDropdown />


                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavbarUser;
