import { ArrowLeftIcon, ArrowNarrowLeftIcon, HeartIcon as OutlineHeartIcon, PlusIcon, StarIcon, } from '@heroicons/react/outline';
import { PencilAltIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react'
import { getShoppingBagByUserIDApi, getSingleShippingInfoApi, removeFromShoppingBagApi, updateShippingInfoApi } from '../../../apis/Api'
import { toast } from 'react-toastify'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { FaStar } from 'react-icons/fa';

const Review = () => {
  const { id } = useParams();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const [products, setProducts] = useState([]);
  const [shoppingBag, setShoppingBag] = useState([]);
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState(location.state?.shippingInfo || {});

  console.log(shippingInfo);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const validAverageRating = Number.isFinite(averageRating) && averageRating >= 0 && averageRating <= 5 ? averageRating : 0;


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

  const calculateSubtotal = () => {
    return shoppingBag.reduce((acc, item) => acc + item.totalPrice, 0);
  };

  const handleCheckout = ({ shoppingBag }) => {
    const dataToSave = shoppingBag;
    console.log(dataToSave)
    navigate(
      '/shippingInfo',
      { state: { shoppingBag: dataToSave } });
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [nearLandmark, setNeearLandmark] = useState('');

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
  const handleNextReview = () => {
    // const dataToSave = shoppingBag;
    // console.log(dataToSave)
    navigate(
      '/payment',
      // { state: { shoppingBag: dataToSave } }
    );
  };

  const handleBackClick = () => {
    navigate(-1); // This navigates to the previous page
  };


  return (
    <div className='mt-8'>
      <div className='w-full flex justify-between bg-white top-0 left-0 right-0 p-4 inherit z-50'>
      </div>
      <div className="max-w-2xl mx-auto">
        {/* process board */}
        <div className="text-center mb-6 bg-gray-200 p-4">
          <h2 className="text-2xl font-semibold">PLACE YOUR RENT</h2>
          <div className="flex justify-center mt-4 text-xs items-center">
            {/* address */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 flex items-center justify-center rounded-full  bg-gray-300  text-gray-500">1</div>
              <span className="ml-2 pt-1.5">ADDRESS</span>
            </div>

            <div className="w-24 h-1 bg-gray-300 mx-4"></div>

            {/* Review */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 flex items-center justify-center rounded-full  bg-green-500  text-white">2</div>
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

        <div class="container mx-auto p-4 bg-white shadow rounded">
          <div class="flex justify-between items-start">
            {/* <!-- Account Details --> */}
            <div>
              <h2 class="text-lg font-bold mb-2">ACCOUNT DETAILS</h2>
              {user ? (
                <>
                  <p>{user.firstName}</p>
                  <p>{user.email}</p>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>

            {/* <!-- Shipping Details --> */}
            <div className='font-poppins'>
              <div class="flex items-center mb-2 ">
                <h2 class="text-lg font-bold">SHIPPING DETAILS</h2>
                {/* <Link to={`/shippingInfoEdit/${shippingInfo._id}`} className="ml-2 text-blue-500">
                  <PencilAltIcon className="h-5 w-5" />
                </Link> */}


              </div>
              <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
              <p>{shippingInfo.contactNumber}</p>
              <p>{shippingInfo.city}</p>
              <p>{shippingInfo.address}</p>
              <p>{shippingInfo.nearLandmark}</p>
            </div>
          </div>
          <hr class="my-4 border-gray-300" />
        </div>


        {/*  shopping bag */}
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

                  <div className="flex space-x-1 items-center">
                    {[...Array(5)].map((_, index) => {
                      const ratingValue = index + 1;
                      return (
                        <label key={index} className="cursor-pointer">
                          <FaStar
                            size={24}
                            className={ratingValue <= (hover || validAverageRating) ? 'text-yellow-500' : 'text-gray-300'}
                          />
                        </label>
                      );
                    })}
                    <span className="ml-2 text-gray-600" style={{ fontSize: '14px' }}>({ratingCount} reviews)</span>
                  </div>
                  {/* <a href={`/productDetails/${item._id}`} className="text-blue-500 mt-2 inline-block font-medium text-xs">View details</a> */}
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
        {/* total calculation */}
        <div class="max-w-xs mx-auto justify-content: flex-end bg-white p-6 rounded-lg shadow-md font-poppins">
          <h2 class="text-center text-xl font-semibold mb-4">TOTALS</h2>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>SUBTOTAL</span>
              <span>Rs. {calculateSubtotal()}</span>
            </div>
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
          {/* <button onClick={handleCheckout}
            class="w-full bg-blue-500 text-white py-2 rounded mt-4">CHECKOUT</button> */}
        </div>
        <button onClick={handleNextReview}
          class="w-full bg-blue-500 text-white py-2 rounded mt-4">NEXT</button>
      </div>
    </div>
  )

}

export default Review
