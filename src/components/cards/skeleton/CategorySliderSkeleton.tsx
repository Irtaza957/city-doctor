import { PiMountainsFill } from "react-icons/pi";

const CategorySliderSkeleton = () => {
  return (
    <div className="w-full flex items-center justify-start p-3 rounded-lg bg-gray-200 animate-pulse">
      <PiMountainsFill className="text-gray-400 animate-pulse" />
    </div>
  );
};

export default CategorySliderSkeleton;
