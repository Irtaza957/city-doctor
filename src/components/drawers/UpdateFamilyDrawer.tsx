"use client";

import { Drawer } from "vaul";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { LuLoader2 } from "react-icons/lu";
import { useState, useEffect } from "react";

import {
  useFetchMemberQuery,
  useUpdateFamilyMutation,
} from "@/store/services/family";
import { RootState } from "@/store";
import SelectMenu from "../SelectMenu";
import CalendarIcon from "@/assets/icons/CalendarIcon";

const genders = [
  {
    id: 1,
    name: "Male",
  },
  {
    id: 2,
    name: "Female",
  },
];
const relations = [
  {
    id: 1,
    name: "Brother",
  },
  {
    id: 2,
    name: "Father",
  },
  {
    id: 3,
    name: "Mother",
  },
];

const UpdateFamilyDrawer = ({ id, open, onClose }: DIALOG_PROPS) => {
  const [dob, setDob] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [lastName, setLastName] = useState<string>("");
  const [updateFamilyMember, { isLoading: updating }] =
    useUpdateFamilyMutation();
  const { data, isLoading } = useFetchMemberQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });
  const [firstName, setFirstName] = useState<string>("");
  const [gender, setGender] = useState<string>(genders[0].name);
  const { user } = useSelector((state: RootState) => state.global);
  const [relation, setRelation] = useState<string>(relations[0].name);

  const clearForm = () => {
    setDob("");
    setLastName("");
    setFirstName("");
    setErrors([]);
    setGender(genders[0].name);
    setRelation(relations[0].name);
  };

  const handleErrors = () => {
    const errorList = [];
    if (!dob) errorList.push("dob");
    if (!lastName) errorList.push("lastName");
    if (!firstName) errorList.push("firstName");
    if (!gender) errorList.push("gender");
    if (!relation) errorList.push("relation");

    setErrors(errorList);
    return errorList.length === 0;
  };

  const handleSubmit = async () => {
    const noErrors = handleErrors();

    if (!noErrors) {
      return;
    }

    const formData = new URLSearchParams();
    formData.append("firstname", firstName);
    formData.append("lastname", lastName);
    formData.append("relationship", relation);
    formData.append("date_of_birth", dob);
    formData.append("gender", gender);
    formData.append("customer_id", user?.customer_id!);
    formData.append("family_member_id", id!);
    formData.append("is_allergy", "0");
    formData.append("allergy_description", "");

    try {
      const data = await updateFamilyMember(formData);

      if (data.error) {
        // @ts-ignore
        toast.error(data?.error?.data?.error);
      } else {
        toast.success("Updated Family Member Successfully!");
        clearForm();
        onClose();
      }
    } catch (err) {
      toast.error("Please Try Again!");
    }
  };

  useEffect(() => {
    if (data) {
      setGender(data?.gender!);
      setDob(data?.date_of_birth!);
      setLastName(data?.lastname!);
      setFirstName(data?.firstname!);
      setRelation(data?.relationship!);
    }
  }, [data]);

  return (
    <Drawer.Root open={open} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay
          onClick={() => {
            onClose();
            clearForm();
          }}
          className="fixed inset-0 bg-black/40 z-50"
        />
        <Drawer.Content className="bg-white flex flex-col rounded-t-xl fixed bottom-0 left-0 right-0 z-50">
          <Drawer.Title className="font-medium flex items-center justify-center py-3 px-5 border-b">
            <p className="w-full text-left text-xl font-bold">
              Update Family Member
            </p>
            <button
              onClick={() => {
                onClose();
                clearForm();
              }}
            >
              <IoClose className="w-7 h-7" />
            </button>
          </Drawer.Title>
          <div className="w-full p-5 flex flex-col items-center justify-center space-y-3 divide-y">
            {isLoading ? (
              <div className="w-full flex items-center justify-center">
                <LuLoader2 className="w-10 h-10 animate-spin text-secondary" />
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="w-full grid grid-cols-2 gap-4"
              >
                <div className="col-span-2 w-full flex flex-col items-center justify-center z-10">
                  <label
                    htmlFor="relation"
                    className="w-full text-left text-gray-400 text-xs px-3 pb-1.5"
                  >
                    Relationship<span className="text-red-500">*</span>
                  </label>
                  <SelectMenu
                    value={relation}
                    setValue={setRelation}
                    options={relations}
                    cn={`px-3 pb-3 w-full border-b flex items-center justify-center ${
                      errors.includes("relation") && "border border-red-500"
                    }`}
                  />
                </div>
                <div className="col-span-1 w-full flex flex-col items-center justify-center">
                  <label
                    htmlFor="firstName"
                    className="w-full text-left text-gray-400 text-xs px-3 pb-1.5"
                  >
                    First Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`px-3 pb-3 text-sm w-full border-b ${
                      errors.includes("firstName") && "border border-red-500"
                    }`}
                  />
                </div>
                <div className="col-span-1 w-full flex flex-col items-center justify-center">
                  <label
                    htmlFor="lastName"
                    className="w-full text-left text-gray-400 text-xs px-3 pb-1.5"
                  >
                    Last Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`px-3 pb-3 text-sm w-full border-b ${
                      errors.includes("lastName") && "border border-red-500"
                    }`}
                  />
                </div>
                <div className="col-span-1 w-full flex flex-col items-center justify-center">
                  <label
                    htmlFor="gender"
                    className="w-full text-left text-gray-400 text-xs px-3 pb-1.5"
                  >
                    Gender<span className="text-red-500">*</span>
                  </label>
                  <SelectMenu
                    value={gender}
                    setValue={setGender}
                    options={genders}
                    cn={`px-3 pb-3 w-full border-b flex items-center justify-center ${
                      errors.includes("gender") && "border border-red-500"
                    }`}
                  />
                </div>
                <div className="col-span-1 w-full flex flex-col items-center justify-center">
                  <label
                    htmlFor="relation"
                    className="w-full text-left text-gray-400 text-xs px-3 pb-1.5"
                  >
                    Date of Birth<span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`relative w-full flex items-center justify-center px-3 pb-3 border-b ${
                      errors.includes("dob") ? "border border-red-500" : ""
                    }`}
                  >
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="text-sm w-full font-semibold bg-transparent z-10"
                    />
                    <CalendarIcon
                      fillColor="black"
                      className="absolute right-3 size-4"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={updating}
                  className="col-span-2 w-full py-3 rounded-lg bg-primary text-white text-[18px] font-semibold mt-10"
                >
                  {updating ? (
                    <div className="w-full flex items-center justify-center space-x-3">
                      <LuLoader2 className="w-5 h-5 animate-spin" />
                      <span>Please Wait...</span>
                    </div>
                  ) : (
                    "Confirm"
                  )}
                </button>
              </form>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default UpdateFamilyDrawer;
