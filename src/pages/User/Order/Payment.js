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
                            <div className="w-12 h-12 flex items-center justify-center rounded-full  bg-gray-300 text-gray-500">1</div>
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
                            <div className="w-12 h-12 flex items-center justify-center rounded-full  bg-green-500 text-white">3</div>
                            <span className="ml-2">PAYMENT</span>
                        </div>
                    </div>

                </div>
                <div class="w-full max-w-xs mx-auto">
                    <div class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                        <h2 class="text-xl font-semibold text-blue-500 mb-4">Payment Method</h2>
                        <form>
                            <div class="mb-4">
                                <label class="inline-flex items-center">
                                    <input type="radio" class="form-radio text-blue-500" name="payment" value="cod" />
                                    <span class="ml-2">Cash on Delivery</span>
                                </label>
                            </div>
                            <div class="mb-4">
                                <label class="inline-flex items-center">
                                    <input type="radio" class="form-radio text-blue-500" name="payment" value="khalti" />
                                    <span class="ml-2">Khalti</span>
                                </label>
                            </div>
                            <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded">Place Order</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Payment
