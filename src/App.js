import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/User/Home';
import HakuPatasi from './pages/User/Ethnic Wears/HakuPatasi';
import LehengaCholi from './pages/User/Ethnic Wears/LehengaCholi';
import GunyoCholo from './pages/User/Ethnic Wears/GunyoCholo';
import GurungDress from './pages/User/Ethnic Wears/GurungDress';
import DauraSurwal from './pages/User/Ethnic Wears/DauraSurwal';
import FormalWears from './pages/User/Western Wears/FormalWears';
import SummerWears from './pages/User/Western Wears/SummerWears';
import WinterWears from './pages/User/Western Wears/WinterWears';
import CosplayOutfits from './pages/User/Western Wears/CosplayOutfits';
import PartyWears from './pages/User/Western Wears/PartyWears';

import EthnicJewelry from './pages/User/Accessories/EthnicJewelry';
import IndianJewelry from './pages/User/Accessories/IndianJewelry';
import BagsAndClutches from './pages/User/Accessories/BagsAndClutches';
import HeadWears from './pages/User/Accessories/HeadWears';
import ModernAccessories from './pages/User/Accessories/ModernAccessories';





const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        {/* ethnic dresses routes */}
        <Route path="/hakuPatasi" element={<HakuPatasi />} />
        <Route path="/lehengaCholi" element={< LehengaCholi />} />
        <Route path="/gunyocholo" element={< GunyoCholo />} />
        <Route path="/gurungDress" element={<GurungDress />} />
        <Route path="/dauraSurwal" element={< DauraSurwal />} />

        {/* western dresses routes */}
        <Route path="/formalWears" element={< FormalWears />} />
        <Route path="/summerWears" element={< SummerWears />} />
        <Route path="/winterWears" element={< WinterWears />} />
        <Route path="/cosplayOutfits" element={<CosplayOutfits />} />
        <Route path="/partyWears" element={< PartyWears />} />

        {/* Accessories routes */}
        <Route path="/ethnicJewelry" element={< EthnicJewelry />} />
        <Route path="/indianJewelry" element={< IndianJewelry />} />
        <Route path="/bagsAndClutches" element={< BagsAndClutches />} />
        <Route path="/headWears" element={< HeadWears />} />
        <Route path="/modernAccessories" element={<ModernAccessories />} />


        {/* User Authorization */}
        {/* <Route path='user' element={<UserRoutes/>} >
        </Route> */}


      </Routes>
    </Router>
  );
}

export default App;
