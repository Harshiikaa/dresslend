import React, { useEffect, useState } from 'react'
import { getAllUsersApi } from '../../apis/Api'
import NavbarAdmin from '../../components/NavbarAdmin'
import defaultImage from '../../assets/images/blankProfilePic.png';
import SidebarAdmin from '../../components/SidebarAdmin';


const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsersApi().then((res) => {
            const usersData = res.data.users;
            setUsers(usersData);
        });
    }, []);

    return (
        <div className="flex h-screen">
            <SidebarAdmin />
            <div className="flex-1 flex flex-col">
                <NavbarAdmin />
                <div className="p-7 flex-1">
                    <h1 className="text-6xl font-bold mb-6">Users</h1>
                    {/* for showing table */}
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Profile Picture
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    First Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Last Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Phone Number
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users && users.length > 0 ? (
                                users.map((item) => (
                                    <tr key={item._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img
                                                src={item.userImage || defaultImage}
                                                className="w-16 h-16 object-cover"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 overflow-hidden overflow-ellipsis">
                                            {item.firstName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 overflow-hidden overflow-ellipsis">
                                            {item.lastName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 overflow-hidden overflow-ellipsis">
                                            {item.phoneNumber}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 overflow-hidden overflow-ellipsis">
                                            {item.email}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        No Users available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>


        // <div className="flex">
        //     <div className="flex flex-col w-full">
        //         <SidebarAdmin />
        //         <NavbarAdmin />

        //         <div className="p-10">
        //             <h1 className="text-6xl font-bold mb-6">Users</h1>
        //             {/* for showing table */}
        //             <table className="min-w-full divide-y divide-gray-200">
        //                 <thead className="bg-gray-50">
        //                     <tr>
        //                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        //                             Profile Picture
        //                         </th>
        //                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        //                             First Name
        //                         </th>
        //                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        //                             Last Name
        //                         </th>
        //                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        //                             Phone Number
        //                         </th>
        //                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        //                             Email
        //                         </th>
        //                     </tr>
        //                 </thead>
        //                 <tbody className="bg-white divide-y divide-gray-200">
        //                     {users && users.length > 0 ? (
        //                         users.map((item) => (
        //                             <tr key={item._id}>
        //                                 <td className="px-6 py-4 whitespace-nowrap">
        //                                     <img
        //                                         src={item.userImage || defaultImage}
        //                                         className="w-16 h-16 object-cover"
        //                                     />
        //                                 </td>
        //                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 overflow-hidden overflow-ellipsis">
        //                                     {item.firstName}
        //                                 </td>
        //                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 overflow-hidden overflow-ellipsis">
        //                                     {item.lastName}
        //                                 </td>
        //                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 overflow-hidden overflow-ellipsis">
        //                                     {item.phoneNumber}
        //                                 </td>
        //                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 overflow-hidden overflow-ellipsis">
        //                                     {item.email}
        //                                 </td>
        //                             </tr>
        //                         ))
        //                     ) : (
        //                         <tr>
        //                             <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        //                                 No Users available
        //                             </td>
        //                         </tr>
        //                     )}
        //                 </tbody>
        //             </table>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Users
