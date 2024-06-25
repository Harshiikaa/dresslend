import React, { Fragment, useEffect, useState } from 'react';
import { getAllProductsApi } from '../../apis/Api';
import { Menu, Transition } from '@headlessui/react';
import { ArrowLeftIcon, ChevronDownIcon, HeartIcon, StarIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const TryFetch = () => {
    const [products, setProducts] = useState([]); // State to store all products
    const [selectedSort, setSelectedSort] = useState('Sort By');

    const handleSortSelect = (sortOption, sortText) => {
        setSelectedSort(sortText);
        console.log(`Selected sort option: ${sortOption}`);
        // Implement sorting logic here
    };

    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1); // This navigates to the previous page
    };


    // Fetch all products on component mount
    useEffect(() => {
        getAllProductsApi().then((res) => {
            const productsData = res.data.products;
            setProducts(productsData);
        });
    }, []);

    return (
        <div>
            <div className='w-full flex justify-between bg-white fixed top-0 left-0 right-0 p-4 border-2 border-color: inherit z-50'>
                <div className='flex gap-2'>
                    <button
                        onClick={handleBackClick}
                        className="inline-flex items-center gap-2 rounded-md bg-gray-50 px-2 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
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
            </div>

            <div className="max-w-6xl mx-auto p-2 mt-24 font-poppins"> {/* Added mt-20 to push content below header */}
                <div className="space-y-2">
                    {products.map((item) => (
                        <div key={item._id} className="bg-white p-2 border-2 border-color: inherit rounded-lg flex h-60"> {/* Set a fixed height for each item */}
                            <img src={item.productImageURL} alt={item.productName} className="w-1/6 h-55 object-fit" /> {/* Ensures image fits */}
                            <div className="ml-4 flex-1 flex flex-col justify-between">
                                <div className='p-4 space-y-4'>
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-semibold">{item.productName}</h2>
                                        {/* {item.available ? (
                                            <span className="text-green-500 font-bold">Available</span>
                                        ) : (
                                            <span className="text-red-500 font-bold">Unavailable</span>
                                        )} */}
                                    </div>
                                    <p className="text-customGray font-medium text-sm">
                                        Rental Price <span className="font-bold text-gray-800">NPR. {item.productRentalPrice}</span> for 4 days
                                    </p>
                                    <p className="text-gray-600 font-light text-xs">Security Deposit Rs. {item.productSecurityDeposit}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            {[...Array(item.rating)].map((_, i) => (
                                                <StarIcon key={i} className="w-4 h-4 text-yellow-500" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 font-regular text-sm">{item.productDescription}</p>
                                    <a href={`/productDetails/${item._id}`} className="text-blue-500 mt-2 inline-block font-medium text-xs">View details</a>
                                </div>


                            </div>
                            <div className="flex items-start ml-4 p-3">
                                <button className="p-2 rounded-lg border border-borderOutline bg-iconFill">
                                    <HeartIcon className="w-6 h-6 text-gray-400" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default TryFetch;
