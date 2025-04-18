import { RootState } from "@/store";
import { useFetchAddressesQuery } from "@/store/services/address";

import {
  Listbox,
  Transition,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useSelector } from "react-redux";
import { LuLoader } from "react-icons/lu";
import { Fragment, useEffect, useState } from "react";
import { FaChevronDown, FaLocationDot } from "react-icons/fa6";

const Location = () => {
  const [value, setValue] = useState<string | null>(null);
  const { user } = useSelector((state: RootState) => state.global);
  const { data, isLoading } = useFetchAddressesQuery(user?.customer_id!);

  useEffect(() => {
    if (data) {
      setValue(
        `${data[0].apartment && data[0].apartment}, ${
          data[0].building_no && data[0].building_no
        }, ${data[0].street && data[0].street}`
      );
    }
  }, [data]);

  return (
    <div className="w-full h-full flex xl:hidden items-center justify-start space-x-2 pt-[135px] px-5 pb-5">
      <FaLocationDot className="w-5 h-5 text-primary" />
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
              <p className="w-full text-left text-xs font-medium">{value}</p>
              <FaChevronDown className="w-5 h-5 text-primary" />
            </ListboxButton>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute mt-1 z-10 max-h-52 overflow-y-auto custom-scrollbar rounded-md bg-white border text-base shadow-lg px-3 pb-3">
                {data?.map((option: ADDRESS) => (
                  <ListboxOption
                    key={option.address_id}
                    value={`${option.apartment && option.apartment}, ${
                      option.building_no && option.building_no
                    }, ${option.street && option.street}`}
                    className={`w-full text-xs text-left text-black ${
                      parseInt(option.address_id!) === data?.length
                        ? "border-none pt-3"
                        : "border-b py-3"
                    }`}
                  >
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
  );
};

export default Location;
