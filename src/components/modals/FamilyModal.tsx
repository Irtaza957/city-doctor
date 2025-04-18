import Modal from "../Modal";
import { RootState } from "@/store";
import FormSelect from "../FormSelect";
import CalendarIcon from "@/assets/icons/CalendarIcon";
import { usePostFamilyMutation } from "@/store/services/family";

import { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { LuLoader } from "react-icons/lu";

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
  {
    id: 4,
    name: "Sister",
  },
  {
    id: 5,
    name: "Son",
  },
  {
    id: 6,
    name: "Daughter",
  },
  {
    id: 7,
    name: "Uncle",
  },
  {
    id: 8,
    name: "Wife",
  },
  {
    id: 9,
    name: "Husband",
  },
  {
    id: 10,
    name: "Other",
  },
];

const FamilyModal = ({
  open,
  setOpen,
  setParentOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setParentOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [dob, setDob] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [gender, setGender] = useState<string>(genders[0].name);
  const { user } = useSelector((state: RootState) => state.global);
  const [postFamilyMember, { isLoading }] = usePostFamilyMutation();
  const [relation, setRelation] = useState<string>(relations[0].name);

  const clearForm = () => {
    setDob("");
    setErrors([]);
    setLastName("");
    setFirstName("");
    setGender(genders[0].name);
    setRelation(relations[0].name);
  };

  const handleErrors = () => {
    const errorList = [];
    if (!dob) errorList.push("dob");
    if (!gender) errorList.push("gender");
    if (!lastName) errorList.push("lastName");
    if (!relation) errorList.push("relation");
    if (!firstName) errorList.push("firstName");

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

    try {
      const data = await postFamilyMember(formData);
      if (data.error) {
        // @ts-ignore
        toast.error(data.error.data.error);
      } else {
        toast.success("Added Family Member Successfully!");
        setOpen(false);
        if (setParentOpen) {
          setParentOpen(true);
        }
        clearForm();
      }
    } catch (err) {
      toast.error("Please Try Again!");
    }
  };

  return (
    <Modal
      cn="flex items-center justify-center"
      toggle={open}
      setToggle={setOpen}
      width="w-[55%] md:w-[45%] lg:w-[30%] xl:w-[25%] 3xl:w-[17.5%]"
    >
      <div className="w-full bg-white px-7 py-3.5 rounded-xl flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between mb-3 border-b pb-3">
          <h1 className="text-left text-lg font-semibold">
            Add New Family Member
          </h1>
          <IoClose
            onClick={() => {
              setOpen(false);
              clearForm();
            }}
            className="w-6 h-6 text-black cursor-pointer"
          />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="w-full grid grid-cols-2 gap-4"
        >
          <div className="col-span-2 w-full flex flex-col items-center justify-center z-20 mt-4">
            <label
              htmlFor="relation"
              className="w-full text-left text-[#A3A3A3] text-xs px-3 pb-2"
            >
              Relationship<span className="text-red-500">*</span>
            </label>
            <FormSelect
              value={relation}
              options={relations}
              setValue={setRelation}
              cn={errors.includes("relation") ? "border border-red-500" : ""}
            />
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <label
              htmlFor="firstName"
              className="w-full text-left text-[#A3A3A3] text-xs px-3 pb-2"
            >
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`px-3 pb-3 text-sm w-full border-b font-semibold ${
                errors.includes("firstName") ? "border border-red-500" : ""
              }`}
            />
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <label
              htmlFor="lastName"
              className="w-full text-left text-[#A3A3A3] text-xs px-3 pb-2"
            >
              Last Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`px-3 pb-3 text-sm w-full border-b font-semibold ${
                errors.includes("lastName") ? "border border-red-500" : ""
              }`}
            />
          </div>
          <div className="col-span-1 w-full flex flex-col items-center justify-center">
            <label
              htmlFor="gender"
              className="w-full text-left text-[#A3A3A3] text-xs px-3 pb-2"
            >
              Gender<span className="text-red-500">*</span>
            </label>
            <FormSelect
              value={gender}
              setValue={setGender}
              options={genders}
              cn={errors.includes("gender") ? "border border-red-500" : ""}
            />
          </div>
          <div className="col-span-1 w-full flex flex-col items-center justify-center">
            <label
              htmlFor="relation"
              className="w-full text-left text-[#A3A3A3] text-xs px-3 pb-2"
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
            disabled={isLoading}
            className="col-span-2 w-full py-2 rounded-lg bg-primary text-white mt-5 font-medium"
          >
            {isLoading ? (
              <div className="w-full flex items-center justify-center space-x-3">
                <LuLoader className="w-5 h-5 animate-spin" />
                <span>Please Wait...</span>
              </div>
            ) : (
              "Confirm"
            )}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default FamilyModal;
