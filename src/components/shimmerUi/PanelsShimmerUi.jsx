import React from 'react';
import { Skeleton } from 'antd';

const PanelsShimmerUi = () => {
  return (
    <div className="p-6">
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4 h-[400px] r">
            <Skeleton active title paragraph={{ rows: 3 }}  />
            <div className='mt-2'>
            <Skeleton active paragraph={{ rows: 6 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanelsShimmerUi;