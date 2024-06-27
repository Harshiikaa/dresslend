import React from 'react'

import ethnicJewelry from '../../assets/images/ethnicJewelry.png';
import indianJewelry from '../../assets/images/indianJewelry.png';
import bagsAndClutches from '../../assets/images/bagsAndClutches.png';
import headWears from '../../assets/images/headWears.png';
import modernAccessories from '../../assets/images/modernAccessories.png';
import { Link } from 'react-router-dom';

const Accessories = () => {
    return (
        <div>
            {/* Accessories*/}
            <div className=' h-screen bg-gradient-to-r from-indigo-500 to-blue-600'>
                <p className="text-center text-base font-semibold text-black-500 font-size">
                    Accessories
                </p>
                <p className="text-center text-3xl font-semibold text-black-500 font-size">
                    We Offer Variety of Accessories
                </p>
                {/* list view of the  Accessories */}
                <div className="overflow-x-auto whitespace-nowrap px-4 flex">
                    <Link to="/ethnicJewelry" className="flex-none w-80 h-96 text-white flex items-center justify-center mr-4 rounded-lg" style={{ backgroundImage: `url(${ethnicJewelry})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                    </Link>
                    <Link to="/indianJewelry" className="flex-none w-80 h-96 text-white flex items-center justify-center mr-4 rounded-lg" style={{ backgroundImage: `url(${indianJewelry})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                    </Link>
                    <Link to="/bagsAndClutches" className="flex-none w-80 h-96 text-white flex items-center justify-center mr-4 rounded-lg" style={{ backgroundImage: `url(${bagsAndClutches})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                    </Link>
                    <Link to="/headWears" className="flex-none w-80 h-96 text-white flex items-center justify-center mr-4 rounded-lg" style={{ backgroundImage: `url(${headWears})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                    </Link>
                    <Link to="/modernAccessories" className="flex-none w-80 h-96 text-white flex items-center justify-center mr-4 rounded-lg" style={{ backgroundImage: `url(${modernAccessories})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Accessories
