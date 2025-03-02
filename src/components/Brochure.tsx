import Image from "next/image";
// @ts-ignore
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import Slider from "@/assets/img/slider.png";

const Brochure = () => {
  return (
    <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto h-full px-5 pb-5 xl:pb-20">
      <Swiper
        loop={true}
        slidesPerView={1}
        spaceBetween={10}
        pagination={true}
        modules={[Pagination]}
      >
        {[...Array(4)].map((_, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={Slider}
              alt="slider"
              width={1000}
              height={1000}
              className="w-full h-full rounded-3xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brochure;
