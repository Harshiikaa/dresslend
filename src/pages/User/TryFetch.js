import React, { useEffect, useState } from 'react'
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
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {products.map((item) => (
                    <div key={item._id} className="mb-4">
                        <a href={`/productDetails/${item._id}`} className="no-underline text-inherit">
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <img src={item.productImageURL} className="w-full h-48 object-cover" alt={`Card logo for ${item.productName}`} />
                                <div className="p-4">
                                    <h5 className="text-xl font-bold mb-2">{item.productName}</h5>
                                    <p className="text-gray-700 text-base">NPR. {item.productRentalPrice}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default TryFetch
