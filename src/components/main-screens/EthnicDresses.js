import React from 'react';
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
            <div className='h-screen bg-gradient-to-r from-indigo-500 to-blue-600'>
                <p className="text-center text-base font-semibold text-black-500">
                    Ethnic Wear
                </p>
                <p className="text-center text-2xl font-semibold text-black-500">
                    We Offer Variety of Nepali Ethnic Dresses
                </p>
                {/* list view of the ethnic wears */}
                <div className="overflow-x-auto whitespace-nowrap px-4 flex">
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
                <div className="flex items-center justify-center mt-2">
                    <a href="#scroll-target" className="flex items-center justify-center w-8 h-8 bg-yellow-500 rounded-full animate-bounce">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </a>
                </div>
            </div>
            {/* <div id="scroll-target" className="h-screen bg-white">
                Content to scroll to
            </div> */}
        </div>
    );
}

export default EthnicDresses;

// import React from 'react'
// import hakuPatasi from '../../assets/images/Hakupatasi.png';
// import LehengaCholi from '../../assets/images/Lehengacholi.png';
// import gunyocholo from '../../assets/images/gunyocholo.png';
// import gurungdress from '../../assets/images/gurungdress.png';
// import daurasurwal from '../../assets/images/daurasurwal.png';
// import { Link } from 'react-router-dom';


// const EthnicDresses = () => {
//     return (
//         <div>
//             {/* Ethnic Wear */}
//             <div className=' h-screen bg-gradient-to-r from-indigo-500 to-blue-600'>
//                 <p className="text-center text-base font-semibold text-black-500 font-size">
//                     Ethnic Wear
//                 </p>
//                 <p className="text-center text-3xl font-semibold text-black-500 font-size">
//                     We Offer Variety of Nepali Ethnic Dresses
//                 </p>
//                 {/* list view of the ethnic wears */}
//                 <div className=" overflow-x-auto whitespace-nowrap px-4 flex">
//                     <Link to="/hakuPatasi" className="flex-none w-80 h-96 text-white flex items-center justify-center mr-4 rounded-lg" style={{ backgroundImage: `url(${hakuPatasi})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

//                     </Link>
//                     <Link to="/lehengaCholi" className="flex-none w-80 h-96 text-white flex items-center justify-center mr-4 rounded-lg" style={{ backgroundImage: `url(${LehengaCholi})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

//                     </Link>
//                     <Link to="/gunyoCholo" className="flex-none w-80 h-96 text-white flex items-center justify-center mr-4 rounded-lg" style={{ backgroundImage: `url(${gunyocholo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

//                     </Link>
//                     <Link to="/gurungDress" className="flex-none w-80 h-96 text-white flex items-center justify-center mr-4 rounded-lg" style={{ backgroundImage: `url(${gurungdress})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

//                     </Link>
//                     <Link to="/dauraSurwal" className="flex-none w-80 h-96 text-white flex items-center justify-center mr-4 rounded-lg" style={{ backgroundImage: `url(${daurasurwal})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

//                     </Link>
//                 </div>
              
//             </div>
//         </div>
//     )
// }

// export default EthnicDresses
