"use client";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import { formatString, getSlug } from "@/utils/helpers";
import { setSelectedCategory } from "@/store/global";
import DoctorVisitCard from "./cards/DoctorVisitCard";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";

import Link from "next/link";
// import { useState } from "react";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import { Grid, Navigation, FreeMode } from "swiper/modules";
import he from "he";

const DoctorVisit = ({ bg, section }: { bg: string; section: DRIP }) => {
  const dispatch = useDispatch();
  // const [startSlide, setStartSlide] = useState(true);
  // const checkID =
  //   (section?.section_data.length / 2) % 4 === 0
  //     ? section?.section_data.length / 2
  //     : (section?.section_data.length / 2) + 1;

  const clearCategory = () => {
    dispatch(setSelectedCategory(null));
  };
  const getNavLink = (name: string, category_name: string='') => {
    return `/${getSlug(section.section)}/${getSlug(category_name)}/${getSlug(name)}`;
  };

  return (
    <div className={`w-full flex items-center justify-center ${bg}`}>
      <div
        id="doctor"
        className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto h-full pt-7 pb-8"
      >
        <div className="w-full h-full flex items-center justify-between mb-5 px-5 md:px-0">
          <h1 className="text-left text-xl xl:text-2xl font-bold" dangerouslySetInnerHTML={{ __html: he.decode(section.section) }}/>
          <Link
            onClick={clearCategory}
            className="text-sm text-primary font-medium"
            href={`/home/${section.section
              .toLowerCase()
              .split(" ")
              .join("-")}`}
          >
            View All
          </Link>
        </div>
        <div className="w-full block sm:hidden px-5">
          <Swiper
            modules={[Grid, FreeMode]}
            slidesPerView={1.05}
            grid={{
              rows: 2,
              fill: "row",
            }}
            freeMode={true}
            style={{ boxShadow: "5px 0 5px -5px lightgray" }}
            // onSlideChange={(swiper) => {
            //   if (swiper.activeIndex === 0) {
            //     setStartSlide(true);
            //   } else {
            //     setStartSlide(false);
            //   }
            // }}
            className="mx-5 px-5"
          >
            {section.section_data.map((drip, idx) => (
              <SwiperSlide
                key={idx}
              >
                <DoctorVisitCard drip={drip} navLink={getNavLink(drip.name || '', drip?.category_name)} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="relative w-full hidden px-5 sm:block md:hidden">
          <div
            className={`next-${formatString(
              section.section
            )} absolute cursor-pointer z-30 top-[45%] right-2 size-12 rounded-2xl bg-white p-4 shadow-md`}
          >
            <ChevronRightIcon
              fillColor="#38ADA0"
              className="size-full text-secondary"
            />
          </div>
          <div
            className={`prev-${formatString(
              section.section
            )} absolute cursor-pointer z-30 top-[45%] left-2 size-12 rounded-2xl bg-white p-4 shadow-md`}
          >
            <ChevronRightIcon
              fillColor="#38ADA0"
              className="size-full text-secondary rotate-180"
            />
          </div>
          <Swiper
            modules={[Grid, Navigation]}
            slidesPerView={1.9}
            grid={{
              rows: 2,
              fill: "row",
            }}
            navigation={{
              nextEl: `.next-${formatString(section.section)}`,
              prevEl: `.prev-${formatString(section.section)}`,
            }}
            style={{ boxShadow: "5px 0 5px -5px lightgray" }}
          >
            {section.section_data.map((drip, idx) => (
              <SwiperSlide key={idx}>
                <DoctorVisitCard drip={drip} navLink={getNavLink(drip.name || '', drip?.category_name)} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="relative w-full hidden md:block xl:hidden">
          <div
            className={`next-${formatString(
              section.section
            )} absolute cursor-pointer z-30 top-[45%] -right-5 size-12 rounded-2xl bg-white p-4 shadow-md`}
          >
            <ChevronRightIcon
              fillColor="#38ADA0"
              className="size-full text-secondary"
            />
          </div>
          <div
            className={`prev-${formatString(
              section.section
            )} absolute cursor-pointer z-30 top-[45%] -left-5 size-12 rounded-2xl bg-white p-4 shadow-md`}
          >
            <ChevronRightIcon
              fillColor="#38ADA0"
              className="size-full text-secondary rotate-180"
            />
          </div>
          <Swiper
            modules={[Grid, Navigation]}
            slidesPerView={2.3}
            grid={{
              rows: 2,
              fill: "row",
            }}
            navigation={{
              nextEl: `.next-${formatString(section.section)}`,
              prevEl: `.prev-${formatString(section.section)}`,
            }}
            style={{ boxShadow: "5px 0 5px -5px lightgray" }}
          >
            {section.section_data.map((drip, idx) => (
              <SwiperSlide key={idx}>
                <DoctorVisitCard drip={drip} navLink={getNavLink(drip.name || '', drip?.category_name)} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="relative w-full hidden xl:block">
          <div
            className={`next-${formatString(
              section.section
            )} absolute cursor-pointer z-30 top-[45%] -right-5 size-12 rounded-2xl bg-white p-4 shadow-md`}
          >
            <ChevronRightIcon
              fillColor="#38ADA0"
              className="size-full text-secondary"
            />
          </div>
          <div
            className={`prev-${formatString(
              section.section
            )} absolute cursor-pointer z-30 top-[45%] -left-5 size-12 rounded-2xl bg-white p-4 shadow-md`}
          >
            <ChevronRightIcon
              fillColor="#38ADA0"
              className="size-full text-secondary rotate-180"
            />
          </div>
          <Swiper
            modules={[Grid, Navigation]}
            slidesPerView={2.9}
            grid={{
              rows: 2,
              fill: "row",
            }}
            navigation={{
              nextEl: `.next-${formatString(section.section)}`,
              prevEl: `.prev-${formatString(section.section)}`,
            }}
            style={{ boxShadow: "5px 0 5px -5px lightgray" }}
          >
            {section.section_data.map((drip, idx) => (
              <SwiperSlide key={idx}>
                <DoctorVisitCard drip={drip} navLink={getNavLink(drip.name || '', drip?.category_name)} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default DoctorVisit;
