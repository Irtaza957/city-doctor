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
import { IoClose } from 'react-icons/io5'
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
                        </>}
                </div>
                <div className="w-full relative h-screen overflow-hidden pb-36">
                    <div className='sticky mt-2 z-10 mb-2.5 w-full'>
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center justify-start gap-1 xs:gap-2">
                                <button type="button" onClick={() => setViewType(false)} className='border border-[#E1E1E1] rounded-[9px] w-[30px] h-[30px] flex items-center justify-center'>
                                    {viewType ? <svg xmlns="http://www.w3.org/2000/svg" width="15.292" height="15.292" viewBox="0 0 15.292 15.292">
                                        <path id="Path_3758" data-name="Path 3758" d="M7.885,11.5A1.912,1.912,0,0,1,9.8,13.407v2.974a1.912,1.912,0,0,1-1.912,1.912H4.912A1.912,1.912,0,0,1,3,16.381V13.407A1.912,1.912,0,0,1,4.912,11.5Zm8.5,0a1.912,1.912,0,0,1,1.912,1.912v2.974a1.912,1.912,0,0,1-1.912,1.912H13.407A1.912,1.912,0,0,1,11.5,16.381V13.407A1.912,1.912,0,0,1,13.407,11.5Zm-8.5,1.274H4.912a.637.637,0,0,0-.637.637v2.974a.637.637,0,0,0,.637.637H7.885a.637.637,0,0,0,.637-.637V13.407A.637.637,0,0,0,7.885,12.77Zm8.5,0H13.407a.637.637,0,0,0-.637.637v2.974a.637.637,0,0,0,.637.637h2.974a.637.637,0,0,0,.637-.637V13.407A.637.637,0,0,0,16.381,12.77ZM7.885,3A1.912,1.912,0,0,1,9.8,4.912V7.885A1.912,1.912,0,0,1,7.885,9.8H4.912A1.912,1.912,0,0,1,3,7.885V4.912A1.912,1.912,0,0,1,4.912,3Zm8.5,0a1.912,1.912,0,0,1,1.912,1.912V7.885A1.912,1.912,0,0,1,16.381,9.8H13.407A1.912,1.912,0,0,1,11.5,7.885V4.912A1.912,1.912,0,0,1,13.407,3Zm-8.5,1.274H4.912a.637.637,0,0,0-.637.637V7.885a.637.637,0,0,0,.637.637H7.885a.637.637,0,0,0,.637-.637V4.912A.637.637,0,0,0,7.885,4.274Zm8.5,0H13.407a.637.637,0,0,0-.637.637V7.885a.637.637,0,0,0,.637.637h2.974a.637.637,0,0,0,.637-.637V4.912A.637.637,0,0,0,16.381,4.274Z" transform="translate(-3 -3)" />
                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="15.292" height="15.292" viewBox="0 0 15.292 15.292">
                                        <path id="Path_3758" data-name="Path 3758" d="M7.885,11.5A1.912,1.912,0,0,1,9.8,13.407v2.974a1.912,1.912,0,0,1-1.912,1.912H4.912A1.912,1.912,0,0,1,3,16.381V13.407A1.912,1.912,0,0,1,4.912,11.5Zm8.5,0a1.912,1.912,0,0,1,1.912,1.912v2.974a1.912,1.912,0,0,1-1.912,1.912H13.407A1.912,1.912,0,0,1,11.5,16.381V13.407A1.912,1.912,0,0,1,13.407,11.5ZM7.885,3A1.912,1.912,0,0,1,9.8,4.912V7.885A1.912,1.912,0,0,1,7.885,9.8H4.912A1.912,1.912,0,0,1,3,7.885V4.912A1.912,1.912,0,0,1,4.912,3Zm8.5,0a1.912,1.912,0,0,1,1.912,1.912V7.885A1.912,1.912,0,0,1,16.381,9.8H13.407A1.912,1.912,0,0,1,11.5,7.885V4.912A1.912,1.912,0,0,1,13.407,3Z" transform="translate(-3 -3)" fill="#006fac" />
                                    </svg>
                                    }
                                </button>
                                <button type="button" onClick={() => setViewType(true)} className='border border-[#E1E1E1] rounded-[9px] w-[30px] h-[30px] flex items-center justify-center'>
                                    {!viewType ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12">
                                            <g id="Group_4309" data-name="Group 4309" transform="translate(-4 -6)">
                                                <path id="Path_3755" data-name="Path 3755" d="M19,8H5A1,1,0,0,1,5,6H19a1,1,0,0,1,0,2Z" />
                                                <path id="Path_3756" data-name="Path 3756" d="M19,13H5a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z" />
                                                <path id="Path_3757" data-name="Path 3757" d="M19,18H5a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z" />
                                            </g>
                                        </svg> :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12">
                                            <g id="Group_4309" data-name="Group 4309" transform="translate(-4 -6)">
                                                <path id="Path_3755" data-name="Path 3755" d="M19,8H5A1,1,0,0,1,5,6H19a1,1,0,0,1,0,2Z" fill="#006fac" />
                                                <path id="Path_3756" data-name="Path 3756" d="M19,13H5a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z" fill="#006fac" />
                                                <path id="Path_3757" data-name="Path 3757" d="M19,18H5a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z" fill="#006fac" />
                                            </g>
                                        </svg>

                                    }
                                </button>
                            </div>
                            <div className="w-full flex items-center justify-end gap-6">
                                <div className="flex items-center justify-center gap-2">
                                    {/* <span className="text-xs">Sort By</span> */}
                                    <div onClick={() => setOpenSortDrawer(true)} className="bg-white h-[30px] flex items-center justify-between gap-5 cursor-pointer w-full px-2.5 rounded-[9px] border border-[#E1E1E1] text-sm">
                                        <p className='truncate'>{sorting || 'Sort'}</p>
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
                                                            item?.name === sorting && 'bg-[#F7F7F7]'
                                                        )}>
                                                            {item.name}</p>
                                                    })}
                                                </div>
                                            </Drawer.Content>
                                        </Drawer.Portal>
                                    </Drawer.Root>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='overflow-auto custom-scrollbar h-full '>
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
            </div>
        </>
    )
}

export default MobileViewListing