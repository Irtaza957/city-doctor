import { RootState } from "@/store";
import LoginModal from "./modals/LoginModal";
import EmptyCart from "@/assets/img/empty-cart.svg";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { addToCart, toggleSidebar, removeFromCart, setCart } from "@/store/global";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { calculateVAT, imageBase } from "@/utils/helpers";
import { calculateDiscountValue, calculateWithoutVAT } from "@/utils/helpers";

const CartBar = () => {
  const cartRef = useRef(null);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { cart, sidebarToggle } = useSelector(
    (state: RootState) => state.global
  );

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

  const closeBar = () => {
    if (sidebarToggle) {
      dispatch(toggleSidebar());
    }
  };

  useOnClickOutside(cartRef, closeBar);

  return (
    <>
      <LoginModal open={open} setOpen={setOpen} />
      <div
        className={`w-full h-full transition-[width] fixed top-0 left-0 z-50 bg-black/30 ${!sidebarToggle && "hidden"
          }`}
      />
      <div
        ref={cartRef}
        className={`${sidebarToggle ? "w-[350px] xl:w-[400px]" : "w-0"
          } transition-all duration-150 ease-linear h-full overflow-auto custom-scrollbar fixed top-0 right-0 z-50 flex flex-col items-start justify-start bg-white shadow-2xl`}
      >
        <div className="w-full flex items-center justify-center bg-primary text-white py-5 px-5">
          <h1 className="w-full text-left text-xl font-semibold">
            My Cart&nbsp;
            <span className="text-base font-medium">
              ( {cart.length} Items )
            </span>
          </h1>
          <button type="button" onClick={closeBar}>
            <IoClose className="size-6" />
          </button>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-start overflow-auto custom-scrollbar px-5 pb-5 pt-2">
          {cart.length === 0 ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-10 lg:p-5">
              <Image
                src={EmptyCart}
                alt="empty-wishlist"
                className="size-36 lg:size-44"
              />
              <p className="w-full text-center text-lg font-semibold mb-2">
                Your Cart is Empty!!
              </p>
              <p className="w-full text-center font-semibold text-sm text-[#707070]">
                Explore more and shortlist some services
              </p>
            </div>
          ) : (
            cart.map((item: CART, idx: number) => (
              <div
                key={idx}
                className="w-full flex items-center justify-between space-x-2 py-4 border-b border-[#DEDEDE]"
              >
                <Image
                  src={imageBase(item.thumbnail!)}
                  alt="card"
                  width={500}
                  height={500}
                  className="size-14 rounded-full object-cover"
                />
                <div className="flex w-6/12 flex-col items-center justify-center space-y-0.5">
                  <span className="w-full text-left text-sm font-semibold overflow-hidden truncate">
                    {item.name}
                  </span>
                  <span className="w-full text-left text-xs text-[#555555] font-medium">
                    Qty: {item.quantity}
                  </span>
                  <span className="w-full text-left text-xs text-[#555555] font-medium">
                    AED {item.price}
                  </span>
                </div>
                <div className="w-3/12 h-full flex items-center justify-end space-x-2.5 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => {
                      remove(item);
                    }}
                    className="border border-primary text-black p-0.5 rounded-[4px] w-6 h-6 flex items-center justify-center"
                  >
                    <FaMinus className="w-3 h-3" />
                  </button>
                  <span className="font-bold text-sm">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => {
                      add(item);
                    }}
                    className="bg-primary text-white p-0.5 rounded-[4px] w-6 h-6 flex items-center justify-center"
                  >
                    <FaPlus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="w-full flex flex-col items-center justify-center pb-24 px-5 space-y-1">
            <div className="w-full text-sm flex items-center justify-between font-medium text-[#555555]">
              <span>Sub Total</span>
              <span>
                AED&nbsp;
                {calculateWithoutVAT(cart)}
              </span>
            </div>
            <div className="w-full text-sm flex items-center justify-between font-medium text-[#555555]">
              <span>Discount</span>
              <span>AED {calculateDiscountValue(cart)}</span>
            </div>
            <div className="w-full text-sm flex items-center justify-between font-medium text-[#555555]">
              <span>VAT</span>
              <span>AED {Math.round(Number(calculateVAT(cart)))}</span>
            </div>
            <div className="w-full text-sm flex items-center justify-between font-bold">
              <span>Grand Total</span>
              <span>
                AED&nbsp;
                {Math.round(calculateVAT(cart) + (calculateWithoutVAT(cart) - calculateDiscountValue(cart)))}
              </span>
            </div>
          </div>
        )}
        <div className="absolute bottom-2.5 left-0 z-10 w-full grid grid-cols-2 gap-1.5 px-5 pb-3 pt-4 bg-white border-t border-[#DEDEDE]">
          <button
            onClick={closeBar}
            className={`${cart.length === 0 ? "col-span-2" : "col-span-1"
              } w-full bg-[#DEDEDE] text-[#0A314A] rounded-lg text-xs font-bold py-3 place-self-end`}
          >
            Continue Shopping
          </button>
          {cart.length > 0 && (
            <Link
              href="/cart"
              onClick={closeBar}
              className="col-span-1 w-full bg-primary text-center text-white rounded-lg text-xs font-bold py-3 place-self-end"
            >
              Checkout
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default CartBar;
