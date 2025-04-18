import Modal from "../Modal";
import { RootState } from "@/store";
import SelectMenu from "../SelectMenu";
import "react-phone-number-input/style.css";
import { fetchCountries } from "@/utils/helpers";
import CalendarIcon from "@/assets/icons/CalendarIcon";
import { useRegisterMutation } from "@/store/services/auth";

import PhoneInput, {
  Value,
  Country,
  PhoneNumber,
  parsePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { LuLoader } from "react-icons/lu";
import { useEffect, useState } from "react";

const RegisterModal = ({
  open,
  setOpen,
  setLogin,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
  const [dob, setDOB] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [gender, setGender] = useState("Gender");
  const [errors, setErrors] = useState<string[]>([]);
  const [register, { isLoading }] = useRegisterMutation();
  const [phone, setPhone] = useState<Value | undefined>();
  const [nationality, setNationality] = useState("Nationality");
  const { country } = useSelector((state: RootState) => state.global);
  const [countryList, setCountryList] = useState<SELECT_MENU_ITEM_PROPS[]>([]);

  const clearForm = () => {
    setDOB("");
    setEmail("");
    setErrors([]);
    setLastName("");
    setFirstName("");
    setGender("Gender");
    setPhone(undefined);
    setNationality("Nationality");
  };

  const handleErrors = () => {
    let errorArray = [];
    if (!dob) errorArray.push("dob");
    if (!email) errorArray.push("email");
    if (!phone) errorArray.push("phone");
    if (!gender) errorArray.push("gender");
    if (!lastName) errorArray.push("lastName");
    if (!firstName) errorArray.push("firstName");
    if (!nationality) errorArray.push("nationality");

    setErrors(errorArray);
    return errorArray.length === 0;
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

  const handleSubmission = async () => {
    const noErrors = handleErrors();

    if (!noErrors) {
      toast.error("Please Fill Required Fields!");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("firstname", firstName);
    formData.append("lastname", lastName);
    formData.append("phone", phone?.toString()!);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("nationality", nationality);
    formData.append("date_of_birth", dob);
    formData.append("customer_source_id", "9");

    try {
      const valid = handleBlur();

      if (valid) {
        const data = await register(formData);
        if (data.error) {
          // @ts-ignore
          toast.error(`${data.error?.data?.error}`);
        } else {
          toast.success("User Registered Successfully!");
          setOpen(false);
          clearForm();
        }
      } else {
        toast.error("Invalid Phone Number!");
      }
    } catch (err) {
      toast.error("Please Try Again!");
    }
  };

  useEffect(() => {
    if (open) {
      fetchCountries(setCountryList);
    }
  }, [open]);

  return (
    <Modal
      cn="flex items-center justify-center"
      toggle={open}
      setToggle={setOpen}
      width="w-[75%] md:w-[55%] lg:w-[40%] xl:w-[27.5%] 3xl:w-[20%]"
    >
      <div className="relative w-full h-full bg-white px-16 py-8 rounded-xl flex flex-col items-center justify-center">
        <IoClose
          onClick={() => {
            setOpen(false);
            clearForm();
          }}
          className="absolute top-2.5 right-2.5 w-5 h-5 text-black cursor-pointer"
        />
        <h1 className="w-full text-center text-2xl font-bold">Register</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmission();
          }}
          className="w-full grid grid-cols-2 gap-4 mt-5"
        >
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`col-span-1 w-full py-2.5 px-3 rounded-lg !bg-[#F5F6FA] text-sm text-[#535763] ${errors.includes("firstName") ? "border border-red-600" : ""
              }`}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`col-span-1 w-full py-2.5 px-3 rounded-lg !bg-[#F5F6FA] text-sm text-[#535763] ${errors.includes("lastName") ? "border border-red-600" : ""
              }`}
          />
          <PhoneInput
            className={`col-span-2 w-full py-2.5 px-3 rounded-lg !bg-[#F5F6FA] text-sm text-[#535763] ${errors.includes("phone") ? "border border-red-600" : ""
              }`}
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
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`col-span-1 w-full py-2.5 px-3 rounded-lg !bg-[#F5F6FA] text-sm text-[#535763] ${errors.includes("email") ? "border border-red-600" : ""
              }`}
          />
          <div className="col-span-1 w-full z-20">
            <SelectMenu
              value={gender}
              options={genders}
              setValue={setGender}
              cn={`col-span-1 w-full flex py-3.5 px-3 rounded-lg !bg-[#F5F6FA] text-sm text-[#535763] ${errors.includes("gender") ? "border border-red-600" : ""
                }`}
            />
          </div>
          {countryList && (
            <SelectMenu
              value={nationality}
              options={countryList}
              setValue={setNationality}
              cn={`col-span-1 flex w-full py-3.5 px-3 rounded-lg !bg-[#F5F6FA] text-sm text-[#535763] ${errors.includes("nationality") ? "border border-red-600" : ""
                }`}
            />
          )}
          <div
            className={`relative w-full flex items-center justify-center py-2.5 px-3 rounded-lg bg-[#F5F6FA] text-sm text-[#535763] ${errors.includes("dob") ? "border border-red-600" : ""
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
          <p
            onClick={() => {
              setOpen(false);
              setLogin(true);
            }}
            className="col-span-2 w-full text-center font-medium text-xs !my-5"
          >
            Already have an account?&nbsp;
            <span className="text-primary cursor-pointer">Login</span>
          </p>
          <button
            type="submit"
            disabled={isLoading}
            className="col-span-2 w-full py-2.5 rounded-lg bg-primary text-white !mt-0 text-sm font-medium"
          >
            {isLoading ? (
              <div className="w-full flex items-center justify-center space-x-3">
                <LuLoader className="w-5 h-5 animate-spin" />
                <span>Please Wait...</span>
              </div>
            ) : (
              "Continue"
            )}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default RegisterModal;
