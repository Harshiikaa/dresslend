import { ArrowLeftIcon, MinusIcon, MinusSmIcon, HeartIcon as OutlineHeartIcon, PlusIcon, StarIcon, } from '@heroicons/react/outline';
import { PencilAltIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addToShoppingBagListApi, getShoppingBagByUserIDApi, removeFromShoppingBagApi } from '../../apis/Api';
import SearchResult from '../../components/SearchResult';
import { toast } from 'react-toastify';


const ShoppingBag = () => {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const [products, setProducts] = useState([]);
    const [shoppingBag, setShoppingBag] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
   
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

    const handleDelete = (id) => {
        const confirmDialog = window.confirm('Are you sure, you want to remove this item from shopping Cart?')
        if (!confirmDialog) {
            return;
        }
        else {
            removeFromShoppingBagApi(id).then((res) => {
                if (res.data.success == true) {
                    window.location.reload()
                    toast.success(res.data.success)
                }
                else {
                    toast.error(res.data.message)
                }

            })
        }
    }

    const calculateSubtotal = () => {
        return shoppingBag.reduce((acc, item) => acc + item.totalPrice, 0);
    };

    // const handleCheckout = () => {
    //     navigate('/shippingInfo', { state: { shoppingBag } });
    // }


    const handleCheckout = ({ shoppingBag }) => {
        const dataToSave = shoppingBag;
        console.log(dataToSave)
        navigate(
            '/shippingInfo',
            { state: { shoppingBag: dataToSave } });
    };

    return (
        <div >
            <div className="max-w-6xl mx-auto p-2 mt-24 font-poppins">
                <div className="space-y-2">
                    {shoppingBag.map((item) => (
                        // shopping cart section
                        <div key={item._id} className="bg-white p-4 flex border-2 border-color: inherit rounded-lg h-auto">
                            <img src={item.productID.productImageURL} alt={item.productID.productName} className="w-1/6 h-55 object-cover" />
                            {/* div 1*/}
                            <div className="flex-1 flex justify-between gap-4">
                                {/* div 2 */}
                                <div className='flex flex-col items-start gap-4 pl-4'>
                                    <h2 className="text-xl font-semibold">{item.productID.productName}</h2>
                                    {/* div 3 */}
                                    <div className='flex flex-row items-start gap-4'>
                                        {/* div 4 */}
                                        <div className="flex-1 w-2/5 p-4 space-y-2">
                                            <p className="text-customGray font-medium text-sm">
                                                Rental Price <span className="font-bold text-gray-800">NPR. {item.productID.productRentalPrice}</span> for 4 days
                                            </p>
                                            <p className="text-gray-600 font-light text-xs">Security Deposit Rs. {item.productID.productSecurityDeposit}</p>
                                        </div>

                                        {/* div 5 */}
                                        <div>
                                            <p className="text-sm">
                                                Rental Date:<br />{new Date(item.deliveryDate).toLocaleDateString()}</p>

                                        </div>
                                        {/* div 6 */}
                                        <div>
                                            <p className="text-sm">Return Date: <br /> {new Date(item.returnDate).toLocaleDateString()}</p>
                                        </div>
                                        {/* div 7 */}
                                        <div>
                                            <p className="text-sm">Rented Quantity: <br /> {item.quantity} </p>
                                        </div>
                                        {/* div 8 */}
                                        <div>
                                            <p className="text-sm font-semibold">Total Price:<br /> NPR. {item.totalPrice}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        {[...Array(4)].map((_, i) => (
                                            <StarIcon key={i} className="w-4 h-4 text-yellow-500" />
                                        ))}
                                    </div>
                                    <a href={`/productDetails/${item._id}`} className="text-blue-500 mt-2 inline-block font-medium text-xs">View details</a>
                                </div>

                                {/* div 9  */}
                                <div className="flex flex-col items-center justify-center space-y-2 gap-4">
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="flex items-center justify-center w-full p-2 rounded"
                                        style={{ backgroundColor: "#F7FAFC", border: "1.5px solid #DEE2E7" }}>
                                        <TrashIcon className="w-4 h-4 text-red-500" />
                                    </button>
                                    <button
                                        // onClick={() => handleEditItem(item._id)}
                                        className="flex items-center justify-center w-full p-2 rounded"
                                        style={{ backgroundColor: "#F7FAFC", border: "1.5px solid #DEE2E7" }}>
                                        <Link to={`/shoppingBagEdit/${item._id}`} className="text-green-600 hover:text-indigo-900">
                                            <PencilAltIcon className="w-4 h-4  text-green-500" />
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* total calculation */}
            <div class="max-w-xs mx-auto justify-content: flex-end bg-white p-6 rounded-lg shadow-md font-poppins">
                <h2 class="text-center text-xl font-semibold mb-4">TOTALS</h2>
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span>SUBTOTAL</span>
                        <span>Rs. {calculateSubtotal()}</span>
                    </div>
                    {/* <div class="flex justify-between">
                        <span>SECURITY</span>
                        <span>Rs. 0</span>
                    </div> */}
                    <div class="flex justify-between">
                        <span>SHIPPING</span>
                        <span>Rs. 0</span>
                    </div>
                    <div class="flex justify-between">
                        <span>DISCOUNT</span>
                        <span>Rs. 0</span>
                    </div>
                </div>
                <div class="flex justify-between font-bold mt-4">
                    <span>TOTAL</span>
                    <span>Rs. {calculateSubtotal()}</span>
                </div>
                <button onClick={handleCheckout}
                    class="w-full bg-blue-500 text-white py-2 rounded mt-4">CHECKOUT</button>
            </div>


        </div>
    )
}

export default ShoppingBag
