import "swiper/css";
import {
  generateDates,
  generateTimeSlots,
  convertToDateString,
} from "@/utils/helpers";
import Modal from "../Modal";
import "swiper/css/free-mode";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
// @ts-ignore
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ScheduleModalProps {
  open: boolean;
  date: DATE | null;
  slot: string | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDate: React.Dispatch<React.SetStateAction<DATE | null>>;
  setSlot: React.Dispatch<React.SetStateAction<string | null>>;
}

const ScheduleModal = ({
  date,
  open,
  slot,
  setOpen,
  setDate,
  setSlot,
}: ScheduleModalProps) => {
  const dates = generateDates(15);
  const [slots, setSlots] = useState<string[]>([]);

  useEffect(() => {
    if (date) {
      setSlots(generateTimeSlots(convertToDateString(date)));
    }
  }, [date]);

  return (
    <Modal
      toggle={open}
      setToggle={setOpen}
      cn="flex items-center justify-center"
      width="w-[75%] md:w-[55%] lg:w-[40%] xl:w-[30%] 3xl:w-[20%]"
    >
      <div className="w-full h-full bg-white px-7 py-3.5 rounded-xl flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between mb-3 border-b pb-3">
          <h1 className="text-left text-lg font-semibold">Update Schedule</h1>
          <IoClose
            onClick={() => setOpen(false)}
            className="w-6 h-6 text-black cursor-pointer"
          />
        </div>
        <div className="w-full">
          <p className="w-full text-left text-lg font-semibold mb-2.5">
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
                  <span className="text-xs w-full text-center">{d.month}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <p className="w-full text-left text-lg font-semibold my-2.5">
            Pick a Slot
          </p>
          <div className="w-full">
            {slots.length === 0 ? (
              "No Slots Available"
            ) : (
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
            )}
          </div>
          <div className="w-full flex items-center justify-end mt-5">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-5 py-2.5 bg-primary rounded-lg text-white text-xs font-semibold"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ScheduleModal;
