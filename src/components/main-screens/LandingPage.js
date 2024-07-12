import React from 'react'
// import Navbar from './Navbar'
import frame1 from '../../assets/images/Frame387.png'
import frame2 from '../../assets/images//Frame388.png'

const LandingPage = () => {
    return (
        <div className=' h-screen'>
            <div className="p-2 pt-20 flex justify-between items-center space-y-0 font-poppins">
                {/* image 1 */}
                <div className="relative mt-2.5 ml-3 w-max">
                    <img
                        src={frame1}
                        alt="Ethnic wear image"
                        className="w-64 h-max object-cover mx-auto rounded-lg"
                    />
                </div>
                {/* text */}
                <div className="relative mt-2.5 ml-3 w-max flex flex-col items-center">
                    <p className="text-center text-lg font-bold text-red-500 uppercase">
                        Embrace Diversity, Explore Fashion at DressLend.
                    </p>
                    <p className="text-center font-semibold text-5xl text-boldText">
                        "Rent Nepali Ethnic <br />
                        and <br />
                        Western Wear, <br />
                        All in One Place, <br />
                        at Affordable <br />
                        Prices."
                    </p>
                    <button className="mt-4 bg-orangeTheme text-white rounded-md px-6 py-3 border border-transparent shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orangeTheme focus:ring-opacity-50 transition-all duration-300">
                        Explore
                    </button>
                </div>
                {/* image 2 */}
                <div className="relative mt-3 mr-2 w-max">
                    <img
                        src={frame2}
                        alt="Western Dress image"
                        className="w-64 h-max object-cover mx-auto rounded-lg"
                    />
                </div>
            </div>

        </div>
    )
}

export default LandingPage
