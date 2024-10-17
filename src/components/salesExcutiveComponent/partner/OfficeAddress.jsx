import { Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'

const OfficeAddress = () => {
  return (
    <div className="flex flex-col gap-4">

    <div className="flex items-center gap-3 ">
      <div className="flex-1 flex flex-col gap-1">
        <label className="text-zinc-600 text-sm" htmlFor="">
          Address
        </label>
        <TextArea rows={4} size="large" placeholder="Enter your address" />
      </div>

    </div>

    <div className="flex items-center gap-3 ">
      <div className=" flex-1 flex flex-col gap-1">
        <label className="text-zinc-600 text-sm" htmlFor="">
          State
        </label>
        <Input size="large" placeholder="Enter your state" />
      </div>
      <div className=" flex-1 flex flex-col gap-1">
        <label className="text-zinc-600 text-sm" htmlFor="">
          City
        </label>
        <Input size="large" placeholder="Enter your city" />
      </div>
      <div className=" flex-1 flex flex-col gap-1">
        <label className="text-zinc-600 text-sm" htmlFor="">
          Pincode
        </label>
        <Input size="large" placeholder="Enter your pincode" />
      </div>

     
    </div>

  
  </div>
  )
}

export default OfficeAddress