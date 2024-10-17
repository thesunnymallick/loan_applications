import React, { useState } from "react";
import { Button } from "antd";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import PersonalInfo from "../../components/salesExcutiveComponent/partner/PersonalInfo";
import PermanentAddress from "../../components/salesExcutiveComponent/partner/PermanentAddress";
import OfficeAddress from "../../components/salesExcutiveComponent/partner/OfficeAddress";
import IdentityDetails from "../../components/salesExcutiveComponent/partner/IdentityDetails";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const AddNewMember = () => {
  const [isPersonalInfo, setIsPersonalInfo] = useState(true);
  const [isPermanetAddress, setIsPermanetAddress] = useState(true);
  const [isOfficeAddress, setIsOfficeAddress] = useState(true);
  const [isIdentityDetails, setIsIdentityDetails] = useState(true);

  return (
    <div className="px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            to={"/sales-executive/partner"}
            className="text-zinc-800 font-semibold text-2xl mt-1 cursor-pointer"
          >
            <FaArrowLeft />
          </Link>
          <h1 className="text-zinc-800 font-semibold text-2xl">
            File DSA Application
          </h1>
        </div>

        <div className="flex-1 flex items-center justify-end gap-2">
          <Button className="w-[15%] h-10 rounded-lg">Cancel</Button>
          <Button className="w-[15%] h-10 bg-green-700 text-white rounded-lg">
            Save
          </Button>
        </div>
      </div>

      <div className="py-4 px-4">
        {/* PERSONAL INFO */}
        <div className="py-2 bg-zinc-100 rounded-md px-2 shadow-sm flex justify-between items-center">
          <h2 className="text-zinc-700 font-semibold text-xl">Personal Info</h2>
          <span
            onClick={() => setIsPersonalInfo(!isPersonalInfo)}
            className="text-green-500 text-2xl cursor-pointer"
          >
            {isPersonalInfo ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isPersonalInfo ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <div className="bg-white rounded-b-md p-6">
            <PersonalInfo />
          </div>
        </div>

        {/* PERMANENT ADDRESS */}
        <div className="py-2 bg-zinc-100 rounded-md px-2 shadow-sm flex justify-between items-center">
          <h2 className="text-zinc-700 font-semibold text-xl">
            Permanent Address
          </h2>
          <span
            onClick={() => setIsPermanetAddress(!isPermanetAddress)}
            className="text-green-500 text-2xl cursor-pointer"
          >
            {isPermanetAddress ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isPermanetAddress ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <div className="bg-white rounded-b-md p-6">
            <PermanentAddress />
          </div>
        </div>

        {/* OFFICE ADDRESS */}
        <div className="py-2 bg-zinc-100 rounded-md px-2 shadow-sm flex justify-between items-center">
          <h2 className="text-zinc-700 font-semibold text-xl">
            Office Address
          </h2>
          <span
            onClick={() => setIsOfficeAddress(!isOfficeAddress)}
            className="text-green-500 text-2xl cursor-pointer"
          >
            {isOfficeAddress ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOfficeAddress ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <div className="bg-white rounded-b-md p-6">
            <OfficeAddress />
          </div>
        </div>

        {/* IDENTITY DETAILS */}
        <div className="py-2 bg-zinc-100 rounded-md px-2 shadow-sm flex justify-between items-center">
          <h2 className="text-zinc-700 font-semibold text-xl">
            Identity Details
          </h2>
          <span
            onClick={() => setIsIdentityDetails(!isIdentityDetails)}
            className="text-green-500 text-2xl cursor-pointer"
          >
            {isIdentityDetails ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isIdentityDetails ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <div className="bg-white rounded-b-md p-6">
            <IdentityDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewMember;
