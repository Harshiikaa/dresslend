import React, { useState } from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { createShippingInfoApi } from '../../../apis/Api';
import { toast } from 'react-toastify';
import { ArrowLeftIcon, ArrowNarrowLeftIcon } from '@heroicons/react/outline';

const ShippingInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const [userID, setUserID] = useState('');
    const shoppingBag = location.state?.shoppingBag || [];
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [nearLandmark, setNeearLandmark] = useState('');



    const changeFirstName = (e) => {
        setFirstName(e.target.value);
    };
    const changeLastName = (e) => {
        setLastName(e.target.value);
    };
    const changeContactNumber = (e) => {
        setContactNumber(e.target.value);
    };
    const changeCity = (e) => {
        setCity(e.target.value);
    };

    const changeAddress = (e) => {
        setAddress(e.target.value);
    };
    const changeNearLandmark = (e) => {
        setNeearLandmark(e.target.value);
    };


    // const handleCheckout = (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('userID', user._id);
    //     // formData.append('shoppingBagID', user._id);
    //     formData.append('firstName', firstName);
    //     formData.append('lastName', lastName);
    //     formData.append('contactNumber', contactNumber);
    //     formData.append('city', city);
    //     formData.append('address', address);
    //     formData.append('nearLandmark', nearLandmark);
    //     console.log(user._id, firstName, lastName, contactNumber, city, address, nearLandmark);
    //     createShippingInfoApi(formData).then((res) => {
    //         if (res.data.success === false) {
    //             toast.error(res.data.message);
    //         } else {
    //             toast.success(res.data.message);
    //         }
    //     }).catch(err => {
    //         toast.error("Server Error");
    //         console.log(err.message);
    //     });

    //     navigate('/review');

    // };
    const handleCheckout = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('userID', user._id);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('contactNumber', contactNumber);
        formData.append('city', city);
        formData.append('address', address);
        formData.append('nearLandmark', nearLandmark);

        // Assuming createShippingInfoApi handles the creation and returns success
        createShippingInfoApi(formData)
            .then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);
                    // Pass data to Review component
                    handleNavigateToReview();
                }
            })
            .catch(err => {
                toast.error("Server Error");
                console.log(err.message);
            });
    };

    const handleNavigateToReview = () => {
        navigate('/review', {
            state: {
                shippingInfo: {
                    firstName,
                    lastName,
                    contactNumber,
                    city,
                    address,
                    nearLandmark
                },
                // shoppingBag  // assuming you have shoppingBag state
            }
        });
    };

    const handleBackClick = () => {
        navigate(-1); // This navigates to the previous page
    };


    return (
        <div className='mt-8'>
            <div className='w-full flex justify-between bg-white top-0 left-0 right-0 p-4 inherit z-50'>
                <div className='flex gap-2'>
                    <button
                        onClick={handleBackClick}
                        className="inline-flex items-center gap-2 rounded-md bg-gray-50 px-2 py-2 text-sm ring-inset ring-gray-300 hover:bg-gray-100"
                    >
                        <ArrowLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </button>
                </div>
            </div>
            <div className="max-w-2xl mx-auto">
                {/* process board */}
                <div className="text-center mb-6 bg-gray-200 p-4">
                    <h2 className="text-2xl font-semibold">PLACE YOUR RENT</h2>
                    <div className="flex justify-center mt-4 text-xs items-center">
                        {/* address */}
                        <div className="flex flex-col items-center space-y-2">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white">1</div>
                            <span className="ml-2 pt-1.5">ADDRESS</span>
                        </div>

                        <div className="w-24 h-1 bg-gray-300 mx-4"></div>

                        {/* Review */}
                        <div className="flex flex-col items-center space-y-2">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 text-gray-500">2</div>
                            <span className="ml-2">REVIEW</span>
                        </div>

                        <div className="w-24 h-1 bg-gray-300 mx-4"></div>

                        {/* Payment */}
                        <div className="flex flex-col items-center space-y-2">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 text-gray-500">3</div>
                            <span className="ml-2">PAYMENT</span>
                        </div>
                    </div>

                </div>
                <form
                    className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            onChange={changeFirstName}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            onChange={changeLastName}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="contactNumber"
                            placeholder="Contact Number"
                            onChange={changeContactNumber}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <select
                            name="city"
                            onChange={changeCity}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select City</option>
                            <option value="Kathmandu">Kathmandu</option>
                            <option value="Lalitpur">Lalitpur</option>
                            <option value="Bhaktapur">Bhaktapur</option>
                        </select>

                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            onChange={changeAddress}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Near Landmark"
                            onChange={changeNearLandmark}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className='flex felx-col justify-center'>
                        <button type="submit" onClick={handleCheckout} className="w-1/5 bg-blue-500 text-white py-2 rounded mt-4">
                            NEXT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ShippingInfo
