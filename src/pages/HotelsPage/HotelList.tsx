import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'; // Import Link from next/link package

const HotelList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/hotels.json`);
        if (response && response.data && typeof response.data === 'object') {
          const dataKeys = Object.keys(response.data);
          const hotelArray = dataKeys.map((key) => ({
            id: key,
            ...response.data[key]
          }));
          setHotels(hotelArray);
        } else {
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Hotels</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-lg shadow-md p-4">
            <Link href={`/HotelsPage/${encodeURIComponent(hotel.id)}`}>
              <div>
                <img src={hotel.hotelImageUrl} alt={hotel.hotelName} className="w-full h-40 object-cover mb-4 rounded-lg" />
                <h2 className="text-xl font-semibold mb-2 text-slate-900">{hotel.hotelName}</h2>
                <p className="text-gray-700 mb-2">{hotel.hotelDescription}</p>
                <p className="text-gray-500 mb-2">{hotel.hotelAddress}, {hotel.hotelCity}, {hotel.hotelCountry}</p>
                <div className="flex items-center">
                  {hotel.hotelStarRating && !isNaN(hotel.hotelStarRating) && (
                    <span className="text-yellow-500 flex">
                      {Array.from({ length: Math.floor(Number(hotel.hotelStarRating)) }).map((_, index) => (
                        <svg
                          key={index}
                          className="h-5 w-5 fill-current mr-1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 14.78l-3.32 2.41 1-3.12-2.78-2.03 3.67-.27L10 7l1.43 4.77 3.67.27-2.78 2.03 1 3.12z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </span>
                  )}
                  {hotel.hotelStarRating && !isNaN(hotel.hotelStarRating) && (
                    <span className="text-gray-600 ml-2">{Number(hotel.hotelStarRating).toFixed(1)}</span>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
