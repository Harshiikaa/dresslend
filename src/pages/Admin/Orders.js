
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllOrdersApi, updateOrderStatusApi } from '../../apis/Api'; // Assuming you have these functions
import SidebarAdmin from '../../components/SidebarAdmin';
import NavbarAdmin from '../../components/NavbarAdmin';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [flattenedOrders, setFlattenedOrders] = useState([]);

    useEffect(() => {
        getAllOrdersApi()
            .then((res) => {
                console.log("API Response:", res.data);
                setOrders(res.data.orders);
                setFlattenedOrders(flattenOrderData(res.data.orders));
                console.log("Orders state:", res.data.orders);
            })
            .catch(err => {
                toast.error("Server Error");
                console.log(err.message);
            });
    }, []);

    const flattenOrderData = (orders) => {
        const flattenedData = [];
        orders.forEach(order => {
            order.shoppingItemList.forEach(item => {
                const shoppingBag = item.shoppingBagID;
                const shipping = order.shippingID;

                if (shoppingBag && shoppingBag.productID) {
                    const shippingInfo = shipping ? `
                        Name: ${shipping.firstName} ${shipping.lastName}
                        Contact: ${shipping.contactNumber}
                        City: ${shipping.city}
                        Address: ${shipping.address}
                        Near Landmark: ${shipping.nearLandmark}
                    ` : 'No Shipping Info';

                    flattenedData.push({
                        orderId: order._id,
                        orderStatus: order.orderStatus,
                        paymentMethod: order.paymentMethod,
                        createdAt: order.createdAt,
                        totalPayment: order.totalPayment,
                        productName: shoppingBag.productID.productName,
                        productImage: shoppingBag.productID.productImageURL,
                        deliveryDate: shoppingBag.deliveryDate,
                        returnDate: shoppingBag.returnDate,
                        quantity: shoppingBag.quantity,
                        totalPrice: shoppingBag.totalPrice,
                        shippingInfo,
                    });
                }
            });
        });
        return flattenedData;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString();
    };

    const handleStatusChange = (orderId, newStatus) => {
        console.log('Status change triggered:', orderId, newStatus); // Add this log
        updateOrderStatusApi(orderId, newStatus)
            .then((res) => {
                console.log('Update Response:', res); // Log the response
                if (res.success) {
                    toast.success("Order status updated successfully");
                    setOrders(prevOrders => {
                        const updatedOrders = prevOrders.map(order => {
                            if (order._id === orderId) {
                                return { ...order, orderStatus: newStatus };
                            }
                            return order;
                        });
                        window.location.reload(); // Reload the page after updating status
                        setFlattenedOrders(flattenOrderData(updatedOrders));
                        return updatedOrders;
                    });
                } else {
                    toast.success("Updated Product successfully");
                    console.error("Failed to update order status. API Response:", res);
                }
            })
            .catch(err => {
                toast.error("Failed to update order status");
                console.error('Error:', err.message);
            });
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'PENDING':
                return 'text-gray-500 font-bold';
            case 'IN PROCESS':
                return 'text-yellow-500 font-bold';
            case 'DELIVERED':
                return 'text-green-500 font-bold';
            case 'CANCELED':
                return 'text-red-500 font-bold';
            default:
                return '';
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <SidebarAdmin />
            <div className="flex-1 flex flex-col">
                <NavbarAdmin />
                <div className="max-w-6xl mx-auto p-2 font-poppins">
                    <h1 className="text-4xl font-bold mb-2">Orders</h1>

                    <div className="overflow-x-auto">
                        <div className="min-w-full max-h-96 overflow-y-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Image</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ minWidth: '165px' }}>Order Status</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QTY</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Date</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Date</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ minWidth: '200px' }}>Shipping Info</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {flattenedOrders && flattenedOrders.length > 0 ? (
                                        flattenedOrders.map((order, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <img src={order.productImage} alt={order.productName} className="h-10 w-10" />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.productName}</td>
                                                <td className={`px-6 py-4 whitespace-nowrap text-sm ${getStatusClass(order.orderStatus)}`}>
                                                    <select
                                                        value={order.orderStatus}
                                                        onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                                        className="bg-gray-50 border font-bold border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                        style={{ color: getStatusClass(order.orderStatus).split(' ')[0].replace('text-', '') }}
                                                    >
                                                        <option value="PENDING" style={{ color: 'gray' }}>Pending</option>
                                                        <option value="IN PROCESS" style={{ color: 'green' }}>In Process</option>
                                                        <option value="DELIVERED" style={{ color: 'blue' }}>Delivered</option>
                                                        <option value="CANCELED" style={{ color: 'red' }}>Canceled</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.quantity}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(order.createdAt)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(order.deliveryDate)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(order.returnDate)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.totalPrice}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.paymentMethod}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <pre className="whitespace-pre-wrap">{order.shippingInfo}</pre>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="10" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No orders available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;

// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import { getAllOrdersApi, updateOrderStatusApi } from '../../apis/Api'; // Assuming you have these functions
// import SidebarAdmin from '../../components/SidebarAdmin';
// import NavbarAdmin from '../../components/NavbarAdmin';

// const Orders = () => {
//     const [orders, setOrders] = useState([]);
//     const [flattenedOrders, setFlattenedOrders] = useState([]);

//     useEffect(() => {
//         getAllOrdersApi()
//             .then((res) => {
//                 console.log("API Response:", res.data);
//                 setOrders(res.data.orders);
//                 setFlattenedOrders(flattenOrderData(res.data.orders));
//                 console.log("Orders state:", res.data.orders);
//             })
//             .catch(err => {
//                 toast.error("Server Error");
//                 console.log(err.message);
//             });
//     }, []);

//     const flattenOrderData = (orders) => {
//         const flattenedData = [];
//         orders.forEach(order => {
//             order.shoppingItemList.forEach(item => {
//                 const shoppingBag = item.shoppingBagID;
//                 const shipping = order.shippingID;

//                 if (shoppingBag && shoppingBag.productID) {
//                     const shippingInfo = shipping ? `
//                         Name: ${shipping.firstName} ${shipping.lastName}
//                         Contact: ${shipping.contactNumber}
//                         City: ${shipping.city}
//                         Address: ${shipping.address}
//                         Near Landmark: ${shipping.nearLandmark}
//                     ` : 'No Shipping Info';

//                     flattenedData.push({
//                         orderId: order._id,
//                         orderStatus: order.orderStatus,
//                         paymentMethod: order.paymentMethod,
//                         createdAt: order.createdAt,
//                         totalPayment: order.totalPayment,
//                         productName: shoppingBag.productID.productName,
//                         productImage: shoppingBag.productID.productImageURL,
//                         deliveryDate: shoppingBag.deliveryDate,
//                         returnDate: shoppingBag.returnDate,
//                         quantity: shoppingBag.quantity,
//                         totalPrice: shoppingBag.totalPrice,
//                         shippingInfo,
//                     });
//                 }
//             });
//         });
//         return flattenedData;
//     };

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString();
//     };

//     // const handleStatusChange = (orderId, newStatus) => {
//     //     console.log('Status change triggered:', orderId, newStatus); // Add this log
//     //     updateOrderStatusApi(orderId, newStatus)
//     //         .then((res) => {
//     //             console.log('Update Response:', res); // Log the response
//     //             if (res.success) {
//     //                 toast.success("Order status updated successfully");
//     //                 setOrders(prevOrders => {
//     //                     const updatedOrders = prevOrders.map(order => {
//     //                         if (order._id === orderId) {
//     //                             return { ...order, orderStatus: newStatus };
//     //                         }
//     //                         return order;
//     //                     });
//     //                     window.location.reload();
//     //                     setFlattenedOrders(flattenOrderData(updatedOrders));
//     //                     return updatedOrders;
//     //                 });

//     //             } else {
//     //                 toast.error("Failed to update order status in the backend");
//     //             }
//     //         })
//     //         .catch(err => {
//     //             toast.error("Failed to update order status");
//     //             console.log('Error:', err.message);
//     //         });
//     // };
//     const handleStatusChange = (orderId, newStatus) => {
//         console.log('Status change triggered:', orderId, newStatus); // Add this log
//         updateOrderStatusApi(orderId, newStatus)
//             .then((res) => {
//                 console.log('Update Response:', res); // Log the response
//                 if (res.success) {
//                     toast.success("Order status updated successfully");
//                     setOrders(prevOrders => {
//                         const updatedOrders = prevOrders.map(order => {
//                             if (order._id === orderId) {
//                                 return { ...order, orderStatus: newStatus };
//                             }
//                             return order;
//                         });
//                         window.location.reload();
//                         setFlattenedOrders(flattenOrderData(updatedOrders));
//                         return updatedOrders;
//                     });
//                 } else {
//                     toast.error("Failed to update order status in the backend");
//                     console.error("Failed to update order status. API Response:", res);
//                 }
//             })
//             .catch(err => {
//                 toast.error("Failed to update order status");
//                 console.error('Error:', err.message);
//             });
//     };

//     const getStatusClass = (status) => {
//         switch (status) {
//             case 'PENDING':
//                 return 'text-gray-500 font-bold';
//             case 'IN PROCESS':
//                 return 'text-yellow-500 font-bold';
//             case 'DELIVERED':
//                 return 'text-green-500 font-bold';
//             case 'CANCELED':
//                 return 'text-red-500 font-bold';
//             default:
//                 return '';
//         }
//     };

//     return (
//         <div className="flex h-screen overflow-hidden">
//             <SidebarAdmin />
//             <div className="flex-1 flex flex-col">
//                 <NavbarAdmin />
//                 <div className="max-w-6xl mx-auto p-2 font-poppins">
//                     <h1 className="text-4xl font-bold mb-2">Orders</h1>

//                     <div className="overflow-x-auto">
//                         <div className="min-w-full max-h-96 overflow-y-auto">
//                             <table className="min-w-full divide-y divide-gray-200">
//                                 <thead>
//                                     <tr>
//                                         <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Image</th>
//                                         <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
//                                         <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '200px' }}>Order Status</th>
//                                         <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
//                                         <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
//                                         <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Date</th>
//                                         <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Date</th>
//                                         <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
//                                         <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
//                                         <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipping Info</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="bg-white divide-y divide-gray-200">
//                                     {flattenedOrders && flattenedOrders.length > 0 ? (
//                                         flattenedOrders.map((order, index) => (
//                                             <tr key={index}>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                                     <img src={order.productImage} alt={order.productName} className="h-10 w-10" />
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.productName}</td>
//                                                 <td className={`px-6 py-4 whitespace-nowrap text-sm ${getStatusClass(order.orderStatus)}`}>
//                                                     <select
//                                                         value={order.orderStatus}
//                                                         onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
//                                                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                                                         style={{ color: getStatusClass(order.orderStatus).split(' ')[0].replace('text-', '') }}
//                                                     >
//                                                         <option value="PENDING" style={{ color: 'gray' }}>Pending</option>
//                                                         <option value="IN PROCESS" style={{ color: 'yellow' }}>In Process</option>
//                                                         <option value="DELIVERED" style={{ color: 'green' }}>Delivered</option>
//                                                         <option value="CANCELED" style={{ color: 'red' }}>Canceled</option>
//                                                     </select>
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.quantity}</td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(order.createdAt)}</td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(order.deliveryDate)}</td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(order.returnDate)}</td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.totalPrice}</td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.paymentMethod}</td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                                     <pre className="whitespace-pre-wrap">{order.shippingInfo}</pre>
//                                                 </td>
//                                             </tr>
//                                         ))
//                                     ) : (
//                                         <tr>
//                                             <td colSpan="10" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No orders available</td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Orders;

