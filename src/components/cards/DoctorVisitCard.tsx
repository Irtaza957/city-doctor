"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa6";

import { RootState } from "@/store";
import HeartIcon from "@/assets/icons/HeartIcon";
import { imageBase, truncateString } from "@/utils/helpers";
import { useAddToWishlistMutation } from "@/store/services/wishlist";
import { addToCart, removeFromCart, setCart, toggleSidebar } from "@/store/global";

const DoctorVisitCard = ({ drip, navLink }: { drip: DRIP_CARD, navLink?: string }) => {
  const dispatch = useDispatch();
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
        quantity: isQuantity ? quantity + 1 : 1,
        price_without_vat,
        thumbnail,
      })
    );
  };

  const remove = (item: DRIP_CARD) => {
    if (item) {
      if(Number(quantity) === 1){
        dispatch(removeFromCart(Number(item.service_id)));
      }else{
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
    <div className="grid shadow-sm sm:h-[180px] grid-cols-8 mr-2 mb-2 items-start justify-start rounded-xl border border-[#EAEAEA] bg-white">
      <Link href={navLink || `/drips/${drip.service_id}`} className="col-span-3 w-full">
        <div className="relative w-full h-[150px] sm:h-[178px] rounded-l-xl bg-[#E8E8E8] flex items-center justify-center bg-top bg-cover">
          <div
            style={{ backgroundImage: `url(${imageBase(drip.thumbnail)})` }}
            className="rounded-l-xl size-full bg-top bg-cover flex items-center justify-center"
          >
            <span className="absolute bottom-1 bg-tagline text-white py-0.5 px-3 rounded-full font-semibold text-xs">
              {drip.response_time}*
            </span>
          </div>
        </div>
      </Link>
      <div className="col-span-5 w-full h-full flex flex-col items-center justify-center p-2.5 md:p-3.5">
        <div className="w-full h-full flex items-start justify-start">
          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex items-center justify-between space-x-2.5">
              <Link
                href={navLink || `/drips/${drip.service_id}`}
                className="w-full text-left overflow-hidden truncate font-semibold xl:font-bold text-base"
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
              <p className="w-full text-left text-xs line-clamp-1 text-[#555555] font-medium mt-0.5 flex md:hidden">
                {truncateString(drip.description, 40)}
              </p>
              <p className="w-full text-left text-xs line-clamp-2 text-[#555555] font-medium mt-0.5 hidden md:flex lg:hidden">
                {truncateString(drip.description, 95)}
              </p>
              <p className="w-full text-left text-xs line-clamp-3 text-[#555555] font-medium mt-0.5 hidden lg:flex">
                {truncateString(drip.description, 100)}
              </p>
            </Link>
          </div>
        </div>
        <div className="w-full h-full flex items-end justify-between">
          <Link
            href={navLink || `/drips/${drip.service_id}`}
            className="flex flex-col items-start justify-start space-y-1"
          >
            <div className="flex items-center justify-between space-x-1">
              <FaStar className="w-4 h-4 text-[#F6BE31]" />
              <span className="font-bold text-[10px]">
                {drip.rating}&nbsp;
                <span className="font-medium">({drip.total_reviews})</span>
              </span>
            </div>
            <span className="text-left text-sm md:text-base font-semibold xl:font-bold">
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
                className="w-[114px] hidden md:block h-[36px] py-2 px-4 md:px-9 bg-primary rounded-md text-white font-semibold text-sm place-self-end"
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
                className="w-[95px] block md:hidden h-[36px] py-2 px-4 md:px-9 bg-primary rounded-md text-white font-semibold text-sm place-self-end"
              >
                Add
              </button>
            </>
          ) : (
            <div className="w-[95px] md:w-[114px] flex items-center justify-between">
              <span
                onClick={() => {
                  remove(drip);
                  handleDecrement();
                }}
                className="border border-primary p-1 text-black rounded-lg size-[36px] flex items-center justify-center cursor-pointer"
              >
                <FaMinus />
              </span>
              <span className="font-semibold text-lg w-[10px]">{quantity}</span>
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
                className="bg-primary text-white p-1 rounded-lg size-[36px] flex items-center justify-center cursor-pointer"
              >
                <FaPlus />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorVisitCard;
