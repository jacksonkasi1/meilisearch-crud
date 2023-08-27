import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="w-full max-w-md">
      {/* First Skeleton Row */}
      <div className="flex space-x-4 py-4">
        <div className="w-1/4 h-16 bg-gray-300 animate-pulse"></div>
        <div className="flex-1 space-y-2">
          <div className="w-full h-4 bg-gray-300 animate-pulse"></div>
          <div className="w-2/3 h-4 bg-gray-300 animate-pulse"></div>
        </div>
      </div>
      {/* Second Skeleton Row */}
      <div className="flex space-x-4 py-4">
        <div className="w-1/4 h-16 bg-gray-300 animate-pulse"></div>
        <div className="flex-1 space-y-2">
          <div className="w-full h-4 bg-gray-300 animate-pulse"></div>
          <div className="w-2/3 h-4 bg-gray-300 animate-pulse"></div>
        </div>
      </div>
      {/* Add more skeleton rows as needed */}
    </div>
  );
};

export default SkeletonLoader;
