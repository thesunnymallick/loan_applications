import { Button, Input, Select } from "antd";
import React from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const CreateRole = () => {
  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2">
            <Link to="/admin/role-assigned" className="ext-zinc-700 font-semibold text-2xl cursor-pointer"><FaArrowLeft/></Link>
          <h2 className="text-zinc-700 font-semibold text-xl">
            Sales Excutive/RM Create
          </h2>
        </div>
        <form className="p-4">
          <h2 className="text-zinc-700 font-semibold text-lg pt-2">
            Personal Details
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-zinc-500 font-semibold" htmlFor="">
                Name
              </label>
              <Input size="large" placeholder="Enter your name" />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-zinc-500 font-semibold" htmlFor="">
                Email
              </label>
              <Input type="email" size="large" placeholder="Enter your email" />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-zinc-500 font-semibold" htmlFor="">
                Phone No
              </label>
              <Input size="large" placeholder="Enter your phone number" />
            </div>
          </div>

          <h2 className="text-zinc-700 font-semibold text-lg pt-2 mt-4">
            Bank Details
          </h2>
          <div className="flex items-center gap-3 mt-1 ">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-zinc-500 font-semibold" htmlFor="">
                Account holder Name
              </label>
              <Input
                size="large"
                placeholder="Enter your Account holder name "
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-zinc-500 font-semibold" htmlFor="">
                Bank Account name
              </label>
              <Input size="large" placeholder="Enter your bank account name " />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-zinc-500 font-semibold" htmlFor="">
                Bank account No
              </label>
              <Input
                type="email"
                size="large"
                placeholder="Enter your Bank account no"
              />
            </div>
          </div>
          <div className="w-[33%] mt-2">
            <div className=" flex flex-col gap-1">
              <label className="text-sm text-zinc-500 font-semibold" htmlFor="">
                IFSC Code
              </label>
              <Input size="large" placeholder="Enter your IFSC code" />
            </div>
          </div>

          <h2 className="text-zinc-700 font-semibold text-lg pt-2 mt-4">
            More Info
          </h2>

          <div className="flex items-center gap-3 mt-1 ">
            <div className="w-[40%] flex flex-col gap-1">
              <label className="text-sm text-zinc-500 font-semibold" htmlFor="">
                Select Role
              </label>
              <Select size="large" placeholder="Select role " />
            </div>
           
           <div className=" w-[40%] flex items-center gap-2">
           <div className="w-[70%] flex flex-col   gap-1">
              <label className="text-sm text-zinc-500 font-semibold" htmlFor="">
                Password
              </label>
              <Input.Password
                size="large"
                placeholder="Enter password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
            <div className="w-[30%]  mt-6">
            <button  className="w-full h-10 bg-green-700 text-white rounded-md shadow-sm">Genarate</button>
            </div>
           </div>
          </div>

          <div className="py-2 mt-10 flex justify-center items-center gap-3">
          <Button className="w-[15%] h-10 rounded-lg">Cancel</Button>
          <Button className="w-[15%] h-10 bg-green-700 text-white rounded-lg">
            Save
          </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRole;
