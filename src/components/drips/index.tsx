"use client";

import Link from "next/link";
import Image from "next/image";
import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
// @ts-ignore
import { FreeMode } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";

import "swiper/css";
import {
  useFetchCategoriesQuery,
  useFetchSubCategoriesMutation,
} from "@/store/services/category";
import { getCategoryLink, getSlug, imageBase, sort } from "@/utils/helpers";
import EmptyResults from "@/assets/img/empty-results.svg";
import DoctorVisitListingCard from "@/components/cards/DoctorVisitListingCard";
import BestSellingListingCard from "@/components/cards/BestSellingListingCard";
import CategorySliderSkeleton from "@/components/cards/skeleton/CategorySliderSkeleton";
import he from "he";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
// import DoctorHomeVisit from "./CategoriesContent/DoctorHomeVisit";
// import IVDrip from "./CategoriesContent/IVDrip";
// import LabText from "./CategoriesContent/LabText";
// import Physiotherapy from "./CategoriesContent/Physiotherapy";
import MobileViewListing from "./MobileViewListing";
import DoctorVisitSkeleton from "../cards/skeleton/DoctorVisitSkeleton";

export const sortingOptions = [
  {
    id: 1,
    name: "Price (Low to High)",
  },
  {
    id: 2,
    name: "Price (High to Low)",
  },
  {
    id: 3,
    name: "Alphabetically",
  },
];

const DripListing = () => {
  const [limit, setLimit] = useState("All");
  const tabSubCatRef = useRef<SwiperRef>(null);
  const [viewType, setViewType] = useState(false);
  const mobileSubCatRef = useRef<SwiperRef>(null);
  const desktopSubCatRef = useRef<SwiperRef>(null);
  const [startSlide, setStartSlide] = useState(true);
  const [getSubCategories, { isLoading: subLoading }] =
    useFetchSubCategoriesMutation();
  const { data, isLoading } = useFetchCategoriesQuery({});
  const [activeCategory, setActiveCategory] = useState("0");
  const [sorting, setSorting] = useState("Price (Low to High)");
  const [selectedCategory, setSelectedCategory] = useState<CATEGORY | null>();
  const [hoveredSubCat, setHoveredSubCat] = useState<string | null>();
  const [subCategories, setSubCategories] = useState<SERVICE_LIST[] | null>(
    null
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const pathname = usePathname()
  // const path = pathname?.split('/')?.[1]
  const router = useRouter()

  // const scrollToElement = (elementId: string) => {
  //   const element = document.getElementById(elementId);

  //   if (element) {
  //     const elementRect = element.getBoundingClientRect();
  //     const scrollTop = window.scrollY || document.documentElement.scrollTop;
  //     const offset = elementRect.top + scrollTop;
  //     const yOffset = offset - 300;

  //     window.scrollTo({ top: yOffset, behavior: "smooth" });
  //   }
  // };

  const getSubs = async () => {
    const response = await getSubCategories(selectedCategory?.category_id);
    const data = response.data ?? [];

    // if (pathname?.split('/')?.length <= 2) {
    //   handleNavigate(response.data?.[0].name)
    // }
    setSubCategories(data);
  };

  const navigate = (link: string) => {
    router.push(link)
  }

  useEffect(() => {
    setTimeout(() => {
      tabSubCatRef?.current?.swiper?.slideTo(
        parseInt(activeCategory),
        500,
        false
      );
      mobileSubCatRef?.current?.swiper?.slideTo(
        parseInt(activeCategory),
        500,
        false
      );
      desktopSubCatRef?.current?.swiper?.slideTo(
        parseInt(activeCategory),
        500,
        false
      );
    }, 100);
  }, [activeCategory]);

  function formatString(str: string) {
    return str
      .replace(/\//g, '') // Remove slashes
      .replace(/-/g, ' ') // Replace hyphens with spaces
  }

  const navigateToCategory = (category: CATEGORY) => {
    navigate(getCategoryLink(category.category_id, category.category_name))
  }

  useEffect(() => {
    if (pathname) {
      const path = pathname?.split('/')
      let temp = formatString(path?.[1])

      const category = data?.find(category => (category.category_name.toLowerCase() === temp || category.category_name.toLowerCase().replace(/\s+/g, " ").trim() === temp))
      setSelectedCategory(category);
    } else {
      setSelectedCategory(data?.[1]!);
    }
  }, [pathname, data]);

  useEffect(() => {
    const path = pathname?.split('/')
    if (subCategories && path?.length > 2) {
      let selectedSubCat = formatString(path?.[2])
      let index = 0
      for (let i = 0; i < subCategories.length; i++) {
        if (subCategories[i].name?.toLowerCase()?.replace(/[^a-zA-Z0-9 ]/g, '') === selectedSubCat) {
          index = i
        }
      }
      setSelectedSubCategory(String(index))

    }
  }, [pathname, subCategories]);

  useEffect(() => {
    if (selectedCategory) {
      getSubs();
    }
  }, [selectedCategory]);

  useEffect(() => {
    const handleScroll = () => {
      subCategories?.forEach((_, idx) => {
        const element = document.getElementById(idx.toString());
        if (element) {
          const elementRect = element.getBoundingClientRect();
          if (elementRect.top - 300 <= 0 && elementRect.bottom - 300 >= 0) {
            setActiveCategory(idx.toString());
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [subCategories]);

  const getNavLink = (service_name: string, category_name: string) => {
    if (service_name) {
      return `/${getSlug(selectedCategory?.category_name || '')}/${getSlug(selectedSubCategory ? subCategories?.[parseInt(selectedSubCategory)]?.name || '' : category_name)}/${getSlug(service_name)}`
    }
  }
  const handleSubCategorySelect = async (subCategory: string) => {
    if(subCategory==='all'){
      router.push(`/${(selectedCategory?.category_name || '').toLowerCase().replace(/\s+/g, "-")}`)
      return
    }
    router.push(`/${(selectedCategory?.category_name || '').toLowerCase().replace(/\s+/g, "-")}/${getSlug(subCategory || '')}`)
  }

  return (
    <>
      <div className="fixed w-full z-20 top-[69px] sm:top-[75.75px] md:top-[108px] lg:top-[113px] left-0 bg-white md:border-b xl:border-none">
        <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto">
          <div className="w-full block sm:hidden pb-2.5 pt-2.5 shadow-sm">
            {isLoading ? (
              <Swiper
                freeMode={true}
                spaceBetween={10}
                slidesPerView={1.5}
                modules={[FreeMode]}
              >
                {[...Array(5)].map((_, idx) => (
                  <SwiperSlide key={idx}>
                    <CategorySliderSkeleton />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Swiper
                freeMode={true}
                spaceBetween={7}
                slidesPerView={3.40}
                modules={[FreeMode]}
                onSlideChange={(swiper) => {
                  if (swiper.activeIndex === 0) {
                    setStartSlide(true);
                  } else {
                    setStartSlide(false);
                  }
                }}
              >
                {data?.map((category, idx) => (
                  <SwiperSlide
                    key={idx}
                    className={`flex items-center justify-center ${startSlide && idx === 0 ? "ml-5" : ""}`}
                  >
                    <div
                      onClick={() => navigateToCategory(category)}
                      className={`w-full flex items-center justify-center cursor-pointer gap-1 py-2 px-2 rounded-lg ${selectedCategory?.category_id === category.category_id
                        ? "text-white"
                        : "text-black"
                        }`}
                      style={{ backgroundColor: selectedCategory?.category_id === category.category_id ? "#006fac" : category?.color || "#F0F0F0" }}
                    >
                      <Image
                        src={`${imageBase(category.icon)}`}
                        alt="icon"
                        width={56}
                        height={56}
                        className="w-7 h-7"
                      />
                      <span className="text-left font-bold text-[10px] md:whitespace-nowrap w-[64px] line-clamp-2">
                        {category.category_name}
                      </span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
          {/* <div className="w-full block sm:hidden py-2.5">
            {subLoading ? (
              <Swiper
                freeMode={true}
                spaceBetween={10}
                slidesPerView={1.75}
                modules={[FreeMode]}
              >
                {[...Array(5)].map((_, idx) => (
                  <SwiperSlide key={idx}>
                    <CategorySliderSkeleton />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Swiper
                ref={mobileSubCatRef}
                freeMode={true}
                spaceBetween={10}
                slidesPerView={2.2}
                modules={[FreeMode]}
                onSlideChange={(swiper) => {
                  if (swiper.activeIndex === 0) {
                    setStartSubSlide(true);
                  } else {
                    setStartSubSlide(false);
                  }
                }}
              >
                {subCategories?.map((sub, idx) => (
                  <SwiperSlide
                    key={idx}
                    className={`${startSubSlide && idx === 0 ? "ml-5" : ""}`}
                  >
                    <div
                      onClick={() => {
                        scrollToElement(idx.toString());
                        setActiveCategory(idx.toString());
                      }}
                      className={`flex items-center justify-center cursor-pointer space-x-1 py-2 rounded-md ${parseInt(activeCategory) === idx
                        ? "bg-primary text-white"
                        : "bg-[#F7F7F7] text-black"
                        }`}
                    >
                      <span className="text-center font-semibold text-xs w-full overflow-hidden truncate">
                        {sub.name}
                      </span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div> */}
          <div className="w-full hidden sm:block md:hidden py-2.5 px-5 shadow-md">
            {isLoading ? (
              <Swiper
                freeMode={true}
                spaceBetween={10}
                slidesPerView={6}
                modules={[FreeMode]}
              >
                {[...Array(5)].map((_, idx) => (
                  <SwiperSlide key={idx}>
                    <CategorySliderSkeleton />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Swiper
                freeMode={true}
                spaceBetween={10}
                slidesPerView={4}
                modules={[FreeMode]}
              >
                {data?.map((category, idx) => (
                  <SwiperSlide key={idx}>
                    <div
                      onClick={() => navigateToCategory(category)}
                      className={`w-full flex items-center justify-center cursor-pointer gap-4 py-2 pr-3 pl-4 rounded-lg ${selectedCategory?.category_id === category.category_id
                        ? "text-white"
                        : "text-black"
                        }`}
                      style={{ backgroundColor: selectedCategory?.category_id === category.category_id ? "#006fac" : category?.color || "#F0F0F0" }}
                    >
                      <Image
                        src={`${imageBase(category.icon)}`}
                        alt="icon"
                        width={56}
                        height={56}
                        className="w-7 h-7"
                      />
                      <span className="text-left font-bold text-xs line-clamp-2 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: he.decode(category.category_name) }} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
          <div className="w-full hidden md:block lg:hidden py-2.5 pt-5">
            {isLoading ? (
              <Swiper
                freeMode={true}
                spaceBetween={10}
                slidesPerView={4.8}
                modules={[FreeMode]}
              >
                {[...Array(5)].map((_, idx) => (
                  <SwiperSlide key={idx}>
                    <CategorySliderSkeleton />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Swiper
                freeMode={true}
                spaceBetween={10}
                slidesPerView={4}
                modules={[FreeMode]}
              >
                {data?.map((category, idx) => (
                  <SwiperSlide key={idx}>
                    <div
                      onClick={() => navigateToCategory(category)}
                      className={`w-full flex items-center justify-center cursor-pointer gap-4 py-2 px-8 rounded-lg ${selectedCategory?.category_id === category.category_id
                        ? " text-white"
                        : " text-black"
                        }`}
                      style={{ backgroundColor: selectedCategory?.category_id === category.category_id ? "#006fac" : category?.color || "#F0F0F0" }}
                    >
                      <Image
                        src={`${imageBase(category.icon)}`}
                        alt="icon"
                        width={56}
                        height={56}
                        className="w-7 h-7"
                      />
                      <span className="text-left font-bold text-xs whitespace-nowrap">
                        {category.category_name}
                      </span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
          <div className="w-full hidden lg:block py-2.5">
            {isLoading ? (
              <Swiper
                freeMode={true}
                spaceBetween={10}
                slidesPerView={6.5}
                modules={[FreeMode]}
              >
                {[...Array(5)].map((_, idx) => (
                  <SwiperSlide key={idx}>
                    <CategorySliderSkeleton />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Swiper
                freeMode={true}
                spaceBetween={10}
                slidesPerView={4}
                modules={[FreeMode]}
              >
                {data?.map((category, idx) => (
                  <SwiperSlide key={idx}>
                    <div
                      onClick={() => navigateToCategory(category)}
                      className={`w-full flex items-center justify-center cursor-pointer gap-4 py-2 px-  rounded-lg ${selectedCategory?.category_id === category.category_id
                        ? "text-white"
                        : `text-black`
                        }`}
                      style={{ backgroundColor: selectedCategory?.category_id === category.category_id ? "#006fac" : category?.color || "#F0F0F0" }}
                    >
                      <Image
                        src={`${imageBase(category.icon)}`}
                        alt="icon"
                        width={56}
                        height={56}
                        className="size-7 lg:size-9 3xl:size-9"
                      />
                      <span className="text-left font-bold text-sm line-clamp-2 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: he.decode(category.category_name) }} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
      <div className="relative w-full md:w-[90%] lg:max-w-[1440px] mx-auto hidden sm:flex mt-[140.75px] sm:mt-[135.75px] md:mt-[176px] lg:mt-[185px] items-start justify-start">
        {isLoading ? (
          <div className="w-full flex items-center justify-center px-5 md:px-0 py-7">
            <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(12)].map((_, idx) => (
                <DoctorVisitSkeleton key={idx} />
              ))}
            </div>
          </div>
        ) : subCategories?.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center sm:h-[calc(100vh-143.75px)] md:h-[calc(100vh-176px)] lg:h-[calc(100vh-185px)]">
            <Image
              src={EmptyResults}
              alt="empty-wishlist"
              className="size-36 lg:size-44"
            />
            <p className="w-full text-center text-lg font-semibold mt-3">
              Sorry, Unfortunately the Product
              <br />
              you were Looking for wasn&apos;t found!!
            </p>
            <p className="w-full text-center font-semibold text-sm lg:text-base text-[#707070]">
              Explore more and shortlist some services
            </p>
            <Link
              href="/home"
              className="mt-12 bg-primary text-white rounded-lg text-xs font-bold py-3 px-6 place-self-center"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="relative w-full sm:h-[calc(100vh-143.75px)] md:h-[calc(100vh-176px)] lg:h-[calc(100vh-183px)] flex items-start justify-start gap-3 pt-2 md:pt-4 px-5 md:px-0">
            <div className="mt-1.5 rounded-lg sticky sm:top-[143.75px] md:top-[176px] lg:top-[185px] left-0 w-[30%] md:w-[25%] max-h-full overflow-auto custom-scrollbar flex flex-col bg-gray-100 divide-y">
              {subCategories?.map((sub, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setHoveredSubCat(sub?.id)
                    handleSubCategorySelect(sub?.name)
                  }}
                  className={`w-full cursor-pointer flex items-center justify-start gap-4 p-3 hover:bg-primary hover:text-white ${selectedSubCategory === idx.toString() &&
                    "bg-primary text-white"
                    }`}
                  onMouseEnter={() => setHoveredSubCat(sub?.id)}
                  onMouseLeave={() => setHoveredSubCat(null)}
                >
                  <Image
                    src={imageBase(sub.icon) || ''}
                    alt="sub-icon"
                    width={50}
                    height={50}
                    className={`size-7 px-1 rounded-md ${hoveredSubCat === sub?.id ? 'bg-white' : 'bg-transparent'}`}
                  />
                  <p className="w-full text-left text-xs lg:text-sm font-medium">
                    {sub.name}
                  </p>
                </div>
              ))}
            </div>
            <div className="relative w-[70%] md:w-[75%] max-h-full flex flex-col gap-4">
              {/* <div className="w-full flex flex-col items-center gap-4">
                {subCategories?.[parseInt(selectedSubCategory)]
                  ?.cover_image && (
                  <Image
                    src={`${imageBase(
                      subCategories?.[parseInt(selectedSubCategory)]
                        ?.cover_image!
                    )}`}
                    alt="cover-image"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover rounded-xl"
                  />
                )}
              </div> */}
              <div className="sticky top-5 mt-2 z-10 md:mr-5 flex items-center justify-between bg-gray-100 border border-[#DEDEDE] rounded-lg py-2 px-4">
                <div className="flex items-center justify-start gap-2">
                  <button type="button" onClick={() => setViewType(false)}>
                    <FaThList
                      className={`size-6 ${viewType ? "text-gray-400" : "text-primary"
                        }`}
                    />
                  </button>
                  <button type="button" onClick={() => setViewType(true)}>
                    <IoGrid
                      className={`size-6 ${viewType ? "text-primary" : "text-gray-400"
                        }`}
                    />
                  </button>
                </div>
                <div className="w-full flex items-center justify-end gap-6">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs">Sort By</span>
                    <div className="bg-white pr-2.5 rounded-md border">
                      <select
                        onChange={(e) => setSorting(e.target.value)}
                        className="text-xs p-2 rounded-md bg-transparent"
                      >
                        {sortingOptions.map((item) => (
                          <option key={item.id} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs">Show Listing</span>
                    <div className="bg-white pr-2.5 rounded-md border">
                      <select
                        onChange={(e) => setLimit(e.target.value)}
                        className="text-xs p-2 rounded-md bg-transparent"
                      >
                        <option value="1" selected={limit === "1"}>
                          1
                        </option>
                        <option value="2" selected={limit === "2"}>
                          2
                        </option>
                        <option value="3" selected={limit === "3"}>
                          3
                        </option>
                        <option value="4" selected={limit === "4"}>
                          4
                        </option>
                        <option value="5" selected={limit === "5"}>
                          5
                        </option>
                        <option value="6" selected={limit === "6"}>
                          6
                        </option>
                        <option value="All" selected={limit === "All"}>
                          All
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`w-full grid pb-5 md:pr-5 overflow-auto custom-scrollbar -mt-6 ${viewType
                  ? "grid-cols-2 md:grid-cols-3 gap-2"
                  : "grid-cols-1 md:grid-cols-2 gap-2"
                  }`}
              >
                <h1
                  className={`mt-5 w-full text-left font-bold text-lg ${viewType
                    ? "col-span-2 md:col-span-3"
                    : "col-span-1 md:col-span-2"
                    }`}
                >
                  {subCategories?.[parseInt(selectedSubCategory)]?.name || pathname?.split('/')?.[1]?.replace(/-/g, " ")?.toUpperCase()}
                </h1>
                {limit === "All"
                  ? sort(
                    sorting,
                    selectedSubCategory
                      ? subCategories?.[parseInt(selectedSubCategory)]?.services
                      : subCategories?.flatMap((item) => item?.services) || []
                  )?.map((service) => {
                    if (!viewType) {
                      return (
                        <DoctorVisitListingCard
                          key={service.service_id}
                          drip={service}
                          navLink={getNavLink(service.name || '', service?.category_name)}
                        />
                      );
                    } else {
                      return (
                        <BestSellingListingCard
                          key={service.service_id}
                          drip={service}
                          navLink={getNavLink(service.name || '', service?.category_name)}
                        />
                      );
                    }
                  })
                  : subCategories?.[parseInt(selectedSubCategory)]?.services
                    .slice(0, parseInt(limit))
                    .map((service) => {
                      if (!viewType) {
                        return (
                          <DoctorVisitListingCard
                            key={service.service_id}
                            drip={service}
                            navLink={getNavLink(service.name || '', service?.category_name)}

                          />
                        );
                      } else {
                        return (
                          <BestSellingListingCard
                            key={service.service_id}
                            drip={service}
                            navLink={getNavLink(service.name || '', service?.category_name)}
                          />
                        );
                      }
                    })}
              </div>
            </div>
          </div>
        )}
      </div>
      <MobileViewListing sortingOptions={sortingOptions} subCategories={subCategories} handleSubCategorySelect={handleSubCategorySelect} selectedSubCategory={selectedSubCategory} subLoading={subLoading} getNavLink={getNavLink} />

      {/* <div className="w-full sm:hidden mt-[230.25px] mb-24 px-5">
        {subLoading ? (
          <div className="w-full xl:w-[85%] 3xl:w-[70%] xl:mx-auto grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="col-span-1 xl:col-span-2 w-full">
              <HeaderSkeleton />
            </div>
            <div className="col-span-1 xl:col-span-2 w-full grid grid-cols-2 gap-5">
              {[...Array(10)].map((_, idx) => (
                <ServiceCardSkeleton key={idx} />
              ))}
            </div>
          </div>
        ) : subCategories?.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center h-[calc(100vh-272.75px)]">
            <Image
              src={EmptyResults}
              alt="empty-wishlist"
              className="size-24"
            />
            <p className="w-full text-center font-semibold mt-3">
              Sorry, Unfortunately the Product
              <br />
              you were Looking for wasn&apos;t found!!
            </p>
            <p className="w-full text-center font-semibold text-xs lg:text-base text-[#707070]">
              Explore more and shortlist some services
            </p>
            <Link
              href="/home"
              className="mt-12 bg-primary text-white rounded-lg text-xs font-bold py-3 px-6 place-self-center"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          subCategories?.map((sub, idx) => (
            <div
              key={idx}
              id={idx.toString()}
              className="w-full xl:w-[85%] 3xl:w-[70%] mt-2.5 xl:mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 xl:mb-20"
            >
              <div className="col-span-1 md:col-span-2 w-full flex flex-col items-center space-y-4 mb-4">
                <h1 className="w-full text-left text-xl xl:text-2xl font-bold">
                  {sub?.name}
                </h1>
                {sub?.cover_image && (
                  <Image
                    src={`${imageBase(sub?.cover_image)}`}
                    alt="cover-image"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover rounded-xl"
                  />
                )}
              </div>
              {sub?.services.map((service) => (
                <DoctorVisitListingCard
                  key={service.service_id}
                  drip={service}
                  navLink={getNavLink(service.name || '', service?.category_name)}
                />
              ))}
            </div>
          ))
        )}
      </div> */}
      {/* {path === 'doctor-home-visit' ? <DoctorHomeVisit /> : path === 'iv-drip-therapy' ? <IVDrip /> : path === 'lab-tests-&-checkups' ? <LabText /> : (path === 'physio-&-chiropractic' || path === 'physiotherapy ') ? <Physiotherapy /> : null} */}
    </>
  );
};

export default DripListing;
