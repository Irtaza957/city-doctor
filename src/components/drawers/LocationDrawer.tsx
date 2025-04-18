"use client";

import { Drawer } from "vaul";
import { GoPlus } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { LuLoader } from "react-icons/lu";
import { useEffect, useState } from "react";

import { RootState } from "@/store";
import AddAddressDrawer from "./AddAddressDrawer";
import { useFetchAddressesQuery } from "@/store/services/address";

interface LocationDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedAddress: ADDRESS | null;
  setSelectedAddress: React.Dispatch<React.SetStateAction<ADDRESS | null>>;
}

const LocationDrawer = ({ selectedAddress, setSelectedAddress, open, onClose }: LocationDrawerProps) => {
  const [openForm, setOpenForm] = useState(false);
  const { user } = useSelector((state: RootState) => state.global);
  const { data, isLoading } = useFetchAddressesQuery(user?.customer_id);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const closeForm = () => {
    setOpenForm(false);
  };

  useEffect(() => {
    if (data) {
      setSelectedAddress(data[0]);
    }
  }, [data]);

  return (
    <Drawer.Root open={open} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay
          onClick={() => handleClose()}
          className="fixed inset-0 bg-black/40 z-50"
        />
        <Drawer.Content className="bg-white flex flex-col rounded-t-xl fixed bottom-0 left-0 right-0 z-50 focus-visible:outline-none">
          <Drawer.Title className="font-medium flex items-center justify-center py-3 px-5 border-b">
            <p className="w-full text-left text-lg font-bold">
              Where would you prefer service ?
            </p>
            <button onClick={() => handleClose()}>
              <IoClose className="size-5" />
            </button>
          </Drawer.Title>
          <div className="relative w-full max-h-[75vh] flex flex-col items-start justify-start">
            <div
              onClick={() => setOpenForm(true)}
              className="sticky top-0 z-10 bg-white px-5 py-2.5 border-b w-full flex items-center justify-center gap-2.5 text-primary cursor-pointer"
            >
              <GoPlus className="size-7" />
              <span className="w-full text-left text-[14px] font-semibold">
                Add Address
              </span>
            </div>
            <div className="w-full max-h-full overflow-auto custom-scrollbar flex flex-col items-start justify-start gap-2.5 divide-y px-5 pb-2.5">
              {isLoading ? (
                <div className="w-full flex items-center justify-center">
                  <LuLoader className="w-10 h-10 animate-spin text-secondary" />
                </div>
              ) : (
                data?.map((address) => (
                  <div
                    key={address.address_id}
                    onClick={() => setSelectedAddress(address)}
                    className="w-full flex flex-col items-center justify-center space-y-1 pt-2.5 cursor-pointer"
                  >
                    <div className="w-full flex items-center justify-center">
                      <span className="w-full text-left font-semibold">
                        {address.address_type}
                      </span>
                      <div className="w-6 h-6 p-1 rounded-full border">
                        <div
                          className={`${
                            selectedAddress?.address_id === address.address_id
                              ? "flex"
                              : "hidden"
                          } w-full h-full rounded-full bg-primary`}
                        />
                      </div>
                    </div>
                    <span className="w-full text-left text-xs">
                      {address.apartment && address.apartment}
                      ,&nbsp;
                      {address.building_no && address.building_no}
                      ,&nbsp;
                      {address.street && address.street}
                      ,&nbsp;
                      {address.area && address.area}
                    </span>
                  </div>
                ))
              )}
            </div>
            <div className="w-full sticky bottom-0 z-10 bg-white p-2.5 border-t">
              <button
                type="button"
                onClick={() => handleClose()}
                className="w-full py-3 rounded-lg bg-primary text-white text-[18px] font-semibold"
              >
                Confirm
              </button>
            </div>
            <AddAddressDrawer open={openForm} onClose={closeForm} />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default LocationDrawer;
