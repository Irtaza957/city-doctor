import Image from 'next/image'
import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Drawer } from 'vaul'
import arrowDown from "@/assets/icons/arrowDown.svg";
import { cn } from '@/utils/helpers';

interface SortHeaderProps{
    viewType: boolean; 
    setViewType: React.Dispatch<React.SetStateAction<boolean>>; 
    setOpenSortDrawer: React.Dispatch<React.SetStateAction<boolean>>; 
    handleClose: ()=>void;
    sorting: string;
    openSortDrawer: boolean;
    handleSelectSort: any;
    sortingOptions: { id: number, name: string }[]
}

const SortHeader = ({viewType, setViewType, setOpenSortDrawer, handleClose, sorting, openSortDrawer, handleSelectSort, sortingOptions}: SortHeaderProps) => {
    return (
        <div className="flex items-center justify-between gap-3 w-full">
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
                                <div className="w-full">
                                    {sortingOptions?.map((item: any, index) => {
                                        return <p key={index} onClick={() => handleSelectSort(item?.name)} className={cn(
                                            'border-b py-4 hover:bg-[#F7F7F7] last:border-none text-sm px-3',
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
    )
}

export default SortHeader