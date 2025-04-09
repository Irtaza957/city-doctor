import React from 'react'
import Image from "next/image";
import Clients from "@/assets/icons/clients.svg";
import Quote from "@/assets/icons/quote.svg";
import Avatar from "@/assets/icons/avatar.svg";
import { FaStar } from "react-icons/fa6";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

const FooterSection = () => {
  return (
    <>
      <div className="hidden sm:block bg-[#F5F5F5] py-8 mt-10 w-full">
        <div className='md:w-[90%] lg:max-w-[1440px] mx-auto flex items-center justify-center'>
          <div className="relative w-full">
            <Image
              src={Clients}
              alt="home"
              className="object-cover"
              width={164}
              height={53}
            />
            <p className="text-sm text-[#333333] text-left font-semibold w-[200px] mt-3">1000+ Rely on our secure at home services.</p>
          </div>
          <div className="w-full">
            <div className="flex relative items-center justify-center gap-16 w-full">
              <div className="flex flex-col items-center justify-center gap-0">
                <span className="text-[60px]">30+</span>
                <span className="text-xl -mt-5">Specialists</span>
              </div>
              <div className="flex flex-col items-center justify-center py-2 border-x-2 border-[#DBDBDB] px-16">
                <span className=" text-[60px]">200+</span>
                <span className="text-xl -mt-5">Services</span>
              </div>
              <div className="flex flex-col items-center justify-center py-2 border-r-2 border-[#DBDBDB] pr-16">
                <span className="text-[60px]">10K+</span>
                <span className="text-xl -mt-5 whitespace-nowrap">Happy Patient</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-[60px]">24/7</span>
                <span className="text-xl -mt-5">Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden bg-[#F5F5F5] rounded-2xl flex flex-col items-center justify-center pt-7 pb-12 mx-auto w-[93%] -mt-1">
        <div className="relative">
          <Image
            src={Clients}
            alt="home"
            className="object-cover"
            width={164}
            height={53}
          />
        </div>
        <p className="text-sm text-[#333333] text-center font-semibold w-[200px] mt-3">1000+ Rely on our secure at home services.</p>
        <div className="mt-10">
          <div className="flex relative items-center justify-center border-b border-[#DBDBDB] pb-4 px-8 gap-[68px]">
            <div className='absolute border-l border-[#DBDBDB] h-[180px] -top-[16px]' />
            <div className="flex flex-col items-center justify-center">
              <span className="text-[#333333] font-bold text-3xl">30+</span>
              <span className="text-[#333333] font-semibold text-sm">Specialists</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-[#333333] font-bold text-3xl">200+</span>
              <span className="text-[#333333] font-semibold text-sm">Services</span>
            </div>
          </div>
          <div className="flex items-center justify-center mt-4 gap-[68px]">
            <div className="flex flex-col items-center justify-center">
              <span className="text-[#333333] font-bold text-3xl">10K+</span>
              <span className="text-[#333333] font-semibold text-sm">Customers</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-[#333333] font-bold text-3xl">24/7</span>
              <span className="text-[#333333] font-semibold text-sm">Available</span>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-[90%] lg:max-w-[1440px] mx-auto mt-10 hidden sm:block">
        <div className='flex flex-col justify-center items-center mb-3'>
          <p className="text-[50px] font-bold">Testimonial</p>
          <p className='text-[#606060] text-xl text-center mt-4 w-[85%]'>Get expert medical care at home with licensed doctors available 24/7 in Dubai, Abu Dhabi, and Sharjah. From consultations and prescriptions to minor procedures and lab tests, we bring fast, reliable, and personalized healthcare to your doorstep—within 45 minutes!</p>
          <Image
            src={Clients}
            alt="home"
            className="object-cover mt-14"
            width={220}
            height={70}
          />
        </div>
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          freeMode={true}
          autoplay={{
            delay: 3000,
          }}
          modules={[FreeMode, Autoplay]}
        >
          {[...Array(5)]?.map((_, idx) => (
            <SwiperSlide key={idx}>
              <div className="w-full bg-[#F5F5F5] rounded-[30px] py-5 mt-5">
                <div className="w-full flex items-center justify-end px-6">
                  <Image
                    src={Quote}
                    alt="home"
                    className="object-cover"
                    width={24}
                    height={20}
                  />
                </div>
                <p className="text-[#333333] my-5 font-medium px-6 text-center">
                “ Lorem ipsum dolor sit, amet consectetur adipisicing
                  elit. Laborum sit exercitationem rem. Quae tenetur minus
                  ab autem sequi dolor velit mollitia earum eum totam
                  praesentium esse sed repellat, eligendi alias.
                </p>
                <div className='border-t border-[#DBDBDB] pt-5 flex items-center justify-between w-full'>
                  <div className="flex items-center gap-4 pl-6">
                    <Image
                      src={Avatar}
                      alt="home"
                      className="object-cover"
                      width={50}
                      height={50}
                    />
                    <div>
                      <p className="text-[#333333] font-bold">Sandeep Dev</p>
                      <p className="text-[#333333] font-semibold text-xs">Graphic Artist</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1 pr-6">{[...Array(5)].map((_, idx) => (
                    <FaStar key={idx} className="size-5 text-accent" />
                  ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-[93%] mx-auto mt-6 testimonial sm:hidden">
        <p className="text-[#333333] text-2xl font-bold">Testimonial</p>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          freeMode={true}
          pagination={true}
          autoplay={{
            delay: 3000,
          }}
          modules={[Pagination, FreeMode, Autoplay]}
          className="!pb-10"
        >
          {[...Array(5)]?.map((_, idx) => (
            <SwiperSlide key={idx}>
              <div className="w-full bg-[#F5F5F5] rounded-2xl py-5 px-6 mt-5">
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center justify-center gap-1">{[...Array(5)].map((_, idx) => (
                    <FaStar key={idx} className="size-5 text-accent" />
                  ))}
                  </div>
                  <Image
                    src={Quote}
                    alt="home"
                    className="object-cover"
                    width={24}
                    height={20}
                  />
                </div>
                <p className="text-[#333333] my-5 font-medium text-sm">
                  {idx + 1}. Lorem ipsum dolor sit, amet consectetur adipisicing
                  elit. Laborum sit exercitationem rem. Quae tenetur minus
                  ab autem sequi dolor velit mollitia earum eum totam
                  praesentium esse sed repellat, eligendi alias.
                </p>
                <div className="flex items-center gap-4 border-t border-[#DBDBDB] pt-5">
                  <Image
                    src={Avatar}
                    alt="home"
                    className="object-cover"
                    width={50}
                    height={50}
                  />
                  <div>
                    <p className="text-[#333333] font-bold text-sm">Sandeep Dev</p>
                    <p className="text-[#333333] font-semibold text-xs">Graphic Artist</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}

export default FooterSection