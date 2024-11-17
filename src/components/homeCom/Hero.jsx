import React from 'react';
import heroImage from "../../assets/hero.jpg";

const Hero = () => {
  return (
    <div className="w-full h-[450px] bg-black flex items-center relative md:h-[700px]">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full opacity-50 overflow-hidden">
        <img src={heroImage} className="w-full h-full object-cover object-center" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-[250px] bg-gradient-to-t from-[#04152d] to-transparent"></div>

      {/* Content */}
      <div className="relative max-w-[800px] mx-auto text-white text-center">
        <div className="flex flex-col items-center">
          <span className="text-[50px] font-bold mb-2 md:text-[90px] md:mb-0">
            Welcome
          </span>
          <span className="text-[18px] font-medium mb-6 md:text-[24px]">
            Instant Disbursed Instant Payout. India's No. 1 Fast Payout Provider.
          </span>
          <span className="text-[16px] font-light mb-8 md:text-[20px]">
            Apply for a loan today and enjoy quick approval and instant disbursement.
            Tailored for your needs, hassle-free and reliable service at your fingertips.
          </span>
          <button className=" w-[30%] px-6 py-3 bg-green-800 bg-gradient-to-b from-green-950  font-bold text-[16px] rounded-full md:text-[18px] hover:opacity-90">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
