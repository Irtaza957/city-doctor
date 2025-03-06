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
import { FaThList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { sortingOptions } from "@/components/drips";
import { sortWishlist } from "@/utils/helpers";
import BestSellingListingCard from "@/components/cards/BestSellingListingCard";
import GoogleAnalytics from "../components/GoogleAnalytics";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<WISHLIST[]>([]);
  const [viewType, setViewType] = useState(false);
  const [limit, setLimit] = useState("All");
  const [sorting, setSorting] = useState("Price (Low to High)");
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
    <>
    <GoogleAnalytics />
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
          <div className="relative w-full max-h-screen flex flex-col gap-4">
            <div className="sticky top-5 z-10 flex items-center justify-between bg-gray-100 border border-[#DEDEDE] rounded-lg py-2 px-4">
              <div className="flex items-center justify-start gap-2">
                <button type="button" onClick={() => setViewType(false)}>
                  <FaThList
                    className={`size-6 ${viewType ? "text-gray-400" : "text-primary"
                      }`}
                  />
                </button>
                <button type="button" onClick={() => setViewType(true)}>
                  <IoGrid
                    className={`size-6 ${viewType ? "text-primary" : "text-gray-400"
                      }`}
                  />
                </button>
              </div>
              <div className="w-full flex items-center justify-end gap-6">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs">Sort By</span>
                  <div className="bg-white pr-2.5 rounded-md border">
                    <select
                      onChange={(e) => setSorting(e.target.value)}
                      className="text-xs p-2 rounded-md bg-transparent"
                    >
                      {sortingOptions.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs">Show Listing</span>
                  <div className="bg-white pr-2.5 rounded-md border">
                    <select
                      onChange={(e) => setLimit(e.target.value)}
                      className="text-xs p-2 rounded-md bg-transparent"
                    >
                      <option value="1" selected={limit === "1"}>
                        1
                      </option>
                      <option value="2" selected={limit === "2"}>
                        2
                      </option>
                      <option value="3" selected={limit === "3"}>
                        3
                      </option>
                      <option value="4" selected={limit === "4"}>
                        4
                      </option>
                      <option value="5" selected={limit === "5"}>
                        5
                      </option>
                      <option value="6" selected={limit === "6"}>
                        6
                      </option>
                      <option value="All" selected={limit === "All"}>
                        All
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full overflow-auto custom-scrollbar grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-start justify-start gap-2">
              {(limit === "All" ? sortWishlist(sorting, wishlist) : sortWishlist(sorting, wishlist)?.slice(0, parseInt(limit)))?.map((item, idx) => (
                !viewType ? <WishlistCard key={idx} service={item as WISHLIST} /> : <BestSellingListingCard key={idx} drip={item as DRIP_CARD} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Wishlist;
