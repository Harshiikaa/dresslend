import React, { useEffect, useState } from 'react';
import { HeartIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline';
import logo from '../assets/images/logo.png';
import { Menu, Transition } from '@headlessui/react';
import defaultImage from '../assets/images/blankProfilePic.png';


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

const NavbarAdmin = () => {
    // for the search
    const handleSearch = (query) => {
        console.log(`Searching for: ${query}`);
    };

    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get user data from local storage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);


    return (
        <>
            <nav className="bg-white-800 shadow-lg font-poppins">
                <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-8">
                    <div className="relative flex items-center justify-between h-24">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <img className="h-20 w-auto" src={logo} alt="Workflow" />
                        </div>

                        {/* Searchbar */}
                        {/* <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-4 pr-10 py-3 mt-2.5 border rounded-md border-black focus:outline-none w-68 h-10"
                            />
                            <button
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                onClick={() => handleSearch()}
                            >
                                <SearchIcon className="h-5 w-5 text-black hover:text-[#F1A501]" />
                            </button>
                        </div> */}


                        {/* User Details */}
                        <div className="hidden sm:flex sm:ml-2 space-x-2">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="inline-flex items-center bg-gray-100 justify-between w-full px-2 py-1 text-sm font-medium text-gray-700 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-300">
                                        <img
                                            src={user?.userImage || defaultImage}
                                            alt="User Avatar"
                                            className="w-10 h-10 rounded-lg mr-2 border-2"
                                        />
                                        <div className="flex flex-col items-center">
                                            <span className="text-xs text-gray-500">Welcome Back!</span>
                                            <span className="text-sm font-medium">{user ? user.firstName : 'User'}</span>
                                        </div>
                                    </Menu.Button>
                                </div>
                            </Menu>


                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavbarAdmin;
