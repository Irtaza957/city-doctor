import DripListing from '@/components/drips'
import Head from 'next/head'
import React from 'react'
import GoogleAnalytics from '../../components/GoogleAnalytics'

const Drips = () => {
  return (
    <>
    <GoogleAnalytics />
    <Head>
        <title>Vitamin IV Drip At Home – City Doctor Healthcare</title>
        <meta name="description" content="Get IV drip therapy at home for hydration, energy, immunity, and hangover recovery. Fast, safe, and delivered to your doorstep. Call 8005060 to book now." />
      </Head>
    <DripListing/>
    </>
  )
}

export default Drips