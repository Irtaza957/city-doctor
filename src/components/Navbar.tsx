"use client";

import Search from "./Search";
import StatusBar from "./StatusBar";
import { RootState } from "@/store";
import Logo from "@/assets/img/logo.svg";
import MenuListItem from "./MenuListItem";
import LoginModal from "./modals/LoginModal";
import UserIcon from "@/assets/icons/UserIcon";
import CartIcon from "@/assets/icons/CartIcon";
import LoginDrawer from "./drawers/LoginDrawer";
import HeartIcon from "@/assets/icons/HeartIcon";
import CalendarIcon from "@/assets/icons/CalendarIcon";
import LocationIcon from "@/assets/icons/LocationIcon";
import { logout, toggleSidebar } from "@/store/global";

import {
  Menu,
  MenuItem,
  MenuItems,
  MenuButton,
  Transition,
} from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
// import { LuLoader } from "react-icons/lu";
import { Fragment, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

import SearchDrawer from "./drawers/SearchDrawer";
// import LocationTwoIcon from "@/assets/icons/LocationTwoIcon";
// import { useFetchAddressesQuery } from "@/store/services/address";
import MobileMagnifyerIcon from "@/assets/mobile-icons/MagnifyerIcon";

const userOptions = [
  {
    id: 1,
    name: "Profile",
    link: "/account-settings",
    icon: <UserIcon fillColor="black" className="size-4 text-transparent" />,
  },
  {
    id: 2,
    name: "Bookings",
    link: "/account-settings",
    icon: (
      <CalendarIcon fillColor="black" className="size-5 text-transparent" />
    ),
  },
  {
    id: 3,
    name: "Addresses",
    link: "/account-settings",
    icon: <LocationIcon fillColor="black" className="size-4 text-black" />,
  },
];

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  // const [value, setValue] = useState<string | null>(null);
  const { cart, user, wishlistCount } = useSelector(
    (state: RootState) => state.global
  );
  // const { data, isLoading } = useFetchAddressesQuery(user?.customer_id!);

  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const closeLogin = () => {
    setOpenDrawer(false);
  };

  const signout = () => {
    dispatch(logout());
  };

  // useEffect(() => {
  //   if (data) {
  //     const address = `${data[0].apartment && data[0].apartment}, ${data[0].building_no && data[0].building_no}, ${data[0].street && data[0].street}`;
  //     setValue(address);  
  //   }
  // }, [data]);

  return (
    <>
      <LoginModal open={open} setOpen={setOpen} />
      <LoginDrawer open={openDrawer} onClose={closeLogin} />
      <SearchDrawer open={openSearch} onClose={() => setOpenSearch(false)} />
      <nav
        className={`${
          router.asPath.includes("location") ? "hidden" : "flex"
        } fixed top-0 left-0 z-50 w-full flex-col items-center justify-between sm:shadow-sm`}
      >
        <StatusBar />
        <div className="w-full bg-white hidden sm:flex items-center justify-center py-3 px-5 md:px-0">
          <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto h-full flex">
            <Link
              href="/home"
              className="flex items-center justify-center pr-5 lg:pr-9 mb-1.5"
            >
              <Image
                priority
                width={240}
                height={50}
                src={Logo}
                alt="logo"
                className="w-64 lg:w-72 mr-auto"
              />
            </Link>
            <Search />
            <div className="w-24 md:w-96 flex items-center justify-center px-3">
              {user ? (
                <Menu>
                  <MenuButton className="w-full flex items-center justify-center">
                    <Image
                      alt="profile"
                      width={36}
                      height={36}
                      className="rounded-full"
                      src={user.image || "https://ui.shadcn.com/avatars/04.png"}
                    />
                    <span className="hidden md:flex font-semibold text-xs xl:text-sm px-3 text-left overflow-hidden truncate">
                      {user.firstname}&nbsp;{user.lastname}
                    </span>
                    <FaChevronDown className="hidden md:flex size-4 text-[#858688]" />
                  </MenuButton>
                  <Transition
                    enter="transition ease-out duration-75"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <MenuItems
                      anchor="bottom end"
                      className="w-72 h-fit mt-4 px-3 rounded-lg flex flex-col items-center z-50 bg-white shadow-md"
                    >
                      {userOptions.map((option) => (
                        <MenuItem key={option.id}>
                          {({ close }) => (
                            <MenuListItem data={option} close={close} />
                          )}
                        </MenuItem>
                      ))}
                      <MenuItem>
                        {({ close }) => (
                          <p
                            onClick={() => {
                              signout();
                              close();
                            }}
                            className="cursor-pointer w-full text-center text-red-500 font-semibold py-3 text-sm"
                          >
                            Logout
                          </p>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="font-semibold text-xs xl:text-sm px-3 text-left overflow-hidden truncate w-full py-3.5 pl-3 hover:bg-gray-100 rounded-lg transition-all duration-150 ease-linear"
                  >
                    Login / Register
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center justify-end space-x-5">
              <div
                onClick={() => {
                  if (user) {
                    router.push("/wishlist");
                  } else {
                    setOpen((prev) => (prev = !prev));
                  }
                }}
                className="relative cursor-pointer"
              >
                <HeartIcon className="size-5 xl:size-6" />
                <span className="absolute -top-2 -right-2 text-white size-4 flex items-center justify-center bg-primary font-semibold rounded-full text-[10px]">
                  {wishlistCount}
                </span>
              </div>
              <button
                onClick={handleSidebar}
                type="button"
                className="relative"
              >
                <CartIcon className="size-5 xl:size-6 text-black" />
                <p className="absolute -top-2 -right-2 text-white size-4 flex items-center justify-center bg-primary font-semibold rounded-full text-[10px]">
                  {cart.length}
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white px-3 py-2.5 w-full h-[69px] flex sm:hidden items-center justify-between gap-4 shadow-sm">
          <Link href="/home">
            <Image
              priority
              width={240}
              height={50}
              src={Logo}
              alt="logo"
              className="size-full"
            />
          </Link>
          <div className="w-full flex items-center justify-end space-x-5">
            {/* <span>EN</span> */}
            <div className="relative">
              <div className="flex items-center justify-center gap-2.5">
                <button type="button" onClick={() => setOpenSearch(true)}>
                  <MobileMagnifyerIcon fillColor="black" className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (user) {
                      router.push("/wishlist");
                    } else {
                      setOpenDrawer((prev) => (prev = !prev));
                    }
                  }}
                >
                  <HeartIcon className="size-5" />
                </button>
              </div>
              <span className="absolute -top-1.5 -right-1.5 text-white size-4 flex items-center justify-center bg-[#38ADA0] font-semibold rounded-full text-[10px]">
                {wishlistCount}
              </span>
            </div>
          </div>
          {/* <div className="w-full flex md:hidden items-center justify-start">
            <div className="flex items-center justify-center space-x-2.5">
              <LocationTwoIcon
                fillColor="#006FAC"
                className="size-5 text-[#006FAC]"
              />
              {isLoading ? (
                <div className="w-full flex items-center justify-center">
                  <LuLoader className="animate-spin text-white" />
                </div>
              ) : (
                data && (
                  <Listbox
                    as="div"
                    value={value}
                    onChange={setValue}
                    className="relative w-full"
                  >
                    <ListboxButton className="flex items-center justify-center space-x-3">
                      <p className="w-full text-left text-xs font-medium text-[#535763]">
                        {value ? value : "Address"}
                      </p>
                      <FaChevronDown className="size-3 text-[#535763]" />
                    </ListboxButton>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <ListboxOptions className="absolute mt-1 z-50 w-64 max-h-52 overflow-y-auto custom-scrollbar flex flex-col items-start justify-start divide-y rounded-md bg-white border text-base shadow-lg">
                        {data?.map((option: ADDRESS) => (
                          <ListboxOption
                            key={option.address_id}
                            value={`${option.apartment && option.apartment}, ${
                              option.building_no && option.building_no
                            }, ${option.street && option.street}`}
                            className="w-full text-xs text-left text-black hover:bg-gray-100 p-3 flex items-center justify-start cursor-pointer"
                          >
                            <LocationIcon
                              fillColor="black"
                              className="size-4 mr-3 text-black"
                            />
                            {option.apartment && option.apartment}
                            ,&nbsp;
                            {option.building_no && option.building_no}
                            ,&nbsp;
                            {option.street && option.street}
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Transition>
                  </Listbox>
                )
              )}
            </div>
          </div> */}
          <Search />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
