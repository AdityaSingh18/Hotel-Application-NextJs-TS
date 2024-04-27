import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Hotel {
  hotelName: string;
  hotelImageUrl: string;
  hotelDescription: string;
  hotelAddress: string;
  hotelCity: string;
  hotelCountry: string;
  hotelStarRating: string;
  hotelStartingPrice: string;
  hotelContactNumber: string;
  hotelEmailId: string;
}

interface Props {
  hotel: Hotel | null;
  hotelId: string;
}

const HotelDetails: React.FC<Props> = ({ hotel, hotelId }) => {
  const router = useRouter();
  console.log(hotelId);

  if (router.isFallback) {
    return <p>Loading hotel details...</p>;
  }

  if (!hotel) {
    return <p>Hotel not found</p>;
  }

  // Function to render star rating icons inline
  const renderStarRating = () => {
    const starRating = Math.floor(Number(hotel.hotelStarRating));
    const starIcons = [];

    for (let i = 0; i < starRating; i++) {
      starIcons.push(
        <svg
          key={i}
          className="h-5 w-5 fill-current mr-1 text-yellow-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 14.78l-3.32 2.41 1-3.12-2.78-2.03 3.67-.27L10 7l1.43 4.77 3.67.27-2.78 2.03 1 3.12z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    return <div className="flex items-center mb-2">{starIcons}</div>;
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{hotel.hotelName}</h1>
      <div className="flex justify-center mb-4">
        <img src={hotel.hotelImageUrl} alt={hotel.hotelName} className="w-full h-96 object-cover rounded-lg" />
      </div>
      <div className="text-gray-700 mb-4">
        <p className="mb-2">{hotel.hotelDescription}</p>
        <p className="mb-2">
          {hotel.hotelAddress}, {hotel.hotelCity}, {hotel.hotelCountry}
        </p>
        {renderStarRating()} {/* Render star rating icons inline */}
        <p className="text-sm text-gray-500">Starting Price: ₹{hotel.hotelStartingPrice}</p>
        <p className="text-sm text-gray-500">Contact: {hotel.hotelContactNumber}</p>
        <p className="text-sm text-gray-500">Email: {hotel.hotelEmailId}</p>

        {/* Use a styled button instead of an anchor tag */}
        <Link href={`/updatehotel/${encodeURIComponent(hotelId)}`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Click to Edit Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { hotelId } = params;
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/hotels/${hotelId}.json`);
    const hotel: Hotel = response.data;
    return { props: { hotel, hotelId } };
  } catch (error) {
    console.error('Error fetching hotel details:', error);
    return { props: { hotel: null } };
  }
}

export default HotelDetails;
