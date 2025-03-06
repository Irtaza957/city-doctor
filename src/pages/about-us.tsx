import Image from "next/image";
import Icon1 from "@/assets/img/about/icon1.png";
import Icon2 from "@/assets/img/about/icon2.png";
import Icon3 from "@/assets/img/about/icon3.png";
import About1 from "@/assets/img/about/about1.png";
import About2 from "@/assets/img/about/about2.png";
import About3 from "@/assets/img/about/about3.png";
import GoogleAnalytics from "../components/GoogleAnalytics";

const AboutUs = () => {
  return (
    <>
    <GoogleAnalytics />
    <div className="w-full flex items-center justify-center mt-[85px] md:mt-[150px]">
      <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto px-5 md:px-0 flex flex-col items-center justify-center gap-5 sm:gap-10 md:gap-20">
        <h1 className="w-full text-left text-2xl xl:text-4xl font-bold">
          About Us
        </h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10">
          <Image
            src={About1}
            alt="about1"
            width={1000}
            height={1000}
            className="col-span-1 w-full rounded-lg"
          />
          <div className="w-full flex flex-col items-start justify-start pt-3 space-y-3">
            <h1 className="w-full text-left text-2xl xl:text-3xl font-bold">
              Heading
            </h1>
            <p className="w-full text-left text-sm font-medium text-[#535763]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book.
              <br />
              <br />
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
              <br />
              <br />
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-y-10 xl:gap-y-0 bg-primary text-white pt-8 pb-5">
          <div className="col-span-1 w-full h-full flex flex-col items-center justify-center space-y-3.5">
            <Image src={Icon1} alt="icon1" width={80} height={80} />
            <span className="w-full text-center text-4xl font-bold">9,632</span>
            <span className="w-full text-center text-sm font-medium !mt-1">
              Happy Patients
            </span>
          </div>
          <div className="col-span-1 w-full h-full flex flex-col items-center justify-center space-y-3.5">
            <Image src={Icon2} alt="icon2" width={80} height={80} />
            <span className="w-full text-center text-4xl font-bold">178</span>
            <span className="w-full text-center text-sm font-medium !mt-1">
              Qualified Doctors
            </span>
          </div>
          <div className="col-span-1 w-full h-full flex flex-col items-center justify-center space-y-3.5">
            <Image src={Icon3} alt="icon3" width={80} height={80} />
            <span className="w-full text-center text-4xl font-bold">24/7</span>
            <span className="w-full text-center text-sm font-medium !mt-1">
              Instant Service
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center space-y-5">
          <h1 className="w-full text-center text-2xl xl:text-3xl font-bold">
            Certified and Experienced Doctors
          </h1>
          <p className="w-full xl:w-[85%] 3xl:w-[70%] text-center text-sm font-medium text-[#535763] pb-5">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Praesentium, sit iure. Aut corporis nisi blanditiis saepe fugit
            labore in asperiores mollitia neque repudiandae! Quasi repellat et
            officiis itaque quis quod?
          </p>
          <Image
            src={About2}
            alt="about2"
            width={1000}
            height={1000}
            className="col-span-1 w-full h-full"
          />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 !mt-20 !mb-10">
          <Image
            src={About3}
            alt="about1"
            width={1000}
            height={1000}
            className="col-span-1 w-full rounded-lg"
          />
          <div className="w-full flex flex-col items-start justify-start pt-3 space-y-3">
            <h1 className="w-full text-left text-2xl xl:text-3xl font-bold">
              Our Vision
            </h1>
            <p className="w-full text-left text-sm font-medium text-[#535763]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book.
              <br />
              <br />
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
              <br />
              <br />
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 !mb-20">
          <div className="w-full flex flex-col items-start justify-start pt-3 space-y-3">
            <h1 className="w-full text-left text-2xl xl:text-3xl font-bold">
              Our Mission
            </h1>
            <p className="w-full text-left text-sm font-medium text-[#535763]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book.
              <br />
              <br />
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
              <br />
              <br />
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <Image
            src={About1}
            alt="about1"
            width={1000}
            height={1000}
            className="col-span-1 w-full rounded-lg order-first md:order-last"
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutUs;
