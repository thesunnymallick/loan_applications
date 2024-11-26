import React from "react";
import discuss from "../../assets/discuss.jpg";
import menImage from "../../assets/men.png";
const BusinessOverview = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-zinc-800 font-semibold text-3xl text-center">
          Empowering Businesses
        </h1>
        <span className="text-green-600 font-semibold">All over india</span>
      </div>
      <div className="py-6 flex gap-3">
        <div className="w-[60%]">
          {/* left side */}
          <img
            className="w-full object-cover rounded-lg"
            src={discuss}
            alt={"discuss"}
          />
        </div>
        {/* right side */}
        <div className=" w-[40%] grid grid-cols-1 gap-4">
          {/* Row 1: One Card */}
          <div className="bg-gradient-to-b from-green-500 to-green-950 text-white p-6 rounded-lg shadow-md">
            <span className="text-lg font-semibold">Pan India</span>
            <div className="text-2xl font-bold">7500+</div>
            <p className="">DSA Ageant</p>
          </div>

          {/* Row 2: Two Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-b from-green-500 to-green-950 text-white p-6 rounded-lg shadow-md">
              <span className="text-lg font-semibold">More Then</span>
              <div className="text-2xl font-bold">68+</div>
              <p>Banks Tie-up</p>
            </div>
            <div className="bg-gradient-to-b from-green-500 to-green-950 text-white p-6 rounded-lg shadow-md">
              <span className="text-lg font-semibold">Atleast</span>
              <div className="text-2xl font-bold">5X</div>
              <p>Returns</p>
            </div>
          </div>

          {/* Row 3: One Card */}
          <div className="bg-gradient-to-b from-green-500 to-green-950 text-white p-6 rounded-lg shadow-md">
            <span className="text-lg font-semibold">Franchse</span>
            <div className="text-2xl font-bold">30+</div>
          </div>
        </div>
      </div>

      <div className="py-6 flex justify-center">
        <div
          className="
         rounded-lg p-6 bg-green-700  bg-gradient-to-b from-green-800 relative w-[70%] flex "
        >
          {/* Half Circle Background */}
          {/*  */}

          {/* Text Content */}
          <div className="w-[70%]">
            <h1 className="text-white text-xl font-bold mb-4">
              Start Your Loan DSA Business, Earn In Lakhs as a Pan India Loan
              and Credit Card DSA With Minimum Investment!
            </h1>
            <p className="text-white opacity-80 mb-6">
              Start selling a wide range of loan and other financial products
              such as online loans, credit cards, multiple insurance policies,
              and investment plans online as a credit card DSA company, become a
              loan DSA.
            </p>

            {/* Button */}
            <button className="bg-white text-green-700 py-2 px-4 rounded-md">
              Register
            </button>
          </div>

          {/* Image Section */}
          <div className="w-[40%] relative">
            <img
              src={menImage}
              alt="Business Person"
              className="absolute -bottom-6 z-10 w-[95%]"
            />
            <div className="absolute -top-1 
            left-[60%] transform -translate-x-1/2
             bg-green-400 w-56 h-56 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessOverview;
