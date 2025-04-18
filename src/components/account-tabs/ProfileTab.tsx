import dayjs from "dayjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { LuLoader } from "react-icons/lu";
import { IoIosWarning } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

import Modal from "../Modal";
import {
  useFetchFamilyQuery,
  useDeleteFamilyMutation,
} from "@/store/services/family";
import { RootState } from "@/store";
import EditIcon from "@/assets/icons/EditIcon";
import FamilyModal from "../modals/FamilyModal";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import FamilyDrawer from "../drawers/FamilyDrawer";
import PersonalDetails from "@/components/PersonalDetails";
import UpdateFamilyModal from "../modals/UpdateFamilyModal";
import UpdateFamilyDrawer from "../drawers/UpdateFamilyDrawer";

// eslint-disable-next-line no-unused-vars
const ProfileTab = ({ handleTab }: { handleTab: (tab: string) => void }) => {
  const [del, setDel] = useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState(false);
  const [selected, setSelected] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false);
  const [familyData, setFamilyData] = useState<any[]>([]);
  const { user } = useSelector((state: RootState) => state.global);
  const { data, isError, isLoading } = useFetchFamilyQuery(user?.customer_id);
  const [deleteFamily, { isLoading: deleting }] = useDeleteFamilyMutation();

  const handleDelete = async (id: string) => {
    const data = await deleteFamily(id);
    if (data.error) {
      // @ts-ignore
      toast.error(data.error.data.error);
    } else {
      setDel(false);
      toast.success("Deleted Family Member Successfully!");
    }
  };

  useEffect(() => {
    if (data) {
      setFamilyData(data);
    }
    if (isError) {
      setFamilyData([])
    }
  }, [data, isError]);

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
      <FamilyModal open={open} setOpen={setOpen} />
      <UpdateFamilyModal id={selected} open={update} setOpen={setUpdate} />
      <FamilyDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
      <UpdateFamilyDrawer
        id={selected}
        open={openUpdateDrawer}
        onClose={() => setOpenUpdateDrawer(false)}
      />
      <div className="w-full max-h-full overflow-auto custom-scrollbar sm:pr-5 flex flex-col items-start justify-start space-y-3">
        <div className="sticky top-0 z-10 w-full flex items-center bg-white justify-between border-b pb-3">
          <div className="w-full flex items-center justify-start gap-5 sm:gap-0">
            <button type="button" onClick={() => handleTab("")} className="flex sm:hidden">
              <IoArrowBack className="w-6 h-6" />
            </button>
            <h1 className="w-full text-xl text-left font-bold">
              Personal Details
            </h1>
          </div>
          {!edit &&
          <button
            type="button"
            onClick={() => setEdit(true)}
            className="w-20 py-2 text-sm rounded-full bg-primary text-white items-center justify-center"
          >
            Edit
          </button>}
        </div>
        <PersonalDetails edit={edit} setEdit={setEdit} />
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
          {isLoading ? (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 w-full flex items-center justify-center pt-2.5">
              <LuLoader className="w-10 h-10 animate-spin text-secondary" />
            </div>
          ) : (
            <>
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 w-full flex items-center justify-between border-b pb-3">
                <h1 className="text-xl text-left font-bold">Family Members</h1>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="w-20 py-2 text-sm rounded-full bg-primary text-white items-center justify-center hidden sm:flex"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setOpenDrawer(true)}
                  className="w-20 py-2 text-sm rounded-full bg-primary text-white items-center justify-center sm:hidden flex"
                >
                  Add
                </button>
              </div>
              {familyData?.map((member) => (
                <div
                  key={member.family_member_id}
                  className="w-full flex flex-col items-center justify-center space-y-1 p-5 mt-2.5 cursor-pointer bg-[#F7F7F7] border border-[#DEDEDE] rounded-lg"
                >
                  <div className="w-full flex items-center justify-center">
                    <span className="w-full text-left text-lg font-semibold">
                      {member.relationship === "self"
                        ? "(Myself)"
                        : member.relationship}
                    </span>
                    <div className="w-full flex items-center justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          setSelected(member.family_member_id);
                          setUpdate(true);
                        }}
                        className="hidden sm:flex"
                      >
                        <EditIcon className="w-5 h-5 text-[#A3A3A3]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelected(member.family_member_id);
                          setOpenUpdateDrawer(true);
                        }}
                        className="sm:hidden flex"
                      >
                        <EditIcon className="w-5 h-5 text-[#A3A3A3]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelected(member.family_member_id);
                          setDel(true);
                        }}
                      >
                        <DeleteIcon
                          fillColor="#FF2727"
                          className="w-5 h-5 text-transparent"
                        />
                      </button>
                    </div>
                  </div>
                  <span className="w-full text-left text-xs text-[#555555] font-medium capitalize">
                    {member.firstname}&nbsp;{member.lastname}
                  </span>
                  <span className="w-full text-left text-xs text-[#555555] font-medium capitalize">
                    {member.gender}
                  </span>
                  <span className="w-full text-left text-xs text-[#555555] font-medium">
                    {dayjs(member.date_of_birth).format("DD MMM, YYYY")}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileTab;
