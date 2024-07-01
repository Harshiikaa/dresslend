import { ArrowLeftIcon, HeartIcon, StarIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleProductApi } from '../../apis/Api';
import SearchResult from '../../components/SearchResult';

const ProductDetails = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isDatepickerOpen, setIsDatepickerOpen] = useState(false);

    const handleDateClick = (date) => {
        if (!startDate || (startDate && endDate)) {
            setStartDate(date);
            setEndDate(null);
        } else if (startDate && !endDate && date > startDate) {
            setEndDate(date);
            setIsDatepickerOpen(false);
        }
    };

    const generateCalendar = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
        let date = 1;
        const rows = [];
        for (let i = 0; i < 6; i++) {
            const cells = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    cells.push(<td key={j} className="p-2 text-center"></td>);
                } else if (date > lastDate) {
                    break;
                } else {
                    cells.push(
                        <td key={j} className="p-2 text-center cursor-pointer" onClick={() => handleDateClick(date)}>
                            <span className={`block rounded-full w-8 h-8 flex items-center justify-center ${date === startDate ? 'bg-blue-500 text-white' : date === endDate ? 'bg-green-500 text-white' : ''}`}>
                                {date}
                            </span>
                        </td>
                    );
                    date++;
                }
            }
            rows.push(<tr key={i}>{cells}</tr>);
        }
        return rows;
    };

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

            <div className="max-w-6xl mx-auto p-2 font-poppins">
                <div className="space-y-2">
                    <div className="bg-white p-2 border-2 border-gray-200 rounded-lg flex h-300">
                        <img src={product.productImageURL} alt={product.productName} className="w-1/3 h-auto object-cover" />
                        <div className="ml-4 flex-1 flex flex-col justify-between font-poppins">
                            <div className='flex justify-between'>
                                <h2 className="text-2xl font-semibold">{product.productName}</h2>
                                <div className="flex items-start ml-4 p-3">
                                    <button className="p-2 rounded-lg border border-borderOutline bg-iconFill">
                                        <HeartIcon className="w-6 h-6 text-gray-400" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center">
                                {[...Array(product.rating)].map((_, i) => (
                                    <StarIcon key={i} className="w-5 h-5 text-yellow-500" />
                                ))}
                            </div>
                            <p className="text-customGray font-medium text-lg">
                                Rental Price <span className="font-bold text-gray-800">NPR. {product.productRentalPrice}</span> for 4 days
                            </p>
                            <p className="text-gray-600 font-light text-md">Security Deposit Rs. {product.productSecurityDeposit}</p>


                            {/* calender */}
                            <div className="relative inline-block">
                                <button onClick={() => setIsDatepickerOpen(!isDatepickerOpen)} className="flex items-center justify-between w-full border border-gray-300 p-3 rounded-lg shadow-sm">
                                    <span className="text-gray-600">{startDate && endDate ? `Selected Range: ${startDate} to ${endDate}` : 'Choose Date Range'}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 000 2h8a1 1 0 100-2H6zM4 5a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2H4zm1 2h10a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1zm3 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm-3 4a1 1 0 011-1h8a1 1 0 110 2H5a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {isDatepickerOpen && (
                                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
                                        <table className="w-full">
                                            <tbody>
                                                {generateCalendar()}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="text-gray-600 font-light text-md">Size: <span className="font-regular text-[#505050]">{product.productSize}</span></p>
                                <p className="text-gray-600 font-light text-md">Category: <span className="font-regular text-[#505050]">{product.productCategory}</span></p>
                                <p className="text-gray-600 font-light text-md">Available Quantity: <span className="font-regular text-[#505050]">{product.productQuantity}</span></p>
                            </div>
                            <div>
                                <h2 className="text-1xl font-medium font-poppins">Product Info</h2>
                                <p className="text-gray-600 font-regular text-md ">{product.productDescription}</p>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
