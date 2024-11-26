import React from "react";

const ServicesView = () => {
  const allServices = [
    "Business Loan",
    "Home Loan",
    "Credit Card",
    "Personal Loan",
    "Mortgage Loan",
    "Gold Loan",
    "Education Loan",
    "Car Loan",
  ];

  return (
    <div className="bg-green-700 py-4 bg-gradient-to-b from-green-800">
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {allServices.map((service, index) => (
            <React.Fragment key={index}>
              <span className="mx-4 text-white font-medium text-lg">{service}</span>
              {index !== allServices.length - 1 && (
                <span className=" text-white font-medium text-lg">•</span>
              )}
            </React.Fragment>
          ))}
          {allServices.map((service, index) => (
            <React.Fragment key={`${index}-duplicate`}>
              <span className="mx-4 text-white font-medium text-lg">{service}</span>
              {index !== allServices.length - 1 && (
                <span className=" text-white font-medium text-lg">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesView;
