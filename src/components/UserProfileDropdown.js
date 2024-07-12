import React, { useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import defaultImage from '../assets/images/blankProfilePic.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSingleUserApi } from '../apis/Api';

const UserProfileDropdown = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user._id);

    const [userImage, setUserImage] = useState(null);


    useEffect(() => {
        getSingleUserApi(user._id).then((res) => {
            console.log(res.data);
            setUserImage(res.data.user.userImage);

        });
    }, [user]);

    const logout = () => {
        const confirmDialog = window.confirm('Are you sure, you want to logout?');
        if (!confirmDialog) {
            return;
        } else {
            localStorage.clear();
            console.log('User logged out successfully');
            toast.success('Logout successful', {
                onClose: () => {
                    // Reload the page after the toast is closed
                    setTimeout(() => {
                        navigate('/');
                        window.location.reload();
                    });
                },
                autoClose: 1000, // Toast will be visible for 1 second
            });
        }
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex items-center bg-gray-100 justify-between w-full px-0 py-1 text-sm font-medium text-gray-700 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-300">

                    {userImage ? (
                        <img src={userImage} className='object-fit-cover w-10 h-10 rounded-lg mr-2 border-2' height={200} width={200} alt='Profile' />
                    ) : (
                        <img src={defaultImage} className='object-fit-cover w-10 h-10 rounded-lg mr-2 border-2' height={200} width={200} alt='Placeholder' />
                    )}
                    <hr />
                    <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-500">Welcome</span>
                        <span className="text-sm font-medium">{user ? user.firstName : 'User'}</span>
                    </div>
                    <ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="/myProfile"
                                    className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                                >
                                    My Profile
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="/myOrders"
                                    className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                                >
                                    My Orders
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={logout}
                                    className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                                >
                                    Logout
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default UserProfileDropdown;
