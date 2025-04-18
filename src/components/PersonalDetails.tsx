"use client";

import PhoneInput, {
  Value,
  Country,
  PhoneNumber,
  parsePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { TbCircleCheckFilled } from "react-icons/tb";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

import { RootState } from "@/store";
import ProfileUpload from "./ProfileUpload";
import "react-phone-number-input/style.css";
import FormSelect from "@/components/FormSelect";
import CalendarIcon from "@/assets/icons/CalendarIcon";
import { useUpdateUserMutation } from "@/store/services/auth";
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

const PersonalDetails = ({
  edit,
  setEdit,
}: {
  edit?: boolean;
  setEdit?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [dob, setDOB] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [phone, setPhone] = useState<Value | undefined>();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { user, country } = useSelector((state: RootState) => state.global);

  const handleErrors = () => {
    const errorList = [];
    if (!dob) errorList.push("dob");
    if (!email) errorList.push("email");
    if (!phone) errorList.push("phone");
    if (!gender) errorList.push("gender");
    if (!lastName) errorList.push("lastName");
    if (!firstName) errorList.push("firstName");

    setErrors(errorList);
    return errorList.length === 0;
  };

  const handleBlur = () => {
    const parsedPhoneNumber: PhoneNumber = parsePhoneNumber(
      `${phone}`,
      country as Country
    )!;
    if (parsedPhoneNumber.isValid()) {
      return true;
    } else {
      toast.error("Invalid Phone Number!");
      return false;
    }
  };

  const handleSubmit = async () => {
    const noErrors = handleErrors();

    if (!noErrors) {
      return;
    }

    const valid = handleBlur();

    if (valid) {
      const userData = new URLSearchParams();
      userData.append("firstname", firstName);
      userData.append("lastname", lastName);
      userData.append("email", email);
      userData.append("date_of_birth", dob);
      userData.append("gender", gender);
      userData.append("is_allergy", "0");
      userData.append("allergy_description", "");
      userData.append("customer_id", user?.customer_id?.toString()!);

      try {
        const data = await updateUser({
          userData,
          token: user?.token,
        });

        if (data.error) {
          toast.error("Something Went Wrong! Please Try Again.")
        } else {
          toast.success("Address Updated Successfully!");
          if (setEdit) {
            setEdit(false);
          }
        }
      } catch (err) {
        setEmail(user?.email!);
        setGender(user?.gender!);
        setDOB(user?.date_of_birth!);
        setLastName(user?.lastname!);
        setFirstName(user?.firstname!);
        setPhone(user?.phone as Value);
        toast.error("Please Try Again!");
      }
    } else {
      toast.error("Invalid Phone Number!");
    }
  };

  useEffect(() => {
    setEmail(user?.email!);
    setGender(user?.gender!);
    setDOB(user?.date_of_birth!);
    setLastName(user?.lastname!);
    setFirstName(user?.firstname!);
    setPhone(user?.phone as Value);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-3 mt-[75px] mb-[85px] xl:m-0 pb-3">
      {!edit ? (
        <div className="w-full xl:w-[85%] mr-auto grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5">
          <div className="col-span-1 sm:col-span-2 w-full flex items-center justify-start pt-2.5 ml-2">
            <ProfileUpload />
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <label
              htmlFor="firstName"
              className="w-full text-left text-[#535763] px-3"
            >
              First Name
            </label>
            <label
              htmlFor="firstName"
              className="px-3 text-sm w-full font-semibold"
            >
              {firstName}
            </label>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <label
              htmlFor="lastName"
              className="w-full text-left text-[#535763] px-3"
            >
              Last Name
            </label>
            <label
              htmlFor="lastName"
              className="px-3 text-sm w-full font-semibold"
            >
              {lastName}
            </label>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <label
              htmlFor="gender"
              className="w-full text-left text-[#535763] px-3"
            >
              Gender
            </label>
            <label
              htmlFor="gender"
              className="px-3 text-sm w-full font-semibold"
            >
              {gender}
            </label>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <label
              htmlFor="dob"
              className="w-full text-left text-[#535763] px-3"
            >
              Date of Birth
            </label>
            <label htmlFor="dob" className="px-3 text-sm w-full font-semibold">
              {dob}
            </label>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <label
              htmlFor="email"
              className="w-full text-left text-[#535763] px-3"
            >
              Email
            </label>
            <label
              htmlFor="email"
              className="px-3 text-sm w-full font-semibold"
            >
              {email}
            </label>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <label
              htmlFor="gender"
              className="w-full text-left text-[#535763] px-3"
            >
              Phone Number
            </label>
            <label
              htmlFor="phone"
              className="px-3 text-sm w-full font-semibold"
            >
              {phone}
            </label>
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="w-full xl:w-[85%] mr-auto grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5"
        >
          <div className="col-span-1 sm:col-span-2 w-full flex items-center justify-start pt-2.5">
            <ProfileUpload />
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
                errors.includes("firstName") && "border border-red-500"
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
                errors.includes("firstName") && "border border-red-500"
              }`}
            />
          </div>
          <div className="w-full flex flex-col items-center justify-center">
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
              cn={`px-3 pb-3 w-full border-b flex items-center justify-center ${
                errors.includes("gender") && "border border-red-500"
              }`}
            />
          </div>
          <div className="w-full flex flex-col items-center justify-center border-b">
            <label
              htmlFor="dob"
              className="w-full text-left text-[#A3A3A3] text-xs px-3 pb-2"
            >
              Date of Birth<span className="text-red-500">*</span>
            </label>
            <div
              className={`relative w-full flex items-center justify-center px-3 pb-3 ${
                errors.includes("dob") && "border border-red-500"
              }`}
            >
              <input
                type="date"
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
                className="text-sm w-full font-semibold bg-transparent z-10"
              />
              <CalendarIcon
                fillColor="black"
                className="absolute right-3 size-4"
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <label
              htmlFor="email"
              className="w-full text-left text-[#A3A3A3] text-xs px-3 pb-2"
            >
              Email<span className="text-red-500">*</span>
            </label>
            <div className="w-full flex items-center justify-center border-b">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 pb-3 text-sm w-full font-semibold"
              />
              <p className="text-xs text-primary pb-2.5">Verify</p>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center border-b">
            <label
              htmlFor="gender"
              className="w-full text-left text-[#A3A3A3] text-xs px-3 pb-2"
            >
              Phone Number<span className="text-red-500">*</span>
            </label>
            <div className="w-full grid grid-cols-3 py-1.5 pl-3">
              <PhoneInput
                className="col-span-2 w-full white-input text-sm font-bold"
                defaultCountry={country as Country}
                international
                placeholder="+7 909 22-55-456"
                value={phone}
                onChange={setPhone}
                error={
                  phone
                    ? isValidPhoneNumber(phone)
                      ? undefined
                      : "Invalid phone number"
                    : "Phone number required"
                }
              />
              <div className="col-span-1 w-full flex items-center justify-end space-x-1.5 text-gray-500">
                <TbCircleCheckFilled />
                <span className="text-left text-xs">Verified</span>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-36 py-2 text-sm rounded-lg bg-primary text-white flex items-center justify-center mt-3"
          >
            {isLoading ? (
              <div className="w-full flex items-center justify-center gap-2">
                <LuLoader className="animate-spin" />
                <p>Please Wait...</p>
              </div>
            ) : "Save Changes"}
          </button>
        </form>
      )}
    </div>
  );
};

export default PersonalDetails;
