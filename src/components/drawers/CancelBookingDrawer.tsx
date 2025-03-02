"use client";

import { Drawer } from "vaul";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { LuLoader2 } from "react-icons/lu";
import { useParams } from "next/navigation";

import {
  useCancelBookingMutation,
  useFetchCancellationReasonsQuery,
} from "@/store/services/booking";
import { RootState } from "@/store";

const CancelBookingDrawer = ({ open, onClose }: DIALOG_PROPS) => {
  const { id } = useParams();
  const [other, setOther] = useState("");
  const [reason, setReason] = useState("");
  const { user } = useSelector((state: RootState) => state.global);
  const { data, isLoading } = useFetchCancellationReasonsQuery({});
  const [cancelBooking, { isLoading: cancelling }] = useCancelBookingMutation();

  const handleSubmit = async () => {
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
        onClose();
      } else {
        toast.error("Something Went Wrong! Please try Again.");
      }
    } catch (error) {
      toast.error("Something Went Wrong! Please try Again.");
    }
  };

  return (
    <Drawer.Root open={open} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay
          onClick={() => onClose()}
          className="fixed inset-0 bg-black/40 z-50"
        />
        <Drawer.Content className="bg-white flex flex-col rounded-t-xl fixed bottom-0 left-0 right-0 z-50 focus-visible:outline-none">
          <Drawer.Title className="font-medium flex items-center justify-center py-3 px-5 border-b">
            <p className="w-full text-left text-xl font-bold">Cancel Booking</p>
            <button onClick={() => onClose()}>
              <IoClose className="w-7 h-7" />
            </button>
          </Drawer.Title>
          <div className="w-full flex flex-col items-center justify-center gap-5 p-5">
            <p className="w-full text-left text-sm">
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
                  <div className="w-6 h-6 rounded-full border p-1">
                    <div
                      className={`w-full h-full rounded-full ${
                        r.reason === reason && "bg-primary"
                      }`}
                    />
                  </div>
                  <p className="flex-1 text-xs text-gray-500 font-medium">
                    {r.reason}
                  </p>
                </div>
              ))
            )}
            {reason.toLowerCase() === "other" && (
              <textarea
                rows={5}
                value={other}
                placeholder="Specify Reason"
                onChange={(e) => setOther(e.target.value)}
                className="w-full bg-gray-100 rounded-lg p-3 text-xs"
              />
            )}
            <button
              type="button"
              disabled={cancelling}
              onClick={handleSubmit}
              className="w-full py-2.5 bg-primary rounded-lg text-white font-medium"
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
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default CancelBookingDrawer;
