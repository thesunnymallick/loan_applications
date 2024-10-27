import React, { useState } from "react";
import {
  MdOutlineDashboard,
  MdArrowBackIosNew,
  MdAccountBalance,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { MdGroups } from "react-icons/md";
import { FaUserGear } from "react-icons/fa6";
import { MdOutlineRequestQuote } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation(); // Get the current location (URL)
  const userRole = "Admin";

  const adminMenus = [
    {
      name: "Dashboard",
      link: "/admin/dashboard",
      icon: MdOutlineDashboard,
    },
    { name: "Role Assigned", link: "/admin/role-assigned", icon: FaUserGear },
    {
      name: "Loan Management",
      link: "/admin/loan-management",
      icon: MdOutlineRequestQuote,
    },
    { name: "Users", link: "/admin/users", icon: MdGroups },
    {
      name: "Subscriptions",
      link: "/admin/subscriptions",
      icon: MdSubscriptions,
    },
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
      name: "Financial Services",
      link: "/partner/services",
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
  if (userRole === "Admin") {
    menus = adminMenus;
  } else if (userRole === "Partner") {
    menus = partnerMenus;
  } else if (userRole === "RM") {
    menus = rmMenus;
  } else if (userRole === "salesExecutive") {
    menus = salesExecutive;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div
        className={`bg-green-800 duration-300 ease-in-out bg-gradient-to-b overflow-hidden
        from-green-950 h-screen hidden lg:flex lg:flex-col lg:sticky top-0 z-50 pt-2`}
        style={{ width: sidebarOpen ? "260px" : "80px" }}
      >
        <div className="px-5">
          <li className="flex items-center cursor-pointer gap-x-4 py-2">
            {sidebarOpen && (
              <span className="text-white text-base font-bold">Logo</span>
            )}
          </li>
        </div>

        <div className="flex-1 overflow-y-auto">
          <ul className="pb-0 px-5">
            {menus.map((menu, index) => (
              <div key={index}>
                <Link
                  to={menu.link}
                  className={`flex items-center gap-x-4 text-base text-gray-300 cursor-pointer p-2 hover:bg-green-900 rounded-md 
                  ${
                    location.pathname === menu.link
                      ? "bg-green-900 text-white"
                      : ""
                  }
                  ${menu.margin ? "mt-9" : "mt-2"}`}
                  aria-label={menu.name}
                >
                  <span className="text-2xl">
                    {React.createElement(menu.icon)}
                  </span>
                  <span
                    className={`text-base font-medium ${
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

        <span
          onClick={toggleSidebar}
          className={`w-10 h-10 flex justify-center items-center rounded-full bg-green-800 border-white border-[2px]
          text-white text-xl fixed ${
            sidebarOpen ? "left-[240px]" : "left-[60px]"
          }
          ease-in-out duration-300 top-10 cursor-pointer z-50`}
        >
          <MdArrowBackIosNew
            className={`${
              !sidebarOpen && "rotate-180"
            } transition-transform duration-300`}
          />
        </span>
      </div>
    </>
  );
};

export default Sidebar;
