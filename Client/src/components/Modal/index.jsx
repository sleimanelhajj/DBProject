import React from 'react';

const PopupModal = ({ message, onClose }) => {
  return (
    // Full-screen overlay to center the modal
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40"
      style={{ zIndex: 999 }}
    >
      {/* Modal content with updated colors */}
      <div className="w-1/3 p-8 rounded-lg shadow-lg bg-[#5a30e2] text-white">
        <div className="mb-4">
          {/* Display the message passed as a prop */}
          <p className="text-xl font-semibold">{message}</p>
        </div>
        <div className="text-right">
          {/* OK button with consistent styles */}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-gray-300 text-gray-800 font-semibold rounded"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
