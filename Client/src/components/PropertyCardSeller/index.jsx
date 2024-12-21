import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Card, CardBody, CardFooter, Typography, Button } from '@material-tailwind/react';
import axios from "axios";
 

const PropertyCardSeller = ({ property }) => {
  const price = parseInt(property.price, 10);
  const formattedPrice = price.toString().replace(/\d(?=(\d{3})+$)/g, '$&,');
  
const handleDelete= async (x) => {
  
  try {
    await axios.post(
      'http://localhost:4000/deleteProperty', // Backend URL
      {'propertyId':x},
      { withCredentials: true }
    );

    window.location.reload();
    } catch (error) {
    console.error('Error during deletion:', error.response || error.message);

  }
};

  return (
    <Card
      key={property.id}
      className="w-full max-w-[22rem] shadow-lg hover:text-secondary rounded-lg p-4 mt-8 mb-8 transition-colors duration-100 ease-in-out border-primary border-2"
    >
      <CardBody className="p-3">
        <div className="mb-3 flex items-center justify-between">
          <Typography
            variant="h5"
            color="blue-gray"
            className="flex font-medium transition-colors duration-300 ease-in-out"
          >
            <span>{property.property_type}</span>
          </Typography>
        </div>
        <Typography className="text-secondary font-semibold">
          $ {formattedPrice} <br />
          <div className="flex justify-between">
            <span className="text-primary font-bold">{property.city}</span>{' '}
            <span className="text-primary font-bold text-sm">{property.square_feet} sqft</span>
          </div>
        </Typography>
      </CardBody>
      <CardFooter className="py-0 px-3">
        <Button
          size="lg"
          fullWidth={true}
          className="text-stone-700 p-3 cursor-pointer hover:bg-primary transition-colors duration-100"
          onClick={() => handleDelete(property.id)}
        >
          Delete Property
        </Button>
      </CardFooter>
    </Card>
  );
};

// Define PropTypes
PropertyCardSeller.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.number.isRequired,
    property_type: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    square_feet: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired, // Callback for notifying parent
};

export default PropertyCardSeller;
