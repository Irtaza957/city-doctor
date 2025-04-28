import { cn } from "@/utils/helpers";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { FaMoneyBill, FaRegCreditCard } from "react-icons/fa6";
import { LuLoader } from "react-icons/lu";
import visa from "@/assets/icons/visaLogo.svg";
import tabbyCheckout from "@/assets/icons/tabbyCheckout.svg";
import mastercard from "@/assets/icons/mastercardLogo.svg";
import Image from "next/image";
import toast from "react-hot-toast";

const style = {
  base: {
    color: "#000",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#ffffff",
    // padding: "12px 14px",
    border: "1px solid #DEDEDE",
    borderRadius: "10px",
    "::placeholder": {
      color: "#999999",
    },
  },
  input: {
    padding: "12px 14px",
    border: "1px solid #DEDEDE",
    borderWidth: "1px 1px 1px",
    borderColor: "#DEDEDE",
    shadow: "none",
    borderRadius: "12px",
    backgroundColor: "#fff",
    margin: "0px 0px 15px 0px",
  },
  complete: {
    color: "#000",
    borderColor: "#38a169",
  },
  invalid: {
    color: "#e53e3e",
    borderColor: "#e53e3e",
  },
};
const apiKey = process.env.NEXT_PUBLIC_PAYMENT_API_KEY;
const outletRef = process.env.NEXT_PUBLIC_PAYMENT_OUTLET_REF;

const PaymentSidebar = ({
  isLoading,
  payMethod,
  isOrderLoading,
  handleSubmit,
  setPayMethod,
  calculateVAT,
  calculateDiscountValue,
  calculateWithoutVAT,
  setShowCard,
  showCard,
  setCardValidStatus,
  cardValidStatus,
  paymentMethods,
}: any) => {
  const [selectedSavedCard, setSelectedSavedCard] = useState<any>(null);
  const [cvv, setCvv] = useState("");

  const onSuccess = (response: any) => {
    console.log("Payment Success:", response);
  };

  const onFail = (error: any) => {
    console.log("Payment Failed:", error);
  };

  const onSubmit = () => {
    if (!cvv && selectedSavedCard !== null) {
      toast.error("CVV is required");
      return;
    }
    handleSubmit();
  };

  useEffect(() => {
    if (
      payMethod === "Card on Delivery" ||
      payMethod === "Card on Delivery" ||
      payMethod === "Tabby" ||
      showCard
    ) {
      setSelectedSavedCard(null);
      setCvv("");
    }
  }, [payMethod]);

  return (
    <>
      <Script
        src="https://paypage.sandbox.ngenius-payments.com/hosted-sessions/sdk.js"
        onLoad={async () => {
          console.log("SDK loaded");
          if (window.NI) {
            window.NI.mountCardInput("mount-id", {
              style: style,
              apiKey: apiKey,
              outletRef: outletRef,
              onSuccess: onSuccess,
              onFail: onFail,
              onChangeValidStatus: function (_ref: {
                isCVVValid: boolean;
                isExpiryValid: boolean;
                isNameValid: boolean;
                isPanValid: boolean;
              }) {
                const { isCVVValid, isExpiryValid, isNameValid, isPanValid } =
                  _ref;
                console.log(isCVVValid, isExpiryValid, isNameValid, isPanValid);
                setCardValidStatus({
                  isCVVValid,
                  isExpiryValid,
                  isNameValid,
                  isPanValid,
                });
              },
            });
          }
        }}
        onError={(error) => {
          console.error(error, "❌ Failed to load N-Genius SDK");
        }}
      />
      <div className="col-span-1 w-full h-fit flex flex-col items-start justify-start bg-white rounded-xl sm:p-5">
        <h1 className="w-full text-left md:text-xl flex font-semibold mb-2.5 items-center justify-start">
          Order Summary
        </h1>
        {showCard && (
          <p className="w-full text-left text-sm md:text-base flex font-semibold mt-2 mb-2.5 items-center justify-start">
            Card Information
          </p>
        )}
        <div
          id="mount-id"
          className={cn(
            "w-full space-y-2.5 h-[300px] overflow-hidden mt-1",
            showCard ? "block" : "hidden"
          )}
        ></div>
        {paymentMethods?.data?.length ? (
          <div
            className={cn("w-full mb-6", !showCard ? "mt-2.5" : "mt-[-20px]")}
          >
            <div className="flex items-center justify-between w-full">
              <h1 className="w-full text-sm lg:text-base text-left font-bold">
                Saved Cards
              </h1>
              {!showCard && (
                <button
                  className="text-xs whitespace-nowrap text-[#006FAC]"
                  onClick={() => setShowCard(!showCard)}
                >
                  + Add Card
                </button>
              )}
            </div>
            <div className="space-y-2 w-full mt-2">
              {paymentMethods?.data?.map((item: any, index: number) => (
                <div
                  key={item?.id}
                  className="flex items-center justify-between w-full bg-[#F7F7F7] rounded-xl py-3 px-4 cursor-pointer"
                  onClick={() => {
                    setPayMethod(item?.card_type);
                    setSelectedSavedCard(index);
                  }}
                >
                  <div className="flex items-center justify-center gap-5">
                    <Image
                      src={item?.card_type === "MASTERCARD" ? mastercard : visa}
                      alt="home"
                      className="object-cover rounded-[2px]"
                      width={36}
                      height={20}
                    />
                   
                      <p className="text-xs font-medium">{item?.masked_pan}</p>

                   
                  </div>
                   <div className="flex items-center gap-3">
                   {selectedSavedCard === index && (
                        <input
                          placeholder="CVV"
                          type="number"
                          className="max-w-[70px] py-2.5 px-3 rounded-lg !bg-white text-sm text-[#535763]"
                          value={cvv}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 3) {
                              setCvv(value);
                            }
                          }}
                        />
                      )}
                  <div
                    className={`rounded-full border  p-[3px] size-4 ${
                      payMethod === item?.card_type
                        ? "border-primary"
                        : "border-[#C7C7C7]"
                    }`}
                  >
                    <div
                      className={cn(
                        "rounded-full bg-primary w-full h-full",
                        payMethod === item?.card_type ? "flex" : "hidden"
                      )}
                    />
                  </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div className="w-full flex flex-col items-center justify-center gap-5">
          <h1 className="w-full text-sm lg:text-base text-left font-bold">
            More Payment Options
          </h1>
          <div className="w-full rounded-xl border flex flex-col items-center justify-center divide-y">
            <div
              onClick={() => setPayMethod("Tabby")}
              className="cursor-pointer w-full rounded-b-xl flex items-center justify-between p-3"
            >
              <div className="w-full flex items-center justify-start space-x-3">
                <Image
                  src={tabbyCheckout}
                  alt="Tabby Checkout"
                  className="w-[45px] h-5"
                />
                <span className="text-xs md:text-sm  font-medium">
                  Pay with Tabby
                </span>
              </div>
              <div
                className={`rounded-full border  p-[3px] size-4 ${
                  payMethod === "Tabby" ? "border-primary" : "border-[#C7C7C7]"
                }`}
              >
                <div
                  className={cn(
                    "rounded-full bg-primary w-full h-full",
                    payMethod === "Tabby" ? "flex" : "hidden"
                  )}
                />
              </div>
            </div>
            <div
              onClick={() => setPayMethod("Cash on Delivery")}
              className="cursor-pointer w-full rounded-b-xl flex items-center justify-between p-3"
            >
              <div className="w-full flex items-center justify-start space-x-3">
                <FaMoneyBill className="w-[45px] h-5 text-black" />
                <span className="text-xs md:text-sm  font-medium">
                  Cash on Delivery
                </span>
              </div>
              <div
                className={`rounded-full border  p-[3px] size-4 ${
                  payMethod === "Cash on Delivery"
                    ? "border-primary"
                    : "border-[#C7C7C7]"
                }`}
              >
                <div
                  className={cn(
                    "rounded-full bg-primary w-full h-full",
                    payMethod === "Cash on Delivery" ? "flex" : "hidden"
                  )}
                />
              </div>
            </div>
            <div
              onClick={() => setPayMethod("Card on Delivery")}
              className="cursor-pointer w-full rounded-b-xl flex items-center justify-between p-3"
            >
              <div className="w-full flex items-center justify-start space-x-3">
                <FaRegCreditCard className="w-[45px] h-5 text-black" />
                <span className="text-xs md:text-sm  font-medium">
                  Card on Delivery
                </span>
              </div>
              <div
                className={cn(
                  `rounded-full border p-[3px] size-4`,
                  payMethod === "Card on Delivery"
                    ? "border-primary"
                    : "border-[#C7C7C7]"
                )}
              >
                <div
                  className={cn(
                    "rounded-full bg-primary w-full h-full",
                    payMethod === "Card on Delivery" ? "flex" : "hidden"
                  )}
                />
              </div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col items-start justify-start gap-2.5 text-[#555555] pb-24 sm:pb-0">
            <div className="w-full flex items-center justify-between text-sm font-medium">
              <span>Sub Total</span>
              <span>
                AED&nbsp;
                {new Intl.NumberFormat().format(calculateWithoutVAT)}
              </span>
            </div>
            <div className="w-full flex items-center text-sm justify-between font-medium">
              <span>Discount</span>
              <span>AED {calculateDiscountValue}</span>
            </div>
            <div className="w-full flex items-center text-sm justify-between font-medium">
              <span>VAT</span>
              <span>AED {Math.round(Number(calculateVAT))}</span>
            </div>
            <div className="w-full flex items-center justify-between font-bold">
              <span>Grand Total</span>
              <span>
                AED&nbsp;
                {Math.round(
                  calculateVAT + (calculateWithoutVAT - calculateDiscountValue)
                )}
              </span>
            </div>

            <button
              type="button"
              disabled={
                isLoading ||
                isOrderLoading ||
                (showCard &&
                  cardValidStatus &&
                  Object.values(cardValidStatus).some((isValid) => !isValid))
              }
              onClick={onSubmit}
              className={cn(
                "w-full rounded-md py-2 !mt-6 text-sm items-center justify-center hidden sm:flex",
                showCard &&
                  cardValidStatus &&
                  Object.values(cardValidStatus).some((isValid) => !isValid)
                  ? "bg-gray-200 text-gray-400"
                  : "bg-primary text-white"
              )}
            >
              {isLoading || isOrderLoading ? (
                <div className="w-full flex items-center justify-center space-x-3">
                  <LuLoader className="w-5 h-5 animate-spin" />
                  <span>Please Wait...</span>
                </div>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSidebar;
