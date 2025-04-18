"use client";

import dayjs from "dayjs";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { LuLoader } from "react-icons/lu";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import {
  useBookingHistoryQuery,
  useBookingDetailsQuery,
} from "@/store/services/booking";
import { RootState } from "@/store";
import { addToCart, setAccountTab } from "@/store/global";
import ReviewDrawer from "@/components/drawers/ReviewDrawer";
import TrackBookingDrawer from "@/components/drawers/TrackBookingDrawer";
import BookingCardSkeleton from "@/components/cards/skeleton/BookingCardSkeleton";
import GoogleAnalytics from "../../components/GoogleAnalytics";
import Footer from "@/components/Footer";

const Upcoming = ({ booking }: { booking: BOOKING }) => {
  const [selected, setSelected] = useState("0");
  const [openTrack, setOpenTrack] = useState(false);

  return (
    <>
      <TrackBookingDrawer
        id={selected}
        open={openTrack}
        onClose={() => setOpenTrack(false)}
      />
      <div className="w-full flex flex-col items-center justify-center border-2 rounded-2xl p-3.5">
        <Link
          href={`/bookings/${booking.booking_id}`}
          className="w-full text-left text-xs font-semibold text-black pb-3.5 border-b"
        >
          {dayjs(booking.schedule_date).format("MMM DD, YYYY")}&nbsp;|&nbsp;
          {booking.schedule_slot}
        </Link>
        <Link
          href={`/bookings/${booking.booking_id}`}
          className="w-full grid grid-cols-4 gap-3.5 items-center justify-center py-3.5 border-b"
        >
          {/* <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOdpNrnYYLZDH-r1-maYvATvVuImvEaqE00w&s"
            alt="drip"
            width={70}
            height={70}
            className="col-span-1 w-[70px] h-[70px] bg-gray-200 border rounded-full"
          /> */}
          <div className="col-span-4 w-full flex flex-col items-center justify-center space-y-1">
            <div className="w-full flex items-center justify-between">
              <p className="text-left text-[16px] font-semibold">
                REF:&nbsp;{booking.reference}
              </p>
              <p
                className={`text-right text-xs font-semibold ${
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
            <p className="w-full text-left text-xs text-[#555555] font-medium">
              Total Services:&nbsp;{booking.total_services}
            </p>
            <p className="w-full text-left text-xs text-[#555555] font-medium">
              AED&nbsp;{booking.total}
            </p>
          </div>
        </Link>
        <div className="w-full pt-3.5 grid grid-cols-2 gap-3.5 items-center justify-center">
          <button
            type="button"
            onClick={() => {
              setSelected(booking.booking_id);
              setTimeout(() => {
                setOpenTrack(true);
              }, 100);
            }}
            className="w-full text-xs rounded-lg py-2.5 border border-secondary bg-white text-secondary font-semibold"
          >
            Track Order
          </button>
          <Link
            href={`/bookings/${booking.booking_id}`}
            className="w-full text-xs rounded-lg py-2.5 bg-primary border border-primary text-white font-semibold text-center"
          >
            Manage Booking
          </Link>
        </div>
      </div>
    </>
  );
};

const Completed = ({ booking }: { booking: BOOKING }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [isRebook, setIsRebook] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const { data, isLoading } = useBookingDetailsQuery(selected, {
    skip: !selected,
    refetchOnMountOrArgChange: true,
  });

  const reBook = () => {
    if (data) {
      const services = data?.services
        .filter((service: DRIP_CARD) => service.name !== null)
        .map((service: DRIP_CARD) => {
          return {
            id: parseInt(service.service_id),
            name: service.name,
            price: parseFloat(
              service?.price ? service?.price : service.price_with_vat
            ),
            discount: parseFloat(service?.discount_value!),
            quantity: parseInt(service?.quantity!),
          };
        });

      if (services?.length !== 0) {
        services?.map((service) => {
          dispatch(addToCart(service));
        });
        toast.success("Services Added to Cart!");
        router.push("/cart");
      } else {
        toast.error("No Services Found!");
      }
    }
  };

  useEffect(() => {
    if (data) {
      if (isRebook) {
        reBook();
      }
    }
  }, [data]);

  return (
    <>
      <ReviewDrawer
        open={openReview}
        id={booking.booking_id}
        onClose={() => setOpenReview(false)}
      />
      <div className="w-full flex flex-col items-center justify-center border-2 rounded-2xl p-3.5">
        <Link
          href={`/bookings/${booking.booking_id}`}
          className="w-full text-left text-xs font-semibold pb-3.5 border-b"
        >
          {dayjs(booking.schedule_date).format("MMM DD, YYYY")}&nbsp;|&nbsp;
          {booking.schedule_slot}
        </Link>
        <Link
          href={`/bookings/${booking.booking_id}`}
          className="w-full grid grid-cols-4 gap-3.5 items-center justify-center py-3.5 border-b"
        >
          {/* <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOdpNrnYYLZDH-r1-maYvATvVuImvEaqE00w&s"
            alt="drip"
            width={70}
            height={70}
            className="col-span-1 w-[70px] h-[70px] bg-gray-200 border rounded-full"
          /> */}
          <div className="col-span-4 w-full flex flex-col items-center justify-center space-y-1">
            <p className="w-full text-left text-[16px] font-semibold">
              REF:&nbsp;{booking.reference}
            </p>
            <p className="w-full text-left text-xs text-[#555555] font-medium">
              Total Services:&nbsp;{booking.total_services}
            </p>
            <p className="w-full text-left text-xs text-[#555555] font-medium">
              AED&nbsp;{booking.total}
            </p>
          </div>
        </Link>
        <div className="w-full pt-3.5 grid grid-cols-2 gap-3.5 items-center justify-center">
          <button
            onClick={() => setOpenReview(true)}
            className={`${
              parseInt(booking.review) > 0 ? "flex" : "hidden"
            } w-full text-xs font-semibold items-center justify-center rounded-lg py-2.5 border border-accent bg-white text-accent`}
          >
            Add Review
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={() => {
              setSelected(booking.booking_id);
              setIsRebook(true);
            }}
            className={`${
              parseInt(booking.review) > 0 ? "col-span-1" : "col-span-2"
            } w-full text-xs font-semibold rounded-lg py-2.5 bg-primary border border-primary text-white`}
          >
            {isLoading ? (
              <div className="w-full flex items-center justify-center space-x-3">
                <LuLoader className="size-4 animate-spin" />
                <span>Please Wait...</span>
              </div>
            ) : (
              "Re-Book"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

const Cancelled = ({ booking }: { booking: BOOKING }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [isRebook, setIsRebook] = useState(false);
  const { data, isLoading } = useBookingDetailsQuery(selected, {
    skip: !selected,
    refetchOnMountOrArgChange: true,
  });

  const reBook = () => {
    if (data) {
      const services = data?.services
        .filter((service: DRIP_CARD) => service.name !== null)
        .map((service: DRIP_CARD) => {
          return {
            id: parseInt(service.service_id),
            name: service.name,
            price: parseFloat(
              service?.price ? service?.price : service.price_with_vat
            ),
            discount: parseFloat(service?.discount_value!),
            quantity: parseInt(service?.quantity!),
            thumbnail: service.thumbnail,
          };
        });

      if (services?.length !== 0) {
        services?.map((service) => {
          dispatch(addToCart(service));
        });
        toast.success("Services Added to Cart!");
        router.push("/cart");
      } else {
        toast.error("No Services Found!");
      }
    }
  };

  useEffect(() => {
    if (data) {
      if (isRebook) {
        reBook();
      }
    }
  }, [data]);

  return (
    <div className="w-full flex flex-col items-center justify-center border-2 rounded-2xl p-3.5">
      <Link href={`/bookings/${booking.booking_id}`} className="w-full text-left text-xs font-semibold pb-3.5 border-b">
        {dayjs(booking.schedule_date).format("MMM DD, YYYY")}&nbsp;|&nbsp;
        {booking.schedule_slot}
      </Link>
      <Link href={`/bookings/${booking.booking_id}`} className="w-full grid grid-cols-4 gap-3.5 items-center justify-center py-3.5 border-b">
        {/* <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOdpNrnYYLZDH-r1-maYvATvVuImvEaqE00w&s"
          alt="drip"
          width={70}
          height={70}
          className="col-span-1 w-[70px] h-[70px] bg-gray-200 border rounded-full"
        /> */}
        <div className="col-span-4 w-full flex flex-col items-center justify-center space-y-1">
          <p className="w-full text-left text-[16px] font-semibold">
            REF:&nbsp;{booking.reference}
          </p>
          <p className="w-full text-left text-xs text-[#555555] font-medium">
            Total Services:&nbsp;{booking.total_services}
          </p>
          <p className="w-full text-left text-xs text-[#555555] font-medium">
            AED&nbsp;{booking.total}
          </p>
        </div>
      </Link>
      <div className="w-full pt-3.5 flex flex-col items-center justify-center space-y-3.5">
        <div className="w-full flex flex-col items-center justify-center space-y-0.5">
          <p className="w-full text-left text-xs font-medium">
            Cancelled Reason
          </p>
          <p className="w-full text-left text-[10px] text-[#555555]">
            {booking.cancelled_reason ? booking.cancelled_reason : "N/A"}
          </p>
        </div>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            setSelected(booking.booking_id);
            setIsRebook(true);
          }}
          className={`${
            parseInt(booking.review) > 0 ? "col-span-1" : "col-span-2"
          } w-full text-xs rounded-lg py-2.5 bg-primary border border-primary text-white font-semibold`}
        >
          {isLoading ? (
            <div className="w-full flex items-center justify-center space-x-3">
              <LuLoader className="size-4 animate-spin" />
              <span>Please Wait...</span>
            </div>
          ) : (
            "Re-Book"
          )}
        </button>
      </div>
    </div>
  );
};

const Bookings = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("up");
  const { user } = useSelector((state: RootState) => state.global);
  const { data, isLoading } = useBookingHistoryQuery(user?.token!);

  const handleTab = (tab: string) => {
    dispatch(setAccountTab(tab));
  };

  return (
    <>
    <GoogleAnalytics />
      <div className="w-full fixed top-[69px] z-40 left-0 py-3 px-5 flex md:hidden flex-col items-center justify-center border-y space-y-3 bg-white">
        <div className="w-full flex items-center justify-start gap-5 sm:gap-0">
          <Link
            href="/account-settings"
            onClick={() => handleTab("")}
            className="flex sm:hidden"
          >
            <IoArrowBack className="w-6 h-6" />
          </Link>
          <h1 className="text-left text-xl font-bold">My Bookings</h1>
        </div>
        <div className="w-full grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setTab("up")}
            className={`col-span-1 w-full text-[14px] font-semibold py-3 rounded-lg cursor-pointer ${
              tab === "up"
                ? "bg-primary text-white"
                : "bg-[#F7F7F7] text-[#707070]"
            }`}
          >
            Upcoming
          </button>
          <button
            type="button"
            onClick={() => setTab("com")}
            className={`col-span-1 w-full text-[14px] font-semibold py-3 rounded-lg cursor-pointer ${
              tab === "com"
                ? "bg-primary text-white"
                : "bg-[#F7F7F7] text-[#707070]"
            }`}
          >
            Completed
          </button>
          <button
            type="button"
            onClick={() => setTab("can")}
            className={`col-span-1 w-full text-[14px] font-semibold py-3 rounded-lg cursor-pointer ${
              tab === "can"
                ? "bg-primary text-white"
                : "bg-[#F7F7F7] text-[#707070]"
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>
      <div className="w-full mt-[200.75px] mb-24 px-5 flex md:hidden flex-col items-start justify-start gap-5">
        {isLoading ? (
          [...Array(10)].map((_, idx) => <BookingCardSkeleton key={idx} />)
        ) : (
          <>
            {tab === "up" &&
              data
                ?.filter(
                  (booking) =>
                    booking.booking_status !== "Completed" &&
                    booking.booking_status !== "Cancelled"
                )
                .map((booking) => (
                  <Upcoming booking={booking} key={booking.booking_id} />
                ))}
            {tab === "com" &&
              data
                ?.filter((booking) => booking.booking_status === "Completed")
                .map((booking) => (
                  <Completed key={booking.booking_id} booking={booking} />
                ))}
            {tab === "can" &&
              data
                ?.filter((booking) => booking.booking_status === "Cancelled")
                .map((booking) => (
                  <Cancelled key={booking.booking_id} booking={booking} />
                ))}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Bookings;
