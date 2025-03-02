"use client";

import dayjs from "dayjs";
import { Drawer } from "vaul";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { LuLoader2 } from "react-icons/lu";

import { RootState } from "@/store";
import FamilyDrawer from "./FamilyDrawer";
import { useFetchFamilyQuery } from "@/store/services/family";

interface ServedDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedMember: FAMILY_LIST | null;
  setSelectedMember: React.Dispatch<React.SetStateAction<FAMILY_LIST | null>>;
}

const ServedDrawer = ({
  open,
  onClose,
  selectedMember,
  setSelectedMember,
}: ServedDrawerProps) => {
  const [openForm, setOpenForm] = useState(false);
  const { user } = useSelector((state: RootState) => state.global);
  const { data, isLoading } = useFetchFamilyQuery(user?.customer_id);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const closeForm = () => {
    setOpenForm(false);
  };

  return (
    <Drawer.Root open={open} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay
          onClick={() => handleClose()}
          className="fixed inset-0 bg-black/40 z-50"
        />
        <Drawer.Content className="bg-white flex flex-col rounded-t-xl fixed bottom-0 left-0 right-0 z-50 focus-visible:outline-none">
          <Drawer.Title className="font-medium flex items-center justify-center px-5 py-3 border-b">
            <p className="w-full text-left text-[20px] font-bold">
              Who will be served ?
            </p>
            <button type="button" onClick={() => handleClose()}>
              <IoClose className="w-7 h-7" />
            </button>
          </Drawer.Title>
          <div className="relative w-full max-h-[75vh] flex flex-col items-start justify-start">
            <div
              onClick={() => setOpenForm(true)}
              className="sticky top-0 z-10 py-2.5 px-5 border-b bg-white w-full flex items-center justify-center gap-2.5 text-primary cursor-pointer"
            >
              <GoPlus className="size-7" />
              <span className="w-full text-left text-[14px] font-semibold">
                Add Family Member
              </span>
            </div>
            <div className="w-full max-h-full overflow-auto custom-scrollbar flex flex-col items-start justify-start gap-2.5 divide-y px-5 pb-2.5">
              <div
                onClick={() =>
                  setSelectedMember({
                    mrn: user?.mrn!,
                    relationship: "self",
                    family_member_id: "0",
                    gender: user?.gender!,
                    lastname: user?.lastname!,
                    firstname: user?.firstname!,
                    is_allergy: user?.is_allergy!,
                    date_of_birth: user?.date_of_birth!,
                    allergy_description: user?.allergy_description!,
                  })
                }
                className="w-full flex flex-col items-center justify-center space-y-1 pt-3 cursor-pointer"
              >
                <div className="w-full flex items-center justify-center">
                  <span className="flex-1 text-left text-[16px] font-semibold">
                    {user?.firstname}&nbsp;{user?.lastname}&nbsp;(Myself)
                  </span>
                  <div className="w-6 h-6 p-1 rounded-full border">
                    <div
                      className={`${
                        parseInt(selectedMember?.family_member_id!) === 0
                          ? "flex"
                          : "hidden"
                      } w-full h-full rounded-full bg-primary`}
                    />
                  </div>
                </div>
                <span className="w-full text-left text-xs font-medium text-[#535763] capitalize">
                  {user?.gender}
                </span>
                <span className="w-full text-left text-xs font-medium text-[#535763]">
                  {dayjs(user?.date_of_birth).format("DD MMM, YYYY")}
                </span>
              </div>
              {!isLoading ? (
                data?.map((member) => (
                  <div
                    key={member.family_member_id}
                    onClick={() => setSelectedMember(member)}
                    className="w-full flex flex-col items-center justify-center space-y-1 pt-3 cursor-pointer"
                  >
                    <div className="w-full flex items-center justify-center">
                      <span className="flex-1 text-left font-semibold">
                        {member.firstname}&nbsp;{member.lastname}
                        {member.relationship === "self" && "(Myself)"}
                      </span>
                      <div className="w-6 h-6 p-1 rounded-full border">
                        <div
                          className={`${
                            parseInt(selectedMember?.family_member_id!) ===
                            parseInt(member.family_member_id)
                              ? "flex"
                              : "hidden"
                          } w-full h-full rounded-full bg-primary`}
                        />
                      </div>
                    </div>
                    <span className="w-full text-left text-xs capitalize">
                      {member.gender}
                    </span>
                    <span className="w-full text-left text-xs">
                      {dayjs(member.date_of_birth).format("DD MMM, YYYY")}
                    </span>
                  </div>
                ))
              ) : (
                <div className="w-full flex items-center justify-center pt-2.5">
                  <LuLoader2 className="size-10 animate-spin text-secondary" />
                </div>
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
            <FamilyDrawer open={openForm} onClose={closeForm} />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default ServedDrawer;
