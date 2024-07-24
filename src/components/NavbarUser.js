import React, { useEffect, useState } from 'react';
import { HeartIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline';
import logo from '../assets/images/logo.png';
import UserProfileDropdown from './UserProfileDropdown';
import { useNavigate } from 'react-router-dom';
import { getFavoritesByUserIDApi, getShoppingBagByUserIDApi } from '../apis/Api';
import { toast } from 'react-toastify';
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
const IconLink = ({ href, IconComponent, badgeCount }) => (
    <div className="relative">
        <a
            href={href}
            className="text-black-300 hover:text-[#F1A501] px-3 py-5 rounded-md flex items-center space-x-2 text-sm font-medium"
        >
            <IconComponent className="h-5 w-5 text-black" />
        </a>
        {badgeCount > 0 && (
            <span className="absolute top-1 right-1 inline-flex items-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {badgeCount}
            </span>
        )}
    </div>
);

const NavbarUser = () => {
    const [favoritesCount, setFavoritesCount] = useState(0);
    const [shoppingBagCount, setShoppingBagCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch favorites count
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            getFavoritesCount(user._id);
            getShoppingBagCount(user._id);
        }
    }, []);

    const getFavoritesCount = (userId) => {
        getFavoritesByUserIDApi(userId)
            .then((res) => {
                const count = res.data.favorites.length;
                setFavoritesCount(count);
            })
            .catch((error) => {
                console.error('Error fetching favorites count:', error);
                toast.error('Failed to fetch favorites count');
            });
    };

    const getShoppingBagCount = (userId) => {
        getShoppingBagByUserIDApi(userId)
            .then((res) => {
                const count = res.data.shoppingBag.length;
                setShoppingBagCount(count);
            })
            .catch((error) => {
                console.error('Error fetching favorites count:', error);
                toast.error('Failed to fetch favorites count');
            });
    };

    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMenu = () => setClick(false);
    return (
        <>
            <nav className="bg-white-800 shadow-lg font-poppins">
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

                        {/* Searchbar */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-4 pr-10 py-3 mt-1 border rounded-md border-black focus:outline-none w-48 h-10"
                            />
                            <button
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                onClick={() => handleSearch()}
                            >
                                <SearchIcon className="h-5 w-5 text-black hover:text-[#F1A501]" />
                            </button>
                        </div>

                        {/* Favorite and Shopping Bag */}
                        <div className="hidden sm:flex sm:ml-2 space-x-2">
                            <IconLink href="/favorites" IconComponent={HeartIcon} badgeCount={favoritesCount} />
                            <IconLink href="/shoppingBag" IconComponent={ShoppingBagIcon} badgeCount={shoppingBagCount} />
                        </div>

                        {/* User Details */}
                        <div className="hidden sm:flex sm:ml-2 space-x-2">
                            <UserProfileDropdown />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavbarUser;


// import React, { useEffect, useState } from 'react';
// import { HeartIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline';
// import logo from '../assets/images/logo.png';
// import UserProfileDropdown from './UserProfileDropdown';
// import { useNavigate } from 'react-router-dom';
// import { getFavoritesByUserIDApi } from '../apis/Api';
// import { toast } from 'react-toastify';

// const NavItem = ({ href, text }) => (
//     <a
//         href={href}
//         className="text-black-300 hover:text-[#F1A501] px-3 py-2 rounded-md text-sm font-medium cursor-pointer focus:outline-none"
//     >
//         {text}
//     </a>
// );

// const IconLink = ({ href, IconComponent, badgeCount }) => (
//     <div className="relative">
//         <a
//             href={href}
//             className="text-black-300 hover:text-[#F1A501] px-3 py-5 rounded-md flex items-center space-x-2 text-sm font-medium"
//         >
//             <IconComponent className="h-5 w-5 text-black" />
//         </a>
//         {badgeCount > 0 && (
//             <span className="absolute top-1 right-1 inline-flex items-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
//                 {badgeCount}
//             </span>
//         )}
//     </div>
// );

// const NavbarUser = () => {
//     const [favoritesCount, setFavoritesCount] = useState(0);

//     useEffect(() => {
//         // Fetch favorites count
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (user) {
//             getFavoritesCount(user._id);
//         }
//     }, []);

//     const getFavoritesCount = (userId) => {
//         getFavoritesByUserIDApi(userId)
//             .then((res) => {
//                 const count = res.data.favorites.length;
//                 setFavoritesCount(count);
//             })
//             .catch((error) => {
//                 console.error('Error fetching favorites count:', error);
//                 toast.error('Failed to fetch favorites count');
//             });
//     };

//     const navigate = useNavigate();

//     const handleSearch = () => {
//         // Handle search functionality
//     };

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
//                             <NavItem href="/landingPage" text="Home" />
//                             <NavItem href="/ethnicWear" text="Ethnic Wear" />
//                             <NavItem href="/westernWear" text="Western Wear" />
//                             <NavItem href="/accessories" text="Accessories" />
//                             <NavItem href="/aboutUs" text="About Us" />
//                             <NavItem href="/help" text="Help" />
//                         </div>

//                         {/* Searchbar */}
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 placeholder="Search..."
//                                 className="pl-4 pr-10 py-3 mt-2.5 border rounded-md border-black focus:outline-none w-48 h-10"
//                             />
//                             <button
//                                 className="absolute right-2 top-1/2 transform -translate-y-1/2"
//                                 onClick={() => handleSearch()}
//                             >
//                                 <SearchIcon className="h-5 w-5 text-black hover:text-[#F1A501]" />
//                             </button>
//                         </div>

//                         {/* Favorite and Shopping Bag */}
//                         <div className="hidden sm:flex sm:ml-2 space-x-2">
//                             <IconLink href="/favorites" IconComponent={HeartIcon} badgeCount={favoritesCount} />
//                             <IconLink href="/shoppingBag" IconComponent={ShoppingBagIcon} />
//                         </div>

//                         {/* User Details */}
//                         <div className="hidden sm:flex sm:ml-2 space-x-2">
//                             <UserProfileDropdown />
//                         </div>
//                     </div>
//                 </div>
//             </nav>
//         </>
//     );
// };

// export default NavbarUser;

// import React, { useEffect, useState } from 'react';
// import { HeartIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline';
// import logo from '../assets/images/logo.png';
// import Login from '../pages/Auth/Login';
// import Register from '../pages/Auth/Register';
// import UserProfileDropdown from './UserProfileDropdown';
// import { useNavigate } from 'react-router-dom';

// const NavItem = ({ href, text, onClick }) => (
//     <button
//         onClick={onClick}
//         className="text-black-300 hover:text-[#F1A501] px-3 py-2 rounded-md text-sm font-medium cursor-pointer focus:outline-none"
//     >
//         {text}
//     </button>
// );

// // const IconLink = ({ href, IconComponent }) => (
// //     <a
// //         href={href}
// //         className="text-black-300 hover:text-[#F1A501] px-3 py-5 rounded-md flex items-center space-x-2 text-sm font-medium"
// //     >
// //         <IconComponent className="h-5 w-5 text-black" />
// //     </a>
// // );
// const IconLink = ({ href, IconComponent, badgeCount }) => (
//     <div className="relative">
//         <a
//             href={href}
//             className="text-black-300 hover:text-[#F1A501] px-3 py-5 rounded-md flex items-center space-x-2 text-sm font-medium"
//         >
//             <IconComponent className="h-5 w-5 text-black" />
//         </a>
//         {badgeCount > 0 && (
//             <span className="absolute top-1 right-1 inline-flex items-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
//                 {badgeCount}
//             </span>
//         )}
//     </div>
// );

// const NavbarUser = () => {
//     const [user, setUser] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');

//     const navigate = useNavigate();

//     useEffect(() => {
//         // Get user data from local storage
//         const storedUser = JSON.parse(localStorage.getItem('user'));
//         if (storedUser) {
//             setUser(storedUser);
//         }
//     }, []);

//     // for the search
//     const handleSearch = () => {
//         if (searchQuery.trim()) {
//             navigate(`/search?query=${searchQuery}`);
//         }
//     };



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
//                             <NavItem href="landingPage" text="Home" />
//                             <NavItem href="ethnicWear" text="Ethnic Wear" />
//                             <NavItem href="westernWear" text="Western Wear" />
//                             <NavItem href="accessories" text="Accessories" />
//                             <NavItem href="aboutUs" text="About Us" />
//                             <NavItem href="help" text="Help" />
//                         </div>

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
//                                 onClick={() => handleSearch()}
//                             >
//                                 <SearchIcon className="h-5 w-5 text-black hover:text-[#F1A501]" />
//                             </button>
//                         </div>

//                         {/* Favorite and Shopping Bag */}
//                         <div className="hidden sm:flex sm:ml-2 space-x-2">
//                             <IconLink href="/favorites" IconComponent={HeartIcon} />
//                             <IconLink href="/shoppingBag" IconComponent={ShoppingBagIcon} />
//                         </div>

//                         {/* User Details */}
//                         <div className="hidden sm:flex sm:ml-2 space-x-2">
//                             <UserProfileDropdown />
//                         </div>
//                     </div>
//                 </div>
//             </nav>
//         </>
//     );
// };

// export default NavbarUser;
