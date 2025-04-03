"use client";

import "@/assets/css/globals.css";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import type { AppProps } from "next/app";
import Footer from "@/components/Footer";
import store, { persistor } from "@/store";
import CartBar from "@/components/CartBar";
import CheckoutBar from "@/components/CheckoutBar";

import { Router } from "next/router";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { PersistGate } from "redux-persist/integration/react";
import BottomNav from "@/components/BottomNav";
import MobileFooter from "@/components/MobileFooter";
import { usePathname } from "next/navigation";
import { staticPaths } from "@/utils/constants";

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  // const [showBottomNav, setShowBottomNav] = useState(true);
  // const [lastScrollY, setLastScrollY] = useState(0);

  const pathname = usePathname()?.split('/')

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
  //     if (currentScrollY < lastScrollY) {
  //       setShowBottomNav(true); // Show when scrolling up
  //     } else {
  //       setShowBottomNav(false); // Hide when scrolling down
  //     }
  //     setLastScrollY(currentScrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [lastScrollY]);

  // const isTwoChars = pathname?.length === 2;
  // const isThreeCharsButNotHome = pathname?.length === 3 && pathname?.[1] !== 'home'

  const isCategoriesPath = (pathname?.length === 2 || pathname?.length === 3) && ![...staticPaths, 'cart', 'check-out', 'bookings'].includes(pathname?.[1]);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isCategoriesPath && window.innerWidth < 650) {
      htmlElement.classList.add("h-screen", "overflow-hidden");
    } else {
      htmlElement.classList.remove("h-screen", "overflow-hidden");
    }
  }, [isCategoriesPath]);

  return (
    <>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-WGSTHMG"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster />
          <Navbar />
          {loading && <Loader />}
          <Component {...pageProps} />
          <CheckoutBar isMenuVisible={pathname?.length !== 4} />
          {pathname?.length !== 4 && <BottomNav />}
          {/* {showBottomNav && <BottomNav />} */}
          <Footer />
          { }
          {(staticPaths.includes(pathname?.[1])) && <MobileFooter />}
          <CartBar />
        </PersistGate>
      </Provider>
    </>
  );
}