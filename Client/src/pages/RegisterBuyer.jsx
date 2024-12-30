import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function RegisterClient() {
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
    date_of_birth: '',
    budget: '',
    date_registered: '',
    offer_history: '',
    buying_purpose: '',
    prior_buy_history: ''
  });

  function handleInputChange(event) {
    const { id, value } = event.target;

    // If the field is "budget", format it as currency
    if (id === 'budget') {
      const formattedValue = formatCurrency(value);
      setFormData((prevData) => ({
        ...prevData,
        [id]: formattedValue
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value
      }));
    }
  } 
    
  // Function to format the input value as currency
  function formatCurrency(value) {
    // Remove all non-numeric characters except periods
    const cleanedValue = value.replace(/[^0-9.]/g, '');

    // Parse the value as a float and format as currency
    const parsedValue = parseFloat(cleanedValue);
    if (isNaN(parsedValue) || parsedValue < 1000 || parsedValue > 10000000) {
      return; // Exit without updating if the value is out of range
    }

    // Format the value as a currency string
    return `$${parsedValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  function register(ev) {
    ev.preventDefault();

    // Remove formatting from the budget before sending to the backend
    const dataToSend = {
      ...formData,
      budget: formData.budget.replace(/[$,]/g, '')
    };

    axios
      .post(
        '/registerClient',
        dataToSend,
        { withCredentials: true }
      )
      .then((response) => {
        console.log('Response:', response.data);
        navigate('/login'); // Navigate to the login page

      })
      .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
      });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Register as Client
        </h1>
        <form onSubmit={register} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="youremail@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              id="phone_number"
              placeholder="Your Phone Number"
              value={formData.phone_number}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              id="address"
              placeholder="Your Address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Budget */}
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              Budget
            </label>
            <input
              type="text"
              id="budget"
              placeholder="$0.00"
              value={formData.budget}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
             {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-200"
            >
              Register
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center py-4 text-gray-600">
            Already a member?{' '}
            <Link to="/login" className="text-indigo-600 underline hover:text-indigo-800">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
