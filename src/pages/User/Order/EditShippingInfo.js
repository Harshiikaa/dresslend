import React from 'react'
import ShippingInfo from './ShippingInfo'
import ShoppingBag from '../ShoppingBag'
import { updateShippingInfoApi } from '../../../apis/Api'
import { toast } from 'react-toastify'

const EditShippingInfo = () => {
  // handle edit button
  // const handleEdit = (e) => {
  //   e.preventDefault()
  //   console.log(firstName, lastName, contactNumber, city, address, nearLandmark)
  //   const formData = new FormData();
  //   formData.append('firstName', firstName)
  //   formData.append('lastName', lastName)
  //   formData.append('contactNumber', contactNumber)
  //   formData.append('city', city)
  //   formData.append('address', address)
  //   formData.append('nearLandmark', nearLandmark)
  //   // making api call 
  //   updateShippingInfoApi(id, formData).then((res) => {
  //     if (res.data.success == true) {
  //       toast.success(res.data.message)
  //       navigate('/review')
  //     } else {
  //       toast.error(res.data.message)
  //     }

  //   }).catch(err => {
  //     toast.error("Server Error")
  //   })
  // }


  return (
    <div>

    </div>
  )
}

export default EditShippingInfo
