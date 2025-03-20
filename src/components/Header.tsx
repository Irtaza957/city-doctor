/* eslint-disable @next/next/no-img-element */
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import { Pagination, EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { imageBase } from "@/utils/helpers";
import HeaderSkeleton from "./cards/skeleton/HeaderSkeleton";
import { useFetchHomeBannersQuery } from "@/store/services/home";

interface HeaderProps{
  position: string
}

const Header = ({position}: HeaderProps) => {
  const { data, isLoading } = useFetchHomeBannersQuery({});
  return (
    <div className={`block w-full h-full mb-5 xl:mb-0 ${position==='middle' ? 'mt-5' : 'mt-[69px] sm:mt-[72px] md:mt-[112.5px]'}`}>
      {isLoading ? (
        <Swiper
          loop={true}
          effect={"fade"}
          slidesPerView={1}
          spaceBetween={10}
          pagination={true}
          autoplay={{
            delay: 3000,
          }}
          modules={[Pagination, EffectFade, Autoplay]}
        >
          {[...Array(5)].map((_, idx) => (
            <SwiperSlide key={idx}>
              <HeaderSkeleton key={idx} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Swiper
          loop={true}
          effect={"fade"}
          slidesPerView={1}
          spaceBetween={10}
          pagination={true}
          autoplay={{
            delay: 3000,
          }}
          modules={[Pagination, EffectFade, Autoplay]}
        >
          {data?.filter(item=> item?.place===String(position))?.map((banner, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={imageBase(window.innerWidth < 640 ? (banner.mobile_banner || '') : banner.image)}
                alt="banner"
                className="w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Header;
