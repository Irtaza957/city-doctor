import DripListing from '@/components/drips'
import Head from 'next/head'
import React from 'react'
import GoogleAnalytics from '../../components/GoogleAnalytics'
import { useRouter } from 'next/router'
import { categoriesMetaData } from '@/utils/constants'

const Drips = () => {
  const router = useRouter();
  const { name } = router.query
  const selectedCategory=categoriesMetaData?.find(item=>item?.name===name) || categoriesMetaData?.[0]
  
  return (
    <>
    <GoogleAnalytics />
    <Head>
        <title>{selectedCategory?.data?.title}</title>
        <meta name="description" content={selectedCategory?.data?.description} />
      </Head>
    <DripListing/>
    </>
  )
}

export default Drips