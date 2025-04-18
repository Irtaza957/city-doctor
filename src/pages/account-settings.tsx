"use client";

import { RootState } from "../store";
import UserIcon from "@/assets/icons/UserIcon";
import HelpCenter from "../components/HelpCenter";
import CalendarIcon from "@/assets/icons/CalendarIcon";
import LocationIcon from "@/assets/icons/LocationIcon";
import ProfileTab from "@/components/account-tabs/ProfileTab";
import BookingsTab from "@/components/account-tabs/BookingsTab";
import AddressesTab from "@/components/account-tabs/AddressesTab";
import { emptyCart, logout, setAccountTab } from "@/store/global";
import AccountSidebarItem from "@/components/account-tabs/AccountSidebarItem";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaChevronRight } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import GoogleAnalytics from "../components/GoogleAnalytics";
import Footer from "@/components/Footer";

const sidebar = [
  {
    id: 1,
    name: "Profile",
    link: "profile",
    icon: (
      <UserIcon
        fillColor="black"
        className="size-5 sm:size-6 text-transparent"
      />
    ),
  },
  {
    id: 2,
    name: "Addresses",
    link: "addresses",
    icon: (
      <LocationIcon fillColor="black" className="size-5 sm:size-6 text-black" />
    ),
  },
  {
    id: 3,
    name: "Bookings",
    link: "bookings",
    icon: (
      <CalendarIcon
        fillColor="black"
        className="size-5 sm:size-6 text-transparent"
      />
    ),
  },
  // {
  //   id: 4,
  //   name: "Help Center",
  //   link: "help",
  //   icon: <HelpIcon className="size-5 sm:size-6 text-black" />,
  // },
  {
    id: 5,
    name: "Logout",
    link: "/home",
    icon: <MdOutlineLogout className="size-5 sm:size-6" />,
  },
];

const AccountSettings = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, accountTab } = useSelector((state: RootState) => state.global);

  const handleTab = (tab: string) => {
    dispatch(setAccountTab(tab));
  };

  const signout = () => {
    dispatch(emptyCart());
    dispatch(logout());
    router.push("/home");
  };

  return (
    <>
    <GoogleAnalytics />
      <div className="w-full h-full hidden sm:flex items-center justify-center px-5 md:px-0 sm:pt-[95px] md:pt-[130px] lg:pt-[135px]">
        <div className="w-full md:w-[90%] lg:max-w-[1440px] p-5 grid grid-cols-12 gap-5 mb-10 border border-gray-200 rounded-xl">
          <div className="col-span-3 w-full h-full flex flex-col items-start justify-start space-y-3 border-r border-gray-200 pr-5">
            {sidebar.map((item) => (
              <AccountSidebarItem data={item} key={item.id} />
            ))}
          </div>
          <div className="col-span-9 w-full h-[685px]">
            {accountTab === "profile" && <ProfileTab handleTab={handleTab} />}
            {accountTab === "bookings" && <BookingsTab />}
            {accountTab === "addresses" && (
              <AddressesTab handleTab={handleTab} />
            )}
            {accountTab === "help" && <HelpCenter handleTab={handleTab} />}
          </div>
        </div>
      </div>
      <div className="w-full h-full flex sm:hidden flex-col items-center justify-center mt-[69px] mb-[85px] pt-5 px-5">
        {accountTab === "" ? (
          <>
            <div className="w-full flex items-center justify-center gap-5 pb-2">
              <Image
                alt="user"
                width={50}
                height={50}
                className="rounded-full"
                src={
                  user?.image
                    ? user?.image
                    : "https://ui.shadcn.com/avatars/04.png"
                }
              />
              <div className="w-full flex flex-col items-center justify-between">
                <p className="text-black font-bold w-full text-left">
                  {user?.firstname}&nbsp;{user?.lastname}
                </p>
                <p className="text-xs w-full text-left text-gray-400">
                  {user?.phone}
                </p>
              </div>
            </div>
            {sidebar.map((item) => (
              <>
                {item.name === "Bookings" ? (
                  <Link
                    href={`${item.link}`}
                    className="w-full flex items-center justify-center gap-3 py-5 border-b"
                  >
                    {item.icon}
                    <span className="w-full text-left text-sm">
                      {item.name}
                    </span>
                    <FaChevronRight className="text-primary" />
                  </Link>
                ) : (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (item.name === "Logout") {
                        signout();
                      } else {
                        handleTab(item.link);
                      }
                    }}
                    className="w-full flex items-center justify-center gap-3 py-5 border-b"
                  >
                    {item.icon}
                    <span className="w-full text-left text-sm">
                      {item.name}
                    </span>
                    <FaChevronRight className="text-primary" />
                  </div>
                )}
              </>
            ))}
          </>
        ) : accountTab === "profile" ? (
          <ProfileTab handleTab={handleTab} />
        ) : accountTab === "bookings" ? (
          <BookingsTab />
        ) : accountTab === "addresses" ? (
          <AddressesTab handleTab={handleTab} />
        ) : (
          <HelpCenter handleTab={handleTab} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default AccountSettings;
