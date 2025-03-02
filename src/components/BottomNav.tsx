"use client";

import { RootState } from "@/store";
import LoginDrawer from "./drawers/LoginDrawer";
import { setAccountTab } from "@/store/global";
import HomeIcon from "@/assets/mobile-icons/HomeIcon";
import UserIcon from "@/assets/mobile-icons/UserIcon";
import CartIcon from "@/assets/mobile-icons/CartIcon";
import BookingCalendarIcon from "@/assets/mobile-icons/BookingCalendarIcon";

import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

const BottomNav = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [openLogin, setOpenLogin] = useState(false);
  const { cart, user } = useSelector((state: RootState) => state.global);

  const closeLogin = () => {
    setOpenLogin(false);
  };

  const setTab = () => {
    dispatch(setAccountTab(""));
  }

  return (
    <>
      <LoginDrawer open={openLogin} onClose={closeLogin} />
      <nav
        className={`flex border-t sm:hidden fixed bottom-0 left-0 z-40 w-full bg-white py-3 px-5 md:px-10 items-center justify-between text-gray-600 ${
          cart.length === 0 && "border-t"
        }`}
      >
        <Link
          href="/"
          className={`flex flex-col items-center justify-center space-y-2 cursor-pointer ${
            pathname === "/" && "text-primary"
          }`}
        >
          <HomeIcon className="size-5" />
          <span className="w-full text-center text-xs">Home</span>
        </Link>
        <div
          onClick={() => {
            if (user) {
              push("/bookings");
            } else {
              setOpenLogin((prev) => (prev = !prev));
            }
          }}
          className={`flex flex-col items-center justify-center space-y-2 cursor-pointer ${
            pathname === "/bookings" && "text-primary"
          }`}
        >
          <BookingCalendarIcon className="size-5" />
          <span className="w-full text-center text-xs">Bookings</span>
        </div>
        <div
          onClick={() => {
            setTab();

            if (user) {
              push("/account-settings");
            } else {
              setOpenLogin((prev) => (prev = !prev));
            }
          }}
          className={`flex flex-col items-center justify-center space-y-2 cursor-pointer ${
            pathname === "/account-settings" && "text-primary"
          }`}
        >
          <UserIcon
            className="size-5"
            fillColor={pathname === "/account-settings" ? "#006FAC" : "#FFFFFF"}
          />
          <span className="w-full text-center text-xs">Account</span>
        </div>
        <Link
          href="/cart"
          className={`relative flex flex-col items-center justify-center space-y-2 cursor-pointer ${
            pathname === "/cart" && "text-primary"
          }`}
        >
          <CartIcon className="size-5" />
          <span className="w-full text-center text-xs">Cart</span>
          <span className="absolute -top-4 -right-1.5 text-white w-4 h-4 flex items-center justify-center bg-[#38ADA0] font-semibold rounded-full text-xs">
            {cart.length}
          </span>
        </Link>
      </nav>
    </>
  );
};

export default BottomNav;
