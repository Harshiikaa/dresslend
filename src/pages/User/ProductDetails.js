import { ArrowLeftIcon, HeartIcon, StarIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleProductApi } from '../../apis/Api';

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
            <div className='w-full flex justify-between bg-white fixed top-0 left-0 right-0 p-4 border-2 border-color: inherit z-50'>
                <div className='flex gap-2'>
                    <button
                        onClick={handleBackClick}
                        className="inline-flex items-center gap-2 rounded-md bg-gray-50 px-2 py-2 text-sm font-medium text-gray-700 shadow-sm  hover:bg-gray-100"
                    >
                        <ArrowLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </button>
                    {/* <div>
                        <h1 className="text-xl font-regular">Search Result for</h1>
                        <h1 className="text-2xl font-bold">Formal Outfits</h1>
                    </div> */}
                </div>

                <div className="max-w-6xl mx-auto p-4 mt-24 font-poppins">
                    <div className="bg-white p-4 border-2 border-gray-200 rounded-lg flex h-auto">
                        <img src={product.productImageURL} alt={product.productName} className="w-1/3 h-auto object-cover" />
                        <div className="ml-4 flex-1 flex flex-col justify-between">
                            <h2 className="text-2xl font-semibold">{product.productName}</h2>
                            <p className="text-customGray font-medium text-lg">
                                Rental Price <span className="font-bold text-gray-800">NPR. {product.productRentalPrice}</span> for 4 days
                            </p>
                            <p className="text-gray-600 font-light text-md">Security Deposit Rs. {product.productSecurityDeposit}</p>
                            <div className="flex items-center">
                                {[...Array(product.rating)].map((_, i) => (
                                    <StarIcon key={i} className="w-5 h-5 text-yellow-500" />
                                ))}
                            </div>
                            <p className="text-gray-600 font-regular text-md">{product.productDescription}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
