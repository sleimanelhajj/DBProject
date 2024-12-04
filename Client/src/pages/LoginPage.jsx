import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(null); // State for error messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(null); // Clear previous errors

    try {
      // Send login request to the backend
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { seller_id } = response.data; // Get seller_id from response
        localStorage.setItem("seller_id", seller_id); // Save seller_id for future use
        navigate("/accountpage"); // Navigate to the account page
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Failed to log in.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Login to Your Account
        </h1>
        <form onSubmit={handleLogin}>
          {error && (
            <div className="mb-4 text-red-500 text-center font-medium">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="youremail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-200"
          >
            Login
          </button>
          <div className="text-center py-4 text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 underline hover:text-indigo-800"
            >
              Sign Up Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
