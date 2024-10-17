import { DatePicker, Input, Select } from "antd";
import React from "react";

const PersonalInfo = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 ">
        <div className=" flex-1 flex flex-col gap-1">
          <label className="text-zinc-600 text-sm" htmlFor="">
            Name
          </label>
          <Input size="large" placeholder="Enter your name" />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label className="text-zinc-600 text-sm" htmlFor="">
            Mobile No
          </label>
          <Input size="large" placeholder="Enter your mobile number" />
        </div>

        <div className=" flex-1 flex flex-col gap-1">
          <label className="text-zinc-500 text-sm" htmlFor="">
            Email Id
          </label>
          <Input size="large" placeholder="Enter your email id" />
        </div>
      </div>

      <div className="flex items-center gap-3 ">
        <div className=" flex-1 flex flex-col gap-1">
          <label className="text-zinc-600 text-sm" htmlFor="">
            Whats app number
          </label>
          <Input size="large" placeholder="Enter whats app number" />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label className="text-zinc-600 text-sm" htmlFor="">
            Date Of Birth
          </label>
          <DatePicker size="large" />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label className="text-zinc-500 text-sm" htmlFor="">
            Gender
          </label>
          <Select placeholder="Select Gender" size="large"></Select>
        </div>
      </div>

      <div className="flex items-center gap-3 ">
        <div className=" flex-1 flex flex-col gap-1">
          <label className="text-zinc-600 text-sm" htmlFor="">
            Subscription
          </label>
          <Select placeholder="Select Subscription" size="large"></Select>
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label className="text-zinc-600 text-sm" htmlFor="">
            Subscription Prize
          </label>
          <Input size="large" placeholder="Enter Subscription prize" />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label className="text-zinc-500 text-sm" htmlFor="">
            Payment Mode
          </label>
          <Select placeholder="Select Payment Mode" size="large"></Select>
        </div>
      </div>

      <div className="flex items-center ">
        <div className="flex flex-col gap-1 w-[40%]">
          <label className="text-zinc-600 text-sm" htmlFor="">
            Payment Transaction Id
          </label>
          <Input
            placeholder="Enter payment transaction id"
            size="large"
          ></Input>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
