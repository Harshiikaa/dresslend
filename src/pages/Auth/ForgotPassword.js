
import React, { useState } from 'react';
import { LockClosedIcon, EyeIcon, EyeOffIcon, MailIcon, XIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgetPasswordApi, loginUserApi } from '../../apis/Api';

const ForgotPassword = ({ isOpen, onClose }) => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await forgetPasswordApi({ email });
            console.log(response.data); // Handle the response as needed
            // Check the response for success or failure
            if (response.data.success == true) {
                // Show success message or navigate to another page
                toast.success(response.data.message);
                // You can also navigate to the login page or another page
                // navigate('/login');
            } else {
                // Show an error message
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            // Handle error, show an error message, etc.
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 z-50 flex justify-center items-center font-poppins bg-black bg-opacity-40">
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
                                Forgot your Password?
                            </h3>
                            <h2 className="text-1xl font-regular text-gray-900 text-center">
                                Enter your email address here, we’ll send a link to reset your password              </h2>
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
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:ring-4 focus:ring-blue-300"
                            >
                                Send
                            </button>

                            <div className="text-sm font-medium text-gray-500 text-center">
                                Go back to{' '}
                                <a
                                    href="/register"
                                    className="text-blue-700 hover:underline"
                                >
                                    Login
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
};

export default ForgotPassword;
