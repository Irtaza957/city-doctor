import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { LuLoader } from "react-icons/lu";
import { useEffect, useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

import Modal from "../Modal";
import {
  useFetchAddressesQuery,
  useDeleteAddressMutation,
  useDefaultAddressMutation,
} from "@/store/services/address";
import { RootState } from "@/store";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import LocationModal from "../modals/LocationModal";
import AddAddressDrawer from "../drawers/AddAddressDrawer";
import UpdateAddressModal from "../modals/UpdateAddressModal";
import UpdateAddressDrawer from "../drawers/UpdateAddressDrawer";

// eslint-disable-next-line no-unused-vars
const AddressesTab = ({ handleTab }: { handleTab: (tab: string) => void }) => {
  const [del, setDel] = useState(false);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [selected, setSelected] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [defAdd, setDefAdd] = useState<ADDRESS | null>(null);
  const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false);
  const { user } = useSelector((state: RootState) => state.global);
  const { data, isLoading } = useFetchAddressesQuery(user?.customer_id);
  const [deleteAddress, { isLoading: deleting }] = useDeleteAddressMutation();
  const [defaultAddress, { isLoading: updating }] = useDefaultAddressMutation();

  const handleDelete = async (id: string) => {
    try {
      const data = await deleteAddress(id);
      if (data.error) {
        // @ts-ignore
        toast.error(data.error.data.error);
      } else {
        toast.success("Successfully Deleted Address");
      }
      setDel(false);
    } catch (error) {
      toast.error("Please Try Again!");
    }
  };

  useEffect(() => {
    if (data) {
      setDefAdd(data[0]);
    }
  }, [data]);

  const handleDefault = async (id: string) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("address_id", id);

    const data = await defaultAddress(urlencoded);

    if (data.error) {
      // @ts-ignore
      toast.error(data.error.data.error);
    } else {
      toast.success("Updated Default Address!");
    }
  };

  return (
    <>
      <Modal width="w-fit" toggle={del} setToggle={setDel}>
        <div className="w-full mx-auto flex flex-col items-center justify-center rounded-lg bg-white px-5 pt-10">
          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-[70px] h-[70px] p-4 rounded-full bg-[#FC385E] flex items-center justify-center">
              <IoIosWarning className="size-full text-white" />
            </div>
            <h1 className="text-center text-xl font-bold text-[#0A314A] my-4">
              Are You Sure?
            </h1>
          </div>
          <p className="w-2/3 text-center text-xs text-[#535763] font-medium mb-9">
            This Action Cannot be Reversed after being Performed.
          </p>
          <div className="w-full grid grid-cols-2 gap-4 px-4 mb-7">
            <button
              type="button"
              disabled={deleting}
              onClick={() => setDel(false)}
              className="col-span-1 w-full py-2 rounded-lg bg-[#A3A3A3] text-white font-medium text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={deleting}
              onClick={() => handleDelete(selected)}
              className="col-span-1 w-full py-2 rounded-lg bg-[#FC385E] text-white font-medium text-sm"
            >
              {deleting ? (
                <div className="w-full flex items-center justify-center space-x-3">
                  <LuLoader className="w-5 h-5 animate-spin" />
                </div>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </Modal>
      <AddAddressDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      />
      <UpdateAddressDrawer
        id={selected}
        open={openUpdateDrawer}
        onClose={() => setOpenUpdateDrawer(false)}
      />
      <LocationModal open={open} setOpen={setOpen} />
      <UpdateAddressModal id={selected} open={update} setOpen={setUpdate} />
      <div className="w-full max-h-full overflow-auto sm:pr-5 custom-scrollbar flex flex-col items-start justify-start">
        <div className="w-full sticky top-0 bg-white flex items-center justify-between pb-2.5 border-b border-gray-200">
          <div className="flex-1 flex items-center justify-start gap-5 sm:gap-0">
            <button
              type="button"
              onClick={() => handleTab("")}
              className="flex sm:hidden"
            >
              <IoArrowBack className="w-6 h-6" />
            </button>
            <h1 className="text-left text-xl font-bold">Addresses</h1>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="h-9 place-self-center text-sm w-24 rounded-full bg-primary text-white font-medium hidden sm:flex items-center justify-center"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setOpenDrawer(true)}
            className="h-9 place-self-center text-sm w-24 rounded-full bg-primary text-white font-medium sm:hidden flex items-center justify-center"
          >
            Add
          </button>
        </div>
        <div className="w-full flex flex-col items-start justify-start divide-y">
          {isLoading ? (
            <div className="w-full flex items-center justify-center">
              <LuLoader className="w-10 h-10 animate-spin text-secondary" />
            </div>
          ) : (
            data?.map((address, idx) => (
              <div
                key={idx}
                className="w-full md:w-2/3 xl:w-1/2 py-5 mr-auto flex flex-col items-center justify-center space-y-1.5"
              >
                <div className="w-full flex items-center justify-start space-x-3">
                  <div
                    onClick={() => {
                      setDefAdd(address);
                      handleDefault(address.address_id!);
                    }}
                    className="cursor-pointer size-5 rounded-full border border-primary p-1"
                  >
                    <div
                      className={`${
                        defAdd?.address_id === address.address_id
                          ? "flex"
                          : "hidden"
                      } w-full h-full rounded-full bg-primary`}
                    />
                  </div>
                  <span
                    className={`font-semibold flex items-center justify-start space-x-3 ${
                      defAdd?.address_id !== address.address_id && "text-left"
                    }`}
                  >
                    <span>{address.address_type}</span>
                    {defAdd?.address_id === address.address_id
                      ? updating && (
                          <LuLoader className="size-4 animate-spin text-secondary" />
                        )
                      : null}
                  </span>
                  <span
                    className={`font-medium text-xs ${
                      defAdd?.address_id === address.address_id
                        ? "flex"
                        : "hidden"
                    } text-primary text-left`}
                  >
                    (Default)
                  </span>
                  <div className="flex-1 flex items-center justify-end space-x-5 place-self-end">
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(`${address.address_id}`);
                        setUpdate(true);
                      }}
                      className="hidden sm:flex"
                    >
                      <EditIcon className="w-5 h-5 text-[#A3A3A3] cursor-pointer" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(`${address.address_id}`);
                        setOpenUpdateDrawer(true);
                      }}
                      className="sm:hidden flex"
                    >
                      <EditIcon className="w-5 h-5 text-[#A3A3A3] cursor-pointer" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(`${address.address_id}`);
                        setDel(true);
                      }}
                    >
                      <DeleteIcon
                        fillColor="#FF2727"
                        className="w-5 h-5 cursor-pointer text-transparent"
                      />
                    </button>
                  </div>
                </div>
                <p className="pl-9 w-full text-left text-xs text-[#555555]">
                  {address.apartment && address.apartment}
                  ,&nbsp;
                  {address.building_no && address.building_no}
                  ,&nbsp;
                  {address.street && address.street}
                  ,&nbsp;
                  {address.area && address.area}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default AddressesTab;
