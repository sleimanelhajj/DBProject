import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
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
          withCredentials:true
        });
        console.log(sellerResponse)
        if (!sellerResponse.success) {
           console.log('not logged in handle it carefully')
        }

        setSeller(sellerResponse.user.id); // Correctly set the seller ID
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest({ method: "GET", route: "user/userProperties" ,params:{id:seller_id}});
        setProperties(response.properties); // kenit mish zabta la2enno object wrapped everything in property key, now works
        console.log(response)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); 
  // properties here is the array of objects with all the personal properties of the user
  return (
    <div className='mx-auto max-w-screen-lg'>
      <div className='flex justify-around gap-12 flex-wrap'>
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default UserProperties;
