"use client";

import { Drawer } from "vaul";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import CreditCardInput from "../CreditCardInput";

const CardDrawer = ({ open, onClose }: DIALOG_PROPS) => {
  const [CVV, setCVV] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [expDate, setExpDate] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [defaultCard, setDefaultCard] = useState<boolean>(true);

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
            <p className="w-full text-left text-xl font-bold">Add Card</p>
            <button onClick={() => handleClose()}>
              <IoClose className="w-7 h-7" />
            </button>
          </Drawer.Title>
          <form className="w-full grid grid-cols-2 gap-3 p-3">
            <div className="col-span-2 w-full flex flex-col items-center justify-center">
              <label
                htmlFor="name"
                className="w-full text-left text-xs text-gray-400 font-medium"
              >
                Name on the Card
              </label>
              <input
                type="text"
                name="name"
                value={name}
                className="w-full py-2 border-b"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-span-2 w-full">
              <CreditCardInput value={cardNumber} setValue={setCardNumber} />
            </div>
            <div className="col-span-1 w-full flex flex-col items-center justify-center">
              <label
                htmlFor="exp"
                className="w-full text-left text-xs text-gray-400 font-medium"
              >
                Expiry Date
              </label>
              <input
                name="exp"
                type="text"
                value={expDate}
                placeholder="MM/YY"
                onChange={(e) => setExpDate(e.target.value)}
                className="w-full py-2 border-b placeholder:text-black"
              />
            </div>
            <div className="col-span-1 w-full flex flex-col items-center justify-center">
              <label
                htmlFor="cvv"
                className="w-full text-left text-xs text-gray-400 font-medium"
              >
                CVV
              </label>
              <input
                name="cvv"
                value={CVV}
                type="password"
                className="w-full py-2 border-b"
                onChange={(e) => setCVV(e.target.value)}
              />
            </div>
            <div
              onClick={() => setDefaultCard((prev) => (prev = !prev))}
              className="col-span-2 w-full flex items-center justify-center space-x-3"
            >
              <div className="rounded-full border border-primary p-1 w-6 h-6">
                <div
                  className={`rounded-full bg-primary w-full h-full ${
                    defaultCard ? "flex" : "hidden"
                  }`}
                />
              </div>
              <span className="w-full text-left">
                Set this Card as Default.
              </span>
            </div>
            <button className="col-span-2 w-full py-2 rounded-lg bg-primary text-white">
              Confirm
            </button>
          </form>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default CardDrawer;
