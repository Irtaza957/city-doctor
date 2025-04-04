import React, { useState } from 'react'
import HeaderSkeleton from '../cards/skeleton/HeaderSkeleton'
import ServiceCardSkeleton from '../cards/skeleton/ServiceCardSkeleton'
import Image from 'next/image'
import Link from 'next/link'
import { cn, sort } from '@/utils/helpers'
import DoctorVisitListingCard from "@/components/cards/DoctorVisitListingCard";
import EmptyResults from "@/assets/img/empty-results.svg";
import DripBanner from "@/assets/icons/mobileDripBanner.svg";
import BestSellingListingCard from '../cards/BestSellingListingCard'
import SortHeader from './SortHeader'

interface MobileViewListingProps {
    subCategories: SERVICE_LIST[] | null,
    handleSubCategorySelect: any
    selectedSubCategory: string,
    subLoading: boolean,
    showResponseTime?: boolean,
    sortingOptions: { id: number, name: string }[],
    getNavLink: any
}

const MobileViewListing = ({ sortingOptions, showResponseTime, subCategories=[], handleSubCategorySelect, selectedSubCategory, subLoading, getNavLink }: MobileViewListingProps) => {
    const [viewType, setViewType] = useState(true);
    const [sorting, setSorting] = useState("");
    const [openSortDrawer, setOpenSortDrawer] = useState(false)

    const handleClose = () => {
        setOpenSortDrawer(false)
    }

    const handleSelectSort = (value: string) => {
        setSorting(value)
        handleClose()
    }
    console.log(selectedSubCategory, 'selectedSubCategoryselectedSubCategory')

    return (
        <>
            <div className="flex h-screen overflow-hidden pb-5 items-start justify-center w-full sm:hidden pt-[136.25px] sm:mb-24 pr-3 gap-2">
                <div className="w-[40%] xs:w-[35%] bg-[#F7F7F7] space-y h-screen">
                    {subLoading ?
                        <div className='space-y-3'>
                            {[...Array(10)].map((_, idx) => (
                                <div key={idx} className="w-full h-6 rounded-lg bg-gray-200 animate-pulse" />
                            ))}
                        </div> :
                        <div className='overflow-auto custom-scrollbar max-h-[calc(100vh-200px)] pb-14 w-full'>
                            <div
                                onClick={() => handleSubCategorySelect('all')}
                                className={cn(
                                    "text-xs break-words text-center border-b border-l-4 border-l-[#F7F7F7] p-3 h-[60px] flex items-center justify-center",
                                    !selectedSubCategory ? 'border-l-primary text-primary bg-white font-semibold' : ''
                                )}>
                                All Services
                            </div>
                            {subCategories?.map((sub, idx) => (
                                <div key={idx}
                                    onClick={() => handleSubCategorySelect(sub?.name)}
                                    className={cn(
                                        "text-xs text-center border-b border-l-4 font-medium border-l-[#F7F7F7] py-3 px-1 h-[60px] flex items-center justify-center",
                                        selectedSubCategory === idx.toString() ? 'border-l-primary text-primary bg-white font-semibold' : ''
                                    )}>
                                    {sub.name}
                                </div>
                            ))}
                        </div>}
                </div>
                <div className="w-full relative h-screen overflow-hidden pb-20">
                    <div className='sticky mt-2 z-10 mb-2.5 w-full'>
                        <SortHeader viewType={viewType} setViewType={setViewType} setOpenSortDrawer={setOpenSortDrawer} handleClose={handleClose} sorting={sorting} openSortDrawer={openSortDrawer} handleSelectSort={handleSelectSort} sortingOptions={sortingOptions} />
                    </div>
                    <div className='overflow-auto custom-scrollbar h-full pb-64'>
                        <div className='relative w-full h-[80px] mb-3'>
                            <Image
                                src={DripBanner}
                                alt="home"
                                className="rounded-md object-cover"
                                fill
                            />
                        </div>
                        <div className={`grid ${!viewType ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
                            {subLoading ? (
                                <div className="w-full xl:w-[85%] 3xl:w-[70%] xl:mx-auto grid grid-cols-1 xl:grid-cols-2 gap-4">
                                    <div className="col-span-1 xl:col-span-2 w-full">
                                        <HeaderSkeleton />
                                    </div>
                                    <div className="col-span-1 xl:col-span-2 w-full grid grid-cols-2 gap-5">
                                        {[...Array(10)].map((_, idx) => (
                                            <ServiceCardSkeleton key={idx} />
                                        ))}
                                    </div>
                                </div>
                            ) : subCategories?.length === 0 ? (
                                <div className="w-full flex flex-col items-center justify-center h-[calc(100vh-272.75px)]">
                                    <Image
                                        src={EmptyResults}
                                        alt="empty-wishlist"
                                        className="size-24"
                                    />
                                    <p className="w-full text-center font-semibold mt-3">
                                        Sorry, Unfortunately the Product
                                        <br />
                                        you were Looking for wasn&apos;t found!!
                                    </p>
                                    <p className="w-full text-center font-semibold text-xs lg:text-base text-[#707070]">
                                        Explore more and shortlist some services
                                    </p>
                                    <Link
                                        href="/home"
                                        className="mt-12 bg-primary text-white rounded-lg text-xs font-bold py-3 px-6 place-self-center"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            ) : (
                                sort(sorting, selectedSubCategory ? subCategories?.[parseInt(selectedSubCategory)]?.services : subCategories?.flatMap((item) => item?.services))?.map((sub, idx) => (
                                    <div
                                        key={idx}
                                        id={idx.toString()}
                                        className={`w-full`}
                                    >
                                        {viewType ?
                                            <DoctorVisitListingCard
                                                key={sub.service_id}
                                                drip={sub}
                                                navLink={getNavLink(sub.name || '', sub?.category_name) || '#'}
                                                showResponseTime={showResponseTime}
                                            /> :
                                            <BestSellingListingCard
                                                key={sub.service_id}
                                                drip={sub}
                                                navLink={getNavLink(sub.name || '', sub?.category_name) || '#'}
                                                showResponseTime={showResponseTime}
                                            />}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileViewListing