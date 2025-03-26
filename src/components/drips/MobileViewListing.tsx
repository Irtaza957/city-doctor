import React, { useState } from 'react'
import HeaderSkeleton from '../cards/skeleton/HeaderSkeleton'
import ServiceCardSkeleton from '../cards/skeleton/ServiceCardSkeleton'
import Image from 'next/image'
import Link from 'next/link'
import { cn, sort } from '@/utils/helpers'
import DoctorVisitListingCard from "@/components/cards/DoctorVisitListingCard";
import EmptyResults from "@/assets/img/empty-results.svg";
import DripBanner from "@/assets/icons/mobileDripBanner.svg";
import arrowDown from "@/assets/icons/arrowDown.svg";
import { IoClose, IoGrid } from 'react-icons/io5'
import { GiHamburgerMenu } from 'react-icons/gi'
import { CiGrid41 } from 'react-icons/ci'
import BestSellingListingCard from '../cards/BestSellingListingCard'
import { Drawer } from 'vaul'

interface MobileViewListingProps {
    subCategories: SERVICE_LIST[] | null,
    handleSubCategorySelect: any
    selectedSubCategory: string,
    subLoading: boolean,
    sortingOptions: { id: number, name: string }[],
    getNavLink: any
}

const MobileViewListing = ({ sortingOptions, subCategories, handleSubCategorySelect, selectedSubCategory, subLoading, getNavLink }: MobileViewListingProps) => {
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

    return (
        <>
            <div className="flex h-screen overflow-hidden pb-5 items-start justify-center w-full sm:hidden mt-[136.25px] sm:mb-24 pr-3 gap-2">
                <div className="w-[40%] xs:w-[35%] bg-[#F7F7F7] space-y overflow-auto custom-scrollbar h-screen">
                    {subLoading ?
                        <div className='space-y-3'>
                            {[...Array(10)].map((_, idx) => (
                                <div key={idx} className="w-full h-6 rounded-lg bg-gray-200 animate-pulse" />
                            ))}
                        </div> :
                        <>
                            <div
                                onClick={() => handleSubCategorySelect('all')}
                                className={cn(
                                    "text-xs break-words text-center border-b border-l-4 border-l-[#F7F7F7] p-3 h-[60px] flex items-center justify-center",
                                    !selectedSubCategory ? 'border-l-primary text-primary bg-white font-semibold' : ''
                                )}>
                                All Drips
                            </div>
                            {subCategories?.map((sub, idx) => (
                                <div key={idx}
                                    onClick={() => handleSubCategorySelect(sub?.name)}
                                    className={cn(
                                        "text-xs text-center border-b border-l-4 border-l-[#F7F7F7] py-3 px-1 h-[60px] flex items-center justify-center",
                                        selectedSubCategory === idx.toString() ? 'border-l-primary text-primary bg-white font-semibold' : ''
                                    )}>
                                    {sub.name}
                                </div>
                            ))}
                        </>}
                </div>
                <div className="w-full relative h-screen overflow-hidden pb-36">
                    <div className='sticky mt-2 z-10 mb-3 w-full'>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-start gap-2">
                                <button type="button" onClick={() => setViewType(false)} className='border border-[#E1E1E1] rounded-[9px] w-[32px] h-[32px] flex items-center justify-center'>
                                    {viewType ? <CiGrid41
                                        className={`size-5 font-semibold text-black`}
                                    /> : <IoGrid
                                        className={`size-5 text-primary`}
                                    />}
                                </button>
                                <button type="button" onClick={() => setViewType(true)} className='border border-[#E1E1E1] rounded-[9px] w-[32px] h-[32px] flex items-center justify-center'>
                                    <GiHamburgerMenu
                                        className={`size-5 ${viewType ? "text-primary" : "text-black"
                                            }`}
                                    />
                                </button>
                            </div>
                            <div className="w-full flex items-center justify-end gap-6">
                                <div className="flex items-center justify-center gap-2">
                                    {/* <span className="text-xs">Sort By</span> */}
                                    <div onClick={() => setOpenSortDrawer(true)} className="bg-white h-[30px] flex items-center justify-between gap-5 cursor-pointer w-full px-2.5 rounded-[9px] border border-[#E1E1E1] text-sm">
                                        <p>{sorting || 'Sort'}</p>
                                        <Image
                                            src={arrowDown}
                                            alt="home"
                                            className="rounded-md object-cover"
                                            width={15}
                                            height={15}
                                        />
                                    </div>
                                    <Drawer.Root open={openSortDrawer} onClose={handleClose}>
                                        <Drawer.Portal>
                                            <Drawer.Overlay
                                                onClick={() => handleClose()}
                                                className="fixed inset-0 bg-black/40 z-50"
                                            />
                                            <Drawer.Content className="bg-white h-[40vh] flex flex-col rounded-t-xl fixed bottom-0 left-0 right-0 z-50 focus-visible:outline-none">
                                                <Drawer.Title className="font-medium flex items-center justify-center px-3 py-4 border-b">
                                                    <p className="w-full text-left text-lg font-bold">
                                                        Sort
                                                    </p>
                                                    <button onClick={() => handleClose()}>
                                                        <IoClose className="w-7 h-7" />
                                                    </button>
                                                </Drawer.Title>
                                                <div className="w-full px-3">
                                                    {sortingOptions?.map((item, index) => {
                                                        return <p key={index} onClick={() => handleSelectSort(item?.name)} className={cn(
                                                            'border-b py-4 hover:bg-[#F7F7F7] last:border-none text-sm',
                                                            item?.name===sorting && 'bg-[#F7F7F7]'
                                                            )}>
                                                                {item.name}</p>
                                                    })}
                                                </div>
                                            </Drawer.Content>
                                        </Drawer.Portal>
                                    </Drawer.Root>
                                    {/* <select
                                            onChange={(e) => setSorting(e.target.value)}
                                            className="text-xs p-2 rounded-md bg-transparent"
                                        >
                                            {sortingOptions.map((item) => (
                                                <option key={item.id} value={item.name}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select> */}

                                </div>
                            </div>
                        </div>
                        <div className='relative w-full h-[80px] mt-2'>
                            <Image
                                src={DripBanner}
                                alt="home"
                                className="rounded-md object-cover"
                                fill
                            />
                        </div>
                    </div>
                    <div className={`overflow-auto custom-scrollbar h-full mt-1 grid ${!viewType ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
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
                                    className={`w-full mt-`}
                                >
                                    {viewType ?
                                        <DoctorVisitListingCard
                                            key={sub.service_id}
                                            drip={sub}
                                            navLink={getNavLink(sub.name || '', sub?.category_name) || '#'}
                                        /> :
                                        <BestSellingListingCard
                                            key={sub.service_id}
                                            drip={sub}
                                            navLink={getNavLink(sub.name || '', sub?.category_name) || '#'}
                                        />}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileViewListing