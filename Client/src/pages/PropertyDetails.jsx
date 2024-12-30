import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { sendRequest } from "../config/request";
import axios from "axios";
//aljngaslgndas
const PropertyDetails = () => {
  const navigate = useNavigate(); // Initialize navigate
  const { id } = useParams(); // Extract the property ID
  const [property, setProperty] = useState(null);
  const [userData, setUser] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try { 
        const response = await sendRequest({ method: "GET", route: `property/details/${id}` });
       // console.log(response[0][0]);
        setProperty(response[0][0]); // Set the fetched property details
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };
    fetchPropertyDetails();
  }, [id]);


  useEffect(() => {

    const checkSession = async () => {
      try {
        const sellerResponse = await sendRequest({
          method: "GET",
          route: "/check-session",
          credentials: "include", // Include cookies
          withCredentials:true
        });
        if (!sellerResponse.success) {
           console.log('not logged in handle it carefully')
        }

        setUser(sellerResponse.user); // Correctly set the seller ID
        console.log(userData)

      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

    checkSession();
  }, []);

//  // Handle registration submission
//   const deleteProperty = async (x) => {
  
//     try {
//       const response = await axios.post(
//         'http://localhost:4000/deleteProperty', // Backend URL
//         {'propertyId':x},
//         { withCredentials: true }
//       );
  
//     navigate('/success')
//     } catch (error) {
//       console.error('Error during deletion:', error.response || error.message);

//     }
//   };

const reserveProperty= async (x,y) => {
  
      try {
        await axios.post(
          'http://localhost:4000/ReserveProperty', // Backend URL
          {'propertyId':x,'propertyType':y},
          { withCredentials: true }
        );
    
      navigate('/success')
      } catch (error) {
        console.error('Error during deletion:', error.response || error.message);
  
      }
    };
  
  return property ? (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md max-w-md mx-auto">
    <h2 className="text-2xl font-bold text-blue-600 mb-4">Property Details</h2>
    {/* <p><strong>ID:</strong>{property.id}</p> */}
    <p><strong>Type:</strong> {property.property_type}</p>
    <p><strong>Address:</strong> {property.address}</p>
    <p><strong>City:</strong> {property.city}</p>
    <p><strong>State:</strong> {property.state}</p>
    <p><strong>Zip Code:</strong>{property.zip_code}</p>
    <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
    <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
    <p><strong>Square Feet:</strong> {property.square_feet}</p>
    <p><strong>Price:</strong> {property.price}</p>
    <p><strong>Listing Date:</strong> {property.listing_date}</p>
    <p><strong>Description:</strong> {property.description}</p>
 
       <button 
          onClick={() => reserveProperty(property.id,property.property_type)}
          className="p-2 bg-primary text-white rounded-full hover:bg-secondary transition-colors flex items-center"
          aria-label="Next Regions"

        >Reserve Property
        </button>
        </div>
  
  ) : (
    <p>Loading property details...</p>
  );
};

export default PropertyDetails;
