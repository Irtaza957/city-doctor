
import DripDetailPage from '@/components/drips/DripDetail';
import React from 'react'

const DripDetail = ({data}: {data: DRIP_DETAIL_RESPONSE}) => {
  return (
    <DripDetailPage data={data}/>
  )
}

export default DripDetail

export async function getStaticPaths() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/services`,
    {
      method: "GET",
      headers: {
        company_id: `${process.env.NEXT_PUBLIC_COMPANY_ID!}`,
        secret_key: `${process.env.NEXT_PUBLIC_SECRET_KEY!}`,
        business_id: `${process.env.NEXT_PUBLIC_BUSINESS_ID!}`,
      },
    }
  );

  const drips: DRIP_RESPONSE = await response.json();

  const paths = drips.data.map((service: DRIP_CARD) => ({
    params: { id: `${service?.service_id!}` },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/services?id=${params.id}`,
    {
      method: "GET",
      headers: {
        "company-id": `${process.env.NEXT_PUBLIC_COMPANY_ID!}`,
        "secret-key": `${process.env.NEXT_PUBLIC_SECRET_KEY!}`,
        "business-id": `${process.env.NEXT_PUBLIC_BUSINESS_ID!}`,
      },
    }
  );
  const service: { status: number; error: string; data: DRIP_DETAIL_RESPONSE } =
    await response.json();

  return { props: { data: service.data }, revalidate: 60 };
}