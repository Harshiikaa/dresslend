import React, { useEffect, useState } from 'react';
import { getFavoritesByUserIDApi } from '../../apis/Api';
import { ArrowLeftIcon, HeartIcon as OutlineHeartIcon, StarIcon } from '@heroicons/react/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';

const Favorites = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  console.log("User id is: ", user._id)

  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const validAverageRating = Number.isFinite(averageRating) && averageRating >= 0 && averageRating <= 5 ? averageRating : 0;

  useEffect(() => {
    getFavoritesByUserIDApi(user._id)
      .then((res) => {
        console.log("API Response:", res.data);
        setFavorites(res.data.favorites);
        localStorage.setItem('favoritesCount', res.data.favorites.length); // Store the count in local storage
      })
      .catch(err => {
        toast.error("Server Error");
        console.log(err.message);
      });
  }, [user._id]);

  console.log(favorites);

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="mt-8">
        <div className='w-full font-poppins flex justify-between bg-white top-0 left-0 right-0 p-4 inherit z-50'>
          <div className='flex gap-2'>
            <button
              onClick={handleBackClick}
              className="inline-flex items-center gap-2 rounded-md bg-gray-50 px-2 py-2 text-sm ring-inset ring-gray-300 hover:bg-gray-100"
            >
              <ArrowLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">My Favorites</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-2 font-poppins">
        {favorites.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">No items in favorites.</p>
        ) : (
          <div className="space-y-2">
            {favorites.map((item) => (
              <div key={item._id} className="bg-white p-2 border-2 border-color: inherit rounded-lg flex h-60">
                <img src={item.productID.productImageURL} alt={item.productName} className="w-1/6 h-55 object-fit" />
                <div className="ml-4 flex-1 flex flex-col justify-between">
                  <div className='p-4 space-y-4'>
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">{item.productID.productName}</h2>
                    </div>
                    <p className="text-customGray font-medium text-sm">
                      Rental Price <span className="font-bold text-gray-800">NPR. {item.productID.productRentalPrice}</span> for 4 days
                    </p>
                    <p className="text-gray-600 font-light text-xs">Security Deposit Rs. {item.productID.productSecurityDeposit}</p>
                    <div className="flex space-x-1 items-center">
                      {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                          <label key={index} className="cursor-pointer">
                            <FaStar
                              size={24}
                              className={ratingValue <= (hover || validAverageRating) ? 'text-yellow-500' : 'text-gray-300'}
                            // onMouseEnter={() => setHover(ratingValue)}
                            // onMouseLeave={() => setHover(null)}
                            />
                          </label>
                        );
                      })}
                      <span className="ml-2 text-gray-600">({ratingCount} reviews)</span>
                    </div>
                    <p className="text-gray-600 font-regular text-sm">{item.productID.productDescription}</p>
                    <a href={`/productDetails/${item.productID._id}`} className="text-blue-500 mt-2 inline-block font-medium text-xs">View details</a>
                  </div>
                </div>

                <div className="flex items-start ml-4 p-3">
                  <button
                    className={`p-2 rounded-lg border border-borderOutline`}
                  >
                    {isFavorite ? (
                      <SolidHeartIcon className="w-6 h-6 text-red-600" aria-hidden="true" />
                    ) : (
                      <OutlineHeartIcon className="w-6 h-6 text-gray-400" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites;
