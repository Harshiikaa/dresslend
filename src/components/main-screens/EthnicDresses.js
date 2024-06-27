import React from 'react'
import hakuPatasi from '../../assets/images/Hakupatasi.png';
import LehengaCholi from '../../assets/images/Lehengacholi.png';
import gunyocholo from '../../assets/images/gunyocholo.png';
import gurungdress from '../../assets/images/gurungdress.png';
import daurasurwal from '../../assets/images/daurasurwal.png';
import { Link } from 'react-router-dom';


const EthnicDresses = () => {
    return (
        <div>
            {/* Ethnic Wear */}
            <div className=' h-screen bg-gradient-to-r from-indigo-500 to-blue-600'>
                <p className="text-center text-base font-semibold text-black-500 font-size">
                    Ethnic Wear
                </p>
                <p className="text-center text-3xl font-semibold text-black-500 font-size">
                    We Offer Variety of Nepali Ethnic Dresses
                </p>
                {/* list view of the ethnic wears */}
                <div className=" overflow-x-auto whitespace-nowrap px-4 flex">
                    <Link to="/hakuPatasi" className="flex-none w-80 h-96 text-white flex items-center justify-center mr-4 rounded-lg" style={{ backgroundImage: `url(${hakuPatasi})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                    </Link>
                    <Link to="/lehengaCholi" className="flex-none w-80 h-96 text-white flex items-center justify-center mr-4 rounded-lg" style={{ backgroundImage: `url(${LehengaCholi})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                    </Link>
                    <Link to="/gunyoCholo" className="flex-none w-80 h-96 text-white flex items-center justify-center mr-4 rounded-lg" style={{ backgroundImage: `url(${gunyocholo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                    </Link>
                    <Link to="/gurungDress" className="flex-none w-80 h-96 text-white flex items-center justify-center mr-4 rounded-lg" style={{ backgroundImage: `url(${gurungdress})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                    </Link>
                    <Link to="/dauraSurwal" className="flex-none w-80 h-96 text-white flex items-center justify-center mr-4 rounded-lg" style={{ backgroundImage: `url(${daurasurwal})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                    </Link>
                </div>
                {/* <button
     
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#F1A501] text-white rounded-full p-2"
        >
          <ChevronDownIcon />
        </button> */}
            </div>
        </div>
    )
}

export default EthnicDresses
