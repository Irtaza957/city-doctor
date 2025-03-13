'use client'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import DripDetailPage from './drips/DripDetail';
import Loader from './Loader';

const ServiceDetail = () => {
    const [dripData, setDripData] = useState<DRIP_DETAIL_RESPONSE | null>(null);
    const [loading, setLoading]=useState(false)
    const router = useRouter();
    const { id } = router.query;

    async function getData({ params }: { params: { id: string | string[] | undefined } }) {
      setLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}services?slug=${params.id}`,
        {
          method: "GET",
          headers: {
            "company-id": process.env.NEXT_PUBLIC_COMPANY_ID!,
            "secret-key": process.env.NEXT_PUBLIC_SECRET_KEY!,
            "business-id": process.env.NEXT_PUBLIC_BUSINESS_ID!,
          },
        }
      );
      setLoading(false)
      
      if (!response.ok) {
        return {
          notFound: true, // Show 404 if API call fails
        };
      }
  
      const service: { status: number; error: string; data: DRIP_DETAIL_RESPONSE } = await response.json();
      setDripData(service.data);
    }
  
    useEffect(() => {
      if (id) {
        getData({ params: { id: id[id.length - 1] as string } });
      }
    }, [id]);
    if(loading){
      return <div className='h-screen'><Loader/></div>
    }
  return <DripDetailPage data={dripData as DRIP_DETAIL_RESPONSE} />;
}

export default ServiceDetail