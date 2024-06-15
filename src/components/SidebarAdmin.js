import React, { useState } from 'react';
import { SearchIcon, MenuAlt2Icon, XIcon } from '@heroicons/react/outline'; // Importing Heroicons

const SidebarAdmin = () => {
    // State to manage sidebar visibility
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Function to toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Function to close the sidebar
    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div>
            {/* Navigation Toggle */}
            <button
                type="button"
                className="text-gray-500 hover:text-gray-600"
                onClick={toggleSidebar}
                aria-label="Toggle navigation"
            >
                <span className="sr-only">Toggle Navigation</span>
                <SearchIcon className="flex-shrink-0 size-4 text-black hover:text-[#F1A501]" />
            </button>

            {/* Sidebar */}
            <div
                id="docs-sidebar"
                className={`hs-overlay [--auto-close:lg] ${
                    sidebarOpen ? 'hs-overlay-open:translate-x-0' : '-translate-x-full'
                } transition-all duration-300 transform fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300`}
            >
                <div className="px-6">
                    <a className="flex-none text-xl font-semibold" href="#" aria-label="Brand">
                        Brand
                    </a>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-600 absolute top-3 right-3"
                        onClick={closeSidebar}
                        aria-label="Close sidebar"
                    >
                        <XIcon className="h-5 w-5" />
                    </button>
                </div>
                <nav
                    className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
                    data-hs-accordion-always-open
                >
                    <ul className="space-y-1.5">
                        {/* Sidebar menu items */}
                        {['Products', 'Orders', 'Categories', 'Users'].map((item) => (
                            <li key={item}>
                                <a
                                    className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                                    href="#"
                                >
                                    <MenuAlt2Icon className="size-4" />
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default SidebarAdmin;
