// import React from 'react';
// import PropTypes from 'prop-types'; // Import PropTypes
// import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from '@material-tailwind/react';
// import { Link } from 'react-router-dom';

// const PropertyCard = ({ property }) => {
//   const price = parseInt(property.price, 10);
//   const formattedPrice = price.toString().replace(/\d(?=(\d{3})+$)/g, '$&,');

//   return (
//     <Card
//       key={property.id}
//       className="w-full max-w-[22rem] shadow-lg hover:text-secondary rounded-lg p-4 mt-8 mb-8 transition-colors duration-100 ease-in-out border-primary border-2"
//     >
//       <CardHeader className="mt--6" floated={false} color="blue-gray">
//         <img className="rounded-lg" src={`${property.img1}`} alt={'pictureSHOULD BE HERE'} />
//         <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
//       </CardHeader>
//       <CardBody className="p-3">
//         <div className="mb-3 flex items-center justify-between">
//           <Typography
//             variant="h5"
//             color="blue-gray"
//             className="flex font-medium transition-colors duration-300 ease-in-out "
//           >
//             <span>{property.title}</span>
//           </Typography>
//         </div>
//         <Typography className="text-secondary font-semibold">
//           $ {formattedPrice} <br />
//           <div className="flex justify-between">
//             <span className="text-primary font-bold">{property.city}</span>{' '}
//             <span className="text-primary font-bold text-sm">{property.area} sqft</span>
//           </div>
//         </Typography>
//       </CardBody>
//       <CardFooter className="py-0 px-3">
//         <Link to={`/property/${property.id}`}>
//           <Button
//             size="lg"
//             fullWidth={true}
//             className="text-stone-700 p-3 cursor-pointer hover:bg-primary transition-colors duration-100"
//           >
//             Show Details
//           </Button>
//         </Link>
//       </CardFooter>
//     </Card>
//   );
// };

// // Define PropTypes for PropertyCard
// PropertyCard.propTypes = {
//   property: PropTypes.shape({
//     id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // ID can be string or number
//     title: PropTypes.string.isRequired, // Title of the property
//     price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Price as string or number
//     img1: PropTypes.string.isRequired, // Image URL
//     area: PropTypes.number.isRequired, // Area in square feet
//     city: PropTypes.shape({
//       city: PropTypes.string.isRequired, // Nested city name
//     }).isRequired,
//   }).isRequired, // The property object itself is required
// };

// export default PropertyCard;
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Card, CardBody, CardFooter, Typography, Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const price = parseInt(property.price, 10);
  const formattedPrice = price.toString().replace(/\d(?=(\d{3})+$)/g, '$&,');
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
        <Link to={`/accountpage/property/details/${property.id}`}>
          <Button
            size="lg"
            fullWidth={true}
            className="text-stone-700 p-3 cursor-pointer hover:bg-primary transition-colors duration-100"
          >
            Show Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

// Define PropTypes for PropertyCard
PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // ID can be string or number
    property_type: PropTypes.string.isRequired, // Title of the property
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    square_feet: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired, // The property object itself is required
};

export default PropertyCard;
