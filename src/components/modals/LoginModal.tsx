import { RootState } from "@/store";
import Slot from "@/components/Slot";
import Modal from "@/components/Modal";
import Timer from "@/components/Timer";
import "react-phone-number-input/style.css";
import RegisterModal from "./RegisterModal";
import { useGetOTPMutation, useVerifyOTPMutation } from "@/store/services/auth";

import { useState } from "react";
import PhoneInput, {
  Value,
  Country,
  PhoneNumber,
  parsePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import toast from "react-hot-toast";
import { OTPInput } from "input-otp";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { LuLoader2 } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { IoPhonePortraitOutline } from "react-icons/io5";

const LoginModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [email, setEmail] = useState("");
  const [regOTP, setRegOTP] = useState("");
  const [type, setType] = useState("mobile");
  const [otp, setOTP] = useState<string>("");
  const [isLogin, setIsLogin] = useState(true);
  const [register, setRegister] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [getOTP, { isLoading }] = useGetOTPMutation();
  const [openVerify, setOpenVerify] = useState(false);
  const [phone, setPhone] = useState<Value | undefined>();
  const { country } = useSelector((state: RootState) => state.global);
  const [verifyOTP, { isLoading: verifying }] = useVerifyOTPMutation();

  const clearForm = () => {
    setEmail("");
    setOTP("");
    setRegOTP("");
    setPhone(undefined);
    setRegister(false);
    setIsLogin(true);
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
    if (parsedPhoneNumber?.isValid()) {
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

    if (!phone && !email) {
      toast.error("Enter Phone Number or Email to Proceed!");
      return;
    }

    const formData = new URLSearchParams();

    if (phone) {
      const valid = handleBlur();
      if (!valid) {
        toast.error("Invalid Phone Number!");
        return;
      } else {
        formData.append("phone", phone);
      }
    }

    if (email) {
      formData.append("email", email);
    }

    const data = await getOTP({
      type: isLogin ? "login" : "register",
      formData,
    });

    if (!isLogin && data.data.data.otp) {
      setRegOTP(data.data.data.otp);
    }

    if (!data.error) {
      setOpen(false);
      setOpenVerify(true);
      toast.success("Please Enter your OTP Now.");
    } else {
      toast.error("Phone Number or Email Doesn't Exist!");
    }
  };

  const handleSubmission = async () => {
    const formData = new URLSearchParams();
    if (isLogin) {
      if (type === "mobile") {
        formData.append("phone", phone?.toString()!);
      } else {
        formData.append("email", email);
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
          setOpenVerify(false);
          clearForm();
        } else {
          toast.error("Please Enter Correct OTP!");
        }
      } else {
        if (parseInt(regOTP) === parseInt(otp)) {
          toast.success("Verified Successfully!");
          clearForm();
          setRegister(true);
          setOpenVerify(false);
        } else {
          toast.error("Please Enter Correct OTP!");
        }
      }
    } catch (err) {
      toast.error("Please Try Again!");
    }
  };

  return (
    <>
      <RegisterModal open={register} setOpen={setRegister} setLogin={setOpen} />
      <Modal
        cn="flex items-center justify-center"
        toggle={openVerify}
        setToggle={setOpenVerify}
        width="w-[75%] md:w-[55%] lg:w-[40%] xl:w-[30%] 3xl:w-[20%]"
      >
        <div className="relative w-full h-full bg-white px-16 py-8 rounded-xl flex flex-col items-center justify-center">
          <IoClose
            onClick={() => {
              setOpenVerify(false);
              clearForm();
            }}
            className="absolute top-2.5 right-2.5 w-5 h-5 text-black cursor-pointer"
          />
          <h1 className="text-center text-2xl font-bold mb-4">
            Verify {type === "mobile" ? "Mobile Number" : "E-Mail"}
          </h1>
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
                className="w-full text-center text-black text-xs font-medium"
              >
                Enter the Code that was sent to
              </label>
              <span className="w-full text-center text-black text-lg font-bold mt-0.5 mb-5">
                {type === "mobile" ? phone : email}
              </span>
              <OTPInput
                value={otp}
                maxLength={6}
                onChange={setOTP}
                containerClassName="group w-full mb-5"
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
            <div className="w-full flex items-center justify-center space-x-10">
              <Timer phone={phone} />
              <span
                onClick={() => {
                  setOpenVerify(false);
                  setOpen(true);
                  setOTP("");
                }}
                className="text-xs text-primary font-medium cursor-pointer"
              >
                Change {phone ? "Number" : "Email"}
              </span>
            </div>
            {type === "mobile" && (
              <div className="w-full flex items-center justify-center space-x-3 mt-4">
                <p className="rounded-full bg-green-500 border border-green-500 text-white text-xs px-5 py-1.5 font-semibold">
                  Whatsapp
                </p>
                <p className="rounded-full bg-[#F7F7F7] text-black text-xs px-10 py-1.5 font-semibold border border-[#DEDEDE]">
                  SMS
                </p>
              </div>
            )}
            <button
              type="submit"
              disabled={verifying}
              className="col-span-2 w-2/3 py-2 rounded-lg bg-primary text-white font-medium mt-4"
            >
              {verifying ? (
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
      </Modal>
      <Modal
        cn="flex items-center justify-center"
        toggle={open}
        setToggle={setOpen}
        width="w-[60%] md:w-[45%] lg:w-[35%] xl:w-[25%] 3xl:w-[15%]"
      >
        <div className="relative w-full h-full bg-white px-16 py-8 rounded-xl flex flex-col items-center justify-center">
          <IoClose
            onClick={() => {
              setOpen(false);
              clearForm();
            }}
            className="absolute top-2.5 right-2.5 w-5 h-5 text-black cursor-pointer"
          />
          <h1 className="w-full text-center text-2xl font-bold">
            {isLogin ? "Login" : "Register"}
          </h1>
          {isLogin && (
            <div className="w-full grid grid-cols-2 gap-5 mt-5">
              <div
                onClick={() => {
                  setType("mobile");
                  setEmail("");
                  setPhone(undefined);
                }}
                className={`col-span-1 w-full py-2.5 px-3 rounded-lg font-semibold text-sm cursor-pointer flex items-center justify-start space-x-3 ${
                  type === "mobile"
                    ? "bg-primary text-white"
                    : "bg-[#F5F6FA] text-black"
                }`}
              >
                <IoPhonePortraitOutline className="w-5 h-5" />
                <span>Mobile</span>
              </div>
              <div
                onClick={() => {
                  setType("email");
                  setEmail("");
                  setPhone(undefined);
                }}
                className={`col-span-1 w-full py-2.5 px-3 rounded-lg font-semibold text-sm cursor-pointer flex items-center justify-start space-x-3 ${
                  type === "email"
                    ? "bg-primary text-white"
                    : "bg-[#F5F6FA] text-black"
                }`}
              >
                <MdOutlineEmail className="w-5 h-5" />
                <span>Email</span>
              </div>
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              openVerification();
            }}
            className="w-full flex flex-col items-center justify-center space-y-4 mt-5"
          >
            {isLogin ? (
              type === "mobile" ? (
                <PhoneInput
                  className={`w-full py-2.5 px-3 rounded-lg !bg-[#F5F6FA] text-sm text-[#535763] ${
                    errors.includes("phone") &&
                    type === "mobile" &&
                    "border border-red-500"
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
                <input
                  type="email"
                  value={email}
                  placeholder="Enter E-Mail"
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full py-2.5 px-3 rounded-lg !bg-[#F5F6FA] text-sm text-[#535763] ${
                    errors.includes("email") &&
                    type === "email" &&
                    "border border-red-500"
                  }`}
                />
              )
            ) : (
              <PhoneInput
                className={`w-full py-2.5 px-3 rounded-lg !bg-[#F5F6FA] text-sm text-[#535763] ${
                  errors.includes("phone") &&
                  type === "mobile" &&
                  "border border-red-500"
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
            {isLogin ? (
              <p
                onClick={() => {
                  setIsLogin(false);
                  setErrors([]);
                }}
                className="w-full text-center font-medium text-xs !my-5"
              >
                Don&apos;t have an account yet?&nbsp;
                <span className="text-primary cursor-pointer">Sign Up</span>
              </p>
            ) : (
              <p
                onClick={() => setIsLogin(true)}
                className="w-full text-center font-medium text-xs !my-5"
              >
                Already have an account?&nbsp;
                <span className="text-primary cursor-pointer">Login</span>
              </p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="col-span-2 w-full py-2.5 rounded-lg bg-primary text-white !mt-0 text-sm font-medium"
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
        </div>
      </Modal>
    </>
  );
};

export default LoginModal;
