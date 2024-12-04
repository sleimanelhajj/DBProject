import { useEffect, useState } from 'react';

const SellersList = () => {
  const [sellers, setSellers] = useState([]);

  // Fetch sellers data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/test'); // Fetch from Express route
        const data = await response.json();
        setSellers(data); // Set sellers data
      } catch (error) {
        console.error('Error fetching sellers:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Sellers List</h1>
      <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Date of Birth</th>
            <th>Property Listed</th>
            <th>Date Registered</th>
            <th>Listing Reason</th>
            <th>Home Renovation History</th>
            <th>Open House Dates</th>
            <th>Property Market Value</th>
            <th>Offers Received</th>
            <th>Seller Experience</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller) => (
            <tr key={seller.seller_id}>
              <td>{seller.seller_id}</td>
              <td>{seller.name}</td>
              <td>{seller.email}</td>
              <td>{seller.phone_number}</td>
              <td>{seller.address}</td>
              <td>{seller.date_of_birth}</td>
              <td>{seller.property_listed}</td>
              <td>{seller.date_registered}</td>
              <td>{seller.listing_reason}</td>
              <td>{seller.home_renovation_history}</td>
              <td>{seller.open_house_dates}</td>
              <td>{seller.property_market_value}</td>
              <td>{seller.offers_received}</td>
              <td>{seller.seller_experience}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellersList;
