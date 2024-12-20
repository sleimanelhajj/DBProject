import { useState, useEffect } from 'react';
import PropertyCard from '../PropertyCard';
import ButtonSearch from '../ButtonSearch';
import SearchDropDown from '../SearchDropDown';
import { sendRequest } from '../../config/request';

const Properties = ({ type }) => {
  const maxprice = [
    { label: 'Any', value: 40000000000 },
    { label: '$100K', value: 100000 },
    { label: '$150K', value: 150000 },
    { label: '$200K', value: 200000 },
    { label: '$250K', value: 250000 },
    { label: '$300K', value: 300000 },
    { label: '$350K', value: 350000 },
  ];

  const minArea = [
    { label: 'Any', value: 0 },
    { label: '200 sqft', value: 200 },
    { label: '300 sqft', value: 300 },
    { label: '400 sqft', value: 400 },
    { label: '500 sqft', value: 500 },
  ];

  const regionOptions = [
    { label: 'Any', value: '' },
    { label: 'Beirut', value: 'Beirut' },
    { label: 'Jounieh', value: 'Jounieh' },
    { label: 'Chouf', value: 'Chouf' },
    { label: 'Batroun', value: 'Batroun' },
    { label: 'Keserwen', value: 'Keserwen' },
    { label: 'Byblos', value: 'Byblos' },
    { label: 'Nabatieh', value: 'Nabatieh' },
    { label: 'Saida', value: 'Saida' },
    { label: 'Tyre', value: 'Tyre' },
  ];

  const landoptions = [
    { label: 'Land', value: 'land' },
    { label: 'Home', value: 'home' },
  ];

  const [searchParams, setSearchParams] = useState({
    city_name: '',
    max_price: 40000000000,
    min_area: 0,
    type: type,
  });
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await sendRequest({
        method: "GET",
        route: 'http://localhost:4000/searchProperties',
        params: searchParams,
      });
      console.log(response)
      setProperties(response); // Replace response with response.data if response contains other metadata
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(); // Initial load
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl p-4">
      {/* Filters */}
      <div className="flex justify-center gap-4 flex-wrap mt-8 mb-4">
        <SearchDropDown
          placeholder="City"
          options={regionOptions}
          onChange={(selectedOption) =>
            setSearchParams({ ...searchParams, city_name: selectedOption })
          }
        />
        <SearchDropDown
          placeholder="Min Area"
          options={minArea}
          onChange={(selectedOption) =>
            setSearchParams({ ...searchParams, min_area: selectedOption })
          }
        />
        <SearchDropDown
          placeholder="Max Price"
          options={maxprice}
          onChange={(selectedOption) =>
            setSearchParams({ ...searchParams, max_price: selectedOption })
          }
        />
        <SearchDropDown
          placeholder="Type"
          options={landoptions}
          onChange={(selectedOption) =>
            setSearchParams({ ...searchParams, type: selectedOption })
          }
        />
      </div>

      {/* Search Button */}
      <div className="text-center mt-6">
        <button
          className="bg-primary text-white py-2 px-6 rounded-md hover:bg-opacity-90"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="text-center mt-4">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Properties;
