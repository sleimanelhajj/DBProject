import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RegisterSeller() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
    date_of_birth: '',
    home_renovation_history: '',
    password: '',
  });

  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate(); // Hook for navigation

  // Handle form input changes
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle registration submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
  
    try {
      const response = await axios.post(
        'http://localhost:4000/registerSeller', // Backend URL
        formData,
        { withCredentials: true }
      );
  
      // Axios automatically parses JSON responses
      if (response.data.success) {
        alert(response.data.message);
        navigate('/login'); // Navigate to the login page
      } else {
        setError(response.data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error during registration:', error.response || error.message);
      setError(
        error.response?.data?.message || 'An error occurred during registration.'
      );
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Register as Seller
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              required
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
              required
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
              required
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
              required
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
              required
            />
          </div>

          {/* Home Renovation History */}
          <div>
            <label htmlFor="home_renovation_history" className="block text-sm font-medium text-gray-700 mb-2">
              Home Renovation History
            </label>
            <textarea
              id="home_renovation_history"
              placeholder="List renovation history"
              value={formData.home_renovation_history}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
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
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

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
