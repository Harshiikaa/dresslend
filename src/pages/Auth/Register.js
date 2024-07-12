


import React, { useState } from 'react';
import { UserIcon, MailIcon, LockClosedIcon, EyeIcon, EyeOffIcon, XIcon, PhoneIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';
import { registerUserApi } from '../../apis/Api';
import { useNavigate } from 'react-router-dom';

const Register = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    // to view the password
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const changeFirstName = (e) => {
        setFirstName(e.target.value);
    };
    const changeLastName = (e) => {
        setLastName(e.target.value);
    };
    const changePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    };
    const changeEmail = (e) => {
        setEmail(e.target.value);
    };

    const changePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email,
            password: password,
        };
        registerUserApi(data)
            .then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);
                    navigate('/login');
                }
            })
            .catch((err) => {
                toast.error('Server Error');
                console.log(err.message);
            });



    }

    return (
        isOpen && (
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
                        <form className="space-y-4 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8">
                            <h3 className="text-3xl font-medium text-gray-900 text-center">
                                Register your account
                            </h3>
                            <h2 className="text-2xl font-medium text-gray-900 text-center">
                                for better experience
                            </h2>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
                                    <UserIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    onChange={changeFirstName}
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10"
                                    placeholder="First Name"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
                                    <UserIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    onChange={changeLastName}
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10"
                                    placeholder="Last Name"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
                                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    onChange={changePhoneNumber}
                                    type="tel"
                                    name="contactNumber"
                                    id="contactNumber"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10"
                                    placeholder="Contact Number"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
                                    <MailIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    onChange={changeEmail}
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10"
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
                                    onChange={changePassword}
                                    name="password"
                                    id="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10"
                                    placeholder="Password"
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



                            {/* <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
                                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10"
                                    placeholder="Confirm Password"
                                    required
                                />
                            </div> */}

                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:ring-4 focus:ring-blue-300"
                            >
                                Register
                            </button>

                            <div className="text-sm font-medium text-gray-500 text-center">
                                Already have an account{' '}
                                <a
                                    href="/login"
                                    className="text-blue-700 hover:underline"
                                >
                                    login
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
};

export default Register;
