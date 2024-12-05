/** @format */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaRegBuilding } from 'react-icons/fa';
import userCricle from "../../assets/userCricle.jpg"
import { FaRegHourglassHalf } from "react-icons/fa6";
import { MdMiscellaneousServices } from "react-icons/md";

const SettingCard= () => {

    const { userData, role } = useSelector((state) => state.auth);
    const location=useLocation();
  //all profile items
  const settingsItems = [
    {
      title: 'Loan Status',
      path: '/setting/loanStatus',
      icon: <FaRegHourglassHalf/>,
    },

    {
      title: 'Add Service',
      path: '/setting/service',
      icon: <MdMiscellaneousServices/>,
    },

  ];

  return (
    <div className="w-[70%] sm:w-[20%] bg-white rounded-md shadow-sm mx-auto sm:mx-0 z-20">
      <div className="flex flex-col justify-center items-center border-b border-b-zinc-300 px-2 py-4">
        <img
          className="w-14 h-14 object-cover rounded-full mb-1"
          src={userCricle}
          alt={`${userData?.name || "User Photo"}  `}
        />
        <span className="text-xl text-zinc-700 font-semibold mb-0">
          {`${userData.name}`}
        </span>
        <span className="text-sm text-zinc-500 font-semibold mb-1">
          {role}
        </span>
      </div>

      <div className="py-6">
        <ul className="flex flex-col gap-4 py-4">
          {settingsItems.map((item) => (
            <Link
              to={item.path}
              key={item.path}
              className={`flex items-center gap-x-2 text-base font-semibold py-2 px-4 cursor-pointer
              hover:bg-green-100 hover:text-green-700 hover:border-r-2
              hover:border-r-green-700 transition-all duration-300 ${
              location.pathname === item.path
              ? 'bg-green-100 text-green-700 border-r-2 border-r-green-700'
              : 'text-zinc-700'
              }`}>
              <span className="text-2xl">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SettingCard;