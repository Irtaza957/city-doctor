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
                <p className="text-[#333333] my-5 font-medium">
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
                    <p className="text-[#333333] font-bold">Sandeep Dev</p>
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