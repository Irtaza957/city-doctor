import DripListing from '@/components/drips'
import Head from 'next/head'
import React from 'react'
import GoogleAnalytics from '../../components/GoogleAnalytics'

const Drips = () => {
  return (
    <>
    <GoogleAnalytics />
      <Head>
        <title>Doctor on Call - Professional General Physician at Your Doorstep</title>
        <meta name="description" content="Feeling unwell? Skip the clinic. Get a general physician at your home for expert care. Available 24/7. Call 8005060 to book your doctor-on-call service now." />
      </Head>
      <DripListing />
    </>
  )
}

export default Drips