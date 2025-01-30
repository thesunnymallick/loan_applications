import React from "react";
import menImage from "../../assets/men.png";
import { useNavigate } from "react-router-dom";
import LazyImage from "../LazyImage";

const BusinessOverview2 = () => {
  const navigate=useNavigate();
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
              className="relative z-50 w-[50%] md:w-[90%] mr-14 md:mr-0 "
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
              Earn Big as a Loan & Credit Card DSA! Partner with leading banks
              and NBFCs and start earning today! As a DSA Partner, you can:
            </h1>
            <p className="text-white opacity-80 mb-6">
              Sell Loans, Credit Cards, Insurance (Life, Health, and General)
              Offer Demat Accounts, Savings Accounts, FDs, Mutual Funds, and
              Stocks Collaborate with 68+ Banks and NBFCs in India Kickstart
              your Loan DSA Business now and tap into India’s growing financial
              market!
            </p>

            {/* Button */}
            <button
                onClick={()=>navigate(`/partner-apply`)}
             className="bg-white text-green-700 py-2 px-4 rounded-md">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessOverview2;
