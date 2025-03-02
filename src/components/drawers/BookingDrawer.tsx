import { Drawer } from "vaul";
import { IoClose } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";

const BookingDrawer = ({ open, onClose }: DIALOG_PROPS) => {
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
          className="fixed inset-0 bg-black/40 z-40"
        />
        <Drawer.Content className="bg-white flex flex-col rounded-t-xl fixed bottom-0 left-0 right-0 z-40 focus-visible:outline-none">
          <Drawer.Title className="font-medium flex items-center justify-center p-3 border-b">
            <p className="w-full text-left text-lg font-bold">
              Learn What is Next
            </p>
            <button onClick={() => handleClose()}>
              <IoClose className="w-7 h-7" />
            </button>
          </Drawer.Title>
          <div className="w-full p-3 flex flex-col items-center justify-center space-y-3 divide-y">
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              <div className="relative flex items-center justify-center space-x-5 md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-secondary text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <FaCircleCheck />
                </div>

                <div className="w-full flex flex-col items-center justify-center">
                  <h1 className="w-full text-left text-xl text-secondary">
                    Confirmed
                  </h1>
                  <p className="w-full text-left text-xs">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
              </div>

              <div className="relative flex items-center justify-center space-x-5 md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-secondary text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <FaCircleCheck />
                </div>

                <div className="w-full flex flex-col items-center justify-center">
                  <h1 className="w-full text-left text-xl text-secondary">
                    Confirmed
                  </h1>
                  <p className="w-full text-left text-xs">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
              </div>

              <div className="relative flex items-center justify-center space-x-5 md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-secondary text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <FaCircleCheck />
                </div>

                <div className="w-full flex flex-col items-center justify-center">
                  <h1 className="w-full text-left text-xl text-secondary">
                    Confirmed
                  </h1>
                  <p className="w-full text-left text-xs">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
              </div>

              <div className="relative flex items-center justify-center space-x-5 md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-secondary text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <FaCircleCheck />
                </div>

                <div className="w-full flex flex-col items-center justify-center">
                  <h1 className="w-full text-left text-xl text-secondary">
                    Confirmed
                  </h1>
                  <p className="w-full text-left text-xs">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
              </div>

              <div className="relative flex items-center justify-center space-x-5 md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-secondary text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                  >
                    <path d="M12 10v2H7V8.496a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V12H0V4.496a.5.5 0 0 1 .206-.4l5.5-4a.5.5 0 0 1 .588 0l5.5 4a.5.5 0 0 1 .206.4V10Z" />
                  </svg>
                </div>

                <div className="w-full flex flex-col items-center justify-center">
                  <h1 className="w-full text-left text-xl text-secondary">
                    Confirmed
                  </h1>
                  <p className="w-full text-left text-xs">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default BookingDrawer;
