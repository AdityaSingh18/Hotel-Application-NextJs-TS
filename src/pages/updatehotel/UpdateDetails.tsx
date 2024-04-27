import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const UpdateHotel = ({ hotelId }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Fetch hotel details using hotelId
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/hotels/${hotelId}.json`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching hotel details:', error);
        alert('Update Hotel Failed')
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      // Send PUT request to update hotel data
      await axios.put(`${process.env.NEXT_PUBLIC_API_KEY}/hotels/${hotelId}.json`, formData);
      // Optionally, you can show a success message here
      alert('Hotel details updated successfully!');
      // Redirect to hotel details page after updating
      router.push(`/HotelsPage/${hotelId}`);
    } catch (error) {
      console.error('Error updating hotel details:', error);
      // Handle error (e.g., display error message to user)
      alert('Failed to update hotel details. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Update Hotel Details</h1>
      <form className="space-y-4">
      {Object.entries(formData).map(([key, value]) => (
  <label htmlFor={key} className="block" key={key}>
    {key.charAt(0).toUpperCase() + key.slice(1)}:
    {key === 'hotelDescription' ? (
      <textarea
        id={key}
        name={key}
        value={typeof value === 'string' ? value : ''}
        onChange={handleInputChange}
        className="mt-1 p-2 w-full border border-gray-300 rounded-md text-slate-600"
      />
    ) : (
      <input
        type={key === 'hotelStartingPrice' || key === 'hotelStarRating' ? 'number' : 'text'}
        id={key}
        name={key}
        value={typeof value === 'string' || typeof value === 'number' ? value : ''}
        onChange={handleInputChange}
        className="mt-1 p-2 w-full border border-gray-300 rounded-md text-slate-600"
      />
    )}
  </label>
))}

      </form>
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Update Hotel
      </button>
    </div>
  );
};

export default UpdateHotel;
