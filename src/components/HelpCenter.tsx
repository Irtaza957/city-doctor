"use client";

import {
  FaTiktok,
  FaYoutube,
  FaXTwitter,
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaChevronDown,
  FaHeadphonesSimple,
} from "react-icons/fa6";
import {
  Transition,
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import { IoArrowBack } from "react-icons/io5";

// eslint-disable-next-line no-unused-vars
const HelpCenter = ({ cn, handleTab }: { cn?: string; handleTab: (tab: string) => void; }) => {
  const [active, setActive] = useState("faq");

  return (
    <div
      className={`${
        cn
          ? cn
          : "w-full max-h-full overflow-auto pr-5 custom-scrollbar flex flex-col items-start justify-start gap-3"
      }`}
    >
      <div className="w-full flex items-center justify-start gap-5 sm:gap-0">
        <button
          type="button"
          onClick={() => handleTab("")}
          className="flex sm:hidden"
        >
          <IoArrowBack className="w-6 h-6" />
        </button>
        <h1 className="w-full text-xl text-left font-bold">Help Center</h1>
      </div>
      <div className="w-full grid grid-cols-2 font-semibold">
        <p
          onClick={() => setActive("faq")}
          className={`cursor-pointer col-span-1 w-full pb-3 text-center ${
            active === "faq"
              ? "border-b-2 border-primary text-primary"
              : "border-b text-black"
          }`}
        >
          FAQ
        </p>
        <p
          onClick={() => setActive("contact")}
          className={`cursor-pointer col-span-1 w-full pb-3 text-center ${
            active === "contact"
              ? "border-b-2 border-primary text-primary"
              : "border-b text-black"
          }`}
        >
          Contact Us
        </p>
      </div>
      {active === "faq" ? (
        <div className="w-full flex flex-col items-start justify-start space-y-3">
          {[...Array(9)].map((_, idx) => (
            <Disclosure
              key={idx}
              as="div"
              className="w-full border-2 rounded-lg"
            >
              {({ open }) => (
                <>
                  <DisclosureButton
                    className={`w-full flex items-center justify-center p-3 ${
                      open
                        ? "bg-primary text-white rounded-t-lg"
                        : "bg-white text-black rounded-lg"
                    } transition-all duration-150 ease-linear`}
                  >
                    <span className="w-full text-left font-medium">
                      How I schedule an appointment?
                    </span>
                    <FaChevronDown
                      className={`w-4 h-4 transition-all duration-150 ease-linear ${
                        open ? "text-white rotate-180" : "text-primary rotate-0"
                      }`}
                    />
                  </DisclosureButton>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <DisclosurePanel className="w-full p-3 rounded-b-lg bg-white text-black flex flex-col items-center justify-center space-y-3">
                      <p className="w-full text-left text-xs text-[#555555]">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Laborum sit exercitationem rem. Quae tenetur minus
                        ab autem sequi dolor velit mollitia earum eum totam
                        praesentium esse sed repellat, eligendi alias.
                      </p>
                    </DisclosurePanel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      ) : (
        <>
          <Disclosure as="div" className="w-full border-2 rounded-lg p-3">
            {({ open }) => (
              <>
                <DisclosureButton
                  className={`w-full flex items-center justify-center ${
                    open && "border-b-2 pb-3"
                  } bg-white text-black transition-all duration-150 ease-linear`}
                >
                  <div className="w-full flex items-center justify-center space-x-3">
                    <FaHeadphonesSimple className="w-6 h-6" />
                    <span className="w-full text-left font-medium">
                      Customer Service
                    </span>
                  </div>
                  <FaChevronDown
                    className={`text-primary w-4 h-4 transition-all duration-150 ease-linear ${
                      open && "rotate-180"
                    }`}
                  />
                </DisclosureButton>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <DisclosurePanel className="w-full pt-3 rounded-b-lg bg-white text-black flex flex-col items-center justify-center space-y-3">
                    <p className="w-full text-left text-xs">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Laborum sit exercitationem rem. Quae tenetur minus ab
                      autem sequi dolor velit mollitia earum eum totam
                      praesentium esse sed repellat, eligendi alias.
                    </p>
                  </DisclosurePanel>
                </Transition>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="w-full border-2 rounded-lg p-3">
            {({ open }) => (
              <>
                <DisclosureButton
                  className={`w-full flex items-center justify-center ${
                    open && "border-b-2 pb-3"
                  } bg-white text-black transition-all duration-150 ease-linear`}
                >
                  <div className="w-full flex items-center justify-center space-x-3">
                    <FaWhatsapp className="w-6 h-6" />
                    <span className="w-full text-left font-medium">
                      Whatsapp
                    </span>
                  </div>
                  <FaChevronDown
                    className={`text-primary w-4 h-4 transition-all duration-150 ease-linear ${
                      open && "rotate-180"
                    }`}
                  />
                </DisclosureButton>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <DisclosurePanel className="w-full pt-3 rounded-b-lg bg-white text-black flex flex-col items-center justify-center space-y-3">
                    <div className="w-full flex items-center justify-between">
                      <span>+971 56 330 2017</span>
                      <span className="text-xs text-primary">Chat</span>
                    </div>
                  </DisclosurePanel>
                </Transition>
              </>
            )}
          </Disclosure>
          <div className="w-full flex flex-col items-center justify-center text-gray-500 mt-20">
            <span className="w-full text-left text-sm text-[#555555] font-medium">
              Address
            </span>
            <span className="w-full text-left text-sm">
              Grosvenor Building Tower - Office 1507
            </span>
            <span className="w-full text-left text-sm">
              Al Barsha Heights - Dubai
            </span>
          </div>
          <div className="w-full flex flex-col items-center justify-center text-gray-500 my-5">
            <span className="w-full text-left text-sm text-[#555555] font-medium">
              Hours:
            </span>
            <span className="w-full text-left text-sm">Open 24 Hours</span>
            <span className="w-full text-left text-sm">
              Phone: +971 56 330 2017
            </span>
          </div>
          <div className="w-full flex items-center justify-start gap-6 text-gray-500">
            <FaFacebook className="size-6" />
            <FaInstagram className="size-6" />
            <FaYoutube className="size-6" />
            <FaTiktok className="size-6" />
            <FaXTwitter className="size-6" />
          </div>
        </>
      )}
    </div>
  );
};

export default HelpCenter;
