import React from 'react';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { VscUnverified } from "react-icons/vsc";
import aadhaarCard from "../../../assets/aadhaarcard.png";
import panCard from "../../../assets/pancard.png";
import checkBook from "../../../assets/checkBook.png";
import userProfile from "../../../assets/user.jpg"
const UploadDocView = () => {
  return (
    <div className='h-[40vh] overflow-x-auto'>
      <h2 className="text-zinc-800 font-semibold text-lg">
        Upload Documents
      </h2>
      <div className='p-2 grid grid-cols-2 gap-4'>
        {/* Aadhar Front Image */}
        <div className='bg-zinc-50 rounded-lg shadow-sm px-4 py-2'>
          <div className='flex justify-between'>
            <h3 className='text-zinc-600 font-semibold'>Aadhar Front Image</h3>
            <div className='flex items-center gap-1 bg-green-100 text-green-600 border-[1px] border-green-600 px-3 py-1 rounded-lg text-sm'>
              <RiVerifiedBadgeFill />
              <span>Verify</span>
            </div>
          </div>
          <div className='w-full h-60 border-zinc-200 border-[1px] rounded-md mt-2 overflow-hidden'>
            <img className='w-full h-full object-cover' src={aadhaarCard} alt="Aadhar Card Front" />
          </div>
        </div>

        {/* Aadhar Back Image */}
        <div className='bg-zinc-50 rounded-lg shadow-sm px-4 py-2'>
          <div className='flex justify-between'>
            <h3 className='text-zinc-600 font-semibold'>Aadhar Back Image</h3>
            <div className='flex items-center gap-1 bg-red-100 text-red-600 border-[1px] border-red-600 px-3 py-1 rounded-lg text-sm'>
              <VscUnverified />
              <span>Not Verified</span>
            </div>
          </div>
          <div className='w-full h-60 border-zinc-200 border-[1px] rounded-md mt-2 overflow-hidden'>
            <img className='w-full h-full object-cover' src={aadhaarCard} alt="Aadhar Card Back" />
          </div>
          <div className='mt-2 flex justify-center px-2'>
            <span className='text-xs text-red-500'>
              Your uploaded Aadhar card back image is not verified. Please upload the correct image.
            </span>
          </div>
        </div>

        {/* Pan Card Image */}
        <div className='bg-zinc-50 rounded-lg shadow-sm px-4 py-2'>
          <div className='flex justify-between'>
            <h3 className='text-zinc-600 font-semibold'>Pan Card Image</h3>
            <div className='flex items-center gap-1 bg-green-100 text-green-600 border-[1px] border-green-600 px-3 py-1 rounded-lg text-sm'>
              <RiVerifiedBadgeFill />
              <span>Verify</span>
            </div>
          </div>
          <div className='w-full h-60 border-zinc-200 border-[1px] rounded-md mt-2 overflow-hidden'>
            <img className='w-full h-full object-cover' src={panCard} alt="Pan Card" />
          </div>
        </div>

        {/* Cancel Cheque Photo */}
        <div className='bg-zinc-50 rounded-lg shadow-sm px-4 py-2'>
          <div className='flex justify-between'>
            <h3 className='text-zinc-600 font-semibold'>Cancel Cheque Photo</h3>
            <div className='flex items-center gap-1 bg-red-100 text-red-600 border-[1px] border-red-600 px-3 py-1 rounded-lg text-sm'>
              <VscUnverified />
              <span>Not Verified</span>
            </div>
          </div>
          <div className='w-full h-60 border-zinc-200 border-[1px] rounded-md mt-2 overflow-hidden'>
            <img className='w-full h-full object-cover' src={checkBook} alt="Cancel Cheque" />
          </div>
          <div className='mt-2 flex justify-center px-2'>
            <span className='text-xs text-red-500'>
              Your uploaded Cancel Cheque photo is not verified. Please upload the correct image.
            </span>
          </div>
        </div>

        <div className='bg-zinc-50 rounded-lg shadow-sm px-4 py-2'>
          <div className='flex justify-between'>
            <h3 className='text-zinc-600 font-semibold'>Profile Image</h3>
            <div className='flex items-center gap-1 bg-green-100 text-green-600 border-[1px] border-green-600 px-3 py-1 rounded-lg text-sm'>
              <RiVerifiedBadgeFill />
              <span>Verify</span>
            </div>
          </div>
          <div className='w-full h-60 border-zinc-200 border-[1px] rounded-md mt-2 overflow-hidden'>
            <img className='w-full h-full object-cover' src={userProfile} alt="profile iamge" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default UploadDocView;
