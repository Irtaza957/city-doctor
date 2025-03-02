"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import About1 from "@/assets/img/about/about1.png";

const Blogs = () => {
  const [unset, setUnset] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 950;

      if (scrollPosition >= threshold) {
        setUnset(true);
      } else {
        setUnset(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full flex items-center justify-center mt-[85px] md:mt-[150px]">
      <div className="relative w-full md:w-[90%] lg:max-w-[1440px] mx-auto px-5 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-y-5 lg:gap-x-10 pb-20">
        <h1 className="col-span-1 md:col-span-3 w-full text-left text-2xl xl:text-4xl font-bold">
          Blogs
        </h1>
        <div className="col-span-1 md:col-span-2 w-full flex flex-col items-center justify-center divide-y divide-[#DEDEDE]">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className={`w-full flex flex-col items-center justify-center space-y-2.5 ${
                idx === 0 ? "pb-10" : "py-10"
              }`}
            >
              <h1 className="w-full text-left text-2xl font-bold">
                Together we can do so much
              </h1>
              <p className="w-full text-left text-xs font-medium text-[#A3A3A3]">
                Feb 11, 2023 - Blogs
              </p>
              <Image
                src={About1}
                alt="about1"
                width={1000}
                height={1000}
                className="w-full h-[500px] object-cover"
              />
              <p className="w-full text-left text-sm font-medium text-[#535763] !mt-4">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Officiis fugiat exercitationem ducimus eos, sapiente quo
                doloribus nisi ab itaque in nulla fugit nobis omnis perspiciatis
                eaque aspernatur hic ex dolore dolorum corporis. Veniam quos,
                aspernatur quo harum odio sapiente suscipit similique quas
                reiciendis praesentium ullam quam animi dolores eaque dolor?
              </p>
              <button className="w-1/2 md:w-1/3 xl:w-1/6 bg-primary text-white place-self-start text-sm !mt-10 rounded-lg py-1.5 font-semibold">
                Read More...
              </button>
            </div>
          ))}
        </div>
        <div
          className={
            unset
              ? "col-span-1 w-full flex flex-col items-start justify-start space-y-2.5"
              : "fixed top-40 right-10 lg:right-16 xl:right-52 col-span-1 w-[27.5%] xl:w-[20%] bg-white hidden md:flex flex-col items-start justify-start space-y-2.5"
          }
        >
          <h1 className="w-full text-left text-2xl font-bold">
            Blog Categories
          </h1>
          <div className="w-full flex flex-col items-center justify-center space-y-2.5 divide-y divide-[#DEDEDE]">
            <div className="w-full flex items-center justify-between pt-2.5 font-medium text-black text-sm">
              <h1 className="text-left">Blogs (10)</h1>
              <p className="text-right">(10)</p>
            </div>
            <div className="w-full flex items-center justify-between pt-2.5 font-medium text-black text-sm">
              <h1 className="text-left">Counseling (1)</h1>
              <p className="text-right">(10)</p>
            </div>
            <div className="w-full flex items-center justify-between pt-2.5 font-medium text-black text-sm">
              <h1 className="text-left">Health (4)</h1>
              <p className="text-right">(10)</p>
            </div>
            <div className="w-full flex items-center justify-between pt-2.5 font-medium text-black text-sm">
              <h1 className="text-left">Kids (3)</h1>
              <p className="text-right">(10)</p>
            </div>
          </div>
          <h1 className="w-full text-left text-2xl font-bold !mt-10 !mb-5">
            Blog Tags
          </h1>
          <div className="w-full grid grid-cols-3 gap-3">
            <p className="col-span-1 w-full py-2.5 rounded-lg bg-[#F8F8F8] text-sm font-medium text-center">
              Health
            </p>
            <p className="col-span-1 w-full py-2.5 rounded-lg bg-[#F8F8F8] text-sm font-medium text-center">
              Health
            </p>
            <p className="col-span-1 w-full py-2.5 rounded-lg bg-[#F8F8F8] text-sm font-medium text-center">
              Health
            </p>
            <p className="col-span-2 w-full py-2.5 rounded-lg bg-[#F8F8F8] text-sm font-medium text-center">
              Health
            </p>
            <p className="col-span-1 w-full py-2.5 rounded-lg bg-[#F8F8F8] text-sm font-medium text-center">
              Health
            </p>
            <p className="col-span-1 w-full py-2.5 rounded-lg bg-[#F8F8F8] text-sm font-medium text-center">
              Health
            </p>
            <p className="col-span-1 w-full py-2.5 rounded-lg bg-[#F8F8F8] text-sm font-medium text-center">
              Health
            </p>
            <p className="col-span-1 w-full py-2.5 rounded-lg bg-[#F8F8F8] text-sm font-medium text-center">
              Health
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
