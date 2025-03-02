import "swiper/css";
import "swiper/css/free-mode";
import { convertToDateString, generateDates, generateTimeSlots } from "@/utils/helpers";

import { Drawer } from "vaul";
import { IoClose } from "react-icons/io5";
// @ts-ignore
import { FreeMode } from "swiper/modules";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

interface ScheduleDrawerProps {
  open: boolean;
  date: DATE | null;
  slot: string | null;
  onClose: () => void;
  setDate: React.Dispatch<React.SetStateAction<DATE | null>>;
  setSlot: React.Dispatch<React.SetStateAction<string | null>>;
}

const ScheduleDrawer = ({
  open,
  date,
  slot,
  onClose,
  setDate,
  setSlot,
}: ScheduleDrawerProps) => {
  const dates = generateDates(15);
  const [slots, setSlots] = useState<string[]>([]);

  useEffect(() => {
    if (date) {
      setSlots(generateTimeSlots(convertToDateString(date)));
    }
  }, [date]);

  return (
    <Drawer.Root open={open} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-50"
        />
        <Drawer.Content className="bg-white flex flex-col rounded-t-xl fixed bottom-0 left-0 right-0 z-50">
          <Drawer.Title className="font-medium flex items-center justify-center py-3 px-5 border-b">
            <p className="w-full text-left text-[20px] font-bold">
              Update Schedule
            </p>
            <button onClick={onClose}>
              <IoClose className="w-7 h-7" />
            </button>
          </Drawer.Title>
          <div className="w-full p-5">
            <p className="w-full text-left text-[16px] font-semibold mb-2.5">
              Pick a Date
            </p>
            <Swiper
              slidesPerView={5.5}
              spaceBetween={10}
              freeMode={true}
              modules={[FreeMode]}
            >
              {dates.map((d: DATE, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    onClick={() => setDate(d)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer ${
                      date?.id === d.id
                        ? "bg-primary text-white"
                        : "bg-[#F7F7F7] text-black"
                    }`}
                  >
                    <span className="text-xs w-full text-center">{d.day}</span>
                    <span className="w-full text-center text-xl font-medium">
                      {d.date}
                    </span>
                    <span className="text-xs w-full text-center">
                      {d.month}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <p className="w-full text-left text-[16px] font-semibold my-2.5">
              Pick a Slot
            </p>
            <div className="w-full">
              <Swiper
                slidesPerView={2.5}
                spaceBetween={10}
                freeMode={true}
                modules={[FreeMode]}
              >
                {slots.map((s, idx) => (
                  <SwiperSlide key={idx}>
                    <div
                      onClick={() => setSlot(s)}
                      className={`cursor-pointer w-full px-5 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center ${
                        slot === s
                          ? "bg-primary text-white"
                          : "bg-[#F7F7F7] text-black"
                      }`}
                    >
                      {s}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="w-full flex items-center justify-end mt-5">
              <button
                type="button"
                onClick={onClose}
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

export default ScheduleDrawer;
