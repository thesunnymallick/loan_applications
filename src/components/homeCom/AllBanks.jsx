import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import bank1 from "../../assets/banks/bank1.png";
import bank2 from "../../assets/banks/bank2.png";
import bank3 from "../../assets/banks/bank3.png";
import bank4 from "../../assets/banks/bank4.png";
import bank5 from "../../assets/banks/bank5.png";
import bank6 from "../../assets/banks/bank6.png";
import bank7 from "../../assets/banks/bank7.png";
import bank8 from "../../assets/banks/bank8.png";
import bank9 from "../../assets/banks/bank9.png";
import bank10 from "../../assets/banks/bank10.png";
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";

  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute -left-5 
      top-1/2 transform -translate-y-1/2
      bg-green-800 bg-gradient-to-b 
      from-green-950 text-white rounded-full  z-10 w-8 h-8 
      shadow-md flex justify-center items-center"
      style={{ zIndex: 1000 }}
    >
      <IoIosArrowBack className="text-xl"/>
    </button>
  );
  
  
  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute -right-5 top-1/2 transform -translate-y-1/2  bg-green-800 bg-gradient-to-b 
      from-green-950 text-white rounded-full  z-10 w-8 h-8 
      shadow-md flex justify-center items-center"
      style={{ zIndex: 1000 }}
    >
      <IoIosArrowForward className="text-xl"/>
    </button>
  );
  

const AllBanks = () => {
  const bankLogos = [bank1, bank2, bank3, bank4, bank5, bank6, bank7, bank8, bank9, bank10];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,  // Show 4 logos at once
    slidesToScroll: 1,  // Move to the next set of 4 logos on each scroll
    autoplay: false,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,  // Adjust for medium screens
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,  // Adjust for smaller screens
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,  // Show 1 logo on mobile
        },
      },
    ],
  };

  return (
    <div className=" p-6 md:p-4 relative">
      <div className="text-center mb-6">
        <h1 className="text-zinc-800 font-semibold text-3xl">
          We've Partnered with 68+ Banks
        </h1>
      </div>

       <div className=" py-6 bg-gray-100 rounded-lg ">
       <Slider {...settings}>
        {bankLogos.map((logo, index) => (
          <div key={index} className="flex justify-center">
            
            <div className="bg-white mx-4 flex justify-center items-center rounded-xl shadow-md">
            <img src={logo} alt={`Bank ${index + 1}`} className="w-[60%] h-20 rounded-lg object-contain" />
            </div>
          </div>
        ))}
      </Slider>
       </div>
    </div>
  );
};

export default AllBanks;
