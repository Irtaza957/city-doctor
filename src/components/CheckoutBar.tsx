"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { IoClose } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight, FaChevronDown, FaMinus, FaPlus } from "react-icons/fa6";

import { RootState } from "@/store";
import LoginDrawer from "./drawers/LoginDrawer";
import { calculateTotalCost, imageBase } from "@/utils/helpers";
import { addToCart, removeFromCart, setCart } from "@/store/global";

const CheckoutBar = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [openCart, setOpenCart] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const { user, cart } = useSelector((state: RootState) => state.global);
  
  const pathnames = ["/bookings", "/drips", "/doctor-on-home-visit", "/physiotherapy-and-body-adjustment", "/iv-drip-therapy", "/lab-test-and-checkup", "/account-settings", "/check-out"];
  const dynamicPatterns = [/^\/bookings\/\d+$/, /^\/drips\/\d+$/, /^\/doctor-on-home-visit\/\d+$/, /^\/physiotherapy-and-body-adjustment\/\d+$/, /^\/iv-drip-therapy\/\d+$/, /^\/lab-test-and-checkup\/\d+$/];
  const shouldHide =
    pathnames.includes(pathname) ||
    dynamicPatterns.some((pattern) => pattern.test(pathname));

  const closeLogin = () => {
    setOpenLogin(false);
  };

  const add = (item: CART) => {
    if (item) {
      dispatch(
        addToCart({
          id: item?.id,
          name: item?.name,
          price: item?.price,
          discount: item?.discount,
          quantity: item?.quantity + 1,
          price_without_vat: item?.price_without_vat,
          thumbnail: item?.thumbnail,
        })
      );
    }
  };

  const remove = (item: CART) => {
    if (item) {
      if(item.quantity === 1){
        dispatch(removeFromCart(item.id));
      }else{
        const updatedCart = cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i);
        dispatch(setCart(updatedCart));
      }
    }
  };

  return (
    <>
      <LoginDrawer open={openLogin} onClose={closeLogin} />
      <div
        className={`fixed bottom-[68px] left-0 z-50 w-full ${
          openCart && "bg-black/30 h-full"
        } ${shouldHide ? "hidden" : "flex sm:hidden"} ${
          cart.length === 0 ? "hidden" : "flex"
        } flex-col items-end justify-end`}
      >
        <div
          className={`w-full flex flex-col items-center justify-center bg-white border-y ${
            openCart && "rounded-t-2xl"
          }`}
        >
          <div
            className={`w-full py-3 px-5 ${
              openCart ? "flex" : "hidden"
            } items-center justify-between border-b`}
          >
            <h1 className="w-full text-left text-[20px] font-bold">My Cart</h1>
            <button type="button" onClick={() => setOpenCart(false)}>
              <IoClose className="size-6 text-black" />
            </button>
          </div>
          <div
            className={`w-full ${
              openCart ? "flex" : "hidden"
            } flex-col items-center justify-start gap-5 p-5`}
          >
            <h1 className="w-full text-left text-[16px] font-bold">
              {cart.length}&nbsp;Item{cart.length !== 1 && "s"}
            </h1>
            {cart.map((item: CART, idx: number) => (
              <div key={idx} className="w-full grid grid-cols-4">
                <div className="col-span-1 w-full">
                  <Image
                    width={500}
                    height={500}
                    src={`${imageBase(item?.thumbnail || '')}`}
                    alt="card"
                    className="size-[68px] rounded-full object-cover"
                  />
                </div>
                <div className="col-span-2 w-full flex flex-col items-center justify-between">
                  <span className="w-full text-left text-[16px] font-semibold overflow-hidden truncate">
                    {item.name}
                  </span>
                  <span className="w-full text-left text-xs font-medium text-[#555555]">
                    Qty: {item.quantity}
                  </span>
                  <span className="w-full text-left text-xs font-medium text-[#555555]">
                    AED {item.price}
                  </span>
                </div>
                <div className="col-span-1 w-full flex items-center justify-between place-self-end">
                  <button
                    type="button"
                    onClick={() => {  
                      remove(item);
                    }}
                    className="size-8 border border-primary p-2 rounded-lg text-black flex items-center justify-center"
                  >
                    <FaMinus className="size-full" />
                  </button>
                  <span className="text-[16px] font-bold">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => {
                      add(item);
                    }}
                    className="size-8 border border-primary bg-primary p-2 rounded-lg text-white flex items-center justify-center"
                  >
                    <FaPlus className="size-full" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full bg-white p-2">
            <div className="w-full p-2 rounded-xl bg-primary text-white grid grid-cols-3">
              <div className="col-span-1 w-full flex flex-col items-center justify-center gap-1 text-sm pl-2">
                <span className="w-full text-left text-xs font-medium">
                  {cart.length}&nbsp;Item{cart.length > 1 && "s"}
                </span>
                <div
                  onClick={() => setOpenCart((prev) => (prev = !prev))}
                  className="w-full flex items-center justify-start space-x-2"
                >
                  <span className="text-left text-xs font-semibold">
                    AED&nbsp;
                    {new Intl.NumberFormat().format(calculateTotalCost(cart))}
                  </span>
                  <FaChevronDown
                    className={`w-3 h-3 ${
                      openCart && "rotate-180"
                    } transition-all duration-150 ease-linear`}
                  />
                </div>
              </div>
              <div
                onClick={() => {
                  if (user) {
                    push("/check-out");
                  } else {
                    setOpenLogin((prev) => (prev = !prev));
                  }
                }}
                className="col-span-1 w-full flex items-center justify-center"
              >
                <span className="w-full text-[18px] font-semibold text-center">
                  Checkout
                </span>
              </div>
              <div
                onClick={() => {
                  if (user) {
                    push("/check-out");
                  } else {
                    setOpenLogin((prev) => (prev = !prev));
                  }
                }}
                className="size-10 p-2.5 bg-white rounded-lg text-primary col-span-1 flex items-center justify-center place-self-end"
              >
                <FaArrowRight className="size-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutBar;
