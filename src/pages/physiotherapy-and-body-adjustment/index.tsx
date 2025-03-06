import DripListing from '@/components/drips'
import Head from 'next/head'
import React from 'react'
import GoogleAnalytics from '../../components/GoogleAnalytics'

const Drips = () => {
  return (
    <>
    <GoogleAnalytics />
      <Head>
        <title>Physiotherapy At Home – City Doctors Healthcare</title>
        <meta name="description" content="Professional in-home physiotherapy and body adjustment for pain relief and recovery. Expert care in your comfort. Call 8005060 to book now." />
      </Head>
      <DripListing />
    </>
  )
}

export default Drips