import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createOrderApi, getShippingInfoByUserIDApi, getShoppingBagByUserIDApi } from '../../../apis/Api';
import { toast } from 'react-toastify';

const Payment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const userid = user._id;

    const [userID, setUserID] = useState(user._id);
    const [shoppingItemList, setShoppingItemList] = useState([]);
    const [shippingInfo, setShippingInfo] = useState({ shippingID: '' });
    const [totalPayment, setTotalPayment] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [orderStatus, setOrderStatus] = useState('PENDING');
    const [createdAt, setCreatedAt] = useState('');

    const [shoppingBag, setShoppingBag] = useState([]);

    useEffect(() => {
        console.log('Fetching shipping info for userID:', userid);

        getShippingInfoByUserIDApi(userid)
            .then((res) => {
                console.log('API response:', res);
                if (res.data && res.data.shippingInfo && res.data.shippingInfo.length > 0) {
                    const shippingID = res.data.shippingInfo[0]._id; // Assuming _id is in the first item
                    console.log('Shipping ID:', shippingID);
                    setShippingInfo({ shippingID });
                } else {
                    console.error('Shipping ID not found in API response:', res);
                }
            })
            .catch((error) => {
                console.error('Error fetching shipping info:', error);
            });
    }, [userid]);

    useEffect(() => {
        getShoppingBagByUserIDApi(userid)
            .then((res) => {
                console.log('Fetched shopping bag data:', res.data.shoppingBag);
                if (res.data.shoppingBag && Array.isArray(res.data.shoppingBag)) {
                    setShoppingBag(res.data.shoppingBag);
                    const total = res.data.shoppingBag.reduce((acc, item) => acc + item.totalPrice, 0);
                    setTotalPayment(total);
                } else {
                    console.error('Invalid data format:', res.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching shopping bag data:', error);
            });
    }, [userid]);

    // Handle form submission
    const handlePlaceOrder = (e) => {
        e.preventDefault();

        // Set createdAt to current time
        const currentTime = new Date().toISOString();
        setCreatedAt(currentTime);

        // Transform shoppingBag data to the desired format
        const shoppingItemList = shoppingBag.map(item => ({ shoppingBagID: item._id }));

        // Construct FormData object
        const formData = new FormData();
        formData.append('userID', userID);
        formData.append('shoppingItemList', JSON.stringify(shoppingItemList));
        formData.append('shippingID', shippingInfo.shippingID);
        formData.append('totalPayment', totalPayment);
        formData.append('paymentMethod', paymentMethod);
        formData.append('orderStatus', orderStatus);
        formData.append('createdAt', currentTime);

        console.log('FormData to be submitted:', formData);

        // Call createOrderApi function to submit the form data
        createOrderApi(formData)
            .then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);
                    navigate('/success');
                }
            })
            .catch(err => {
                toast.error("Server Error");
                console.error(err);
            });
    };

    return (
        <div className="max-w-2xl mx-auto p-4 mt-8">
            {/* Process board */}
            {/* ... */}
            <div className="text-center mb-6 bg-gray-200 p-4">
                <h2 className="text-2xl font-semibold">PLACE YOUR RENT</h2>
                <div className="flex justify-center mt-4 text-xs items-center">
                    {/* Address */}
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 text-gray-500">1</div>
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
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white">3</div>
                        <span className="ml-2">PAYMENT</span>
                    </div>
                </div>
            </div>

            {/* Payment form */}
            <div className="w-full max-w-xs mx-auto">
                <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-xl font-semibold text-blue-500 mb-4">Payment Method</h2>
                    <form onSubmit={handlePlaceOrder}>
                        <div className="mb-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-blue-500"
                                    name="payment"
                                    value="CASH ON DELIVERY"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <span className="ml-2">Cash on Delivery</span>
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-blue-500"
                                    name="payment"
                                    value="KHALTI"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <span className="ml-2">Khalti</span>
                            </label>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                            Place Order
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Payment;

