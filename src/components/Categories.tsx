"use client";

import Link from "next/link";
import Image from "next/image";
// @ts-ignore
import { FreeMode } from "swiper/modules";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";

import "swiper/css";
import { cn, getCategoryLink, imageBase } from "@/utils/helpers";
import { setSelectedCategory } from "@/store/global";
import CategorySkeletion from "./cards/skeleton/CategorySkeletion";
import { useFetchCategoriesQuery } from "@/store/services/category";
import he from "he";

const Categories = () => {
  const dispatch = useDispatch();
  const categoryRef = useRef<HTMLDivElement>(null);
  const categoryDRef = useRef<HTMLDivElement>(null);
  // const [startSlide, setStartSlide] = useState(true);
  const [showSlider, setShowSlider] = useState(false);
  const { data, isLoading } = useFetchCategoriesQuery({});

  const selectCategory = (value: CATEGORY) => {
    dispatch(setSelectedCategory(value));
  };

  useEffect(() => {
    let hasUserInteracted = false;
    setShowSlider(false); // Ensure showSlider resets on mount

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (!hasUserInteracted) return;

      entries.forEach((entry) => {
        const adjustedTop = entry.boundingClientRect.top - 120;
        console.log(entry.intersectionRatio, adjustedTop, "adjustedTopadjustedTop");

        if (entry.intersectionRatio === 0 && adjustedTop <= 0) {
          setShowSlider(true);
        } else {
          setShowSlider(false);
        }
      });
    };

    const handleScroll = () => {
      hasUserInteracted = true;
    };

    const observerOptions = {
      root: null,
      threshold: [0, 1],
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (categoryRef.current) observer.observe(categoryRef.current);
    if (categoryDRef.current) observer.observe(categoryDRef.current);

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (categoryRef.current) observer.unobserve(categoryRef.current);
      if (categoryDRef.current) observer.unobserve(categoryDRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]); // Keep dependencies minimal



  return (
    <>
      <div
        className={cn(
          `fixed w-full shadow-md z-40 top-[69px] sm:top-[71.75px] md:top-[116px] 3xl:top-[115px] left-0 bg-white md:border-b xl:border-none`,
          showSlider ? "flex" : "hidden"
        )}
      >
        <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto sm:px-5 md:px-0">
          <div className="flex items-center justify-center gap-1.5 sm:hidden py-2.5 px-3">
            {data?.map((category, idx) => (
              <div
                key={idx}
              >
                <Link
                  href={getCategoryLink(category.category_id, category.category_name)}
                  onClick={() => selectCategory(category)}
                  className={"w-full text-black flex items-center justify-center gap-1 cursor-pointer py-2 px-1.5 rounded-lg"}
                  style={{ backgroundColor: category?.color || "#F0F0F0" }}
                >
                  {/* <Image
                  src={`${imageBase(category.icon)}`}
                  alt="icon"
                  width={56}
                  height={56}
                  className="w-[26px] h-[26px]"
                /> */}
                  <span className="text-center font-semibold text-[10px] h-[30px] line-clamp-2" dangerouslySetInnerHTML={{ __html: he.decode(category.category_name) }} />
                </Link>
              </div>
            ))}
          </div>
          {/* <div className="block sm:hidden py-2.5">
            <Swiper
              freeMode={true}
              spaceBetween={5}
              slidesPerView={3.40}
              modules={[FreeMode]}
              // onSlideChange={(swiper) => {
              //   if (swiper.activeIndex === 0) {
              //     setStartSlide(true);
              //   } else {
              //     setStartSlide(false);
              //   }
              // }}
               className="!pl-3 !pr-2"
            >
              {data?.map((category, idx) => (
                <SwiperSlide
                  key={idx}
                  // className={`${startSlide && idx === 0 ? "ml-3" : ""}`}
                >
                  <Link
                    href={getCategoryLink(category.category_id, category.category_name)}
                    onClick={() => selectCategory(category)}
                    className={"w-full text-black flex items-center justify-center gap-1 cursor-pointer py-2 px-1.5 rounded-lg"}
                    style={{ backgroundColor: category?.color || "#F0F0F0" }}
                  >
                    <Image
                      src={`${imageBase(category.icon)}`}
                      alt="icon"
                      width={56}
                      height={56}
                      className="w-[26px] h-[26px]"
                    />
                    <span className="text-left font-bold text-[10px] h-[30px] w-[64px] line-clamp-2 md:whitespace-nowrap" dangerouslySetInnerHTML={{ __html: he.decode(category.category_name) }} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div> */}
          <div className="w-full hidden sm:block md:hidden py-2.5">
            <Swiper
              freeMode={true}
              spaceBetween={10}
              slidesPerView={4}
              modules={[FreeMode]}
            >
              {data?.map((category, idx) => (
                <SwiperSlide key={idx}>
                  <Link
                    href={getCategoryLink(category.category_id, category.category_name)}
                    onClick={() => selectCategory(category)}
                    className={cn("w-full flex items-center justify-center cursor-pointer gap-4 py-2 pr-3 pl-4 rounded-lg")}
                    style={{ backgroundColor: category?.color || "#F0F0F0" }}
                  >
                    <Image
                      src={`${imageBase(category.icon)}`}
                      alt="icon"
                      width={56}
                      height={56}
                      className="w-7 h-7"
                    />
                    <span className="text-left font-bold text-xs line-clamp-2 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: he.decode(category.category_name) }} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="w-full hidden md:block lg:hidden py-2.5">
            <Swiper
              freeMode={true}
              spaceBetween={10}
              slidesPerView={4}
              modules={[FreeMode]}
            >
              {data?.map((category, idx) => (
                <SwiperSlide key={idx} className="w-full">
                  <Link
                    href={getCategoryLink(category.category_id, category.category_name)}
                    onClick={() => selectCategory(category)}
                    className={cn("w-full flex items-center justify-center cursor-pointer gap-4 py-2 pr-3 pl-4 rounded-lg bg-[#F0F0F0] text-black")}
                    style={{ backgroundColor: category?.color || "#F0F0F0" }}
                  >
                    <Image
                      src={`${imageBase(category.icon)}`}
                      alt="icon"
                      width={56}
                      height={56}
                      className="w-7 h-7"
                    />
                    <span className="text-left font-bold text-xs whitespace-nowrap" dangerouslySetInnerHTML={{ __html: he.decode(category.category_name) }} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="w-full hidden lg:block py-2.5">
            <Swiper
              freeMode={true}
              spaceBetween={10}
              slidesPerView={4}
              modules={[FreeMode]}
            >
              {data?.map((category, idx) => (
                <SwiperSlide key={idx} className="w-full">
                  <Link
                    href={getCategoryLink(category.category_id, category.category_name)}
                    onClick={() => selectCategory(category)}
                    className={"w-full text-black flex items-center justify-center cursor-pointer gap-4 py-2 pr-3 pl-4 rounded-lg"}
                    style={{ backgroundColor: category?.color || "#F0F0F0" }}
                  >
                    <Image
                      src={`${imageBase(category.icon)}`}
                      alt="icon"
                      width={56}
                      height={56}
                      className="size-7 lg:size-9 3xl:size-9"
                    />
                    <span className="text-left font-bold text-sm line-clamp-2 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: he.decode(category.category_name) }} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div
        ref={categoryDRef}
        className="w-full hidden md:flex items-center justify-center"
      >
        <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto xl:pt-5 pb-4 flex items-center justify-center gap-3">
          {isLoading
            ? [...Array(6)].map((_, idx) => <CategorySkeletion key={idx} />)
            : data?.map((category) => (
              <Link
                href={getCategoryLink(category.category_id, category.category_name)}
                key={category.category_id}
                onClick={() => selectCategory(category)}
                className={cn("w-full flex flex-col items-center justify-between space-y-3 text-black")}
                >
                <div 
                  style={{ backgroundColor: category?.color || "#F5F5F5" }} 
                  className="pt-5 px-6 lg:px-12 xl:px-14 3xl:px-12 rounded-2xl pb-0 shadow-sm">
                  <Image
                    src={`${imageBase(category.icon)}`}
                    width={274}
                    height={274}
                    alt="category"
                    className="-mb-2.5"
                  />
                </div>
                <span className="w-full whitespace-nowrap line-clamp-2 text-center text-sm !leading-[18px] lg:text-base xl:text-lg 3xl:text-xl lg:!leading-[22px] xl:!leading-[24px] 3xl:!leading-[26px] font-bold" dangerouslySetInnerHTML={{ __html: he.decode(category.category_name) }} />
              </Link>
            ))}
        </div>
      </div>
      <div ref={categoryRef} className="flex md:hidden w-full px-3 pb-1">
        <div
          className={`w-full h-full ${showSlider && "invisible"
            } grid grid-cols-4 sm:grid-cols-3 items-center justify-center gap-1.5`}
        >
          {isLoading
            ? [...Array(4)].map((_, idx) => <CategorySkeletion key={idx} />)
            : data?.map((category) => (
              <Link
                href={getCategoryLink(category.category_id, category.category_name)}
                key={category.category_id}
                onClick={() => selectCategory(category)}
                className={cn("col-span-1 w-full flex flex-col items-center justify-start space-y-2 text-black")}
              >
                  <Image
                    src={`${imageBase(category.icon)}`}
                    width={78}
                    height={78}
                    alt="category"
                    className="w-full h-full rounded-xl bg-gray-100 px-1.5 pt-1 pb-0"
                    style={{ backgroundColor: category?.color || "#F5F5F5" }}
                  />
                <span className="text-center font-semibold text-[11px] line-clamp-2 w-[80px] h-8" dangerouslySetInnerHTML={{ __html: he.decode(category.category_name) }} />
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
