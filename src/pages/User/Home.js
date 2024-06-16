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

import question from '../../assets/images/question.png';

import { Link } from 'react-router-dom';
import FAQ from '../../components/FAQ';
import NavbarUser from '../../components/NavbarUser';
import NavbarAdmin from '../../components/NavbarAdmin';




const Home = () => {
  return (
    <div>
      {/* <Navbar /> */}
      {/* <NavbarUser /> */}
      <NavbarAdmin />
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



      {/* Western Wear */}
      <div className=' h-screen bg-gradient-to-r from-indigo-500 to-blue-600'>
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


      {/* About Us*/}
      <div className=' h-screen bg-gradient-to-r from-indigo-500 to-blue-600'>
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


      {/* Help */}
      <div className=' h-screen bg-gradient-to-r '>
        <p className="text-center text-base font-semibold text-black-500 ">
          Help
        </p>
        <p className="text-center text-3xl font-extrabold text-gray-700">
          Do you have questions?
        </p>
        {/* <div className='flex justify-center min-h-screen'> */}
        <div className='flex justify-center'>
          <img className='h-32 w-32 object-cover al' src={question} alt='' ></img>
        </div>

        {/* questions section */}
        <div className="w-full ">
          <div className="p-4 w-50 ">
            <FAQ />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
