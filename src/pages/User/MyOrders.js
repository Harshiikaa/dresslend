import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getOrderByUserIDApi } from '../../apis/Api';
import { toast } from 'react-toastify';
import { TrashIcon, PencilAltIcon, StarIcon } from '@heroicons/react/solid';
import { ArrowLeftIcon } from '@heroicons/react/outline';

const MyOrders = () => {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrderByUserIDApi(user._id)
            .then((res) => {
                console.log("API Response:", res.data);
                setOrders(res.data.order);
            })
            .catch(err => {
                toast.error("Server Error");
                console.log(err.message);
            });
    }, [user._id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString();
    };

    const handleDelete = (id) => {
        // Handle delete action
        console.log("Delete item with ID:", id);
    };

    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1); // This navigates to the previous page
    };

    return (
        <div>
            <div className="mt-8"> {/* Adjust the top margin as needed */}
                <div className='w-full font-poppins flex justify-between bg-white top-0 left-0 right-0 p-4 inherit z-50'>

                    <div className='flex gap-2'>
                        <button
                            onClick={handleBackClick}
                            className="inline-flex items-center gap-2 rounded-md bg-gray-50 px-2 py-2 text-sm ring-inset ring-gray-300 hover:bg-gray-100"
                        >
                            <ArrowLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold">My Orders</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-2 mt-24 font-poppins">
                {orders.map(order => (
                    <div key={order._id} className="border p-4 mb-4 rounded shadow-sm">
                        <h3 className="text-lg font-bold">Order ID: {order._id}</h3>
                        <p>Order Status: {order.orderStatus}</p>
                        <p>Payment Method: {order.paymentMethod}</p>
                        <p>Created At: {formatDate(order.createdAt)}</p>
                        <p>Shipping ID: {order.shippingID}</p>
                        <h4 className="text-md font-semibold mt-2">Items:</h4>
                        <div className="space-y-2">
                            {order.shoppingItemList && order.shoppingItemList.length > 0 ? (
                                order.shoppingItemList.map(item => {
                                    const shoppingBag = item.shoppingBagID;
                                    const product = shoppingBag.productID;
                                    return (
                                        <div key={item._id} className="bg-white p-4 flex border-2 border-color: inherit rounded-lg h-auto">
                                            <img src={product.productImageURL} alt={product.productName} className="w-1/6 h-55 object-cover" />
                                            <div className="flex-1 flex justify-between gap-4">
                                                <div className='flex flex-col items-start gap-4 pl-4'>
                                                    <h2 className="text-xl font-semibold">{product.productName}</h2>
                                                    <div className='flex flex-row items-start gap-4'>
                                                        <div className="flex-1 w-2/5 p-4 space-y-2">
                                                            <p className="text-customGray font-medium text-sm">
                                                                Rental Price <span className="font-bold text-gray-800">NPR. {product.productRentalPrice}</span> for 4 days
                                                            </p>
                                                            <p className="text-gray-600 font-light text-xs">Security Deposit Rs. {product.productSecurityDeposit}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm">Rental Date:<br />{formatDate(shoppingBag.deliveryDate)}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm">Return Date: <br />{formatDate(shoppingBag.returnDate)}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm">Rented Quantity: <br />{shoppingBag.quantity}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold">Total Price:<br /> NPR. {shoppingBag.totalPrice}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        {[...Array(4)].map((_, i) => (
                                                            <StarIcon key={i} className="w-4 h-4 text-yellow-500" />
                                                        ))}
                                                    </div>
                                                    <a href={`/productDetails/${shoppingBag._id}`} className="text-blue-500 mt-2 inline-block font-medium text-xs">View details</a>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>No items found for this order.</p>
                            )}
                        </div>
                        <p>Total Payment: {order.totalPayment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
