import {
  Disclosure,
  Transition,
  DisclosurePanel,
  DisclosureButton,
} from "@headlessui/react";
import { Fragment } from "react";
import { FaChevronDown } from "react-icons/fa6";

const Accordion = ({
  section,
}: {
  section: {
    name?: string;
    description?: string;
    question?: string;
    answer?: string;
  };
}) => {
  return (
    <Disclosure as="div" className="w-full" defaultOpen={false}>
      {({ open }) => (
        <>
          <DisclosureButton
            className={`w-full flex items-center justify-center space-x-3 p-3 transition-all duration-300 ease-linear ${
              open
                ? "rounded-t-lg bg-primary text-white"
                : "rounded-lg bg-gray-100 text-gray-500"
            }`}
          >
            <span className="w-full text-left font-medium text-sm overflow-hidden truncate">
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
            <DisclosurePanel className="w-full p-3 rounded-b-lg bg-gray-100 text-gray-400 flex flex-col items-center justify-center space-y-3">
              <p className="text-xs md:text-sm text-gray-500">
                {section?.description ? section?.description : section?.answer}
              </p>
            </DisclosurePanel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Accordion;
