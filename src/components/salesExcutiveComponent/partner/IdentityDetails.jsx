import { Input } from 'antd'
import React from 'react'

const IdentityDetails = () => {
  return (
    <div className="flex flex-col gap-4">
    <div className="flex items-center gap-3 ">
      <div className=" flex-1 flex flex-col gap-1">
        <label className="text-zinc-600 text-sm" htmlFor="">
          GST
        </label>
        <Input size="large" placeholder="Enter your gst" />
      </div>
      <div className=" flex-1 flex flex-col gap-1">
        <label className="text-zinc-600 text-sm" htmlFor="">
          Aadhar
        </label>
        <Input size="large" placeholder="Enter aadhar no" />
      </div>
      <div className=" flex-1 flex flex-col gap-1">
        <label className="text-zinc-600 text-sm" htmlFor="">
          Pan
        </label>
        <Input size="large" placeholder="Enter your pan no" />
      </div>

     
    </div>

  
  </div>
  )
}

export default IdentityDetails