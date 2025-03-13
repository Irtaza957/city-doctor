"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Header from "@/components/Header";
import { setCountry } from "@/store/global";
import Categories from "@/components/Categories";
import BestSelling from "@/components/BestSelling";
import DoctorVisit from "@/components/DoctorVisit";
import { fetchCountryFromIP } from "@/utils/helpers";
import { useFetchHomeDataQuery } from "@/store/services/home";
import DoctorVisitSkeleton from "@/components/cards/skeleton/DoctorVisitSkeleton";
import Head from "next/head";
import GoogleAnalytics from "../components/GoogleAnalytics";
import { useRouter } from "next/router";

const Home = () => {
  const dispatch = useDispatch();
  const route=useRouter()
  const { data, isLoading } = useFetchHomeDataQuery({});

  const setCountryCode = (code: string) => {
    dispatch(setCountry(code));
  };

  const handleNavigate=()=>{
    route.push('/about-us')
  }

  useEffect(() => {
    fetchCountryFromIP(setCountryCode);
  }, []);

  return (
    <div className="w-full flex flex-col mb-10 xl:mb-20 items-center justify-center">
      <GoogleAnalytics />
      <Head>
        <title>City Doctor Healthcare - At Your Doorstep in 30 to 45 Minutes</title>
        <meta name="description" content="City Doctor offers 24/7 DHA-certified home healthcare in Dubai, reaching you in less than an hour at home, hotels, or offices. Expert care anytime, anywhere. Call 8005060 to book now." />
      </Head>
      <Header />
      <Categories />
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto px-5 md:px-0 grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, idx) => (
              <DoctorVisitSkeleton key={idx} />
            ))}
          </div>
        </div>
      ) : (
        data?.map((section: DRIP, idx: number) => {
          if (section.rows === "2") {
            return (
              <DoctorVisit
                bg={`${idx % 2 === 0 ? "bg-[#F8F8F8]" : "bg-white"}`}
                key={idx}
                section={section}
              />
            );
          } else {
            return (
              <BestSelling
                bg={`${idx % 2 === 0 ? "bg-[#F8F8F8]" : "bg-white"}`}
                key={idx}
                section={section}
              />
            );
          }
        })
      )}
      <div className="flex flex-col items-center text-center justify-center gap-5 px-10 sm:w-[70%] md:w-[45%] my-7">
        <p className="text-xl sm:text-2xl font-bold md:whitespace-nowrap">City Doctor – Trusted Home Healthcare Services in Dubai</p>
        <p className="text-xs sm:text-base">At City Doctor, we provide expert home healthcare services across Dubai, ensuring you receive professional medical care without leaving your home. Whether you need a doctor on call, IV therapy, lab tests, or physiotherapy, our dedicated team is available 24/7, delivering medical services at home in Dubai with convenience, care, and efficiency.</p>
        <button onClick={handleNavigate} className="h-[36px] px-8 py-2 bg-primary rounded-md text-white mt-3 font-semibold text-sm">Read More</button>
      </div>
    </div>
  );
};

export default Home;
