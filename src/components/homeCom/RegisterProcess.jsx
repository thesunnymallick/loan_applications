import React, { useState } from "react";
import { Steps, ConfigProvider } from "antd";
import process1 from "../../assets/process1.png";
import process2 from "../../assets/process2.png";
import process3 from "../../assets/process3.png";
import LazyImage from "../LazyImage";

const descriptions = [
  "Register your account by providing basic details.",
  "Choose the best plan that suits your business needs.",
  "Start growing your business with our CRM tools.",
];

const images = [process1, process2, process3];

const RegisterProcess = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepClick = (step) => {
    setCurrentStep(step);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#22c55e", // Set the primary color to green
        },
      }}
    >
      <div className="p-4">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-zinc-800 font-semibold text-3xl text-center">
            WE PROVIDE YOU THE BEST DSA CRM SOFTWARE
          </h1>
          <span className="text-green-600 font-semibold">How It Works</span>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10 py-10">
          {/* Display the current step image */}
          <div className="w-full md:w-64 h-56 mb-6 md:mb-0">
            <LazyImage
              src={images[currentStep]}
              alt={`Step ${currentStep + 1}`}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Steps Component */}
          <div className="w-full md:w-auto h-auto flex justify-center items-center">
            <Steps
              direction="vertical"
              current={currentStep}
              onChange={handleStepClick} // Handle step change on click
              size="large" // Set step size to large
              items={[
                {
                  title: (
                    <span
                      className={`${
                        currentStep === 0 ? "text-green-600 " : "text-gray-500"
                      } text-xl font-semibold`} // Larger text
                    >
                      APPLY FOR REGISTRATION
                    </span>
                  ),
                  description: (
                    <span
                      className={`${
                        currentStep === 0 ? "text-green-600" : "text-gray-500"
                      } `} // Larger description text
                    >
                      {descriptions[0]}
                    </span>
                  ),
                  status: currentStep >= 0 ? "finish" : "wait",
                },
                {
                  title: (
                    <span
                      className={`${
                        currentStep === 1 ? "text-green-600" : "text-gray-500"
                      } text-xl font-semibold`} // Larger text
                    >
                      CHOOSE YOUR PLAN (ACTIVED)
                    </span>
                  ),
                  description: (
                    <span
                      className={`${
                        currentStep === 1 ? "text-green-600" : "text-gray-500"
                      } `} // Larger description text
                    >
                      {descriptions[1]}
                    </span>
                  ),
                  status: currentStep >= 1 ? "finish" : "wait",
                },
                {
                  title: (
                    <span
                      className={`${
                        currentStep === 2 ? "text-green-600" : "text-gray-500"
                      } text-xl font-semibold`} // Larger text
                    >
                      GROW YOUR BUSINESS
                    </span>
                  ),
                  description: (
                    <span
                      className={`${
                        currentStep === 2 ? "text-green-600" : "text-gray-500"
                      } `} // Larger description text
                    >
                      {descriptions[2]}
                    </span>
                  ),
                  status: currentStep >= 2 ? "finish" : "wait",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default RegisterProcess;
