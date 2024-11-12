import { Tag } from 'antd';
import React from 'react'

const RolesUserInfo = ({userProfileInfo}) => {

     console.log("User Info", userProfileInfo);

    //  "name": "Sunny Mallick",
    //  "email": "alfesunnymallick800@gmail.com",
    //  "phone_no": "6297179586",
    //  "account_holder_name": "Sunny",
    //  "bank_account_name": "State Bank Of India",
    //  "bank_account_no": "62917171958690",
    //  "ifsc_code": "SBIN0123456",
    //  "role": "Sales Executive",
    //  "userPhoto": "http://127.0.0.1:8000/storage/images/oOS8TJVerngK51ZNhSiUgZYPYYob18bbWWQWz1Wy.png",

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
            <div className='w-48 h-72 rounded-md border-[2px] border-green-700'>
              <img className='object-cover w-full h-auto' src={userProfileInfo.userPhoto} alt="userPhoto" />
            </div>
        </div>
    </div>
  )
}

export default RolesUserInfo