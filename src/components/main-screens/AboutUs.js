import React from 'react'
import wideSelection from '../../assets/images/wideSelection.png';
import sustainability from '../../assets/images/sustainability.png';
import affordability from '../../assets/images/affordability.png';
import convenience from '../../assets/images/convenience.png';
const AboutUs = () => {
    return (
        <div>
            {/* About Us*/}
            {/* <div className=' h-screen bg-gradient-to-r from-indigo-500 to-blue-600'> */}
            <div className=' h-screen bg-gradient-to-r'>

                <p className="text-center text-base font-semibold text-black-500 font-size">
                    About Us
                </p>
                <p className="text-center text-3xl font-bold text-black-500 font-size">
                    Why choose Dresslend?        </p>

                <p className="text-center text-3xl font-extrabold text-gray-700">
                    Our Mission
                </p>

                <p className="text-center text-2xl font-normal text-gray-700">
                    To provide an affordable and sustainable way for people in Nepal to dress fabulously for every occasion.  <br />
                    We aim to make high-quality, fashionable clothing available to everyone through <br />
                    our easy-to-use rental service.
                </p>

                <div className="overflow-x-auto whitespace-nowrap px-4 flex space-x-4">
                    {/* wide selection */}
                    <div className="w-80 h-80 rounded-lg border border-gray-300 shadow-lg overflow-hidden flex-shrink-0">
                        <div className="flex flex-col items-center p-4 h-full">
                            <img className="h-24 w-24 object-cover mb-4" src={wideSelection} alt="Wide selection" />
                            <div className="font-medium text-xl mb-2 text-center text-gray-700">Wide Selection</div>
                            <p className="text-gray-700 text-base text-center p-1">
                                From traditional ethnic wear to <br />
                                trendy modern styles, and unique <br />
                                Indo-Western blends, we offer a <br />
                                diverse range of clothing and <br />
                                accessories.
                            </p>
                        </div>
                    </div>

                    {/* sustainability */}
                    <div className="w-80 h-80 rounded-lg border border-gray-300 shadow-lg overflow-hidden flex-shrink-0">
                        <div className="flex flex-col items-center p-4 h-full">
                            <img className="h-24 w-24 object-cover mb-4" src={sustainability} alt="Sustainability" />
                            <div className="font-medium text-xl mb-2 text-center text-gray-700">Sustainability</div>
                            <p className="text-gray-700 text-base text-center p-1">
                                By choosing to rent instead of buy, <br />
                                you're helping to reduce fashion waste <br />
                                and promote a more sustainable <br />
                                lifestyle.
                            </p>
                        </div>
                    </div>

                    {/* affordability */}
                    <div className="w-80 h-80 rounded-lg border border-gray-300 shadow-lg overflow-hidden flex-shrink-0">
                        <div className="flex flex-col items-center p-4 h-full">
                            <img className="h-24 w-24 object-cover mb-4" src={affordability} alt="Affordability" />
                            <div className="font-medium text-xl mb-2 text-center text-gray-700">Affordability</div>
                            <p className="text-gray-700 text-base text-center p-1">
                                Enjoy high-end fashion at a <br />
                                fraction of the cost. DressLend <br />
                                allows you to look your best <br />
                                without breaking the bank.<br />
                            </p>
                        </div>
                    </div>

                    {/* convenience */}
                    <div className="w-80 h-80 rounded-lg border border-gray-300 shadow-lg overflow-hidden flex-shrink-0">
                        <div className="flex flex-col items-center p-4 h-full">
                            <img className="h-24 w-24 object-cover mb-4" src={convenience} alt="Convenience" />
                            <div className="font-medium text-xl mb-2 text-center text-gray-700">Convenience</div>
                            <p className="text-gray-700 text-base text-center p-1">
                                Enjoy high-end fashion at a <br />
                                fraction of the cost. DressLend <br />
                                allows you to look your best <br />
                                without breaking the bank.<br />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
