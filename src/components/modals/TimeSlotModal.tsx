import Modal from "../Modal";
import { IoClose } from "react-icons/io5";
import { TbMoodEmpty } from "react-icons/tb";

interface TimeSlotModalProps {
  open: boolean;
  slots: string[];
  selectedSlot: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedSlot: React.Dispatch<React.SetStateAction<string>>;
}

const TimeSlotModal = ({
  open,
  setOpen,
  slots,
  selectedSlot,
  setSelectedSlot,
}: TimeSlotModalProps) => {
  const nextSlot = () => {
    const currentIndex = slots.findIndex((slot) => slot === selectedSlot);
    return slots[currentIndex + 1];
  };

  return (
    <Modal
      cn="flex items-center justify-center"
      toggle={open}
      setToggle={setOpen}
      width="w-[75%] md:w-[50%] lg:w-[35%] 3xl:w-[20%]"
    >
      <div className="w-full h-full bg-white px-7 py-3.5 rounded-xl flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between mb-3 border-b pb-3">
          <h1 className="text-left text-lg font-semibold">
            Service Start Time
          </h1>
          <IoClose
            onClick={() => setOpen(false)}
            className="w-6 h-6 text-black cursor-pointer"
          />
        </div>
        <div className="w-full pt-3 flex flex-col items-center justify-center space-y-3 divide-y">
          <div className="w-full grid grid-cols-3 gap-3">
            {slots.length === 0 ? (
              <div className="col-span-3 w-full flex flex-col items-center justify-center space-y-3">
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
                  className={`w-full px-4 py-2 rounded-lg cursor-pointer transition-all duration-150 ease-linear font-medium text-sm ${
                    selectedSlot === slot
                      ? "bg-primary text-white"
                      : "bg-[#F7F7F7] text-black"
                  }`}
                >
                  {slot}
                </p>
              ))
            )}
          </div>
          {slots.length !== 0 && (
            <ul className="w-full rounded-xl p-3 list-disc text-primary bg-light-primary list-inside flex flex-col items-center justify-center space-y-0.5">
              <li className="w-full text-left text-xs font-medium">
                Service will take approximately 90 minutes.
              </li>
              <li className="w-full text-left text-xs font-medium">{`Service starts between ${selectedSlot}`}</li>
              {nextSlot() && (
                <li className="w-full text-left text-xs font-medium">{`Service finishes between ${nextSlot()}`}</li>
              )}
            </ul>
          )}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full py-2 rounded-lg bg-primary text-white font-medium !mt-6"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TimeSlotModal;
