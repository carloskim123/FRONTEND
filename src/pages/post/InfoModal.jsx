import React from "react";

const InfoModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 max-w-md">
        <h2 className="text-xl font-bold mb-4">Important Information</h2>
        <p>
          Your saved posts are not persistent between sessions due to backend security measures.
        </p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
