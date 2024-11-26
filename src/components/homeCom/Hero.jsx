import React from "react";
import heroImage from "../../assets/hero.jpg";
import ServicesView from "./ServicesView";

const Hero = () => {
  return (
    <div className="w-full h-[700px] md:h-[800px] flex justify-end relative bg-[#e8e9ed]">
      {/* Left Side Content */}
      <div className="absolute left-[1%] top-0 w-full container mx-auto md:w-[60%] h-full flex flex-col justify-center px-6 md:px-16 z-10 text-black -mt-[5%]">
        <h1
          className="text-4xl md:text-5xl font-extrabold leading-tight md:leading-snug drop-shadow-lg"
          style={{
            fontFamily: "'Poppins', sans-serif", // Use Poppins or your preferred font
            color: "#1a1a1a", // Dark shade for better contrast
          }}
        >
          Welcome <br />
          <span className="text-green-600">Incomekaro</span>
          <br />
          Instant Disbursed
        </h1>
        <p
          className="mt-6 text-lg md:text-2xl opacity-90 drop-shadow-md"
          style={{
            fontFamily: "'Poppins', sans-serif",
            color: "#333", // Slightly darker text for better readability
          }}
        >
          India’s No. 1 Fast Payout Provider.
        </p>
        <button
          className="mt-8 px-10 py-4 bg-green-800 bg-gradient-to-b from-green-950 text-white text-lg font-semibold rounded-full shadow-xl transform transition duration-300 ease-in-out focus:outline-none w-[50%]"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Apply Now
        </button>

        <div className="text-sm mt-8 flex flex-col gap-2 px-4">
          <span className="font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <span className="text-green-600 mr-2">Powered by INCOMEKARO</span>
            and trusted by
          </span>
          <span className="font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <span className="text-green-600 mr-1">7500+ Businesses</span> in India
          </span>
        </div>
        <div
          className="absolute top-0 w-[5%] right-[100%] h-full bg-gradient-to-r from-[#e8e9ed] to-transparent pointer-events-none"
        ></div>
      </div>

      {/* Right Side with Optimized Effects */}
      <div className="w-full md:w-[70%] h-full relative flex justify-center items-center bg-[#e8e9ed]">
        {/* Hero Image */}
        <img
          src={heroImage}
          alt="Hero"
          className="w-full h-[75%] object-cover"
        />

        {/* Bottom Light Smoke Effect */}
        <div
          className="absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-t from-gray-200 
          to-transparent pointer-events-none"
        ></div>

        {/* Right Side Smoke Effect */}
        <div
          className="absolute top-0 left-0 w-[20%] h-full bg-gradient-to-r from-gray-200 to-transparent pointer-events-none"
        ></div>
        <div
          className="absolute top-0 right-0 w-[20%] h-full bg-gradient-to-l from-gray-200 to-transparent pointer-events-none"
        ></div>
      </div>
      <div className="absolute bottom-0 w-full">
        <ServicesView />
      </div>
    </div>
  );
};

export default Hero;
