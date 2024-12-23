import React, { useState } from "react";
import {
  MdOutlineDashboard,
  MdArrowBackIosNew,
  MdAccountBalance,
  MdLogout,
  MdAccountBalanceWallet,
} from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdGroups } from "react-icons/md";
import { FaUserGear } from "react-icons/fa6";
import { FaFileUpload } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import { useSelector } from "react-redux";
import { HiOutlineClipboardList } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import userCricle from "../assets/userCricle.jpg";
import logo2 from "../assets/logo/logo2.png";
const Sidebar = () => {
  // Navigate 
  const navigate=useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation(); // Get the current location (URL)
  const { role } = useSelector((state) => state.auth);

  const adminMenus = [
    {
      name: "Dashboard",
      link: "/admin/dashboard",
      icon: MdOutlineDashboard,
    },
    { name: "Role Assigned", link: "/admin/role-assigned", icon: FaUserGear },
    // {
    //   name: "Loan Management",
    //   link: "/admin/loan-management",
    //   icon: MdOutlineRequestQuote,
    // },
    { name: "Users", link: "/admin/users", icon: MdGroups },
    {
      name: "Subscriptions",
      link: "/admin/subscriptions",
      icon: MdSubscriptions,
    },
    { name: "Setting", link: "/setting/loanStatus", icon: IoSettingsOutline },
  ];

  const partnerMenus = [
    {
      name: "Dashboard",
      link: "/partner/dashboard",
      icon: MdOutlineDashboard,
    },
    { name: "Profile Management", link: "/partner/profile", icon: FaUserGear },
    {
      name: "Upload Documents",
      link: "/partner/upload-doc",
      icon: FaFileUpload,
    },
    {
      name: "My Services",
      link: "/our-panels",
      icon: HiOutlineClipboardList,
    },
    {
      name: "I2I Eligible Panel",
      link: "/i2i-eligible-panel",
      icon: MdAccountBalance,
    },

    {
      name: "Instant Login Panel",
      link: "/instant-login-panel",
      icon: MdAccountBalance,
    },
    {
      name: "Instant Login Card",
      link: "/instant-login-card",
      icon: MdAccountBalance,
    },
    
  ];

  const rmMenus = [
    { name: "Dashboard", link: "/rm/dashboard", icon: MdOutlineDashboard },
    { name: "Loan", link: "/rm/loan", icon: MdAccountBalance },
  ];

  const salesExecutive = [
    {
      name: "Dashboard",
      link: "/sales-executive/dashboard",
      icon: MdOutlineDashboard,
    },
    {
      name: "Partner",
      link: "/sales-executive/partner",
      icon: MdGroups,
    },
  ];

  let menus = [];
  if (role === "admin") {
    menus = adminMenus;
  } else if (role === "partner") {
    menus = partnerMenus;
  } else if (role === "RM") {
    menus = rmMenus;
  } else if (role === "Sales Executive") {
    menus = salesExecutive;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div
        className={`bg-gradient-to-b from-green-900 to-green-800 duration-300 ease-in-out overflow-hidden 
        h-screen hidden lg:flex lg:flex-col lg:sticky top-0 z-50 pt-2`}
        style={{ width: sidebarOpen ? "280px" : "80px" }}
      >
        {/* Logo Section */}
        <div className="px-5 py-4">
          <li className="flex justify-center items-center cursor-pointer gap-x-4 py-2">
            {sidebarOpen && (
              <img className="w-[90%] object-cover" src={logo2} alt="logo" />
            )}
          </li>
        </div>

        {/* Menu Section */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <ul className="pb-0 px-5">
            {menus.map((menu, index) => (
              <div key={index}>
                <Link
                  to={menu.link}
                  className={`flex items-center ${
                    !sidebarOpen && "justify-center"
                  } gap-x-4 text-base text-gray-300 cursor-pointer
                  p-2 hover:bg-gradient-to-r from-green-700 to-green-600 rounded-lg shadow-sm 
              ${
                location.pathname === menu.link
                  ? "bg-gradient-to-r from-green-700 to-green-600 text-white shadow-md"
                  : ""
              }
              ${menu.margin ? "mt-10" : "mt-3"}`}
                  aria-label={menu.name}
                >
                  <span className="text-2xl text-white">
                    {React.createElement(menu.icon)}
                  </span>
                  <span
                    className={`text-base font-semibold ${
                      !sidebarOpen && "hidden"
                    }`}
                  >
                    {menu.name}
                  </span>
                </Link>
              </div>
            ))}
          </ul>
        </div>

        {/* Bottom Section */}
        {role === "partner" && (
          <div className="px-5 pb-5 space-y-4 border-t border-green-700">
            {/* User Profile */}
            <div
              className={`flex items-center gap-x-4 p-2 bg-gradient-to-r from-green-800 to-green-700 rounded-lg shadow-md mt-3
            ${!sidebarOpen && "justify-center"}`}
            >
              <img
                src={userCricle} // Replace with actual image path
                alt="User Avatar"
                className={`${
                  sidebarOpen ? "w-12 h-12" : "w-8 h-8"
                } rounded-full object-cover  shadow-md`}
              />
              {sidebarOpen && (
                <div>
                  <h3 className="text-white font-bold text-lg">John Doe</h3>
                  <p className="text-gray-300 text-sm">Premium Member</p>
                </div>
              )}
            </div>

            {/* Subscription */}
            <div
              className={`flex items-center gap-x-4 p-2 bg-gradient-to-r from-green-800 to-green-700 rounded-lg shadow-md ${
                !sidebarOpen && "justify-center"
              }`}
            >
              <MdSubscriptions className="text-3xl text-yellow-400" />
              {sidebarOpen && (
                <div>
                  <span className="text-white font-semibold">Subscription</span>
                  <p className="text-gray-400 text-sm">Active</p>
                </div>
              )}
            </div>

            {/* Wallet Balance */}
            <div
              onClick={()=>navigate(`/partner/wallet`)}
              className={`flex items-center gap-x-4 p-2 bg-gradient-to-r from-green-800 to-green-700 rounded-lg shadow-md cursor-pointer ${
                !sidebarOpen && "justify-center"
              }`}
            >
              <MdAccountBalanceWallet className="text-3xl text-orange-500" />
              {sidebarOpen && (
                <div>
                  <span className="text-white font-semibold">₹ 120.00</span>
                  <p className="text-gray-400 text-sm">Wallet Balance</p>
                </div>
              )}
            </div>

            {/* Logout */}
            <button
              // onClick={handleLogout}
              className={`w-full flex items-center justify-center gap-x-4 px-2 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 ${
                !sidebarOpen && "justify-center"
              }`}
            >
              <MdLogout className="text-2xl" />
              {sidebarOpen && <span className="font-semibold">Log Out</span>}
            </button>
          </div>
        )}

        {/* Sidebar Toggle */}
        <span
          onClick={toggleSidebar}
          className={`w-12 h-12 flex justify-center items-center rounded-full bg-gradient-to-b from-green-700 to-green-600 border-2 border-green-500 text-white text-xl fixed ${
            sidebarOpen ? "left-[260px]" : "left-[60px]"
          } transition-transform duration-300 top-10 cursor-pointer z-50 shadow-lg`}
        >
          <MdArrowBackIosNew
            className={`${!sidebarOpen && "rotate-180"} transform duration-300`}
          />
        </span>
      </div>
    </>
  );
};

export default Sidebar;
