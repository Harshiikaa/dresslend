import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, HeartIcon as OutlineHeartIcon, StarIcon, CalendarIcon } from '@heroicons/react/outline';
import { HeartIcon as SolidHeartIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { addFavoriteApi, addToShoppingBagApi, createRatingApi, getSingleProductApi, upsertRatingApi } from '../../apis/Api';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';

const ProductDetails = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [averageRating, setAverageRating] = useState(0);
    const [ratingCount, setRatingCount] = useState(0);

    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [showCalendar, setShowCalendar] = useState(false);
    const [displayDate, setDisplayDate] = useState(null);

    const handleDateClick = (day) => {
        const selectedDateTime = new Date(currentYear, currentMonth, day).getTime();
        const today = new Date().setHours(0, 0, 0, 0);

        if (selectedDateTime >= today) {
            setSelectedDate(day);
        } else {
            console.log('Cannot select past dates.');
        }
    };

    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const renderCalendar = () => {
        const days = [];
        const totalDays = daysInMonth(currentMonth, currentYear);
        const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="w-12 h-12"></div>);
        }

        for (let day = 1; day <= totalDays; day++) {
            const isToday = new Date().getDate() === day && new Date().getMonth() === currentMonth;
            const isSelected = selectedDate === day;
            const isDisabled = new Date(currentYear, currentMonth, day).getTime() < new Date().setHours(0, 0, 0, 0);

            days.push(
                <div
                    key={day}
                    className={`w-12 h-12 flex items-center justify-center cursor-pointer
                        ${isToday ? 'bg-blue-500 text-white' : isSelected ? 'bg-blue-200' : isDisabled ? 'text-gray-400 cursor-not-allowed' : ''}
                    `}
                    onClick={() => isDisabled ? null : handleDateClick(day)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    const handleNextMonth = () => {
        let newMonth = currentMonth + 1;
        let newYear = currentYear;

        if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        }

        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const handleSetDate = () => {
        const date = new Date(currentYear, currentMonth, selectedDate);
        const returnDate = new Date(date);
        returnDate.setDate(date.getDate() + 4); // Add 4 days to delivery date

        setDisplayDate(date);
        setDeliveryDate(date);  // Set the delivery date in the parent component
        setReturnDate(returnDate); // Set the return date
        setShowCalendar(false);
    };

    const handleCancel = () => {
        setShowCalendar(false);
    };
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

    const handleRentNow = (e) => {
        e.preventDefault();
        const rentalPrice = parseFloat(product.productRentalPrice);
        const securityDeposit = parseFloat(product.productSecurityDeposit);
        const quantity = parseInt(product.productQuantity, 10);
        const totalPrice = securityDeposit + rentalPrice * quantity;

        const formData = new FormData();
        formData.append('userID', user._id);
        formData.append('productID', id);
        formData.append('deliveryDate', deliveryDate);
        formData.append('returnDate', returnDate);
        formData.append('totalPrice', totalPrice);
        formData.append('quantity', quantity);
        console.log(userID, productID, deliveryDate, returnDate, totalPrice, quantity);
        addToShoppingBagApi(formData).then((res) => {
            if (res.data.success === false) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
            }
        }).catch(err => {
            toast.error("Server Error");
            console.log(err.message);
        });
    };

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

    const handleRatingSubmit = async () => {
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
    }, [id]);

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
        if (!product) return <div>Loading...</div>;
    };

    const [productQuantity, setProductQuantity] = useState(1)
    // const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        setQuantity((prevQuantity) => {
            if (prevQuantity < product.productQuantity) {
                return prevQuantity + 1;
            } else {
                toast.warning('Please check the number of quantity available and choose');
                return prevQuantity;
            }
        });
    };

    const handleDecrease = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const validAverageRating = Number.isFinite(averageRating) && averageRating >= 0 && averageRating <= 5 ? averageRating : 0;

    return (
        <div>
            <div className='flex gap-2'>
                <button
                    onClick={handleBackClick}
                    className="inline-flex items-center gap-2 rounded-md bg-gray-50 px-2 py-2 text-sm ring-inset ring-gray-300 hover:bg-gray-100"
                >
                    <ArrowLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </button>
            </div>
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

                            {/* Rating */}
                            {/* <div className="flex items-center">
                                {[...Array(product.rating)].map((_, i) => (
                                    <StarIcon key={i} className="w-5 h-5 text-yellow-500" />
                                ))}
                            </div> */}

                            <div >
                                <div className="flex items-center">
                                    {[...Array(Math.round(validAverageRating))].map((_, i) => (
                                        <StarIcon key={i} className="w-5 h-5 text-yellow-500" />
                                    ))}
                                    <span className="ml-2 text-gray-600">({ratingCount} reviews)</span>
                                </div>

                            </div>

                            <p className="text-customGray font-medium text-lg">
                                Rental Price <span className="font-bold text-gray-800">NPR. {product.productRentalPrice}</span> for 4 days
                            </p>
                            <p className="text-gray-600 font-light text-md">Security Deposit Rs. {product.productSecurityDeposit}</p>
                            {/* <DatePickerCalendar setDeliveryDate={setDeliveryDate} /> */}

                            <div className="relative p-4">
                                <div className="flex justify-between items-center mb-1">
                                    <button
                                        onClick={toggleCalendar}
                                        className="flex items-center justify-center px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                                    >
                                        <span className="mr-2">
                                            {displayDate ? displayDate.toLocaleDateString() : "Choose Date"}
                                        </span>
                                        <CalendarIcon className="w-6 h-6 text-gray-600" />
                                    </button>
                                    {showCalendar && (
                                        <div className="absolute z-5 top-12 left-0">
                                            <div className="shadow-lg bg-white p-2 rounded-lg border border-gray-200">
                                                <div className="flex justify-between items-center">
                                                    <button
                                                        disabled
                                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 opacity-50 cursor-not-allowed"
                                                    >
                                                        <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
                                                    </button>
                                                    <div className="text-lg font-semibold">
                                                        {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                                    </div>
                                                    <button
                                                        onClick={handleNextMonth}
                                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
                                                    >
                                                        <ChevronRightIcon className="w-6 h-6 text-gray-600" />
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-7 gap-2">
                                                    <div className="text-center text-gray-600">Sun</div>
                                                    <div className="text-center text-gray-600">Mon</div>
                                                    <div className="text-center text-gray-600">Tue</div>
                                                    <div className="text-center text-gray-600">Wed</div>
                                                    <div className="text-center text-gray-600">Thu</div>
                                                    <div className="text-center text-gray-600">Fri</div>
                                                    <div className="text-center text-gray-600">Sat</div>
                                                    {renderCalendar()}
                                                </div>
                                                <div className="mt-2">
                                                    {selectedDate && (
                                                        <div className="bg-blue-100 p-1 rounded-md text-blue-800">
                                                            Selected Date: {selectedDate}/{currentMonth + 1}/{currentYear}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center justify-end p-2 bg-gray-100 border-t">
                                                    <button
                                                        onClick={handleCancel}
                                                        className="px-2 py-1 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 hover:bg-gray-200"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={handleSetDate}
                                                        className="px-2 py-1 ml-2 text-sm text-white bg-blue-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 hover:bg-blue-700"
                                                    >
                                                        Set Date
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Quantity*/}
                            <div className="items-center">
                                <label
                                    htmlFor="message"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Quantity
                                </label>
                                <div className='flex'>
                                    <button
                                        type="button"
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-l"
                                        onClick={handleDecrease}
                                    >
                                        -
                                    </button>
                                    <input
                                        onChange={(e) => setProductQuantity(e.target.value)}
                                        type="number"
                                        name="Quantity"
                                        id="Quantity"
                                        value={quantity}
                                        className="w-10 h-8 text-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-none focus:ring-blue-500 focus:border-blue-500 block text-center"
                                    />
                                    <button
                                        type="button"
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-r"
                                        onClick={handleIncrease}
                                    >
                                        +
                                    </button>
                                </div>

                            </div>
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
                    <div className='bg-white p-2 border-2 border-gray-200 rounded-lg flex h-300'>
                        <div className="flex">
                            {[...Array(5)].map((star, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <label key={index} className="cursor-pointer">
                                        <FaStar
                                            size={24}
                                            className={ratingValue <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'}
                                            onClick={() => setRating(ratingValue)}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(null)}
                                        />
                                    </label>
                                );
                            })}
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
        </div>
    );
}

export default ProductDetails;
