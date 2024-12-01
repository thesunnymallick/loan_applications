import { Input } from "antd";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const CreditCardApply = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2">
        <Link
         to={`/our-panels/creditCard-panel`}
         className="text-2xl text-zinc-800 cursor-pointer">
          <FaArrowLeft />
        </Link>
        <span className="text-zinc-800 font-semibold text-2xl">
          Create New Credit Card
        </span>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
        <div className="grid grid-cols-4 gap-3">
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label>First Name</label>
            <Input size="large" placeholder="Enter First Name" />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <label>Last Name</label>
            <Input size="large" placeholder="Enter Last Name" />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <Input size="large" placeholder="Enter Email" />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label>Phone</label>
            <Input size="large" placeholder="Enter Phone" />
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-2">
            <label>Gender</label>
            <Input size="large" placeholder="Gender" />
          </div>

          {/* DOB */}
          <div className="flex flex-col gap-2">
            <label>Date of Birth</label>
            <Input size="large" placeholder="YYYY-MM-DD" />
          </div>

          {/* Qualification */}
          <div className="flex flex-col gap-2">
            <label>Qualification</label>
            <Input size="large" placeholder="Qualification" />
          </div>

          {/* Current Pincode */}
          <div className="flex flex-col gap-2">
            <label>Current Pincode</label>
            <Input size="large" placeholder="Enter Current Pincode" />
          </div>

          {/* Permanent Pincode */}
          <div className="flex flex-col gap-2">
            <label>Permanent Pincode</label>
            <Input size="large" placeholder="Enter Permanent Pincode" />
          </div>

          {/* Company Name */}
          <div className="flex flex-col gap-2">
            <label>Company Name</label>
            <Input size="large" placeholder="Enter Company Name" />
          </div>

          {/* Designation */}
          <div className="flex flex-col gap-2">
            <label>Designation</label>
            <Input size="large" placeholder="Enter Designation" />
          </div>

          {/* Income */}
          <div className="flex flex-col gap-2">
            <label>Income</label>
            <Input size="large" placeholder="Enter Income" />
          </div>

          {/* Have a Credit Card */}
          <div className="flex flex-col gap-2">
            <label>Have a Credit Card</label>
            <Input size="large" placeholder="Have a credit card" />
          </div>

          {/* PAN */}
          <div className="flex flex-col gap-2">
            <label>PAN</label>
            <Input size="large" placeholder="Enter PAN Number" />
          </div>

          {/* Employment Type */}
          <div className="flex flex-col gap-2">
            <label>Employment Type</label>
            <Input size="large" placeholder="Employment Type" />
          </div>

          {/* Profession */}
          <div className="flex flex-col gap-2">
            <label>Profession</label>
            <Input size="large" placeholder="Profession" />
          </div>

          {/* Office Pincode */}
          <div className="flex flex-col gap-2">
            <label>Office Pincode</label>
            <Input size="large" placeholder="Enter Office Pincode" />
          </div>

          {/* Mother Name */}
          <div className="flex flex-col gap-2">
            <label>Mother Name</label>
            <Input size="large" placeholder="Enter Mother Name" />
          </div>
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button className="bg-green-700 text-white px-6 py-2 rounded">
            Save
          </button>
          <button className="bg-zinc-400 text-white px-6 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditCardApply;
