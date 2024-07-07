import { PencilAltIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import ShippingInfo from './ShippingInfo'
import ShoppingBag from '../ShoppingBag'
import { getSingleShippingInfoApi, updateShippingInfoApi } from '../../../apis/Api'
import { toast } from 'react-toastify'

const Review = () => {

  useEffect(() => {
    // Get user data from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  const [user, setUser] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [nearLandmark, setNeearLandmark] = useState('');
  // useEffect(() => {
  //   // api call 
  //   getSingleShippingInfoApi(id).then((res) => {
  //     console.log(res.data)
  //     setFirstName(res.data.ShippingInfo.firstName)
  //     setLastName(res.data.product.productPrice)
  //     setContactNumber(res.data.product.productCategory)
  //     setCity(res.data.product.productDescription)
  //     setAddress(res.data.product.productImage)
  //     setNeearLandmark(res.data.product.productImageURL)
  //   })

  // }, [id])



  return (
    <div>
      <div className="max-w-2xl mx-auto p-4 mt-8">
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
            <div>
              <div class="flex items-center mb-2">
                <h2 class="text-lg font-bold">SHIPPING DETAILS</h2>
                <a href="#" className="ml-2 text-blue-500">
                  <PencilAltIcon className="h-5 w-5" />
                </a>
              </div>
              <p>Full Name</p>
              <p>Contact Number</p>
              <p>Email</p>
              <p>City, Address</p>
            </div>
          </div>
          <hr class="my-4 border-gray-300" />
        </div>

       
      </div>
    </div>
  )

}

export default Review
