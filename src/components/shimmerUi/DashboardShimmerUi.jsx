import React from "react";
import { Skeleton } from "antd";

const DashboardShimmerUi = () => {
  return (
    <div className="p-6 bg-white">
      <div className="flex justify-center flex-col items-center text-center my-8">
        <Skeleton.Input active size="large" style={{ width: 250, height: 40 }} />
      </div>

      {/* Loan Analysis Section */}
      <div className="p-2 mb-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton.Button key={index} active shape="round" style={{ width: 350, height: 200 }} />
          ))}
        </div>
      </div>

      <div className="p-2 mb-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton.Button key={index} active shape="round" style={{ width: 180, height: 200 }} />
          ))}
        </div>
      </div>

      {/* Bar and Line Graph Loading */}
     <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 ">
     <Skeleton.Button active style={{ width: "100%", height: 300 }} />
     <Skeleton.Button active style={{ width: "100%", height: 300 }} />
     
     </div>
    </div>
  );
};

export default DashboardShimmerUi;
