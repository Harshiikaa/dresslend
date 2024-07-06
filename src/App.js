import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
import AdminRoutes from './protected/AdminRoutes';

import Products from './pages/Admin/Products';
import EditProducts from './pages/Admin/EditProducts';
import Categories from './pages/Admin/Categories';
import ProductDetails from './pages/User/ProductDetails';
import TryFetch from './pages/User/TryFetch';

import Users from './pages/Admin/Users';
import MyOrders from './pages/User/MyOrders';
import MyProfile from './pages/User/MyProfile';
import Orders from './pages/Admin/Orders';
import SharedNavLayout from './components/SharedNavLayout';
import LandingPage from './components/main-screens/LandingPage';
import EthnicDresses from './components/main-screens/EthnicDresses';
import WesternDresses from './components/main-screens/WesternDresses';
import Accessories from './components/main-screens/Accessories';
import AboutUs from './components/main-screens/AboutUs';
import Help from './components/main-screens/Help';
import AuthProvider from './components/AuthContent';
import Favorites from './pages/User/Favorites';
import ShoppingBag from './pages/User/ShoppingBag';
import UserRoutes from './protected/UserRoutes';
import EditShoppingBag from './pages/User/EditShoppingBag';
import Address from './pages/User/Order/Address';
import Review from './pages/User/Order/Review';
import Payment from './pages/User/Order/Payment';
import Success from './pages/User/Order/Success';





const App = () => {
  return (
    <Router>
      <ToastContainer />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SharedNavLayout />}>
            <Route path="" element={<Home />} />
            <Route path="/tryFetch" element={<TryFetch />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/shoppingBag" element={<ShoppingBag />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
            <Route path='/shoppingBagEdit/:id' element={<EditShoppingBag />} />
            <Route path="/address" element={<Address />} />
            <Route path="/review" element={<Review />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<Success />} />





          </Route>


          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* <Route path="/" element={<Home />} /> */}

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


          <Route path='/landingPage' element={<LandingPage />} />
          <Route path='/ethnicWear' element={<EthnicDresses />} />
          <Route path='/westernWear' element={<WesternDresses />} />
          <Route path='/accessories' element={<Accessories />} />
          <Route path='/aboutUs' element={<AboutUs />} />
          <Route path='/help' element={<Help />} />


          <Route path='myProfile' element={<MyProfile />} />
          <Route path='myOrders' element={<MyOrders />} />


          {/* User Authorization */}
          {/* <Route element={<UserRoutes />} > */}
          {/* <Route path='favorites' element={<Favorites />} />
          <Route path='shoppingBag' element={<ShoppingBag />} /> */}
          {/* </Route> */}



          {/* Admin Authorization */}
          <Route path='admin' element={<AdminRoutes />} >
            <Route path='products' element={<Products />} />
            <Route path='productEdit/:id' element={<EditProducts />} />
            <Route path='orders' element={<Orders />} />
            <Route path='categories' element={<Categories />} />
            <Route path='users' element={<Users />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
