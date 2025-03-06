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

const Home = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useFetchHomeDataQuery({});

  const setCountryCode = (code: string) => {
    dispatch(setCountry(code));
  };

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
    </div>
  );
};

export default Home;
