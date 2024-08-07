import React, { useState, useEffect, useRef } from 'react';
import formalWears from '../../assets/images/formalWears.png';
import summerWears from '../../assets/images/summerWears.png';
import winterWears from '../../assets/images/winterWears.png';
import cosplayOutfits from '../../assets/images/cosplayOutfits.png';
import partyWears from '../../assets/images/partyWears.png';
import { Link } from 'react-router-dom';
import { Link as AsScroll } from 'react-scroll';


const WesternDresses = () => {
  const [isLeftScrollVisible, setIsLeftScrollVisible] = useState(false);
  const [isRightScrollVisible, setIsRightScrollVisible] = useState(false);
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setIsLeftScrollVisible(scrollLeft > 0);
    setIsRightScrollVisible(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Western Wear */}
      <div className='h-screen bg-gradient-to-r' id='westernWear'>
        <p className="text-center text-base font-semibold text-black-500">
          Western Wear
        </p>
        <p className="text-center text-2xl font-semibold text-black-500">
          We Offer Variety of Western Dresses
        </p>
        {/* Horizontal scrollable section */}
        <div className="relative">
          <div className="overflow-x-auto whitespace-nowrap px-4 flex" ref={scrollContainerRef}>
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
          {isLeftScrollVisible && (
            <button onClick={scrollLeft} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-yellow-500 p-2 rounded-full">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
          )}
          {isRightScrollVisible && (
            <button onClick={scrollRight} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-yellow-500 p-2 rounded-full">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          )}
        </div>
        <div className="flex items-center justify-center mt-2">
          <AsScroll
            to="accessories"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            className="flex items-center justify-center w-8 h-8 bg-yellow-500 rounded-full animate-bounce"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </AsScroll>
        </div>
      </div>
      {/* <div id="scroll-target" className="h-screen bg-white">
                Content to scroll to
            </div> */}
    </div>
  );
}

export default WesternDresses;
