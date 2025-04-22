"use client";

import "swiper/css";
import {
  generateDates,
  generateTimeSlots,
  convertToDateString,
  calculateWithoutVAT,
  calculateDiscountValue,
  calculateVAT,
  cn,
} from "@/utils/helpers";
import { RootState } from "@/store";
import { emptyCart, setBookingID } from "@/store/global";
import ServedDrawer from "@/components/drawers/ServedDrawer";
import TimeSlotModal from "@/components/modals/TimeSlotModal";
import AddFamilyModal from "@/components/modals/AddFamilyModal";
import LocationDrawer from "@/components/drawers/LocationDrawer";
import TimeSlotDrawer from "@/components/drawers/TimeSlotDrawer";
import { useCreatePaymentMutation, useCreatePaymentStatusMutation, useCreatePaymentTokenMutation, useGetPaymentMethodsQuery, usePostBookingMutation } from "@/store/services/booking";
import AddLocationModal from "@/components/modals/AddLocationModal";
import CancellationModal from "@/components/modals/CancellationModal";
import CancellationDrawer from "@/components/drawers/CancellationDrawer";

import {
  FaCircleInfo,
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// @ts-ignore
import { FreeMode } from "swiper/modules";
import { LuLoader } from "react-icons/lu";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import GoogleAnalytics from "../components/GoogleAnalytics";
import PaymentSidebar from "@/components/checkout/PaymentSidebar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

const CheckoutDetails = () => {
  const dispatch = useDispatch();
  const dates = generateDates(15);
  const [comments, setComments] = useState("");
  const [openTime, setOpenTime] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [openServed, setOpenServed] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [openFamily, setOpenFamily] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [openTimeModal, setOpenTimeModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [payMethod, setPayMethod] = useState("Cash on Delivery");
  const [postBooking, { isLoading }] = usePostBookingMutation();
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const { cart, user, isMenuVisible } = useSelector((state: RootState) => state.global);
  const [finalAddress, setFinalAddress] = useState<ADDRESS | null>(null);
  const [showCard, setShowCard] = useState(false);
  const [cardValidStatus, setCardValidStatus] = useState({
    isPanValid: true,
    isExpiryValid: true,
    isCVVValid: true,
    isNameValid: true,
  });
  const [loading, setLoading]=useState(false)
  const [is3ds, setIs3ds]=useState(false)

  const slots = generateTimeSlots(convertToDateString(selectedDate));
  const [selectedSlot, setSelectedSlot] = useState(slots[0]);
  const [finalMember, setFinalMember] = useState<FAMILY_LIST | null>({
    family_member_id: user?.customer_id!,
    mrn: user?.mrn!,
    relationship: "self",
    firstname: user?.firstname!,
    lastname: user?.lastname!,
    date_of_birth: user?.date_of_birth!,
    gender: user?.gender!,
    is_allergy: user?.is_allergy!,
    allergy_description: user?.allergy_description!,
  });
  const [createPayment] = useCreatePaymentMutation()
  const [createPaymentStatus] = useCreatePaymentStatusMutation()
  const [createPaymentToken] = useCreatePaymentTokenMutation()
  const { data: paymentMethods } = useGetPaymentMethodsQuery({});

  const handleErrors = () => {
    const errors = [];
    if (!finalMember) {
      errors.push("finalMember");
    }

    if (!finalAddress) {
      errors.push("finalAddress");
    }

    if (!selectedDate) {
      errors.push("selectedDate");
    }

    if (!selectedSlot) {
      errors.push("selectedSlot");
    }

    setErrors(errors);

    return errors.length > 0;
  };

  const onClose = () => {
    setOpenServed(false);
  };

  const onCloseLocation = () => {
    setOpenLocation(false);
  };

  const onCloseTime = () => {
    setOpenTime(false);
  };

  const onCloseCancel = () => {
    setOpenCancel(false);
  };

  const clearCheckout = () => {
    setFinalMember(null);
    setFinalAddress(null);
    dispatch(emptyCart());
    setSelectedDate(dates[0]);
    setSelectedSlot(slots[0]);
  };

  const handleSubmit = async () => {
    const noErrors = handleErrors();

    if (noErrors) {
      toast.error("Please fill all the required fields");
      return;
    }

    if (cart.length === 0) {
      toast.error("Please Select Items to Checkout!");
      return;
    }

    setLoading(true)

    const grandTotal = Math.round(calculateVAT(cart) + (calculateWithoutVAT(cart) - calculateDiscountValue(cart)))
    const urlencoded = new URLSearchParams();
    urlencoded.append("customer_id", user?.customer_id!);
    urlencoded.append("address_id", finalAddress?.address_id!);
    urlencoded.append(
      "family_member_id",
      `${finalMember?.family_member_id !== user?.customer_id
        ? finalMember?.family_member_id
        : "0"
      }`
    );
    urlencoded.append("firstname", finalMember?.firstname!);
    urlencoded.append("lastname", finalMember?.lastname!);
    urlencoded.append("phone", user?.phone!);
    urlencoded.append("schedule_date", convertToDateString(selectedDate));
    urlencoded.append("schedule_slot", selectedSlot);
    urlencoded.append("delivery_notes", comments);
    urlencoded.append("payment_method", payMethod);
    urlencoded.append(
      "payment_method_code",
      payMethod === "Online Payment"
        ? "pol"
        : payMethod === "Cash on Delivery"
          ? "cod"
          : "cdd"
    );
    urlencoded.append("payment_status", "pending");
    urlencoded.append("sub_total", `${grandTotal}`);
    urlencoded.append("discount_value", "0.00");
    urlencoded.append("total", `${grandTotal}`);
    urlencoded.append(
      "services",
      JSON.stringify(
        cart.map((item: CART) => ({
          service_id: item.id,
          qty: item.quantity,
          price: item.price,
        }))
      )
    );
    urlencoded.append("coupon_id", "0");

    try {
      const data = await postBooking({
        data: urlencoded,
        token: user?.token!,
      });

      if (data.error) {
        // @ts-ignore
        toast.error(data.error.data.error);
        setLoading(false)
      } else {
        if (!data.data.data.id) return toast.error("Error creating booking!");
        if (payMethod === 'Card on Delivery' || payMethod === 'Cash on Delivery') {
          handleRedirect(data.data.data.id, payMethod)
          return
        }
        if (payMethod && payMethod !== 'Card on Delivery' && payMethod !== 'Cash on Delivery' && !showCard) {
          const urlencodedToken = new URLSearchParams();
          const card=paymentMethods?.data?.find((item: any)=>item?.card_type===payMethod)
          urlencodedToken.append("booking_id", data.data.data.id);
          urlencodedToken.append("card", card?.id);
          urlencodedToken.append("amount", String(Math.round(calculateVAT(cart) + (calculateWithoutVAT(cart) - calculateDiscountValue(cart)))))
          setIs3ds(true)
          const paymenttokenResp=await createPaymentToken(urlencodedToken)
          console.log(paymenttokenResp, 'paymenttokenResppaymenttokenResp')
          const { status, error } = await window.NI.handlePaymentResponse(
            paymenttokenResp?.data?.data,
            {
              mountId: '3ds_iframe',
            }
          );
          
          const urlencodedStatus = new URLSearchParams();
          urlencodedStatus.append("reference", paymenttokenResp?.data?.data?.orderReference);
          urlencodedStatus.append("booking_id", data.data.data.id);
          setIs3ds(false)
          await createPaymentStatus(urlencodedStatus)
          console.log(status, error, 'statusstatus')
          handleRedirect(data.data.data.id, payMethod, status)
          return
        }
        if (showCard && !payMethod) {
          console.log(window.NI, 'window.NI')
          const response = await window.NI.generateSessionId();
          if (response?.session_id) {
            const urlencoded = new URLSearchParams();
            urlencoded.append("session", response?.session_id);
            urlencoded.append("booking_id", data.data.data.id);
            urlencoded.append("amount", String(Math.round(calculateVAT(cart) + (calculateWithoutVAT(cart) - calculateDiscountValue(cart)))))
            
            setIs3ds(true)
            const paymentResponse = await createPayment(urlencoded)
            console.log(paymentResponse, 'paymentResponsepaymentResponse')
            console.log(document.getElementById("3ds_iframe"), '3ds_iframe3ds_iframe')
            const { status, error } = await window.NI.handlePaymentResponse(
              paymentResponse?.data?.data,
              {
                mountId: '3ds_iframe',
              }
            );
            setIs3ds(false)
            const urlencodedStatus = new URLSearchParams();
            urlencodedStatus.append("reference", paymentResponse?.data?.data?.orderReference);
            urlencodedStatus.append("booking_id", data.data.data.id);
            const statusResponse = await createPaymentStatus(urlencodedStatus)
            setLoading(false)
            
            console.log(status, error, 'statusstatus')
            console.log(statusResponse, 'statusResponsestatusResponse')
            handleRedirect(data.data.data.id, payMethod, status)
          }

        } else {
          toast.error("Invalid Session!");
          setLoading(false)
        }
      }
    } catch (err) {
      console.log(err, 'errerr')
      setLoading(false)
      toast.error("Please Try Again!");
    }
  };

  const handleRedirect = (id: number, payMethod: string, status?: string) => {
    dispatch(setBookingID(id));
    clearCheckout()
    if(payMethod === 'Card on Delivery' || payMethod === 'Cash on Delivery'){
      window.location.href="/thank-you"
      return
    }
    if(status==='CAPTURED'){
      window.location.href="/payment-successfull"
    }else{
      window.location.href="/payment-failed"
    }
  }

  useEffect(() => {
    if (showCard) {
      setPayMethod('')
    }
  }, [showCard])

  useEffect(() => {
    if (payMethod) {
      setShowCard(false)
    }
  }, [payMethod])

  return (
    <>
    {((isLoading || loading) && !is3ds) &&<Loader/>}
      <GoogleAnalytics />
      <TimeSlotDrawer
        slots={slots}
        open={openTime}
        onClose={onCloseTime}
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
      />
      <ServedDrawer
        open={openServed}
        onClose={onClose}
        selectedMember={finalMember}
        setSelectedMember={setFinalMember}
      />
      <LocationDrawer
        open={openLocation}
        onClose={onCloseLocation}
        selectedAddress={finalAddress}
        setSelectedAddress={setFinalAddress}
      />
      <CancellationDrawer open={openCancel} onClose={onCloseCancel} />
      {/* <Modal width="w-fit" toggle={done} setToggle={setDone}>
        <div className="w-full mx-auto flex flex-col items-center justify-center rounded-lg bg-white px-5 pt-10">
          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-[70px] h-[70px] p-4 rounded-full bg-[#38B1A2] flex items-center justify-center">
              <FaCheck className="size-full text-white" />
            </div>
            <h1 className="text-center text-xl font-bold text-primary mt-4">
              Booking Successful
            </h1>
          </div>
          <p className="w-2/3 text-center text-xs text-[#535763] font-medium my-2.5">
            Ref No.&nbsp;{bookingID}
          </p>
          <p className="w-2/3 text-center text-xs text-[#707070] mb-9">
            Thank you for your booking and Our expert team will contact shortly
          </p>
          <div className="w-full px-4 mb-7 flex items-center justify-center">
            <Link
              href="/"
              onClick={() => setDone(false)}
              className="w-1/2 py-2 rounded-lg bg-primary text-white text-center font-medium text-sm"
            >
              Go To Home
            </Link>
          </div>
        </div>
      </Modal> */}
      <AddFamilyModal
        open={openFamily}
        setOpen={setOpenFamily}
        setSelectedMember={setFinalMember}
      />
      <AddLocationModal
        open={openAddressModal}
        setOpen={setOpenAddressModal}
        setSelectedAddress={setFinalAddress}
      />
      <TimeSlotModal
        slots={slots}
        open={openTimeModal}
        setOpen={setOpenTimeModal}
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
      />
      <CancellationModal open={openCancelModal} setOpen={setOpenCancelModal} />
      <div className="w-full flex flex-col items-center justify-center gap-5 px-5 md:px-0 pt-7 sm:pt-14 pb-20 mt-[69px] md:mt-[108px] sm:bg-gray-100">
        {is3ds ? <div id="3ds_iframe" className="bg-white w-full md:w-[90%] lg:max-w-[1440px] mx-auto rounded-xl min-h-[100px] flex flex-col items-center justify-center pt-28"></div>:
        <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 -mt-5">
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 relative w-full flex flex-col items-start justify-start bg-white rounded-xl sm:p-5">
            <h1 className="w-full text-left text-xl flex font-bold sm:font-semibold mb-2.5 items-center justify-start">
              Checkout
            </h1>
            <div className="w-full flex flex-col items-center justify-center gap-5 divide-y">
              <div className="w-full flex flex-col items-center justify-center gap-2.5">
                <h1
                  className={`col-span-2 w-full text-sm lg:text-base text-left font-bold ${errors.includes("finalMember") && "border-b border-red-500"
                    }`}
                >
                  Who will be served today ?
                </h1>
                <div className="w-full flex items-center justify-between">
                  {finalMember ? (
                    <span className="text-sm font-medium">
                      {finalMember?.firstname}&nbsp;{finalMember?.lastname}
                      &nbsp;
                      {finalMember.family_member_id === user?.customer_id
                        ? "(Myself)"
                        : `(${finalMember.relationship})`}
                    </span>
                  ) : (
                    <span className="text-sm font-medium">
                      {user?.firstname}&nbsp;{user?.lastname} (Myself)
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setOpenServed((prev) => (prev = !prev))}
                    className="text-xs text-primary cursor-pointer flex sm:hidden"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenFamily(true)}
                    className="text-xs text-primary cursor-pointer hidden sm:flex bg-[#F7F7F7] py-2 px-4 rounded-md font-medium"
                  >
                    Change
                  </button>
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center pt-5 gap-2.5">
                <h1
                  className={`w-full text-sm lg:text-base text-left font-bold ${errors.includes("finalAddress") && "border-b border-red-500"
                    }`}
                >
                  Where would you prefer service?
                </h1>
                <div className="w-full flex items-center justify-between">
                  {finalAddress ? (
                    <div className="w-full flex flex-col items-center justify-center">
                      <span className="text-sm font-semibold w-full text-left capitalize">
                        {finalAddress.address_type}
                      </span>
                      <span className="text-xs xl:text-sm font-medium text-[#535763] text-left w-full">
                        {finalAddress.apartment && finalAddress.apartment}
                        ,&nbsp;
                        {finalAddress.building_no && finalAddress.building_no}
                        ,&nbsp;
                        {finalAddress.street && finalAddress.street},&nbsp;
                        {finalAddress.area && finalAddress.area}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm font-medium">
                      Please Select Address
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setOpenLocation((prev) => (prev = !prev))}
                    className="text-xs text-primary cursor-pointer flex sm:hidden"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenAddressModal(true)}
                    className="text-xs text-primary cursor-pointer font-medium hidden sm:flex bg-[#F7F7F7] py-2 px-4 rounded-md"
                  >
                    Change
                  </button>
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center pt-5 gap-2.5">
                <h1
                  className={`w-full text-sm lg:text-base text-left font-bold ${errors.includes("selectedDate") && "border-b border-red-500"
                    }`}
                >
                  When would you like to be served?
                </h1>
                <div className="w-full flex flex-col items-center justify-center gap-1.5">
                  <span className="text-sm font-semibold w-full text-left">
                    Pick a Date
                  </span>
                  <div className="w-full block sm:hidden">
                    <Swiper
                      slidesPerView={4.5}
                      spaceBetween={10}
                      freeMode={true}
                      modules={[FreeMode]}
                    >
                      {dates.map((date: DATE) => (
                        <SwiperSlide key={date.id}>
                          <div
                            onClick={() => setSelectedDate(date)}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer ${selectedDate.id === date.id
                              ? "bg-primary text-white"
                              : "bg-[#F7F7F7] text-black"
                              }`}
                          >
                            <span className="text-xs w-full text-center">
                              {date.day}
                            </span>
                            <span className="w-full text-center text-xl font-medium">
                              {date.date}
                            </span>
                            <span className="text-xs w-full text-center">
                              {date.month}
                            </span>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="w-full hidden sm:block md:hidden">
                    <Swiper
                      slidesPerView={6.5}
                      spaceBetween={10}
                      freeMode={true}
                      modules={[FreeMode]}
                    >
                      {dates.map((date: DATE) => (
                        <SwiperSlide key={date.id}>
                          <div
                            onClick={() => setSelectedDate(date)}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer ${selectedDate.id === date.id
                              ? "bg-primary text-white"
                              : "bg-[#F7F7F7] text-black"
                              }`}
                          >
                            <span className="text-xs w-full text-center">
                              {date.day}
                            </span>
                            <span className="w-full text-center text-xl font-medium">
                              {date.date}
                            </span>
                            <span className="text-xs w-full text-center">
                              {date.month}
                            </span>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="w-full hidden md:block lg:hidden">
                    <Swiper
                      slidesPerView={7.5}
                      spaceBetween={10}
                      freeMode={true}
                      modules={[FreeMode]}
                    >
                      {dates.map((date: DATE) => (
                        <SwiperSlide key={date.id}>
                          <div
                            onClick={() => setSelectedDate(date)}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer ${selectedDate.id === date.id
                              ? "bg-primary text-white"
                              : "bg-[#F7F7F7] text-black"
                              }`}
                          >
                            <span className="text-xs w-full text-center">
                              {date.day}
                            </span>
                            <span className="w-full text-center text-xl font-medium">
                              {date.date}
                            </span>
                            <span className="text-xs w-full text-center">
                              {date.month}
                            </span>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="w-full hidden lg:block">
                    <Swiper
                      slidesPerView={12.5}
                      spaceBetween={10}
                      freeMode={true}
                      modules={[FreeMode]}
                    >
                      {dates.map((date: DATE) => (
                        <SwiperSlide key={date.id}>
                          <div
                            onClick={() => setSelectedDate(date)}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer ${selectedDate.id === date.id
                              ? "bg-primary text-white"
                              : "bg-[#F7F7F7] text-black"
                              }`}
                          >
                            <span className="text-xs w-full text-center">
                              {date.day}
                            </span>
                            <span className="w-full text-center text-xl font-medium">
                              {date.date}
                            </span>
                            <span className="text-xs w-full text-center">
                              {date.month}
                            </span>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center pt-5 gap-2.5">
                <div className="w-full flex items-center justify-between">
                  <h1
                    className={`text-sm font-semibold  ${errors.includes("selectedSlot") &&
                      "border-b border-red-500"
                      }`}
                  >
                    Pick a Time Slot
                  </h1>
                  <button
                    type="button"
                    onClick={() => setOpenTime((prev) => (prev = !prev))}
                    className="text-xs text-primary cursor-pointer bg-white flex sm:hidden"
                  >
                    See All
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenTimeModal(true)}
                    className="text-xs text-primary cursor-pointer font-medium hidden sm:flex bg-[#F7F7F7] py-2 px-4 rounded-md"
                  >
                    See All
                  </button>
                </div>
                <div className="w-full block sm:hidden">
                  <Swiper
                    slidesPerView={2.5}
                    spaceBetween={10}
                    freeMode={true}
                    modules={[FreeMode]}
                  >
                    {slots.map((slot: string, idx) => (
                      <SwiperSlide key={idx}>
                        <div
                          onClick={() => setSelectedSlot(slot)}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer ${selectedSlot === slot
                            ? "bg-primary text-white"
                            : "bg-[#F7F7F7] text-black"
                            }`}
                        >
                          <span className="text-xs w-full text-center">
                            {slot}
                          </span>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="w-full hidden sm:block md:hidden">
                  <Swiper
                    slidesPerView={3.5}
                    spaceBetween={10}
                    freeMode={true}
                    modules={[FreeMode]}
                  >
                    {slots.map((slot: string, idx) => (
                      <SwiperSlide key={idx}>
                        <div
                          onClick={() => setSelectedSlot(slot)}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer ${selectedSlot === slot
                            ? "bg-primary text-white"
                            : "bg-[#F7F7F7] text-black"
                            }`}
                        >
                          <span className="text-xs w-full text-center">
                            {slot}
                          </span>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="w-full hidden md:block lg:hidden">
                  <Swiper
                    slidesPerView={4.5}
                    spaceBetween={10}
                    freeMode={true}
                    modules={[FreeMode]}
                  >
                    {slots.map((slot: string, idx) => (
                      <SwiperSlide key={idx}>
                        <div
                          onClick={() => setSelectedSlot(slot)}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer ${selectedSlot === slot
                            ? "bg-primary text-white"
                            : "bg-[#F7F7F7] text-black"
                            }`}
                        >
                          <span className="text-xs w-full text-center">
                            {slot}
                          </span>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="w-full hidden lg:block">
                  <Swiper
                    slidesPerView={7.5}
                    spaceBetween={10}
                    freeMode={true}
                    modules={[FreeMode]}
                  >
                    {slots.map((slot: string, idx) => (
                      <SwiperSlide key={idx}>
                        <div
                          onClick={() => setSelectedSlot(slot)}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer ${selectedSlot === slot
                            ? "bg-primary text-white"
                            : "bg-[#F7F7F7] text-black"
                            }`}
                        >
                          <span className="text-xs w-full text-center">
                            {slot}
                          </span>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center pt-5 gap-2.5">
                <div className="w-full h-full flex items-start justify-center gap-3 bg-[#F7F7F7] sm:bg-transparent p-3 sm:p-0 rounded-md sm:rounded-none">
                  <FaCircleInfo className="size-6 text-[#606060] place-self-start sm:place-self-center" />
                  <span className="w-full text-left text-xs text-[#5E5E5E] place-self-start sm:place-self-center">
                    Free cancellation until 12 hours before the start of your
                    booking.
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpenCancelModal(true)}
                    className="text-right text-xs text-primary cursor-pointer bg-transparent hidden sm:flex font-medium"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenCancel((prev) => (prev = !prev))}
                    className="text-xs text-primary cursor-pointer bg-transparent flex sm:hidden place-self-end pt-10"
                  >
                    Details
                  </button>
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center pt-2.5 gap-2.5">
                <h1 className="col-span-2 w-full text-sm lg:text-base text-left font-bold">
                  Special Requirements
                </h1>
                <textarea
                  cols={30}
                  rows={3}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full border border-[#DEDEDE] rounded-xl py-3 px-5 text-xs"
                  placeholder="Please Specify Instructions..."
                />
              </div>
            </div>
          </div>
          <PaymentSidebar
            isLoading={isLoading}
            payMethod={payMethod}
            isOrderLoading={loading}
            handleSubmit={handleSubmit}
            setPayMethod={setPayMethod}
            calculateDiscountValue={calculateDiscountValue(cart)}
            calculateVAT={calculateVAT(cart)}
            calculateWithoutVAT={calculateWithoutVAT(cart)}
            setShowCard={setShowCard}
            showCard={showCard}
            setCardValidStatus={setCardValidStatus}
            cardValidStatus={cardValidStatus}
            paymentMethods={paymentMethods}
          />
        </div>}
      </div>
      <div className={cn("w-full fixed z-20 bottom-0 left-0 p-2.5 bg-white flex sm:hidden border-t",
        isMenuVisible && 'bottom-[68px]'
      )}>
        <button
          type="button"
          disabled={isLoading || loading}
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl bg-primary border border-primary text-white text-[18px] font-semibold"
        >
          {isLoading || loading ? (
            <div className="w-full flex items-center justify-center space-x-3">
              <LuLoader className="w-5 h-5 animate-spin" />
              <span>Please Wait...</span>
            </div>
          ) : (
            "Place Order"
          )}
        </button>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutDetails;
