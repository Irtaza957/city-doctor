import {
  Transition,
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from "@headlessui/react";
import { Fragment } from "react";
import { FaChevronDown } from "react-icons/fa6";
import GoogleAnalytics from "../components/GoogleAnalytics";

const FAQ = () => {
  return (
    <>
    <GoogleAnalytics />
    <div className="w-full flex items-center justify-center mt-[85px] md:mt-[150px]">
      <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto px-5 md:px-0 flex flex-col items-center justify-center space-y-2.5 pb-20">
        <h1 className="w-full text-left text-2xl xl:text-4xl font-bold !mb-5">
          FAQs
        </h1>
        {[...Array(10)].map((_, idx) => (
          <Disclosure key={idx} as="div" className="w-full">
            {({ open }) => (
              <>
                <DisclosureButton
                  className={`w-full flex bg-primary text-white items-center justify-center p-3 transition-all duration-150 ease-linear ${
                    open ? "rounded-t-lg" : "rounded-lg"
                  }`}
                >
                  <span className="w-full text-left font-medium">
                    Lorem ipsum dolor sit amet.
                  </span>
                  <FaChevronDown
                    className={`w-4 h-4 transition-all duration-150 ease-linear ${
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
                  <DisclosurePanel className="w-full p-3 rounded-b-lg bg-gray-100 text-gray-400 flex flex-col items-center justify-center space-y-3">
                    <p className="text-xs text-gray-500 w-full text-left">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Velit adipisci illum vitae fugiat eligendi porro
                      laudantium culpa aperiam animi enim cupiditate consequatur
                      sunt ullam, ad, reiciendis quos, veritatis a quasi! At,
                      possimus neque modi aperiam quisquam consectetur sint
                      rerum reiciendis sed? Aut soluta qui quasi quae? Cumque
                      impedit esse cum.
                    </p>
                  </DisclosurePanel>
                </Transition>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
    </>
  );
};

export default FAQ;
