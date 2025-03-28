"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa6";

import { RootState } from "@/store";
import { imageBase } from "@/utils/helpers";
import HeartIcon from "@/assets/icons/HeartIcon";
import { useAddToWishlistMutation } from "@/store/services/wishlist";
import { addToCart, removeFromCart, setCart, toggleSidebar } from "@/store/global";
import Image from "next/image";
import BgTagline from "@/assets/icons/bgTagline.svg";

const BestSellingListingCard = ({ drip, navLink }: { drip: DRIP_CARD, navLink?: string }) => {
  const dispatch = useDispatch();
  const { asPath } = useRouter();
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
    <div className="w-full relative flex flex-col items-center justify-center border rounded-xl shadow-sm">
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
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 line-clamp-2 w-[22px] text-[10px] font-semibold text-white !leading-[12px]">
              {drip?.tagline}
            </p>
          </div>
        </div>}
      <div className="relative w-full">
        <Link href={navLink || `/drips/${drip.service_id}`}>
          <div className="relative w-full h-[120px] sm:h-48 xl:h-60 3xl:h-52 rounded-xl bg-[#E8E8E8]">
            <div
              style={{ backgroundImage: `url(${imageBase(drip.thumbnail)})` }}
              className="size-full rounded-xl bg-top bg-cover h-[120px] sm:h-auto"
            />
          </div>
        </Link>
        {user && (
          <div
            onClick={() => like(drip.service_id!)}
            className="absolute top-2 right-2 flex flex-col items-center justify-center space-y-2 place-self-end cursor-pointer"
          >
            {wishlist ? (
              <HeartIcon fillColor="#38ADA0" className="text-secondary" />
            ) : (
              <HeartIcon className="text-secondary" />
            )}
          </div>
        )}
        <span className="hidden sm:block absolute bottom-2 left-2 bg-tagline text-white py-0.5 px-3 rounded-full font-semibold text-xs">
          {drip.response_time}*
        </span>
      </div>
      <div className="w-full p-2 bg-white rounded-b-xl flex flex-col items-start justify-start space-y-1">
        <Link
          href={navLink || `/drips/${drip.service_id}`}
          className="w-full flex flex-col items-center justify-center space-y-1.5"
        >
          <h1 className="w-full text-left text-sm sm:text-base h-10 line-clamp-2 sm:line-clamp-none sm:overflow-hidden sm:truncate font-semibold xl:font-bold">
            {drip.name || drip.service_name}
          </h1>
          <p className="hidden sm:block w-full text-left overflow-hidden font-medium truncate text-xs text-[#555555]">
            {drip.description}
          </p>
        </Link>
        <div className="w-full sm:grid flex grid-cols-2 gap-1 items-end justify-between">
          <Link
            href={navLink || `/drips/${drip.service_id}`}
            className="sm:col-span-1 w-full flex flex-col items-center justify-start space-y-2"
          >
            <div className="w-full hidden sm:flex items-center justify-start gap-1">
              <FaStar className="w-4 h-4 text-accent" />
              <span className="font-bold text-[10px]">
                {drip.rating}&nbsp;
                <span className="font-medium">({drip.total_reviews})</span>
              </span>
            </div>
            <div className="flex flex-col w-full">
              <span className="sm:hidden w-full text-left text-[10px] whitespace-nowrap">
                AED <span className="line-through">{(Number(drip.discount_value))?.toFixed(2)}</span>
              </span>
              <span className="w-full text-left text-xs sm:text-sm font-semibold xl:font-bold">
                AED {Math.round(Number(drip.price_without_vat || drip.price_with_vat))}
              </span>
            </div>
          </Link>
          <div
            className={`sm:col-span-1 xs:ml-auto sm:w-[114px] ${asPath.includes("section")
                ? "sm:w-[100px] xl:w-[115px]"
                : "xl:w-[135px]"
              } md:w-[100px] flex items-center justify-between`}
          >
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
                  className="w-full hidden md:block h-[36px] py-2 bg-primary rounded-md text-white font-semibold text-sm"
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
                  className="block md:hidden h-[24px] w-[50px] xs:w-[60px] bg-primary rounded-md text-white font-semibold text-xs xs:text-sm"
                >
                  Add
                </button>
              </>
            ) : (
              <>
                <span
                  onClick={() => {
                    handleDecrement();
                    remove(drip);
                  }}
                  className="size-5 sm:size-[36px] rounded-lg p-1 sm:p-3 border border-primary flex items-center justify-center cursor-pointer"
                >
                  <FaMinus />
                </span>
                <span className="sm:text-xl sm:font-semibold mx-1.5 sm:mx-0">{quantity}</span>
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
                  className="size-5 sm:size-[36px] rounded-lg p-1 sm:p-3 border-primary bg-primary flex items-center justify-center text-white cursor-pointer"
                >
                  <FaPlus />
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellingListingCard;
