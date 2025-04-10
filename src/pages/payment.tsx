'use client'
import Loader from '@/components/Loader';
import { RootState } from '@/store';
import { emptyCart } from '@/store/global';
import { usePaymentCheckQuery } from '@/store/services/booking';
import { cn } from '@/utils/helpers';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { FaCheck, FaX } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';

const Payment = () => {
    const dispatch = useDispatch()
    const bookingID = useSelector((state: RootState) => state.global.bookingID);
    const reference = useSelector((state: RootState) => state.global.referenceNum);

    const { data, isLoading, isError } = usePaymentCheckQuery({ reference, booking_id: bookingID }, {
        skip: !reference || !bookingID,
        refetchOnMountOrArgChange: true,
    })

    useEffect(() => {
        console.log(data, isError, 'datadata')
        if (!isError) {
            dispatch(emptyCart());
        }
    }, [data])

    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="w-full md:w-[30%] mx-auto flex flex-col items-center justify-center rounded-lg bg-white px-5 pt-40 pb-20">
            <div className="w-full flex flex-col items-center justify-center">
                <div className={cn(
                    "w-[70px] h-[70px] p-4 rounded-full flex items-center justify-center",
                    isError ? 'bg-red-600' : 'bg-[#38B1A2]'
                )}>
                    {isError ?
                        <FaX className="size-full text-white" /> :
                        <FaCheck className="size-full text-white" />
                    }
                </div>
                <h1 className="text-center text-xl font-bold text-primary mt-4">
                    {isError ? 'Payment Failed' : 'Payment Successful'}
                </h1>
            </div>
            <p className="text-center text-xs text-[#535763] font-medium my-2.5">
                Ref No.&nbsp;{bookingID}
            </p>
            <p className="w-[80%] text-center text-xs text-[#707070] mb-9">
                {isError ? 'Please try again later!' : 'Thank you for your booking'}
            </p>
            <div className="w-[90%] px-4 mb-7 flex items-center justify-center">
                <Link
                    href="/home"
                    className="w-full py-2 rounded-lg bg-primary text-white text-center font-medium text-sm"
                >
                    Go To Home
                </Link>
            </div>
        </div>
    )
}

export default Payment