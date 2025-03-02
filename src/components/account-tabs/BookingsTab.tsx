"use client";

import {
  useBookingDetailsQuery,
  useBookingHistoryQuery,
} from "@/store/services/booking";
import { RootState } from "@/store";
import { addToCart } from "@/store/global";
import ReviewModal from "../modals/ReviewModal";
import BookingDetails from "./BookingDetailsTab";
import TrackBookingModal from "../modals/TrackBookingModal";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

import dayjs from "dayjs";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { LuLoader2 } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

const BookingsTab = () => {
  const router = useRouter();
  const toggleRef = useRef(null);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(true);
  const [tab, setTab] = useState<string>("up");
  const [selected, setSelected] = useState("0");
  const [isRebook, setIsRebook] = useState(false);
  const [triggered, setTriggered] = useState("0");
  const [openTrack, setOpenTrack] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  useOnClickOutside(toggleRef, () => setToggle(false));
  const { user } = useSelector((state: RootState) => state.global);
  const { data, isLoading } = useBookingHistoryQuery(user?.token!);
  const { data: detailData } = useBookingDetailsQuery(selected, {
    skip: !selected || selected === "0",
    refetchOnMountOrArgChange: true,
  });
  const [fetchedBooking, setFetchedBooking] = useState<BOOKING_DETAILS | null>(
    null
  );

  const reBook = () => {
    if (fetchedBooking) {
      const services = fetchedBooking?.services
        .filter((service: DRIP_CARD) => service.name !== null)
        .map((service: DRIP_CARD) => {
          return {
            id: parseInt(service.service_id),
            name: service.name,
            price: service?.price
              ? parseFloat(service?.price)
              : parseFloat(service.price_with_vat),
            discount: parseFloat(
              service.discount_value ? service.discount_value : "0"
            ),
            quantity: parseInt(service?.quantity!),
          };
        });

      if (services?.length !== 0) {
        services?.map((service) => {
          dispatch(addToCart(service));
        });
        toast.success("Services Added to Cart!");
        setIsRebook(false);
        setSelected("");
        setTriggered("");
        setFetchedBooking(null);
        router.push("/cart");
      } else {
        toast.error("No Services Found!");
        setIsRebook(false);
        setSelected("");
        setTriggered("");
        setFetchedBooking(null);
      }
    }
  };

  const filteredData = data?.filter((booking) => {
    if (tab === "com")
      return (
        booking.booking_status === "Completed" &&
        booking.reference.toLowerCase().includes(search.toLowerCase())
      );
    if (tab === "can")
      return (
        booking.booking_status === "Cancelled" &&
        booking.reference.toLowerCase().includes(search.toLowerCase())
      );
    if (tab === "up")
      return (
        booking.booking_status !== "Completed" &&
        booking.booking_status !== "Cancelled" &&
        booking.reference.toLowerCase().includes(search.toLowerCase())
      );
  });

  useEffect(() => {
    if (detailData) {
      setFetchedBooking(detailData);
    }
  }, [detailData]);

  useEffect(() => {
    if (isRebook && fetchedBooking) {
      reBook();
    }
  }, [isRebook, fetchedBooking]);

  return (
    <>
      <ReviewModal id={selected} open={open} setOpen={setOpen} />
      <TrackBookingModal id={selected} open={openTrack} setOpen={setOpenTrack} />
      {showDetail ? (
        <BookingDetails data={fetchedBooking} setShowDetail={setShowDetail} />
      ) : (
        <div className="w-full max-h-full pr-5 overflow-auto custom-scrollbar flex flex-col items-start justify-start">
          <div className="w-full sticky top-0 bg-white z-20 flex flex-col items-center justify-center space-y-5 border-b pb-5">
            <h1 className="w-full text-xl text-left font-bold">My Bookings</h1>
            <div className="w-full grid grid-cols-6 lg:grid-cols-12 gap-3">
              <div
                onClick={() => setTab("up")}
                className={`col-span-2 p-2 lg:p-0 text-xs lg:text-base cursor-pointer w-full flex items-center justify-center font-medium text-center border-[2px] border-primary ${
                  tab === "up"
                    ? "bg-primary text-white"
                    : "bg-white text-primary"
                } rounded-full`}
              >
                Upcoming
              </div>
              <div
                onClick={() => setTab("com")}
                className={`col-span-2 p-2 lg:p-0 text-xs lg:text-base cursor-pointer w-full flex items-center justify-center font-medium text-center border-[2px] border-primary ${
                  tab === "com"
                    ? "bg-primary text-white"
                    : "bg-white text-primary"
                } rounded-full`}
              >
                Completed
              </div>
              <div
                onClick={() => setTab("can")}
                className={`col-span-2 p-2 lg:p-0 text-xs lg:text-base cursor-pointer w-full flex items-center justify-center font-medium text-center border-[2px] border-primary ${
                  tab === "can"
                    ? "bg-primary text-white"
                    : "bg-white text-primary"
                } rounded-full`}
              >
                Cancelled
              </div>
              <div className="lg:ml-6 col-span-6 flex items-center justify-center space-x-3 p-3 rounded-lg bg-[#F5F5F5]">
                <input
                  type="text"
                  value={search}
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-sm text-[#AFAFAF]"
                />
                <HiMagnifyingGlass className="w-5 h-5 text-[#AFAFAF]" />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-start justify-start">
            {isLoading ? (
              <div className="w-full h-full bg-white flex items-center justify-center">
                <LuLoader2 className="w-10 h-10 animate-spin text-secondary" />
              </div>
            ) : (
              filteredData?.map((booking) => (
                <div
                  key={booking.booking_id}
                  className="w-full h-16 grid grid-cols-6 lg:grid-cols-12 xl:gap-5 items-center justify-center py-3 border-b"
                >
                  <div className="col-span-2 lg:col-span-3 w-full flex items-center justify-start gap-2">
                    <Image
                      src="https://ui.shadcn.com/avatars/04.png"
                      alt="product-cart"
                      width={48}
                      height={48}
                      className="bg-gray-100 rounded-full size-10"
                    />
                    <div className="w-full flex flex-col items-center justify-center">
                      <p className="w-full text-left font-semibold">
                        REF:&nbsp;{booking.reference}
                      </p>
                      <p className="w-full text-left text-xs text-[#555555] font-medium">
                        Total Services:&nbsp;{booking.total_services}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-1 lg:col-span-2 w-full flex flex-col items-center justify-center">
                    <p className="w-full text-left text-xs font-medium text-[#555555]">
                      {dayjs(booking.schedule_date).format("MMM DD, YYYY")}
                    </p>
                    <p className="w-full text-left text-xs font-semibold text-black">
                      {booking.schedule_slot}
                    </p>
                  </div>
                  <div className="col-span-1 lg:col-span-2 w-full flex flex-col items-center justify-center">
                    <p className="w-full text-right text-xs font-medium">
                      Total Price
                    </p>
                    <p className="w-full text-right text-xs font-semibold text-black">
                      AED&nbsp;{booking.total}
                    </p>
                  </div>
                  <div className="col-span-1 lg:col-span-2 lg:pr-5 xl:pr-0 w-full flex flex-col items-center justify-center">
                    <p className="w-full text-right text-[#555555] font-medium text-xs">
                      Status
                    </p>
                    <p
                      className={`w-full text-right text-xs font-semibold ${
                        booking.booking_status === "Pending"
                          ? "text-accent"
                          : booking.booking_status === "Completed"
                          ? "text-secondary"
                          : "text-[#FF2727]"
                      }`}
                    >
                      {booking.booking_status}
                    </p>
                  </div>
                  <div className="relative col-span-1 w-full flex lg:hidden items-center justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setToggle(true);
                        setTriggered(booking.booking_id);
                      }}
                    >
                      <BsThreeDots />
                    </button>
                    {toggle &&
                      triggered === booking.booking_id &&
                      (tab === "up" ? (
                        <div
                          ref={toggleRef}
                          className="absolute z-10 top-7 right-7 border bg-white shadow-md rounded-lg flex flex-col items-start justify-start divide-y"
                        >
                          <p
                            onClick={() => {
                              setSelected(booking.booking_id);
                              setTimeout(() => {
                                setOpenTrack(true);
                              }, 100);
                            }}
                            className="w-32 px-2 py-1.5 text-xs cursor-pointer"
                          >
                            Track Order
                          </p>
                          <p
                            onClick={() => {
                              setSelected(booking.booking_id);
                              setShowDetail(true);
                            }}
                            className="w-32 px-2 py-1.5 text-xs cursor-pointer"
                          >
                            Manage Booking
                          </p>
                        </div>
                      ) : tab === "com" ? (
                        <div
                          ref={toggleRef}
                          className="absolute z-10 top-7 right-7 border bg-white shadow-md rounded-lg flex flex-col items-start justify-start divide-y"
                        >
                          <p
                            onClick={() => {
                              setSelected(booking.booking_id);
                              setOpen(true);
                            }}
                            className="w-32 px-2 py-1.5 text-xs"
                          >
                            Add Review
                          </p>
                          <p
                            onClick={() => {
                              setSelected(booking.booking_id);
                              setIsRebook(true);
                            }}
                            className="w-32 px-2 py-1.5 text-xs"
                          >
                            {selected === booking.booking_id && isRebook ? (
                              <div className="w-full flex items-center justify-between gap-2">
                                <LuLoader2 className="size-4 animate-spin" />
                                <span className="w-full text-left text-xs">
                                  Booking...
                                </span>
                              </div>
                            ) : (
                              "Re-Book"
                            )}
                          </p>
                        </div>
                      ) : (
                        <div
                          ref={toggleRef}
                          className="absolute z-10 top-7 right-7 border bg-white shadow-md rounded-lg flex flex-col items-start justify-start divide-y"
                        >
                          <p
                            onClick={() => {
                              setSelected(booking.booking_id);
                              setIsRebook(true);
                            }}
                            className="w-32 px-2 py-1.5 text-xs"
                          >
                            {selected === booking.booking_id && isRebook ? (
                              <div className="w-full flex items-center justify-between gap-2">
                                <LuLoader2 className="size-4 animate-spin" />
                                <span className="w-full text-left text-xs">
                                  Booking...
                                </span>
                              </div>
                            ) : (
                              "Re-Book"
                            )}
                          </p>
                        </div>
                      ))}
                  </div>
                  <div className="relative col-span-3 w-full hidden lg:flex flex-col items-end justify-center">
                    {tab === "up" && (
                      <div className="w-full grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setSelected(booking.booking_id);
                            setTimeout(() => {
                              setOpenTrack(true);
                            }, 100);
                          }}
                          className="w-full p-2.5 bg-transparent text-secondary border border-secondary rounded-lg text-sm font-semibold"
                        >
                          Track Order
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSelected(booking.booking_id);
                            setShowDetail(true);
                          }}
                          className="w-full p-2.5 bg-primary text-white rounded-lg text-sm font-semibold"
                        >
                          Manage
                        </button>
                      </div>
                    )}
                    {tab === "com" && (
                      <div className="w-full grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setSelected(booking.booking_id);
                            setOpen(true);
                          }}
                          className="w-full p-2.5 bg-transparent text-accent border border-accent rounded-lg text-sm font-semibold"
                        >
                          Add Review
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsRebook(true);
                            setSelected(booking.booking_id);
                          }}
                          disabled={selected === booking.booking_id && isRebook}
                          className="w-full p-2.5 bg-primary text-white rounded-lg text-sm font-semibold"
                        >
                          {selected === booking.booking_id && isRebook ? (
                            <div className="w-full flex items-center justify-between gap-3">
                              <LuLoader2 className="size-5 animate-spin" />
                              <span className="w-full text-left text-xs">
                                Booking...
                              </span>
                            </div>
                          ) : (
                            "Re-Book"
                          )}
                        </button>
                      </div>
                    )}
                    {tab === "can" && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsRebook(true);
                          setSelected(booking.booking_id);
                        }}
                        disabled={selected === booking.booking_id && isRebook}
                        className="w-2/3 p-2.5 bg-primary text-white rounded-lg text-sm font-semibold"
                      >
                        {selected === booking.booking_id && isRebook ? (
                          <div className="w-full flex items-center justify-center gap-3">
                            <LuLoader2 className="size-5 animate-spin" />
                            <span className="text-center text-xs">
                              Booking...
                            </span>
                          </div>
                        ) : (
                          "Re-Book"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BookingsTab;
