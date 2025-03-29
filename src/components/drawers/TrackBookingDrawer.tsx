"use client";

import { Drawer } from "vaul";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { TiCancel } from "react-icons/ti";
import { LuLoader2 } from "react-icons/lu";
import { useEffect, useState } from "react";

import { RootState } from "@/store";
import CarIcon from "@/assets/icons/track-booking/CarIcon";
import TeamIcon from "@/assets/icons/track-booking/TeamIcon";
import TickIcon from "@/assets/icons/track-booking/TickIcon";
import { useTrackBookingQuery } from "@/store/services/booking";
import LoadingIcon from "@/assets/icons/track-booking/LoadingIcon";
import CircleCheckIcon from "@/assets/icons/track-booking/CircleCheckIcon";
import { cn } from "@/utils/helpers";

const TrackBookingDrawer = ({ id, open, onClose }: DIALOG_PROPS) => {
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
    <Drawer.Root open={open} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay
          onClick={() => onClose()}
          className="fixed inset-0 bg-black/40 z-50"
        />
        {/* text-[#A3A3A3] */}
        <Drawer.Content className="bg-white flex flex-col rounded-t-xl fixed bottom-0 left-0 right-0 z-50 focus-visible:outline-none">
          <Drawer.Title className="font-medium flex items-center justify-center p-3 border-b">
            <p className="w-full text-left text-xl font-bold">
              Learn What is Next
            </p>
            <button onClick={() => onClose()}>
              <IoClose className="w-7 h-7" />
            </button>
          </Drawer.Title>
          {isLoading ? (
            <div className="w-full flex items-center justify-center p-5">
              <LuLoader2 className="size-10 animate-spin text-secondary" />
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center pr-5 pl-10 pt-3 pb-5">
              <div className={cn(
                "w-full flex flex-col items-start justify-start relative pl-8 pr-3 border-l-2 border-dashed",
                active >= "1" ? 'pb-7' : 'pb-3'
                )}>
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
                  className={`w-full text-left text-[18px] font-semibold pb-.50.5 mt-2 sm:mt-3.5 pl-3 ${
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
                  className={`w-full text-left text-[18px] font-semibold pb-0.5 mt-2.5 sm:mt-3.5 pl-3 ${
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
                  className={`w-full text-left text-[18px] font-semibold pb-0.5 mt-2.5 sm:mt-3.5 pl-3 ${
                    active >= "3" ? "text-secondary" : "text-black"
                  }`}
                >
                  Team Assigned
                </p>
                {active >= "3" && (
                  <p className="w-full text-left text-xs text-[#555555] pl-3">
                    A team of service providers have been assigned to the
                    booking.
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
                  className={`w-full text-left text-[18px] font-semibold pb-0.5 mt-2.5 sm:mt-3.5 pl-3 ${
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
                  className={`w-full text-left text-[18px] font-semibold pb-0.5 mt-2.5 sm:mt-3.5 pl-3 ${
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
                  className={`w-full text-left text-[18px] font-semibold pb-0.5 mt-2.5 sm:mt-3.5 pl-3 ${
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
                  className={`w-full text-left text-[18px] font-semibold pb-0.5 mt-2.5 sm:mt-3.5 pl-3 ${
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
          {/* <div className="w-full flex flex-col items-center justify-center pr-5 pl-10 py-5">
            <div className="w-full flex flex-col items-start justify-start relative pb-3 pl-8 pr-3 border-l-2 border-dashed">
              <div className="size-[43px] p-3 rounded-full bg-secondary absolute top-0 -left-[22px]">
                <TickIcon fillColor="#FFFFFF" className="w-full h-full" />
              </div>
              <p className="w-full text-left text-secondary text-[16px] font-semibold pb-0.5 mt-2.5 pl-3">
                Confirmed
              </p>
              <p className="w-full text-left text-[10px] font-semibold text-[#555555] pl-3">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Dolorem, possimus.
              </p>
            </div>
            <div className="w-full flex flex-col items-start justify-start relative pb-10 pl-8 pr-3 border-l-2 border-dashed">
              <div className="size-[36px] p-2.5 bg-[#F5F5F5] rounded-full absolute -top-2 -left-[18px]">
                <TeamIcon
                  fillColor="#A3A3A3"
                  borderColor="transparent"
                  className="w-full h-full"
                />
              </div>
              <p className="w-full text-left text-[16px] font-semibold text-black pb-0.5 pl-3">
                Team Assigned
              </p>
            </div>
            <div className="w-full flex flex-col items-start justify-start relative pb-10 pl-8 pr-3 border-l-2 border-dashed">
              <div className="size-[36px] p-2.5 bg-[#F5F5F5] rounded-full absolute -top-2 -left-[18px]">
                <CarIcon
                  fillColor="#A3A3A3"
                  borderColor="transparent"
                  className="w-full h-full"
                />
              </div>
              <p className="w-full text-left text-[16px] font-semibold text-black pb-0.5 pl-3">
                On The Way
              </p>
            </div>
            <div className="w-full flex flex-col items-start justify-start relative pb-10 pl-8 pr-3 border-l-2 border-dashed">
              <div className="size-[36px] p-2.5 bg-[#F5F5F5] rounded-full absolute -top-2 -left-[18px]">
                <LoadingIcon
                  borderColor="#A3A3A3"
                  fillColor="transparent"
                  className="w-full h-full"
                />
              </div>
              <p className="w-full text-left text-[16px] font-semibold text-black pb-0.5 pl-3">
                In Progress
              </p>
            </div>
            <div className="w-full flex flex-col items-start justify-start relative pb-3 pl-8 pr-3">
              <div className="size-[36px] p-2.5 bg-[#F5F5F5] rounded-full absolute -top-2 -left-[18px]">
                <CircleCheckIcon
                  fillColor="#A3A3A3"
                  className="w-full h-full"
                />
              </div>
              <p className="w-full text-left text-[16px] font-semibold text-black pb-0.5 pl-3">
                Completed
              </p>
            </div>
          </div> */}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default TrackBookingDrawer;
