import DripListing from '@/components/drips'
import Head from 'next/head'
import React from 'react'
import GoogleAnalytics from '../../components/GoogleAnalytics'

const Drips = () => {
  return (
    <>
    <GoogleAnalytics />
      <Head>
        <title>Lab Test at Home in Dubai – City Doctor Healthcare</title>
        <meta name="description" content="Get a lab test at home with City Doctor. Safe, reliable, and convenient health checkups without visiting a clinic. Call 8005060 to book now." />
      </Head>
      <DripListing />
    </>
  )
}

export default Drips