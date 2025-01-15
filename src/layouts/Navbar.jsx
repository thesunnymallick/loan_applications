import { Avatar, Modal, Menu } from "antd";
import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../features/authSlice";
import userCricle from "../assets/userCricle.jpg";
import { VscThreeBars } from "react-icons/vsc";
import { toggleSidebar } from "../features/toggleSidebarSlice";

const Navbar = () => {
  const { userData, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  // Confiramtion for logout
  const confirmationLogout = () => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to log out?",
      okText: "Logout",
      cancelText: "Cancel",
      okButtonProps: {
        style: { backgroundColor: "green", borderColor: "green" },
      },
      onOk: () => {
        // Add your logout dispatch action here
        dispatch(setLogout());
        navigate("/");
      },
    });
  };



  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="fixed top-0 left-0 w-full py-4 flex items-center  justify-between lg:justify-end
    gap-4 px-6 bg-gray-50 border-b-[1px] border-b-zinc-300 z-40">
      {/* Left side (Avatar, Name, Role) */}
      <div className="flex items-center gap-2 ">
        <Avatar
          shape="circle"
          size={40}
          src={userData?.userPhoto || userCricle}
          alt="User Avatar"
        />
        <div className="flex flex-col">
          <h2 className="text-zinc-800 font-semibold text-lg">
            {userData?.name}
          </h2>
          <span className="text-zinc-500 text-sm -mt-1 capitalize">{role}</span>
        </div>
      </div>

      {/* Right side (Logout and Menu Icon) */}
      <div className="flex items-center gap-4">
        {/* Logout Icon */}
        <div
          onClick={confirmationLogout}
          className="w-10 h-10 bg-white shadow-md 
          rounded-full flex justify-center items-center text-lg text-zinc-800 font-semibold cursor-pointer"
        >
          <FiLogOut />
        </div>

        {/* Menu Icon (Mobile) */}
        <div
          onClick={handleToggleSidebar}
          className="text-black  lg:hidden"
        >
          <span>
            <VscThreeBars className="text-3xl" />
          </span>
        </div>

   
      </div>
    </div>
  );
};

export default Navbar;
