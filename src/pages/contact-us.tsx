import {
  FaWhatsapp,
  FaEnvelope,
  FaLocationDot,
  FaHeadphonesSimple,
} from "react-icons/fa6";
import { GoogleMapsEmbed } from "@next/third-parties/google";
import GoogleAnalytics from "../components/GoogleAnalytics";

const ContactUs = () => {
  return (
    <>
    <GoogleAnalytics />
    <div className="w-full flex flex-col items-center justify-center mt-[91.25px] sm:mt-[85px] md:mt-[150px]">
      <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto px-5 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-10 pb-20">
        <h1 className="col-span-1 md:col-span-3 w-full text-left text-2xl xl:text-4xl font-bold">
          Contact Us
        </h1>
        <div className="col-span-1 w-full py-5 px-8 bg-[#F8F8F8] rounded-xl flex flex-col items-start justify-start space-y-5">
          <h1 className="w-full text-left text-xl font-semibold">
            24/7 Support
          </h1>
          <div className="w-full flex items-start justify-start space-x-2.5">
            <FaWhatsapp className="w-5 h-5 text-primary" />
            <div className="w-full flex flex-col items-center justify-center">
              <span className="w-full text-left text-sm text-primary font-semibold">
                Whatsapp
              </span>
              <span className="w-full text-left text-xs font-medium text-[#555555]">
                +971 56 330 2017
              </span>
            </div>
          </div>
          <div className="w-full flex items-start justify-start space-x-2.5">
            <FaHeadphonesSimple className="w-5 h-5 text-primary" />
            <div className="w-full flex flex-col items-center justify-center">
              <span className="w-full text-left text-sm text-primary font-semibold">
                Customer Service
              </span>
              <span className="w-full text-left text-xs font-medium text-[#555555]">
                800 50 60
              </span>
            </div>
          </div>
          <div className="w-full flex items-start justify-start space-x-2.5">
            <FaEnvelope className="w-5 h-5 text-primary" />
            <div className="w-full flex flex-col items-center justify-center">
              <span className="w-full text-left text-sm text-primary font-semibold">
                By E-Mail
              </span>
              <span className="w-full text-left text-xs font-medium text-[#555555]">
                info@citydoctor.ae
              </span>
            </div>
          </div>
          <h1 className="w-full text-left text-xl font-semibold">
            Address Details
          </h1>
          <div className="w-full flex items-start justify-start space-x-2.5">
            <FaLocationDot className="w-5 h-5 text-primary" />
            <div className="w-full flex flex-col items-center justify-center">
              <span className="w-full text-left text-sm text-primary font-semibold">
                Office
              </span>
              <span className="w-full text-left text-xs font-medium text-[#555555]">
                Grosvenor Business Tower - Office 1507,
                <br />
                Al Barsha Heights - Dubai
              </span>
            </div>
          </div>
        </div>
        <form className="col-span-1 md:col-span-2 w-full grid grid-cols-2 gap-5">
          <div className="col-span-1 w-full flex flex-col items-center justify-center space-y-1.5">
            <label
              htmlFor="fname"
              className="w-full text-left text-sm font-medium"
            >
              First Name
            </label>
            <input
              type="text"
              className="w-full p-1.5 rounded-lg bg-[#EFEFEF]"
            />
          </div>
          <div className="col-span-1 w-full flex flex-col items-center justify-center space-y-1.5">
            <label
              htmlFor="lname"
              className="w-full text-left text-sm font-medium"
            >
              Last Name
            </label>
            <input
              type="text"
              className="w-full p-1.5 rounded-lg bg-[#EFEFEF]"
            />
          </div>
          <div className="col-span-1 w-full flex flex-col items-center justify-center space-y-1.5">
            <label
              htmlFor="email"
              className="w-full text-left text-sm font-medium"
            >
              E-Mail
            </label>
            <input
              type="email"
              className="w-full p-1.5 rounded-lg bg-[#EFEFEF]"
            />
          </div>
          <div className="col-span-1 w-full flex flex-col items-center justify-center space-y-1.5">
            <label
              htmlFor="name"
              className="w-full text-left text-sm font-medium"
            >
              Phone
            </label>
            <input
              type="text"
              className="w-full p-1.5 rounded-lg bg-[#EFEFEF]"
            />
          </div>
          <div className="col-span-2 w-full flex flex-col items-center justify-center space-y-1.5">
            <label
              htmlFor="subject"
              className="w-full text-left text-sm font-medium"
            >
              Subject
            </label>
            <input
              type="text"
              className="w-full p-1.5 rounded-lg bg-[#EFEFEF]"
            />
          </div>
          <div className="col-span-2 w-full flex flex-col items-center justify-center space-y-1.5">
            <label
              htmlFor="message"
              className="w-full text-left text-sm font-medium"
            >
              Message
            </label>
            <textarea rows={3} className="w-full bg-[#EFEFEF] rounded-lg" />
          </div>
          <button className="w-1/2 xl:w-1/2 bg-primary text-white rounded-lg py-2.5 font-semibold">
            Send
          </button>
        </form>
      </div>
      <div className="w-full h-[600px]">
        <GoogleMapsEmbed
          zoom="17"
          height={600}
          width="100%"
          mode="place"
          q="City+Doctor+Healthcare"
          center="25.0989095,55.1747754"
          apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        />
      </div>
    </div>
    </>
  );
};

export default ContactUs;
