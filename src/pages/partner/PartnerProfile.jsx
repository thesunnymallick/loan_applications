import React from "react";
import userImage from "../../assets/user.jpg";

import { FaFileDownload } from "react-icons/fa";
import { Tabs } from "antd";
import UploadDocView from "../../components/salesExcutiveComponent/partner/UploadDocView";
const { TabPane } = Tabs;

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
            <span>
              <FaFileDownload />
            </span>
            <span>Download</span>
          </button>
        </div>

        <div className="">
          <Tabs defaultActiveKey="1" onChange={(key) => console.log(key)}>
            <TabPane tab="About" key="1">
              <div className="h-[40vh] overflow-x-auto">
              <div className="">
                <h2 className="text-zinc-800 font-semibold text-lg">
                  Personal Details
                </h2>
                <div className="p-2 grid grid-cols-3  gap-4">
                  <div className="flex flex-col text-zinc-600">
                    <span className="">Name</span>
                    <span className="text-zinc-700 font-semibold">
                      Sunny Mallick
                    </span>
                  </div>
                  <div className="flex flex-col text-zinc-600">
                    <span className="">Email</span>
                    <span className="text-zinc-700 font-semibold">
                      alfesunny300@gmail.com
                    </span>
                  </div>

                  <div className="flex flex-col text-zinc-600">
                    <span className="">Phone No</span>
                    <span className="text-zinc-700 font-semibold">
                      62971719586
                    </span>
                  </div>

                  <div className="flex flex-col text-zinc-600">
                    <span className="">WhatsApp No</span>
                    <span className="text-zinc-700 font-semibold">
                      62971719586
                    </span>
                  </div>
                  <div className="flex flex-col text-zinc-600">
                    <span className="">Gender</span>
                    <span className="text-zinc-700 font-semibold">Male</span>
                  </div>

                  <div className="flex flex-col text-zinc-600">
                    <span className="">Date Of Birth</span>
                    <span className="text-zinc-700 font-semibold">
                      02-05-2000
                    </span>
                  </div>

                  <div className="flex flex-col text-zinc-600">
                    <span className="">Subscription</span>
                    <span className="text-zinc-700 font-semibold">
                      DSA DELIGHT PRO
                    </span>
                  </div>
                  <div className="flex flex-col text-zinc-600">
                    <span className="">Subscription Prize</span>
                    <span className="text-zinc-700 font-semibold">344</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <h2 className="text-zinc-800 font-semibold text-lg">
                Banking Details
                </h2>

                <div className="p-2 grid grid-cols-3 gap-2">

                <div className="flex flex-col text-zinc-600">
                    <span className="">Bank Name</span>
                    <span className="text-zinc-700 font-semibold">
                      State Bank Of India
                    </span>
                </div>

                <div className="flex flex-col text-zinc-600">
                    <span className="">Bank Ifsc</span>
                    <span className="text-zinc-700 font-semibold">
                    SBIN0009728
                    </span>
                </div>

                <div className="flex flex-col text-zinc-600">
                    <span className="">Bank Account No</span>
                    <span className="text-zinc-700 font-semibold">
                     62971719586
                    </span>
                </div>
                <div className="flex flex-col text-zinc-600">
                    <span className="">Bank Account Name</span>
                    <span className="text-zinc-700 font-semibold">
                   Sunny Mallick
                    </span>
                </div>

                </div>
              </div>

              <div className="mt-3">
                <h2 className="text-zinc-800 font-semibold text-lg">
                Identity Details
                </h2>

                <div className="p-2 grid grid-cols-3 gap-2">

                <div className="flex flex-col text-zinc-600">
                    <span className="">GST</span>
                    <span className="text-zinc-700 font-semibold">
                      2%
                    </span>
                </div>

                <div className="flex flex-col text-zinc-600">
                    <span className="">Identity Details</span>
                    <span className="text-zinc-700 font-semibold">
                    1234456789010
                    </span>
                </div>

                <div className="flex flex-col text-zinc-600">
                    <span className="">Pan No</span>
                    <span className="text-zinc-700 font-semibold">
                     ABCD12344
                    </span>
                </div>
                <div className="flex flex-col text-zinc-600">
                    <span className="">Bank Account Name</span>
                    <span className="text-zinc-700 font-semibold">
                   Sunny Mallick
                    </span>
                </div>

                </div>
              </div>

              <div className="mt-3">
                <h2 className="text-zinc-800 font-semibold text-lg">
                  Permanent Address
                </h2>

                <div className="p-2 grid grid-cols-3 gap-2">

                <div className="flex flex-col text-zinc-600">
                    <span className="">City</span>
                    <span className="text-zinc-700 font-semibold">
                      Bankura
                    </span>
                </div>

                <div className="flex flex-col text-zinc-600">
                    <span className="">Pincode</span>
                    <span className="text-zinc-700 font-semibold">
                       722208
                    </span>
                </div>

                <div className="flex flex-col text-zinc-600">
                    <span className="">State</span>
                    <span className="text-zinc-700 font-semibold">
                     westbengal
                    </span>
                </div>
                <div className="flex flex-col text-zinc-600">
                    <span className="">Address</span>
                    <span className="text-zinc-700 font-semibold">
                    UTTAR KATGAON, DIGHABANA HAT, CHOPRA, UTTAR DINAJPUR, WEST BENGAL, 733207
                    </span>
                </div>

                </div>
              </div>
              <div className="mt-3">
                <h2 className="text-zinc-800 font-semibold text-lg">
                Office Address
                </h2>

                <div className="p-2 grid grid-cols-3 gap-2">

                <div className="flex flex-col text-zinc-600">
                    <span className="">City</span>
                    <span className="text-zinc-700 font-semibold">
                      Bankura
                    </span>
                </div>

                <div className="flex flex-col text-zinc-600">
                    <span className="">Pincode</span>
                    <span className="text-zinc-700 font-semibold">
                       722208
                    </span>
                </div>

                <div className="flex flex-col text-zinc-600">
                    <span className="">State</span>
                    <span className="text-zinc-700 font-semibold">
                     westbengal
                    </span>
                </div>
                <div className="flex flex-col text-zinc-600">
                    <span className="">Address</span>
                    <span className="text-zinc-700 font-semibold">
                    UTTAR KATGAON, DIGHABANA HAT, CHOPRA, UTTAR DINAJPUR, WEST BENGAL, 733207
                    </span>
                </div>

                </div>
              </div>
              </div>
            </TabPane>
            <TabPane tab="Upload Documents" key="2">
              <UploadDocView/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PartnerProfile;
