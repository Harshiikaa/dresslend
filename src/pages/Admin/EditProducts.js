import React, { useEffect, Fragment, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleProductApi, updateProductApi } from '../../apis/Api';
import { Menu, Transition } from '@headlessui/react';
import { XIcon, ChevronDownIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const EditProducts = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [productName, setProductName] = useState('');
    const [productRentalPrice, setProductRentalPrice] = useState('');
    const [productSecurityDeposit, setProductSecurityDeposit] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productQuantity, setProductQuantity] = useState(1);
    const [productSize, setProductSize] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [oldImage, setOldImage] = useState(null);

    useEffect(() => {
        // Fetch product details from API when component mounts
        getSingleProductApi(id).then((res) => {
            const product = res.data.product;
            setProductName(product.productName);
            setProductRentalPrice(product.productRentalPrice);
            setProductSecurityDeposit(product.productSecurityDeposit);
            setProductCategory(product.productCategory);
            setProductQuantity(product.productQuantity);
            setProductSize(product.productSize);
            setProductDescription(product.productDescription);
            setProductImage(product.productImage);
            setOldImage(product.productImageURL);
        }).catch(err => {
            console.error('Error fetching product details:', err);
        });
    }, [id]);

    const handleIncrease = () => {
        setProductQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrease = () => {
        setProductQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setProductImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

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

        updateProductApi(id, formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message);
                    navigate('/products');
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                console.error('Error updating product:', err);
                toast.error('Server error');
            });
    };

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex justify-between items-center bg-gray-200 px-6 py-3">
                    <h3 className="text-2xl font-medium text-gray-900">Edit Product</h3>
                    <button
                        type="button"
                        className="text-gray-600 bg-transparent hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm p-2"
                        onClick={() => navigate('/products')}
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 sm:p-8">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="productName" className="block text-sm font-medium text-gray-900">Product Name</label>
                            <input
                                id="productName"
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                placeholder="Enter Product Name"
                                required
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label htmlFor="productRentalPrice" className="block text-sm font-medium text-gray-900">Rental Price</label>
                                <input
                                    id="productRentalPrice"
                                    type="text"
                                    value={productRentalPrice}
                                    onChange={(e) => setProductRentalPrice(e.target.value)}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    placeholder="Enter Rental Price"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="productSecurityDeposit" className="block text-sm font-medium text-gray-900">Security Deposit</label>
                                <input
                                    id="productSecurityDeposit"
                                    type="text"
                                    value={productSecurityDeposit}
                                    onChange={(e) => setProductSecurityDeposit(e.target.value)}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    placeholder="Enter Security Deposit"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {/* Category Dropdown */}
                            <div className="relative">
                                <label
                                    htmlFor="message"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Category
                                </label>
                                <Menu as="div" className="relative inline-block text-left w-full">
                                    <div>
                                        <Menu.Button className="inline-flex w-full gap-1 justify-between rounded-md bg-gray-50 px-2 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100">
                                            Select Category
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
                                                            // onClick={() => handleCategorySelect('Category 1')}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            Category 1
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>


                            {/* Quantity*/}
                            <div className="items-center">
                                <label
                                    htmlFor="message"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Quantity
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
                                        // onChange={(e) => setProductQuantity(e.target.value)}
                                        type="number"
                                        name="Quantity"
                                        id="Quantity"
                                        value={productQuantity}
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
                                            Select Size
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
                                        <Menu.Items className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            // onClick={() => handleSizeSelect('Free')}
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
                                                            // onClick={() => handleSizeSelect('Small')}
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
                                                            // onClick={() => handleSizeSelect('Medium')}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            Medium
                                                        </a>
                                                    )}
                                                </Menu.Item>

                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>

                        </div>

                        <div>
                            <label htmlFor="productDescription" className="block text-sm font-medium text-gray-900">Description</label>
                            <textarea
                                id="productDescription"
                                rows="4"
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                                placeholder="Write Description..."
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor="productImage" className="block text-sm font-medium text-gray-900">Upload Image</label>
                            <input
                                id="productImage"
                                type="file"
                                onChange={handleImageUpload}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            />
                            {previewImage && (
                                <img
                                    src={previewImage}
                                    alt="Product Preview"
                                    className="mt-2 object-cover rounded-lg h-32 w-32"
                                />
                            )}
                            {oldImage && (
                                <div className="mt-2">
                                    <h6 className="text-lg font-medium">Old Image</h6>
                                    <img
                                        src={oldImage}
                                        alt="Old Product"
                                        className="object-cover rounded-lg h-32 w-32"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                type="button"
                                className="px-4 py-2 text-sm text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none"
                                onClick={() => navigate('/products')}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProducts;
