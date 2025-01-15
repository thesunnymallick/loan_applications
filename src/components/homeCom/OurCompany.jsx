import React from "react";
import ourCompanyImg from "../../assets/ourCompany.jpg";

const OurCompany = () => {
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
              INCOMEKARO SOFTWARE PRIVATE LIMITED
            </span>{" "}
            uses a custom-built ERP-CRM suite for running the business smoothly.
            We rely on the power of modern-age tools to properly manage the
            business complexities, sales pipelines, and everything about record
            keeping. Along with that, we also bring into the picture our own
            Blockchain setup for maintaining absolute data distribution in our
            enterprise, establishing a better client monitoring infrastructure.
            Together, the power to achieve pure data management is infinite. We
            try to give wings to the innovative minds of India by implementing
            the novel ideas of people which majorly aim in serving the nation
            in a better manner.
          </p>
          <button className="w-full lg:w-[20%] h-10 bg-green-700 text-white rounded-lg mx-auto lg:mx-0">
            Know more
          </button>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2">
          <img
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
