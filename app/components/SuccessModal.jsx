import React from "react";

const SuccessModal = ({ open, onClose, message = "Login successful!" }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-600">Success</h2>
        <p className="mb-6 text-gray-700">{message}</p>
        <button
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
