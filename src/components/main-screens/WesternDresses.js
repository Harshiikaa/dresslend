import React from 'react'
import formalWears from '../../assets/images/formalWears.png';
import summerWears from '../../assets/images/summerWears.png';
import winterWears from '../../assets/images/winterWears.png';
import cosplayOutfits from '../../assets/images/cosplayOutfits.png';
import partyWears from '../../assets/images/partyWears.png';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const WesternDresses = () => {
  return (
    <div>

      {/* Western Wear */}
      <div className=' h-screen bg-gradient-to-r'>
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



    </div>
  )
}

export default WesternDresses
