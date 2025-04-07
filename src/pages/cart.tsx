"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { LuLoader2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsTicketPerforated } from "react-icons/bs";
// @ts-ignore
import { FreeMode, Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";

import "swiper/css";
import "swiper/css/navigation";
import { RootState } from "@/store";
import EmptyCart from "@/assets/icons/empty-cart.svg";
import LoginModal from "@/components/modals/LoginModal";
import LoginDrawer from "@/components/drawers/LoginDrawer";
import { useFetchHomeDataQuery } from "@/store/services/home";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import { useApplyPromoMutation } from "@/store/services/booking";
import BestSellingCard from "@/components/cards/BestSellingCard";
import { addToCart, removeFromCart, setCart, setPromo } from "@/store/global";
import { calculateDiscount, calculateDiscountValue, calculateVAT, calculateWithoutVAT, cn, getSlug, imageBase } from "@/utils/helpers";
import GoogleAnalytics from "../components/GoogleAnalytics";

const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [prices, setPrices] = useState({
    subtotal: 0,
    discounted_total: 0,
    discounted_amount: 0,
  });
  const [open, setOpen] = useState(false);
  const { data } = useFetchHomeDataQuery({});
  const [promoCode, setPromoCode] = useState("");
  const [startSlide, setStartSlide] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [applyPromo, { isLoading }] = useApplyPromoMutation();
  const { user, cart, promo } = useSelector((state: RootState) => state.global);

  const add = (item: CART) => {
    if (item) {
      dispatch(
        addToCart({
          id: item?.id,
          name: item?.name,
          price: item?.price,
          discount: item?.discount,
          quantity: item?.quantity + 1,
          price_without_vat: item?.price_without_vat,
          thumbnail: item?.thumbnail,
        })
      );
    }
  };

  const remove = (item: CART) => {
    if (item) {
      if (item.quantity === 1) {
        dispatch(removeFromCart(item.id));
      } else {
        const updatedCart = cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i);
        dispatch(setCart(updatedCart));
      }
    }
  };

  const clearPromo = () => {
    setPromoCode("");
    dispatch(setPromo(null));
  };

  const handlePromo = async () => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("customer_id", user?.customer_id!);
    urlencoded.append("promo_code", promoCode);

    try {
      const data = await applyPromo({ data: urlencoded, token: user?.token });
      if (data.error) {
        // @ts-ignore
        toast.error(data.error.data.error);
      } else {
        toast.success("Applied Promo Successfully!");
      }
    } catch (err) {
      toast.error("Promo Expired or Invalid!");
    }

    clearPromo();
  };

  useEffect(() => {
    if (promo) {
      setPromoCode(promo.code);

      const priceList = calculateDiscount(cart, promo);
      setPrices(priceList);
    }
  }, [promo]);

  const getNavLink = (name: string, category_name: string='') => {
    return `/related-services/${getSlug(category_name)}/${getSlug(name)}`;
  };

  return (
    <>
      <GoogleAnalytics />
      <LoginDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
      <LoginModal open={open} setOpen={setOpen} />
      <div className={cn(
        "w-full flex flex-col items-center justify-center gap-5 mt-[50px] md:mt-[108px]",
        cart.length === 0 ? 'mt-5': ''
        )}>
        {cart.length === 0 ? (
          <div className="w-full h-[calc(100vh-76px)] overflow-hidden flex flex-col items-center justify-center">
            <p className="w-full text-center text-2xl sm:text-[30px] font-bold mb-1">
              Your Cart is Empty!
            </p>
            <p className="w-[300px] md:w-[400px] text-center font-medium text-sm sm:text-base text-[#555555] mb-4">
            Looks like you haven’t added anything yet.
            Let’s get you started!
            </p>
            <Image src={EmptyCart} alt="empty-wishlist" className="size-44 " />
            <Link
              href="/home"
              className="mt-6 w-[200px] flex items-center justify-center sm:mt-8 bg-primary text-white rounded-lg text-xs font-bold py-3 px-6 place-self-center"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="w-full sm:bg-gray-100 px-5 md:px-0 h-[calc(100vh-220px)]">
            <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 py-7 sm:pt-14 sm:pb-24">
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 relative w-full flex flex-col items-start justify-start bg-white rounded-xl sm:p-5">
                <h1 className="w-full text-left text-xl flex font-semibold mb-2.5 items-center justify-start">
                  My Cart&nbsp;
                  <span className="text-[#A3A3A3] font-normal text-base">
                    ({cart.length} Items)
                  </span>
                </h1>
                {cart?.map((item, idx) => (
                  <>
                    <div
                      key={idx}
                      className="w-full py-3 flex sm:hidden items-start justify-center border-b"
                    >
                      <Image
                        src={imageBase(item.thumbnail!)}
                        alt="card"
                        width={500}
                        height={500}
                        className="size-16 rounded-md object-cover"
                      />
                      <div className="w-full flex items-center justify-center">
                        <div className="w-[70%] xs:w-[75%] flex flex-col items-center justify-center gap-1 pl-3">
                          <span className="w-full text-left text-sm font-semibold break-words">
                            {item.name}
                          </span>
                          <span className="w-full text-left text-xs font-medium">
                            Qty: {item.quantity}
                          </span>
                          <span className="w-full text-left text-xs font-medium">
                            AED {item.price_without_vat}
                          </span>
                        </div>
                        <div className="w-[30%] xs:w-[25%] h-full flex items-center justify-center mt-5">
                          <div className="w-full flex items-center justify-end gap-2.5">
                            <span
                              onClick={() => {
                                remove(item);
                              }}
                              className="border border-primary size-7 p-1 rounded-md text-black"
                            >
                              <FaMinus className="size-full" />
                            </span>
                            <span className="text-sm font-bold">{item.quantity}</span>
                            <span
                              onClick={() => {
                                add(item);
                              }}
                              className="bg-primary text-white size-7 p-1 rounded-md"
                            >
                              <FaPlus className="size-full" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      key={idx}
                      className="w-full hidden sm:flex items-center justify-around space-x-4 py-3 border-b"
                    >
                      <div className="w-[50%] lg:w-[45%] flex items-center justify-start gap-4">
                        <Image
                          src={imageBase(item.thumbnail!)}
                          alt="card"
                          width={500}
                          height={500}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <span className="text-left text-sm font-semibold overflow-hidden truncate w-full md:w-[1300px]">
                          {item.name}
                        </span>
                      </div>
                      <div className="w-full text-left text-sm">
                        Qty: {item.quantity}
                      </div>
                      <div className="w-full text-left text-sm font-semibold">
                        AED {item.price_without_vat}
                      </div>
                      <div className="w-full flex items-center justify-end space-x-2.5">
                        <span
                          onClick={() => {
                            remove(item);
                          }}
                          className="border border-primary p-2 rounded-lg text-black"
                        >
                          <FaMinus />
                        </span>
                        <span>{item.quantity}</span>
                        <span
                          onClick={() => {
                            add(item);
                          }}
                          className="bg-primary text-white p-2 rounded-lg"
                        >
                          <FaPlus />
                        </span>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div className="col-span-1 w-full h-fit flex flex-col items-start justify-start bg-white rounded-xl sm:p-5">
                <div className="w-full flex items-center text-xs justify-center mt-2 mb-5 bg-[#F5F5F5] rounded-lg px-3 py-2">
                  <BsTicketPerforated className="w-7 h-7 text-black" />
                  <input
                    type="text"
                    value={promoCode}
                    placeholder="Enter Voucher"
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="px-3 w-full bg-transparent text-gray-400 placeholder:text-gray-400"
                  />
                  <button
                    disabled={isLoading || !promoCode?.length}
                    className={cn(
                      `bg-transparent font-semibold`,
                      promo ? "text-[#FF2727]" : "text-primary",
                      !promoCode?.length && 'text-[#AFAFAF]'
                    )}
                  >
                    {isLoading ? (
                      <LuLoader2 className="animate-spin text-primary" />
                    ) : promo ? (
                      <span
                        onClick={() => {
                          setPromoCode("");
                          clearPromo();
                        }}
                      >
                        Remove
                      </span>
                    ) : (
                      <span onClick={handlePromo}>Submit</span>
                    )}
                  </button>
                </div>
                <h1 className="w-full text-left text-xl flex font-semibold mb-5 items-center justify-start">
                  Payment Summary
                </h1>
                <div className="w-full flex flex-col items-center justify-center gap-2.5 text-[#555555]">
                  <div className="w-full flex items-center justify-between font-medium">
                    <span className="text-sm">Sub Total</span>
                    <span className="text-sm">
                      AED&nbsp;
                      {calculateWithoutVAT(cart)}
                    </span>
                  </div>
                  <div className="w-full flex items-center justify-between font-medium">
                    <span className="text-sm">Discount</span>
                    <span className="text-sm">
                      AED&nbsp;{calculateDiscountValue(cart)}
                    </span>
                  </div>
                  <div className="w-full flex items-center justify-between font-medium">
                    <span className="text-sm">VAT</span>
                    <span className="text-sm">
                      AED&nbsp;{Math.round(Number(calculateVAT(cart)))}
                    </span>
                  </div>
                  <div className="w-full flex items-center justify-between font-bold">
                    <span>Grand Total</span>
                    <span>
                      AED&nbsp;
                      {prices.discounted_total !== 0
                        ? new Intl.NumberFormat().format(
                          prices.discounted_total
                        )
                        : Math.round(calculateVAT(cart) + (calculateWithoutVAT(cart) - calculateDiscountValue(cart)))}
                    </span>
                  </div>
                  <div
                    onClick={() => {
                      if (user) {
                        router.push("/check-out");
                      } else {
                        setOpen(true);
                      }
                    }}
                    className="w-full py-2.5 rounded-lg text-sm bg-primary text-white font-medium text-center hidden sm:flex items-center justify-center cursor-pointer !mt-10"
                  >
                    Proceed to Checkout
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="hidden sm:flex w-full md:w-[90%] lg:max-w-[1440px] mx-auto flex-col items-center justify-center gap-5 sm:py-20">
          <h1 className="w-full text-left text-xl font-bold px-5 md:px-0">
            {cart.length === 0 ? "Services You Might Like" : "Related Services"}
          </h1>
          <div className="w-full block sm:hidden">
            <Swiper
              slidesPerView={1.4}
              freeMode={true}
              spaceBetween={10}
              modules={[FreeMode]}
              onSlideChange={(swiper) => {
                if (swiper.activeIndex === 0) {
                  setStartSlide(true);
                } else {
                  setStartSlide(false);
                }
              }}
            >
              {data
                ?.filter((section) => section.rows === "1")
                .slice(0, 1)
                .map((drip, idx) =>
                  drip.section_data.map((drip, i) => (
                    <SwiperSlide
                      key={idx}
                      className={`${startSlide && i === 0 ? "ml-5" : ""}`}
                    >
                      <BestSellingCard drip={drip} navLink={getNavLink(drip.name || '', drip?.category_name)} />
                    </SwiperSlide>
                  ))
                )}
            </Swiper>
          </div>
          <div className="relative w-full px-5 sm:block hidden md:hidden">
            <div className="next-related absolute cursor-pointer z-30 top-[45%] right-2 size-12 rounded-2xl bg-[#F7F7F7] p-4 shadow-md">
              <ChevronRightIcon
                fillColor="#006FAC"
                className="size-full text-primary"
              />
            </div>
            <div className="prev-related absolute cursor-pointer z-30 top-[45%] left-2 size-12 rounded-2xl bg-[#F7F7F7] p-4 shadow-md">
              <ChevronRightIcon
                fillColor="#006FAC"
                className="size-full text-primary rotate-180"
              />
            </div>
            <Swiper
              slidesPerView={2.9}
              freeMode={true}
              spaceBetween={10}
              modules={[FreeMode, Navigation]}
              navigation={{
                nextEl: ".next-related",
                prevEl: ".prev-related",
              }}
            >
              {data
                ?.filter((section) => section.rows === "1")
                .slice(0, 1)
                .map((drip, idx) =>
                  drip.section_data.map((drip) => (
                    <SwiperSlide key={idx}>
                      <BestSellingCard drip={drip} navLink={getNavLink(drip.name || '', drip?.category_name)} />
                    </SwiperSlide>
                  ))
                )}
            </Swiper>
          </div>
          <div className="relative w-full md:block hidden lg:hidden">
            <div className="next-related absolute cursor-pointer z-30 top-[45%] -right-5 size-12 rounded-2xl bg-[#F7F7F7] p-4 shadow-md">
              <ChevronRightIcon
                fillColor="#006FAC"
                className="size-full text-primary"
              />
            </div>
            <div className="prev-related absolute cursor-pointer z-30 top-[45%] -left-5 size-12 rounded-2xl bg-[#F7F7F7] p-4 shadow-md">
              <ChevronRightIcon
                fillColor="#006FAC"
                className="size-full text-primary rotate-180"
              />
            </div>
            <Swiper
              slidesPerView={3.5}
              freeMode={true}
              spaceBetween={10}
              modules={[FreeMode, Navigation]}
              navigation={{
                nextEl: ".next-related",
                prevEl: ".prev-related",
              }}
            >
              {data
                ?.filter((section) => section.rows === "1")
                .slice(0, 1)
                .map((drip, idx) =>
                  drip.section_data.map((drip) => (
                    <SwiperSlide key={idx}>
                      <BestSellingCard drip={drip} navLink={getNavLink(drip.name || '', drip?.category_name)} />
                    </SwiperSlide>
                  ))
                )}
            </Swiper>
          </div>
          <div className="relative w-full lg:block hidden">
            <div className="next-related absolute cursor-pointer z-30 top-[45%] -right-5 size-12 rounded-2xl bg-[#F7F7F7] p-4 shadow-md">
              <ChevronRightIcon
                fillColor="#006FAC"
                className="size-full text-primary"
              />
            </div>
            <div className="prev-related absolute cursor-pointer z-30 top-[45%] -left-5 size-12 rounded-2xl bg-[#F7F7F7] p-4 shadow-md">
              <ChevronRightIcon
                fillColor="#006FAC"
                className="size-full text-primary rotate-180"
              />
            </div>
            <Swiper
              slidesPerView={4.7}
              freeMode={true}
              spaceBetween={10}
              modules={[FreeMode, Navigation]}
              navigation={{
                nextEl: ".next-related",
                prevEl: ".prev-related",
              }}
            >
              {data
                ?.filter((section) => section.rows === "1")
                .slice(0, 1)
                .map((drip, idx) =>
                  drip.section_data.map((drip) => (
                    <SwiperSlide key={idx}>
                      <BestSellingCard drip={drip} navLink={getNavLink(drip.name || '', drip?.category_name)} />
                    </SwiperSlide>
                  ))
                )}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
