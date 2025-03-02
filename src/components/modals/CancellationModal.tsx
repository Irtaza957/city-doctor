import Modal from "../Modal";
import { IoClose } from "react-icons/io5";

const conditions = [
  {
    condition: "10 minutes after placing the request",
    cancellation: "Free of charge",
    reschedule: "Free of charge",
  },
  {
    condition: "12+ hours before the appointment",
    cancellation: "Free of charge",
    reschedule: "Free of charge",
  },
  {
    condition: "2-12 hours before the appointment",
    cancellation: "25% of appointment value",
    reschedule: "Free of charge",
  },
  {
    condition: "Less than 2 hours before the appointment",
    cancellation: "50% of appointment value",
    reschedule: "25% of appointment value",
  },
  {
    condition: "Missed the appointment",
    cancellation: "100% of appointment value",
    reschedule: "100% of appointment value",
  },
];

const CancellationModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => { 
  return (
    <Modal
      width="w-[85%] md:w-[65%] lg:w-[45%] xl:w-[35%] 3xl:w-[25%]"
      cn="flex items-center justify-center"
      toggle={open}
      setToggle={setOpen}
    >
      <div className="w-full h-full bg-white px-7 py-3.5 rounded-xl flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between mb-3 border-b pb-3">
          <h1 className="text-left text-lg font-semibold">
            Cancellation Policy
          </h1>
          <IoClose
            onClick={() => setOpen(false)}
            className="w-6 h-6 text-black cursor-pointer"
          />
        </div>
        <div className="w-full grid grid-cols-3 border divide-x text-white bg-primary">
          <p className="w-full text-left text-sm py-2 px-6 font-medium">
            Condition
          </p>
          <p className="w-full text-left text-sm py-2 px-6 font-medium">
            Cancellation Fee
          </p>
          <p className="w-full text-left text-sm py-2 px-6 font-medium">
            Reschedule Fee
          </p>
        </div>
        {conditions.map((condition, idx) => (
          <div
            key={idx}
            className="w-full grid grid-cols-3 border divide-x text-black bg-white"
          >
            <p className="w-full text-left text-xs px-6 py-3 font-medium">
              {condition.condition}
            </p>
            <p className="w-full text-left text-xs px-6 py-3 font-medium">
              {condition.cancellation}
            </p>
            <p className="w-full text-left text-xs px-6 py-3 font-medium">
              {condition.reschedule}
            </p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default CancellationModal;
