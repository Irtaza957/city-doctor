import { PiMountainsFill } from "react-icons/pi";

const BookingCardSkeleton = () => {
  return (
    <div className="w-full flex flex-col items-start justify-start rounded-2xl p-2.5 bg-gray-100 animate-pulse">
      <div className="w-1/2 h-3 rounded-full bg-gray-300 animate-pulse" />
      <div className="col-span-1 xl:col-span-2 w-full h-full rounded-l-2xl flex items-center justify-center space-x-3">
        <PiMountainsFill className="w-24 h-24 text-gray-200 animate-pulse" />
        <div className="w-full flex flex-col items-start justify-between space-y-1.5">
          <div className="w-1/2 h-3 rounded-full bg-gray-200 animate-pulse" />
          <div className="w-2/3 h-3 rounded-full bg-gray-200 animate-pulse" />
          <div className="w-1/4 h-3 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </div>
      <div className="w-full flex items-center justify-between animate-pulse space-x-3">
        <div className="w-full flex flex-col items-start justify-start space-y-2.5">
          <div className="w-1/2 h-3 rounded-full bg-gray-200 animate-pulse" />
          <div className="w-full h-3 rounded-full bg-gray-200 animate-pulse" />
        </div>
        <div className="w-1/4 h-12 rounded-lg bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
};

export default BookingCardSkeleton;
