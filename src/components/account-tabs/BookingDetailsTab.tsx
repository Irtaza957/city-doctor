import dayjs from "dayjs";
import Image from "next/image";
import { LuLoader } from "react-icons/lu";
import { useEffect, useState } from "react";
import { RiVisaLine } from "react-icons/ri";
import { IoArrowBack } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { convertToDateString } from "@/utils/helpers";
import ScheduleModal from "@/components/modals/ScheduleModal";
import AddFamilyModal from "@/components/modals/AddFamilyModal";
import AddLocationModal from "@/components/modals/AddLocationModal";
import CancelBookingModal from "@/components/modals/CancelBookingModal";

const BookingDetails = ({
  data,
  setShowDetail,
}: {
  data: BOOKING_DETAILS | null;
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [update, setUpdate] = useState(false);
  const [date, setDate] = useState<DATE | null>(null);
  const [openMember, setOpenMember] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [slot, setSlot] = useState<string | null>(null);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [location, setLocation] = useState<ADDRESS | null>({
    area: `${data?.address.area}`,
    emirate: data?.address.emirate,
    area_id: data?.address.area_id,
    street: `${data?.address.street}`,
    address_id: data?.address.address_id,
    map_link: `${data?.address.map_link}`,
    building_no: data?.address.building_no,
    apartment: `${data?.address.apartment}`,
    address_type: `${data?.address.address_type}`,
    extra_direction: `${data?.address.extra_direction}`,
  });
  const [services, setServices] = useState<DRIP_CARD[]>([]);
  const [member, setMember] = useState<FAMILY_LIST | null>(null);

  const [cancel, setCancel] = useState(false);

  const incrementQuantity = (id: string) => {
    setServices((prevServices) =>
      prevServices.map((service) => {
        if (service.service_id === id) {
          const newQuantity = (
            parseInt(service.quantity || "0") + 1
          ).toString();

          return {
            ...service,
            quantity: newQuantity,
          };
        }
        return service;
      })
    );
  };

  const decrementQuantity = (id: string) => {
    setServices((prevServices) => {
      const updatedServices = prevServices
        .map((service) => {
          if (service.service_id === id) {
            const newQuantity = (
              parseInt(service.quantity || "0") - 1
            ).toString();

            return {
              ...service,
              quantity: newQuantity,
            };
          }
          return service;
        })
        .filter((service) => parseInt(service.quantity || "0") > 0);

      return updatedServices.length > 0 ? updatedServices : prevServices;
    });
  };

  useEffect(() => {
    if (data) {
      setServices(data?.services);
      setMember({
        mrn: data?.customer.mrn!,
        phone: data?.customer.phone!,
        gender: `${data?.customer.gender}`,
        is_allergy: data?.customer.is_allergy,
        lastname: `${data?.customer.lastname}`,
        firstname: `${data?.customer.firstname}`,
        relationship: data?.customer.relationship!,
        family_member_id: data?.customer.customer_id!,
        date_of_birth: `${data?.customer.date_of_birth}`,
        allergy_description: data?.customer.allergy_description,
      });
      setDate({
        id: 0,
        day: dayjs(data?.schedule_date).format("DDD"),
        month: dayjs(data?.schedule_date).format("MMM"),
        date: parseInt(dayjs(data?.schedule_date).format("DD")),
      });
      setSlot(`${data?.schedule_slot}`);
    }
  }, [data]);

  return (
    <>
      <AddFamilyModal
        open={openMember}
        setOpen={setOpenMember}
        setSelectedMember={setMember}
      />
      <AddLocationModal
        open={openAddress}
        setOpen={setOpenAddress}
        setSelectedAddress={setLocation}
      />
      <ScheduleModal
        date={date}
        slot={slot}
        setDate={setDate}
        setSlot={setSlot}
        open={openSchedule}
        setOpen={setOpenSchedule}
      />
      <CancelBookingModal open={cancel} setOpen={setCancel} />
      {!data ? (
        <div className="w-full flex items-center justify-center gap-2">
          <LuLoader className="size-10 animate-spin text-secondary" />
        </div>
      ) : (
        <div className="w-full max-h-full overflow-auto custom-scrollbar pr-5 flex flex-col items-start justify-start gap-5">
          <div className="sticky top-0 bg-white z-10 w-full flex items-center justify-start gap-5">
            <button type="button" onClick={() => setShowDetail(false)}>
              <IoArrowBack className="size-5" />
            </button>
            <h1 className="w-full text-xl text-left font-bold">
              Booking Details
            </h1>
          </div>
          <div className="w-full flex items-center justify-between">
            <h1 className="font-semibold">REF: {data.reference}</h1>
            <div className="flex flex-col items-center justify-center text-xs text-[#555555]">
              <p className="w-full text-right text-[14px] font-medium">
                Status
              </p>
              <p
                className={`w-full text-left text-[14px] font-semibold ${
                  data.booking_status === "Pending"
                    ? "text-accent"
                    : data.booking_status === "Completed"
                    ? "text-secondary"
                    : "text-[#FF2727]"
                }`}
              >
                {data.booking_status}
              </p>
            </div>
          </div>
          <div className="w-full grid grid-cols-3 pb-5 border-b">
            <div className="col-span-1 w-full items-start justify-start text-gray-500 p-px">
              <p className="w-full text-left font-semibold text-black mb-2.5">
                Booking For
              </p>
              <p className="w-full break-all text-left text-xs font-medium text-[#555555]">
                {member?.firstname}&nbsp;{member?.lastname}&nbsp;(
                {member?.relationship})
              </p>
              <p className="w-full text-left text-xs font-medium text-[#555555] mb-2.5">
                {member?.phone}
              </p>
              {update && (
                <button
                  type="button"
                  onClick={() => setOpenMember(true)}
                  className="px-5 py-1.5 rounded-lg bg-gray-200 text-primary text-[14px] font-semibold"
                >
                  Change
                </button>
              )}
            </div>
            <div className="col-span-1 w-full items-start justify-start text-gray-500 p-px">
              <p className="w-full text-left font-semibold text-black mb-2.5">
                Booking Address
              </p>
              <p className="w-full text-left text-xs font-medium text-[#555555] capitalize">
                {location?.address_type}
              </p>
              <p className="w-full break-all text-left text-xs font-medium text-[#555555] mb-2.5">
                {location?.apartment}&nbsp;{location?.building}&nbsp;
                {location?.street}&nbsp;{location?.area}&nbsp;
                {location?.emirate},&nbsp;
                {location?.extra_direction}
              </p>
              {update && (
                <div className="w-full flex items-center justify-start">
                  <button
                    type="button"
                    onClick={() => setOpenAddress(true)}
                    className="px-5 py-1.5 rounded-lg bg-gray-200 text-primary text-[14px] font-semibold"
                  >
                    Change
                  </button>
                </div>
              )}
            </div>
            <div className="col-span-1 w-full items-start justify-start text-gray-500 p-px">
              <p className="w-full text-left font-semibold text-black mb-2.5">
                Date & Time
              </p>
              {date && (
                <p className="w-full text-left text-xs font-medium text-[#555555]">
                  {dayjs(convertToDateString(date!)).format("DD MMM, YYYY")}
                </p>
              )}
              <p className="w-full text-left text-xs font-medium text-[#555555] mb-2.5">
                {slot?.split("-").join(" - ")}
              </p>
              {update && (
                <div className="w-full flex items-center justify-start">
                  <button
                    type="button"
                    onClick={() => setOpenSchedule(true)}
                    className="px-5 py-1.5 rounded-lg bg-gray-200 text-primary text-[14px] font-semibold"
                  >
                    Change
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <h1 className="w-full text-left text-lg font-bold mb-2.5">
              Order Details
            </h1>
            {services.map((service) => (
              <div
                key={service.service_id}
                className="w-full flex items-center justify-between pt-2.5 pb-5 border-b"
              >
                <div className="w-full flex items-center justify-start gap-5">
                  <Image
                    src={
                      service.cover_image ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOdpNrnYYLZDH-r1-maYvATvVuImvEaqE00w&s"
                    }
                    alt="service"
                    width={96}
                    height={96}
                    className="size-12 border rounded-full bg-black mr-auto"
                  />
                  <p className="col-span-3 flex flex-1 w-full items-center text-base !leading-[19px] justify-start font-semibold">
                    {service.name}
                  </p>
                </div>
                {update ? (
                  <div className="w-full flex items-center justify-start space-x-6 md:space-x-16 lg:space-x-20">
                    <p className="w-[45px] text-[14px] text-[#555555] font-medium">
                      Qty: {service.quantity}
                    </p>
                    <div className="flex items-center justify-end space-x-5">
                      <FaMinus
                        onClick={() => decrementQuantity(service.service_id)}
                        className="cursor-pointer size-8 p-1.5 rounded-lg border border-primary text-black"
                      />
                      <span className="font-semibold">{service.quantity}</span>
                      <FaPlus
                        onClick={() => incrementQuantity(service.service_id)}
                        className="cursor-pointer size-8 p-1.5 rounded-lg bg-primary border border-primary text-white"
                      />
                    </div>
                  </div>
                ) : (
                  <p className="w-full flex items-center justify-center text-[14px] text-[#555555] font-medium">
                    Qty: {service.quantity}
                  </p>
                )}
                <p className="col-span-2 w-auto md:w-full flex items-center justify-end text-[14px] text-[#555555] font-medium">
                  AED&nbsp;
                  {parseFloat(`${service.price}`) *
                    parseInt(service?.quantity!)}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-0 pb-5 border-b">
            <div className="col-span-1 w-full flex flex-col items-start justify-start space-y-1.5">
              <h1 className="w-full text-left font-semibold">Payment Method</h1>
              <div className="w-full flex flex-col lg:flex-row items-center justify-between">
                <p className="w-full text-left text-xs font-medium text-[#555555]">
                  {data.payment_method}
                </p>
                {data.payment_method === "Online Payment" && (
                  <div className="w-full flex items-center justify-start lg:justify-end space-x-3">
                    <RiVisaLine className="w-8 h-8 text-[#1A1F71]" />
                    <span className="text-[14px] text-black">
                      **** **** **** 2345
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-1 hidden md:flex" />
            <div className="col-span-1 w-full flex flex-col items-start justify-start space-y-1.5">
              <h1 className="w-full text-left font-semibold">
                Payment Summary
              </h1>
              <div className="w-full flex items-center justify-between">
                <p className="w-full text-left text-[14px] text-black font-medium">
                  Subtotal
                </p>
                <p className="w-full text-right text-[14px] text-[#555555] font-medium">
                  AED&nbsp;{data.sub_total}
                </p>
              </div>
              <div className="w-full flex items-center justify-between">
                <p className="w-full text-left text-[14px] text-black font-medium">
                  Discount
                </p>
                <p className="w-full text-right text-[14px] text-[#555555] font-medium">
                  AED&nbsp;{data.discount_value}
                </p>
              </div>
              <div className="w-full flex items-center justify-between">
                <p className="w-full text-left font-semibold text-black">
                  Grand Total
                </p>
                <p className="w-full text-right font-semibold text-black">
                  AED&nbsp;{data.total}
                </p>
              </div>
            </div>
          </div>
          {update ? (
            <div className="w-full flex items-center justify-end space-x-5">
              <button
                type="button"
                onClick={() => setCancel(true)}
                className="px-5 py-1.5 border border-[#FF2727] text-[#FF2727] rounded-lg font-medium"
              >
                Cancel Booking
              </button>
              <button
                type="button"
                onClick={() => setUpdate(false)}
                className="px-5 py-1.5 bg-primary border border-primary rounded-lg text-white font-medium"
              >
                Confirm
              </button>
            </div>
          ) : (
            <div className="w-full flex items-center justify-end">
              <button
                onClick={() => setUpdate(true)}
                type="button"
                className="px-5 py-2.5 bg-primary rounded-lg text-white font-medium"
              >
                Update
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BookingDetails;
