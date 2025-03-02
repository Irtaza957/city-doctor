"use client";

import { useEffect, useState } from "react";
import { Value } from "react-phone-number-input";
import { useResendOTPMutation } from "@/store/services/auth";

const Timer = ({ phone }: { phone: Value | undefined }) => {
  const [resendOTP] = useResendOTPMutation();
  const [seconds, setSeconds] = useState(30);

  const handleSubmit = async () => {
    const data = new URLSearchParams();
    data.append("phone", phone?.toString()!);

    await resendOTP(data);
    setSeconds(30);
  };

  useEffect(() => {
    let interval: number | undefined;

    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000) as unknown as number;
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div className="flex items-center justify-start">
      {seconds !== 0 && (
        <>
          <span className="text-xs text-left">Resend Code in:&nbsp;</span>
          <span className="text-xs text-center text-[#FF2727]">
            {Math.max(seconds, 0)} sec
          </span>
        </>
      )}
      {seconds === 0 && (
        <p
          onClick={() => handleSubmit()}
          className="w-full text-black text-left text-xs cursor-pointer"
        >
          Didn&apos;t receive the code? <b className="text-primary">Resend</b>
        </p>
      )}
    </div>
  );
};

export default Timer;
