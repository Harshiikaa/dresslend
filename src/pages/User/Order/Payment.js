import React from 'react'

const Payment = () => {
  return (
    <div>
    <div className="max-w-2xl mx-auto p-4 mt-8">
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
            // onSubmit={handleSubmit}
            className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    // value={formData.firstName}
                    // onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    // value={formData.lastName}
                    // onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    name="contactNumber"
                    placeholder="Contact Number"
                    // value={formData.contactNumber}
                    // onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <select
                    name="city"
                    // value={formData.city}
                    // onChange={handleChange}
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
                    // value={formData.address}
                    // onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Near Landmark"
                    // value={formData.address}
                    // onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div className='flex felx-col justify-center'>
                <button type="submit" className="w-1/5 bg-blue-500 text-white py-2 rounded mt-4">
                    CHECKOUT
                </button>
            </div>
        </form>
    </div>
</div>
  )
}

export default Payment
