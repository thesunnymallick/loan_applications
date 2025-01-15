import React from "react";
import heroImage from "../../assets/hero.jpg";
import heroMobile from "../../assets/heroMobile.png";
import ServicesView from "./ServicesView";

const Hero = () => {
  return (
    <div className="w-full h-auto md:h-[800px] flex flex-col md:flex-row justify-end relative bg-[#e8e9ed]">
      {/* Left Side Content */}
      <div className="absolute 
      left-0 
      top-0 
      w-full md:w-[60%] 
      h-full 
      flex 
      flex-col 
      justify-start
      md:justify-center 

     
      md:items-start
      px-4 
      md:px-16 z-10 text-black 
      mt-0
      md:-mt-[5%] ">
        <h1
          className="text-3xl md:text-5xl font-extrabold leading-snug drop-shadow-lg mt-[24%]"
          style={{
            fontFamily: "'Poppins', sans-serif",
            color: "#1a1a1a",
          }}
        >
          Welcome <br />
          <span className="text-green-600">Incomekaro</span>
          <br />
          Instant Disbursed
        </h1>
        <p
          className="mt-4 md:mt-6 text-base md:text-2xl opacity-90 drop-shadow-md"
          style={{
            fontFamily: "'Poppins', sans-serif",
            color: "#333",
          }}
        >
          India’s No. 1 Fast Payout Provider.
        </p>
        <button
          className="mt-6 md:mt-8 px-6 py-3 md:px-10 md:py-4 bg-green-800 bg-gradient-to-b from-green-950 text-white text-sm md:text-lg font-semibold rounded-full shadow-xl transform transition duration-300 ease-in-out focus:outline-none w-[60%] md:w-[50%]"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Apply Now
        </button>

        <div className="text-xs md:text-sm mt-6 md:mt-8 flex flex-col gap-2 px-4">
          <span className="font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <span className="text-green-600 mr-2">Powered by INCOMEKARO</span>
            and trusted by
          </span>
          <span className="font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <span className="text-green-600 mr-1">7500+ Businesses</span> in India
          </span>
        </div>
      </div>

      {/* Right Side with Optimized Effects */}
      <div className="w-full md:w-[70%] h-[900px]  md:h-full relative flex justify-center items-center bg-[#e8e9ed]">
        {/* Hero Image */}
        <img
          src={heroMobile}
          alt="Hero Mobile"
          className="w-full object-cover md:hidden"
        />
        <img
          src={heroImage}
          alt="Hero Desktop"
          className="hidden md:block w-full h-full object-cover"
        />

        {/* Bottom Light Smoke Effect */}
        <div
          className="absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-t from-gray-200 
          to-transparent pointer-events-none"
        ></div>

        {/* Right Side Smoke Effect */}
        <div
          className="absolute top-0 left-0 w-[20%] h-full bg-gradient-to-r from-gray-200 to-transparent pointer-events-none hidden md:block"
        ></div>
        <div
          className="absolute top-0 right-0 w-[20%] h-full bg-gradient-to-l from-gray-200 to-transparent pointer-events-none hidden md:block"
        ></div>
      </div>

      <div className="absolute bottom-[22%] md:bottom-0 w-full  ">
        <ServicesView />
      </div>
    </div>
  );
};

export default Hero;
