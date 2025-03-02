"use client";

import Modal from "../Modal";
import {
  useCancelBookingMutation,
  useFetchCancellationReasonsQuery,
} from "@/store/services/booking";
import { RootState } from "@/store";

import { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { LuLoader2 } from "react-icons/lu";
import { useParams } from "next/navigation";

const CancelBookingModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { id } = useParams();
  const [other, setOther] = useState("");
  const [reason, setReason] = useState("");
  const { user } = useSelector((state: RootState) => state.global);
  const { data, isLoading } = useFetchCancellationReasonsQuery({});
  const [cancelBooking, { isLoading: cancelling }] = useCancelBookingMutation();

  const clearForm = () => {
    setOther("");
    setReason("");
  };

  const handleSubmit = async () => {
    if (!other || !reason) {
      toast.error("Please Select a Reason!");
      return;
    }

    const urlencoded = new URLSearchParams();
    if (other) {
      urlencoded.append("reason", other);
    } else {
      urlencoded.append("reason", reason);
    }
    urlencoded.append("booking_id", `${id}`);
    urlencoded.append("user_id", user?.customer_id!);

    try {
      const data = await cancelBooking(urlencoded);
      if (!data.error) {
        toast.success("Successfully Cancelled Booking!");
        setOpen(false);
        clearForm();
      } else {
        toast.error("Something Went Wrong! Please try Again.");
      }
    } catch (error) {
      toast.error("Something Went Wrong! Please try Again.");
    }
  };

  return (
    <Modal
      toggle={open}
      width="w-[55%] md:w-[40%] lg:w-[30%] xl:w-[25%] 3xl:w-[20%]"
      setToggle={setOpen}
      cn="flex items-center justify-center"
    >
      <div className="relative w-full h-full bg-white pt-3.5 pb-7 rounded-lg flex flex-col items-center justify-center">
        <IoClose
          onClick={() => {
            setOpen(false);
            clearForm();
          }}
          className="absolute top-2 right-2 size-5 text-black cursor-pointer"
        />
        <div className="w-full flex items-center justify-between mb-3 border-b pb-3 px-7">
          <h1 className="text-left text-lg font-bold">Cancel Booking</h1>
        </div>
        <div className="w-full flex flex-col items-center justify-center space-y-3 px-7">
          <p className="w-full text-left text-sm py-2">
            Please Select your Reason for Cancellation:
          </p>
          {isLoading ? (
            <div className="w-full flex items-center justify-center">
              <LuLoader2 className="w-10 h-10 animate-spin text-secondary" />
            </div>
          ) : (
            data?.map((r) => (
              <div
                key={r.id}
                onClick={() => setReason(r.reason)}
                className="w-full flex items-center justify-start space-x-3"
              >
                <div className="size-5 rounded-full border p-[3px]">
                  <div
                    className={`w-full h-full rounded-full ${
                      r.reason === reason && "bg-primary"
                    }`}
                  />
                </div>
                <p className="text-xs text-gray-500 font-medium">{r.reason}</p>
              </div>
            ))
          )}
          {reason.toLowerCase() === "other" && (
            <textarea
              rows={5}
              value={other}
              placeholder="Specify Reason"
              onChange={(e) => setOther(e.target.value)}
              className="w-full bg-gray-100 rounded-lg p-3 text-xs border border-[#DEDEDE]"
            />
          )}
          <button
            type="button"
            disabled={cancelling}
            onClick={handleSubmit}
            className="w-[50%] py-2 bg-primary rounded-lg text-sm font-semibold text-white !mt-9"
          >
            {cancelling ? (
              <div className="w-full flex items-center justify-center space-x-3">
                <LuLoader2 className="w-5 h-5 animate-spin" />
                <span>Please Wait...</span>
              </div>
            ) : (
              "Cancel Booking"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CancelBookingModal;
