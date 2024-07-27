import { EyeIcon, EyeOffIcon, LockClosedIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const ChangePassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { token } = useParams();
    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div
            className="flex justify-center items-center font-poppins"
        >
            <div className="w-96 h-auto bg-white rounded-3xl p-10 relative right-14">
                <div>
                    <div className="mb-6">
                        <div className="text-black text-2xl font-bold">Change Your Password</div>
                    </div>
                    {/* Old password */}
                    <div className="mb-6">
                        <div className="text-black text-lg">Write you old password here</div>
                    </div>
                    <div className='space-y-4'>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
                                <LockClosedIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                id="password"
                                placeholder="Old Password"
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

                    </div>

                </div>

                {/* new password */}
                <div>
                    <div className="mb-6">
                        <div className="text-black text-lg">Set your new password here</div>
                    </div>
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
                                <LockClosedIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                id="password"
                                placeholder="New Password"
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
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
                                <LockClosedIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                // onChange={(e) => setConfirmPassword(e.target.value)}
                                name=" confirm password"
                                id="password"
                                placeholder="Confirm Password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10"
                                required
                            />
                            <button
                                type="button"
                                // onClick={handleTogglePassword}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 focus:outline-none"
                            >
                                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                            </button>
                        </div>

                    </div>
                </div>
                {/* button */}
                <div>
                    <button
                        // onClick={handleSubmit}
                        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Change
                    </button>
                    <div className="text-center mt-4">
                        <p className="text-gray-600">Go back to {' '}</p>
                        <a href="/myProfile" className="text-blue-500 hover:underline">
                            Profile
                        </a>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default ChangePassword
