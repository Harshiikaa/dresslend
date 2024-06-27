import { ArrowLeftIcon, HeartIcon, StarIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleProductApi } from '../../apis/Api';
import SearchResult from '../../components/SearchResult';

const ProductDetails = () => {

    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const [product, setProduct] = useState({
        productName: '',
        productRentalPrice: '',
        productSecurityDeposit: '',
        productCategory: '',
        productQuantity: '',
        productSize: '',
        productDescription: '',
        productImageURL: null,
    });


    useEffect(() => {
        getSingleProductApi(id).then((res) => {
            const user = res.data.product.userID;
            setProduct({
                productName: res.data.product.productName,
                productRentalPrice: res.data.product.productRentalPrice,
                productSecurityDeposit: res.data.product.productSecurityDeposit,
                productCategory: res.data.product.productCategory,
                productQuantity: res.data.product.productQuantity,
                productSize: res.data.product.productSize,
                productDescription: res.data.product.productDescription,
                productImageURL: res.data.product.productImageURL,

            });


            // setReview(res.data.product.review);

        });

    }, [id]);


    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // This navigates to the previous page

        if (!product) return <div>Loading...</div>;

    };
    return (
        <div>
            <div>
                {/* <div className='w-full flex justify-between bg-white fixed top-0 left-0 right-0 p-4 inherit z-50'> */}
                <div className='flex gap-2'>
                    <button
                        onClick={handleBackClick}
                        className="inline-flex items-center gap-2 rounded-md bg-gray-50 px-2 py-2 text-sm ring-inset ring-gray-300 hover:bg-gray-100"
                    >
                        <ArrowLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </button>
                </div>
                {/* </div> */}
            </div>

            <div className="max-w-6xl mx-auto p-2 font-poppins"> {/* Added mt-20 to push content below header */}
                <div className="space-y-2">
                    <div className="bg-white p-4 border-2 border-gray-200 rounded-lg flex h-auto">
                        <img src={product.productImageURL} alt={product.productName} className="w-1/3 h-auto object-cover" />
                        <div className="ml-4 flex-1 flex flex-col justify-between">
                            <h2 className="text-2xl font-semibold">{product.productName}</h2>
                            <div className="flex items-center">
                                {[...Array(product.rating)].map((_, i) => (
                                    <StarIcon key={i} className="w-5 h-5 text-yellow-500" />
                                ))}
                            </div>
                            <p className="text-customGray font-medium text-lg">
                                Rental Price <span className="font-bold text-gray-800">NPR. {product.productRentalPrice}</span> for 4 days
                            </p>
                            <p className="text-gray-600 font-light text-md">Security Deposit Rs. {product.productSecurityDeposit}</p>

                            <p className="text-gray-600 font-regular text-md">{product.productDescription}</p>
                            <p className="text-gray-600 font-light text-md">Size: {product.productSize}</p>
                            <p className="text-gray-600 font-light text-md">Category: {product.productCategory}</p>
                            <p className="text-gray-600 font-light text-md">Available Quantity: {product.productQuantity}</p>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
