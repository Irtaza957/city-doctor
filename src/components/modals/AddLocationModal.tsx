import Modal from "../Modal";
import { RootState } from "@/store";
import LocationModal from "./LocationModal";
import { useFetchAddressesQuery } from "@/store/services/address";

import { GoPlus } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { LuLoader2 } from "react-icons/lu";
import { useEffect, useState } from "react";

interface AddLocationModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedAddress: React.Dispatch<React.SetStateAction<ADDRESS | null>>;
}

const AddLocationModal = ({
  open,
  setOpen,
  setSelectedAddress,
}: AddLocationModalProps) => {
  const [openForm, setOpenForm] = useState(false);
  const [selected, setSelected] = useState<ADDRESS | null>(null);
  const { user } = useSelector((state: RootState) => state.global);
  const { data, isLoading } = useFetchAddressesQuery(user?.customer_id);

  const handleAddress = (address: ADDRESS | null) => {
    setSelectedAddress(address);
  };

  useEffect(() => {
    if (data) {
      setSelected(data[0]);
      handleAddress(data[0]);
    }
  }, [data]);

  return (
    <>
      <LocationModal
        open={openForm}
        setOpen={setOpenForm}
        setParentOpen={setOpen}
      />
      <Modal
        toggle={open}
        width="w-[67.5%] md:w-[50%] lg:w-[37.5%] xl:w-[25%] 3xl:w-[20%]"
        setToggle={setOpen}
        cn="flex items-center justify-center"
      >
        <div className="w-full h-full bg-white px-7 py-3.5 rounded-xl flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between mb-3 border-b pb-3">
            <h1 className="text-left text-lg font-semibold">
              Where would you prefer service ?
            </h1>
            <IoClose
              onClick={() => setOpen(false)}
              className="w-6 h-6 text-black cursor-pointer"
            />
          </div>
          <div
            onClick={() => {
              setOpen(false);
              setOpenForm(true);
            }}
            className="w-full flex items-center justify-center space-x-1.5 text-primary font-semibold cursor-pointer border-b pb-3"
          >
            <GoPlus className="w-6 h-6" />
            <span className="w-full text-left text-sm">Add Address</span>
          </div>
          <div className="w-full flex flex-col items-center justify-center max-h-[425px] overflow-auto pr-5 custom-scrollbar">
            {isLoading ? (
              <div className="w-full flex items-center justify-center">
                <LuLoader2 className="w-10 h-10 animate-spin text-secondary" />
              </div>
            ) : (
              data?.map((address) => (
                <div
                  key={address.address_id}
                  onClick={() => setSelected(address)}
                  className="w-full flex flex-col items-center justify-center space-y-1 py-5 cursor-pointer border-b"
                >
                  <div className="w-full flex items-center justify-center">
                    <span className="w-full text-left font-bold">
                      {address.address_type}
                    </span>
                    <div className="w-6 h-6 p-1 rounded-full border">
                      <div
                        className={`${
                          selected?.address_id === address.address_id
                            ? "flex"
                            : "hidden"
                        } w-full h-full rounded-full bg-primary`}
                      />
                    </div>
                  </div>
                  <span className="w-full text-left text-xs font-medium text-[#535763]">
                    {address.apartment && address.apartment},&nbsp;
                    {address.building_no && address.building_no},&nbsp;
                    {address.street && address.street},&nbsp;
                    {address.area && address.area}
                  </span>
                </div>
              ))
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              handleAddress(selected);
              setOpen(false);
            }}
            className="w-full py-2 rounded-lg bg-primary text-white !mt-6 font-medium"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AddLocationModal;
