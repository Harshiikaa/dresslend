import React, { useEffect, useState } from 'react';
import { addFavoriteApi, getAllProductsApi } from '../../apis/Api';
import { ArrowLeftIcon, HeartIcon as OutlineHeartIcon, StarIcon } from '@heroicons/react/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/solid';
import SearchResult from '../../components/SearchResult';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const TryFetch = () => {
    const [products, setProducts] = useState([]); // State to store all products
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));

    const [userID, setUserID] = useState(''); // Set this to the actual user ID
    const [isFavorite, setIsFavorite] = useState(false); // Initialize based on whether the product is already a favorite

    const handleAddFavorite = async () => {
        const data = {
            userID: user,
            productID: id,
        };

        try {
            const response = await addFavoriteApi(data);

            if (response.data.success === true) {
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


    // Fetch all products on component mount
    useEffect(() => {
        getAllProductsApi().then((res) => {
            const productsData = res.data.products;
            setProducts(productsData);
        });
    }, []);

    return (
        <div>
            < SearchResult />
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
                            {/* <div className="flex items-start ml-4 p-3">
                                <button className="p-2 rounded-lg border border-borderOutline bg-iconFill">
                                    <HeartIcon className="w-6 h-6 text-gray-400" aria-hidden="true" />
                                </button>
                            </div> */}
                            <div className="flex items-start ml-4 p-3">
                                <button
                                    className={`p-2 rounded-lg border border-borderOutline`}
                                    onClick={handleAddFavorite}
                                >
                                    {isFavorite == true ? (
                                        <SolidHeartIcon className="w-6 h-6 text-red-600" aria-hidden="true" />
                                    ) : (
                                        <OutlineHeartIcon className="w-6 h-6 text-gray-400" aria-hidden="true" />
                                    )}
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
