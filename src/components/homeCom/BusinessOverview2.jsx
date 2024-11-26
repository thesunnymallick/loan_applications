import React from "react";
import discuss from "../../assets/discuss.jpg";
import menImage from "../../assets/men.png";
const BusinessOverview2 = () => {
  return (
    <div className="p-4">
      <div className="py-6 flex justify-center">
        <div
          className="
         rounded-lg p-6 bg-green-700  bg-gradient-to-b from-green-800 relative w-[70%] flex  gap-4 "
        >
          {/* Half Circle Background */}
          {/*  */}
           {/* Image Section */}
           <div className="w-[30%] relative mr-6 ">
            <img
              src={menImage}
              alt="Business Person"
              className="absolute  -bottom-6 z-10 w-[95%]"
            />
            <div className="absolute top-7 
            left-[60%] transform -translate-x-1/2
             bg-green-400 w-56 h-56 rounded-full"></div>
          </div>

          {/* Text Content */}
          <div className="w-[70%] flex flex-col items-end ">
            <h1 className="text-white text-xl font-bold mb-4">
            Earn in Lakhs as a Loan DSA & Credit Card DSA by selling Loans, Credit Cards, Insurance and more!
            </h1>
            <p className="text-white opacity-80 mb-6">
            Register as a Loan DSA and Credit Card DSA Partner, start your Loan DSA Business, and sell a wide variety of financial products such as Loans, Credit Cards, Insurance (General Insurance, Health Insurance and Life Insurance), Demat Accounts, Savings Accounts, FD, Mutual Funds, Stocks, and many more in India, 
            Become a DSA of 68+ Banks and NBFCs, start DSA for Loan.
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
