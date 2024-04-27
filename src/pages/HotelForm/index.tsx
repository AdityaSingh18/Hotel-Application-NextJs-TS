import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface FormData {
  hotelName: string;
  hotelEmailId: string;
  hotelContactNumber: string;
  hotelLandmark: string;
  hotelAddress: string;
  hotelStartingPrice: string;
  hotelDescription: string;
  hotelStarRating: string;
  hotelImageUrl: string;
  hotelState: string;
  hotelCity: string;
  hotelCountry: string;
  hotelRegion: string;
  hotelPincode: string;
}

const HotelForm: React.FC = () => {
  const [formData, setFormData] = useState
  <{
    hotelName: '',
    hotelEmailId: '',
    hotelContactNumber: '',
    hotelLandmark: '',
    hotelAddress: '',
    hotelStartingPrice: '',
    hotelDescription: '',
    hotelStarRating: '',
    hotelImageUrl: '',
    hotelState: '',
    hotelCity: '',
    hotelCountry: '',
    hotelRegion: '',
    hotelPincode: '',
  }>({
    hotelName: '',
    hotelEmailId: '',
    hotelContactNumber: '',
    hotelLandmark: '',
    hotelAddress: '',
    hotelStartingPrice: '',
    hotelDescription: '',
    hotelStarRating: '',
    hotelImageUrl: '',
    hotelState: '',
    hotelCity: '',
    hotelCountry: '',
    hotelRegion: '',
    hotelPincode: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Send POST request to Firebase Realtime Database
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/hotels.json`, formData);

      console.log('Form data submitted:', formData);
      // Reset form after successful submission (if needed)
      setFormData({
        hotelName: '',
        hotelEmailId: '',
        hotelContactNumber: '',
        hotelLandmark: '',
        hotelAddress: '',
        hotelStartingPrice: '',
        hotelDescription: '',
        hotelStarRating: '',
        hotelImageUrl: '',
        hotelState: '',
        hotelCity: '',
        hotelCountry: '',
        hotelRegion: '',
        hotelPincode: '',
      });

      console.log('Firebase response:', response.data);
      alert('Hotel added successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add hotel');
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <div className="p-4">
    <h2 className="text-xl font-semibold mb-4">Add New Hotel</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="hotelName" className="block text-sm font-medium text-gray-700">
          Hotel Name
        </label>
        <input
          type="text"
          id="hotelName"
          name="hotelName"
          value={formData.hotelName}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
          placeholder="Enter Hotel Name"
          required
        />
      </div>
      <div>
        <label htmlFor="hotelEmailId" className="block text-sm font-medium text-gray-700">
          Hotel Email Address
        </label>
        <input
          type="email"
          id="hotelEmailId"
          name="hotelEmailId"
          value={formData.hotelEmailId}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md  text-black"
          placeholder="Enter Hotel Email"
          required
        />
      </div>
      <div>
        <label htmlFor="hotelContactNumber" className="block text-sm font-medium text-gray-700">
          Hotel Contact Number
        </label>
        <input
          type="tel"
          id="hotelContactNumber"
          name="hotelContactNumber"
          value={formData.hotelContactNumber}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md  text-black"
          placeholder="Enter Hotel Contact Number"
          required
        />
      </div>
      <div>
        <label htmlFor="hotelLandmark" className="block text-sm font-medium text-gray-700">
          Hotel Landmark
        </label>
        <input
          type="text"
          id="hotelLandmark"
          name="hotelLandmark"
          value={formData.hotelLandmark}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md  text-black"
          placeholder="Enter Hotel Landmark"
          required
        />
      </div>
      <div>
        <label htmlFor="hotelAddress" className="block text-sm font-medium text-gray-700">
          Hotel Address
        </label>
        <textarea
          id="hotelAddress"
          name="hotelAddress"
          value={formData.hotelAddress}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md  text-black"
          placeholder="Enter Hotel Address"
          required
        />
      </div>
      <div>
        <label htmlFor="hotelStartingPrice" className="block text-sm font-medium text-gray-700">
          Hotel Starting Price
        </label>
        <input
          type="number"
          id="hotelStartingPrice"
          name="hotelStartingPrice"
          value={formData.hotelStartingPrice}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md  text-black"
          placeholder="Enter Hotel Starting Price"
          required
        />
      </div>
      <div>
        <label htmlFor="hotelDescription" className="block text-sm font-medium text-gray-700">
          Hotel Description
        </label>
        <textarea
          id="hotelDescription"
          name="hotelDescription"
          value={formData.hotelDescription}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md  text-black"
          placeholder="Enter Hotel Description"
          required
        />
      </div>
      <div>
        <label htmlFor="hotelStarRating" className="block text-sm font-medium text-gray-700">
          Hotel Star Rating
        </label>
        <input
          type="number"
          id="hotelStarRating"
          name="hotelStarRating"
          value={formData.hotelStarRating}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md  text-black"
          placeholder="Enter Hotel Star Rating"
          required
        />
      </div>
      <div>
        <label htmlFor="hotelImageUrl" className="block text-sm font-medium text-gray-700">
          Hotel Image URL
        </label>
        <input
          type="text"
          id="hotelImageUrl"
          name="hotelImageUrl"
          value={formData.hotelImageUrl}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md  text-black"
          placeholder="Enter Hotel Image URL"
          required
        />
      </div>
      <div>
        <label htmlFor="hotelState" className="block text-sm font-medium text-gray-700">
          Hotel State
        </label>
        <input
          type="text"
          id="hotelState"
          name="hotelState"
          value={formData.hotelState}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md  text-black"
          placeholder="Enter Hotel State"
          required
        />
      </div>
      <div>
        <label htmlFor="hotelCity" className="block text-sm font-medium text-gray-700">
          Hotel City
        </label>
        <input
          type="text"
          id="hotelCity"
          name="hotelCity"
          value={formData.hotelCity}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md  text-black"
          placeholder="Enter Hotel City"
          required
        />
      </div>
      <div>
        <label htmlFor="hotelCountry" className="block text-sm font-medium text-gray-700">
          Hotel Country
        </label>
        <input
          type="text"
          id="hotelCountry"
          name="hotelCountry"
          value={formData.hotelCountry}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md  text-black"
          placeholder="Enter Hotel Country"
          required
        />
      </div>
      <div>
        <label htmlFor="hotelRegion" className="block text-sm font-medium text-gray-700">
          Hotel Region
        </label>
        <input
          type="text"
          id="hotelRegion"
          name="hotelRegion"
          value={formData.hotelRegion}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md  text-black"
          placeholder="Enter Hotel Region"
          required
        />
      </div>
      <div>
        <label htmlFor="hotelPincode" className="block text-sm font-medium text-gray-700">
          Hotel Pincode
        </label>
        <input
          type="text"
          id="hotelPincode"
          name="hotelPincode"
          value={formData.hotelPincode}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md  text-black"
          placeholder="Enter Hotel Pincode"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  </div>
  );
};

export default HotelForm;
