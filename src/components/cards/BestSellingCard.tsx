"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa6";

import { RootState } from "@/store";
import { imageBase } from "@/utils/helpers";
import HeartIcon from "@/assets/icons/HeartIcon";
import { useAddToWishlistMutation } from "@/store/services/wishlist";
import { addToCart, removeFromCart, setCart, toggleSidebar } from "@/store/global";

const BestSellingCard = ({ drip, navLink }: { drip: DRIP_CARD, navLink?: string }) => {
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
    console.log(price_without_vat, 'price_without_vatprice_without_vat')
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
    console.log(item, 'itemitemitem')
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
    <div className="w-full flex flex-col items-center justify-center border rounded-xl shadow-sm">
      <div className="relative w-full">
        <Link href={navLink || `/drips/${drip.service_id}`}>
          <div className="relative w-full h-48 xl:h-60 3xl:h-52 rounded-t-xl bg-[#E8E8E8]">
            <div
              style={{ backgroundImage: `url(${imageBase(drip.thumbnail)})` }}
              className="size-full rounded-t-xl bg-top bg-cover"
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
        <span className="absolute bottom-2 left-2 bg-tagline text-white py-0.5 px-3 rounded-full font-semibold text-xs">
          {drip.response_time}*
        </span>
      </div>
      <div className="w-full p-3 bg-white rounded-b-xl flex flex-col items-start justify-start space-y-4">
        <Link
          href={navLink || `/drips/${drip.service_id}`}
          className="w-full flex flex-col items-center justify-center space-y-1.5"
        >
          <h1 className="w-full text-left text-base overflow-hidden truncate font-semibold xl:font-bold">
            {drip.name}
          </h1>
          <p className="w-full text-left overflow-hidden font-medium truncate text-xs text-[#555555]">
            {drip.description}
          </p>
        </Link>
        <div className="w-full grid grid-cols-2 items-end justify-between">
          <Link
            href={navLink || `/drips/${drip.service_id}`}
            className="col-span-1 w-full flex flex-col items-center justify-start space-y-2"
          >
            <div className="w-full flex items-center justify-start gap-1">
              <FaStar className="w-4 h-4 text-accent" />
              <span className="font-bold text-[10px]">
                {drip.rating}&nbsp;
                <span className="font-medium">({drip.total_reviews})</span>
              </span>
            </div>
            <span className="w-full text-left text-base font-semibold xl:font-bold">
              AED {Math.round(Number(drip.price_without_vat))}
            </span>
          </Link>
          <div className="col-span-1 ml-auto flex items-center justify-between">
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
                  className="w-full hidden md:block h-[36px] px-8 py-2 bg-primary rounded-md text-white font-semibold text-sm"
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
                  className="w-full block md:hidden h-[36px] px-8 sm:px-6 md:px-8 py-2 bg-primary rounded-md text-white font-semibold text-sm"
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
                  className="size-[36px] sm:size-[30px] md:size-[36px] rounded-lg p-3 border border-primary flex items-center justify-center cursor-pointer"
                >
                  <FaMinus />
                </span>
                <span className="text-xl font-semibold px-2 md:px-4">{quantity}</span>
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
                  className="size-[36px] sm:size-[30px] md:size-[36px] rounded-lg p-3 border-primary bg-primary flex items-center justify-center text-white cursor-pointer"
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

export default BestSellingCard;
