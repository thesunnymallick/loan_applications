import React from 'react'
import { SyncLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-100">
    <div className="flex flex-col items-center">
      {/* Spinner from react-spinners */}
      <SyncLoader  color="#00A300" />

      {/* Loading Text */}
      <span className="text-2xl font-semibold text-gray-900 mt-4">
        Please wait...
      </span>
    </div>
  </div>
  )
}

export default Loader