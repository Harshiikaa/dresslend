import React, { useEffect, useState } from 'react'
import { createCategoryApi, deleteCategoryApi, getAllCategoriesApi } from '../../apis/Api'
import { XIcon, ChevronDownIcon, TrashIcon, PencilIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify'
import NavbarAdmin from '../../components/NavbarAdmin'

const Categories = () => {
    const [category, setCategory] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([])


    // Function to handle form submission
    const handleSumbit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('category', category)

        console.log(category)
        createCategoryApi(formData).then((res) => {
            if (res.data.success == false) {
                toast.error(res.data.message)
            } else {
                toast.success(res.data.message)
            }
        }).catch(err => {
            toast.error("Server Error")
            console.log(err.message)
        })
    }

    // get all products
    useEffect(() => {
        getAllCategoriesApi().then((res) => {
            const categoriesData = res.data.categories;
            console.log("Fetched categories:", categoriesData); // Add this log
            setCategories(categoriesData);
        }).catch(err => {
            console.log("Error fetching categories:", err.message); // Add this log
        });
    }, []);


    const handleDelete = (id) => {
        const confirmDialog = window.confirm('Are you sure, you want to delete this category?')
        if (!confirmDialog) {
            return;
        }
        else {
            deleteCategoryApi(id).then((res) => {
                if (res.data.success == true) {
                    window.location.reload()
                    toast.success(res.data.success)
                }
                else {
                    toast.error(res.data.message)
                }

            })
        }
    }


    return (
        <div className="flex">
            <div className="flex flex-col w-full">
                <NavbarAdmin />
                <div className="p-10">
                    <h1 className="text-6xl font-bold mb-6">Categories</h1>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setShowModal(true)}
                    >
                        Add Category +
                    </button>
                    {/* Modal */}
                    {showModal && (
                        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40 overflow-y-auto">
                            <div className="relative w-full max-w-md h-full md:h-auto">
                                <div className="bg-white rounded-3xl shadow relative">
                                    <div className="flex justify-end p-2">
                                        <button
                                            type="button"
                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <XIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <form className="space-y-2 px-6 lg:px-8 pb-2 sm:pb-6 xl:pb-8">
                                        <h3 className="text-3xl font-medium text-gray-900 text-center">
                                            Add Category
                                        </h3>

                                        {/* Category name */}
                                        <div className="relative mb-1">
                                            <label
                                                htmlFor="message"
                                                className="block mb-1 text-sm font-medium text-gray-900"
                                            >
                                                Category
                                            </label>
                                            <input
                                                onChange={(e) => setCategory(e.target.value)}
                                                type="Category"
                                                name="Category"
                                                id="Category"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                                placeholder="Enter Category Name"
                                                required
                                            />
                                        </div>
                                        {/* buttons */}
                                        <div className="flex justify-end gap-4 p-4 bg-gray-100">
                                            <button
                                                type="button"
                                                className="px-4 py-2 text-sm text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none"
                                                onClick={() => setShowModal(false)}                                            >
                                                Close
                                            </button>
                                            <button
                                                onClick={handleSumbit}
                                                type="button"
                                                className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:ring-4 focus:ring-blue-300"
                                            >
                                                Save changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* End Modal */}

                    {/* for showing table */}
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Categories
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {categories && categories.length > 0 ? (
                                <>
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            Rendering categories...
                                        </td>
                                    </tr>
                                    {categories.map((item) => (
                                        <tr key={item._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 overflow-hidden overflow-ellipsis">
                                                {item.category}
                                            </td>
                                            <td className="flex px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center space-x-2">
                                                <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900">
                                                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        No categories available
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default Categories
