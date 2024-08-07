import { Menu, Transition } from '@headlessui/react';
import { ArrowLeftIcon, ChevronDownIcon } from '@heroicons/react/outline'
import React, { Fragment, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContent';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const SearchResult = () => {
    const [selectedSort, setSelectedSort] = useState('Sort By');
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const { auth, checkAuth } = useContext(AuthContext);

    const handleSortSelect = (sortOption, sortText) => {
        setSelectedSort(sortText);
        console.log(`Selected sort option: ${sortOption}`);
        // Implement sorting logic here
    };

    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1); // This navigates to the previous page
    };

    return (
        <div className="mt-24"> {/* Adjust the top margin as needed */}
            {/* <div className='w-full flex justify-between bg-white fixed top-0 left-0 right-0 p-4 inherit z-50'>
                <div className='flex gap-2'>
                    <button
                        onClick={handleBackClick}
                        className="inline-flex items-center gap-2 rounded-md bg-gray-50 px-2 py-2 text-sm ring-inset ring-gray-300 hover:bg-gray-100"
                    >
                        <ArrowLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </button>
                    <div>
                        <h1 className="text-xl font-regular">Search Result for</h1>
                        <h1 className="text-2xl font-bold">Formal Outfits</h1>
                    </div>
                </div>

                <div className="mt-2">
                    <Menu as="div" className="relative inline-block text-left w-35">
                        <div>
                            <Menu.Button className="inline-flex w-full gap-1 justify-between rounded-md bg-gray-50 px-2 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100">
                                {selectedSort}
                                <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute z-10 mt-2 w-full text-xs origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                onClick={() => handleSortSelect('priceAsc', 'Price: Low to High')}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Price Low to High
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                onClick={() => handleSortSelect('priceDesc', 'Price: High to Low')}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Price High to Low
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div> */}
        </div>
    )
}

export default SearchResult;
