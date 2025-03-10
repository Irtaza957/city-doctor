import {
  FaFacebook,
  FaInstagram,
} from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "@/assets/img/footer-logo.svg";

const Footer = () => {
  const router = useRouter();

  return (
    <div
      className={`${
        router.asPath.includes("location") || router.asPath === "/drips"
          ? "hidden"
          : "flex"
      } w-full items-center justify-center bg-[#181818] px-5 pt-10 pb-36 md:pb-10`}
    >
      <footer className="w-full md:w-[70%] mx-auto h-full flex flex-col items-center justify-center space-y-2 text-white">
        <Image
          priority
          src={Logo}
          alt="logo"
          width={160}
          height={50}
          className="w-40"
        />
        <div className="w-full flex items-center justify-center space-x-5 pb-10 border-b border-white !mt-8">
          <FaFacebook className="w-5 h-5 text-white" />
          <FaInstagram className="w-5 h-5 text-white" />
          {/* <FaYoutube className="w-5 h-5 text-white" /> */}
          {/* <FaTiktok className="w-5 h-5 text-white" /> */}
          {/* <FaXTwitter className="w-5 h-5 text-white" /> */}
        </div>
        <div className="w-full h-full flex items-center justify-center xl:justify-between gap-5 flex-wrap text-white font-light pt-2 pb-4 xl:px-20 border-b">
          <Link href="/faq">FAQs</Link>
          <Link href="/terms-and-conditions">Terms</Link>
          {/* <Link href="/privacy-policy">Privacy</Link> */}
          {/* <Link href="/">Sitemap</Link> */}
          <Link href="/careers">Careers</Link>
          <Link href="/blogs">Blogs</Link>
          {/* <Link href="/">Support</Link> */}
          {/* <Link href="/contact-us">Contact Us</Link> */}
          <Link href="/about-us">About Us</Link>
          <Link href="/contact-us">Contact Us</Link>
        </div>
        <h1 className="w-full text-center text-xs font-light !mt-8">
          MOHAP License: 58974
        </h1>
        <h1 className="w-full text-center text-xs font-light">
          &copy; 2023 City Doctor Healthcare LLC. All Rights Reserved.
        </h1>
      </footer>
    </div>
  );
};

export default Footer;
