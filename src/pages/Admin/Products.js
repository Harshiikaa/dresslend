import React, { useState, Fragment, useEffect } from 'react';
import NavbarAdmin from '../../components/NavbarAdmin';
import { XIcon, ChevronDownIcon, TrashIcon, PencilIcon } from '@heroicons/react/outline';
import { Menu, Transition } from '@headlessui/react';
import { createProductApi, deleteProductApi, getAllCategoriesApi, getAllProductsApi } from '../../apis/Api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import SidebarAdmin from '../../components/SidebarAdmin';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Products = ({ isOpen, onClose }) => {

    const handleIncrease = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };
    const handleDecrease = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    // State management
    const [productName, setProductName] = useState('');
    const [productRentalPrice, setProductRentalPrice] = useState('');
    const [productSecurityDeposit, setProductSecurityDeposit] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Category');
    const [productQuantity, setProductQuantity] = useState(1);
    const [productSize, setProductSize] = useState('');
    const [selectedSize, setSelectedSize] = useState('Size');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // Fetch categories
    useEffect(() => {
        getAllCategoriesApi().then((res) => {
            const categoriesData = res.data.categories;
            console.log("Fetched categories:", categoriesData);
            setCategories(categoriesData);
        }).catch(err => {
            console.log("Error fetching categories:", err.message);
        });
    }, []);

    // Handle category select
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setProductCategory(category);
        console.log(`Selected category: ${category}`);
    };

    // Handle size select
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        setProductSize(size);
        console.log(`Selected size: ${size}`);
    };

    // Image upload and preview
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setProductImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    // Form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productRentalPrice', productRentalPrice);
        formData.append('productSecurityDeposit', productSecurityDeposit);
        formData.append('productCategory', productCategory);
        formData.append('productQuantity', productQuantity);
        formData.append('productSize', productSize);
        formData.append('productDescription', productDescription);
        formData.append('productImage', productImage);

        createProductApi(formData).then((res) => {
            if (!res.data.success) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
            }
        }).catch(err => {
            toast.error("Server Error");
            console.log(err.message);
        });
    };

    // Fetch all products
    useEffect(() => {
        getAllProductsApi().then((res) => {
            const productsData = res.data.products;
            setProducts(productsData);
        });
    }, []);

    // Handle product deletion
    const handleDelete = (id) => {
        const confirmDialog = window.confirm('Are you sure, you want to delete this product?');
        if (!confirmDialog) {
            return;
        }
        deleteProductApi(id).then((res) => {
            if (res.data.success) {
                window.location.reload();
                toast.success(res.data.message);
                setShowModal(false); // Close the modal on successful category creation
                window.location.reload();
            } else {
                toast.error(res.data.message);
            }
        });
    };


    return (
        <div className="flex h-screen overflow-hidden">
            <SidebarAdmin />
            <div className="flex-1 flex flex-col">
                <NavbarAdmin />
                <div className="p-3 flex-1" >
                    <div className="flex flex-col w-full">
                        <div className="p-0">
                            <h1 className="text-4xl font-bold mb-2">Products</h1>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                                onClick={() => setShowModal(true)}
                            >
                                Add Products +
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
                                                    Add Products
                                                </h3>

                                                {/* Product name */}
                                                <div className="relative mb-1">
                                                    <label
                                                        htmlFor="message"
                                                        className="block mb-1 text-sm font-medium text-gray-900"
                                                    >
                                                        Product Name
                                                    </label>
                                                    <input
                                                        onChange={(e) => setProductName(e.target.value)}
                                                        type="Product"
                                                        name="Product"
                                                        id="Product"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                                        placeholder="Enter Product Name"
                                                        required
                                                    />
                                                </div>



                                                {/* Rental Price and Security Deposit */}
                                                <div className="flex gap-1 justify-between">
                                                    <div className="relative">
                                                        <label
                                                            htmlFor="message"
                                                            className="block mb-2 text-sm font-medium text-gray-900"
                                                        >
                                                            Rental Price
                                                        </label>
                                                        <input
                                                            onChange={(e) => setProductRentalPrice(e.target.value)}
                                                            type="text"
                                                            name="Rental Price"
                                                            id="Rental Price"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                            placeholder="Enter Rental Price"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="relative">
                                                        <label
                                                            htmlFor="message"
                                                            className="block mb-2 text-sm font-medium text-gray-900"
                                                        >
                                                            Security Deposit
                                                        </label>
                                                        <input
                                                            onChange={(e) => setProductSecurityDeposit(e.target.value)}
                                                            type="text"
                                                            name="Security Deposit"
                                                            id="Security Deposit"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                            placeholder="Enter Security Deposit"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                {/* Category, Quantity and Size */}
                                                <div className='flex gap-1 justify-between'>
                                                    {/* Category Dropdown */}
                                                    <div className="relative">
                                                        <label
                                                            htmlFor="category"
                                                            className="block mb-2 text-sm font-medium text-gray-900"
                                                        >
                                                            Category
                                                        </label>
                                                        <Menu as="div" className="relative inline-block text-left w-full">
                                                            <div>
                                                                <Menu.Button className="inline-flex w-full gap-1 justify-between rounded-md bg-gray-50 px-2 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100">
                                                                    {selectedCategory}
                                                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                </Menu.Button>
                                                            </div>
                                                            <Transition
                                                                as={Fragment}
                                                                enter="transition ease-out duration-100"
                                                                enterFrom="transform opacity-0 scale-95"
                                                                enterTo="transform opacity-100 scale-100"
                                                                leave="transition ease-in duration-75"
                                                                leaveFrom="transform opacity-100 scale-100"
                                                                leaveTo="transform opacity-0 scale-95"
                                                            >
                                                                <Menu.Items className="absolute z-10 mt-2 w-full text-xs origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                    <div className="py-1">
                                                                        {categories.map((category) => (
                                                                            <Menu.Item key={category.category}>
                                                                                {({ active }) => (
                                                                                    <a
                                                                                        onClick={() => handleCategorySelect(category.category)}
                                                                                        className={classNames(
                                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                            'block px-4 py-2 text-sm w-full text-left'
                                                                                        )}
                                                                                    >
                                                                                        {category.category}
                                                                                    </a>
                                                                                )}
                                                                            </Menu.Item>
                                                                        ))}
                                                                    </div>
                                                                </Menu.Items>
                                                            </Transition>
                                                        </Menu>
                                                    </div>

                                                    {/* <div className="relative">
                                                        <label
                                                            htmlFor="message"
                                                            className="block mb-2 text-sm font-medium text-gray-900"
                                                        >
                                                            Category
                                                        </label>
                                                        <Menu as="div" className="relative inline-block text-left w-full">
                                                            <div>
                                                                <Menu.Button className="inline-flex w-full gap-1 justify-between rounded-md bg-gray-50 px-2 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100">
                                                                    {selectedCategory}
                                                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                </Menu.Button>
                                                            </div>

                                                            <Transition
                                                                as={Fragment}
                                                                enter="transition ease-out duration-100"
                                                                enterFrom="transform opacity-0 scale-95"
                                                                enterTo="transform opacity-100 scale-100"
                                                                leave="transition ease-in duration-75"
                                                                leaveFrom="transform opacity-100 scale-100"
                                                                leaveTo="transform opacity-0 scale-95"
                                                            >
                                                                <Menu.Items className="absolute z-10 mt-2 w-full text-xs origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                    <div className="py-1">
                                                                        {categories.map((category) => (
                                                                            <Menu.Item key={category.category}>
                                                                                {({ active }) => (
                                                                                    <button
                                                                                        onClick={() => handleCategorySelect(category.name)}
                                                                                        className={classNames(
                                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                            'block px-4 py-2 text-sm w-full text-left'
                                                                                        )}
                                                                                    >
                                                                                        {category.category}
                                                                                    </button>
                                                                                )}
                                                                            </Menu.Item>
                                                                        ))}
                                                                    </div>
                                                                </Menu.Items>

                                                            </Transition>
                                                        </Menu>
                                                    </div> */}


                                                    {/* Quantity*/}
                                                    <div className="items-center">
                                                        <label
                                                            htmlFor="message"
                                                            className="block mb-2 text-sm font-medium text-gray-900"
                                                        >
                                                            Stock Quantity
                                                        </label>
                                                        <div className='flex'>
                                                            <button
                                                                type="button"
                                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-l"
                                                                onClick={handleDecrease}
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                onChange={(e) => setProductQuantity(e.target.value)}
                                                                type="number"
                                                                name="Quantity"
                                                                id="Quantity"
                                                                value={quantity}
                                                                className="w-10 h-8 text-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-none focus:ring-blue-500 focus:border-blue-500 block text-center"
                                                            />
                                                            <button
                                                                type="button"
                                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-r"
                                                                onClick={handleIncrease}
                                                            >
                                                                +
                                                            </button>
                                                        </div>

                                                    </div>

                                                    {/* Size Dropdown */}
                                                    <div className="relative">
                                                        <label
                                                            htmlFor="message"
                                                            className="block mb-2 text-sm font-medium text-gray-900"
                                                        >
                                                            Size
                                                        </label>
                                                        <Menu as="div" className="relative inline-block text-left w-full">
                                                            <div>
                                                                <Menu.Button className="inline-flex w-full gap-1 justify-between rounded-md bg-gray-50 px-2 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100">
                                                                    {selectedSize}
                                                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                </Menu.Button>
                                                            </div>

                                                            <Transition
                                                                as={Fragment}
                                                                enter="transition ease-out duration-100"
                                                                enterFrom="transform opacity-0 scale-95"
                                                                enterTo="transform opacity-100 scale-100"
                                                                leave="transition ease-in duration-75"
                                                                leaveFrom="transform opacity-100 scale-100"
                                                                leaveTo="transform opacity-0 scale-95"
                                                            >
                                                                <Menu.Items className="absolute z-10 mt-2 w-full text-xs origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                    <div className="py-1">
                                                                        <Menu.Item>
                                                                            {({ active }) => (
                                                                                <a
                                                                                    href="#"
                                                                                    onClick={() => handleSizeSelect('Free', 'Free')}
                                                                                    className={classNames(
                                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                        'block px-4 py-2 text-sm'
                                                                                    )}
                                                                                >
                                                                                    Free
                                                                                </a>
                                                                            )}
                                                                        </Menu.Item>
                                                                        <Menu.Item>
                                                                            {({ active }) => (
                                                                                <a
                                                                                    href="#"
                                                                                    onClick={() => handleSizeSelect('Small', 'Small')}
                                                                                    className={classNames(
                                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                        'block px-4 py-2 text-sm'
                                                                                    )}
                                                                                >
                                                                                    Small
                                                                                </a>
                                                                            )}
                                                                        </Menu.Item>
                                                                        <Menu.Item>
                                                                            {({ active }) => (
                                                                                <a
                                                                                    href="#"
                                                                                    onClick={() => handleSizeSelect('Medium', 'Medium')}
                                                                                    className={classNames(
                                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                        'block px-4 py-2 text-sm'
                                                                                    )}
                                                                                >
                                                                                    Medium
                                                                                </a>
                                                                            )}
                                                                        </Menu.Item>
                                                                        <Menu.Item>
                                                                            {({ active }) => (
                                                                                <a
                                                                                    href="#"
                                                                                    onClick={() => handleSizeSelect('Large', 'Large')}
                                                                                    className={classNames(
                                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                        'block px-4 py-2 text-sm'
                                                                                    )}
                                                                                >
                                                                                    Large
                                                                                </a>
                                                                            )}
                                                                        </Menu.Item>

                                                                        <Menu.Item>
                                                                            {({ active }) => (
                                                                                <a
                                                                                    href="#"
                                                                                    onClick={() => handleSizeSelect('ExtraLarge', 'ExtraLarge')}
                                                                                    className={classNames(
                                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                        'block px-4 py-2 text-sm'
                                                                                    )}
                                                                                >
                                                                                    Extra Large
                                                                                </a>
                                                                            )}
                                                                        </Menu.Item>

                                                                    </div>
                                                                </Menu.Items>
                                                            </Transition>
                                                        </Menu>
                                                    </div>
                                                </div>

                                                {/* Descrption */}
                                                <div>
                                                    <label
                                                        htmlFor="message"
                                                        className="block mb-2 text-sm font-medium text-gray-900"
                                                    >
                                                        Description
                                                    </label>
                                                    <textarea
                                                        onChange={(e) => setProductDescription(e.target.value)}

                                                        id="message"
                                                        rows="4"
                                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                                                        placeholder="Write Decription..."
                                                    ></textarea>
                                                </div>

                                                {/* file upload */}
                                                <div>
                                                    <label
                                                        className="block mb-2 text-sm font-medium text-gray-900"
                                                        htmlFor="file_input"
                                                    >
                                                        Upload Images
                                                    </label>
                                                    <input
                                                        onChange={handleImageUpload}
                                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                                        id="file_input"
                                                        type="file"
                                                    />
                                                    {
                                                        previewImage && (
                                                            <img
                                                                src={previewImage}
                                                                className='img-fluid rounded-3 object-fit-cover mt-2'
                                                                alt='Preview'
                                                            />
                                                        )
                                                    }
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
                                                        onClick={handleSubmit}
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
                            <div className="relative">
                                <div className="overflow-x-auto overflow-y-auto max-h-96">
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
                                                    Action
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

                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
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
                                                        <td className="flex px-6 py-4 whitespace-nowrap text-sm font-medium justify-center space-x-2">
                                                            <Link to={`/admin/productEdit/${item._id}`} className="text-green-600 hover:text-indigo-900">
                                                                <PencilIcon className="h-5 w-5" aria-hidden="true" />
                                                            </Link>
                                                            <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900">
                                                                <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                                            </button>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {item.productCategory}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {item.productQuantity}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {item.productSize}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 overflow-hidden overflow-ellipsis">
                                                            {item.productDescription.slice(0, 10)}
                                                        </td>

                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="9" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        No products available
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
