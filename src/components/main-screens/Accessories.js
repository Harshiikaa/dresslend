import React, { useState, useEffect, useRef } from 'react';
import ethnicJewelry from '../../assets/images/ethnicJewelry.png';
import indianJewelry from '../../assets/images/indianJewelry.png';
import bagsAndClutches from '../../assets/images/bagsAndClutches.png';
import headWears from '../../assets/images/headWears.png';
import modernAccessories from '../../assets/images/modernAccessories.png';
import { Link } from 'react-router-dom';

const Accessories = () => {
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
            {/* Accessories */}
            <div className='h-screen bg-gradient-to-r'>
                <p className="text-center text-base font-semibold text-black-500">
                    Accessories
                </p>
                <p className="text-center text-2xl font-semibold text-black-500">
                    We Offer Variety of Accessories
                </p>
                {/* Horizontal scrollable section */}
                <div className="relative">
                    <div className="overflow-x-auto whitespace-nowrap px-4 flex" ref={scrollContainerRef}>
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

export default Accessories;
