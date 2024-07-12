

import React from 'react'
import LandingPage from '../../components/main-screens/LandingPage';
import EthnicDresses from '../../components/main-screens/EthnicDresses';
import WesternDresses from '../../components/main-screens/WesternDresses';
import Accessories from '../../components/main-screens/Accessories';
import AboutUs from '../../components/main-screens/AboutUs';
import Help from '../../components/main-screens/Help';
import { SearchIcon } from '@heroicons/react/outline';
import Footer from '../../components/main-screens/Footer';

const Home = () => {

  return (
    <div className='font-poppins'>
      <LandingPage />
      <EthnicDresses />
      <WesternDresses />
      <Accessories />
      <AboutUs />
      <Help />
      <Footer />

    </div>
  )
}

export default Home
