import React, { useState } from 'react';
import { HeartIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import { toast } from 'react-toastify';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-scroll';

const NavItem = ({ to, text, onClick }) => (
    <Link
        to={to}
        spy={true}
        smooth={true}
        offset={-100}
        duration={500}
        onClick={onClick}
        className="text-black-300 hover:text-[#F1A501] px-2 py-1 rounded-md text-sm font-medium cursor-pointer focus:outline-none"
    >
        {text}
    </Link>
);

const IconLink = ({ IconComponent, onClick }) => (
    <button
        onClick={onClick}
        className="text-black-300 hover:text-[#F1A501] px-3 py-5 rounded-md flex items-center space-x-2 text-sm font-medium"
    >
        <IconComponent className="h-5 w-5 text-black" />
    </button>
);

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleRegisterModalToggle = () => {
        setIsRegisterModalOpen(!isRegisterModalOpen);
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    const handleIconClick = () => {
        toast.info('Please login first.');
        setIsModalOpen(true);
    };

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMenu = () => setClick(false);

    return (
        <>
            <nav className="bg-white-800 shadow-lg">
                <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-8">
                    <div className="relative flex items-center justify-between h-24">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <img className="h-20 w-auto" src={logo} alt="Workflow" />
                        </div>

                        {/* Navigation Items */}
                        <div className="hidden sm:flex sm:ml-3 space-x-4 text-xs">
                            <NavItem to="home" text="Home" onClick={closeMenu} />
                            <NavItem to="ethnicWear" text="Ethnic Wear" onClick={closeMenu} />
                            <NavItem to="westernWear" text="Western Wear" onClick={closeMenu} />
                            <NavItem to="accessories" text="Accessories" onClick={closeMenu} />
                            <NavItem to="aboutUs" text="About Us" onClick={closeMenu} />
                            <NavItem to="help" text="Help" onClick={closeMenu} />
                        </div>

                        {/* Mobile Menu */}
                        {/* <div className='hamburger' onClick={handleClick}>
                            {click ? (<XIcon className="h-6 w-6 text-black" />) : (<FaBars className="h-6 w-6 text-black" />)}
                        </div>
                        <ul className={`${click ? "flex" : "hidden"} flex-col items-center absolute top-24 left-0 w-full bg-white space-y-4 text-xs sm:hidden`}>
                            <li className='nav-item'>
                                <NavItem to="home" text="Home" onClick={closeMenu} />
                            </li>
                            <li className='nav-item'>
                                <NavItem to="ethnicWear" text="Ethnic Wear" onClick={closeMenu} />
                            </li>
                            <li className='nav-item'>
                                <NavItem to="westernWear" text="Western Wear" onClick={closeMenu} />
                            </li>
                            <li className='nav-item'>
                                <NavItem to="accessories" text="Accessories" onClick={closeMenu} />
                            </li>
                            <li className='nav-item'>
                                <NavItem to="aboutUs" text="About Us" onClick={closeMenu} />
                            </li>
                            <li className='nav-item'>
                                <NavItem to="help" text="Help" onClick={closeMenu} />
                            </li>
                        </ul> */}

                        {/* Searchbar */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-4 pr-10 py-3 mt-2.5 border rounded-md border-black focus:outline-none w-48 h-10"
                            />
                            <button
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                onClick={handleSearch}
                            >
                                <SearchIcon className="h-5 w-5 text-black hover:text-[#F1A501]" />
                            </button>
                        </div>

                        {/* Favorite and Shopping Bag */}
                        <div className="hidden sm:flex sm:ml-2 space-x-2">
                            <IconLink IconComponent={HeartIcon} onClick={handleIconClick} />
                            <IconLink IconComponent={ShoppingBagIcon} onClick={handleIconClick} />
                        </div>

                        {/* Login and Signup Buttons */}
                        <div className="hidden sm:flex sm:ml-2 space-x-2">
                            <NavItem to="login" text="Login" onClick={handleModalToggle} />
                            <NavItem to="register" text="Register" onClick={handleRegisterModalToggle} />
                        </div>
                    </div>
                </div>
            </nav>

            <Login isOpen={isModalOpen} onClose={handleModalToggle} />
            <Register isOpen={isRegisterModalOpen} onClose={handleRegisterModalToggle} />
        </>
    );
};

export default Navbar;



// import React, { useState } from 'react';
// import { HeartIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline';
// import { useNavigate } from 'react-router-dom';
// import logo from '../assets/images/logo.png';
// import Login from '../pages/Auth/Login';
// import Register from '../pages/Auth/Register';
// import { toast } from 'react-toastify';

// const NavItem = ({ href, text, onClick }) => (
//     <button
//         onClick={onClick}
//         className="text-black-300 hover:text-[#F1A501] px-2 py-1 rounded-md text-sm font-medium cursor-pointer focus:outline-none"
//     >
//         {text}
//     </button>
// );

// const IconLink = ({ IconComponent, onClick }) => (
//     <button
//         onClick={onClick}
//         className="text-black-300 hover:text-[#F1A501] px-3 py-5 rounded-md flex items-center space-x-2 text-sm font-medium"
//     >
//         <IconComponent className="h-5 w-5 text-black" />
//     </button>
// );

// const Navbar = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');
//     const navigate = useNavigate();

//     const handleModalToggle = () => {
//         setIsModalOpen(!isModalOpen);
//     };

//     const handleRegisterModalToggle = () => {
//         setIsRegisterModalOpen(!isRegisterModalOpen);
//     };

//     const handleSearch = () => {
//         if (searchQuery.trim()) {
//             navigate(`/search?query=${searchQuery}`);
//         }
//     };

//     const handleIconClick = () => {
//         toast.info('Please login first.');
//         setIsModalOpen(true);
//     };

//     const [click, setClick] = useState(false)
//     const handleClick = () => setClick(!click)

//     const closeMenu = () => setClick(false)

//     return (
//         <>
//             <nav className="bg-white-800 shadow-lg">
//                 <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-8">
//                     <div className="relative flex items-center justify-between h-24">
//                         {/* Logo */}
//                         <div className="flex-shrink-0">
//                             <img className="h-20 w-auto" src={logo} alt="Workflow" />
//                         </div>

//                         {/* Navigation Items */}
//                         <div className="hidden sm:flex sm:ml-3 space-x-4 text-xs">
//                             <NavItem text="Home" />
//                             <NavItem text="Ethnic Wear" />
//                             <NavItem text="Western Wear" />
//                             <NavItem text="Accessories" />
//                             <NavItem text="About Us" />
//                             <NavItem text="Help" />
//                         </div>

//                         <ul className={click ? "nav-menu active" : "nav-menu"}>
//                             <li className='nav-item'>
//                                 <a href='/' onClick={closeMenu}>Home</a>
//                             </li>
//                             <li className='nav-item'>
//                                 <a href='#ethnicWear' onClick={closeMenu}>Ethnic Wear</a>
//                             </li>
//                             <li className='nav-item'>
//                                 <a href='#westernWear' onClick={closeMenu}>Western Wear</a>
//                             </li>
//                             <li className='nav-item'>
//                                 <a href='#accessories' onClick={closeMenu}>Accessories</a>
//                             </li>
//                             <li className='nav-item'>
//                                 <a href='#aboutUs' onClick={closeMenu}>About Us</a>
//                             </li> <li className='nav-item'>
//                                 <a href='#help' onClick={closeMenu}>Help</a>
//                             </li>
//                         </ul>

//                         {/* Searchbar */}
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 placeholder="Search..."
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="pl-4 pr-10 py-3 mt-2.5 border rounded-md border-black focus:outline-none w-48 h-10"
//                             />
//                             <button
//                                 className="absolute right-2 top-1/2 transform -translate-y-1/2"
//                                 onClick={handleSearch}
//                             >
//                                 <SearchIcon className="h-5 w-5 text-black hover:text-[#F1A501]" />
//                             </button>
//                         </div>

//                         {/* Favorite and Shopping Bag */}
//                         <div className="hidden sm:flex sm:ml-2 space-x-2">
//                             <IconLink IconComponent={HeartIcon} onClick={handleIconClick} />
//                             <IconLink IconComponent={ShoppingBagIcon} onClick={handleIconClick} />
//                         </div>

//                         {/* Login and Signup Buttons */}
//                         <div className="hidden sm:flex sm:ml-2 space-x-2">
//                             <NavItem text="Login" onClick={handleModalToggle} />
//                             <NavItem text="Register" onClick={handleRegisterModalToggle} />
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             <Login isOpen={isModalOpen} onClose={handleModalToggle} />
//             <Register isOpen={isRegisterModalOpen} onClose={handleRegisterModalToggle} />
//         </>
//     );
// };

// export default Navbar;
