import Link from 'next/link'
import React from 'react'
import { FaCheck } from 'react-icons/fa6'
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { RxCross1 } from "react-icons/rx";
import { cn } from '@/utils/helpers';

const ThankYou = ({isPayment, paymentFailed}: {isPayment?: boolean, paymentFailed?: boolean}) => {
    const bookingID = useSelector((state: RootState) => state.global.bookingID);
    return (
        <div className="w-full md:w-[30%] mx-auto flex flex-col items-center justify-center rounded-lg bg-white px-5 pt-40 pb-20">
            <div className="w-full flex flex-col items-center justify-center">
                <div className={cn(
                    "w-[70px] h-[70px] p-4 rounded-full flex items-center justify-center",
                    paymentFailed ? 'bg-red-500' : 'bg-[#38B1A2]'
                    )}>
                    {paymentFailed ? <RxCross1 className="size-full text-white" /> :<FaCheck className="size-full text-white" />}
                </div>
                <h1 className="text-center text-xl font-bold text-primary mt-4">
                    {paymentFailed ? 'Payment Failed' : isPayment ? 'Payment Successful' : 'Booking Successful'} 
                </h1>
            </div>
            {!paymentFailed &&
            <p className="text-center text-xs text-[#535763] font-medium my-2.5">
                Ref No.&nbsp;{bookingID}
            </p>}
            <p className="w-[80%] text-center text-xs text-[#707070] mb-9">
                {paymentFailed ? 'Please try again!' : 'Thank you for your booking and Our expert team will contact shortly'}
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

export default ThankYou