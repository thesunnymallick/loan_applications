import React from 'react';

const EligiblePanel = () => {
  const handleRedirect = (url) => {
    window.location.href = url;
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src="https://via.placeholder.com/400x200"
        alt="Eligibility Program"
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Eligibility Program</h1>
        <p className="text-gray-600 mb-5">
          You are eligible for this program. Click the button below to learn more and proceed further.
        </p>
        <button
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => handleRedirect('https://example.com')}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default EligiblePanel;
