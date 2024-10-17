import React from "react";
import { MdGroups } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { FaUserMinus } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { Progress } from "antd";
import {
  BarChart,
  LineChart,
} from "../../components/salesExcutiveComponent/dashboardComponent/SalesExcDashbaordChart";
import PlaneOverview from "../../components/salesExcutiveComponent/dashboardComponent/PlaneOverview";

const Dashboard = () => {
  const cardItems = [
    {
      title: "Total Partner",
      value: 56,
      icon: <MdGroups />,
      bgColor: "bg-blue-50",
      iconBgColor: "bg-blue-700",
    },
    {
      title: "Active Partner",
      value: 45,
      icon: <FaUserCheck />,
      bgColor: "bg-green-50",
      iconBgColor: "bg-green-700",
    },
    {
      title: "Deactive Partner",
      value: 10,
      icon: <FaUserMinus />,
      bgColor: "bg-red-50",
      iconBgColor: "bg-red-700",
    },
    {
      title: "Total Revenues",
      value: 2345,
      icon: <FaRupeeSign />,
      bgColor: "bg-yellow-50",
      iconBgColor: "bg-yellow-700",
    },
  ];

  return (
    <div className="px-8 py-4">
      <h1 className="text-zinc-800 trext-2xl font-semibold">Dashbaord</h1>
      {/* show card itmes */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardItems.map((item) => {
          return (
            <div className={`p-4 ${item.bgColor} rounded-lg shadow-sm `}>
              <div className="flex justify-between">
                <div
                  className={`w-10 h-10 rounded-lg ${item.iconBgColor} text-white flex justify-center items-center shadow-sm text-lg`}
                >
                  {item.icon}
                </div>
                <span className="text-xl text-zinc-500">
                  <MdArrowOutward />
                </span>
              </div>
              <div className="mt-3">
                <h2 className="text-zinc-700 text-xl">{item.title}</h2>
                <span className="text-zinc-900 text-xl font-semibold">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl text-zinc-800 font-semibold">
              Your Incentive
            </h2>
            <div className="py-3">
              <Progress type="circle" percent={5} strokeColor="#1a73e8" />
            </div>
            <span className="flex items-center gap-1 text-sm">
              <span className="text-blue-700">Incentive :</span>
              <span className="text-blue-700 font-semibold">5%</span>
            </span>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl text-zinc-800 font-semibold">
              Total Target
            </h2>
            <div className="py-3">
              <Progress type="circle" percent={75} strokeColor="#34a853" />
            </div>
            <span className="flex items-center gap-1 text-sm">
              <span className="text-green-700">Total Target :</span>
              <span className="text-green-700 font-semibold">6000</span>
            </span>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl text-zinc-800 font-semibold">
              Achieve Target
            </h2>
            <div className="py-3">
              <Progress type="circle" percent={60} strokeColor="#fbbc05" />
            </div>
            <span className="flex items-center gap-1 text-sm">
              <span className="text-yellow-400">Achieve Target :</span>
              <span className="text-yellow-400 font-semibold">3400</span>
            </span>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl text-zinc-800 font-semibold">
              Pending Target
            </h2>
            <div className="py-3">
              <Progress type="circle" percent={35} strokeColor="#ea4335" />
            </div>
            <span className="flex items-center gap-1 text-sm">
              <span className="text-red-700">Pending Target :</span>
              <span className="text-red-700 font-semibold">3000</span>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">
          Revenue and Targets Overview
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-xl text-zinc-800 font-semibold mb-4">
              Revenue Trend
            </h3>
            <LineChart />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-xl text-zinc-800 font-semibold mb-4">
              Target Achievement
            </h3>
            <BarChart />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <h1 className="text-xl text-zinc-800 font-semibold">DSA Packages</h1>
        <div className="bg-white rounded-lg shadow-sm p-4 mt-3">
          <PlaneOverview />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
