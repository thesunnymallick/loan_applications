import React from "react";
import { MdOutlineAdd } from "react-icons/md";
import AllMembers from "../../components/salesExcutiveComponent/partner/AllMembers";
import { useNavigate } from "react-router-dom";

const Partner = () => {
  const navigate = useNavigate();
  return (
    <div className="px-8 py-4">
      <div className="flex justify-between">
        <h1 className="text-zinc-800 text-2xl font-semibold">All Members</h1>
        <button
          onClick={() => navigate("/sales-executive/add-new-member")}
          className="
          w-[16%] h-10
          bg-green-700
          text-white rounded-lg shadow-sm flex justify-center items-center gap-1 text-base"
        >
          <span className="text-lg">
            <MdOutlineAdd />
          </span>
          <span>Add New Member</span>
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4 mt-5">
        <AllMembers />
      </div>
    </div>
  );
};

export default Partner;
