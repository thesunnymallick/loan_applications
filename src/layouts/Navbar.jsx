
import { Avatar } from "antd";
import React from "react";
import { FiLogOut } from "react-icons/fi";


const Navbar = () => {
  return (
    <div className='sticky top-0 left-0 w-full py-4 flex 
      items-center justify-end gap-2
      px-6 bg-gray-50 border-b-[1px] border-b-zinc-300 z-40'>
     
     <div className="flex items-center gap-2">
     <Avatar
        shape="circle"
        size={40} 
        src="https://randomuser.me/api/portraits/men/32.jpg" 
        alt="User Avatar"
      />
      <div className="flex flex-col ">
        <h2 className="text-zinc-800 font-semibold text-lg">Sunny Mallick</h2>
        <span className="text-zinc-500 text-sm -mt-1">Sales Excutive</span>
      </div>

      <div className="w-10 h-10 bg-white
       shadow-md rounded-full
       ml-4 flex 
       justify-center
       items-center text-lg text-zinc-800 font-semibold cursor-pointer">
       <FiLogOut/>
      </div>
     </div>
     
    </div>
  );
};

export default Navbar;