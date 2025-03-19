import React, { useState } from 'react'

const Physiotherapy = () => {
    const [showMore, setShowMore] = useState(false)
    const handleShowMore = () => {
        setShowMore(prev => !prev)
    }
    return (
        <div className="flex flex-col w-full items-center justify-center mt-10">
            <h1 className="text-2xl font-bold text-center">Physiotherapy & Body Adjustment at Home – Expert Care for Pain Relief & Recovery</h1>
            <div className="px-10 sm:px-0 sm:w-[70%] md:w-[45%] mt-5 mb-7 flex flex-col justify-center items-center">
                <div className={`flex flex-col items-center text-center justify-center gap-3 ${showMore && 'border-b pb-5'}`}>
                    <p className="text-lg sm:text-xl font-bold md:whitespace-nowrap">Get Professional Home Physiotherapy Service & Body Adjustment for Faster Recovery</p>
                    <p className="text-xs sm:text-sm px-10">Struggling with chronic pain, joint stiffness, or poor posture? Skip the clinic and get physiotherapy at home with City Doctor Healthcare. Our licensed physiotherapists offer specialized home physiotherapy services and body adjustment therapy to help you recover from injuries, improve mobility, and correct postural imbalances in the comfort of your home. Whether you need rehabilitation, pain relief, or body realignment, we bring expert treatment directly to your doorstep.</p>
                </div>
                {showMore &&
                    <div className="w-full flex flex-col items-center justify-center pt-4 space-y-3">
                        <h1 className="text-lg sm:text-xl font-bold md:whitespace-nowrap">
                            Why Choose Our Home Physiotherapy & Body Adjustment Service?
                        </h1>
                        <div className="w-full text-left text-sm font-medium text-[#535763] space-y-3 !my-3">
                            <p><span className="font-bold">✔ Certified Physiotherapists & Body Adjustment Experts</span> – DHA-licensed professionals providing physiotherapy at home and postural correction.</p>
                            <p><span className="font-bold">✔ Personalized Treatment Plans</span> – DHA-licensed professionals providing physiotherapy at home and postural correction.</p>
                            <p><span className="font-bold">✔ Pain Management & Posture Correction</span> – Reduce muscle strain, improve flexibility, and restore natural body movement.</p>
                            <p><span className="font-bold">✔ Safe & Convenient Home Sessions</span> – Receive expert therapy without the stress of clinic visits.</p>
                            <p><span className="font-bold">✔ Faster Recovery & Long-Term Relief</span> – Improve strength, flexibility, and spinal alignment to prevent recurring pain.</p>
                            <p><span className="font-bold">✔ Flexible Scheduling</span> – Book a home physiotherapy service or body adjustment session at your convenience.</p>
                        </div>
                        <p className="text-lg sm:text-xl font-bold md:whitespace-nowrap">
                            Benefits of Vitamin Drips at Home
                        </p>
                        <div className="w-full text-left text-sm font-medium text-[#535763] space-y-3 !mt-3">
                            <p className="text-xs sm:text-sm">Our home physiotherapy and body adjustment services are ideal for:</p>
                            <ul className="list-disc space-y-1 ml-7">
                                <li>Individuals suffering from chronic back, neck, or joint pain</li>
                                <li>Patients recovering from injuries, fractures, or post-surgical stiffness</li>
                                <li>Seniors needing mobility improvement & posture correction</li>
                                <li>Athletes with sports injuries & muscle imbalances</li>
                                <li>Office workers experiencing postural misalignment & work-related pain</li>
                                <li>People with scoliosis, spinal misalignment, or chronic tension</li>
                            </ul>
                        </div>
                        <div className=" w-full !mt-5 !mb-5 flex flex-col items-start justify-center border-t pt-5">
                            <p className="text-lg sm:text-xl font-bold md:whitespace-nowrap text-center w-full">
                                Our Physiotherapy at Home & Body Adjustment Services
                            </p>
                            <div className="w-full text-left text-sm font-medium text-[#535763] space-y-2 !mt-3 ml-4">
                                <p className='font-bold mb-2'>1. &nbsp;Pain Management & Recovery Therapy</p>
                                <div className='ml-4 space-y-2'>
                                    <p>✔ &nbsp; Back & Neck Pain Therapy.</p>
                                    <p>✔ &nbsp; Sciatica & Nerve Pain Relief</p>
                                    <p>✔ &nbsp; Post-Surgery Rehabilitation</p>
                                    <p>✔ &nbsp; Arthritis & Joint Pain Treatment</p>
                                </div>
                            </div>
                            <div className="w-full text-left text-sm font-medium text-[#535763] space-y-2 !mt-3 ml-4">
                                <p className='font-bold mb-2'>2. &nbsp;Mobility & Strength Enhancement</p>
                                <div className='ml-4 space-y-2'>
                                    <p>✔ &nbsp; Geriatric Physiotherapy for Seniors</p>
                                    <p>✔ &nbsp; Post-Stroke Rehabilitation</p>
                                    <p>✔ &nbsp; Muscle Strengthening & Flexibility Therapy</p>
                                    <p>✔ &nbsp; Balance & Coordination Training</p>
                                </div>
                            </div>
                            <div className="w-full text-left text-sm font-medium text-[#535763] space-y-2 !mt-3 ml-4">
                                <p className='font-bold mb-2'>3. &nbsp;Balance & Coordination Training</p>
                                <div className='ml-4 space-y-2'>
                                    <p>✔ &nbsp; Sports Injury Rehabilitation</p>
                                    <p>✔ &nbsp; Tennis Elbow & Golfer’s Elbow Therapy</p>
                                    <p>✔ &nbsp; Ligament & Muscle Strain Treatment</p>
                                </div>
                            </div>
                            <div className="w-full text-left text-sm font-medium text-[#535763] space-y-2 !mt-3 ml-4">
                                <p className='font-bold mb-2'>4. &nbsp;Body Adjustment & Posture Correction Therapy</p>
                                <div className='ml-4 space-y-2'>
                                    <p>✔ &nbsp; Full-Body Alignment & Spinal Adjustment</p>
                                    <p>✔ &nbsp; Work-from-Home Posture Correction</p>
                                    <p>✔ &nbsp; Scoliosis & Spinal Realignment Therapy</p>
                                    <p>✔ &nbsp; Ergonomic Adjustments for Neck & Back Pain</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full text-left text-sm font-medium text-[#535763] space-y-3 !mt-2 border-t pt-5">
                            <p className="text-lg sm:text-xl text-black font-bold md:whitespace-nowrap w-full text-center">
                                How Does Our Home Physiotherapy & Body Adjustment Service Work?
                            </p>
                            <ul className="list-disc space-y-1 ml-12">
                                <li>Call 8005060 and book your physiotherapy at home or body adjustment session.</li>
                                <li>Our expert therapist assesses your posture, mobility, and pain levels to design a personalized treatment plan.</li>
                                <li>A licensed physiotherapist or body adjustment specialist arrives at your home for your therapy session.</li>
                                <li>Experience pain relief, improved mobility, and better posture with professional hands-on treatment.</li>
                            </ul>
                        </div>
                        <div className="w-full text-left text-sm font-medium text-[#535763] space-y-3 !mt-2 border-t pt-5">
                            <p className="text-lg sm:text-xl text-black font-bold md:whitespace-nowrap w-full text-center">
                                Benefits of Physiotherapy & Body Adjustment at Home
                            </p>
                            <ul className="list-disc space-y-1 ml-12">
                                <li><span className='font-bold'>Convenience & Comfort </span>– Receive expert physiotherapy at home without travel or wait times.</li>
                                <li><span className='font-bold'>Faster Recovery </span>– Regular home physiotherapy services speed up healing and prevent complications.</li>
                                <li><span className='font-bold'>Full-Body Alignment & Postural Correction </span>– Restore natural spinal alignment and improve flexibility.</li>
                                <li><span className='font-bold'>Pain Prevention & Long-Term Wellness </span>– Reduce stress on muscles and joints, preventing future injuries.</li>
                                <li><span className='font-bold'>One-on-One Focused Treatment </span>– Get personalized attention for the best recovery and body balance.</li>
                            </ul>
                        </div>
                        <div className=" w-full !my-1 flex flex-col items-start justify-center space-y-3 border-t pt-5 !mt-5">
                            <p className="text-lg sm:text-xl font-bold md:whitespace-nowrap text-center w-full">
                                Book Your Physiotherapy & Body Adjustment at Home Today!
                            </p>
                            <p className="text-xs sm:text-sm text-center">Relieve pain, correct posture, and regain mobility with City Doctor Healthcare’s expert home physiotherapy service and body adjustment therapy. Our licensed professionals are ready to help you feel your best at home.</p>
                            <p className="text-xs sm:text-sm text-center">Call 8005060 now to book your physiotherapy at home or body adjustment session and start your recovery journey today!</p>

                        </div>
                    </div>}
                <button onClick={handleShowMore} className="h-[36px] px-8 py-2 bg-primary rounded-md text-white !mt-7 font-semibold text-sm">{showMore ? 'Read Less' : 'Read More'}</button>
            </div>
        </div>
    )
}

export default Physiotherapy