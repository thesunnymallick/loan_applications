import { Image, Button, Select, notification } from "antd";
import React, { useState } from "react";
import { documentVerifyPartner } from "../../api/admin/users";

const Docverified = ({userProfileInfo}) => {

  console.log(userProfileInfo)
  const [images, setImages] = useState({
    userPhoto: null,
    aadhar_front_image: null,
    aadhar_back_image: null,
    pan_card_image: null,
    blank_cheque_image: null,
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [verificationStatus, setVerificationStatus] = useState({
    userPhoto: 0,
    aadhar_front_image: 0,
    aadhar_back_image: 0,
    pan_card_image: 0,
    blank_cheque_image: 0,
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const steps = [
    { label: "Profile Photo", key: "userPhoto" },
    { label: "Aadhar Front Image", key: "aadhar_front_image" },
    { label: "Aadhar Back Image", key: "aadhar_back_image" },
    { label: "Pan Card Image", key: "pan_card_image" },
    { label: "Cancel Cheque Photo", key: "blank_cheque_image" },
  ];

// Handle document verification submission
const handelDocVerified = async () => {
  try {
    const payload = {
      is_user_photo_verified: verificationStatus.userPhoto,
      is_aadhar_front_verified: verificationStatus.aadhar_front_image,
      is_aadhar_back_verified: verificationStatus.aadhar_back_image,
      is_pan_card_verified: verificationStatus.pan_card_image,
      is_blank_cheque_verified: verificationStatus.blank_cheque_image,
    };
    const { status } = await documentVerifyPartner(userProfileInfo.uuid, payload);
    if (status === 200) {
      notification.success({
        message: "Verification Successful",
        description: "All documents have been successfully verified.",
      });
    }
  } catch (error) {
    console.error("Error verifying documents:", error);
    notification.error({
      message: "Verification Failed",
      description: "An error occurred while verifying the documents. Please try again.",
    });
  }
};


  const handleVerificationChange = (value, key) => {
    setVerificationStatus((prevStatus) => ({
      ...prevStatus,
      [key]: value,
    }));
  };

  const renderUploadBox = (label, key) => (
    <div>
      <div className="flex items-center justify-between px-4 border-b-[1px] border-b-zinc-300 py-2">
        <h2 className="text-zinc-700 font-semibold text-lg">{label}</h2>
        <Select
          placeholder ={"Select status"}
         value={verificationStatus[key]}
         onChange={(value) => handleVerificationChange(value, key)}
         size="large" className="w-[30%] h-10">
          <Select.Option value={1}>Verified</Select.Option>
          <Select.Option value={0}>Pending</Select.Option>
        </Select>
      </div>
      <div className="flex justify-center">
        <div
          className={`${
            key === "userPhoto" ? "w-[30%]" : "w-[60%]"
          } flex justify-center items-center overflow-hidden rounded-lg border-dashed border-2 border-zinc-300 bg-zinc-100 h-60 my-2 relative`}
        >
          <div className="relative h-full w-full">
            <Image
              src={userProfileInfo[key]}
              alt={label}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="py-2">
        <div className="flex justify-center">
          <div className="flex-1">
            {renderUploadBox(steps[currentStep].label, steps[currentStep].key)}
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-3 py-3 px-4 border-t-[1px] border-zinc-300">
        <Button
          className="w-[20%] h-8 rounded-lg"
          disabled={currentStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          className="w-[20%] h-8 bg-green-700 text-white rounded-lg"
          onClick={
            currentStep === steps.length - 1
              ? () => handelDocVerified()
              : handleNext
          }
        >
          {currentStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Docverified;
