import { ArrowLeftIcon, HeartIcon as OutlineHeartIcon, StarIcon } from '@heroicons/react/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { addFavoriteApi, getShoppingBagByUserIDApi, getSingleProductApi } from '../../apis/Api';
import SearchResult from '../../components/SearchResult';
import { toast } from 'react-toastify';

const ShoppingBag = () => {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const [products, setProducts] = useState([]);
    const [shoppingBag, setShoppingBag] = useState([]);



    useEffect(() => {
        // Call your API function
        getShoppingBagByUserIDApi(user._id)
            .then((res) => {
                console.log("API Response:", res.data);
                setShoppingBag(res.data.shoppingBag);
                // window.location.reload();
            })
            .catch(err => {
                toast.error("Server Error");
                console.log(err.message);
            });
    }, [user._id]);

    console.log(shoppingBag);

    return (
        <div>
            <div className="max-w-6xl mx-auto p-2 mt-24 font-poppins"> {/* Added mt-20 to push content below header */}
                <div className="space-y-2">
                    {products.map((item) => (
                        <div key={item._id} className="bg-white p-2 border-2 border-color: inherit rounded-lg flex h-60"> {/* Set a fixed height for each item */}
                            <img src={item.productImageURL} alt={item.productName} className="w-1/6 h-55 object-fit" /> {/* Ensures image fits */}
                            <div className="ml-4 flex-1 flex flex-col justify-between">
                                <div className='p-4 space-y-4'>
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-semibold">{item.productName}</h2>
                                        {/* available */}
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
                                    {/* <p className="text-gray-600 font-regular text-sm">{item.productDescription}</p> */}
                                    <a href={`/productDetails/${item._id}`} className="text-blue-500 mt-2 inline-block font-medium text-xs">View details</a>
                                </div>


                            </div>
                            {/* <div className="flex items-start ml-4 p-3">
                                <button className="p-2 rounded-lg border border-borderOutline bg-iconFill">
                                    <HeartIcon className="w-6 h-6 text-gray-400" aria-hidden="true" />
                                </button>
                            </div> */}
                            {/* <div className="flex items-start ml-4 p-3">
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
                            </div> */}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default ShoppingBag
