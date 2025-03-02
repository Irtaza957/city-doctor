"use client";

import "@/assets/css/globals.css";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import type { AppProps } from "next/app";
import Footer from "@/components/Footer";
import store, { persistor } from "@/store";
import CartBar from "@/components/CartBar";
import BottomNav from "@/components/BottomNav";
import CheckoutBar from "@/components/CheckoutBar";

import { Router } from "next/router";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

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

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster />
        <Navbar />
        {loading && <Loader />}
        <Component {...pageProps} />
        <CheckoutBar />
        <BottomNav />
        <Footer />
        <CartBar />
      </PersistGate>
    </Provider>
  );
}
