

import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon, HeartIcon as OutlineHeartIcon, StarIcon, CalendarIcon, XIcon } from '@heroicons/react/outline';
import { HeartIcon as SolidHeartIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { addFavoriteApi, addToShoppingBagApi, getShoppingBagByUserIDApi, getSingleProductApi, getSingleShoppingBagApi, updateShoppingBagApi } from '../../apis/Api';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EditShoppingBag = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [productRentalPrice, setProductRentalPrice] = useState('');
    const [productSecurityDeposit, setProductSecurityDeposit] = useState('');

    // calendar
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

    const [userID, setUserID] = useState(''); // Set this to the actual user ID
    const [productID, setProductID] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [quantity, setQuantity] = useState(1);
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


    useEffect(() => {
        // Fetch product details from API when component mounts
        getSingleProductApi(id).then((res) => {
            const product = res.data.product;
            setProductName(product.productName);
            setProductRentalPrice(product.productRentalPrice);
            setProductSecurityDeposit(product.productSecurityDeposit);
            setProductQuantity(product.productQuantity);

        }).catch(err => {
            console.error('Error fetching product details:', err);
        });
    }, [id]);


    useEffect(() => {
        // Fetch product details from API when component mounts
        getSingleShoppingBagApi(id).then((res) => {
            const rentalPrice = parseFloat(product.productRentalPrice);
            const securityDeposit = parseFloat(product.productSecurityDeposit);
            const quantity = parseInt(product.productQuantity, 10);
            // const totalPrice = securityDeposit + rentalPrice * quantity;

            const shoppingBag = res.data.shoppingBag;
            setUserID(shoppingBag.userID);
            setProductID(shoppingBag.productID);
            setDeliveryDate(shoppingBag.deliveryDate);
            setReturnDate(shoppingBag.returnDate);
            setTotalPrice(shoppingBag.totalPrice);
            setQuantity(shoppingBag.quantity);

        }).catch(err => {
            console.error('Error fetching shopping bag details:', err);
        });
    }, [id]);

    const handleSave = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('deliveryDate', deliveryDate);
        formData.append('quantity', quantity);
        formData.append('returnDate', returnDate);
        formData.append('totalPrice', totalPrice);
        updateShoppingBagApi(id, formData)
            .then((res) => {
                if (res.data.success === true) {
                    toast.success(res.data.message);
                    navigate('/shoppingBag');
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch(() => {
                toast.error('Server Error');
            });
    };

    const handleCancelForm = () => {
        navigate('/shoppingBag');
    };

    const [productQuantity, setProductQuantity] = useState(1)

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
    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-poppins">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex justify-between items-center bg-gray-200 px-6 py-3">
                    <h3 className="text-2xl font-medium text-gray-900">Edit Shopping Bag</h3>
                    <button
                        type="button"
                        className="text-gray-600 bg-transparent hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm p-2"
                        onClick={() => navigate('/shoppingBag')}
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 sm:p-8">
                    <form className="space-y-4"
                    // onSubmit={handleSubmit}
                    >
                        <div className="max-w-6xl mx-auto p-2 font-poppins">
                            <div className="space-y-2">
                                <div className="bg-white p-2 border-2 border-gray-200 rounded-lg flex h-300">
                                    <div className="ml-4 flex-1 flex flex-col justify-between font-poppins">
                                        {/* <div className='flex justify-between'> */}
                                        <h2 className="text-2xl font-semibold">{productID.productName}</h2>
                                        {/* </div> */}
                                        <p className="text-customGray font-medium text-lg">
                                            Rental Price <span className="font-bold text-gray-800">NPR. {productID.productRentalPrice}</span> for 4 days
                                        </p>
                                        <p className="text-gray-600 font-light text-md">Security Deposit Rs. {productID.productSecurityDeposit}</p>
                                        {/* calendar */}
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
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Form action */}
                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                type="button"
                                className="px-4 py-2 text-sm text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none"
                                onClick={handleCancelForm}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                onClick={handleSave}                >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>






    )
}

export default EditShoppingBag
