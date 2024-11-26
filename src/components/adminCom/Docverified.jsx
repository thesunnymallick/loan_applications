import { Image, Button, Select, notification } from "antd";
import React, { useState } from "react";
import { documentVerifyPartner } from "../../api/admin/users";
import noImageAvailable from "../../assets/noImageAvailable.jpg"
import userImage from "../../assets/userCricle.jpg";
import { MdVerified, MdOutlineRemoveCircle } from 'react-icons/md';
const Docverified = ({
  userProfileInfo,
  setUserProfileInfo,
  fetchAllMembers,  
  setIsDocVerify}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [verificationStatus, setVerificationStatus] = useState({
    userPhoto: 0,
    aadhar_front_image: 0,
    aadhar_back_image: 0,
    pan_card_image: 0,
    blank_cheque_image: 0,
  });
  const [loading, setLoading]=useState(false);

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
    { label: "Profile Photo", key: "userPhoto", verfiyKey:"is_user_photo_verified", },
    { label: "Aadhar Front Image", key: "aadhar_front_image",verfiyKey:"is_aadhar_back_verified", },
    { label: "Aadhar Back Image", key: "aadhar_back_image", verfiyKey:"is_aadhar_back_verified", },
    { label: "Pan Card Image", key: "pan_card_image", verfiyKey:"is_pan_card_verified", },
    { label: "Cancel Cheque Photo", key: "blank_cheque_image", verfiyKey:"is_blank_cheque_verified", },
  ];

// Handle document verification submission
const handelDocVerified = async () => {
  try {
    setLoading(true);
    const payload = {
      is_user_photo_verified: verificationStatus.userPhoto,
      is_aadhar_front_verified: verificationStatus.aadhar_front_image,
      is_aadhar_back_verified: verificationStatus.aadhar_back_image,
      is_pan_card_verified: verificationStatus.pan_card_image,
      is_blank_cheque_verified: verificationStatus.blank_cheque_image,
    };
    const { status } = await documentVerifyPartner(userProfileInfo.uuid, payload);
    if (status === 200) {
      setLoading(false);
      notification.success({
        message: "Verification Successful",
        description: "All documents have been successfully verified.",
      });
      setCurrentStep(0);
      fetchAllMembers();
      setIsDocVerify(false);
      setUserProfileInfo(null);
      
    }
  } catch (error) {
    setLoading(false);
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

  const renderUploadBox = (label, key, verfiyKey) => (
    <div>

   <div className="flex border-b-[1px] border-b-zinc-300 items-center gap-2 px-4 py-2">
            <div className="w-14 h-14 rounded-full border-[2px] border-green-700 overflow-hidden">
              <img
                className="w-full  object-cover"
                src={userProfileInfo?.userPhoto || userImage}
                alt="ProfileImage"
              />
            </div>
            <div className="flex flex-col">
            <h2 className="text-zinc-700 text-xl">{userProfileInfo?.name}</h2>
            <span className="text-zinc-600 text-sm -mt-2">
              {userProfileInfo?.email}
            </span>
            </div>
   </div>


      <div className="flex items-center justify-between px-4 border-b-[1px] border-b-zinc-300 py-2">
        <div className="flex items-center gap-2">
        <h2 className="text-zinc-700 font-semibold text-lg">{label}</h2>
        {userProfileInfo[verfiyKey]===1? <span className="px-2  bg-green-600
         text-white rounded-md flex justify-center gap-1 items-center text-sm">
          <span><MdVerified/> </span>
          <span>Verfied</span>
          </span>: 
          <span className="px-2  bg-red-600
          text-white rounded-md flex justify-center gap-1 items-center text-sm">
           <span><MdOutlineRemoveCircle/> </span>
           <span>Not verfied</span>
           </span>
          
          }
        </div>
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
          } flex justify-center items-center overflow-hidden 
            rounded-lg border-dashed border-2
            border-zinc-300
            bg-zinc-100 h-60
            my-2 relative`}
        >
          <div className="relative h-full w-full">
            <Image
              src={userProfileInfo[key] || noImageAvailable}
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
            {renderUploadBox(steps[currentStep].label, steps[currentStep].key, steps[currentStep].verfiyKey)}
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
          loading={loading}
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
