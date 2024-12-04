import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        address: '',
        date_of_birth: '',
        home_renovation_history: '',
        password: ''
    });

    function handleInputChange(event) {
        const { id, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    }

    function register(ev) {
        ev.preventDefault();
        axios
            .post(
                '/register', // Backend endpoint
                formData, // Data payload
                { withCredentials: true } // Axios configuration
            )
            .then((response) => {
                console.log('Response:', response.data); // Log success
            })
            .catch((error) => {
                console.error('Error:', error.response ? error.response.data : error.message); // Log errors
            });
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
                    Create Your Account
                </h1>
                <form onSubmit={register}>
                    {/* Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
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
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                    <div className="mb-4">
                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
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
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            placeholder="Your Address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    {/* Date of Birth */}
                    <div className="mb-4">
                        <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
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

                    {/* Home Renovation History */}
                    <div className="mb-4">
                        <label htmlFor="home_renovation_history" className="block text-sm font-medium text-gray-700 mb-1">
                            Home Renovation History
                        </label>
                        <textarea
                            id="home_renovation_history"
                            placeholder="List renovation history"
                            value={formData.home_renovation_history}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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
                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-200"
                    >
                        Register
                    </button>
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




