"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa6";

import { RootState } from "@/store";
import HeartIcon from "@/assets/icons/HeartIcon";
import { cn, imageBase, truncateString } from "@/utils/helpers";
import { useAddToWishlistMutation } from "@/store/services/wishlist";
import { addToCart, removeFromCart, setCart, toggleSidebar } from "@/store/global";
import Image from "next/image";
import BgTagline from "@/assets/icons/bgTagline.svg";
import { usePathname } from "next/navigation";

interface DoctorVisitCardProps {
  drip: DRIP_CARD;
  navLink?: string;
  showResponseTime?: boolean;
}

const DoctorVisitCard = ({ drip, navLink, showResponseTime }: DoctorVisitCardProps) => {
  const dispatch = useDispatch();
  const { asPath } = useRouter();
  const pathname=usePathname()
  const [quantity, setQuantity] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [addToWishlist] = useAddToWishlistMutation();
  const { user, cart } = useSelector((state: RootState) => state.global);

  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleDecrement = () => {
    if (quantity === 0) {
      setQuantity(0);
    } else {
      setQuantity((prev) => prev - 1);
    }
  };

  const add = (id: number, name: string, price: number, discount: number, price_without_vat: number, thumbnail: string, isQuantity: boolean = false) => {
    dispatch(
      addToCart({
        id,
        name,
        price,
        discount,
        price_without_vat,
        thumbnail,
        quantity: isQuantity ? quantity + 1 : 1,
      })
    );
  };

  const remove = (item: DRIP_CARD) => {
    if (item) {
      if (Number(quantity) === 1) {
        dispatch(removeFromCart(Number(item.service_id)));
      } else {
        const updatedCart = cart.map(i => i.id === Number(item.service_id) ? { ...i, quantity: i.quantity - 1 } : i);
        dispatch(setCart(updatedCart));
      }
    }
  };

  const like = async (id: string) => {
    setWishlist((prev) => (prev = !prev));

    try {
      const urlencoded = new URLSearchParams();
      urlencoded.append("customer_id", user?.customer_id!);
      urlencoded.append("service_id", id);

      const response = await addToWishlist({
        data: urlencoded,
        token: user?.token,
      });

      if (response.error) {
        // @ts-ignore
        toast.error(response.error.data.error);
      } else {
        if (wishlist) {
          setWishlist(false);
        } else {
          setWishlist(true);
        }
      }
    } catch (error) {
      toast.error("Please Try Again!");
    }
  };

  useEffect(() => {
    if (cart) {
      const exists = cart.find((item: CART) => item.name === drip?.name!);
      if (exists) {
        setQuantity(exists.quantity);
      } else {
        setQuantity(0);
      }
    }
  }, [cart]);

  useEffect(() => {
    if (drip) {
      if (drip.wishlist_id) {
        setWishlist(true);
      }
    }
  }, [drip]);

  return (
    <>
      <div className="md:hidden relative flex shadow-sm sm:h-[180px] items-start justify-start gap-1 rounded-[9px] border border-[#EAEAEA] bg-white">
        {drip?.tagline &&
        <div className="absolute top-0 left-0 z-10">
          <div className="relative">
            <Image
              src={BgTagline}
              alt="home"
              className="rounded-md object-cover"
              width={33}
              height={33}
            />
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-semibold text-white !leading-[12px]">
              {drip?.tagline}
            </p>
          </div>
        </div>}
        <Link href={navLink || `/drips/${drip.service_id}`}>
          <div className={cn(
            "relative h-[102px] rounded-l-lg bg-[#E8E8E8] flex items-center justify-center bg-top bg-cover",
            asPath.includes("home") && pathname?.split('/')?.length===3 ? 'w-28 h-[102px]' : 'w-20 h-[98px]'
            )}>
            <div
              style={{ backgroundImage: `url(${imageBase(drip.thumbnail)})` }}
              className="rounded-l-lg size-full bg-top bg-cover flex items-center justify-center"
            >
              {showResponseTime &&
              <span className="absolute bottom-1 bg-tagline text-white py-0.5 px-1.5 sm:px-3 rounded-full font-semibold text-[9px] text-center">
                {drip.response_time}*
              </span>}
            </div>
          </div>
        </Link>
        <div className="w-full h-full flex flex-col items-center justify-end sm:justify-center gap-2.5 px-2.5 pt-2.5 sm:p-3.5">
          <div className="w-full sm:h-full flex items-start justify-start">
            <div className="w-full flex flex-col items-center justify-center">
              <div className="w-full flex items-center justify-between space-x-2.5">
                <Link
                  href={navLink || `/drips/${drip.service_id}`}
                  className="w-full text-left text-sm font-semibold line-clamp-2 !leading-[1.2] min-h-[36px]"
                >
                  {drip.name}
                </Link>
                {user && (
                  <div
                    onClick={() => like(drip.service_id!)}
                    className="hidden sm:flex flex-col items-end justify-end space-y-1 pb-2"
                  >
                    {wishlist ? (
                      <HeartIcon fillColor="#38ADA0" className="text-secondary" />
                    ) : (
                      <HeartIcon className="text-secondary" />
                    )}
                  </div>
                )}
              </div>
              <Link href={navLink || `/drips/${drip.service_id}`} className="w-full hidden sm:flex">
                <p className="text-left text-xs overflow-hidden truncate text-[#555555] font-medium mt-0.5 flex sm:hidden">
                  {truncateString(drip.description, 20)}
                </p>
                <p className="w-full text-left text-xs overflow-hidden text-[#555555] font-medium mt-0.5">
                  {asPath.includes("section")
                    ? truncateString(drip.description, 90)
                    : truncateString(drip.description, 175)}
                </p>
                <p className="w-full text-left text-xs overflow-hidden text-[#555555] font-medium mt-0.5 hidden sm:flex lg:hidden">
                  {truncateString(drip.description, 70)}
                </p>
                <p className="w-full text-left text-xs overflow-hidden text-[#555555] font-medium mt-0.5 hidden lg:flex">
                  {truncateString(drip.description, 125)}
                </p>
              </Link>
            </div>
          </div>
          <div className={cn(
            "w-full sm:h-full flex justify-between gap-1.5",
            asPath.includes("home") && pathname?.split('/')?.length===3 ? "items-center mb-1" : 'items-end'
            )}>
            <Link
              href={navLink || `/drips/${drip.service_id}`}
              className="flex flex-col items-start justify-start space-y-1 sm:space-y-0"
            >
              <div className="items-center justify-between space-x-1 hidden sm:flex">
                <FaStar className="w-4 h-4 text-[#F6BE31]" />
                <span className="font-bold text-[10px]">
                  {drip.rating}&nbsp;
                  <span className="font-medium">({drip.total_reviews})</span>
                </span>
              </div>
              <div className={cn(
                "flex flex-col",
                asPath.includes("home") && pathname?.split('/')?.length===3 && '!mb-1'
                )}>
                <span className="sm:hidden w-full text-left text-[10px] whitespace-nowrap">
                  AED <span className="line-through">{(Number(drip.discount_value))?.toFixed(2)}</span>
                </span>
                <span className="w-full text-left text-xs sm:text-sm font-semibold lg:text-base text-black xl:font-bold whitespace-nowrap">
                  AED {Math.round(Number(drip.price_without_vat))}
                </span>
              </div>
            </Link>
            {quantity === 0 ? (
              <button
                onClick={() => {
                  setQuantity((prev) => prev + 1);
                  add(
                    parseInt(
                      drip.service_id ? drip.service_id : drip.service_id!
                    ),
                    drip.name!,
                    parseInt(drip.price_with_vat),
                    parseInt(drip.discount_value ? drip.discount_value : "0"),
                    parseInt(drip.price_without_vat),
                    drip.thumbnail
                  );
                }}
                className={cn("h-[24px] w-[60px] px-3 bg-primary rounded-md text-white font-semibold text-xs",
                  !(asPath.includes("home") && pathname?.split('/')?.length===3) && "place-self-end"
                )}
              >
                Add
              </button>
            ) : (
              <div className="flex items-center justify-between gap-2 ml-1">
                <span
                  onClick={() => {
                    remove(drip);
                    handleDecrement();
                  }}
                  className="border border-primary p-1 text-black rounded-md size-5 xs:size-6 sm:size-[36px] flex items-center justify-center cursor-pointer"
                >
                  <FaMinus />
                </span>
                <span className="font-semibold text-sm text-center sm:text-lg w-[10px]">{quantity}</span>
                <span
                  onClick={() => {
                    setQuantity((prev) => prev + 1);
                    add(
                      parseInt(
                        drip.service_id ? drip.service_id : drip.service_id!
                      ),
                      drip.name!,
                      parseInt(drip.price_with_vat),
                      parseInt(drip.discount_value ? drip.discount_value : "0"),
                      parseInt(drip.price_without_vat),
                      drip.thumbnail,
                      true
                    );
                  }}
                  className="bg-primary text-white p-1 rounded-md size-5 xs:size-6 sm:size-[36px] flex items-center justify-center cursor-pointer"
                >
                  <FaPlus />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="hidden md:grid shadow-sm sm:h-[180px] grid-cols-8 items-start justify-start rounded-xl border border-[#EAEAEA] bg-white">
        <Link href={navLink || `/drips/${drip.service_id}`} className="col-span-3 w-full">
          <div className="relative w-full h-[125px] sm:h-[178px] rounded-l-xl bg-[#E8E8E8] flex items-center justify-center bg-top bg-cover">
            <div
              style={{ backgroundImage: `url(${imageBase(drip.thumbnail)})` }}
              className="rounded-l-xl size-full bg-top bg-cover flex items-center justify-center"
            >
              <span className="absolute bottom-1 bg-tagline text-white py-0.5 px-1.5 sm:px-3 rounded-full font-semibold text-xs text-center">
                {drip.response_time}*
              </span>
            </div>
          </div>
        </Link>
        <div className="col-span-5 w-full h-full flex flex-col items-center justify-between sm:justify-center p-2.5 md:p-3.5">
          <div className="w-full sm:h-full flex items-start justify-start">
            <div className="w-full flex flex-col items-center justify-center">
              <div className="w-full flex items-center justify-between space-x-2.5">
                <Link
                  href={navLink || `/drips/${drip.service_id}`}
                  className="w-full text-left font-semibold xl:font-bold text-base line-clamp-2 !leading-[1.2]"
                >
                  {drip.name}
                </Link>
                {user && (
                  <div
                    onClick={() => like(drip.service_id!)}
                    className="flex flex-col items-end justify-end space-y-1 pb-2"
                  >
                    {wishlist ? (
                      <HeartIcon fillColor="#38ADA0" className="text-secondary" />
                    ) : (
                      <HeartIcon className="text-secondary" />
                    )}
                  </div>
                )}
              </div>
              <Link href={navLink || `/drips/${drip.service_id}`} className="w-full">
                <p className="text-left text-xs overflow-hidden truncate text-[#555555] font-medium mt-0.5 flex sm:hidden">
                  {truncateString(drip.description, 20)}
                </p>
                <p className="w-full text-left text-xs overflow-hidden text-[#555555] font-medium mt-0.5 hidden sm:flex md:hidden">
                  {asPath.includes("section")
                    ? truncateString(drip.description, 90)
                    : truncateString(drip.description, 175)}
                </p>
                <p className="w-full text-left text-xs overflow-hidden text-[#555555] font-medium mt-0.5 hidden md:flex lg:hidden">
                  {truncateString(drip.description, 70)}
                </p>
                <p className="w-full text-left text-xs overflow-hidden text-[#555555] font-medium mt-0.5 hidden lg:flex">
                  {truncateString(drip.description, 125)}
                </p>
              </Link>
            </div>
          </div>
          <div className="w-full sm:h-full flex items-end justify-between gap-1.5">
            <Link
              href={navLink || `/drips/${drip.service_id}`}
              className="flex flex-col items-start justify-start space-y-1 md:space-y-0"
            >
              <div className="flex items-center justify-between space-x-1">
                <FaStar className="w-4 h-4 text-[#F6BE31]" />
                <span className="font-bold text-[10px]">
                  {drip.rating}&nbsp;
                  <span className="font-medium">({drip.total_reviews})</span>
                </span>
              </div>
              <span className="w-full text-left text-xs sm:text-sm lg:text-base font-semibold xl:font-bold whitespace-nowrap">
                AED {Math.round(Number(drip.price_without_vat))}
              </span>
            </Link>
            {quantity === 0 ? (
              <>
                <button
                  onClick={() => {
                    setQuantity((prev) => prev + 1);
                    add(
                      parseInt(
                        drip.service_id ? drip.service_id : drip.service_id!
                      ),
                      drip.name!,
                      parseInt(drip.price_with_vat),
                      parseInt(drip.discount_value ? drip.discount_value : "0"),
                      parseInt(drip.price_without_vat),
                      drip.thumbnail
                    );
                    handleSidebar();
                  }}
                  className="w-[114px] md:w-[95px] hidden md:block h-[36px] py-2 px-4 md:px-9 bg-primary rounded-md text-white font-semibold text-sm place-self-end"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setQuantity((prev) => prev + 1);
                    add(
                      parseInt(
                        drip.service_id ? drip.service_id : drip.service_id!
                      ),
                      drip.name!,
                      parseInt(drip.price_with_vat),
                      parseInt(drip.discount_value ? drip.discount_value : "0"),
                      parseInt(drip.price_without_vat),
                      drip.thumbnail
                    );
                  }}
                  className="md:w-[95px] block md:hidden md:h-[36px] py-2 px-3 md:px-9 bg-primary rounded-md text-white font-semibold text-xs place-self-end"
                >
                  Add
                </button>
              </>
            ) : (
              <div className="w-[95px] flex items-center justify-between ml-1">
                <span
                  onClick={() => {
                    remove(drip);
                    handleDecrement();
                  }}
                  className="border border-primary p-1 text-black rounded-lg size-6 sm:size-[36px] flex items-center justify-center cursor-pointer"
                >
                  <FaMinus />
                </span>
                <span className="font-semibold text-sm sm:text-lg w-[10px]">{quantity}</span>
                <span
                  onClick={() => {
                    setQuantity((prev) => prev + 1);
                    add(
                      parseInt(
                        drip.service_id ? drip.service_id : drip.service_id!
                      ),
                      drip.name!,
                      parseInt(drip.price_with_vat),
                      parseInt(drip.discount_value ? drip.discount_value : "0"),
                      parseInt(drip.price_without_vat),
                      drip.thumbnail,
                      true
                    );
                  }}
                  className="bg-primary text-white p-1 rounded-lg size-6 sm:size-[36px] flex items-center justify-center cursor-pointer"
                >
                  <FaPlus />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorVisitCard;
