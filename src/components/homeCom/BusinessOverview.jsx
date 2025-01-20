import React from "react";
import discuss from "../../assets/discuss.jpg";
import menImage from "../../assets/men.png";
import { useNavigate } from "react-router-dom";

const BusinessOverview = () => {
  const navigate=useNavigate();
  return (
    <div className="p-4">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-zinc-800 font-semibold text-3xl text-center">
          Empowering Businesses
        </h1>
        <span className="text-green-600 font-semibold">All over India</span>
      </div>
      <div className="py-6 flex flex-col lg:flex-row gap-6 lg:gap-3">
        <div className="lg:w-[60%] w-full">
          {/* Left side */}
          <img
            className="w-full object-cover rounded-lg"
            src={discuss}
            alt="discuss"
          />
        </div>

        {/* Right side */}
        <div className="lg:w-[40%] grid grid-cols-1 lg:grid-cols-1 gap-6 lg:gap-4">
          {/* Row 1: One Card */}
          <div className="bg-gradient-to-b from-green-500 to-green-950 text-white p-6 rounded-lg shadow-md">
            <span className="text-lg font-semibold">Pan India</span>
            <div className="text-2xl font-bold">7500+</div>
            <p>DSA Agent</p>
          </div>

          {/* Row 2: Two Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-b from-green-500 to-green-950 text-white p-6 rounded-lg shadow-md">
              <span className="text-lg font-semibold">More Than</span>
              <div className="text-2xl font-bold">68+</div>
              <p>Banks Tie-up</p>
            </div>
            <div className="bg-gradient-to-b from-green-500 to-green-950 text-white p-6 rounded-lg shadow-md">
              <span className="text-lg font-semibold">At Least</span>
              <div className="text-2xl font-bold">5X</div>
              <p>Returns</p>
            </div>
          </div>

          {/* Row 3: One Card */}
          <div className="bg-gradient-to-b from-green-500 to-green-950 text-white p-6 rounded-lg shadow-md">
            <span className="text-lg font-semibold">Franchise</span>
            <div className="text-2xl font-bold">30+</div>
          </div>
        </div>
      </div>

      <div className="py-6 flex justify-center ">
        <div
          className="
            rounded-lg p-6 bg-green-700 bg-gradient-to-b
             from-green-800 relative w-full sm:w-[70%] flex flex-col-reverse 
             sm:flex-row  items-start md:items-center h-[700px] md:h-full"
        >
          {/* Text Content */}
          <div className="w-full md:w-[70%] text-center sm:text-left">
            <h1 className="text-white text-xl font-bold mb-4">
            Join the Fast-Growing Loan DSA Industry and Earn Big!
            Become a Pan-India Loan and Credit Card DSA with Low Investment!

            </h1>
            <p className="text-white opacity-80 mb-6">
            Start offering personal loans, business loans, home loans, credit cards, insurance policies, and more online.
            Expand your financial portfolio as a trusted Loan DSA partner today
            </p>

            {/* Button */}
            <button 
             onClick={()=>navigate(`/partner-apply`)}
            className="bg-white text-green-700 py-2 px-4 rounded-md">
              Register
            </button>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-[40%] relative mt-0 md:mt-6 sm:mt-0 ">
            <img
              src={menImage}
              alt="Business Person"
              className="absolute bottom-[7rem] md:-bottom-[5rem] z-10 w-[70%] md:w-[95%] mx-auto sm:mx-0"
            />
            <div className="absolute -top-[20rem] md:-top-[8rem] left-[50%] md:left-[30%] transform -translate-x-1/2 sm:translate-x-0 bg-green-400 w-56 h-56 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessOverview;
