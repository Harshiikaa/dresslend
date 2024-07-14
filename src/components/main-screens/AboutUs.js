import React, { useState, useEffect, useRef } from 'react';
import wideSelection from '../../assets/images/wideSelection.png';
import sustainability from '../../assets/images/sustainability.png';
import affordability from '../../assets/images/affordability.png';
import convenience from '../../assets/images/convenience.png';

const AboutUs = () => {


    return (
        <div>
            {/* About Us */}
            <div className='h-screen bg-gradient-to-r' id='aboutUs'>
                <p className="text-center text-base font-semibold text-black-500">
                    About Us
                </p>
                <p className="text-center text-2xl font-semibold text-black-500">
                    Why choose Dresslend?
                </p>

                <p className="text-center text-2xl font-extrabold text-gray-700">
                    Our Mission
                </p>

                <p className="text-center text-1xl font-normal text-gray-700">
                    To provide an affordable and sustainable way for people in Nepal to dress fabulously for every occasion.  <br />
                    We aim to make high-quality, fashionable clothing available to everyone through <br />
                    our easy-to-use rental service.
                </p>

                <div className="overflow-x-auto whitespace-nowrap px-4 flex justify-evenly pt-3" >
                    {/* wide selection */}
                    <div className="w-64 h-70 rounded-lg border border-gray-300 shadow-lg overflow-hidden flex-shrink-0 mr-4">
                        <div className="flex flex-col items-center p-4 h-full">
                            <img className="h-20 w-20 object-cover mb-4" src={wideSelection} alt="Wide selection" />
                            <div className="font-medium text-lg mb-2 text-center text-gray-700">Wide Selection</div>
                            <p className="text-gray-700 text-sm text-center p-1">
                                From traditional ethnic wear to <br />
                                trendy modern styles, and unique <br />
                                Indo-Western blends, we offer a <br />
                                diverse range of clothing and <br />
                                accessories.
                            </p>
                        </div>
                    </div>

                    {/* sustainability */}
                    <div className="w-64 h-70 rounded-lg border border-gray-300 shadow-lg overflow-hidden flex-shrink-0 mr-4">
                        <div className="flex flex-col items-center p-4 h-full">
                            <img className="h-20 w-20 object-cover mb-4" src={sustainability} alt="Sustainability" />
                            <div className="font-medium text-lg mb-2 text-center text-gray-700">Sustainability</div>
                            <p className="text-gray-700 text-sm text-center p-1">
                                By choosing to rent instead of buy, <br />
                                you're helping to reduce fashion waste <br />
                                and promote a more sustainable <br />
                                lifestyle.
                            </p>
                        </div>
                    </div>

                    {/* affordability */}
                    <div className="w-64 h-70 rounded-lg border border-gray-300 shadow-lg overflow-hidden flex-shrink-0 mr-4">
                        <div className="flex flex-col items-center p-4 h-full">
                            <img className="h-20 w-20 object-cover mb-4" src={affordability} alt="Affordability" />
                            <div className="font-medium text-lg mb-2 text-center text-gray-700">Affordability</div>
                            <p className="text-gray-700 text-sm text-center p-1">
                                Enjoy high-end fashion at a <br />
                                fraction of the cost. DressLend <br />
                                allows you to look your best <br />
                                without breaking the bank.
                            </p>
                        </div>
                    </div>

                    {/* convenience */}
                    <div className="w-64 h-70 rounded-lg border border-gray-300 shadow-lg overflow-hidden flex-shrink-0">
                        <div className="flex flex-col items-center p-4 h-full">
                            <img className="h-20 w-20 object-cover mb-4" src={convenience} alt="Convenience" />
                            <div className="font-medium text-lg mb-2 text-center text-gray-700">Convenience</div>
                            <p className="text-gray-700 text-sm text-center p-1">
                                Enjoy high-end fashion at a <br />
                                fraction of the cost. DressLend <br />
                                allows you to look your best <br />
                                without breaking the bank.
                            </p>
                        </div>
                    </div>
                </div>



                <div className="flex items-center justify-center mt-2">
                    <a href="#scroll-target" className="flex items-center justify-center w-8 h-8 bg-yellow-500 rounded-full animate-bounce">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
