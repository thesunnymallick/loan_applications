import React from 'react';
import { Skeleton } from 'antd';

const ProfileShimmerUi = () => {
  return (
    <div className="p-6 flex flex-col gap-6 md:flex-row">
      {/* Left Section: Profile Image and Info */}
      <div className="w-full md:w-[30%] bg-white rounded-lg shadow-sm p-4">
        <Skeleton.Avatar size={200} shape="circle" active />
        <div className="mt-4">
          <Skeleton title={false} paragraph={{ rows: 3 }} active />
        </div>
      </div>

      {/* Right Section: Details */}
      <div className="w-full md:w-[80%] bg-white rounded-lg shadow-sm p-4">
        <Skeleton active paragraph={{ rows: 6 }} />

        <div className='mt-4'>
        <Skeleton active paragraph={{ rows: 6 }} />
     
        </div>
        <div className='mt-4'>
        <Skeleton active paragraph={{ rows: 6 }} />
     
        </div>
      </div>
    </div>
  );
};

export default ProfileShimmerUi;
