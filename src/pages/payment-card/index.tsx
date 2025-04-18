"use client";
import React from "react";
import Script from "next/script";

const Payment = () => {
  const handlePayment = async () => {
    try {
      const response = await window.NI.generateSessionId();
      console.log("✅ Session ID generated:", response.session.id);

      // You would now pass this session ID to your backend to initiate the payment
    } catch (err) {
      console.error("❌ Failed to generate session ID", err);
    }
  };

  // Style configuration for the payment form
  const style = {
    base: {
      color: "#000",
      fontSize: "14px",
      fontFamily: "Arial, sans-serif"
    }
  };

  // API Key and Outlet Reference
  const apiKey = "MDk1NGY2NzAtZDk2NC00NWU1LTlkNjEtY2NkNTU5ZGIwZmE4OjRkM2IxMjE5LTNlNDMtNGZiNi04OWFiLTBmYjQ1OTBiMGYzYg=="; // Replace with your actual API Key
  const outletRef = "b6bba424-6a30-4ece-bd6a-d8b68cd2d285"; // Replace with your actual outlet reference

  // Success callback function
  const onSuccess = (response: any) => {
    console.log("Payment Success:", response);
  };

  // Failure callback function
  const onFail = (error: any) => {
    console.log("Payment Failed:", error);
  };

  return (
    <div className="w-full flex flex-col mb-10 xl:mb-20 items-center justify-center">
      <div className="mt-48" id="mount-id">

      </div>
      <Script
        src="https://paypage.sandbox.ngenius-payments.com/hosted-sessions/sdk.js"
        onLoad={async () => {
          console.log("SDK loaded");
          if (window.NI) {
            window.NI.mountCardInput('mount-id', {
              style: style,
              apiKey: apiKey,
              outletRef: outletRef,
              onSuccess: onSuccess,
              onFail: onFail,
              onChangeValidStatus: function (_ref) {
                const { isCVVValid, isExpiryValid, isNameValid, isPanValid } = _ref;
                console.log(isCVVValid, isExpiryValid, isNameValid, isPanValid);
              }
            });
          }
        }}
        onError={(error) => {
          console.error(error, "❌ Failed to load N-Genius SDK");
        }}
      />

      <button onClick={handlePayment}>click</button>
    </div>
  );
};

export default Payment;