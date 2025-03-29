'use client'
import React, { useEffect, useState } from 'react'
import SectionListing from '../Section'
import { useFetchHomeBannersQuery } from '@/store/services/home';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Banners = () => {
    const [sectionData, setSectionData]=useState<any>(null)
    const { data } = useFetchHomeBannersQuery({});
    const { selectedBanner } = useSelector(
        (state: RootState) => state.global
      );

      useEffect(()=>{
        let filteredItems: any=[]
        if(data?.length){
            filteredItems=data?.filter(item=> item?.place===(selectedBanner?.place==='top' ? 'top' : selectedBanner?.place==='middle' ? 'middle' : ''))
        }
        if(selectedBanner?.index && filteredItems?.length){
            setSectionData(filteredItems[selectedBanner?.index]?.data)
        }
      },[data])
      
    return (
        <>
            <SectionListing sectionData={sectionData} />
        </>
    )
}

export default Banners