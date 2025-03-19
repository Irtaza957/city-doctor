import DripListing from '@/components/drips'
import Head from 'next/head'
import React from 'react'
import GoogleAnalytics from '../../../components/GoogleAnalytics'
import { useRouter } from 'next/router'
import { subCategoriesMetaData } from '@/utils/constants'

const Drips = () => {
  const router = useRouter();
  const { subcategory } = router.query
  const selectedSubCategory = subCategoriesMetaData?.find(item => item?.name === subcategory) || subCategoriesMetaData?.[0]
  
  return (
    <>
      <GoogleAnalytics />
      <Head>
        <title>{selectedSubCategory?.data?.title}</title>
        <meta name="description" content={selectedSubCategory?.data?.description} />
      </Head>
      <DripListing />
    </>
  )
}

export default Drips