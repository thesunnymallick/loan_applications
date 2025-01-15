import React from "react";
import menImage from "../../assets/men.png";

const BusinessOverview2 = () => {
  return (
    <div className="p-4">
      <div className="py-6 flex justify-center">
        <div
          className="
            rounded-lg p-6 bg-green-700 bg-gradient-to-b from-green-800 
            relative w-full max-w-5xl flex flex-col md:flex-row gap-6"
        >
          {/* Image Section */}
          <div className="w-full md:w-[30%] relative flex justify-center">
            <img
              src={menImage}
              alt="Business Person"
              className="relative z-10 w-[50%] md:w-[90%] mr-14 md:mr-0 "
            />
            <div
              className="
                absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                bg-green-400 w-40 h-40 md:w-56 md:h-56 rounded-full"
            ></div>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-[70%] flex flex-col items-center md:items-end text-center md:text-right">
            <h1 className="text-white text-lg md:text-xl font-bold mb-4">
              Earn in Lakhs as a Loan DSA & Credit Card DSA by selling Loans,
              Credit Cards, Insurance and more!
            </h1>
            <p className="text-white opacity-80 mb-6">
              Register as a Loan DSA and Credit Card DSA Partner, start your
              Loan DSA Business, and sell a wide variety of financial products
              such as Loans, Credit Cards, Insurance (General Insurance, Health
              Insurance and Life Insurance), Demat Accounts, Savings Accounts,
              FD, Mutual Funds, Stocks, and many more in India. Become a DSA of
              68+ Banks and NBFCs, start DSA for Loan.
            </p>

            {/* Button */}
            <button className="bg-white text-green-700 py-2 px-4 rounded-md">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessOverview2;

