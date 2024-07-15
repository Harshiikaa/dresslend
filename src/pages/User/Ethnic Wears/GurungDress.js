import React, { useEffect, Fragment, useState, useContext } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { ArrowLeftIcon, HeartIcon as OutlineHeartIcon, StarIcon, ChevronDownIcon } from '@heroicons/react/outline';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllProductsApi } from '../../../apis/Api';



function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
const GurungDress = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const [selectedSort, setSelectedSort] = useState('Sort By');

  const handleSortSelect = (sortOption, sortText) => {
    setSelectedSort(sortText);
    sortProducts(sortOption);
  };

  const sortProducts = (sortOption) => {
    let sortedProducts = [...products];
    if (sortOption === 'priceAsc') {
      sortedProducts.sort((a, b) => a.productRentalPrice - b.productRentalPrice);
    } else if (sortOption === 'priceDesc') {
      sortedProducts.sort((a, b) => b.productRentalPrice - a.productRentalPrice);
    }
    setProducts(sortedProducts);
  };

  useEffect(() => {
    getAllProductsApi().then((res) => {
      const productsData = res.data.products;
      const filteredProducts = productsData.filter(product => product.productCategory === "Gurung Dress");
      setProducts(filteredProducts);
    }).catch((error) => {
      console.error('Error fetching products:', error);
    });
  }, []);

      const handleBackClick = () => {
        navigate(-1); // This navigates to the previous page
      };
    return (
        <div>
            {/* Bar */}
            <div className="mt-8">
                <div className='w-full flex justify-between bg-white top-0 left-0 right-0 p-4 inherit z-50'>
                    <div className='flex gap-2'>
                        <button
                            onClick={handleBackClick}
                            className="inline-flex items-center gap-2 rounded-md bg-gray-50 px-2 py-2 text-sm ring-inset ring-gray-300 hover:bg-gray-100"
                        >
                            <ArrowLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold">Gurung Dress</h1>
                        </div>
                    </div>
                    {/* Sorting */}

                    <div className="mt-2">
                        <Menu as="div" className="relative inline-block text-left w-50">
                            <div>
                                <Menu.Button className="inline-flex w-40 gap-1 justify-between rounded-md bg-gray-50 px-2 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100">
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
            </div>

        </div>
    )
}

export default GurungDress
