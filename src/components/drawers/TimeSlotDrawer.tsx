"use client";

import { Drawer } from "vaul";
import { IoClose } from "react-icons/io5";
import { TbMoodEmpty } from "react-icons/tb";

interface TimeSlotDrawerProps {
  open: boolean;
  slots: string[];
  onClose: () => void;
  selectedSlot: string;
  setSelectedSlot: React.Dispatch<React.SetStateAction<string>>;
}

const TimeSlotDrawer = ({
  selectedSlot,
  setSelectedSlot,
  slots,
  open,
  onClose,
}: TimeSlotDrawerProps) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const nextSlot = () => {
    const currentIndex = slots.findIndex((slot) => slot === selectedSlot);
    return slots[currentIndex + 1];
  };

  return (
    <Drawer.Root open={open} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay
          onClick={() => handleClose()}
          className="fixed inset-0 bg-black/40 z-50"
        />
        <Drawer.Content className="bg-white flex flex-col rounded-t-xl fixed bottom-0 left-0 right-0 z-50 focus-visible:outline-none">
          <Drawer.Title className="font-medium flex items-center justify-center py-3 px-5 border-b">
            <p className="w-full text-left text-[20px] font-bold">
              Service Start Time
            </p>
            <button onClick={() => handleClose()}>
              <IoClose className="w-7 h-7" />
            </button>
          </Drawer.Title>
          <div className="relative w-full max-h-[75vh] overflow-auto custom-scrollbar flex flex-col items-start justify-start gap-5">
            <div className="w-full grid grid-cols-2 gap-2.5 px-5 pt-5">
              {slots.length === 0 ? (
                <div className="col-span-2 w-full flex flex-col items-center justify-center gap-5">
                  <TbMoodEmpty className="w-14 h-14 text-primary" />
                  <p className="w-full text-lg font-semibold text-center">
                    No More Slots for the Day. Please Check in Tommorow.
                  </p>
                </div>
              ) : (
                slots.map((slot, idx) => (
                  <p
                    key={idx}
                    onClick={() => setSelectedSlot(slot)}
                    className={`w-full px-4 py-2 rounded-lg text-center font-semibold cursor-pointer transition-all duration-150 ease-linear ${
                      selectedSlot === slot
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-black"
                    }`}
                  >
                    {slot}
                  </p>
                ))
              )}
            </div>
            <div className="w-full px-5">
              {slots.length !== 0 && (
                <ul className="w-full rounded-xl p-3 list-disc text-primary bg-light-primary list-inside">
                  <li className="w-full text-left text-sm">
                    Service will take approximately 90 minutes.
                  </li>
                  <li className="w-full text-left text-sm">{`Service starts between ${selectedSlot}`}</li>
                  <li className="w-full text-left text-sm">{`Service finishes between ${nextSlot()}`}</li>
                </ul>
              )}
            </div>
            <div className="w-full sticky bottom-0 z-10 bg-white p-2.5 border-t">
              <button
                type="button"
                onClick={() => handleClose()}
                className="w-full py-3 rounded-lg bg-primary text-white text-[18px] font-semibold"
              >
                Confirm
              </button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default TimeSlotDrawer;
