import React, { useState } from 'react'

const LabText = () => {
    const [showMore, setShowMore] = useState(false)
    const handleShowMore = () => {
        setShowMore(prev => !prev)
    }
    return (
        <div className="flex flex-col w-full items-center justify-center mt-10">
            <h1 className="text-2xl font-bold text-center">Lab Test at Home – Convenient & Accurate Home Lab Test Service</h1>
            <div className="px-10 sm:px-0 sm:w-[70%] md:w-[45%] mt-5 mb-7 flex flex-col justify-center items-center">
                <div className={`flex flex-col items-center text-center justify-center gap-3 ${showMore && 'border-b pb-5'}`}>
                    <p className="text-lg sm:text-xl font-bold md:whitespace-nowrap">Book a Lab Test at Home for Hassle-Free Health Checkups</p>
                    <p className="text-xs sm:text-sm">Need a lab test at home without the hassle of visiting a clinic? City Doctor Healthcare offers home service lab tests with fast, reliable, and accurate results. Our licensed medical professionals provide safe sample collection at your doorstep, ensuring a stress-free experience. Whether it’s a routine checkup, diagnostic screening, or urgent blood test, we bring trusted lab testing services to the comfort of your home.</p>
                </div>
                {showMore &&
                    <div className="w-full flex flex-col items-center justify-center pt-4 space-y-3">
                        <h1 className="text-lg sm:text-xl font-bold md:whitespace-nowrap">
                            Why Choose Our Home Service Lab Test?
                        </h1>
                        <div className="w-full text-left text-sm font-medium text-[#535763] space-y-3 !my-3">
                            <p><span className="font-bold">✔ Convenient Sample Collection at Home</span> – No need to visit a clinic or wait in long queues.</p>
                            <p><span className="font-bold">✔ Certified & Accurate Lab Tests</span> – Our tests are conducted at DHA-approved laboratories for reliable results.</p>
                            <p><span className="font-bold">✔ Fast Turnaround Time</span> – Get your test results quickly with secure digital reports.</p>
                            <p><span className="font-bold">✔ Wide Range of Lab Tests</span> – From general health screenings to specialized diagnostic tests.</p>
                            <p><span className="font-bold">✔ Safe & Hygienic Process</span> – Our healthcare professionals ensure proper safety and sample handling.</p>
                            <p><span className="font-bold">✔ 24/7 Booking Available</span> – Schedule a lab test at home anytime, at your convenience.</p>
                        </div>
                        <div className="w-full text-left text-sm font-medium text-[#535763] space-y-3 !mt-2 border-t pt-5">
                            <p className="text-lg sm:text-xl text-black font-bold md:whitespace-nowrap w-full text-center">
                                Home Service Lab Test – How It Works?
                            </p>
                            <p className="text-xs sm:text-sm">Getting a home service lab test is simple and hassle-free:</p>
                            <ul className="list-disc space-y-1 ml-7">
                                <li><span className='font-bold'>Call us at 8005060</span> and book your required lab test at home.</li>
                                <li>A professional medical staff member arrives at your location for safe sample collection.</li>
                                <li>Samples are securely transported to a DHA-approved laboratory for testing.</li>
                                <li>Receive your accurate lab test results digitally within the promised timeframe.</li>
                            </ul>
                        </div>
                        <div className=" w-full !mt-5 !mb-3 flex flex-col items-start justify-center border-y py-5 pb-7">
                            <p className='text-lg sm:text-xl text-black font-bold md:whitespace-nowrap w-full text-center'>Types of Lab Tests Available at Home</p>
                            <div className="w-full text-left text-sm font-medium text-[#535763] space-y-2 !mt-3 ml-4">
                                <p className='font-bold mb-2'>1. &nbsp;General Health Checkups</p>
                                <div className='ml-4 space-y-2'>
                                    <p>✔ &nbsp; Complete Blood Count (CBC)</p>
                                    <p>✔ &nbsp; Lipid Profile (Cholesterol Test)</p>
                                    <p>✔ &nbsp; Liver & Kidney Function Tests</p>
                                    <p>✔ &nbsp; Blood Sugar & Diabetes Tests</p>
                                    <p>✔ &nbsp; Vitamin & Mineral Deficiency Tests</p>
                                </div>
                            </div>
                            <div className="w-full text-left text-sm font-medium text-[#535763] space-y-2 !mt-3 ml-4">
                                <p className='font-bold mb-2'>2. &nbsp;Specialized Diagnostic Tests</p>
                                <div className='ml-4 space-y-2'>
                                    <p>✔ &nbsp; Thyroid Function Test (T3, T4, TSH)</p>
                                    <p>✔ &nbsp; Hormone & Fertility Tests</p>
                                    <p>✔ &nbsp; Allergy & Intolerance Tests</p>
                                    <p>✔ &nbsp; STD & HIV Screenings</p>
                                    <p>✔ &nbsp; Cancer Marker Tests</p>
                                </div>
                            </div>
                            <div className="w-full text-left text-sm font-medium text-[#535763] space-y-2 !mt-3 ml-4">
                                <p className='font-bold mb-2'>3. &nbsp;Chronic Disease Monitoring</p>
                                <div className='ml-4 space-y-2'>
                                    <p>✔ &nbsp; Hypertension & Cardiac Risk Assessment</p>
                                    <p>✔ &nbsp; Diabetes & HbA1c Test</p>
                                    <p>✔ &nbsp; Kidney Function Monitoring</p>
                                    <p>✔ &nbsp; Liver Enzyme Tests </p>
                                    <p>✔ &nbsp; Autoimmune Disease Panels</p>
                                </div>
                            </div>
                            <div className="w-full text-left text-sm font-medium text-[#535763] space-y-2 !mt-3 ml-4">
                                <p className='font-bold mb-2'>4. &nbsp;Infection & Immunity Tests</p>
                                <div className='ml-4 space-y-2'>
                                    <p>✔ &nbsp; COVID-19 PCR & Antibody Tests</p>
                                    <p>✔ &nbsp; Dengue, Malaria, and Typhoid Tests</p>
                                    <p>✔ &nbsp; Hepatitis B & C Screening</p>
                                    <p>✔ &nbsp; Influenza & Respiratory Infection Panels</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-lg sm:text-xl font-bold md:whitespace-nowrap text-center w-full">
                            Benefits of Choosing a Lab Test at Home
                        </p>
                        <div className="w-full text-left text-sm font-medium text-[#535763] space-y-3 !my-3 ml-16">
                            <p><span className='font-bold'>✔ Save Time & Avoid Travel </span>– Complete Blood Count (CBC)</p>
                            <p><span className='font-bold'>✔ Privacy & Comfort </span>– Lipid Profile (Cholesterol Test)</p>
                            <p><span className='font-bold'>✔ Safe & Hygienic Collection </span>– Liver & Kidney Function Tests</p>
                            <p><span className='font-bold'>✔ Quick & Accurate Results </span>– Blood Sugar & Diabetes Tests</p>
                            <p><span className='font-bold'>✔ Flexible Scheduling </span>– Vitamin & Mineral Deficiency Tests</p>
                        </div>
                        <div className=" w-full !my-1 flex flex-col items-start justify-center space-y-3 border-t pt-5 !mt-5">
                            <p className="text-lg sm:text-xl font-bold md:whitespace-nowrap text-center w-full">
                                Book Your Lab Test at Home Today!
                            </p>
                            <p className="text-xs sm:text-sm text-center">Rehydrate, boost immunity, and restore energy with City Doctor’s vitamin drips at home. Our IV drip therapy at home is fast, safe, and available 24/7.</p>
                            <p className="text-xs sm:text-sm text-center">Call 8005060 now to schedule your lab test at home and receive expert care at your doorstep!</p>

                        </div>
                    </div>}
                <button onClick={handleShowMore} className="h-[36px] px-8 py-2 bg-primary rounded-md text-white !mt-7 font-semibold text-sm">{showMore ? 'Read Less' : 'Read More'}</button>
            </div>
        </div>
    )
}

export default LabText