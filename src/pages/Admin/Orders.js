import React from 'react'
import { XIcon, ChevronDownIcon, TrashIcon, PencilIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import SidebarAdmin from '../../components/SidebarAdmin'
import NavbarAdmin from '../../components/NavbarAdmin'

const Orders = () => {
    return (
        <div>
            <div className="flex h-screen overflow-hidden">
                <SidebarAdmin />
                <div className="flex-1 flex flex-col">
                    <NavbarAdmin />
                    <div className="p-3 flex-1" >
                        <div className="flex flex-col w-full">
                            <div className="p-0">
                                <h1 className="text-4xl font-bold mb-2">Orders</h1>

                                {/* for showing table */}
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Product Image
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Product Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Rental Price
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Security Deposit
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Category
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Quantity
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Size
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Description
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    {/* <tbody className="bg-white divide-y divide-gray-200">
                                        {products && products.length > 0 ? (
                                            products.map((item) => (
                                                <tr key={item._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <img
                                                            src={item.productImageURL}
                                                            alt=""
                                                            className="w-16 h-16 object-cover"
                                                        />
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 overflow-hidden overflow-ellipsis">
                                                        {item.productName}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        NPR.{item.productRentalPrice}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        NPR.{item.productSecurityDeposit}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {item.productCategory}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
                                                        {item.productQuantity}
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {item.productSize}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 overflow-hidden overflow-ellipsis">
                                                        {item.productDescription.slice(0, 10)}
                                                    </td>
                                                    <td className="flex px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center space-x-2">
                                                        <Link to={`/productEdit/${item._id}`} className="text-green-600 hover:text-indigo-900">
                                                            <PencilIcon className="h-5 w-5" aria-hidden="true" />
                                                        </Link>
                                                        <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900">
                                                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    No products available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody> */}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Orders
