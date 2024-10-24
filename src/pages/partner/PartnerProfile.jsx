import React from "react";
import userImage from "../../assets/user.jpg";
import { FaFileDownload } from "react-icons/fa";

const PartnerProfile = () => {
  return (
    <div className="p-6 flex gap-3">
      <div className="w-[30%] bg-white rounded-lg shadow-sm p-4">
        <div className="w-full flex justify-center  overflow-hidden rounded-lg">
          <img
            className="w-[80%] object-cover rounded-lg"
            src={userImage}
            alt="Partner Profile"
          />
        </div>
        <div className="px-2">
          <div className="flex flex-col items-center py-3">
            <h1 className="text-zinc-700 font-semibold text-2xl">
              Sunny Mallick
            </h1>
            <span className="flex items-center gap-2 text-base text-zinc-600">
              (<span>ID:</span>
              <span className="font-semibold">12334</span>)
            </span>
          </div>
        </div>
      </div>
      <div className="w-[80%] bg-white rounded-lg shadow-sm p-4">
        <div className="grid grid-cols-3  gap-4 px-6">
          <div className="flex flex-col text-zinc-600">
            <span>Id</span>
            <span className="text-zinc-700 font-semibold">LW-24020382</span>
          </div>
          <div className="flex flex-col text-zinc-600">
            <span>RM Name</span>
            <span className="text-zinc-700 font-semibold">DIPAK MANDAL</span>
          </div>
          <div className="flex flex-col text-zinc-600">
            <span>RM Phone</span>
            <span className="text-zinc-700 font-semibold">9091963351</span>
          </div>
          <div className="flex flex-col text-zinc-600">
            <span>Plan Name</span>
            <span className="text-zinc-700 font-semibold">DSA DELIGHT PRO</span>
          </div>
          <div className="flex flex-col text-zinc-600">
            <span>Joining Date</span>
            <span className="text-zinc-700 font-semibold">
              3rd February, 2024
            </span>
          </div>
          <div className="flex flex-col text-zinc-600">
            <span>State</span>
            <span className="text-zinc-700 font-semibold">WEST BENGAL</span>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button className=" w-[20%] h-10 flex justify-center items-center gap-2 bg-green-700 text-white rounded-md">
            <span><FaFileDownload/></span>
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerProfile;
