import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user || "User"; // Default to "User" if no name is passed

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
       You have successfully completed the transaction!
      </h1>
      <button
        onClick={() => navigate("/accountpage")}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
      >
        Go Back
      </button>
    </div>
  );
};

export default SuccessPage;
