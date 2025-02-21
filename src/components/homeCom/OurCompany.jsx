import React from "react";
import ourCompanyImg from "../../assets/ourCompany.jpg";
import { useNavigate } from "react-router-dom";
import LazyImage from "../LazyImage";

const OurCompany = () => {
  const navigate=useNavigate();
  return (
    <div className="p-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-4">
        {/* Text Section */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <h1 className="text-2xl lg:text-3xl text-green-700 font-semibold text-center lg:text-left">
            Our Company
          </h1>
          <p className="text-sm lg:text-base text-gray-500">
            <span className="font-semibold text-gray-700">
            SUNGLORI SOFTWARE PRIVATE LIMITED
            </span>{" "}
            Our Company uses a custom built ERP-CRM ecosystem to ensure seamless operational flow and streamlined customer relationship management. Our systems are fortified with advanced predictive analytics and machine learning algorithms to forecast market trends, optimize resources, and improve decision-making. Complementing this, we integrate secure Blockchain technology to facilitate transparent data exchange and uphold data integrity across all business functions. By merging these capabilities, we empower businesses with unmatched efficiency and scalability.

          </p>
          <button
           onClick={()=>navigate("/about")}
           className="w-full lg:w-[20%] h-10 bg-green-700 text-white rounded-lg mx-auto lg:mx-0">
            Know more
          </button>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2">
          <LazyImage
            className="w-full h-auto object-cover"
            src={ourCompanyImg}
            alt="Our Company"
          />
        </div>
      </div>
    </div>
  );
};

export default OurCompany;
