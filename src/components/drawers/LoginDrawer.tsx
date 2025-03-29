"use client";

import Slot from "../Slot";
import Timer from "../Timer";
import {
  useGetOTPMutation,
  useRegisterMutation,
  useVerifyOTPMutation,
} from "@/store/services/auth";
import { RootState } from "@/store";
import SelectMenu from "../SelectMenu";
import { fetchCountries } from "@/utils/helpers";
import MobileIcon from "@/assets/icons/MobileIcon";

import dayjs from "dayjs";
import { Drawer } from "vaul";
import PhoneInput, {
  Value,
  Country,
  PhoneNumber,
  parsePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import toast from "react-hot-toast";
import { OTPInput } from "input-otp";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { LuLoader2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";

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

const LoginDrawer = ({ open, onClose }: DIALOG_PROPS) => {
  const [otp, setOTP] = useState("");
  const [email, setEmail] = useState("");
  const [resOTP, setResOTP] = useState("");
  const [type, setType] = useState("mobile");
  const [isLogin, setIsLogin] = useState(true);
  const [getOTP, { isLoading }] = useGetOTPMutation();
  const [openVerify, setOpenVerify] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [phone, setPhone] = useState<Value | undefined>();
  const [verifyOTP, { isLoading: submitting }] = useVerifyOTPMutation();

  const [dob, setDOB] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [gender, setGender] = useState("Gender");
  const [errors, setErrors] = useState<string[]>([]);
  const [nationality, setNationality] = useState("Nationality");
  const { country } = useSelector((state: RootState) => state.global);
  const [register, { isLoading: registering }] = useRegisterMutation();
  const [countryList, setCountryList] = useState<SELECT_MENU_ITEM_PROPS[]>([]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const closeVerify = () => {
    setOpenVerify(false);
  };

  const closeRegister = () => {
    setOpenRegister(false);
  };

  const handleInfoErrors = () => {
    const errorList = [];
    
    if (type === "mobile") {
      if (!phone) errorList.push("phone");
    } else {
      if (!email) errorList.push("email");
    }

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

  const openVerification = async () => {
    const noErrors = handleInfoErrors();

    if (!noErrors) {
      return;
    }

    if (!phone) {
      toast.error("Enter Phone Number to Proceed!");
    } else {
      const valid = handleBlur();

      if (valid) {
        const formData = new URLSearchParams();
        if (!isLogin || type === "mobile") {
          formData.append("phone", phone);
        } else {
          formData.append("email", email);
        }

        const data = await getOTP({
          type: isLogin ? "login" : "register",
          formData,
        });

        if (!isLogin) {
          if (data.error) {
            toast.error("Account Already Exists!");
            return;
          } else {
            setResOTP(data.data.data.otp);
          }
        }

        if (!data.error) {
          setOpenVerify(true);
          toast.success("Please Enter your OTP Now.");
        } else {
          toast.error("Phone Number Doesn't Exist!");
        }
      } else {
        toast.error("Invalid Phone Number!");
      }
    }
  };

  const handleSubmission = async () => {
    const formData = new URLSearchParams();
    if (isLogin) {
      if (type === "mobile") {
        formData.append("phone", phone?.toString()!);
      } else {
        formData.append("email", phone?.toString()!);
      }
    } else {
      formData.append("phone", phone?.toString()!);
    }
    formData.append("otp", otp);

    try {
      if (isLogin) {
        const data = await verifyOTP({
          type: isLogin ? "login" : "register",
          formData,
        });

        if (!data.error) {
          toast.success("Logged in Successfully!");
          handleClose();
          closeVerify();
        } else {
          toast.error("Please Enter Correct OTP!");
        }
      } else {
        if (parseInt(resOTP) === parseInt(otp)) {
          toast.success("Verified Successfully!");
          setOpenRegister(true);
        } else {
          toast.error("Please Enter Correct OTP!");
        }
      }
    } catch (err) {
      toast.error("Please Try Again!");
    }
  };

  const handleRegister = async () => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("firstname", firstName);
    urlencoded.append("lastname", lastName);
    urlencoded.append("phone", `${phone}`);
    urlencoded.append("email", email);
    urlencoded.append("gender", gender);
    urlencoded.append("nationality", nationality);
    urlencoded.append("date_of_birth", dayjs(dob).format("YYYY-MM-DD"));
    urlencoded.append("customer_source_id", "9");

    const valid = handleBlur();

    if (valid) {
      try {
        await register(urlencoded);
        toast.success("Successfully Registered!");
        setOpenRegister(false);
      } catch (error) {
        toast.error("Please Try Again!");
      }
    } else {
      toast.error("Invalid Phone Number!");
    }
  };

  useEffect(() => {
    if(open){
      fetchCountries(setCountryList);
    }
  }, [open]);

  /**
   * 1. Type Selection Drawer (Mobile, Email) && Input Drawer (Based on Type) --
   * 2. Verification Drawer --
   * 3. Register Drawer (Only if isLogin === false)
   */

  return (
    <Drawer.Root open={open} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay
          onClick={() => handleClose()}
          className="fixed inset-0 bg-black/40 z-50"
        />
        <Drawer.Content className="bg-white flex flex-col rounded-t-xl fixed text-black bottom-0 left-0 right-0 z-50 focus-visible:outline-none">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              openVerification();
            }}
            className="w-full p-5 flex flex-col items-center justify-center gap-5"
          >
            {/* Heading */}
            <h1 className="text-left text-[26px] font-bold">
              {isLogin ? "Login" : "Register"}
            </h1>
            {/* Type Selection */}
            {isLogin ? (
              <div className="w-full grid grid-cols-1 gap-5">
                <div
                  onClick={() => setType("mobile")}
                  className={`col-span-1 w-full p-3.5 rounded-lg font-semibold text-[16px] cursor-pointer flex items-center justify-center space-x-3 ${
                    type === "mobile"
                      ? "bg-primary text-white"
                      : "bg-[#F5F6FA] text-black"
                  }`}
                >
                  <MobileIcon
                    fillColor={type === "mobile" ? "#FFFFFF" : "#555555"}
                    className="size-6"
                  />
                  <span className="w-full text-center pr-6">Mobile</span>
                </div>
                <div
                  onClick={() => setType("email")}
                  className={`col-span-1 w-full p-3.5 rounded-lg font-semibold text-[16px] cursor-pointer flex items-center justify-center space-x-3 ${
                    type === "email"
                      ? "bg-primary text-white"
                      : "bg-[#F5F6FA] text-[#555555]"
                  }`}
                >
                  <MdOutlineEmail className="size-6" />
                  <span className="w-full text-center pr-6">Email</span>
                </div>
                <div className="w-full flex flex-col items-center justify-center space-y-1.5">
                  <label
                    htmlFor={type === "mobile" ? "phone" : "email"}
                    className="w-full text-left text-black font-semibold text-[16px]"
                  >
                    Enter {type === "mobile" ? "Phone Number" : "Email"}
                  </label>
                  {type === "mobile" ? (
                    <PhoneInput
                      className={`w-full bg-[#F7F7F7] gray-input p-3 rounded-lg border ${
                        errors.includes("phone") && type === "mobile"
                          ? "border-red-500"
                          : "border-[#DEDEDE]"
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
                  ) : (
                    <PhoneInput
                      className={`w-full bg-[#F7F7F7] gray-input p-3 rounded-lg border ${
                        errors.includes("phone") && type === "mobile"
                          ? "border-red-500"
                          : "border-[#DEDEDE]"
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
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center justify-center space-y-1.5">
                <label
                  htmlFor="phone"
                  className="w-full text-left text-black font-semibold text-[16px]"
                >
                  Enter Phone Number
                </label>
                <PhoneInput
                  className={`w-full bg-[#F7F7F7] gray-input p-3 rounded-lg border ${
                    errors.includes("phone") && type === "mobile"
                      ? "border-red-500"
                      : "border-[#DEDEDE]"
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
              </div>
            )}
            {isLogin ? (
              <p
                onClick={() => {
                  setIsLogin(false);
                  setErrors([]);
                }}
                className="w-full text-left text-xs"
              >
                Don&apos;t have an account?&nbsp;
                <span className="text-primary cursor-pointer">Register!</span>
              </p>
            ) : (
              <p
                onClick={() => setIsLogin(true)}
                className="w-full text-left text-xs"
              >
                Already have an account?&nbsp;
                <span className="text-primary cursor-pointer">Login!</span>
              </p>
            )}
            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold text-[18px]"
            >
              {isLoading ? (
                <div className="w-full flex items-center justify-center space-x-3">
                  <LuLoader2 className="w-5 h-5 animate-spin" />
                  <span>Please Wait...</span>
                </div>
              ) : (
                "Continue"
              )}
            </button>
          </form>
          {/* Verification Drawer */}
          <Drawer.NestedRoot open={openVerify} onClose={closeVerify}>
            <Drawer.Portal>
              <Drawer.Overlay
                onClick={closeVerify}
                className="fixed inset-0 bg-black/40 z-50"
              />
              <Drawer.Content className="bg-white flex flex-col rounded-t-xl fixed bottom-0 left-0 right-0 z-50">
                <Drawer.Title className="font-medium flex items-center justify-center py-3 px-5 border-b">
                  <p className="w-full text-left text-lg font-bold">
                    Verify your {type === "mobile" ? "Phone Number" : "Email"}
                  </p>
                  <button type="button" onClick={() => closeVerify()}>
                    <IoClose className="w-7 h-7" />
                  </button>
                </Drawer.Title>
                <div className="w-full p-5 flex flex-col items-center justify-center space-y-3 divide-y">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmission();
                    }}
                    className="w-full flex flex-col items-center justify-center"
                  >
                    <div className="w-full flex flex-col items-center justify-center">
                      <label
                        htmlFor="type"
                        className="w-full text-left text-gray-400 text-[14px] font-medium"
                      >
                        Enter the Code that was sent to
                      </label>
                      <span className="w-full text-left text-black text-[20px] font-bold">
                        {type === "mobile" ? phone : email}
                      </span>
                      <OTPInput
                        value={otp}
                        maxLength={6}
                        onChange={setOTP}
                        containerClassName="group w-full my-5"
                        render={({ slots }) => (
                          <>
                            <div className="flex">
                              {slots.map((slot, idx) => (
                                <Slot key={idx} {...slot} />
                              ))}
                            </div>
                          </>
                        )}
                      />
                    </div>
                    <div className="w-full flex items-center justify-between mb-10">
                      <Timer phone={phone} />
                      <span
                        onClick={closeVerify}
                        className="text-xs text-primary"
                      >
                        Change {type === "mobile" ? "Number" : "Email"}
                      </span>
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="col-span-2 w-full py-3.5 rounded-xl bg-primary text-white font-semibold text-[18px]"
                    >
                      {submitting ? (
                        <div className="w-full flex items-center justify-center space-x-3">
                          <LuLoader2 className="w-5 h-5 animate-spin" />
                          <span>Please Wait...</span>
                        </div>
                      ) : (
                        "Continue"
                      )}
                    </button>
                  </form>
                  {/* Register Drawer */}
                  <Drawer.NestedRoot
                    open={openRegister}
                    onClose={closeRegister}
                  >
                    <Drawer.Portal>
                      <Drawer.Overlay
                        onClick={closeRegister}
                        className="fixed inset-0 bg-black/40 z-50"
                      />
                      <Drawer.Content className="bg-white flex flex-col rounded-t-xl fixed bottom-0 left-0 right-0 z-50">
                        <Drawer.Title className="font-medium flex items-center justify-center py-3 px-5 border-b">
                          <p className="w-full text-left text-lg font-bold">
                            Register
                          </p>
                          <button type="button" onClick={() => closeVerify()}>
                            <IoClose className="w-7 h-7" />
                          </button>
                        </Drawer.Title>
                        <div className="w-full p-5 flex flex-col items-center justify-center gap-5">
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleRegister();
                            }}
                            className="w-full grid grid-cols-2 gap-5"
                          >
                            <input
                              type="text"
                              placeholder="First Name"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="col-span-1 w-full p-3 rounded-lg !bg-[#F7F7F7] border border-[#DEDEDE] text-sm text-[#535763]"
                            />
                            <input
                              type="text"
                              placeholder="Last Name"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="col-span-1 w-full p-3 rounded-lg !bg-[#F7F7F7] border border-[#DEDEDE] text-sm text-[#535763]"
                            />
                            <PhoneInput
                              className="col-span-2 w-full p-3 rounded-lg !bg-[#F7F7F7] border border-[#DEDEDE] text-sm text-[#535763]"
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
                              className="col-span-1 w-full p-3 rounded-lg !bg-[#F7F7F7] border border-[#DEDEDE] text-sm text-[#535763]"
                            />
                            <SelectMenu
                              value={gender}
                              options={genders}
                              setValue={setGender}
                              cn="col-span-1 w-full p-3 rounded-lg !bg-[#F7F7F7] border border-[#DEDEDE] text-[#535763] flex items-center justify-between"
                            />
                            {countryList && (
                              <SelectMenu
                                value={nationality}
                                options={countryList}
                                setValue={setNationality}
                                cn="col-span-1 w-full p-3 rounded-lg !bg-[#F7F7F7] border border-[#DEDEDE] text-sm text-[#535763] flex items-center justify-between"
                              />
                            )}
                            <input
                              type="date"
                              placeholder="Date of Birth"
                              value={dob}
                              onChange={(e) => setDOB(e.target.value)}
                              className="col-span-1 w-full p-3 rounded-lg !bg-[#F7F7F7] border border-[#DEDEDE] text-sm text-[#535763]"
                            />
                            <button
                              type="submit"
                              disabled={registering}
                              className="col-span-2 w-full py-3.5 rounded-xl bg-primary text-white font-semibold text-[18px]"
                            >
                              {registering ? (
                                <div className="w-full flex items-center justify-center space-x-3">
                                  <LuLoader2 className="w-5 h-5 animate-spin" />
                                  <span>Please Wait...</span>
                                </div>
                              ) : (
                                "Continue"
                              )}
                            </button>
                          </form>
                        </div>
                      </Drawer.Content>
                    </Drawer.Portal>
                  </Drawer.NestedRoot>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.NestedRoot>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default LoginDrawer;