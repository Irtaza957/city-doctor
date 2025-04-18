import Modal from "../Modal";
import { RootState } from "@/store";
import FamilyModal from "./FamilyModal";
import { useFetchFamilyQuery } from "@/store/services/family";

import dayjs from "dayjs";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { LuLoader } from "react-icons/lu";

interface AddFamilyModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMember: React.Dispatch<React.SetStateAction<FAMILY_LIST | null>>;
}

const AddFamilyModal = ({
  open,
  setOpen,
  setSelectedMember,
}: AddFamilyModalProps) => {
  const [openForm, setOpenForm] = useState(false);
  const { user } = useSelector((state: RootState) => state.global);
  const { data, isLoading } = useFetchFamilyQuery(user?.customer_id);
  const [selected, setSelected] = useState<FAMILY_LIST>({
    mrn: user?.mrn!,
    relationship: "self",
    family_member_id: "0",
    gender: user?.gender!,
    lastname: user?.lastname!,
    firstname: user?.firstname!,
    is_allergy: user?.is_allergy!,
    date_of_birth: user?.date_of_birth!,
    allergy_description: user?.allergy_description!,
  });

  const handleFamily = (member: FAMILY_LIST) => {
    setSelectedMember(member);
  };

  return (
    <>
      <FamilyModal
        open={openForm}
        setOpen={setOpenForm}
        setParentOpen={setOpen}
      />
      <Modal
        toggle={open}
        width="w-[65%] md:w-[50%] lg:w-[35%] xl:w-[25%] 3xl:w-[20%]"
        setToggle={setOpen}
        cn="flex items-center justify-center"
      >
        <div className="w-full h-full bg-white px-7 py-3.5 rounded-xl flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between mb-3 border-b pb-3">
            <h1 className="text-left text-lg font-semibold">
              Who will be Served ?
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
            <span className="w-full text-left text-sm">Add Family Member</span>
          </div>
          <div className="w-full flex flex-col items-start justify-start max-h-[425px] overflow-auto pr-5 custom-scrollbar">
            <div
              onClick={() => {
                setSelected({
                  mrn: user?.mrn!,
                  relationship: "self",
                  family_member_id: "0",
                  gender: user?.gender!,
                  lastname: user?.lastname!,
                  firstname: user?.firstname!,
                  is_allergy: user?.is_allergy!,
                  date_of_birth: user?.date_of_birth!,
                  allergy_description: user?.allergy_description!,
                });
              }}
              className="w-full flex flex-col items-center justify-center space-y-1 py-4 cursor-pointer border-b"
            >
              <div className="w-full flex items-center justify-center">
                <span className="w-full text-left font-bold">
                  {user?.firstname}&nbsp;{user?.lastname}&nbsp;(Myself)
                </span>
                <div className="w-6 h-6 p-1 rounded-full border">
                  <div
                    className={`${
                      parseInt(selected.family_member_id) === 0
                        ? "flex"
                        : "hidden"
                    } w-full h-full rounded-full bg-primary`}
                  />
                </div>
              </div>
              <span className="w-full text-left text-xs capitalize font-medium">
                {user?.gender}
              </span>
              <span className="w-full text-left text-xs font-medium">
                {dayjs(user?.date_of_birth).format("DD MMM, YYYY")}
              </span>
            </div>
            {!isLoading ? (
              data?.map((member) => (
                <div
                  key={member.family_member_id}
                  onClick={() => setSelected(member)}
                  className="w-full flex flex-col items-center justify-center space-y-1 py-4 cursor-pointer border-b"
                >
                  <div className="w-full flex items-center justify-center">
                    <span className="w-full text-left font-bold">
                      {member.relationship}
                    </span>
                    <div className="w-6 h-6 p-1 rounded-full border">
                      <div
                        className={`${
                          parseInt(selected.family_member_id) ===
                          parseInt(member.family_member_id)
                            ? "flex"
                            : "hidden"
                        } w-full h-full rounded-full bg-primary`}
                      />
                    </div>
                  </div>
                  <span className="w-full text-left text-xs capitalize font-medium">
                    {member.firstname}&nbsp;{member.lastname}
                  </span>
                  <span className="w-full text-left text-xs capitalize font-medium">
                    {member.gender}
                  </span>
                  <span className="w-full text-left text-xs font-medium">
                    {dayjs(member.date_of_birth).format("DD MMM, YYYY")}
                  </span>
                </div>
              ))
            ) : (
              <div className="w-full flex items-center justify-center">
                <LuLoader className="w-10 h-10 animate-spin text-secondary" />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              handleFamily(selected);
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

export default AddFamilyModal;
