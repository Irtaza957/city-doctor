"use client";

import {
  FaStar,
  FaPlus,
  FaMinus,
  FaDroplet,
  FaRegClock,
} from "react-icons/fa6";
import dayjs from "dayjs";
import Image from "next/image";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import { FreeMode, Navigation } from "swiper/modules";
import { IoShareSocialOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import "swiper/css";
import { RootState } from "@/store";
import { imageBase } from "@/utils/helpers";
import Accordion from "@/components/Accordion";
import HeartIcon from "@/assets/icons/HeartIcon";
import DropletIcon from "@/assets/icons/DropletIcon";
import LoginModal from "@/components/modals/LoginModal";
import LoginDrawer from "@/components/drawers/LoginDrawer";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import BestSellingCard from "@/components/cards/BestSellingCard";
import { numberSentences, priceCalculator } from "@/utils/helpers";
import { useAddToWishlistMutation } from "@/store/services/wishlist";
import { addToCart, removeFromCart, toggleSidebar } from "@/store/global";
import he from "he";

const DripDetail = ({ data }: { data: DRIP_DETAIL_RESPONSE }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [startSlide, setStartSlide] = useState(true);
  const [addToWishlist] = useAddToWishlistMutation();
  const [openLoginDrawer, setOpenLoginDrawer] = useState(false);
  const [tab, setTab] = useState<string>(data?.sections[0]?.name);
  const { user, cart } = useSelector((state: RootState) => state.global);

  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleDecrement = () => {
    if (quantity === 0) {
      setQuantity(0);
    } else {
      setQuantity((prev) => prev - 1);
    }
    dispatch(removeFromCart(data.service_id));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
    if (data.service_id !== undefined) {
      dispatch(
        addToCart({
          id: parseInt(data.service_id),
          name: data.service_name,
          price: data.price,
          discount: data.discount_value,
          quantity: 1,
        })
      );
    }
  };

  const like = async () => {
    setWishlist((prev) => (prev = !prev));

    try {
      const urlencoded = new URLSearchParams();
      urlencoded.append("customer_id", user?.customer_id!);
      urlencoded.append("service_id", data?.service_id);

      const response = await addToWishlist({
        data: urlencoded,
        token: user?.token,
      });

      if (response.error) {
        // @ts-ignore
        toast.error(response.error.data.error);
      } else {
        if (wishlist) {
          toast.success("Removed from Wishlist!");
          setWishlist(false);
        } else {
          toast.success("Added to Wishlist!");
          setWishlist(true);
        }
      }
    } catch (error) {
      toast.error("Please Try Again!");
    }
  };

  useEffect(() => {
    if (data.service_id !== undefined) {
      const product = cart.find(
        (item: CART) => item.id === parseInt(data.service_id)
      );

      if (product) {
        setQuantity(product?.quantity);
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      if (data.wishlist_id) {
        setWishlist(true);
      }
    }
  }, [data]);

  return (
    <>
      <LoginModal open={openLogin} setOpen={setOpenLogin} />
      <LoginDrawer
        open={openLoginDrawer}
        onClose={() => setOpenLoginDrawer(false)}
      />
      <div className="w-full sm:hidden mt-[69px] mb-10">
        <Image
          src={`${imageBase(data.thumbnail)}`}
          alt="detail-banner"
          width={1000}
          height={1000}
          className="w-full"
        />
        <div className="w-full flex flex-col items-center justify-center space-y-5 mt-5">
          <div className="w-full flex items-center justify-between px-5">
            <h1 className="text-left font-bold text-xl">{data.service_name}</h1>
            <div className="flex items-center justify-end space-x-4">
              <IoShareSocialOutline className="size-6" />
              <button
                type="button"
                onClick={() => {
                  if (user) {
                    like();
                  } else {
                    setOpenLoginDrawer(true);
                  }
                }}
              >
                <HeartIcon className="size-6" />
              </button>
            </div>
          </div>
          <p className="w-full text-left text-gray-400 text-xs font-medium my-3 px-5">
            {data.description}
          </p>
          <div className="w-full flex items-center justify-start space-x-5 px-5">
            <div className="flex items-center justify-center space-x-2.5">
              <FaDroplet className="w-4 h-4 text-primary" />
              <span className="text-[#A3A3A3] text-xs">{data.size}</span>
            </div>
            <div className="flex items-center justify-center space-x-2.5">
              <FaRegClock className="w-4 h-4 text-primary" />
              <span className="text-[#A3A3A3] text-xs">
                {data.response_time}
              </span>
            </div>
          </div>
          <p className="w-full text-left font-bold text-xl px-5">
            AED {data.price}
          </p>
          <div className="w-full flex flex-col items-center justify-center space-y-2.5 px-5">
            {data.sections.map((section, idx) => (
              <Accordion section={section} key={idx} />
            ))}
          </div>
          <div className="w-full flex flex-col items-center justify-center space-y-5 px-5">
            <h1 className="w-full text-left text-xl font-bold">
              Service Ratings & Reviews
            </h1>
            <div className="w-full grid grid-cols-2 gap-2.5 divide-x divide-gray-400">
              <div className="col-span-1 w-full flex flex-col items-center justify-center space-y-2.5">
                <p className="w-full text-left text-xl font-bold">
                  {data.rating}
                  <span className="text-[#67767E] text-sm font-semibold">
                    &nbsp;/ 5.0
                  </span>
                </p>
                <div className="w-full flex items-center justify-start space-x-1.5">
                  {[...Array(parseInt(data.rating))].map((_, idx) => (
                    <FaStar key={idx} className="size-4 text-accent" />
                  ))}
                  {[...Array(5 - parseInt(data.rating))].map((_, idx) => (
                    <FaStar key={idx} className="size-4 text-[#DDDDDD]" />
                  ))}
                </div>
                <p className="w-full text-left text-xl font-bold">
                  {data.total_reviews}&nbsp;
                  <span className="text-[#67767E] text-sm font-semibold">
                    Ratings
                  </span>
                </p>
              </div>
              <div className="col-span-1 w-full flex flex-col items-center justify-between pl-2.5 text-sm">
                {[...Array(5)].map((_, idx) => (
                  <div key={idx} className="w-full grid grid-cols-12 gap-x-2">
                    <div className="col-span-1 w-full flex items-center justify-center">
                      <span className="font-bold pt-0.5">{5 - idx}</span>
                    </div>
                    <div className="col-span-2 w-full flex items-center justify-center">
                      <FaStar className="text-amber-500 size-4" />
                    </div>
                    <div className="col-span-5 w-full flex items-center justify-center">
                      <div className="w-full border-[3px] rounded-full border-amber-500" />
                    </div>
                    <div className="col-span-4 w-full flex items-center justify-center">
                      <span className="font-bold">1,432</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {data.reviews.map((review, idx) => (
            <div
              key={idx}
              className="w-full flex flex-col items-center justify-center space-x-5 px-5"
            >
              <div className="w-full flex items-center justify-start space-x-6">
                <Image
                  src="https://ui.shadcn.com/avatars/04.png"
                  alt="user"
                  width={40}
                  height={40}
                  className="rounded-full bg-gray-200 size-10"
                />
                <div className="w-full flex flex-col items-center justify-start space-y-1">
                  <div className="w-full flex items-center justify-start space-x-10">
                    <p className="font-bold text-xs">{review.customer}</p>
                    <div className="flex items-center justify-center space-x-1.5">
                      {[...Array(parseInt(review.review))].map((_, idx) => (
                        <FaStar key={idx} className="text-accent" />
                      ))}
                    </div>
                  </div>
                  <span className="w-full text-left text-xs text-gray-400">
                    {dayjs(review?.created_at).format("ddd DD MMM, YYYY")}
                  </span>
                </div>
              </div>
              <p className="w-full pl-[52.5px] text-left text-xs text-[#535763] font-medium pt-3">
                {numberSentences(1, review.description)}
              </p>
            </div>
          ))}
          <div className="w-full px-5">
            <Image
              src={`${imageBase(data.cover_image)}`}
              alt="cover-image"
              width={1000}
              height={1000}
              className="rounded-lg w-full"
            />
          </div>
          <div className="w-full mt-5 lg:mt-10">
            <h1 className="w-full text-left text-xl font-bold mb-5 px-5">
              Customers Also Viewed
            </h1>
            <div className="w-full block">
              <Swiper
                freeMode={true}
                spaceBetween={10}
                slidesPerView={1.5}
                modules={[FreeMode]}
                onSlideChange={(swiper) => {
                  if (swiper.activeIndex === 0) {
                    setStartSlide(true);
                  } else {
                    setStartSlide(false);
                  }
                }}
              >
                {data.similar_services.map((drip, idx) => (
                  <SwiperSlide
                    key={drip.service_id}
                    className={`${startSlide && idx === 0 ? "ml-5" : ""}`}
                  >
                    <BestSellingCard drip={drip} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center space-y-5 px-5">
            <h1 className="w-full text-left text-xl font-bold">FAQs</h1>
            <div className="w-full flex flex-col items-center justify-center space-y-2.5">
              {data.faqs.map((section, idx) => (
                <Accordion section={section} key={idx} />
              ))}
            </div>
          </div>
          <div className="fixed w-full z-20 bottom-[68px] left-0 p-3 bg-white border-t">
            {quantity === 0 ? (
              <button
                onClick={() => handleIncrement()}
                className="w-full h-[40px] rounded-lg bg-primary border border-primary text-white text-[18px] font-semibold"
              >
                Add to Cart
              </button>
            ) : (
              <div className="w-full flex items-center justify-center gap-6">
                <span
                  onClick={handleDecrement}
                  className="size-10 px-2 rounded-lg text-primary border border-primary flex items-center justify-center"
                >
                  <FaMinus />
                </span>
                <span className="text-lg font-bold w-4 text-center">
                  {quantity}
                </span>
                <span
                  onClick={handleIncrement}
                  className="size-10 px-2 rounded-lg bg-primary text-white border border-primary hover:bg-primary hover:text-white flex items-center justify-center"
                >
                  <FaPlus />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto hidden sm:block sm:mt-[82.75px] md:mt-[125px] sm:px-5 md:px-0 py-5 mb-20">
        <div className="w-full h-[375px] md:h-[500px] flex items-start justify-start gap-5 md:gap-10">
          <div className="w-2/5 xl:w-1/3 max-h-full">
            <div
              style={{ backgroundImage: `url(${imageBase(data.thumbnail)})` }}
              className="bg-top bg-cover w-full h-[375px] md:h-[500px] rounded-lg"
            />
          </div>
          <div className="w-3/5 xl:w-2/3 flex flex-col items-start justify-start gap-y-1.5">
            <h1 className="w-full text-left font-bold text-2xl xl:text-4xl">
              {data.service_name}
            </h1>
            <div className="w-full flex items-center justify-start gap-1">
              {[...Array(parseInt(data.rating))].map((_, idx) => (
                <FaStar key={idx} className="size-4 text-accent" />
              ))}
              {[...Array(5 - parseInt(data.rating))].map((_, idx) => (
                <FaStar key={idx} className="size-4 text-gray-300" />
              ))}
            </div>
            <div className="w-full flex items-center justify-start space-x-10 mt-1.5">
              <div className="flex items-center justify-center space-x-2.5">
                <DropletIcon
                  fillColor="#006FAC"
                  className="w-4 h-4 text-transparent"
                />
                <span className="text-[#A3A3A3] font-medium text-sm">
                  {data.size}
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2.5">
                <FaRegClock className="w-4 h-4 text-primary" />
                <span className="text-[#A3A3A3] font-medium text-sm">
                  {data.response_time}
                </span>
              </div>
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: he.decode(data.description),
              }}
              className="w-full text-left text-[#535763] text-sm font-medium my-6"
            />
            <div className="w-full flex items-center justify-start space-x-10 mb-4">
              <p className="text-left text-lg text-[#A3A3A3] font-medium line-through">
                AED&nbsp;
                {isNaN(
                  Math.round(
                    priceCalculator(
                      data.discount_type,
                      data.price,
                      data.discount_value
                    )
                  )
                )
                  ? "0"
                  : Math.round(
                      priceCalculator(
                        data.discount_type,
                        data.price,
                        data.discount_value
                      )
                    )}
                .00
              </p>
              <p className="text-left text-xl font-semibold">
                AED {data.price}
              </p>
            </div>
            <div className="w-full md:w-3/6 xl:w-3/6 gap-2.5 flex items-center justify-center">
              <div className="w-full flex-1">
                {quantity === 0 ? (
                  <button
                    onClick={() => {
                      handleIncrement();
                      handleSidebar();
                    }}
                    className="w-full h-[46px] rounded-md bg-primary border border-primary text-white font-medium"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="w-full flex items-center justify-start gap-5">
                    <span
                      onClick={handleDecrement}
                      className="size-[46px] px-2 rounded-lg text-primary border border-primary hover:bg-primary hover:text-white flex items-center justify-center cursor-pointer"
                    >
                      <FaMinus />
                    </span>
                    <span className="text-lg font-bold">{quantity}</span>
                    <span
                      onClick={handleIncrement}
                      className="size-[46px] px-2 rounded-lg text-primary border border-primary hover:bg-primary hover:text-white flex items-center justify-center cursor-pointer"
                    >
                      <FaPlus />
                    </span>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  if (user) {
                    like();
                  } else {
                    setOpenLogin(true);
                  }
                }}
                className="bg-[#F5F5F5] rounded-lg flex items-center justify-center size-[46px] p-2.5"
              >
                <HeartIcon
                  fillColor={wishlist ? "#006FAC" : "transparent"}
                  className={`size-full ${
                    !wishlist ? "text-primary" : "text-transparent"
                  }`}
                />
              </button>
              <button
                type="button"
                className="bg-[#F5F5F5] rounded-lg flex items-center justify-center size-[46px] p-2.5"
              >
                <IoShareSocialOutline className="size-full text-primary" />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center mt-10 space-y-5">
          <div className="w-full flex space-x-2.5 bg-[#F5F5F5] p-4 rounded-lg">
            {data.sections.map((section, idx) => (
              <p
                key={idx}
                onClick={() => setTab(section.name)}
                className={`text-center px-9 py-2.5 cursor-pointer rounded-full font-semibold text-xs md:text-sm ${
                  tab === section.name
                    ? "bg-primary text-white"
                    : "bg-[#DDDDDD] text-[#555555]"
                }`}
              >
                {section.name}
              </p>
            ))}
          </div>
          {data.sections
            .filter((section) => section.name === tab)
            .map((section, idx) => (
              <p
                key={idx}
                className="w-full text-left text-[#535763] font-medium px-4 text-sm"
                dangerouslySetInnerHTML={{
                  __html: he.decode(section.description),
                }}
              />
            ))}
        </div>
        <div className="w-full grid grid-cols-2 gap-5 my-5 lg:my-10">
          <h1 className="col-span-2 w-full text-left text-xl font-bold">
            Service Ratings & Reviews
          </h1>
          <div className="col-span-1 w-full grid grid-cols-2 gap-2.5 divide-x divide-gray-400">
            <div className="col-span-1 w-full flex flex-col items-center justify-center space-y-2.5">
              <p className="w-full text-left text-2xl font-bold">
                {data.rating}
                <span className="text-[#67767E] text-lg font-medium">
                  &nbsp;/ 5.0
                </span>
              </p>
              <div className="w-full flex items-center justify-start gap-1.5">
                {[...Array(parseInt(data.rating))].map((id, idx) => (
                  <FaStar key={idx} className="w-6 h-6 text-accent" />
                ))}
                {[...Array(5 - parseInt(data.rating))].map((id, idx) => (
                  <FaStar key={idx} className="w-6 h-6 text-[#DDDDDD]" />
                ))}
              </div>
              <p className="w-full text-left text-2xl font-bold">
                {data.total_reviews}&nbsp;
                <span className="text-[#67767E] text-lg font-medium">
                  Ratings
                </span>
              </p>
            </div>
            <div className="col-span-1 w-full flex flex-col pl-2.5">
              {[...Array(5)].map((_, idx) => (
                <div key={idx} className="w-full grid grid-cols-12 gap-x-2">
                  <div className="col-span-1 w-full flex items-center justify-center">
                    <span className="font-extrabold pt-0.5">{5 - idx}</span>
                  </div>
                  <div className="col-span-2 w-full flex items-center justify-center">
                    <FaStar className="text-amber-500 size-4" />
                  </div>
                  <div className="col-span-5 w-full flex items-center justify-center">
                    <div className="w-full border-[3px] rounded-full border-amber-500" />
                  </div>
                  <div className="col-span-4 w-full flex items-center justify-center">
                    <span className="font-medium">1,432</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full col-span-2 mt-5 flex flex-col space-y-5">
            {data.reviews.map((review, idx) => (
              <div
                key={idx}
                className="w-full flex flex-col items-center justify-center space-x-5"
              >
                <div className="w-full flex items-center justify-start space-x-6">
                  <Image
                    src="https://ui.shadcn.com/avatars/04.png"
                    alt="user"
                    width={50}
                    height={50}
                    className="rounded-full bg-gray-200"
                  />
                  <div className="w-full flex flex-col items-center justify-start space-y-1">
                    <div className="w-full flex items-center justify-start space-x-10">
                      <p className="font-bold">{review.customer}</p>
                      <div className="flex items-center justify-center gap-0.5">
                        {[...Array(parseInt(review.review))].map((id, idx) => (
                          <FaStar key={idx} className="text-accent" />
                        ))}
                        {[...Array(5 - parseInt(review.review))].map(
                          (id, idx) => (
                            <FaStar key={idx} className="text-gray-300" />
                          )
                        )}
                      </div>
                    </div>
                    <span className="w-full text-left text-xs text-gray-400">
                      {dayjs(review?.created_at).format("ddd DD MMM, YYYY")}
                    </span>
                  </div>
                </div>
                <p className="w-full pl-16 text-left text-sm text-[#535763] font-medium pt-3">
                  {review.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <Image
          src={`${imageBase(data.cover_image)}`}
          alt="cover-image"
          width={1000}
          height={1000}
          className="rounded-lg w-full"
        />
        {data.similar_services.length !== 0 && (
          <div className="w-full mt-5 lg:mt-10">
            <h1 className="w-full text-left text-xl font-bold mb-5">
              Customers Also Viewed
            </h1>
            <div className="relative w-full hidden sm:block md:hidden">
              <div className="next-detail absolute cursor-pointer z-30 top-[45%] right-2 size-12 rounded-2xl bg-gray-100 p-4 shadow-md">
                <ChevronRightIcon
                  fillColor="#006FAC"
                  className="size-full text-primary"
                />
              </div>
              <div className="prev-detail absolute cursor-pointer z-30 top-[45%] left-2 size-12 rounded-2xl bg-gray-100 p-4 shadow-md">
                <ChevronRightIcon
                  fillColor="#006FAC"
                  className="size-full text-primary rotate-180"
                />
              </div>
              <Swiper
                freeMode={true}
                spaceBetween={10}
                slidesPerView={3.1}
                modules={[FreeMode, Navigation]}
                navigation={{
                  nextEl: ".next-detail",
                  prevEl: ".prev-detail",
                }}
              >
                {data.similar_services.map((drip) => (
                  <SwiperSlide key={drip.service_id}>
                    <BestSellingCard drip={drip} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="relative w-full hidden md:block lg:hidden">
              <div className="next-detail absolute cursor-pointer z-30 top-[45%] -right-5 size-12 rounded-2xl bg-gray-100 p-4 shadow-md">
                <ChevronRightIcon
                  fillColor="#006FAC"
                  className="size-full text-primary"
                />
              </div>
              <div className="prev-detail absolute cursor-pointer z-30 top-[45%] -left-5 size-12 rounded-2xl bg-gray-100 p-4 shadow-md">
                <ChevronRightIcon
                  fillColor="#006FAC"
                  className="size-full text-primary rotate-180"
                />
              </div>
              <Swiper
                freeMode={true}
                spaceBetween={10}
                slidesPerView={3.5}
                modules={[FreeMode, Navigation]}
                navigation={{
                  nextEl: ".next-detail",
                  prevEl: ".prev-detail",
                }}
              >
                {data.similar_services.map((drip) => (
                  <SwiperSlide key={drip.service_id}>
                    <BestSellingCard drip={drip} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="relative w-full hidden lg:block xl:hidden">
              <div className="next-detail absolute cursor-pointer z-30 top-[45%] -right-5 size-12 rounded-2xl bg-gray-100 p-4 shadow-md">
                <ChevronRightIcon
                  fillColor="#006FAC"
                  className="size-full text-primary"
                />
              </div>
              <div className="prev-detail absolute cursor-pointer z-30 top-[45%] -left-5 size-12 rounded-2xl bg-gray-100 p-4 shadow-md">
                <ChevronRightIcon
                  fillColor="#006FAC"
                  className="size-full text-primary rotate-180"
                />
              </div>
              <Swiper
                freeMode={true}
                spaceBetween={10}
                slidesPerView={4.1}
                modules={[FreeMode, Navigation]}
                navigation={{
                  nextEl: ".next-detail",
                  prevEl: ".prev-detail",
                }}
              >
                {data.similar_services.map((drip) => (
                  <SwiperSlide key={drip.service_id}>
                    <BestSellingCard drip={drip} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="relative w-full hidden xl:block">
              <div className="next-detail absolute cursor-pointer z-30 top-[45%] -right-5 size-12 rounded-2xl bg-gray-100 p-4 shadow-md">
                <ChevronRightIcon
                  fillColor="#006FAC"
                  className="size-full text-primary"
                />
              </div>
              <div className="prev-detail absolute cursor-pointer z-30 top-[45%] -left-5 size-12 rounded-2xl bg-gray-100 p-4 shadow-md">
                <ChevronRightIcon
                  fillColor="#006FAC"
                  className="size-full text-primary rotate-180"
                />
              </div>
              <Swiper
                freeMode={true}
                spaceBetween={10}
                slidesPerView={4.7}
                modules={[FreeMode, Navigation]}
                navigation={{
                  nextEl: ".next-detail",
                  prevEl: ".prev-detail",
                }}
              >
                {data.similar_services.map((drip) => (
                  <SwiperSlide key={drip.service_id}>
                    <BestSellingCard drip={drip} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
        <div className="w-full flex flex-col items-center space-y-5 mt-5 lg:mt-10">
          <h1 className="col-span-2 w-full text-left text-xl font-bold">
            FAQs
          </h1>
          <div className="w-full flex flex-col items-center justify-center space-y-2.5">
            {data.faqs.map((section, idx) => (
              <Accordion section={section} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DripDetail;

export async function getStaticPaths() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/services`,
    {
      method: "GET",
      headers: {
        company_id: `${process.env.NEXT_PUBLIC_COMPANY_ID!}`,
        secret_key: `${process.env.NEXT_PUBLIC_SECRET_KEY!}`,
        business_id: `${process.env.NEXT_PUBLIC_BUSINESS_ID!}`,
      },
    }
  );

  const drips: DRIP_RESPONSE = await response.json();

  const paths = drips.data.map((service: DRIP_CARD) => ({
    params: { id: `${service?.service_id!}` },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/services?id=${params.id}`,
    {
      method: "GET",
      headers: {
        "company-id": `${process.env.NEXT_PUBLIC_COMPANY_ID!}`,
        "secret-key": `${process.env.NEXT_PUBLIC_SECRET_KEY!}`,
        "business-id": `${process.env.NEXT_PUBLIC_BUSINESS_ID!}`,
      },
    }
  );
  const service: { status: number; error: string; data: DRIP_DETAIL_RESPONSE } =
    await response.json();

  return { props: { data: service.data } };
}
