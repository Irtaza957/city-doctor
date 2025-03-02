"use client";

import { useState } from "react";
import { RiVisaLine } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa6";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";

const CreditCardInput = ({ value, setValue }: CREDIT_CARD_PROPS) => {
  const [error, setError] = useState("");
  const [cardType, setCardType] = useState("");

  const validateCardInput = (value: string) => {
    const sanitizedValue = value.replace(/\D/g, "");

    if (sanitizedValue === "") {
      setError("");
      setValue("");
      setCardType("");
      return;
    }

    const limitedValue = sanitizedValue.slice(0, 16);
    const formattedValue = limitedValue.replace(/\d{4}(?!$)/g, "$& ");

    const isValidLuhn = (input: string) => {
      let sum = 0;
      let doubleUp = false;

      for (let i = input.length - 1; i >= 0; i--) {
        let digit = parseInt(input.charAt(i), 10);
        if (doubleUp) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }
        sum += digit;
        doubleUp = !doubleUp;
      }
      return sum % 10 === 0;
    };

    const bin = limitedValue.slice(0, 6);
    const isVisa = /^4/.test(bin);
    const isMastercard = /^(5[1-5]|2[2-7])/.test(bin);

    if (!isVisa && !isMastercard) {
      setError("Only Visa or MasterCard Allowed.");
      setCardType("");
    } else if (!isValidLuhn(limitedValue)) {
      setError("Invalid Card Number.");
      setCardType("");
    } else {
      setError("");
      setCardType(isVisa ? "visa" : "mastercard");
    }

    setValue(formattedValue);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="w-full text-left text-gray-400 text-xs">Card Number</p>
      <div className="w-full flex items-center justify-center space-x-2 border-b">
        <input
          type="text"
          name="card"
          value={value}
          className="w-full py-2"
          autoComplete="cc-number"
          placeholder="●●●● ●●●● ●●●● ●●●●"
          onChange={(e) => validateCardInput(e.target.value)}
        />
        {cardType === "visa" ? (
          <RiVisaLine className="w-8 h-8 text-[#1A1F71]" />
        ) : cardType === "mastercard" ? (
          <div className="text-left mb-2">
            <svg width="0" height="0">
              <linearGradient id="gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop stopColor="#EB001B" offset="0%" />
                <stop stopColor="#FF5F00" offset="50%" />
                <stop stopColor="#F79E1B" offset="100%" />
              </linearGradient>
            </svg>
            <FaCcMastercard
              className="w-8 h-8"
              style={{ fill: "url(#gradient)" }}
            />
          </div>
        ) : (
          <BsFillCreditCard2FrontFill className="w-8 h-8 text-gray-400" />
        )}
      </div>
      {error !== "" && (
        <p className="w-full text-xs text-left text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
};

export default CreditCardInput;
