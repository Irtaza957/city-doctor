import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { TiCancel } from "react-icons/ti";
import { LuLoader } from "react-icons/lu";
import { useEffect, useState } from "react";

import Modal from "../Modal";
import { RootState } from "@/store";
import CarIcon from "@/assets/icons/track-booking/CarIcon";
import TeamIcon from "@/assets/icons/track-booking/TeamIcon";
import TickIcon from "@/assets/icons/track-booking/TickIcon";
import { useTrackBookingQuery } from "@/store/services/booking";
import LoadingIcon from "@/assets/icons/track-booking/LoadingIcon";
import CircleCheckIcon from "@/assets/icons/track-booking/CircleCheckIcon";

const TrackBookingModal = ({
  id,
  open,
  setOpen,
}: {
  id: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [active, setActive] = useState("1");
  const { user } = useSelector((state: RootState) => state.global);

  const { data, isLoading } = useTrackBookingQuery(
    {
      id,
      data: user?.token,
    },
    {
      skip: !id || id === "0",
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (data) {
      setActive(data);
    }
  }, [data]);

  return (
    <Modal
      cn="flex items-center justify-center"
      toggle={open}
      setToggle={setOpen}
      width="w-[50%] md:w-[40%] lg:w-[30%] xl:w-[22.5%] 3xl:w-[17.5%]"
    >
      {/* text-[#A3A3A3] */}
      <div className="w-full h-full bg-white p-3 rounded-xl flex flex-col items-center justify-center space-y-3">
        <div className="w-full flex items-center justify-between border-b pb-3">
          <h1 className="text-left text-lg font-semibold">
            Learn What is Next
          </h1>
          <IoClose
            onClick={() => setOpen(false)}
            className="w-6 h-6 text-black cursor-pointer"
          />
        </div>
        {isLoading ? (
          <div className="w-full flex items-center justify-center p-5">
            <LuLoader className="size-10 animate-spin text-secondary" />
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center pr-5 pl-10 pt-3 pb-5">
            <div className="w-full flex flex-col items-start justify-start relative pb-3 pl-8 pr-3 border-l-2 border-dashed">
              <div
                className={`${
                  active >= "1"
                    ? "size-[52px] bg-secondary -left-[26.5px]"
                    : "size-[44px] bg-[#F5F5F5] -left-[22px]"
                }  p-3 rounded-full absolute top-0`}
              >
                <LoadingIcon
                  fillColor={`${active >= "1" ? "#FFFFFF" : "#A3A3A3"}`}
                  className={`w-full h-full ${
                    active >= "1" ? "text-white" : "text-[#A3A3A3]"
                  }`}
                />
              </div>
              <p
                className={`w-full text-left text-[18px] font-semibold pb-0.5 mt-3.5 pl-3 ${
                  active >= "1" ? "text-secondary" : "text-black"
                }`}
              >
                Pending
              </p>
              {active >= "1" && (
                <p className="w-full text-left text-xs text-[#555555] pl-3">
                  Awaiting confirmation from the service provider.
                </p>
              )}
            </div>
            <div className="w-full flex flex-col items-start justify-start relative pb-10 pl-8 pr-3 border-l-2 border-dashed">
              <div
                className={`${
                  active >= "2"
                    ? "size-[52px] bg-secondary -left-[26.5px]"
                    : "size-[44px] bg-[#F5F5F5] -left-[22px]"
                }  p-3 rounded-full absolute top-0`}
              >
                <TickIcon
                  fillColor={`${active >= "2" ? "#FFFFFF" : "#A3A3A3"}`}
                  className={`w-full h-full ${
                    active >= "2" ? "text-white" : "text-[#A3A3A3]"
                  }`}
                />
              </div>
              <p
                className={`w-full text-left text-[18px] font-semibold pb-0.5 mt-3.5 pl-3 ${
                  active >= "2" ? "text-secondary" : "text-black"
                }`}
              >
                Confirmed
              </p>
              {active >= "2" && (
                <p className="w-full text-left text-xs text-[#555555] pl-3">
                  The booking has been confirmed and scheduled.
                </p>
              )}
            </div>
            <div className="w-full flex flex-col items-start justify-start relative pb-10 pl-8 pr-3 border-l-2 border-dashed">
              <div
                className={`${
                  active >= "3"
                    ? "size-[52px] bg-secondary -left-[26.5px]"
                    : "size-[44px] bg-[#F5F5F5] -left-[22px]"
                }  p-3 rounded-full absolute top-0`}
              >
                <TeamIcon
                  borderColor="transparent"
                  fillColor={`${active >= "3" ? "#FFFFFF" : "#A3A3A3"}`}
                  className={`w-full h-full ${
                    active >= "3" ? "text-white" : "text-[#A3A3A3]"
                  }`}
                />
              </div>
              <p
                className={`w-full text-left text-[18px] font-semibold pb-0.5 mt-3.5 pl-3 ${
                  active >= "3" ? "text-secondary" : "text-black"
                }`}
              >
                Team Assigned
              </p>
              {active >= "3" && (
                <p className="w-full text-left text-xs text-[#555555] pl-3">
                  A team of service providers have been assigned to the booking.
                </p>
              )}
            </div>
            <div className="w-full flex flex-col items-start justify-start relative pb-10 pl-8 pr-3 border-l-2 border-dashed">
              <div
                className={`${
                  active >= "5"
                    ? "size-[52px] bg-secondary -left-[26.5px]"
                    : "size-[44px] bg-[#F5F5F5] -left-[22px]"
                }  p-3 rounded-full absolute top-0`}
              >
                <CarIcon
                  borderColor="transparent"
                  fillColor={`${active >= "5" ? "#FFFFFF" : "#A3A3A3"}`}
                  className={`w-full h-full ${
                    active >= "5" ? "text-white" : "text-[#A3A3A3]"
                  }`}
                />
              </div>
              <p
                className={`w-full text-left text-[18px] font-semibold pb-0.5 mt-3.5 pl-3 ${
                  active >= "5" ? "text-secondary" : "text-black"
                }`}
              >
                On The Way
              </p>
              {active >= "5" && (
                <p className="w-full text-left text-xs text-[#555555] pl-3">
                  The team is en route to your location.
                </p>
              )}
            </div>
            <div className="w-full flex flex-col items-start justify-start relative pb-10 pl-8 pr-3 border-l-2 border-dashed">
              <div
                className={`${
                  active >= "7"
                    ? "size-[52px] bg-secondary -left-[26.5px]"
                    : "size-[44px] bg-[#F5F5F5] -left-[22px]"
                }  p-3 rounded-full absolute top-0`}
              >
                <LoadingIcon
                  fillColor="transparent"
                  borderColor={`${active >= "7" ? "#FFFFFF" : "#A3A3A3"}`}
                  className={`w-full h-full ${
                    active >= "7" ? "text-white" : "text-[#A3A3A3]"
                  }`}
                />
              </div>
              <p
                className={`w-full text-left text-[18px] font-semibold pb-0.5 mt-3.5 pl-3 ${
                  active >= "7" ? "text-secondary" : "text-black"
                }`}
              >
                In Progress
              </p>
              {active >= "7" && (
                <p className="w-full text-left text-xs text-[#555555] pl-3">
                  The service is currently being performed.
                </p>
              )}
            </div>
            <div className="w-full flex flex-col items-start justify-start relative pb-10 pl-8 pr-3">
              <div
                className={`${
                  active >= "8"
                    ? "size-[52px] bg-secondary -left-[26.5px]"
                    : "size-[44px] bg-[#F5F5F5] -left-[22px]"
                }  p-3 rounded-full absolute top-0`}
              >
                <CircleCheckIcon
                  fillColor={`${active >= "8" ? "#FFFFFF" : "#A3A3A3"}`}
                  className={`w-full h-full ${
                    active >= "8" ? "text-white" : "text-[#A3A3A3]"
                  }`}
                />
              </div>
              <p
                className={`w-full text-left text-[18px] font-semibold pb-0.5 mt-3.5 pl-3 ${
                  active >= "8" ? "text-secondary" : "text-black"
                }`}
              >
                Completed
              </p>
              {active >= "8" && (
                <p className="w-full text-left text-xs text-[#555555] pl-3">
                  The service has been successfully completed.
                </p>
              )}
            </div>
            <div className="w-full flex flex-col items-start justify-start relative pb-3 pl-8 pr-3">
              <div
                className={`${
                  active >= "9"
                    ? "size-[52px] bg-secondary -left-[26.5px]"
                    : "size-[44px] bg-[#F5F5F5] -left-[22px]"
                }  p-2 rounded-full absolute top-0`}
              >
                <TiCancel
                  className={`w-full h-full ${
                    active >= "9" ? "text-white" : "text-[#A3A3A3]"
                  }`}
                />
              </div>
              <p
                className={`w-full text-left text-[18px] font-semibold pb-0.5 mt-3.5 pl-3 ${
                  active >= "9" ? "text-secondary" : "text-black"
                }`}
              >
                Cancelled
              </p>
              {active >= "9" && (
                <p className="w-full text-left text-xs text-[#555555] pl-3">
                  The booking has been cancelled by the user or provider.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TrackBookingModal;
