import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateShippingInfoApi, getSingleShippingInfoApi } from '../../../apis/Api';
import { toast } from 'react-toastify';

const EditShippingInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    city: '',
    address: '',
    nearLandmark: ''
  });

  useEffect(() => {
    // Fetch shipping info based on id
    getSingleShippingInfoApi(id)
      .then((res) => {
        setShippingInfo(res.data);
      })
      .catch((error) => {
        console.error('Error fetching shipping info:', error);
        toast.error('Error fetching shipping info');
      });
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  // Handle form submission
  const handleEdit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('firstName', shippingInfo.firstName);
    formData.append('lastName', shippingInfo.lastName);
    formData.append('contactNumber', shippingInfo.contactNumber);
    formData.append('city', shippingInfo.city);
    formData.append('address', shippingInfo.address);
    formData.append('nearLandmark', shippingInfo.nearLandmark);

    updateShippingInfoApi(id, formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate('/review');
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error('Error updating shipping info:', error);
        toast.error('Server Error');
      });
  };

  return (
    <div className='mt-8'>
      {/* Your form UI and JSX here */}
    </div>
  );
};

export default EditShippingInfo;


// import React from 'react'
// import ShippingInfo from './ShippingInfo'
// import ShoppingBag from '../ShoppingBag'
// import { updateShippingInfoApi } from '../../../apis/Api'
// import { toast } from 'react-toastify'

// const EditShippingInfo = () => {
//   // handle edit button
//   const handleEdit = (e) => {
//     e.preventDefault()
//     console.log(firstName, lastName, contactNumber, city, address, nearLandmark)
//     const formData = new FormData();
//     formData.append('firstName', firstName)
//     formData.append('lastName', lastName)
//     formData.append('contactNumber', contactNumber)
//     formData.append('city', city)
//     formData.append('address', address)
//     formData.append('nearLandmark', nearLandmark)
//     // making api call
//     updateShippingInfoApi(id, formData).then((res) => {
//       if (res.data.success == true) {
//         toast.success(res.data.message)
//         navigate('/review')
//       } else {
//         toast.error(res.data.message)
//       }

//     }).catch(err => {
//       toast.error("Server Error")
//     })
//   }


//   return (
//     <div>
//       <div className='mt-8'>
//         <div className='w-full flex justify-between bg-white top-0 left-0 right-0 p-4 inherit z-50'>
//           <div className='flex gap-2'>
//             <button
//               onClick={handleBackClick}
//               className="inline-flex items-center gap-2 rounded-md bg-gray-50 px-2 py-2 text-sm ring-inset ring-gray-300 hover:bg-gray-100"
//             >
//               <ArrowLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//             </button>
//           </div>
//         </div>
//         <div className="max-w-2xl mx-auto">
//           {/* process board */}
//           <div className="text-center mb-6 bg-gray-200 p-4">
//             <h2 className="text-2xl font-semibold">PLACE YOUR RENT</h2>
//             <div className="flex justify-center mt-4 text-xs items-center">
//               {/* address */}
//               <div className="flex flex-col items-center space-y-2">
//                 <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white">1</div>
//                 <span className="ml-2 pt-1.5">ADDRESS</span>
//               </div>

//               <div className="w-24 h-1 bg-gray-300 mx-4"></div>

//               {/* Review */}
//               <div className="flex flex-col items-center space-y-2">
//                 <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 text-gray-500">2</div>
//                 <span className="ml-2">REVIEW</span>
//               </div>

//               <div className="w-24 h-1 bg-gray-300 mx-4"></div>

//               {/* Payment */}
//               <div className="flex flex-col items-center space-y-2">
//                 <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 text-gray-500">3</div>
//                 <span className="ml-2">PAYMENT</span>
//               </div>
//             </div>

//           </div>
//           <form
//             className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="First Name"
//                 onChange={changeFirstName}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Last Name"
//                 onChange={changeLastName}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="contactNumber"
//                 placeholder="Contact Number"
//                 onChange={changeContactNumber}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//               <select
//                 name="city"
//                 onChange={changeCity}
//                 className="w-full p-2 border border-gray-300 rounded"
//               >
//                 <option value="">Select City</option>
//                 <option value="Kathmandu">Kathmandu</option>
//                 <option value="Lalitpur">Lalitpur</option>
//                 <option value="Bhaktapur">Bhaktapur</option>
//               </select>

//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Address"
//                 onChange={changeAddress}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Near Landmark"
//                 onChange={changeNearLandmark}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//             </div>

//             <div className='flex felx-col justify-center'>
//               <button type="submit" onClick={handleEdit} className="w-1/5 bg-blue-500 text-white py-2 rounded mt-4">
//                 UPDATE
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default EditShippingInfo
