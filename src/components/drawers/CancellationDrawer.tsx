import { Drawer } from "vaul";
import { IoClose } from "react-icons/io5";

const CancellationDrawer = ({ open, onClose }: DIALOG_PROPS) => {
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

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
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
              Cancellation Policy
            </p>
            <button onClick={() => handleClose()}>
              <IoClose className="w-7 h-7" />
            </button>
          </Drawer.Title>
          <div className="w-full grid grid-cols-3 border divide-x text-white bg-primary">
            <p className="w-full text-left text-sm p-5 font-semibold">
              Condition
            </p>
            <p className="w-full text-left text-sm p-5 font-semibold">
              Cancellation Fee
            </p>
            <p className="w-full text-left text-sm p-5 font-semibold">
              Reschedule Fee
            </p>
          </div>
          {conditions.map((condition, idx) => (
            <div
              key={idx}
              className={`w-full grid grid-cols-3 border divide-x text-black ${
                idx % 2 !== 0 ? "bg-light-primary" : "bg-white"
              }`}
            >
              <p className="w-full text-left text-xs p-5">
                {condition.condition}
              </p>
              <p className="w-full text-left text-xs p-5">
                {condition.cancellation}
              </p>
              <p className="w-full text-left text-xs p-5">
                {condition.reschedule}
              </p>
            </div>
          ))}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default CancellationDrawer;
