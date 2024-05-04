import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { HotelInfoDetails } from '../../lib/HotelDetails'; // Importing the class from HotelDetails

const HotelForm: React.FC = () => {
  const [formData, setFormData] = useState<HotelInfoDetails>(new HotelInfoDetails());

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        hotelPaymentOption: {
          ...prevData.hotelPaymentOption,
          [name]: !prevData.hotelPaymentOption[name], // Toggle the value
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    // Update hotelSlugDetails whenever hotelName, hotelCity, hotelRegion, hotelState, or hotelCountry changes
    if (name === 'hotelName' || name === 'hotelCity' || name === 'hotelRegion' || name === 'hotelState' || name === 'hotelCountry') {
      updateSlug();
    }
  };
  
  const handleCheckboxChange = (name: string) => {
    setFormData((prevData) => ({
      ...prevData,
      hotelPaymentOption: {
        ...prevData.hotelPaymentOption,
        [name]: !prevData.hotelPaymentOption[name],
      },
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Send POST request to Firebase Realtime Database
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/hotels.json`, formData);

      console.log('Form data submitted:', formData);
      // Reset form after successful submission (if needed)
      resetForm();
      console.log('Firebase response:', response.data);
      alert('Hotel added successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add hotel');
      // Handle error (e.g., display error message to user)
    }
  };

  const updateSlug = () => {
    const { hotelName, hotelCity, hotelRegion, hotelState, hotelCountry } = formData;
    const slug = `${hotelName}-${hotelCity}-${hotelRegion}-${hotelState}-${hotelCountry}`;
    setFormData((prevData) => ({
      ...prevData,
      hotelSlugsDetails: {
        hotel: slug,
        hotelCity,
        hotelRegion,
        hotelState,
        hotelCountry,
      },
    }));
  };

  const resetForm = () => {
    setFormData(new HotelInfoDetails());
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
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
            placeholder="Enter Hotel Email Address"
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
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
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
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
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
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
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
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
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
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
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
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
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
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
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
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
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
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
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
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
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
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
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
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
            placeholder="Enter Hotel Pincode"
            required
          />
        </div>
        <div>
          <label htmlFor="hotelLongitude" className="block text-sm font-medium text-gray-700">
            Hotel Longitude
          </label>
          <input
            type="number"
            id="hotelLongitude"
            name="hotelLongitude"
            value={formData.hotelLongitude}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
            placeholder="Enter Hotel Longitude"
            required
          />
        </div>
        <div>
          <label htmlFor="hotelLatitude" className="block text-sm font-medium text-gray-700">
            Hotel Latitude
          </label>
          <input
            type="number"
            id="hotelLatitude"
            name="hotelLatitude"
            value={formData.hotelLatitude}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
            placeholder="Enter Hotel Latitude"
            required
          />
        </div>
        <div>
          <label htmlFor="hotelMapUrl" className="block text-sm font-medium text-gray-700">
            Hotel Map URL
          </label>
          <input
            type="text"
            id="hotelMapUrl"
            name="hotelMapUrl"
            value={formData.hotelMapUrl}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
            placeholder="Enter Hotel Map URL"
            required
          />
        </div>
        <div>
  <label htmlFor="postpaidPayment" className="block text-sm font-medium text-gray-700">
    Postpaid Payment
  </label>
  <input
    type="checkbox"
    id="postpaidPayment"
    name="postpaidPayment"
    checked={formData.hotelPaymentOption.postpaidPayment}
    onChange={() => handleCheckboxChange('postpaidPayment')}
    className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
  />
</div>
<div>
  <label htmlFor="prepaidPayment" className="block text-sm font-medium text-gray-700">
    Prepaid Payment
  </label>
  <input
    type="checkbox"
    id="prepaidPayment"
    name="prepaidPayment"
    checked={formData.hotelPaymentOption.prepaidPayment}
    onChange={() => handleCheckboxChange('prepaidPayment')}
    className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
  />
</div>
<div>
  <label htmlFor="partialPayment" className="block text-sm font-medium text-gray-700">
    Partial Payment
  </label>
  <input
    type="checkbox"
    id="partialPayment"
    name="partialPayment"
    checked={formData.hotelPaymentOption.partialPayment}
    onChange={() => handleCheckboxChange('partialPayment')}
    className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
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