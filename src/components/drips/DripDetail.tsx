"use client";

import { FaStar, FaPlus, FaMinus, FaRegClock } from "react-icons/fa6";
import dayjs from "dayjs";
import Image from "next/image";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import { FreeMode, Navigation } from "swiper/modules";
import { IoShareSocialOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
// import tabbyCheckout from "@/assets/icons/tabbyCheckout.svg";
import "swiper/css";
import { RootState } from "@/store";
import { cn, imageBase } from "@/utils/helpers";
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
import SizeIcon from "@/assets/icons/size.svg";
import avatar from "@/assets/icons/avatar.svg";
import { usePathname } from "next/navigation";

const DripDetailPage = ({
  data,
  getData,
}: {
  data: DRIP_DETAIL_RESPONSE;
  getData?: () => void;
}) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [startSlide, setStartSlide] = useState(true);
  const [addToWishlist] = useAddToWishlistMutation();
  const [openLoginDrawer, setOpenLoginDrawer] = useState(false);
  const [tab, setTab] = useState<string>("");
  const { user, cart, isMenuVisible } = useSelector(
    (state: RootState) => state.global
  );
  const [selectedBundle, setSelectedBundle] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (data?.sections?.length) {
      setTab(data?.sections?.[0]?.name);
    }
  }, [data]);

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
          thumbnail: data.thumbnail,
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
        if (getData) {
          await getData();
        }
        if (data?.wishlist_id) {
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
    if (data?.service_id !== undefined) {
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
      if (data?.wishlist_id) {
        setWishlist(true);
      }
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      // Load Tabby Promo script after the component mounts
      const script = document.createElement("script");
      script.src = "https://checkout.tabby.ai/tabby-promo.js";
      script.async = true;
      script.onload = () => {
        new window.TabbyPromo({
          selector: "#TabbyPromo",
          currency: "AED",
          price: data?.price ? String(Math.round(Number(data?.price))) : "0",
          installmentsCount: 4,
          lang: "en",
          source: "product",
        });
      };
      document.body.appendChild(script);

      // Clean up the script when the component is unmounted
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [data]);
  
  useEffect(() => {
    if (data) {
      // Load Tabby Promo script after the component mounts
      const script = document.createElement("script");
      script.src = "https://checkout.tabby.ai/tabby-promo.js";
      script.async = true;
      script.onload = () => {
        new window.TabbyPromo({
          selector: "#TabbyPromo2",
          currency: "AED",
          price: data?.price ? String(Math.round(Number(data?.price))) : "0",
          installmentsCount: 4,
          lang: "en",
          source: "product",
        });
      };
      document.body.appendChild(script);

      // Clean up the script when the component is unmounted
      return () => {
        document.body.removeChild(script);
      };
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
          src={`${imageBase(data?.thumbnail)}`}
          alt="detail-banner"
          width={1000}
          height={1000}
          className="w-full"
        />
        <div className="w-full flex flex-col items-center justify-center space-y-3 mt-5">
          <div className="w-full flex items-center justify-between px-5">
            <h1 className="text-left font-bold text-xl">
              {data?.service_name}
            </h1>
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
                {data?.wishlist_id ? (
                  <HeartIcon fillColor="#38ADA0" className="text-secondary" />
                ) : (
                  <HeartIcon className="size-6" />
                )}
              </button>
            </div>
          </div>
          <p className="w-full text-left text-[#535763] text-sm font-medium my-2 px-5">
            {data?.description}
          </p>
          <div className="w-full flex items-center justify-start space-x-5 px-5">
            {data?.size && (
              <div className="flex items-center justify-center space-x-1.5">
                <Image src={SizeIcon} alt="size" className="w-4 h-4" />
                <span className="text-[#535763] text-sm sm:text-base">
                  {data?.size}ml
                </span>
              </div>
            )}
            <div className="flex items-center justify-center space-x-1.5">
              <FaRegClock className="w-4 h-4 text-primary" />
              <span className="text-[#535763] text-sm sm:text-base">
                {data?.response_time}
              </span>
            </div>
          </div>
          <div className="w-full flex items-center gap-2">
            <p className="text-[18px] px-5 text-left font-bold text-xl">
              AED {data?.price ? Math.round(Number(data?.price)) : "-"}
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" width="46.287" height="19.091" viewBox="0 0 46.287 19.091">
              <g id="_384578_2_" data-name="384578 (2)" transform="translate(0 0)">
                <path id="Path_3718" data-name="Path 3718" d="M65.223,91.691H30.864A5.962,5.962,0,0,1,24.9,85.727V78.564A5.962,5.962,0,0,1,30.864,72.6H65.223a5.962,5.962,0,0,1,5.964,5.964v7.163A5.962,5.962,0,0,1,65.223,91.691Z" transform="translate(-24.9 -72.6)" fill="#5afeae"/>
                <g id="Group_4259" data-name="Group 4259" transform="translate(3.767 3.881)">
                  <path id="Path_3719" data-name="Path 3719" d="M74.932,88.454,72.563,97.5v.029h1.855l2.369-9.046H74.932ZM45.653,93.591a1.912,1.912,0,0,1-.885.2c-.656,0-1.027-.114-1.084-.656V90.2h0V88.512l-1.655.2a2.046,2.046,0,0,0,1.741-1.969V86.2H41.914v2.54l-.114.029v4.68a2.118,2.118,0,0,0,2.34,2.112,3.636,3.636,0,0,0,1.484-.314h0l.029-1.655Z" transform="translate(-40.744 -86.2)" fill="#292929"/>
                  <path id="Path_3720" data-name="Path 3720" d="M43.294,88.755l-5.194.8v1.313l5.194-.8Zm0,1.941-5.194.8V92.75l5.194-.8Zm5.822.6a2.3,2.3,0,0,0-2.483-2.34,2.505,2.505,0,0,0-2.055.97,5.117,5.117,0,0,0,0,5.308,2.482,2.482,0,0,0,2.055.942,2.285,2.285,0,0,0,2.483-2.34v2.2H50.97V89.126l-1.855.285v1.883Zm.114,1.284c0,1.284-.685,2.14-1.741,2.14-1.084,0-1.741-.8-1.741-2.14s.656-2.14,1.741-2.14a1.583,1.583,0,0,1,1.284.6,2.536,2.536,0,0,1,.457,1.541Zm7.134-3.624a2.285,2.285,0,0,0-2.483,2.34V87.1l-1.855.285v8.647h1.855v-2.2a2.285,2.285,0,0,0,2.483,2.34c1.741,0,2.8-1.341,2.8-3.6S58.1,88.955,56.364,88.955Zm-.828,5.765c-1.056,0-1.741-.828-1.741-2.14a2.536,2.536,0,0,1,.457-1.541,1.545,1.545,0,0,1,1.284-.6c1.084,0,1.741.8,1.741,2.14s-.656,2.14-1.741,2.14Zm8.647-5.765a2.285,2.285,0,0,0-2.483,2.34V87.1l-1.855.285v8.647H61.7v-2.2a2.285,2.285,0,0,0,2.483,2.34c1.741,0,2.8-1.341,2.8-3.6s-1.056-3.624-2.8-3.624Zm-.828,5.765c-1.056,0-1.741-.828-1.741-2.14a2.536,2.536,0,0,1,.457-1.541,1.545,1.545,0,0,1,1.284-.6c1.084,0,1.741.8,1.741,2.14s-.656,2.14-1.741,2.14ZM66.98,89.1h1.969l1.6,6.935H68.777Zm8.675.713v-.542h-.228v-.114h.6v.114H75.8v.542Zm.4,0v-.685h.228l.114.314c.029.086.057.114.057.143,0-.029.029-.057.057-.143l.114-.314h.228v.685h-.143v-.542l-.2.542h-.143l-.171-.542v.542Z" transform="translate(-38.1 -86.843)" fill="#292929"/>
                </g>
              </g>
            </svg>
          </div>
          {data?.bundles?.length ? (
            <div className="space-y-2.5 w-full px-5">
              {data?.bundles?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedBundle(index)}
                  className="flex items-center justify-between cursor-pointer h-[54px] px-4 bg-[#F7F7F7] border border-[#DEDEDE] rounded-[10px] w-full"
                >
                  <div className="flex items-center gap-4 w-full">
                    {selectedBundle !== index ? (
                      <div className="border border-[#DEDEDE] rounded-full h-[22px] w-[22px]" />
                    ) : (
                      <div
                        className={`rounded-full border border-primary p-[3px] size-[22px] flex`}
                      >
                        <div className="rounded-full bg-primary w-full h-full" />
                      </div>
                    )}
                    <p className="text-black text-sm">{item?.bundle}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-full text-left text-[10px] whitespace-nowrap line-through">
                      AED 0.00
                    </span>
                    <span className="w-full text-left text-xs sm:text-sm sm:font-semibold xl:font-bold whitespace-nowrap">
                      AED{" "}
                      {Math.round(
                        Number(item.price_without_vat || item.price_with_vat)
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          <div className="px-5">
            <div id="TabbyPromo"></div>
          </div>
          <style jsx>{`
            body {
              font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
              padding: 40px;
              background-color: #f4f4f4;
              color: #333;
            }

            .product-card {
              background: #fff;
              padding: 30px;
              max-width: 400px;
              margin: 0 auto;
              border-radius: 10px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }

            .product-title {
              font-size: 22px;
              margin-bottom: 10px;
            }

            .price {
              font-size: 24px;
              font-weight: bold;
              color: #2b8f43;
              margin-bottom: 10px;
            }

            #TabbyPromo {
              font-size: 14px !important;
              background-color: #e8f5e9;
              padding: 10px;
              border-radius: 6px;
              color: #1b5e20 !important;
            }
          `}</style>
          {data?.sections?.length ? (
            <div className="flex flex-col gap-1.5 !mb-2.5 !mt-5 pl-5 pr-10">
              <p className="text-black text-left text-lg md:text-xl font-medium">
                {data?.sections?.[0]?.name}
              </p>
              <p
                className="text-[#535763] text-sm font-medium"
                dangerouslySetInnerHTML={{
                  __html: he.decode(data?.sections?.[0]?.description || ""),
                }}
              />
            </div>
          ) : null}
          <div className="w-full flex flex-col items-center justify-center space-y-2.5 px-5">
            {data?.sections
              ?.filter((_, index) => index !== 0)
              ?.map((section, idx) => (
                <Accordion section={section} key={idx} index={idx} />
              ))}
            {/* <Accordion section={{ name: 'Service Ratings & Reviews' }} >
              <div className="w-full flex flex-col items-center justify-center space-y-3 px-5 mb-3">
                <h1 className="w-full text-left text-lg md:text-xl font-bold">
                  Service Ratings & Reviews
                </h1>
                <div className="w-full grid grid-cols-2 gap-2.5 divide-x divide-gray-400">
                  <div className="col-span-1 w-full flex flex-col items-center justify-center space-y-2.5">
                    <p className="w-full text-left text-xl font-bold">
                      {data?.rating}
                      <span className="text-[#67767E] text-sm font-semibold">
                        &nbsp;/ 5.0
                      </span>
                    </p>
                    <div className="w-full flex items-center justify-start space-x-1.5">
                      {[...Array(parseInt(data?.rating || "0"))].map((_, idx) => (
                        <FaStar key={idx} className="size-4 text-accent" />
                      ))}
                      {[...Array(5 - parseInt(data?.rating || "0"))].map((_, idx) => (
                        <FaStar key={idx} className="size-4 text-[#DDDDDD]" />
                      ))}
                    </div>
                    <p className="w-full text-left text-xl font-bold">
                      {data?.total_reviews}&nbsp;
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
              {data?.reviews?.map((review, idx) => (
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
                          {[...Array(parseInt(review.review || "0"))].map((_, idx) => (
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
            </Accordion> */}
          </div>
          {data?.reviews?.length ? (
            <div className="w-full mt-2 !mb-4">
              <div className="w-full flex flex-col items-center justify-center space-y-3 px-5 my-3">
                <h1 className="w-full text-left text-lg md:text-xl font-medium">
                  Reviews
                </h1>
                {/* <div className="w-full grid grid-cols-2 gap-2.5 divide-x divide-gray-400">
              <div className="col-span-1 w-full flex flex-col items-center justify-center space-y-2.5">
                <p className="w-full text-left text-xl font-bold">
                  {data?.rating}
                  <span className="text-[#67767E] text-sm font-semibold">
                    &nbsp;/ 5.0
                  </span>
                </p>
                <div className="w-full flex items-center justify-start space-x-1.5">
                  {[...Array(parseInt(data?.rating || "0"))].map((_, idx) => (
                    <FaStar key={idx} className="size-4 text-accent" />
                  ))}
                  {[...Array(5 - parseInt(data?.rating || "0"))].map((_, idx) => (
                    <FaStar key={idx} className="size-4 text-[#DDDDDD]" />
                  ))}
                </div>
                <p className="w-full text-left text-xl font-bold">
                  {data?.total_reviews}&nbsp;
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
            </div> */}
              </div>
              <Swiper
                spaceBetween={1}
                slidesPerView={1.2}
                navigation
                modules={[Navigation]}
                className="w-full"
              >
                {data?.reviews?.map((review, idx) => (
                  <SwiperSlide key={idx}>
                    <div
                      key={idx}
                      className={cn(
                        "flex flex-col items-center justify-center space-x-5 px-5 bg-[#FAFAFA] rounded-md gap-3 py-3.5 ml-4",
                        idx === data?.reviews?.length - 1 ? "mr-4" : ""
                      )}
                    >
                      <div className="w-full flex items-center justify-start space-x-4">
                        <Image
                          src={avatar}
                          alt="user"
                          width={40}
                          height={40}
                          className="rounded-full bg-gray-200 size-10"
                        />
                        <div className="w-full flex flex-col items-center justify-start space-y-1">
                          <div className="w-full flex items-center justify-between">
                            <p className="text-left md:text-xl font-medium">
                              {review.customer}
                            </p>
                            <div className="flex items-center w-[35%] justify-center space-x-1.5">
                              {[...Array(parseInt(review.review || "0"))].map(
                                (_, idx) => (
                                  <FaStar
                                    key={idx}
                                    className="text-accent size-4"
                                  />
                                )
                              )}
                            </div>
                          </div>
                          {/* <span className="w-full text-left text-xs text-gray-400">
                          {dayjs(review?.created_at).format("ddd DD MMM, YYYY")}
                        </span> */}
                        </div>
                      </div>
                      <p className="w-full text-left line-clamp-3 h-[40px] text-[#535763] text-sm font-medium">
                        {numberSentences(1, review.description)}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : null}
          {/* {data?.reviews?.map((review, idx) => (
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
                      {[...Array(parseInt(review.review || "0"))].map((_, idx) => (
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
          ))} */}
          {/* <div className="w-full px-5">
            <Image
              src={`${imageBase(data.cover_image)}`}
              alt="cover-image"
              width={1000}
              height={1000}
              className="rounded-lg w-full"
            />
          </div> */}
          {data?.similar_services?.length ? (
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
                  {data?.similar_services?.map((drip, idx) => (
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
          ) : null}
          {data?.faqs?.length ? (
            <div className="w-full flex flex-col items-center justify-center space-y-5 px-5 pb-36">
              <h1 className="w-full text-left text-xl font-medium">FAQs</h1>
              <div className="w-full flex flex-col items-center justify-center space-y-2.5">
                {data?.faqs?.map((section, idx) => (
                  <Accordion section={section} key={idx} />
                ))}
              </div>
            </div>
          ) : null}
          <div
            className={cn(
              `fixed w-full bottom-0 z-20 left-0 p-3 bg-white border-t`,
              cart?.length > 0 && "pb-[85px]",
              isMenuVisible && "bottom-[68px]",
              pathname?.split("/")?.length === 4 && "pb-[10px]"
            )}
          >
            {quantity === 0 ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[18px] font-bold">
                    AED {data?.price ? Math.round(Number(data?.price)) : "-"}
                  </p>
                  <div className="flex items-center justify-center space-x-2.5">
                    <FaRegClock className="w-4 h-4 text-primary" />
                    <span className="text-[#A3A3A3] font-medium text-sm">
                      {data?.response_time}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleIncrement()}
                  className="w-[45%] xs:w-[40%] py-3 -mb-0.5 rounded-xl bg-primary border border-primary text-white text-[18px] font-semibold"
                >
                  Add to Cart
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <div className="w-full">
                  <p className="text-[18px] font-bold">
                    AED {data?.price ? Math.round(Number(data?.price)) : "-"}
                  </p>
                  <div className="flex items-center justify space-x-2.5">
                    <FaRegClock className="w-4 h-4 text-primary" />
                    <span className="text-[#A3A3A3] font-medium text-sm">
                      {data?.response_time}
                    </span>
                  </div>
                </div>
                <div className="w-full flex items-center justify-end gap-6">
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
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto hidden sm:block sm:mt-[82.75px] md:mt-[125px] sm:px-5 md:px-0 py-5 mb-20">
        <div className="w-full h-[375px] md:h-[500px] flex items-start justify-start gap-5 md:gap-10">
          <div className="w-2/5 xl:w-1/3 max-h-full">
            <div
              style={{ backgroundImage: `url(${imageBase(data?.thumbnail)})` }}
              className="bg-top bg-cover w-full h-[375px] md:h-[500px] rounded-lg"
            />
          </div>
          <div className="w-3/5 xl:w-2/3 flex flex-col items-start justify-between h-full gap-y-1.5 py-4">
            <div className="w-full">
              <h1 className="w-full text-left font-bold text-2xl xl:text-4xl">
                {data?.service_name}
              </h1>
              <div className="w-full flex items-center justify-start gap-1">
                {[...Array(parseInt(data?.rating || "0"))].map((_, idx) => (
                  <FaStar key={idx} className="size-4 text-accent" />
                ))}
                {[...Array(5 - parseInt(data?.rating || "0"))].map((_, idx) => (
                  <FaStar key={idx} className="size-4 text-gray-300" />
                ))}
              </div>
              <div className="w-full flex items-center justify-start space-x-10 mt-1.5">
                {data?.size && (
                  <div className="flex items-center justify-center space-x-2.5">
                    <DropletIcon
                      fillColor="#006FAC"
                      className="w-4 h-4 text-transparent"
                    />
                    <span className="text-[#A3A3A3] font-medium text-sm">
                      {data?.size}ml
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-center space-x-2.5">
                  <FaRegClock className="w-4 h-4 text-primary" />
                  <span className="text-[#A3A3A3] font-medium text-sm">
                    {data?.response_time}
                  </span>
                </div>
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html: he.decode(data?.description || ""),
                }}
                className="w-full text-left text-[#535763] text-sm font-medium my-6"
              />
            </div>
            <div className="w-full">
              <div className="w-full flex items-center justify-start space-x-10 mb-4">
                <p className="text-left text-lg text-[#A3A3A3] font-medium line-through">
                  AED&nbsp;
                  {isNaN(
                    Math.round(
                      priceCalculator(
                        data?.discount_type,
                        data?.price,
                        data?.discount_value
                      )
                    )
                  )
                    ? "0"
                    : Math.round(
                        priceCalculator(
                          data?.discount_type,
                          data?.price,
                          data?.discount_value
                        )
                      )}
                  .00
                </p>
                <p className="text-left text-xl font-semibold">
                  AED {data?.price ? Math.round(Number(data?.price)) : "-"}
                </p>
              </div>
              <div className="mb-5 md:w-3/6 xl:w-3/6">
                <div id="TabbyPromo2"></div>
                <style jsx>{`
                  body {
                    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                    padding: 40px;
                    background-color: #f4f4f4;
                    color: #333;
                  }

                  .product-card {
                    background: #fff;
                    padding: 30px;
                    max-width: 400px;
                    margin: 0 auto;
                    border-radius: 10px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                  }

                  .product-title {
                    font-size: 22px;
                    margin-bottom: 10px;
                  }

                  .price {
                    font-size: 24px;
                    font-weight: bold;
                    color: #2b8f43;
                    margin-bottom: 10px;
                  }

                  #TabbyPromo2 {
                    font-size: 14px !important;
                    background-color: #e8f5e9;
                    padding: 10px;
                    border-radius: 6px;
                    color: #1b5e20 !important;
                  }
                `}</style>
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
        </div>
        {data?.sections?.length || data?.rating ? (
          <div className="w-full flex flex-col items-center justify-center mt-10 space-y-5">
            <div className="w-full flex space-x-2.5 bg-[#F5F5F5] p-4 rounded-lg">
              {data?.sections?.map((section, idx) => (
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
              {/* {data?.rating && */}
              <p
                onClick={() => setTab("Reviews")}
                className={`text-center px-9 py-2.5 cursor-pointer rounded-full font-semibold text-xs md:text-sm ${
                  tab === "Reviews"
                    ? "bg-primary text-white"
                    : "bg-[#DDDDDD] text-[#555555]"
                }`}
              >
                Reviews
              </p>
            </div>
            {data?.sections
              ?.filter((section) => section.name === tab)
              ?.map((section, idx) => (
                <p
                  key={idx}
                  className="w-full text-left text-[#535763] font-medium px-4 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: he.decode(section?.description || ""),
                  }}
                />
              ))}
            {tab === "Reviews" && (
              <div className="w-full grid grid-cols-2 gap-5 px-4">
                <h1 className="col-span-2 w-full text-left text-xl font-bold">
                  Service Ratings & Reviews
                </h1>
                <div className="col-span-1 w-full grid grid-cols-2 gap-2.5 divide-x divide-gray-400">
                  <div className="col-span-1 w-full flex flex-col items-center justify-center space-y-2.5">
                    <p className="w-full text-left text-2xl font-bold">
                      {data?.rating || "0"}
                      <span className="text-[#67767E] text-lg font-medium">
                        &nbsp;/ 5.0
                      </span>
                    </p>
                    <div className="w-full flex items-center justify-start gap-1.5">
                      {[...Array(parseInt(data?.rating || "0"))].map(
                        (id, idx) => (
                          <FaStar key={idx} className="w-6 h-6 text-accent" />
                        )
                      )}
                      {[...Array(5 - parseInt(data?.rating || "0"))].map(
                        (id, idx) => (
                          <FaStar
                            key={idx}
                            className="w-6 h-6 text-[#DDDDDD]"
                          />
                        )
                      )}
                    </div>
                    <p className="w-full text-left text-2xl font-bold">
                      {data?.total_reviews}&nbsp;
                      <span className="text-[#67767E] text-lg font-medium">
                        Ratings
                      </span>
                    </p>
                  </div>
                  <div className="col-span-1 w-full flex flex-col pl-2.5">
                    {[...Array(5)].map((_, idx) => (
                      <div
                        key={idx}
                        className="w-full grid grid-cols-12 gap-x-2"
                      >
                        <div className="col-span-1 w-full flex items-center justify-center">
                          <span className="font-extrabold pt-0.5">
                            {5 - idx}
                          </span>
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
                  {data?.reviews?.map((review, idx) => (
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
                              {[...Array(parseInt(review?.review || "0"))].map(
                                (id, idx) => (
                                  <FaStar key={idx} className="text-accent" />
                                )
                              )}
                              {[
                                ...Array(5 - parseInt(review?.review || "0")),
                              ].map((id, idx) => (
                                <FaStar key={idx} className="text-gray-300" />
                              ))}
                            </div>
                          </div>
                          <span className="w-full text-left text-xs text-gray-400">
                            {dayjs(review?.created_at).format(
                              "ddd DD MMM, YYYY"
                            )}
                          </span>
                        </div>
                      </div>
                      <p className="w-full pl-16 text-left text-sm text-[#535763] font-medium pt-3">
                        {review?.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
        {/* <Image
          src={`${imageBase(data?.cover_image)}`}
          alt="cover-image"
          width={1000}
          height={1000}
          className="rounded-lg w-full"
        /> */}
        {data?.similar_services?.length !== 0 && (
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
                {data?.similar_services?.map((drip) => (
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
                {data?.similar_services?.map((drip) => (
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
                {data?.similar_services?.map((drip) => (
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
                {data?.similar_services?.map((drip) => (
                  <SwiperSlide key={drip.service_id}>
                    <BestSellingCard drip={drip} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
        {data?.faqs?.length ? (
          <div className="w-full flex flex-col items-center space-y-5 mt-5 lg:mt-10">
            <h1 className="col-span-2 w-full text-left text-xl font-bold">
              FAQs
            </h1>
            <div className="w-full flex flex-col items-center justify-center space-y-2.5">
              {data?.faqs?.map((section, idx) => (
                <Accordion section={section} key={idx} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DripDetailPage;
