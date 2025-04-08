"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { cn, getCategoryLink, getSlug, imageBase, sort } from "@/utils/helpers";
import { setSelectedCategory } from "@/store/global";
import { useFetchCategoriesQuery } from "@/store/services/category";
import DoctorVisitListingCard from "@/components/cards/DoctorVisitListingCard";
import BestSellingListingCard from "@/components/cards/BestSellingListingCard";
import he from "he";
import GoogleAnalytics from "../../components/GoogleAnalytics";
import SortHeader from "@/components/drips/SortHeader";
import { useRouter } from "next/router";
import { FaThList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { RootState } from "@/store";

const sortingOptions = [
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

const SectionListing = ({ sectionData }: { sectionData?: DRIP }) => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState('All')
  const [viewType, setViewType] = useState(true);
  const [startSlide, setStartSlide] = useState(true);
  const { data: categories } = useFetchCategoriesQuery({});
  const [sorting, setSorting] = useState("Price (Low to High)");
  const [data, setData] = useState<any>(null)
  const router = useRouter();
  const { name } = router.query
  const { cart } = useSelector(
    (state: RootState) => state.global
  );

  const selectCategory = (value: CATEGORY) => {
    dispatch(setSelectedCategory(value));
  };

  const getNavLink = (name: string) => {
    return `/home/${data?.section
      .toLowerCase()
      .split(" ")
      .join("-")}/${getSlug(name)}`;
  };

  const [openSortDrawer, setOpenSortDrawer] = useState(false)

  const handleClose = () => {
    setOpenSortDrawer(false)
  }

  const handleSelectSort = (value: string) => {
    setSorting(value)
    handleClose()
  }

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/home`, {
        method: "GET",
        headers: {
          "company-id": `${process.env.NEXT_PUBLIC_COMPANY_ID!}`,
          "secret-key": `${process.env.NEXT_PUBLIC_SECRET_KEY!}`,
          "business-id": `${process.env.NEXT_PUBLIC_BUSINESS_ID!}`,
        },
      });

      const details: { success: number; error: string; data: DRIP[] } =
        await response.json();

      const section = details.data.find(
        (detail) =>
          detail.section.toLowerCase().split(" ").join("-") === name
      );
      if (section) {
        setData(section)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (sectionData) {
      setData({ section_data: sectionData, section: 'Banner', page_type: 'Sections', rows: '1' })
    } else {
      getData()
    }
  }, [name, sectionData])

  return (
    <>
      <GoogleAnalytics />
      <div className="fixed flex w-full shadow-md z-50 top-[69px] sm:top-[65.75px] md:top-[108px] lg:top-[113px] left-0 bg-white md:border-b xl:border-none">
        <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto">
          <div className="flex items-center justify-center gap-1.5 sm:hidden py-2.5 px-3 shadow">
            {categories?.map((category, idx) => (
              <div
                key={idx}
              >
                <Link
                    href={getCategoryLink(category.category_id, category.category_name)}
                    onClick={() => selectCategory(category)}
                    className="w-full flex items-center justify-center cursor-pointer gap-1 px-1.5 py-2 rounded-lg text-black"
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
          {/* <div className="w-full block sm:hidden pb-2.5">
            <Swiper
              freeMode={true}
              spaceBetween={5}
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
              {categories?.map((category, idx) => (
                <SwiperSlide
                  key={idx}
                  className={`${startSlide && idx === 0 ? "ml-5" : ""}`}
                >
                  <Link
                    href={getCategoryLink(category.category_id, category.category_name)}
                    onClick={() => selectCategory(category)}
                    className="w-full flex items-center justify-center cursor-pointer gap-1 px-1.5 py-2 rounded-lg text-black"
                    style={{ backgroundColor: category?.color || "#F0F0F0" }}
                  >
                    <Image
                      src={`${imageBase(category.icon)}`}
                      alt="icon"
                      width={56}
                      height={56}
                      className="w-[26px] h-[26px]"
                    />
                    <span className="text-left font-bold text-[10px] h-[30px] w-[64px] line-clamp-2 md:whitespace-nowrap">
                      {category.category_name}
                    </span>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div> */}
          <div className="w-full hidden sm:block md:hidden py-2.5">
            <Swiper
              freeMode={true}
              spaceBetween={10}
              slidesPerView={4.2}
              modules={[FreeMode]}
              onSlideChange={(swiper) => {
                if (swiper.activeIndex === 0) {
                  setStartSlide(true);
                } else {
                  setStartSlide(false);
                }
              }}
            >
              {categories?.map((category, idx) => (
                <SwiperSlide
                  key={idx}
                  className={`${startSlide && idx === 0 ? "ml-5" : ""}`}
                >
                  <Link
                    href={getCategoryLink(category.category_id, category.category_name)}
                    onClick={() => selectCategory(category)}
                    className="w-full flex items-center justify-center cursor-pointer gap-4 py-2 pr-3 pl-4 rounded-lg text-black"
                    style={{ backgroundColor: category?.color || "#F0F0F0" }}
                  >
                    <Image
                      src={`${imageBase(category.icon)}`}
                      alt="icon"
                      width={56}
                      height={56}
                      className="w-7 h-7"
                    />
                    <span className="text-left font-bold text-xs line-clamp-2" dangerouslySetInnerHTML={{ __html: he.decode(category.category_name) }} />
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
              {categories?.map((category, idx) => (
                <SwiperSlide key={idx}>
                  <Link
                    href={getCategoryLink(category.category_id, category.category_name)}
                    onClick={() => selectCategory(category)}
                    className="w-full flex items-center justify-center cursor-pointer gap-4 h-[75px] py-2 pr-3 pl-4 rounded-2xl text-black"
                    style={{ backgroundColor: category?.color || "#F0F0F0" }}
                  >
                    {/* <Image
                      src={`${imageBase(category.icon)}`}
                      alt="icon"
                      width={56}
                      height={56}
                      className="w-7 h-7"
                    /> */}
                    <span className="text-center font-medium" dangerouslySetInnerHTML={{ __html: he.decode(category.category_name) }} />
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
              {categories?.map((category, idx) => (
                <SwiperSlide key={idx}>
                  <Link
                    href={getCategoryLink(category.category_id, category.category_name)}
                    onClick={() => selectCategory(category)}
                    className="w-full text-black flex items-center justify-center cursor-pointer gap-4 py-2 h-[75px] pr-3 lg:pr-5 xl:pl-6 xl:pr-16 pl-4 rounded-2xl"
                    style={{ backgroundColor: category?.color || "#F0F0F0" }}
                  >
                    {/* <Image
                      src={`${imageBase(category.icon)}`}
                      alt="icon"
                      width={56}
                      height={56}
                      className="size-7 lg:size-9 3xl:size-9"
                    /> */}
                    <span className="text-center font-medium line-clamp-2" dangerouslySetInnerHTML={{ __html: he.decode(category.category_name) }} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className={cn(
        "w-full px-5 lg:px-0 md:w-[90%] lg:max-w-[1440px] mx-auto flex flex-col items-start justify-start gap-5",
        cart?.length ? 'mb-32' : 'mb-20'
        )}>
        <div className="w-full flex flex-col items-center gap-4 mt-[155.75px] sm:mt-[163.75px] md:mt-[226px] lg:mt-[230px]">
          <Image
            width={1000}
            height={1000}
            alt="cover-image"
            className="w-full h-full object-cover rounded-xl"
            src="https://crm.fandcproperties.ru/ci/uploads/categories/cover_images/sample_category_cover.png"
          />
        </div>
        <div className="w-full flex flex-col items-start justify-start gap-4">
          <div className="hidden sm:flex w-full items-center justify-between bg-gray-100 border border-[#DEDEDE] rounded-lg py-2 px-4">
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
            <div className="w-full flex items-center justify-end gap-4 sm:gap-6">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs hidden sm:flex">Sort By</span>
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
                <span className="text-xs hidden sm:flex">Show Listing</span>
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
          {/* <div className="sm:hidden w-full flex items-center justify-between bg-gray-100 border border-[#DEDEDE] rounded-lg py-2 px-3"> */}
          <SortHeader viewType={viewType} setViewType={setViewType} setOpenSortDrawer={setOpenSortDrawer} handleClose={handleClose} sorting={sorting} openSortDrawer={openSortDrawer} handleSelectSort={handleSelectSort} sortingOptions={sortingOptions} />
          {/* </div> */}
          <h1 className="w-full text-left font-bold text-xl">{data?.section}</h1>
          <div
            className={`sm:hidden w-full grid pb-5 ${!viewType
              ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
              : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2"
              }`}
          >
            {sort(sorting, data?.section_data)?.map((service, idx) => {
              if (viewType) {
                return (
                  <DoctorVisitListingCard key={idx} drip={service} navLink={getNavLink(service.name || '')} />
                );
              } else {
                return (
                  <BestSellingListingCard key={idx} drip={service} navLink={getNavLink(service.name || '')} />
                );
              }
            })}
          </div>
          <div
            className={`hidden sm:grid w-full pb-5 ${!viewType
              ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
              : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2"
              }`}
          >
            {(limit === "All" ? sort(sorting, data?.section_data) : sort(sorting, data?.section_data)?.slice(0, parseInt(limit)))?.map((service, idx) => {
              if (viewType) {
                return (
                  <DoctorVisitListingCard key={idx} drip={service} navLink={getNavLink(service.name || '')} />
                );
              } else {
                return (
                  <BestSellingListingCard key={idx} drip={service} navLink={getNavLink(service.name || '')} />
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionListing;