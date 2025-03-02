import {
  useFetchAddressesQuery,
  useDefaultAddressMutation,
} from "@/store/services/address";
import { RootState } from "@/store";
import PhoneIcon from "@/assets/icons/PhoneIcon";
import LocationIcon from "@/assets/icons/LocationIcon";
import LocationTwoIcon from "@/assets/icons/LocationTwoIcon";

import {
  Listbox,
  Transition,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { LuLoader2 } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa6";
import { Fragment, useEffect, useState } from "react";

const StatusBar = () => {
  const [selected, setSelected] = useState("");
  const [defaultAddress] = useDefaultAddressMutation();
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

  const handleDefault = async () => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("address_id", selected);

    const data = await defaultAddress(urlencoded);

    if (data.error) {
      // @ts-ignore
      toast.error(data.error.data.error);
    } else {
      toast.success("Updated Default Address!");
    }
  };

  useEffect(() => {
    if (selected !== "") {
      handleDefault();
    }
  }, [selected]);

  return (
    <div className="w-full bg-primary text-white hidden md:flex items-center justify-between">
      <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto py-2.5 flex items-center justify-center">
        {user && (
          <div className="w-full flex items-center justify-between space-x-5">
            <div className="flex items-center justify-center space-x-2.5">
              <LocationTwoIcon
                fillColor="#044570"
                className="size-4 text-[#044570]"
              />
              <span className="text-xs font-semibold">Address</span>
            </div>
            {isLoading ? (
              <div className="w-full flex items-center justify-center">
                <LuLoader2 className="animate-spin text-white" />
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
                    <p className="w-full text-left text-xs font-medium">
                      {value}
                    </p>
                    <FaChevronDown className="text-white" />
                  </ListboxButton>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <ListboxOptions className="absolute mt-1 z-10 max-h-52 overflow-y-auto custom-scrollbar flex flex-col items-start justify-start divide-y rounded-md bg-white border text-base shadow-lg">
                      {data?.map((option: ADDRESS) => (
                        <ListboxOption
                          key={option.address_id}
                          value={`${option.apartment && option.apartment}, ${
                            option.building_no && option.building_no
                          }, ${option.street && option.street}`}
                          onClick={() => setSelected(option.address_id!)}
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
        )}
        <div className="w-full flex items-center justify-end space-x-5">
          <div className="flex items-center justify-center space-x-2.5">
            <PhoneIcon fillColor="#38ADA0" className="size-4 text-secondary" />
            <span className="text-sm">Call us 24/7</span>
          </div>
          <span className="font-semibold">800 5060</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
