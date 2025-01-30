import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { VscUnverified } from "react-icons/vsc";
import LazyImage from "../../LazyImage";

const UploadDocView = ({ info }) => {
  return (
    <div className="h-[40vh] overflow-x-auto">
      <h2 className="text-zinc-800 font-semibold text-lg">Upload Documents</h2>
      <div className="p-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        {/* Aadhar Front Image */}
        <div className="bg-zinc-50 rounded-lg shadow-sm px-4 py-2">
          <div className="flex justify-between">
            <h3 className="text-zinc-600 font-semibold">Aadhar Front Image</h3>
            <div
              className={`flex items-center gap-1
              border-[1px] ${
                info?.document_verifications?.is_aadhar_front_verified === 1
                  ? "bg-green-100 text-green-600  border-green-600"
                  : "bg-red-100 text-red-600 border-red-600"
              } 
             px-3 py-1 rounded-lg text-sm`}
            >
              <RiVerifiedBadgeFill />
              <span>
              {info?.document_verifications?.is_aadhar_front_verified === 1
                  ? "Verify"
                  : "Not Verified"}
              </span>
            </div>
          </div>
          <div className="w-full h-60 border-zinc-200 border-[1px] rounded-md mt-2 overflow-hidden">
            <LazyImage
              className="w-full h-full object-cover"
              src={info?.documents?.aadhar_front_image }
              alt="Aadhar Card Front"
            />
          </div>
        </div>

        {/* Aadhar Back Image */}
        <div className="bg-zinc-50 rounded-lg shadow-sm px-4 py-2">
          <div className="flex justify-between">
            <h3 className="text-zinc-600 font-semibold">Aadhar Back Image</h3>
            <div
              className={`flex items-center gap-1
              border-[1px] ${
                info?.document_verifications?.is_aadhar_back_verified === 1
                  ? "bg-green-100 text-green-600  border-green-600"
                  : "bg-red-100 text-red-600 border-red-600"
              } 
             px-3 py-1 rounded-lg text-sm`}
            >
                 <RiVerifiedBadgeFill />
              <span>
              {info?.document_verifications?.is_aadhar_back_verified === 1
                  ? "Verify"
                  : "Not Verified"}
              </span>
            </div>
          </div>
          <div className="w-full h-60 border-zinc-200 border-[1px] rounded-md mt-2 overflow-hidden">
            <LazyImage
              className="w-full h-full object-cover"
              src={info?.documents?.aadhar_front_image}
              alt="Aadhar Card Back"
            />
          </div>
    
        </div>

        {/* Pan Card Image */}
        <div className="bg-zinc-50 rounded-lg shadow-sm px-4 py-2">
          <div className="flex justify-between">
            <h3 className="text-zinc-600 font-semibold">Pan Card Image</h3>
            <div
              className={`flex items-center gap-1
                border-[1px] ${
                  info?.document_verifications?.is_pan_card_verified === 1
                    ? "bg-green-100 text-green-600 border-green-600"
                    : "bg-red-100 text-red-600 border-red-600"
                } 
               px-3 py-1 rounded-lg text-sm`}
            >
              <RiVerifiedBadgeFill />
              <span>
                {info?.document_verifications?.is_pan_card_verified === 1
                  ? "Verify"
                  : "Not Verified"}
              </span>
            </div>
          </div>
          <div className="w-full h-60 border-zinc-200 border-[1px] rounded-md mt-2 overflow-hidden">
            <LazyImage
              className="w-full h-full object-cover"
              src={info?.documents?.pan_card_image}
              alt="Pan Card"
            />
          </div>
        </div>

        {/* Cancel Cheque Photo */}
        <div className="bg-zinc-50 rounded-lg shadow-sm px-4 py-2">
          <div className="flex justify-between">
            <h3 className="text-zinc-600 font-semibold">Cancel Cheque Photo</h3>
            <div
              className={`flex items-center gap-1
          border-[1px] ${
            info?.document_verifications?.is_blank_cheque_verified === 1
              ? "bg-green-100 text-green-600  border-green-600"
              : "bg-red-100 text-red-600 border-red-600"
          } 
         px-3 py-1 rounded-lg text-sm`}
            >
                <RiVerifiedBadgeFill />
              <span>
              {info?.document_verifications?.is_blank_cheque_verified === 1
                  ? "Verify"
                  : "Not Verified"}
              </span>
            </div>
          </div>
          <div className="w-full h-60 border-zinc-200 border-[1px] rounded-md mt-2 overflow-hidden">
            <LazyImage
              className="w-full h-full object-cover"
              src={info?.documents?.blank_cheque_image}
              alt="Cancel Cheque"
            />
          </div>
 
        </div>
         {/* Educations Photo */}
         <div className="bg-zinc-50 rounded-lg shadow-sm px-4 py-2">
          <div className="flex justify-between">
            <h3 className="text-zinc-600 font-semibold">Education Qualification</h3>
            <div
              className={`flex items-center gap-1
               border-[1px] ${
            info?.document_verifications?.is_education_qualification_verified === 1
              ? "bg-green-100 text-green-600  border-green-600"
              : "bg-red-100 text-red-600 border-red-600"
          } 
         px-3 py-1 rounded-lg text-sm`}
            >
                <RiVerifiedBadgeFill />
              <span>
              {info?.document_verifications?.is_education_qualification_verified === 1
                  ? "Verify"
                  : "Not Verified"}
              </span>
            </div>
          </div>
          <div className="w-full h-60 border-zinc-200 border-[1px] rounded-md mt-2 overflow-hidden">
            <LazyImage
              className="w-full h-full object-cover"
              src={info?.documents?.education_qualification}
              alt="Cancel Cheque"
            />
          </div>
 
        </div>

        {/* Profile Image */}
        <div className="bg-zinc-50 rounded-lg shadow-sm px-4 py-2">
          <div className="flex justify-between">
            <h3 className="text-zinc-600 font-semibold">Profile Image</h3>
            <div
              className={`flex items-center gap-1
            border-[1px] ${
              info?.document_verifications?.is_user_photo_verified === 1
                ? "bg-green-100 text-green-600  border-green-600"
                : "bg-red-100 text-red-600 border-red-600"
            } 
           px-3 py-1 rounded-lg text-sm`}
            >
              <RiVerifiedBadgeFill />
              <span>
              {info?.document_verifications?.is_user_photo_verified === 1
                  ? "Verify"
                  : "Not Verified"}
              </span>
            </div>
          </div>
          <div className="w-full h-60 border-zinc-200 border-[1px] rounded-md mt-2 overflow-hidden">
            <LazyImage
              className="w-full h-full object-cover"
              src={info?.documents?.userPhoto}
              alt="profile image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocView;
