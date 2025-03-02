import React from "react";
import { PiMountainsFill } from "react-icons/pi";

const CategorySkeletion = () => {
  return (
    <div className="w-full h-full rounded-lg py-5 px-8 bg-[#F5F5F5] animate-pulse flex flex-col items-center justify-center space-y-3">
      <PiMountainsFill className="w-12 h-12 text-gray-200 animate-pulse" />
      <div className="w-full flex flex-col items-center justify-center space-y-1">
        <div className="w-1/2 h-1.5 rounded-full bg-gray-200 animate-pulse" />
        <div className="w-2/3 h-1.5 rounded-full bg-gray-200 animate-pulse" />
        <div className="w-1/2 h-1.5 rounded-full bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
};

export default CategorySkeletion;
