import React, { useEffect, Fragment, useState } from 'react';
import { addFavoriteApi, getAllProductsApi } from '../../../apis/Api';
import { ArrowLeftIcon, HeartIcon as OutlineHeartIcon, StarIcon, ChevronDownIcon } from '@heroicons/react/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/solid';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Menu, Transition } from '@headlessui/react';
import { FaStar } from 'react-icons/fa';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const GurungDress = () => {
    const [selectedSort, setSelectedSort] = useState('Sort By');
    const [products, setProducts] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const [hover, setHover] = useState(null);
    const [averageRatings, setAverageRatings] = useState({});
    const [ratingCounts, setRatingCounts] = useState({});

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

    const handleBackClick = () => {
        navigate(-1); // This navigates to the previous page
    };

    const handleAddFavorite = async (productId) => {
        const data = {
            userID: user.id,
            productID: productId,
        };

        try {
            const response = await addFavoriteApi(data);

            if (response.data.success) {
                setIsFavorite(true);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message || 'Failed to add favorite');
            }
        } catch (error) {
            console.error('Add Favorite Error:', error);
            toast.error('Server Error');
        }
    };

    // Fetch and filter products on component mount
    useEffect(() => {
        getAllProductsApi().then((res) => {
            const productsData = res.data.products;
            console.log('Fetched products:', productsData); // Log the fetched products
            const filteredProducts = productsData.filter(product => product.productCategory === "Gurung Dress");
            console.log('Filtered products:', filteredProducts); // Log the filtered products
            setProducts(filteredProducts);
        }).catch((error) => {
            console.error('Error fetching products:', error);
        });
    }, []);

    return (
        <div>
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

            {/* Main content */}
            <div className="max-w-6xl mx-auto p-2 font-poppins">
                {products.length === 0 ? (
                    <div className="flex items-center justify-center h-60">
                        <h2 className="text-xl font-semibold text-gray-400">There are no products available</h2>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {products.map((product) => {
                            const validAverageRating = Number.isFinite(averageRatings[product._id]) && averageRatings[product._id] >= 0 && averageRatings[product._id] <= 5 ? averageRatings[product._id] : 0;
                            return (
                                <div key={product._id} className="bg-white p-2 border-2 border-color: inherit rounded-lg flex h-60">
                                    <img src={product.productImageURL} alt={product.productName} className="w-1/6 h-55 object-fit" />
                                    <div className="ml-4 flex-1 flex flex-col justify-between">
                                        <div className='p-4 space-y-4'>
                                            <div className="flex items-center justify-between">
                                                <h2 className="text-xl font-semibold">{product.productName}</h2>
                                            </div>
                                            <p className="text-customGray font-medium text-sm">
                                                Rental Price <span className="font-bold text-gray-800">NPR. {product.productRentalPrice}</span> for 4 days
                                            </p>
                                            <p className="text-gray-600 font-light text-xs">Security Deposit Rs. {product.productSecurityDeposit}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex space-x-1 items-center">
                                                    {[...Array(5)].map((_, index) => {
                                                        const ratingValue = index + 1;
                                                        return (
                                                            <label key={index} className="cursor-pointer">
                                                                <FaStar
                                                                    size={24}
                                                                    className={ratingValue <= (hover || validAverageRating) ? 'text-yellow-500' : 'text-gray-300'}
                                                                />
                                                            </label>
                                                        );
                                                    })}
                                                    <span className="ml-2 text-gray-600" style={{ fontSize: '14px' }}>({ratingCounts[product._id]} reviews)</span>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 font-regular text-sm">{product.productDescription}</p>
                                            <a href={`/productDetails/${product._id}`} className="text-blue-500 mt-2 inline-block font-medium text-xs">View details</a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GurungDress;
