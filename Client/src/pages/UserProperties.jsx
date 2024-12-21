import React, { useState, useEffect } from 'react';
import PropertyCardSeller from '../components/PropertyCardSeller';
import { sendRequest } from "../config/request";

const UserProperties = () => {
  const [properties, setProperties] = useState([]);
  const [seller_id, setSeller] = useState(null);

  // Check session and set seller ID
  useEffect(() => {
    const checkSession = async () => {
      try {
        const sellerResponse = await sendRequest({
          method: "GET",
          route: "/check-session",
          credentials: "include", // Include cookies
          withCredentials: true,
        });

        console.log("Check Session Response:", sellerResponse);

        if (sellerResponse.success && sellerResponse.user?.id) {
          setSeller(sellerResponse.user.id); // Set seller ID
        } else {
          console.warn("User not logged in or invalid session.");
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

    checkSession();
  }, []);

  // Fetch properties when `seller_id` is set
  useEffect(() => {
    if (!seller_id) return; // Wait until `seller_id` is set

    const fetchData = async () => {
      try {
        const response = await sendRequest({
          method: "GET",
          route: "/getAliYassine",
          params: { id: seller_id }, // Use `seller_id` in params
        });

        console.log("Fetch Properties Response:", response);

        if (response.properties) {
          setProperties(response.properties);
        } else {
          console.warn("Unexpected response format from /getAliYassine.");
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, [seller_id]); // Run this effect when `seller_id` changes
  // const handleDeleteProperty = async (id) => {
  //   console.log(id)
  //   try {
  //     const response = await sendRequest({
  //       method: "POST",
  //       route: "/deleteProperty",
  //       body: { aliyassine:id }, // Include the property ID in the request body

  //     });
  
  //     if (response.success) {
  //       setProperties((prevProperties) =>
  //         prevProperties.filter((property) => property.id !== id)
  //       );
  //       console.log("Property deleted successfully.");
  //     } else {
  //       console.warn("Failed to delete property:", response.message);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting property:", error);
  //   }
  // };
  
  return (
    <div className='mx-auto max-w-screen-lg'>
      <div className='flex justify-around gap-12 flex-wrap'>
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCardSeller key={property.id} property={property} />
          ))
        ) : (
          <div>No properties found.</div>
        )}
      </div>
    </div>
  );
};

export default UserProperties;
