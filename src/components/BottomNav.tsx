"use client";

import { RootState } from "@/store";
import LoginDrawer from "./drawers/LoginDrawer";
import { setAccountTab } from "@/store/global";
import HomeIcon from "@/assets/icons/mobileMenu/home.svg";
import SelectedHome from "@/assets/icons/mobileMenu/homeSelected.svg";
import UserIcon from "@/assets/icons/mobileMenu/profile.svg";
import SelectedUserIcon from "@/assets/icons/mobileMenu/selectedProfile.svg";
import CartIcon from "@/assets/icons/mobileMenu/cart.svg";
import SelectedCartIcon from "@/assets/icons/mobileMenu/selectedCart.svg";
import BookingCalendarIcon from "@/assets/icons/mobileMenu/booking.svg";
import SelectedBookingCalendarIcon from "@/assets/icons/mobileMenu/selectedBooking.svg";
import OfferIcon from "@/assets/icons/mobileMenu/offer.svg";
import SelectedOfferIcon from "@/assets/icons/mobileMenu/selectedOffer.svg";

import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

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
        className={`flex border-t sm:hidden fixed bottom-0 left-0 z-40 w-full bg-white py-3 px-5 md:px-10 items-center justify-between text-gray-600 ${cart.length === 0 && "border-t"
          }`}
      >
        <Link
          href="/home"
          className={`flex flex-col items-center justify-center space-y-2 cursor-pointer ${pathname === "/home" && "text-primary"
            }`}
        >
          {pathname === "/home" ?
            <Image
              src={SelectedHome}
              alt="home"
              className="object-cover"
              width={22}
              height={22}
            /> :
            <Image
              src={HomeIcon}
              alt="home"
              className="object-cover"
              width={22}
              height={22}
            />}
          <span className="w-full text-center text-xs font-semibold">Home</span>
        </Link>
        <div
          onClick={() => {
            if (user) {
              push("/bookings");
            } else {
              setOpenLogin((prev) => (prev = !prev));
            }
          }}
          className={`flex flex-col items-center justify-center space-y-2 cursor-pointer ${pathname === "/bookings" && "text-primary"
            }`}
        >
          {/* <BookingCalendarIcon className="size-5" /> */}
          {pathname === "/bookings" ?
            <Image
              src={SelectedBookingCalendarIcon}
              alt="home"
              className="object-cover"
              width={22}
              height={22}
            /> : <Image
              src={BookingCalendarIcon}
              alt="home"
              className="object-cover"
              width={22}
              height={22}
            />}
          <span className="w-full text-center text-xs font-semibold">Bookings</span>
        </div>
        <div
          onClick={() => {
            setTab();

            if (user) {
              push("/offers");
            } else {
              setOpenLogin((prev) => (prev = !prev));
            }
          }}
          className={`flex flex-col items-center justify-center space-y-2 cursor-pointer ${pathname === "/offers" && "text-primary"
            }`}
        >
          {pathname === "/offers" ?
            <Image
              src={SelectedOfferIcon}
              alt="home"
              className="object-cover"
              width={22}
              height={22}
            /> :
            <Image
              src={OfferIcon}
              alt="home"
              className="object-cover"
              width={22}
              height={22}
            />}
          <span className="w-full text-center text-xs font-semibold">Offers</span>
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
          className={`flex flex-col items-center justify-center space-y-2 cursor-pointer ${pathname === "/account-settings" && "text-primary"
            }`}
        >
          {pathname === "/account-settings" ?
            <Image
              src={SelectedUserIcon}
              alt="home"
              className="object-cover"
              width={18}
              height={18}
            /> :
            <Image
              src={UserIcon}
              alt="home"
              className="object-cover"
              width={18}
              height={18}
            />}
          <span className="w-full text-center text-xs font-semibold">Account</span>
        </div>
        <Link
          href="/cart"
          className={`relative flex flex-col items-center justify-center space-y-2 cursor-pointer ${pathname === "/cart" && "text-primary"
            }`}
        >
          {pathname === "/cart" ?
            <Image
              src={SelectedCartIcon}
              alt="home"
              className="object-cover"
              width={22}
              height={22}
            /> :
            <Image
              src={CartIcon}
              alt="home"
              className="object-cover"
              width={22}
              height={22}
            />}
          <span className="w-full text-center text-xs font-semibold">Cart</span>
          <span className="absolute -top-4 -right-1.5 text-white w-4 h-4 flex items-center justify-center bg-[#38ADA0] font-semibold rounded-full text-xs">
            {cart.length}
          </span>
        </Link>
      </nav>
    </>
  );
};

export default BottomNav;
