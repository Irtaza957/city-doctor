import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RiVisaLine } from "react-icons/ri";
import { FaMinus, FaPlus } from "react-icons/fa6";
import ServedDrawer from "@/components/drawers/ServedDrawer";
import LocationDrawer from "@/components/drawers/LocationDrawer";
import ScheduleDrawer from "@/components/drawers/ScheduleDrawer";
import CancelBookingDrawer from "@/components/drawers/CancelBookingDrawer";
import { cn, convertToDateString } from "@/utils/helpers";
import { useRouter } from "next/router";

const BookingDetails = () => {
  const [update, setUpdate] = useState(false);
  const [date, setDate] = useState<DATE | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [services, setServices] = useState<DRIP_CARD[]>([]);
  const [member, setMember] = useState<FAMILY_LIST | null>(null);

  const [cancelDrawer, setCancelDrawer] = useState(false);
  const [openFamilyDrawer, setOpenFamilyDrawer] = useState(false);
  const [openScheduleDrawer, setOpenScheduleDrawer] = useState(false);
  const [openLocationDrawer, setOpenLocationDrawer] = useState(false);
  const [data, setData] = useState<any>(null)
  const [location, setLocation] = useState<ADDRESS | null>({
    area: data?.address?.area,
    street: data?.address?.street,
    emirate: data?.address?.emirate,
    area_id: data?.address?.area_id,
    map_link: data?.address?.map_link,
    apartment: data?.address?.apartment,
    address_id: data?.address?.address_id,
    building_no: data?.address?.building_no,
    address_type: data?.address?.address_type,
    extra_direction: data?.address?.extra_direction,
  });
  const router = useRouter()
  const {id}=router.query

  async function getData() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/booking?id=${id}`,
      {
        method: "GET",
        headers: {
          "company-id": `${process.env.NEXT_PUBLIC_COMPANY_ID!}`,
          "secret-key": `${process.env.NEXT_PUBLIC_SECRET_KEY!}`,
          "business-id": `${process.env.NEXT_PUBLIC_BUSINESS_ID!}`,
        },
      }
    );
    const details: { success: number; error: string; data: BOOKING_DETAILS } =
      await response.json();
console.log(details, 'detailsdetails')
    setData(details.data)
  }

  useEffect(()=>{
    getData()
  },[])

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
        mrn: data?.customer?.mrn!,
        phone: data?.customer?.phone!,
        gender: `${data?.customer?.gender}`,
        is_allergy: data?.customer?.is_allergy,
        lastname: `${data?.customer?.lastname}`,
        firstname: `${data?.customer?.firstname}`,
        relationship: data?.customer?.relationship!,
        family_member_id: data?.customer?.customer_id!,
        date_of_birth: `${data?.customer?.date_of_birth}`,
        allergy_description: data?.customer?.allergy_description,
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
      <ServedDrawer
        open={openFamilyDrawer}
        selectedMember={member}
        setSelectedMember={setMember}
        onClose={() => setOpenFamilyDrawer(false)}
      />
      <LocationDrawer
        open={openLocationDrawer}
        selectedAddress={location}
        setSelectedAddress={setLocation}
        onClose={() => setOpenLocationDrawer(false)}
      />
      <CancelBookingDrawer
        open={cancelDrawer}
        getData={getData}
        onClose={() => setCancelDrawer(false)}
      />
      <ScheduleDrawer
        date={date}
        slot={slot}
        setDate={setDate}
        setSlot={setSlot}
        open={openScheduleDrawer}
        onClose={() => setOpenScheduleDrawer(false)}
      />
      <div className="w-full h-full flex md:hidden flex-col items-center justify-center space-y-3 mt-[69px] mb-[85px] p-5">
        <div className="w-full flex items-start justify-between">
          <h1 className="text-left text-xl font-bold">Booking Details</h1>
          <div className="flex flex-col items-center justify-center">
            <span className="w-full text-[14px] text-right font-semibold">
              Status
            </span>
            <p
              className={`w-full text-left text-xs font-medium ${data?.booking_status === "Pending"
                ? "text-accent"
                : data?.booking_status === "Completed"
                  ? "text-secondary"
                  : "text-[#FF2727]"
                }`}
            >
              {data?.booking_status}
            </p>
          </div>
        </div>
        <p className="w-full text-left text-[16px] font-semibold">
          Booking ID: {data?.booking_id}
        </p>
        <div className="w-full flex flex-col items-center justify-center space-y-3 py-3 border-t">
          <div className="w-full flex flex-col items-center justify-center pb-3 border-b">
            <div className="w-full flex items-center justify-between mb-3">
              <p className="w-full text-left text-[16px] font-semibold">
                Customer Details
              </p>
              {update && (
                <p
                  onClick={() => setOpenFamilyDrawer(true)}
                  className="w-full text-right text-xs font-semibold text-primary"
                >
                  Change
                </p>
              )}
            </div>
            <p className="w-full text-left text-xs text-[#555555] font-medium">
              {member?.firstname}&nbsp;{member?.lastname}
            </p>
            <p className="w-full text-left text-xs text-[#555555] font-medium">
              {member?.phone}
            </p>
          </div>
          <div className="w-full flex flex-col items-center justify-center pb-3 border-b">
            <div className="w-full flex items-center justify-between mb-3">
              <p className="w-full text-left text-[16px] font-semibold">
                Booking Address
              </p>
              {update && (
                <p
                  onClick={() => setOpenLocationDrawer(true)}
                  className="w-full text-right text-xs font-semibold text-primary"
                >
                  Change
                </p>
              )}
            </div>
            <p className="w-full text-left text-xs text-[#555555] font-medium capitalize">
              {location?.address_type}
            </p>
            <p className="w-full text-left text-xs text-[#555555] font-medium">
              {location?.apartment}&nbsp;{location?.building}&nbsp;
              {location?.street}&nbsp;{location?.area}&nbsp;
              {location?.emirate},&nbsp;
              {location?.extra_direction}
            </p>
          </div>
          <div className="w-full flex flex-col items-center justify-center pb-3 border-b">
            <div className="w-full flex items-center justify-between mb-3">
              <p className="w-full text-left text-[16px] font-semibold">
                Date & Time
              </p>
              {update && (
                <p
                  onClick={() => setOpenScheduleDrawer(true)}
                  className="w-full text-right text-xs font-semibold text-primary"
                >
                  Change
                </p>
              )}
            </div>
            {date && (
              <p className="w-full text-left text-xs font-medium text-[#555555]">
                {dayjs(convertToDateString(date!)).format("DD MMM, YYYY")}
              </p>
            )}
            <p className="w-full text-left text-xs text-[#555555] font-medium">
              {slot?.split("-").join(" - ")}
            </p>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-3">
            <div className="w-full flex items-center justify-between">
              <p className="w-full text-left text-[16px] font-semibold">
                Order Details
              </p>
            </div>
            {services?.map((service) => (
              <div
                key={service.service_id}
                className="w-full grid grid-cols-12 gap-3 border-b pb-3"
              >
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOdpNrnYYLZDH-r1-maYvATvVuImvEaqE00w&s"
                  alt="service"
                  width={64}
                  height={64}
                  className="col-span-2 size-14 border rounded-xl bg-black"
                />
                <div className="col-span-10 w-full flex flex-col items-center justify-between gap-0.5">
                  <p className="text-black w-full text-left text-[16px] font-semibold ">
                    {service.name}
                  </p>
                  <p className="w-full text-left text-xs text-[#555555]">
                    Quantity:&nbsp;{service.quantity}
                  </p>
                  <p className="w-full text-left text-xs text-[#555555]">
                    AED&nbsp;
                    {new Intl.NumberFormat().format(
                      parseInt(service?.quantity!) * parseInt(service?.price!)
                    )}
                  </p>
                </div>
                {update && (
                  <div className="col-span-4 w-full flex items-end justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => decrementQuantity(service.service_id)}
                      className="size-8 p-1 rounded-md border border-primary"
                    >
                      <FaMinus className="size-full" />
                    </button>
                    <span className="text-[16px] font-bold pb-1">
                      {service.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => incrementQuantity(service.service_id)}
                      className="size-8 p-1 rounded-md border border-primary bg-primary text-white"
                    >
                      <FaPlus className="size-full" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col items-center justify-center space-y-1.5">
            <h1 className="w-full text-left mb-3 text-[16px] font-semibold">
              Payment Summary
            </h1>
            <div className="w-full flex items-center justify-between">
              <p className="w-full text-left text-[14px] font-medium">
                Subtotal
              </p>
              <p className="w-full text-right text-[14px] font-medium text-[#555555]">
                AED&nbsp;{data?.sub_total}
              </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="w-full text-left text-[14px] font-medium">
                Discount (Promo)
              </p>
              <p className="w-full text-right text-[14px] font-medium text-[#555555]">
                AED&nbsp;{data?.discount_value}
              </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="w-full text-left text-[14px] font-medium">VAT</p>
              <p className="w-full text-right text-[14px] font-medium text-[#555555]">
                AED&nbsp;{data?.vat_value}
              </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="w-full text-left text-lg text-[16px] font-semibold">
                Grand Total
              </p>
              <p className="w-full text-right text-lg text-[16px] font-semibold">
                AED&nbsp;{Math.round(Number(data?.total))}
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-2 border-t pt-3">
            <h1 className="w-full text-left text-[16px] font-semibold">
              Payment Method
            </h1>
            <div className="w-full flex items-center justify-between pb-12">
              <p className="w-full text-left text-[#535763] text-sm font-medium">
                {data?.payment_method}
              </p>
              {data?.payment_method === "Online Payment" && (
                <div className="w-full flex items-center justify-end space-x-3">
                  <RiVisaLine className="w-8 h-8 text-[#1A1F71]" />
                  <span className="text-[14px] font-medium">
                    **** **** **** 2345
                  </span>
                </div>
              )}
            </div>
          </div>
          {data?.booking_status !== 'Cancelled' &&
            <div className={cn("w-full fixed z-20 bottom-[68px] left-0 p-2.5 bg-white flex gap-2 sm:hidden border-t"
            )}>
              {update ? (
                <>
                  <button
                    type="button"
                    onClick={() => setCancelDrawer(true)}
                    className="w-full px-5 py-2.5 text-red-500 text-[14px] sm:text-[16px] font-semibold border border-red-500 rounded-lg"
                  >
                    Cancel Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => setUpdate(false)}
                    className="w-full px-5 py-2.5 text-white text-[14px] sm:text-[16px] font-semibold bg-primary rounded-lg"
                  >
                    Confirm
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setUpdate(true)}
                  className="w-full py-3 rounded-xl bg-primary border border-primary text-white text-[18px] font-semibold"
                >
                  Update
                </button>
              )}
            </div>}
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
