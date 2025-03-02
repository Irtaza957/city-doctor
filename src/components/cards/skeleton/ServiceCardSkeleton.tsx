import { PiMountainsFill } from "react-icons/pi";

const ServiceCardSkeleton = () => {
  return (
    <div className="w-full h-full grid grid-cols-5 gap-2.5 rounded-lg bg-gray-100 animate-pulse p-3">
      <div className="col-span-1 w-full rounded-l-2xl flex items-center justify-center">
        <PiMountainsFill className="w-full h-full text-gray-200 animate-pulse" />
      </div>
      <div className="col-span-4 w-full flex flex-col items-start justify-start space-y-1.5">
        <div className="w-full h-6 rounded-full bg-gray-200 animate-pulse" />
        <div className="w-1/2 h-3 rounded-full bg-gray-200 animate-pulse" />
        <div className="w-2/3 h-3 rounded-full bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
};

export default ServiceCardSkeleton;
