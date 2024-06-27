import React from 'react'
// import Navbar from './Navbar'
import frame1 from '../../assets/images/Frame387.png'
import frame2 from '../../assets/images//Frame388.png'

const LandingPage = () => {
    return (

        <div className="p-2 flex justify-between items-center h-screen space-y-0">
            {/* image 1 */}
            <div className="relative mt-2.5 ml-3 w-max">
                <img
                    src={frame1}
                    alt="Ethnic wear image"
                    className="w-64 h-max object-cover mx-auto rounded-lg"
                />
            </div>
            {/* text */}
            <div className="relative mt-2.5 ml-3 w-max">
                <p className="text-center text-lg font-bold text-red-500 uppercase">
                    Embrace Diversity, Explore Fashion at DressLend.
                </p>
                <p className="text-center text-lg font-bold text-6xl">
                    "Rent Nepali Ethnic <br />
                    and <br />
                    Western Wear, <br />
                    All in One Place, <br />
                    at Affordable <br />
                    Prices."</p>
                <button className="bg-F1A501 text-white rounded-md border border-transparent">
                    Explore
                </button>
            </div>

            {/* image 2 */}
            <div className="relative mt-2.5 mr-3 w-max">
                <img
                    src={frame2}
                    alt="Western Dress image"
                    className="w-64 h-max object-cover mx-auto rounded-lg"
                />
            </div>
        </div>

    )
}

export default LandingPage
