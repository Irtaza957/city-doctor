import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "@/assets/icons/mobileFooterLogo.svg"
import X from "@/assets/icons/X.svg"
import tabby from "@/assets/icons/tabby.svg"
import tamara from "@/assets/icons/tamara.svg"
import visa from "@/assets/icons/visa.svg"
import mastercard from "@/assets/icons/mastercard.svg"
import Tiktok from "@/assets/icons/tiktok.svg"
import americanExress from "@/assets/icons/americanExpress.svg"

const Footer = () => {
  const router = useRouter();

  return (
    <div
      className={`${router.asPath.includes("location") || router.asPath === "/drips"
        ? "hidden"
        : "flex"
        } hidden md:block w-full items-center justify-center bg-[#EFEFEF] px-5 pt-10 pb-36 md:pb-10`}
    >
      <footer className="w-full md:w-[80%] mx-auto h-full flex flex-col items-center justify-center space-y-2 text-black">
        <Image
          priority
          src={Logo}
          alt="logo"
          width={160}
          height={50}
          className="w-40"
        />
        <div className="w-full h-full flex items-center justify-center gap-x-8 gap-y-3 flex-wrap text-black pt-2 !mb-3 pb-7 px-10 border-b-[0.25px] border-[#959595]">
          <Link href="/faq">FAQs</Link>
          <Link href="/terms-and-conditions">Terms</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/contact-us">Contact Us</Link>
          <Link href="/refund-policy">Refund Policy</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
        <div className="w-full !mt-5 flex flex-col items-center justify-center gap-3">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex items-center gap-3">
              <Image
                src={tabby}
                alt="home"
                className="object-cover"
                width={88}
                height={36}
              />
              <Image
                src={tamara}
                alt="home"
                className="object-cover"
                width={110}
                height={36}
              />
              <Image
                src={visa}
                alt="home"
                className="object-cover rounded-[2px]"
                width={57}
                height={33}
              />
              <Image
                src={mastercard}
                alt="home"
                className="object-cover rounded-[2px]"
                width={57}
                height={33}
              />
              <Image
                src={americanExress}
                alt="home"
                className="object-cover rounded-[2px]"
                width={57}
                height={33}
              />
            </div>
          </div>
          <p className="text-xs mb-2 text-center pb-7 border-b-[0.25px] border-[#959595] w-full mt-1.5">Secure payment powered by encrypted SSL
            <br />We accept all major credit cards</p>
          <p className="text-lg mt-1">Connect With Us</p>
          <div className="w-full flex items-center justify-center space-x-7 pb-[22px] border-b-[0.25px] border-[#959595]">
            <FaFacebook className="w-7 h-7 text-black" />
            <FaInstagram className="w-7 h-7 text-black" />
            <FaYoutube className="w-7 h-7 text-black" />
            <Image
              src={Tiktok}
              alt="home"
              className="object-cover"
              width={16}
              height={16}
            />
            <Image
              src={X}
              alt="home"
              className="object-cover !ml-4"
              width={16}
              height={16}
            />
          </div>
        </div>
        <h1 className="w-full text-center text-sm font-light !mt-6 text-black">
          MOHAP License: 58974
        </h1>
        <h1 className="w-full text-center text-sm font-light text-black">
          &copy; 2023 City Doctor Healthcare LLC. All Rights Reserved.
        </h1>
      </footer>
    </div>
    // <div
    //   className={`${
    //     router.asPath.includes("location") || router.asPath === "/drips"
    //       ? "hidden"
    //       : "flex"
    //   } hidden md:block w-full items-center justify-center bg-[#181818] px-5 pt-10 pb-36 md:pb-10`}
    // >
    //   <footer className="w-full md:w-[70%] mx-auto h-full flex flex-col items-center justify-center space-y-2 text-white">
    //     <Image
    //       priority
    //       src={Logo}
    //       alt="logo"
    //       width={160}
    //       height={50}
    //       className="w-40"
    //     />
    //     <div className="w-full flex items-center justify-center space-x-5 pb-10 border-b border-white !mt-8">
    //       <FaFacebook className="w-5 h-5 text-white" />
    //       <FaInstagram className="w-5 h-5 text-white" />
    //       {/* <FaYoutube className="w-5 h-5 text-white" /> */}
    //       {/* <FaTiktok className="w-5 h-5 text-white" /> */}
    //       {/* <FaXTwitter className="w-5 h-5 text-white" /> */}
    //     </div>
    //     <div className="w-full h-full text-sm md:text-base flex items-center justify-center xl:justify-between gap-5 flex-wrap text-white font-light pt-2 pb-4 xl:px-20 border-b">
    //       <Link href="/faq">FAQs</Link>
    //       <Link href="/terms-and-conditions">Terms</Link>
    //       {/* <Link href="/careers">Careers</Link> */}
    //       <Link href="/blogs">Blogs</Link>
    //       <Link href="/about-us">About Us</Link>
    //       <Link href="/contact-us">Contact Us</Link>
    //       <Link href="/refund-policy">Refund Policy</Link>
    //       <Link href="/privacy-policy">Privacy Policy</Link>
    //     </div>
    //     <h1 className="w-full text-center text-xs font-light !mt-8">
    //       MOHAP License: 58974
    //     </h1>
    //     <h1 className="w-full text-center text-xs font-light">
    //       &copy; 2023 City Doctor Healthcare LLC. All Rights Reserved.
    //     </h1>
    //   </footer>
    // </div>
  );
};

export default Footer;
