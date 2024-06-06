import React from 'react'
import Navbar from '../../components/Navbar'
import frame1 from '../../assets/images/Frame387.png'
import frame2 from '../../assets/images/Frame388.png'

import hakuPatasi from '../../assets/images/Hakupatasi.png';
import LehengaCholi from '../../assets/images/Lehengacholi.png';
import gunyocholo from '../../assets/images/gunyocholo.png';
import gurungdress from '../../assets/images/gurungdress.png';
import daurasurwal from '../../assets/images/daurasurwal.png';

import formalWears from '../../assets/images/formalWears.png';
import summerWears from '../../assets/images/summerWears.png';
import winterWears from '../../assets/images/winterWears.png';
import cosplayOutfits from '../../assets/images/cosplayOutfits.png';
import partyWears from '../../assets/images/partyWears.png';
import { ChevronDownIcon } from '@heroicons/react/outline';

import ethnicJewelry from '../../assets/images/ethnicJewelry.png';
import indianJewelry from '../../assets/images/indianJewelry.png';
import bagsAndClutches from '../../assets/images/bagsAndClutches.png';
import headWears from '../../assets/images/headWears.png';
import modernAccessories from '../../assets/images/modernAccessories.png';

import wideSelection from '../../assets/images/wideSelection.png';
import sustainability from '../../assets/images/sustainability.png';
import affordability from '../../assets/images/affordability.png';
import convenience from '../../assets/images/convenience.png';




import { Link } from 'react-router-dom';




const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4 flex justify-between items-center">
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


      {/* Ethnic Wear */}
      <div>
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



      {/* Western Wear */}
      <div>
        <p className="text-center text-base font-semibold text-black-500 font-size">
          Wester Wear
        </p>
        <p className="text-center text-3xl font-semibold text-black-500 font-size">
          We Offer Variety of Western Dresses
        </p>
        {/* list view of the western wears */}
        <div className="overflow-x-auto whitespace-nowrap px-4 flex">
          <Link to="/formalWears" className="flex-none w-80 h-96 text-white flex items-center justify-center mr-4 rounded-lg" style={{ backgroundImage: `url(${formalWears})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

          </Link>
          <Link to="/summerWears" className="flex-none w-80 h-96 text-white flex items-center justify-center mr-4 rounded-lg" style={{ backgroundImage: `url(${summerWears})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

          </Link>
          <Link to="/winterWears" className="flex-none w-80 h-96 text-white flex items-center justify-center mr-4 rounded-lg" style={{ backgroundImage: `url(${winterWears})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

          </Link>
          <Link to="/cosplayOutfits" className="flex-none w-80 h-96 text-white flex items-center justify-center mr-4 rounded-lg" style={{ backgroundImage: `url(${cosplayOutfits})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

          </Link>
          <Link to="/partyWears" className="flex-none w-80 h-96 text-white flex items-center justify-center mr-4 rounded-lg" style={{ backgroundImage: `url(${partyWears})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

          </Link>
        </div>
      </div>



      {/* Accessories*/}
      <div>
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


      {/* About Us*/}
      <div>
        <p className="text-center text-base font-semibold text-black-500 font-size">
          About Us
        </p>
        <p className="text-center text-3xl font-bold text-black-500 font-size">
          Why choose Dresslend?        </p>

        <p className="text-center text-3xl font-semibold text-gray-700">
          Our Mission
        </p>

        <p className="text-center text-2xl font-normal text-gray-700">
          To provide an affordable and sustainable way for people in Nepal to dress fabulously for every occasion.  <br />
          We aim to make high-quality, fashionable clothing available to everyone through <br />
          our easy-to-use rental service.
        </p>

        {/* list view of the  Accessories */}
        <div className="overflow-x-auto whitespace-nowrap px-4 flex">
          {/* wide selection */}
          <div className="max-w-xs rounded overflow-hidden shadow-lg">
            <img className="w-full" src={wideSelection} alt="wideSelection" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Title</div>
              <p className="text-gray-700 text-base">
                Description Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem
                praesentium nihil.
              </p>
            </div>
          </div>


        </div>
      </div>

    </div>
  )
}

export default Home
