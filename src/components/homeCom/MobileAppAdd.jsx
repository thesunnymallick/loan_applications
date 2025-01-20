import React from 'react';
import mobileApp from "../../assets/mobileApp.png";
import { useNavigate } from 'react-router-dom';

const MobileAppAdd = () => {

  const navigate=useNavigate();
  return (
    <div className="bg-green-700 bg-gradient-to-b from-green-800 w-full h-auto my-8 p-6 overflow-hidden">
      <div className="container mx-auto flex flex-col lg:flex-row justify-center items-center gap-8 lg:px-4">
        {/* Text Section */}
        <div className="w-full lg:w-[50%] flex flex-col gap-4 text-white text-center lg:text-left">
          <h1 className="text-2xl md:text-4xl font-semibold">
            Top Mobile & Web Development Company
          </h1>
          <p className="text-sm md:text-base leading-6">
            Incomekaro is deep rooted into the grounds of computation, which is fuelled by strong working environments of advanced computer systems. Only Technology can produce Technology. Our systems include high processing GPUs, and Graphics Drivers, which help us to create the most amazing digital effects, creative designs, logos, and enriched web app graphics. When combined with software like Adobe Suite and MacOS tools, the results are next to none.
          </p>
          <button 
            onClick={()=>navigate(`/partner-apply`)}
          className="w-[40%] md:w-[20%] mx-auto lg:mx-0 rounded-lg h-10 bg-white text-green-600">
            Get Now
          </button>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-[50%] flex justify-center lg:justify-end items-center">
          <img
            className="w-[70%] md:w-[50%] object-cover"
            src={mobileApp}
            alt="Mobile App"
          />
        </div>
      </div>
    </div>
  );
};

export default MobileAppAdd;
