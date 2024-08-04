import { EyeIcon, EyeOffIcon, LockClosedIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { changePasswordApi } from '../../apis/Api';
import { toast } from 'react-toastify';

const ChangePassword = () => {
    const navigate = useNavigate();
    // const { token } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user._id);
    const id = user.id;
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match.");
            toast.error("New password and confirm password do not match.");
            return;
        }

        try {
            const response = await changePasswordApi({
                userId: user._id,
                oldPassword,
                newPassword,
            });

            if (response.data.success) {
                toast.success(response.data.message, {
                    autoClose: 500,
                    onClose: () => {
                        navigate('/myProfile');
                    },
                });
            } else {
                setError(response.data.message);
                toast.error(response.data.message, {
                    autoClose: 2000,
                });
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                const { status, data: { message } } = error.response;

                if (status === 400) {
                    if (message.includes("Old password is incorrect")) {
                        toast.error("The old password you entered is incorrect. Please try again.", {
                            autoClose: 2000,
                        });
                    } else if (message.includes("Cannot reuse a recent password")) {
                        toast.error("You cannot reuse one of your last 5 passwords. Please choose a new one.", {
                            autoClose: 2000,
                        });
                    } else if (message.includes("User ID, old password, and new password are required")) {
                        toast.error("Please fill in all required fields.", {
                            autoClose: 2000,
                        });
                    } else {
                        toast.error("An error occurred: " + message, {
                            autoClose: 2000,
                        });
                    }
                } else if (status === 401) {
                    toast.error("The old password you entered is incorrect. Please try again.", {
                        autoClose: 2000,
                    });
                } else if (status === 404) {
                    toast.error("User not found. Please check your credentials.", {
                        autoClose: 2000,
                    });
                } else if (status === 409) {
                    toast.error("You cannot reuse one of your last 5 passwords. Please choose a new one.", {
                        autoClose: 1000,
                    });
                } else if (status === 500) {
                    toast.error("Server error. Please try again later.", {
                        autoClose: 2000,
                    });
                } else {
                    toast.error("An unexpected error occurred.", {
                        autoClose: 2000,
                    });
                }

                setError(message);
            } else if (error.request) {
                // The request was made but no response was received
                toast.error('No response from server. Please check your internet connection.', {
                    autoClose: 2000,
                });
            } else {
                // Something happened in setting up the request that triggered an Error
                toast.error('An error occurred. Please try again.', {
                    autoClose: 2000,
                });
            }
            console.error("Error during API call:", error);
            setError("Server error. Please try again later.");
        }
    };


    // const handleSubmit = async () => {
    //     if (newPassword !== confirmPassword) {
    //         setError("New password and confirm password do not match.");
    //         toast.error("New password and confirm password do not match.");
    //         return;
    //     }

    //     try {
    //         const response = await changePasswordApi({
    //             userId: user._id,  // Assuming token is userId
    //             oldPassword,
    //             newPassword,
    //         });

    //         if (response.data.success) {
    //             toast.success(response.data.message);
    //             navigate('/myProfile');
    //         } else {
    //             // Handle specific status codes and their associated messages
    //             const { status, message } = response.data;

    //             if (status === 400) {
    //                 if (message.includes("Old password is incorrect")) {
    //                     toast.error("The old password you entered is incorrect. Please try again.");
    //                 } else if (message.includes("Cannot reuse a recent password")) {
    //                     toast.error("You cannot reuse one of your last 5 passwords. Please choose a new one.");
    //                 } else if (message.includes("User ID, old password, and new password are required")) {
    //                     toast.error("Please fill in all required fields.");
    //                 } else {
    //                     toast.error("An error occurred: " + message);
    //                 }
    //             } else if (status === 401) {
    //                 toast.error("The old password you entered is incorrect. Please try again.");
    //             } else if (status === 404) {
    //                 toast.error("User not found. Please check your credentials.");
    //             } else if (status === 409) {
    //                 toast.error("You cannot reuse one of your last 5 passwords. Please choose a new one.");
    //             } else if (status === 500) {
    //                 toast.error("Server error. Please try again later.");
    //             } else {
    //                 toast.error("An unexpected error occurred.");
    //             }

    //             setError(message);
    //         }
    //     } catch (error) {
    //         // Handle unexpected errors
    //         console.error("Error during API call:", error);
    //         setError("Server error. Please try again later.");
    //         toast.error("Server error. Please try again later.");
    //     }
    // };

    // const handleSubmit = async () => {
    //     if (newPassword !== confirmPassword) {
    //         setError("New password and confirm password do not match.");
    //         toast.error("New password and confirm password do not match.");
    //         return;
    //     }

    //     try {
    //         const response = await changePasswordApi({
    //             userId: user._id,  // Assuming token is userId
    //             oldPassword,
    //             newPassword,
    //         });

    //         if (response.data.success) {
    //             toast.success("Password changed successfully.");
    //             navigate('/myProfile');
    //         } else {
    //             // Handle specific status codes and their associated messages
    //             const { status, message } = response;

    //             if (status === 400) {
    //                 if (message.includes("Old password is incorrect")) {
    //                     toast.error("The old password you entered is incorrect. Please try again.");
    //                 } else if (message.includes("Cannot reuse a recent password")) {
    //                     toast.error("You cannot reuse one of your last 5 passwords. Please choose a new one.");
    //                 } else if (message.includes("User ID, old password, and new password are required")) {
    //                     toast.error("Please fill in all required fields.");
    //                 } else {
    //                     toast.error("An error occurred: " + message);
    //                 }
    //             } else if (status === 401) {
    //                 toast.error("The old password you entered is incorrect. Please try again.");
    //             } else if (status === 404) {
    //                 toast.error("User not found. Please check your credentials.");
    //             } else if (status === 409) {
    //                 toast.error("You cannot reuse one of your last 5 passwords. Please choose a new one.");
    //             } else if (status === 500) {
    //                 toast.error("Server error. Please try again later.");
    //             } else {
    //                 toast.error("An unexpected error occurred.");
    //             }

    //             setError(message);
    //         }
    //     } catch (error) {
    //         // Handle unexpected errors
    //         console.error("Error during API call:", error);
    //         setError("Server error. Please try again later.");
    //         // toast.error("Server error. Please try again later.");
    //         toast.error(res.data.message);
    //     }
    // };

    // const handleSubmit = async () => {
    //     if (newPassword !== confirmPassword) {
    //         setError("New password and confirm password do not match.");
    //         toast.error("New password and confirm password do not match.");
    //         return;
    //     }

    //     try {
    //         const response = await changePasswordApi({
    //             userId: user._id,  // Assuming token is userId
    //             oldPassword,
    //             newPassword,
    //         });

    //         if (response.data.success) {
    //             toast.success("Password changed successfully.");
    //             navigate('/myProfile');
    //         } else {
    //             // Handle specific status codes and their associated messages
    //             const { status, message } = response;

    //             if (status === 400) {
    //                 // Client error
    //                 if (message.includes("Old password is incorrect")) {
    //                     toast.error("The old password you entered is incorrect. Please try again.");
    //                 } else if (message.includes("Cannot reuse a recent password")) {
    //                     toast.error("You cannot reuse one of your last 5 passwords. Please choose a new one.");
    //                 } else if (message.includes("User ID, old password, and new password are required")) {
    //                     toast.error("Please fill in all required fields.");
    //                 } else {
    //                     toast.error("An error occurred: " + message);
    //                 }
    //             } else if (status === 404) {
    //                 // Not found
    //                 toast.error("User not found. Please check your credentials.");
    //             } else if (status === 500) {
    //                 // Server error
    //                 toast.error("Server error. Please try again later.");
    //             } else {
    //                 // Other errors
    //                 toast.error("An unexpected error occurred.");
    //             }

    //             setError(message);
    //         }
    //     } catch (error) {
    //         // Handle unexpected errors
    //         console.error("Error during API call:", error);
    //         setError("Server error. Please try again later.");
    //         toast.error("Server error. Please try again later.");
    //     }
    // };
    // const handleSubmit = async () => {
    //     if (newPassword !== confirmPassword) {
    //         setError("New password and confirm password do not match.");
    //         return;
    //     }

    //     try {
    //         const response = await fetch('/api/user/changePassword', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 userId: token,  // Assuming token is userId
    //                 oldPassword,
    //                 newPassword,
    //             }),
    //         });

    //         const data = await response.json();

    //         if (data.success) {
    //             alert("Password changed successfully.");
    //             navigate('/myProfile');
    //         } else {
    //             setError(data.message);
    //         }
    //     } catch (error) {
    //         setError("Server error. Please try again later.");
    //     }
    // };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 font-poppins">
            <div className="w-96 h-auto bg-white rounded-3xl p-10">
                <div>
                    <div className="mb-2">
                        <div className="text-black text-2xl font-bold">Change Your Password</div>
                    </div>
                    {/* Old password */}
                    <div className="mb-2">
                        <div className="text-black text-lg">Write your old password here</div>
                    </div>
                    <div className='space-y-4'>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
                                <LockClosedIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setOldPassword(e.target.value)}
                                name="oldPassword"
                                id="oldPassword"
                                placeholder="Old Password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={handleTogglePassword}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 focus:outline-none"
                            >
                                {showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeOffIcon className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* New password */}
                <div>
                    <div className="mb-2">
                        <div className="text-black text-lg">Set your new password here</div>
                    </div>
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
                                <LockClosedIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setNewPassword(e.target.value)}
                                name="newPassword"
                                id="newPassword"
                                placeholder="New Password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={handleTogglePassword}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 focus:outline-none"
                            >
                                {showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeOffIcon className="h-5 w-5" />}
                            </button>
                        </div>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
                                <LockClosedIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={handleTogglePassword}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 focus:outline-none"
                            >
                                {showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeOffIcon className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* {error && <div className="text-red-500 mt-4">{error}</div>} */}

                {/* Submit button */}
                <div className='mt-4'>
                    <button
                        onClick={handleSubmit}
                        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Change
                    </button>
                    <div className="text-center mt-2">
                        <p className="text-gray-600">Go back to{' '}
                            <a href="/myProfile" className="text-blue-500 hover:underline">
                                Profile
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword;


// import { EyeIcon, EyeOffIcon, LockClosedIcon } from '@heroicons/react/outline'
// import React, { useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';

// const ChangePassword = () => {
//     const navigate = useNavigate();
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const { token } = useParams();
//     const handleTogglePassword = () => {
//         setShowPassword((prev) => !prev);
//     };

//     return (
//         <div
//             className="flex justify-center items-center h-screen bg-gray-100 font-poppins"
//         >
//             <div className="w-96 h-auto bg-white rounded-3xl p-10">
//                 <div>
//                     <div className="mb-2">
//                         <div className="text-black text-2xl font-bold">Change Your Password</div>
//                     </div>
//                     {/* Old password */}
//                     <div className="mb-2">
//                         <div className="text-black text-lg">Write your old password here</div>
//                     </div>
//                     <div className='space-y-4'>
//                         <div className="relative">
//                             <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
//                                 <LockClosedIcon className="h-5 w-5 text-gray-400" />
//                             </div>
//                             <input
//                                 type={showPassword ? 'text' : 'password'}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 name="password"
//                                 id="password"
//                                 placeholder="Old Password"
//                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10"
//                                 required
//                             />
//                             <button
//                                 type="button"
//                                 onClick={handleTogglePassword}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 focus:outline-none"
//                             >
//                                 {showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeOffIcon className="h-5 w-5" />}
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* New password */}
//                 <div>
//                     <div className="mb-2">
//                         <div className="text-black text-lg">Set your new password here</div>
//                     </div>
//                     <div className="space-y-4">
//                         <div className="relative">
//                             <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
//                                 <LockClosedIcon className="h-5 w-5 text-gray-400" />
//                             </div>
//                             <input
//                                 type={showPassword ? 'text' : 'password'}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 name="password"
//                                 id="password"
//                                 placeholder="New Password"
//                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10"
//                                 required
//                             />
//                             <button
//                                 type="button"
//                                 onClick={handleTogglePassword}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 focus:outline-none"
//                             >
//                                 {showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeOffIcon className="h-5 w-5" />}
//                             </button>
//                         </div>
//                         <div className="relative">
//                             <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
//                                 <LockClosedIcon className="h-5 w-5 text-gray-400" />
//                             </div>
//                             <input
//                                 type={showPassword ? 'text' : 'password'}
//                                 // onChange={(e) => setConfirmPassword(e.target.value)}
//                                 name="confirm password"
//                                 id="confirmPassword"
//                                 placeholder="Confirm Password"
//                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10"
//                                 required
//                             />
//                             <button
//                                 type="button"
//                                 // onClick={handleTogglePassword}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 focus:outline-none"
//                             >
//                                 {showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeOffIcon className="h-5 w-5" />}
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Submit button */}
//                 <div className='mt-4'>
//                     <button
//                         // onClick={handleSubmit}
//                         className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                     >
//                         Change
//                     </button>
//                     <div className="text-center mt-2">
//                         <p className="text-gray-600">Go back to{' '}
//                             <a href="/myProfile" className="text-blue-500 hover:underline">
//                                 Profile
//                             </a>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ChangePassword;
