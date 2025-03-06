"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa6";

import { RootState } from "@/store";
import HeartIcon from "@/assets/icons/HeartIcon";
import { imageBase, truncateString } from "@/utils/helpers";
import { useAddToWishlistMutation } from "@/store/services/wishlist";
import { addToCart, removeFromCart, setCart, toggleSidebar } from "@/store/global";

const WishlistCard = ({ service }: { service: WISHLIST }) => {
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
        quantity: isQuantity ? quantity + 1 : 1,
        price_without_vat,
        thumbnail,
      })
    );
  };

  const remove = (item: WISHLIST) => {
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
      const exists = cart.find(
        (item: CART) => item.name === service?.service_name
      );
      if (exists) {
        setQuantity(exists.quantity);
      } else {
        setQuantity(0);
      }
    }
  }, [cart]);

  useEffect(() => {
    if (service) {
      if (service.wishlist_id) {
        setWishlist(true);
      }
    }
  }, [service]);

  return (
    <div className="grid shadow-sm sm:h-[180px] grid-cols-8 items-start justify-start rounded-xl border border-[#EAEAEA] bg-white">
      <Link href={`/drips/${service.service_id}`} className="col-span-3 w-full">
        <div className="relative w-full h-[150px] sm:h-[178px] rounded-l-xl bg-[#E8E8E8] flex items-center justify-center bg-top bg-cover">
          <div
            style={{ backgroundImage: `url(${imageBase(service.thumbnail)})` }}
            className="rounded-l-xl size-full bg-top bg-cover flex items-center justify-center"
          >
            <span className="absolute bottom-2 bg-tagline text-white py-0.5 px-3 rounded-full font-semibold text-xs">
              {service.response_time}*
            </span>
          </div>
        </div>
      </Link>
      <div className="col-span-5 w-full h-full flex flex-col items-center justify-between sm:justify-center p-2.5 md:p-3.5">
        <div className="w-full sm:h-full flex items-start justify-start">
          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex items-center justify-between space-x-2.5">
              <Link
                href={`/drips/${service.service_id}`}
                className="w-full text-left overflow-hidden truncate font-semibold xl:font-bold text-base"
              >
                {service.service_name}
              </Link>
              {user && (
                <div
                  onClick={() => like(service.service_id!)}
                  className="flex flex-col items-end justify-end space-y-1 pb-2 cursor-pointer"
                >
                  {wishlist ? (
                    <HeartIcon fillColor="#38ADA0" className="text-secondary" />
                  ) : (
                    <HeartIcon className="text-secondary" />
                  )}
                </div>
              )}
            </div>
            <Link href={`/drips/${service.service_id}`} className="w-full">
              <p className="w-full text-left text-xs overflow-hidden text-[#555555] font-medium mt-0.5 flex sm:hidden">
                {truncateString(service.description, 50)}
              </p>
              <p className="w-full text-left text-xs overflow-hidden text-[#555555] font-medium mt-0.5 hidden sm:flex md:hidden">
                {asPath.includes("section") || asPath.includes("wishlist")
                  ? truncateString(service.description, 90)
                  : truncateString(service.description, 175)}
              </p>
              <p className="w-full text-left text-xs overflow-hidden text-[#555555] font-medium mt-0.5 hidden md:flex lg:hidden">
                {truncateString(service.description, 70)}
              </p>
              <p className="w-full text-left text-xs overflow-hidden text-[#555555] font-medium mt-0.5 hidden lg:flex">
                {truncateString(service.description, 125)}
              </p>
            </Link>
          </div>
        </div>
        <div className="w-full sm:h-full flex items-end justify-between">
          <Link
            href={`/drips/${service.service_id}`}
            className="flex flex-col items-start justify-start space-y-1 md:space-y-0"
          >
            <div className="flex items-center justify-between space-x-1">
              <FaStar className="w-4 h-4 text-[#F6BE31]" />
              <span className="font-bold text-[10px]">
                {service.rating}&nbsp;
                <span className="font-medium">({service.total_reviews})</span>
              </span>
            </div>
            <span className="w-full text-left text-sm lg:text-base font-semibold xl:font-bold">
              AED {service.price}
            </span>
          </Link>
          {quantity === 0 ? (
            <>
              <button
                onClick={() => {
                  setQuantity((prev) => prev + 1);
                  add(
                    parseInt(
                      service.service_id
                        ? service.service_id
                        : service.service_id!
                    ),
                    service.service_name!,
                    parseInt(service.price),
                    0,
                    parseInt(service.price_without_vat),
                    service.thumbnail
                  );
                  handleSidebar();
                }}
                className="w-[114px] text-center md:w-[95px] hidden md:block h-[36px] py-2 bg-primary rounded-md text-white font-semibold text-sm place-self-end"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setQuantity((prev) => prev + 1);
                  add(
                    parseInt(
                      service.service_id
                        ? service.service_id
                        : service.service_id!
                    ),
                    service.service_name!,
                    parseInt(service.price),
                    0,
                    parseInt(service.price_without_vat),
                    service.thumbnail
                  );
                }}
                className="w-[95px] text-center block md:hidden h-[36px] py-2 bg-primary rounded-md text-white font-semibold text-sm place-self-end"
              >
                Add
              </button>
            </>
          ) : (
            <div className="w-[114px] md:w-[95px] flex items-center justify-between">
              <span
                onClick={() => {
                  remove(service);
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
                      service.service_id
                        ? service.service_id
                        : service.service_id!
                    ),
                    service.service_name!,
                    parseInt(service.price),
                    0,
                    parseInt(service.price_without_vat),
                    service.thumbnail,
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

export default WishlistCard;
