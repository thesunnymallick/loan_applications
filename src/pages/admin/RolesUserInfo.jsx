import { Tag } from 'antd';
import React from 'react'

const RolesUserInfo = ({userProfileInfo}) => {


  return (
    <div 
    className='p-6'
    >
        <div className='flex gap-2'>
            <div className='flex-1 '>
                <div className='grid grid-cols-2 gap-1'>
                <div className='flex flex-col  text-zinc-700 '>
                    <span>Name</span>
                    <span className='text-zinc-800 font-semibold'>{userProfileInfo.name}</span>
                </div>
                <div className='flex flex-col  text-zinc-700 '>
                    <span>Email</span>
                    <span className='text-zinc-800 font-semibold'>{userProfileInfo.email}</span>
                </div>
                <div className='flex flex-col  text-zinc-700 '>
                    <span>Phone No</span>
                    <span className='text-zinc-800 font-semibold'>{userProfileInfo.phone_no}</span>
                </div>
                <div className='flex flex-col  text-zinc-700 '>
                    <span>Role</span>
                    <span className='text-zinc-800 font-semibold'>
                        <Tag color={`${userProfileInfo.role==='Sales Executive'?
                             "blue" : "green"}`}>{userProfileInfo.role}</Tag>
                    </span>
                </div>

                <div className='flex flex-col  text-zinc-700 '>
                    <span>Account Holder Name</span>
                    <span className='text-zinc-800 font-semibold'>{userProfileInfo.account_holder_name}</span>
                </div>

                <div className='flex flex-col  text-zinc-700 '>
                    <span>Bank Account Number</span>
                    <span className='text-zinc-800 font-semibold'>{userProfileInfo.bank_account_no}</span>
                </div>

                <div className='flex flex-col  text-zinc-700 '>
                    <span>IFSC Code</span>
                    <span className='text-zinc-800 font-semibold'>{userProfileInfo.ifsc_code}</span>
                </div>


                </div>
            </div>
            <div className='w-48 h-72 rounded-md border-[4px] border-green-700 overflow-hidden'>
              <img className='object-cover w-full h-full' src={userProfileInfo.userPhoto} alt="userPhoto" />
            </div>
        </div>
    </div>
  )
}

export default RolesUserInfo