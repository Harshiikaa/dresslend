import { CheckCircleIcon, CheckIcon, UserIcon } from '@heroicons/react/outline'
import React from 'react'
import thankyou from '../../../assets/images/thankyou.png'
import { Link, useNavigate } from 'react-router-dom'

const Success = () => {
  const navigate = useNavigate();
  const handleGoToOrders = () => {
    navigate('/orders'); // Navigate to '/orders' route
  };
  return (
    <div>
      <div className="max-w-2xl mx-auto p-4 mt-8">
        <div className='flex-col items-center justify-center'>
          {/* process board */}
          <div className="text-center mb-6 bg-gray-200 p-4">
            <h2 className="text-2xl font-semibold">PLACE YOUR RENT</h2>
            <div className="flex justify-center mt-4 text-xs items-center">
              {/* address */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white">
                  <CheckIcon className="h-6 w-6" />
                </div>
                <span className="ml-2 pt-1.5">ADDRESS</span>
              </div>

              <div className="w-24 h-1 bg-gray-300 mx-4"></div>

              {/* Review */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white">
                  <CheckIcon className="h-6 w-6" />
                </div>              <span className="ml-2">REVIEW</span>
              </div>

              <div className="w-24 h-1 bg-gray-300 mx-4"></div>

              {/* Payment */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white">
                  <CheckIcon className="h-6 w-6" />
                </div>              <span className="ml-2">PAYMENT</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <img
              src={thankyou}
              alt="Ethnic wear image"
              className="w-64 h-max object-cover mx-auto rounded-lg"
            />        </div>

        </div>
        <div className='flex felx-col justify-center'>
          {/* <button type="submit" className="w-1/5 bg-blue-500 text-white py-2 rounded mt-4">
            Go to Orders
          </button> */}
          <Link to="/myOrders" className="w-1/5 bg-blue-500 text-white py-2 rounded mt-4 block text-center">
            Go to Orders
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Success
