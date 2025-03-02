import Image from "next/image";
import { FaChartPie, FaMountainSun } from "react-icons/fa6";

import HeartIcon from "@/assets/icons/HeartIcon";
import About3 from "@/assets/img/about/about3.png";

const Careers = () => {
  return (
    <div className="w-full flex items-center justify-center mt-[85px] md:mt-[150px]">
      <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto px-5 md:px-0 flex flex-col items-center justify-center gap-5 sm:gap-10 md:gap-20">
        <h1 className="w-full text-left text-2xl xl:text-4xl font-bold">
          Careers
        </h1>
        <Image
          src={About3}
          alt="about3"
          width={1000}
          height={1000}
          className="w-full h-[500px] object-cover"
        />
        <div className="w-full flex flex-col items-center justify-center space-y-5 md:space-y-10">
          <h1 className="w-full text-center text-2xl xl:text-4xl font-bold">
            Why Join Us ?
          </h1>
          <p className="w-full xl:w-[85%] 3xl:w-[70%] text-center text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Praesentium, sit iure. Aut corporis nisi blanditiis saepe fugit
            labore in asperiores mollitia neque repudiandae! Quasi repellat et
            officiis itaque quis quod?
          </p>
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="col-span-1 w-full h-full flex flex-col items-center justify-center space-y-5 px-5 py-10 bg-gray-100 text-black">
              <FaChartPie className="w-24 h-24 text-primary" />
              <p className="w-full text-center text-2xl font-bold">Heading</p>
              <p className="w-full text-center text-sm text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
                saepe laborum modi sapiente quas in ab velit repudiandae,
                perspiciatis earum molestiae? Maiores aliquam dignissimos
                veritatis quo dolor reprehenderit recusandae cum?
              </p>
            </div>
            <div className="col-span-1 w-full h-full flex flex-col items-center justify-center space-y-5 px-5 py-10 bg-gray-100 text-black">
              <FaMountainSun className="w-24 h-24 text-primary" />
              <p className="w-full text-center text-2xl font-bold">Heading</p>
              <p className="w-full text-center text-sm text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
                saepe laborum modi sapiente quas in ab velit repudiandae,
                perspiciatis earum molestiae? Maiores aliquam dignissimos
                veritatis quo dolor reprehenderit recusandae cum?
              </p>
            </div>
            <div className="col-span-1 w-full h-full flex flex-col items-center justify-center space-y-5 px-5 py-10 bg-gray-100 text-black">
              <HeartIcon className="size-24 text-primary" />
              <p className="w-full text-center text-2xl font-bold">Heading</p>
              <p className="w-full text-center text-sm text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
                saepe laborum modi sapiente quas in ab velit repudiandae,
                perspiciatis earum molestiae? Maiores aliquam dignissimos
                veritatis quo dolor reprehenderit recusandae cum?
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center space-y-10 pb-20">
          <div className="w-full flex flex-col items-center justify-center space-y-2.5">
            <h1 className="w-full text-left text-2xl xl:text-4xl font-bold">
              Why Join Us ?
            </h1>
            <p className="w-full xl:w-[85%] 3xl:w-[70%] text-left text-sm mr-auto">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Praesentium, sit iure. Aut corporis nisi blanditiis saepe fugit
              labore in asperiores mollitia neque repudiandae! Quasi repellat et
              officiis itaque quis quod?
            </p>
          </div>
          {[...Array(5)].map((id) => (
            <div
              key={id}
              className="w-full flex flex-col items-center justify-center space-y-2.5"
            >
              <div className="w-full flex items-center justify-between">
                <h1 className="w-full text-xl xl:text-2xl font-bold text-left">
                  Associate Admin Customer Services
                </h1>
                <button className="px-10 py-2.5 rounded-lg bg-primary text-white font-medium hidden md:flex">
                  Apply
                </button>
              </div>
              <div className="w-full flex items-center justify-start">
                <button className="px-10 py-2 mr-5 rounded-lg bg-primary text-white font-medium flex md:hidden">
                  Apply
                </button>
                <p className="px-10 py-2.5 md:mr-10 rounded-lg bg-gray-100 text-black text-sm">
                  Fulltime
                </p>
                <p className="text-xs xl:text-sm hidden md:flex">
                  Last Date: 15 Jan
                </p>
              </div>
              <p className="text-xs xl:text-sm md:hidden flex w-full text-left">
                Last Date: 15 Jan
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Careers;
