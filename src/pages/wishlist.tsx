"use client";

import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import "swiper/css";
import { RootState } from "@/store";
import WishlistCard from "@/components/cards/WishlistCard";
import EmptyWishlist from "@/assets/img/empty-wishlist.svg";
import { useGetWishlistQuery } from "@/store/services/wishlist";
import ServiceCardSkeleton from "@/components/cards/skeleton/ServiceCardSkeleton";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<WISHLIST[]>([]);
  const { user } = useSelector((state: RootState) => state.global);

  const { data, isLoading } = useGetWishlistQuery({
    id: user?.customer_id,
    token: user?.token,
  });
  
  useEffect(() => {
    if (data) {
      setWishlist(data!);
    }
  }, [data]);

  return (
    <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto mt-[45.25px] sm:mt-[71.25px] md:mt-[120px] mb-10 pt-5 px-5 md:px-0">
      <h1 className="w-full text-left text-xl xl:text-2xl font-bold mb-5">
        My Wishlist
      </h1>
      <div className="w-full min-h-[700px]">
        {isLoading ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-start justify-start gap-2">
            {[...Array(12)].map((_, idx) => (
              <div key={idx} className="w-full col-span-1">
                <ServiceCardSkeleton />
              </div>
            ))}
          </div>
        ) : wishlist?.length === 0 ? (
          <div className="col-span-1 sm:col-span-2 xl:col-span-3 w-full h-[calc(100vh-250px)] flex flex-col items-center justify-center">
            <Image
              src={EmptyWishlist}
              alt="empty-wishlist"
              className="size-36 lg:size-44"
            />
            <p className="w-full text-center text-lg font-semibold mb-2">
              Your Wishlist is Empty!!
            </p>
            <p className="w-full text-center font-semibold text-sm lg:text-base text-[#707070]">
              Explore more and shortlist some services
            </p>
            <Link
              href="/"
              className="mt-12 bg-primary text-white rounded-lg text-xs font-bold py-3 px-6 place-self-center"
            >
              Explore More
            </Link>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-start justify-start gap-2">
            {wishlist?.map((item, idx) => (
              <WishlistCard key={idx} service={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
