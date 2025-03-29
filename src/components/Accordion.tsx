import {
  Disclosure,
  Transition,
  DisclosurePanel,
  DisclosureButton,
} from "@headlessui/react";
import { Fragment } from "react";
import { FaChevronDown } from "react-icons/fa6";
import he from 'he';

const Accordion = ({
  children,
  section,
}: {
  children?: React.ReactNode;
  section: {
    name?: string;
    description?: string;
    question?: string;
    answer?: string;
  };
  index?: number;
}) => {
  return (
    <Disclosure as="div" className="w-full">
      {({ open }) => (
        <>
          <DisclosureButton
            className={`w-full flex items-center justify-center space-x-3 p-3 transition-all duration-300 ease-linear ${
              open
                ? "rounded-t-lg bg-primary text-white"
                : "rounded-lg bg-[#FAFAFA] text-[#535763]"
            }`}
          >
            <span className="w-full text-left md:text-xl font-medium overflow-hidden truncate">
              {section?.name ? section?.name : section?.question}
            </span>
            <FaChevronDown
              className={`size-4 transition-all duration-150 ease-linear ${
                open && "rotate-180"
              }`}
            />
          </DisclosureButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <DisclosurePanel className="w-full p-3 rounded-b-lg bg-[#FAFAFA] text-gray-400 flex flex-col space-y-3">
              {children ? children : (
                <p className="text-[#535763] text-sm font-medium" dangerouslySetInnerHTML={{ __html: he.decode(section?.description ? section?.description : section?.answer ?? '') }} />
              )}
            </DisclosurePanel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Accordion;
