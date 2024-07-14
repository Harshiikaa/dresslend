import React, { useState } from 'react';
import { LockClosedIcon, EyeIcon, EyeOffIcon, MailIcon, XIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUserApi } from '../../apis/Api';
import ForgotPassword from './ForgotPassword';
import Register from './Register'; // Import the Register component here

const Login = ({ isOpen, onClose }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false); // State for forgot password modal
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // State for register modal

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleModalToggle = () => {
        onClose(); // Close Login modal
    };

    const handleForgotPasswordOpen = () => {
        setIsForgotPasswordOpen(true);
        onClose(); // Close Login modal
    };

    const handleForgotPasswordClose = () => {
        setIsForgotPasswordOpen(false);
    };

    const handleRegisterModalOpen = () => {
        setIsRegisterModalOpen(true);
        onClose(); // Close Login modal
    };

    const handleRegisterModalClose = () => {
        setIsRegisterModalOpen(false);
    };
// Your existing handleSubmit function
const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
        email: email,
        password: password,
    };
    loginUserApi(data)
        .then((res) => {
            if (res.data.success === false) {
                toast.error(res.data.message, {
                    autoClose: 500, // Auto close the toast after 0.5 seconds
                });
            } else {
                toast.success(res.data.message, {
                    autoClose: 500, // Auto close the toast after 0.5 seconds
                    onClose: () => {
                        localStorage.setItem('token', res.data.token);
                        const jsonDecode = JSON.stringify(res.data.userData);
                        localStorage.setItem('user', jsonDecode);
                        // Check if the user is an admin
                        if (res.data.userData.isAdmin) {
                            navigate('/admin/products');
                        } else {
                            window.location.reload();
                        }
                    },
                });
            }
        })
        .catch((err) => {
            toast.error('Error in server', {
                autoClose: 500, // Auto close the toast after 0.5 seconds
            });
            console.log(err.message);
        });
};

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const data = {
    //         email: email,
    //         password: password,
    //     };
    //     loginUserApi(data)
    //         .then((res) => {
    //             if (res.data.success === false) {
    //                 toast.error(res.data.message);
    //             } else {
    //                 toast.success(res.data.message);
    //                 localStorage.setItem('token', res.data.token);
    //                 const jsonDecode = JSON.stringify(res.data.userData);
    //                 localStorage.setItem('user', jsonDecode);
    //                 // Check if the user is an admin
    //                 if (res.data.userData.isAdmin) {
    //                     navigate('/admin/products');
    //                 } else {
    //                     window.location.reload();
    //                 }
    //             }
    //         })
    //         .catch((err) => {
    //             toast.error('Error in server');
    //             console.log(err.message);
    //         });
    // };

    return (
        <>
            {/* Login Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40">
                    <div className="relative w-full max-w-md h-full md:h-auto">
                        <div className="bg-white rounded-3xl shadow relative">
                            <div className="flex justify-end p-2">
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                    onClick={onClose}
                                >
                                    <XIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <form className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8">
                                <h3 className="text-3xl font-medium text-gray-900 text-center">
                                    Login to your account
                                </h3>
                                <h2 className="text-2xl font-medium text-gray-900 text-center">
                                    for better experience
                                </h2>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
                                        <MailIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10"
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
                                        <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={handleTogglePassword}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 focus:outline-none"
                                    >
                                        {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                    </button>
                                </div>
                                <div className="text-center">
                                    {/* Button to open Forgot Password modal and close Login modal */}
                                    <button
                                        type="button"
                                        onClick={handleForgotPasswordOpen}
                                        className="text-sm text-blue-700 underline"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    type="submit"
                                    className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:ring-4 focus:ring-blue-300"
                                >
                                    Login
                                </button>
                                <div className="text-sm font-medium text-gray-500 text-center">
                                    Don't have an account yet?{' '}
                                    {/* Button to open Register modal and close Login modal */}
                                    <button
                                        type="button"
                                        onClick={handleRegisterModalOpen}
                                        className="text-blue-700 hover:underline focus:outline-none"
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Forgot Password Modal */}
            <ForgotPassword isOpen={isForgotPasswordOpen} onClose={handleForgotPasswordClose} />

            {/* Register Modal */}
            <Register isOpen={isRegisterModalOpen} onClose={handleRegisterModalClose} />
        </>
    );
};

export default Login;


// import React, { useState } from 'react';
// import { LockClosedIcon, EyeIcon, EyeOffIcon, MailIcon, XIcon } from '@heroicons/react/outline';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { loginUserApi } from '../../apis/Api';

// const Login = ({ isOpen, onClose }) => {
  
//   const [showPassword, setShowPassword] = useState(false);

//   const handleTogglePassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = {
//       email: email,
//       password: password,
//     };

//     loginUserApi(data)
//       .then((res) => {
//         if (res.data.success === false) {
//           toast.error(res.data.message);
//         } else {
//           toast.success(res.data.message);
//           localStorage.setItem('token', res.data.token);
//           const jsonDecode = JSON.stringify(res.data.userData);
//           localStorage.setItem('user', jsonDecode);
//           // Check if the user is an admin
//           if (res.data.userData.isAdmin) {
//             navigate('/admin/products');
//           } else {
//             window.location.reload()
//           }
//         }
//       })
//       .catch((err) => {
//         toast.error('Error in server');
//         console.log(err.message);
//       });
//   };

//   return (
//     isOpen && (
//       <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40">
//         <div className="relative w-full max-w-md h-full md:h-auto">
//           <div className="bg-white rounded-3xl shadow relative">
//             <div className="flex justify-end p-2">
//               <button
//                 type="button"
//                 className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
//                 onClick={onClose}
//               >
//                 <XIcon className="w-5 h-5" />
//               </button>
//             </div>
//             <form className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8">
//               <h3 className="text-3xl font-medium text-gray-900 text-center">
//                 Login to your account
//               </h3>
//               <h2 className="text-2xl font-medium text-gray-900 text-center">
//                 for better experience
//               </h2>
//               <div className="relative">
//                 <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
//                   <MailIcon className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   onChange={(e) => setEmail(e.target.value)}
//                   type="email"
//                   name="email"
//                   id="email"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10"
//                   placeholder="Email"
//                   required
//                 />
//               </div>
//               <div className="relative">
//                 <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
//                   <LockClosedIcon className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   onChange={(e) => setPassword(e.target.value)}

//                   name="password"
//                   id="password"
//                   placeholder="Password"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={handleTogglePassword}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 focus:outline-none"
//                 >
//                   {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
//                 </button>
//               </div>
//               <div className="text-center">
//                 <a
//                   href="/forgotPassword"
//                   className="text-sm text-blue-700 underline"
//                 >
//                   Forgot Password?
//                 </a>
//               </div>
//               <button
//                 onClick={handleSubmit}
//                 type="submit"
//                 className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:ring-4 focus:ring-blue-300"
//               >
//                 Login
//               </button>

//               {/* <div className="text-sm font-medium text-gray-500 text-center">
//                 Don't have an account yet?{' '}
//                 <a
//                   href="/register"
//                   className="text-blue-700 hover:underline"
//                 >
//                   Register
//                 </a>
//               </div> */}
//             </form>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default Login;
