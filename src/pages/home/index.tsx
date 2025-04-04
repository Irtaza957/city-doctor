"use client";

import { useEffect, useState } from "react";
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
import React from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Image from "next/image";
import Clients from "@/assets/icons/clients.svg";

const Home = () => {
  const [showMore, setShowMore] = useState(false)

  const dispatch = useDispatch();
  const { data, isLoading } = useFetchHomeDataQuery({});

  const handleShowMore = () => {
    setShowMore(prev => !prev)
  }

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
      <div className="sm:hidden w-full mt-[85px]"><Categories /></div>
      <Header position="top" />
      <div className="hidden sm:block w-full"><Categories /></div>
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
          const isMiddle = idx === Math.round(data.length / 2) - 1; // Determine the middle index

          return (
            <React.Fragment key={idx}>
              {section.rows === "2" ? (
                <DoctorVisit
                  bg={idx % 2 === 0 ? "bg-[#F8F8F8]" : "bg-white"}
                  section={section}
                />
              ) : (
                <BestSelling
                  bg={idx % 2 === 0 ? "bg-[#F8F8F8]" : "bg-white"}
                  section={section}
                />
              )}

              {isMiddle && <Header position="middle" />}
            </React.Fragment>
          );
        })
      )}
      <div className="flex flex-col items-center text-left md:text-center justify-center gap-5 px-4 md:px-2 sm:w-[70%] md:w-[45%] my-7 md:pb-5">
        <div className="w-full">
          <p className="text-xl sm:text-2xl font-bold text-left w-full md:whitespace-nowrap text-[#333333]">About <br />City Doctor</p>
          <div className={`space-y-3 ${showMore && 'border-b pb-5'} mt-3`}>
            <p className="sm:text-xl font-bold md:whitespace-nowrap text-[#333333]">Bringing Quality Medical Care to Your Home</p>
            <p className="text-xs sm:text-sm md:px-8">At City Doctor, we provide expert home healthcare services across Dubai, ensuring you receive professional medical care without leaving your home. Whether you need a doctor on call, IV therapy, lab tests, or physiotherapy, our dedicated team is available 24/7, delivering medical services at home in Dubai with convenience, care, and efficiency.</p>
          </div>
        </div>
        {showMore &&
          <div className="w-full">
            <p className="text-[#333333] sm:text-xl font-bold md:whitespace-nowrap sm:text-center w-full">
              Why Choose City Doctor?
            </p>
            <div className="w-full text-left text-sm font-medium text-[#535763] space-y-3 !my-3 sm:ml-6">
              <p><span className='font-bold'>✔ 24/7 Medical Services at Home </span>– We are available around the clock, ensuring medical care is just a call away.</p>
              <p><span className='font-bold'>✔ Fast & Reliable Healthcare </span>– Our team reaches your location within 30–45 minutes after confirmation.</p>
              <p><span className='font-bold'>✔ DHA-Certified Professionals </span>– Our licensed doctors, nurses, and therapists provide expert medical attention.</p>
              <p><span className='font-bold'>✔ Personalized & Confidential Care </span>– Enjoy healthcare services tailored to your needs in the comfort of your home.</p>
            </div>
            <div className="space-y-3 mt-6 border-t pt-5">
              <p className="text-[#333333] sm:text-xl font-bold md:whitespace-nowrap">Our Home Healthcare Services</p>
              <div className="flex flex-col justify-start items-start">
                <p className="font-semibold text-sm">1. &nbsp;Doctor on Call – Consultation at Your Doorstep</p>
                <p className="text-xs sm:text-sm text-left mt-3 md:ml-5">At City Doctor, we provide expert home healthcare services across Dubai, ensuring you receive professional medical care without leaving your home. Whether you need a doctor on call, IV therapy, lab tests, or physiotherapy, our dedicated team is available 24/7, delivering medical services at home in Dubai with convenience, care, and efficiency.</p>
              </div>
              <div className="flex flex-col justify-start items-start">
                <p className="font-semibold text-sm">2. &nbsp;IV Drip Therapy at Home – Instant Hydration & Recovery</p>
                <p className="text-xs sm:text-sm text-left mt-3 md:ml-5">Our IV therapy services at home provide essential hydration, vitamins, and nutrients to boost immunity, energy, and overall well-being. Whether for fatigue, dehydration, hangover recovery, or wellness enhancement, our IV drips are administered by professional nurses.</p>
              </div>
              <div className="flex flex-col justify-start items-start">
                <p className="font-semibold text-sm">3. &nbsp;Lab Tests at Home – Fast & Accurate Results</p>
                <p className="text-xs sm:text-sm text-left mt-3 md:ml-5">Skip the clinic queues! We offer lab tests at home for routine checkups, disease screenings, and diagnostic tests. Our certified team ensures safe sample collection, with fast and accurate results delivered securely.</p>
              </div>
              <div className="flex flex-col justify-start items-start">
                <p className="font-semibold text-sm">4. &nbsp;Physiotherapy and Body Adjustment at Home</p>
                <p className="text-xs sm:text-sm text-left mt-3 md:ml-5">Recover faster and improve mobility with physiotherapy and body adjustment at home. Our expert physiotherapists help with pain management, muscle recovery, posture correction, and joint flexibility. </p>
              </div>
              <p className="text-xs sm:text-sm text-left mt-3 md:ml-5">Whether you need rehabilitation after an injury, relief from chronic pain, or a personalized body adjustment session, we bring professional care to your doorstep.</p>
            </div>
            <div className=" w-full !my-1 flex flex-col items-start justify-center space-y-3 border-t pt-5 !mt-5">
              <p className="text-[#333333] sm:text-xl font-bold md:whitespace-nowrap md:text-center w-full">
                Book Your Home Healthcare Service in Dubai
              </p>
              <p className="text-xs sm:text-sm md:text-center">City Doctor is committed to making healthcare accessible, efficient, and stress-free. Whether you need a doctor on call, an IV drip, or a lab test at home, we are just a call away.</p>
              <p className="text-xs sm:text-sm md:text-center w-full">Call us now at <span className="font-bold">8005060</span> to book your home medical service in Dubai!</p>
            </div>
          </div>}
        <div className="flex items-start justify-start sm:justify-center w-full">
          <button onClick={handleShowMore} className="h-[36px] px-8 py-2 bg-primary rounded-md text-white mt-1 font-semibold text-sm">Read {showMore ? 'Less' : 'More'}</button>
        </div>
      </div>
      <div className="sm:hidden bg-[#F5F5F5] rounded-xl flex flex-col items-center justify-center pt-7 pb-12 mx-auto w-[93%] -mt-2">
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
    </div>
  );
};

export default Home;
