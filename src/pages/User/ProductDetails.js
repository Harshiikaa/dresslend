import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, HeartIcon as OutlineHeartIcon, StarIcon, CalendarIcon } from '@heroicons/react/outline';
import { HeartIcon as SolidHeartIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { addFavoriteApi, addToShoppingBagApi, createRatingApi, getSingleProductApi, upsertRatingApi } from '../../apis/Api';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';
import { AuthContext } from '../../components/AuthContent';
import Login from '../Auth/Login';

const ProductDetails = () => {
    const { auth, checkAuth } = useContext(AuthContext);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [averageRating, setAverageRating] = useState(0);
    const [ratingCount, setRatingCount] = useState(0);
    const validAverageRating = Number.isFinite(averageRating) && averageRating >= 0 && averageRating <= 5 ? averageRating : 0;

    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));

    const [userID, setUserID] = useState(''); // Set this to the actual user ID
    const [productID, setProductID] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false); // Initialize based on whether the product is already a favorite
    const [product, setProduct] = useState({
        productName: '',
        productRentalPrice: '',
        productSecurityDeposit: '',
        productCategory: '',
        productQuantity: '',
        productSize: '',
        productDescription: '',
        productImageURL: null,
    });

    const navigate = useNavigate();

    const handleRentNow = (e) => {
        e.preventDefault();
        if (!checkAuth()) {
            toast.warning('Please login first');
            setIsLoginOpen(true);
            return;
        }

        const rentalPrice = parseFloat(product.productRentalPrice);
        const securityDeposit = parseFloat(product.productSecurityDeposit);
        const quantity = parseInt(product.productQuantity, 10);
        const totalPrice = securityDeposit + rentalPrice * quantity;

        const formData = new FormData();
        formData.append('userID', auth.user.id);
        formData.append('productID', id);
        formData.append('deliveryDate', deliveryDate);
        formData.append('returnDate', returnDate);
        formData.append('totalPrice', totalPrice);
        formData.append('quantity', quantity);

        addToShoppingBagApi(formData).then((res) => {
            if (res.data.success === false) {
                toast.error(res.data.message);
            } else {
                window.location.reload();
                toast.success(res.data.message);
            }
        }).catch(err => {
            toast.error("Server Error");
            console.log(err.message);
        });
    };

    const handleAddFavorite = async () => {
        if (!checkAuth()) {
            toast.warning('Please login first');
            setIsLoginOpen(true);
            return;
        }
        const data = {
            userID: user._id,
            productID: id,
        };
        try {
            const response = await addFavoriteApi(data);

            if (response.status === 200) {
                const message = response.data.message;
                // Check if the item was added or removed from favorites
                if (message.includes('added')) {
                    setIsFavorite(true);
                    toast.success('Item added to Favorite');
                    localStorage.setItem(`favorite_${id}`, JSON.stringify(true));
                } else if (message.includes('removed')) {
                    setIsFavorite(false);
                    toast.info('Item removed from Favorite');
                    localStorage.setItem(`favorite_${id}`, JSON.stringify(false));
                } else {
                    toast.error('Unexpected response from server');
                }
            } else {
                toast.error(response.data.message || 'Failed to update favorite');
            }
        } catch (error) {
            console.error('Add Favorite Error:', error);
            toast.error('Server Error');
        }
    };

    const handleRatingSubmit = async () => {
        if (!checkAuth()) {
            toast.warning('Please login first');
            setIsLoginOpen(true);
            return;
        }
        const data = {
            productID: id,
            rating: rating,
        };

        try {
            const response = await upsertRatingApi(data);

            if (response.data.success) {
                setAverageRating(response.data.averageRating);
                setRatingCount(response.data.ratingCount);
                toast.success(response.data.message);
                // Save rating state in localStorage
                localStorage.setItem(`rating_${id}`, JSON.stringify({
                    rating: rating,
                    averageRating: response.data.averageRating,
                    ratingCount: response.data.ratingCount,
                }));
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Rating Submission Error:', error);
            toast.error('Server Error');
        }
    };

    useEffect(() => {
        getSingleProductApi(id).then((res) => {
            setProduct({
                productName: res.data.product.productName,
                productRentalPrice: res.data.product.productRentalPrice,
                productSecurityDeposit: res.data.product.productSecurityDeposit,
                productCategory: res.data.product.productCategory,
                productQuantity: res.data.product.productQuantity,
                productSize: res.data.product.productSize,
                productDescription: res.data.product.productDescription,
                productImageURL: res.data.product.productImageURL,
            });
            setAverageRating(res.data.product.averageRating);
            setRatingCount(res.data.product.ratingCount);
        });

        // Initialize rating state from localStorage
        const storedRating = JSON.parse(localStorage.getItem(`rating_${id}`));
        if (storedRating) {
            setRating(storedRating.rating);
            setAverageRating(storedRating.averageRating);
            setRatingCount(storedRating.ratingCount);
        }

        // Initialize favorite state from localStorage
        const storedFavorite = JSON.parse(localStorage.getItem(`favorite_${id}`));
        if (storedFavorite !== null) {
            setIsFavorite(storedFavorite);
        }
    }, [id]);

    const handleBackClick = () => {
        navigate(-1);
        if (!product) return <div>Loading...</div>;
    };

    // Handle user logout and clear stored data
    const handleLogout = () => {
        // Clear user data from local storage
        localStorage.removeItem('user');

        // Clear rating and favorite status for this product
        localStorage.removeItem(`rating_${id}`);
        localStorage.removeItem(`favorite_${id}`);

        // Perform additional logout operations
        // Redirect to login page, clear context, etc.
        navigate('/login');
        toast.info('You have been logged out');
    };

    return (
        <div className='font-poppins'>
            {/* Back button */}
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
                            <h1 className="text-2xl font-bold">{product.productName}</h1>
                        </div>
                    </div>
                </div>
            </div>
            {/* main content */}
            <div className="max-w-6xl mx-auto p-2 font-poppins">
                <div className="space-y-2">
                    <div className="bg-white p-2 border-2 border-gray-200 rounded-lg flex h-300">
                        <img src={product.productImageURL} alt={product.productName} className="w-1/3 h-auto object-cover" />
                        <div className="ml-4 flex-1 flex flex-col justify-between font-poppins">
                            <div className='flex justify-between'>
                                <h2 className="text-2xl font-semibold">{product.productName}</h2>
                                <div className="flex items-start ml-4 p-3">
                                    <button
                                        className={`p-2 rounded-lg border border-borderOutline`}
                                        onClick={handleAddFavorite}
                                    >
                                        {isFavorite ? (
                                            <SolidHeartIcon className="w-6 h-6 text-red-600" aria-hidden="true" />
                                        ) : (
                                            <OutlineHeartIcon className="w-6 h-6 text-gray-400" aria-hidden="true" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <p className="text-customGray font-medium text-lg">
                                Rental Price <span className="font-bold text-gray-800">NPR. {product.productRentalPrice}</span> for 4 days
                            </p>
                            <p className="text-gray-600 font-light text-md">Security Deposit Rs. {product.productSecurityDeposit}</p>
                            <div>
                                <p className="text-gray-600 font-light text-md">Size: <span className="font-regular text-[#505050]">{product.productSize}</span></p>
                                <p className="text-gray-600 font-light text-md">Category: <span className="font-regular text-[#505050]">{product.productCategory}</span></p>
                                <p className="text-gray-600 font-light text-md">Available Quantity: <span className="font-regular text-[#505050]">{product.productQuantity}</span></p>
                            </div>
                            <div>
                                <button onClick={handleRentNow} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                    Rent Now
                                </button>
                            </div>
                            <div>
                                <h2 className="text-1xl font-medium font-poppins">Product Info</h2>
                                <p className="text-gray-600 font-regular text-md ">{product.productDescription}</p>
                            </div>
                        </div>
                    </div>
                    {/* Rating */}
                    <div className="bg-white p-4 border-2 border-gray-200 rounded-lg mx-auto mt-10">
                        <div className="border-b-2 border-gray-200 pb-2 mb-4">
                            <ul className="flex space-x-4">
                                <li className="text-blue-500 border-b-2 border-blue-500 pb-1">Rating</li>
                                {/* Add other tabs here if needed */}
                            </ul>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-gray-600 font-light text-md"><span className="font-medium text-grayText">Your Rating</span></p>
                            <div className="flex items-center">
                                {[...Array(5)].map((star, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                        <label key={index} className="cursor-pointer">
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={ratingValue}
                                                onClick={() => setRating(ratingValue)}
                                            />
                                            <FaStar
                                                className="star"
                                                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                                size={20}
                                                onMouseEnter={() => setHover(ratingValue)}
                                                onMouseLeave={() => setHover(null)}
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                            <button
                                className="mt-4 p-2 bg-blue-500 text-white rounded"
                                onClick={handleRatingSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </div>
    );
}

export default ProductDetails;
