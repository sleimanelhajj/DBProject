// import React, { useState, useEffect } from "react";
// import { sendRequest } from "../config/request";
// import PropertyCard from "../components/PropertyCard";

// const ReservedProperties = () => {
//     const [properties, setProperties] = useState([]);
//     const [userid, setuser] = useState(null);
  
//     // Check session and set seller ID
//     useEffect(() => {
  
//       const checkSession = async () => {
//         try {
//           const sellerResponse = await sendRequest({
//             method: "GET",
//             route: "/check-session",
//             credentials: "include", // Include cookies
//             withCredentials:true
//           });
//           console.log(sellerResponse)
//           if (!sellerResponse.success) {
//              console.log('not logged in handle it carefully')
//           }
  
//           setuser(sellerResponse.user.id); // Correctly set the seller ID
//         } catch (error) {
//           console.error("Error checking session:", error);
//         }
//       };
  
//       checkSession();
//     }, []);
  
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await sendRequest({ method: "GET", route: "/getReservedProperties" ,params:{id:userid}});
//           setProperties(response.properties); // kenit mish zabta la2enno object wrapped everything in property key, now works
//           console.log(response)
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       };
//       fetchData();
//     }, [userid]); 
//     // properties here is the array of objects with all the personal properties of the user
//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h1 className="text-2xl font-bold mb-6">Reserved Properties</h1>


//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//           {properties.length > 0 ? (
//             properties.map((property) => (
//               <PropertyCard key={property.id} property={property} />
//             ))
//           ) : (
//             <div className="text-center text-gray-600 col-span-full">
//               No properties found.
//             </div>
//           )}
//         </div>
//     </div>
//   );
// };

// export default ReservedProperties;


import { useState, useEffect } from "react";
import { sendRequest } from "../config/request";
import PropertyCard from "../components/PropertyCard";

const ReservedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [userid, setUserid] = useState(null);

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
        console.log(sellerResponse)
        console.log(sellerResponse);
        if (!sellerResponse.success) {
          console.log("User not logged in, handle this case carefully.");
          return;
        }

        setUserid(sellerResponse.user.id); // Set the user ID once it's retrieved
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

    checkSession();
  }, []);

  // Fetch properties only when `userid` is available
  useEffect(() => {
    if (!userid) return; // Avoid invoking the API if `userid` is null or undefined

    const fetchData = async () => {
      try {
        const response = await sendRequest({
          method: "GET",
          route: "/getReservedProperties",
          params: { id: userid },
        });
        setProperties(response.properties); // Update properties state
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid]); // Runs only when `userid` changes

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Reserved Properties</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <div className="text-center text-gray-600 col-span-full">
            No properties found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservedProperties;
