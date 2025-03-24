import {
    FaFacebook,
    FaInstagram,
    FaYoutube,
} from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "@/assets/icons/mobileFooterLogo.svg"
import Tiktok from "@/assets/icons/tiktok.svg"
import X from "@/assets/icons/X.svg"

const MobileFooter = () => {
    const router = useRouter();

    return (
        <div
            className={`${router.asPath.includes("location") || router.asPath === "/drips"
                ? "hidden"
                : "flex"
                } md:hidden w-full items-center justify-center bg-[#EFEFEF] px-5 pt-10 pb-36 md:pb-10`}
        >
            <footer className="w-full md:w-[70%] mx-auto h-full flex flex-col items-center justify-center space-y-2 text-black">
                <Image
                    priority
                    src={Logo}
                    alt="logo"
                    width={160}
                    height={50}
                    className="w-40"
                />
                <div className="w-full h-full text-sm flex items-center justify-center gap-x-8 gap-y-3 flex-wrap text-black font-light pt-2 pb-6 px-8 border-b border-[#A4A4A4]">
                    <Link href="/faq">FAQs</Link>
                    <Link href="/terms-and-conditions">Terms</Link>
                    <Link href="/blogs">Blogs</Link>
                    <Link href="/about-us">About Us</Link>
                    <Link href="/contact-us">Contact Us</Link>
                    <Link href="/refund-policy">Refund Policy</Link>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                </div>
                <div className="w-full !mt-6 flex flex-col items-center justify-center gap-2">
                    <p className="text-xs mb-2 text-center">Secure payment powered by encrypted SSL
                        <br />We accept all major credit cards</p>
                    <p className="text-sm">Connect With Us</p>
                    <div className="w-full flex items-center justify-center space-x-5 pb-6 border-b border-[#A4A4A4]">
                        <FaFacebook className="w-5 h-5 text-black" />
                        <FaInstagram className="w-5 h-5 text-black" />
                        <FaYoutube className="w-5 h-5 text-black" />
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
                <h1 className="w-full text-center text-xs font-light !mt-8 text-black">
                    MOHAP License: 58974
                </h1>
                <h1 className="w-full text-center text-xs font-light text-black">
                    &copy; 2023 City Doctor Healthcare LLC. All Rights Reserved.
                </h1>
            </footer>
        </div>
    );
};

export default MobileFooter;
