import { Input } from 'antd';
import React from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

const AddClient = () => {
  return (
    <div className='p-6'>
      <div className="flex items-center gap-2">
        <Link to={"/our-panels/taxation-panel"} className="text-zinc-700 font-semibold text-2xl">
          <IoMdArrowRoundBack />
        </Link>
        <h1 className="text-zinc-700 font-semibold text-xl">Add Client</h1>
      </div>

      <div className='bg-white rounded-lg shadow-sm p-4 mt-5'>
        <div className='grid grid-cols-3 gap-3'>
          {/* First Name */}
          <div className='flex flex-col gap-1'>
            <label className='text-zinc-700 font-semibold text-sm' htmlFor="firstName">First Name</label>
            <Input size='large' id='firstName' placeholder='Enter First Name' />
          </div>

          {/* Middle Name */}
          <div className='flex flex-col gap-1'>
            <label className='text-zinc-700 font-semibold text-sm' htmlFor="middleName">Middle Name</label>
            <Input size='large' id='middleName' placeholder='Enter Middle Name' />
          </div>

          {/* Last Name */}
          <div className='flex flex-col gap-1'>
            <label className='text-zinc-700 font-semibold text-sm' htmlFor="lastName">Last Name</label>
            <Input size='large' id='lastName' placeholder='Enter Last Name' />
          </div>

          {/* Email */}
          <div className='flex flex-col gap-1'>
            <label className='text-zinc-700 font-semibold text-sm' htmlFor="email">Email</label>
            <Input size='large' id='email' placeholder='Enter Email' />
          </div>

          {/* Phone */}
          <div className='flex flex-col gap-1'>
            <label className='text-zinc-700 font-semibold text-sm' htmlFor="phone">Phone</label>
            <Input size='large' id='phone' placeholder='Enter Phone Number' />
          </div>

          {/* PAN Number */}
          <div className='flex flex-col gap-1'>
            <label className='text-zinc-700 font-semibold text-sm' htmlFor="pan">Pan</label>
            <Input size='large' id='pan' placeholder='Enter Pan Number' />
          </div>

          {/* Aadhar Number */}
          <div className='flex flex-col gap-1'>
            <label className='text-zinc-700 font-semibold text-sm' htmlFor="aadhar">Aadhar</label>
            <Input size='large' id='aadhar' placeholder='Enter Aadhar No' />
          </div>

          {/* Residence Address */}
          <div className='flex flex-col gap-1 col-span-2'>
            <label className='text-zinc-700 font-semibold text-sm' htmlFor="residenceAddress">Residence Address</label>
            <Input size='large' id='residenceAddress' placeholder='Enter Residence Address' />
          </div>

          {/* Residence City */}
          <div className='flex flex-col gap-1'>
            <label className='text-zinc-700 font-semibold text-sm' htmlFor="residenceCity">Residence City</label>
            <Input size='large' id='residenceCity' placeholder='Enter Residence City' />
          </div>

          {/* Residence Pincode */}
          <div className='flex flex-col gap-1'>
            <label className='text-zinc-700 font-semibold text-sm' htmlFor="residencePincode">Residence Pincode</label>
            <Input size='large' id='residencePincode' placeholder='Enter Residence Pincode' />
          </div>

          {/* Residence State */}
          <div className='flex flex-col gap-1'>
            <label className='text-zinc-700 font-semibold text-sm' htmlFor="residenceState">Residence State</label>
            <Input size='large' id='residenceState' placeholder='Enter Residence State' />
          </div>

          {/* Office Address */}
          <div className='flex flex-col gap-1 col-span-2'>
            <label className='text-zinc-700 font-semibold text-sm' htmlFor="officeAddress">Office Address</label>
            <Input size='large' id='officeAddress' placeholder='Enter Office Address' />
          </div>

          {/* Office City */}
          <div className='flex flex-col gap-1'>
            <label className='text-zinc-700 font-semibold text-sm' htmlFor="officeCity">Office City</label>
            <Input size='large' id='officeCity' placeholder='Enter Office City' />
          </div>

          {/* Office Pincode */}
          <div className='flex flex-col gap-1'>
            <label className='text-zinc-700 font-semibold text-sm' htmlFor="officePincode">Office Pincode</label>
            <Input size='large' id='officePincode' placeholder='Enter Office Pincode' />
          </div>

          {/* Office State */}
          <div className='flex flex-col gap-1'>
            <label className='text-zinc-700 font-semibold text-sm' htmlFor="officeState">Office State</label>
            <Input size='large' id='officeState' placeholder='Enter Office State' />
          </div>
        </div>

        <div className='flex justify-end gap-3 mt-5'>
          <button className="px-6 py-2 bg-green-700 text-white rounded-md">Save</button>
          <button className="px-6 bg-zinc-200 text-black py-2 rounded-md">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
