/* eslint-disable @next/next/no-img-element */
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import { Pagination, EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { cn, getCategoryLink, imageBase } from "@/utils/helpers";
import HeaderSkeleton from "./cards/skeleton/HeaderSkeleton";
import { useFetchHomeBannersQuery } from "@/store/services/home";
import { useRouter } from "next/router";

interface HeaderProps {
  position: string
}

const Header = ({ position }: HeaderProps) => {
  const router = useRouter()
  const { data, isLoading } = useFetchHomeBannersQuery({});

  const handleBannerClick = (banner: any) => {
    console.log(banner, 'bannerbanner')
    if (banner?.link_to === 'categories_page') {
      router.push(`/${getCategoryLink('', banner?.data?.category_name || '')}`)
    } else if (banner?.link_to === 'sub_categories_page') {
      router.push(`/${getCategoryLink('', banner?.data?.category_name || '')}/${getCategoryLink('', banner?.data?.sub_category || '')}`)
    }else if (banner?.link_to === 'service_detail_page'){
      router.push(`/${getCategoryLink('', banner?.data?.category_name || '')}/${getCategoryLink('', banner?.data?.sub_category_name || '')}/${getCategoryLink('', banner?.data?.service_name || '')}`)
    }

  }
  return (
    <div className={cn(
      `block w-full h-full mb-5 xl:mb-0 `,
      position === 'middle' ? 'mt-5' : 'mt-[69px] sm:mt-[72px] md:mt-[112.5px]'
    )}>
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
          {data?.filter(item => item?.place === String(position))?.map((banner, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex items-center justify-center w-full mt-3 md:mt-0">
                <img
                  src={imageBase(window.innerWidth < 640 ? (banner.mobile_banner || '') : banner.image)}
                  alt="banner"
                  className="w-[95%] rounded-xl md:rounded-none md:w-full"
                  onClick={() => handleBannerClick(banner)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Header;
