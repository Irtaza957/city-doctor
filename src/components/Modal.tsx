import { Fragment } from "react/jsx-runtime";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";

const Modal = ({ cn, width, toggle, children, setToggle, shouldCloseOutsideClick =true }: MODAL_PROPS) => {
  return (
    <Transition appear show={toggle} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => shouldCloseOutsideClick ? setToggle(false) : {}}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </TransitionChild>
        <div className={`${width ? width : ""} fixed inset-0 overflow-y-auto custom-scrollbar mx-auto`}>
          <div
            className={`flex min-h-full items-center justify-center ${
              cn ? "p-0" : "p-4"
            } text-center`}
          >
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className={`${cn} w-[90%]`}>{children}</DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
