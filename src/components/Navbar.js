import React from 'react'
import { HeartIcon, SearchIcon, ShoppingBagIcon } from '@heroicons/react/outline';
import logo from '../assets/images/logo.png'


const Navbar = () => {

    const handleSearch = (query) => {
        console.log(`Searching for: ${query}`);
        // Implement your search logic here
    };


    return (
        <div>
            <nav className="bg-white-800 shadow-lg">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-24">
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            {/* logo */}
                            <div className="flex-shrink-0">
                                <img className="h-16 w-auto" src={logo} alt="Workflow" />
                            </div>

                            {/* nav items */}
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4">
                                    <a href="#" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-5 rounded-md text-sm font-medium">Home</a>
                                    <a href="#" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-5 rounded-md text-sm font-medium">Ethnic Wear</a>
                                    <a href="#" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-5 rounded-md text-sm font-medium">Western Wear</a>
                                    <a href="#" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-5 rounded-md text-sm font-medium">Accessories</a>
                                    <a href="#" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-5 rounded-md text-sm font-medium">About Us</a>
                                    <a href="#" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-5 rounded-md text-sm font-medium">Help</a>

                                </div>
                            </div>
                            {/* searchbar */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-4 pr-10 py-3 mt-2.5 border rounded-md border-black focus:outline-none w-48 h-10"
                                />
                                <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                    <SearchIcon className="h-5 w-5 text-black" />
                                </button>

                            </div>
                            {/* favorite and shopping bag */}
                            <div className="hidden sm:block sm:ml-6 w-auto">
                                <div className="flex">
                                    <a href="#" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-5 rounded-md flex items-center space-x-2 text-sm font-medium">
                                        <HeartIcon className="h-5 w-5 text-black" />
                                    </a>
                                    <a href="#" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-5 rounded-md flex items-center space-x-2 text-sm font-medium">
                                        <ShoppingBagIcon className="h-5 w-5 text-black" />
                                    </a>

                                </div>
                            </div>

                            {/* login and signup button */}
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex">
                                    <a href="#" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-5 rounded-md text-sm font-medium">Login</a>
                                    <a href="#" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-5 rounded-md text-sm font-medium">Register</a>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </nav >
        </div >
    )
}

export default Navbar
