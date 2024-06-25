import React, { useEffect, useState } from 'react';
import { getAllProductsApi } from '../../apis/Api';

const TryFetch = () => {
    const [products, setProducts] = useState([]); // State to store all products

    // Fetch all products on component mount
    useEffect(() => {
        getAllProductsApi().then((res) => {
            const productsData = res.data.products;
            setProducts(productsData);
        });
    }, []);

    return (
        <div>
            <div className='w-full bg-white fixed top-0 left-0 right-0 p-4 shadow-md z-50'>
                <h1 className="text-2xl font-bold">Formal Outfits</h1>
            </div>
            <div className="max-w-6xl mx-auto p-4 mt-20"> {/* Added mt-20 to push content below header */}
                <div className="space-y-6">
                    {products.map((item) => (
                        <div key={item._id} className="bg-white p-4 shadow rounded-lg flex">
                            <img src={item.productImageURL} alt={item.productName} className="w-1/4 rounded-lg" />
                            <div className="ml-4 flex-1">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">{item.productName}</h2>
                                    {item.available ? (
                                        <span className="text-green-500 font-bold">Available</span>
                                    ) : (
                                        <span className="text-red-500 font-bold">Unavailable</span>
                                    )}
                                </div>
                                <p className="text-gray-600">Rental Price NPR. {item.productRentalPrice} for 4 days</p>
                                <p className="text-gray-600">Security Deposit Rs. {item.productDeposit}</p>
                                <div className="flex items-center mt-2">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 .587l3.668 7.513 8.332 1.151-6.001 5.905 1.42 8.272L12 18.897l-7.419 4.031 1.42-8.272-6.001-5.905 8.332-1.151z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-700 mt-2">{item.productDescription}</p>
                                <a href={`/productDetails/${item._id}`} className="text-blue-500 mt-2 inline-block">View details</a>
                            </div>
                            <div className="flex items-center ml-4">
                                <button className="p-2 rounded-full border border-gray-300">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TryFetch;
