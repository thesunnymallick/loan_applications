import React from "react";
import {
  FaFileAlt,
  FaUserCheck,
  FaUserClock,
  FaRegCheckCircle,
} from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import OurPanels from "./OurPanels";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const PartnerDashboard = () => {
  const loanAnalysisData = {
    totalFiles: 11,
    login: 0,
    bankerPendancy: 1,
    softApprove: 0,
    disbursed: 0,
  };

  const taxationAnalysisData = {
    totalFiles: 8,
    login: 2,
    bankerPendancy: 3,
    softApprove: 1,
    disbursed: 2,
  };

  const loanAnalysisCards = [
    {
      label: "Total Files",
      value: loanAnalysisData.totalFiles,
      gradient: "from-blue-400 to-blue-600",
      icon: <FaFileAlt className="text-white text-4xl" />,
    },
    {
      label: "Login",
      value: loanAnalysisData.login,
      gradient: "from-green-400 to-green-600",
      icon: <FaUserClock className="text-white text-4xl" />,
    },
    {
      label: "Banker Pendency",
      value: loanAnalysisData.bankerPendancy,
      gradient: "from-yellow-400 to-yellow-600",
      icon: <FaUserCheck className="text-white text-4xl" />,
    },
    {
      label: "Soft Approve",
      value: loanAnalysisData.softApprove,
      gradient: "from-purple-400 to-purple-600",
      icon: <FaRegCheckCircle className="text-white text-4xl" />,
    },
    {
      label: "Disbursed",
      value: loanAnalysisData.disbursed,
      gradient: "from-red-400 to-red-600",
      icon: <FaFileAlt className="text-white text-4xl" />,
    },
  ];

  const taxationAnalysisCards = [
    {
      label: "Total Files",
      value: taxationAnalysisData.totalFiles,
      gradient: "from-teal-400 to-teal-600",
      icon: <FaFileAlt className="text-white text-4xl" />,
    },
    {
      label: "Login",
      value: taxationAnalysisData.login,
      gradient: "from-pink-400 to-pink-600",
      icon: <FaUserClock className="text-white text-4xl" />,
    },
    {
      label: "Banker Pendency",
      value: taxationAnalysisData.bankerPendancy,
      gradient: "from-orange-400 to-orange-600",
      icon: <FaUserCheck className="text-white text-4xl" />,
    },
    {
      label: "Soft Approve",
      value: taxationAnalysisData.softApprove,
      gradient: "from-indigo-400 to-indigo-600",
      icon: <FaRegCheckCircle className="text-white text-4xl" />,
    },
    {
      label: "Disbursed",
      value: taxationAnalysisData.disbursed,
      gradient: "from-red-500 to-red-700",
      icon: <FaFileAlt className="text-white text-4xl" />,
    },
  ];

  return (
    <div className="p-6 font-poppins text-gray-800">
      <div className="text-3xl font-bold mb-6 text-gray-900">
        Partner Dashboard
      </div>

      {/* Loan Analysis Section */}
      <div className="p-2 mb-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Loan Analysis
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {loanAnalysisCards.map(({ label, value, gradient, icon }, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${gradient} text-white flex flex-col items-center p-4 rounded-lg shadow-md`}
            >
              {icon}
              <span className="text-lg font-semibold mt-3">{value}</span>
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Taxation Analysis Section */}
      <div className="p-2">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Taxation Analysis
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {taxationAnalysisCards.map(
            ({ label, value, gradient, icon }, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${gradient} text-white flex flex-col items-center p-4 rounded-lg shadow-md`}
              >
                {icon}
                <span className="text-lg font-semibold mt-3">{value}</span>
                <span className="text-sm">{label}</span>
              </div>
            )
          )}
        </div>
      </div>

      <div>
        <div className="flex justify-center flex-col items-center text-center my-8">
          <h1 className="text-4xl font-extrabold  text-zinc-900">
          Powerful Panels for a Smarter Future
          </h1>
          <p className="text-lg text-zinc-600 mt-2">
            Explore the various services we offer in different domains.
          </p>
        </div>

        <OurPanels />
      </div>
    </div>
  );
};

export default PartnerDashboard;
