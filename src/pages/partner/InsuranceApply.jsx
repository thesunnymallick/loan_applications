import React from "react";
import { Button, Input, Select } from "antd";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const { Option } = Select;

const InsuranceApply = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2">
        <Link
          to={`/our-panels/insurancePanel`}
          className="text-2xl text-zinc-800 cursor-pointer"
        >
          <FaArrowLeft />
        </Link>
        <span className="text-zinc-800 font-semibold text-2xl">
          Create New Insurance
        </span>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
        <form>
          <div className="grid grid-cols-4 gap-4">
            {/* First Name */}
            <div className="flex flex-col gap-2">
              <label>First Name</label>
              <Input 
               size="large"
              placeholder="Enter First Name" />
            </div>

            {/* Middle Name */}
            <div className="flex flex-col gap-2">
              <label>Middle Name</label>
              <Input    size="large" placeholder="Enter Middle Name" />
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2">
              <label>Last Name</label>
              <Input    size="large" placeholder="Enter Last Name" />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <Input    size="large" placeholder="Enter Email" type="email" />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <label>Phone Number</label>
              <Input    size="large" placeholder="Enter Phone Number" type="tel" />
            </div>

            {/* PAN Number */}
            <div className="flex flex-col gap-2">
              <label>PAN Number</label>
              <Input    size="large" placeholder="Enter PAN Number" />
            </div>

            {/* Aadhar Number */}
            <div className="flex flex-col gap-2">
              <label>Aadhar Number</label>
              <Input    size="large" placeholder="Enter Aadhar Number" />
            </div>

            {/* Residence Address */}
            <div className="flex flex-col gap-2 col-span-2">
              <label>Residence Address</label>
              <Input    size="large" placeholder="Enter Residence Address" />
            </div>

            {/* Residence City */}
            <div className="flex flex-col gap-2">
              <label>Residence City</label>
              <Input    size="large" placeholder="Enter Residence City" />
            </div>

            {/* Residence Pincode */}
            <div className="flex flex-col gap-2">
              <label>Residence Pincode</label>
              <Input    size="large" placeholder="Enter Residence Pincode" />
            </div>

            {/* Residence State */}
            <div className="flex flex-col gap-2">
              <label>Residence State</label>
              <Input    size="large" placeholder="Enter Residence State" />
            </div>

            {/* Insurance Type */}
            <div className="flex flex-col gap-2 col-span-2">
              <label>Insurance Type</label>
              <Select    size="large"  placeholder="Select Insurance Type">
                <Option value="bike">Bike Insurance</Option>
                <Option value="car">Car Insurance</Option>
                <Option value="others">Others</Option>
              </Select>
            </div>

            {/* Vehicle Number */}
            <div className="flex flex-col gap-2">
              <label>Bike/Car Number</label>
              <Input    size="large" placeholder="Enter Bike/Car Number" />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button
            //   loading={loading}
              htmlType="submit"
              className="bg-green-700 text-white px-6 py-2 rounded h-10 w-[10%]"
            >
              Save
            </Button>
            <Button type="button" className="bg-zinc-400 text-white px-6 py-2 rounded w-[10%] h-10">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InsuranceApply;
