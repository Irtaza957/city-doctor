import React, { useState } from 'react'

const IVDrip = () => {
    const [showMore, setShowMore] = useState(false)
    const handleShowMore = () => {
        setShowMore(prev => !prev)
    }
    return (
        <div className="flex flex-col w-full items-center justify-center mt-10">
            <h1 className="text-2xl font-bold text-center">IV Drip Therapy at Home – Instant Hydration & Wellness</h1>
            <div className="px-10 sm:px-0 sm:w-[70%] md:w-[45%] mt-5 mb-7 flex flex-col justify-center items-center">
                <div className={`flex flex-col items-center text-center justify-center gap-3 ${showMore && 'border-b pb-5'}`}>
                    <p className="text-lg sm:text-xl font-bold md:whitespace-nowrap">Get Vitamin IV Drip at Home for Fast Recovery & Energy Boost</p>
                    <p className="text-xs sm:text-sm">Feeling fatigued, dehydrated, or low on energy? Skip the clinic and get IV drip therapy at home with City Doctor Healthcare. Our vitamin drips at home are designed to boost immunity, enhance hydration, and speed up recovery, all from the comfort of your home. Whether you need an energy boost, detox, or post-party recovery, our vitamin IV drip at home service ensures safe and professional administration by licensed medical professionals.</p>
                </div>
                {showMore &&
                    <div className="w-full flex flex-col items-center justify-center pt-4 space-y-3">
                        <h1 className="text-lg sm:text-xl font-bold md:whitespace-nowrap">
                            Why Choose Our IV Drip Therapy at Home?
                        </h1>
                        <div className="w-full text-left text-sm font-medium text-[#535763] space-y-3 !my-3">
                            <p><span className="font-bold">✔ Fast Service</span> – Get an IV drip at home within 30–45 minutes.</p>
                            <p><span className="font-bold">✔ Certified Medical Professionals</span> – Our DHA-licensed nurses ensure safe and expert IV administration.</p>
                            <p><span className="font-bold">✔ Custom IV Drips</span> – Choose from hydration, detox, immunity boost, skin glow, and hangover relief drips.</p>
                            <p><span className="font-bold">✔ 24/7 Availability</span> – Book a vitamin IV drip at home anytime, day or night.</p>
                            <p><span className="font-bold">✔ Comfort & Convenience</span> – No waiting, no hospital visits—just personalized IV drip therapy at home.</p>
                        </div>
                        <div className="flex flex-col items-center text-center justify-center gap-3 !mb-2 border-y pt-5 pb-6">
                            <p className="text-lg sm:text-xl font-bold md:whitespace-nowrap">What is IV Drip Therapy at Home?</p>
                            <p className="text-xs sm:text-sm">IV (intravenous) therapy is the fastest way to deliver essential vitamins, minerals, and fluids directly into your bloodstream, ensuring maximum absorption and quick results. Our vitamin drips at home provide essential hydration, energy restoration, and recovery support, helping you feel your best in no time.</p>
                        </div>
                        <p className="text-lg sm:text-xl font-bold md:whitespace-nowrap">
                            Benefits of Vitamin Drips at Home
                        </p>
                        <div className="w-full text-left text-sm font-medium text-[#535763] space-y-3 !mt-3">
                            <ul className="list-disc space-y-1 ml-7">
                                <li><span className='font-bold'>Instant Hydration </span> – Fever, flu, and viral infections</li>
                                <li><span className='font-bold'>Energy Boost </span> – Cold, cough, sore throat, and ear infections</li>
                                <li><span className='font-bold'>Immune Support </span> – Food poisoning, nausea, and dehydration</li>
                                <li><span className='font-bold'>Detox & Liver Support </span> – Respiratory issues such as asthma and bronchitis</li>
                                <li><span className='font-bold'>Skin Glow & Anti-Aging </span> – Stomach pain, acidity, and digestion problems</li>
                                <li><span className='font-bold'>Hangover & Jet Lag Recovery </span> – Muscle pain, joint pain, and minor injuries</li>
                            </ul>
                        </div>
                        <div className=" w-full !mt-5 !mb-5 flex flex-col items-start justify-center border-t pt-5">
                            <p className="text-lg sm:text-xl font-bold md:whitespace-nowrap text-center w-full">
                                Our IV Drip Therapy at Home Options
                            </p>
                            <div className="w-full text-left text-sm font-medium text-[#535763] space-y-2 !mt-3 ml-4">
                                <p className='font-bold mb-2'>1. &nbsp;Hydration & Recovery Drips</p>
                                <div className='ml-4 space-y-2'>
                                    <p>✔ &nbsp; Ultimate Hydration Drip – Replenishes electrolytes and restores energy.</p>
                                    <p>✔ &nbsp; Hangover Fix Drip – Helps with nausea, headaches, and dehydration.</p>
                                    <p>✔ &nbsp; Jet Lag Recovery Drip – Revives energy levels and reduces fatigue.</p>
                                </div>
                            </div>
                            <div className="w-full text-left text-sm font-medium text-[#535763] space-y-2 !mt-3 ml-4">
                                <p className='font-bold mb-2'>2. &nbsp;Vitamin & Immunity Drips</p>
                                <div className='ml-4 space-y-2'>
                                    <p>✔ &nbsp; Vitamin C Drip – Enhances immune function and skin health.</p>
                                    <p>✔ &nbsp; Immune Booster Drip – Combines Vitamin C, Zinc, and antioxidants for protection.</p>
                                    <p>✔ &nbsp; Energy Booster Drip – Supports overall vitality with essential B vitamins.</p>
                                </div>
                            </div>
                            <div className="w-full text-left text-sm font-medium text-[#535763] space-y-2 !mt-3 ml-4">
                                <p className='font-bold mb-2'>3. &nbsp;Detox & Wellness Drips</p>
                                <div className='ml-4 space-y-2'>
                                    <p>✔ &nbsp; Liver Detox Drip – Supports liver function and detoxification.</p>
                                    <p>✔ &nbsp; Body Detox Drip – Eliminates toxins and boosts overall wellness.</p>
                                    <p>✔ &nbsp; Anti-Aging & Skin Glow Drip – Glutathione and Vitamin C for a youthful glow.</p>
                                </div>
                            </div>
                            <div className="w-full text-left text-sm font-medium text-[#535763] space-y-2 !mt-3 ml-4">
                                <p className='font-bold mb-2'>4. &nbsp;Special Medical Drips</p>
                                <div className='ml-4 space-y-2'>
                                    <p>✔ &nbsp; Iron Infusion Drip – Helps with anemia and low iron levels.</p>
                                    <p>✔ &nbsp; Monthly Period Drip – Eases menstrual discomfort and replenishes nutrients.</p>
                                    <p>✔ &nbsp; Food Poisoning Drip – Aids in digestion and recovery from stomach issues.</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full text-left text-sm font-medium text-[#535763] space-y-3 !mt-2 border-t pt-5">
                            <p className="text-lg sm:text-xl text-black font-bold md:whitespace-nowrap w-full text-center">
                                How to Book a Vitamin IV Drip Therapy at Home?
                            </p>
                            <p className="text-xs sm:text-sm">Booking a vitamin IV drip therapy at home is quick and simple:</p>
                            <ul className="list-disc space-y-1 ml-7">
                                <li><span className='font-bold'>Call us at 8005060</span> and request an IV drip therapy at home.</li>
                                <li>Our team will assess your needs and recommend the right drip.</li>
                                <li>A licensed nurse arrives within 30–45 minutes for safe IV administration.</li>
                                <li>Relax and rejuvenate while the IV therapy delivers instant hydration and nourishment.</li>
                            </ul>
                        </div>
                        <div className=" w-full !my-1 flex flex-col items-start justify-center space-y-3 border-t pt-5 !mt-5">
                            <p className="text-lg sm:text-xl font-bold md:whitespace-nowrap text-center w-full">
                                Book Your IV Drip Therapy at Home Today!
                            </p>
                            <p className="text-xs sm:text-sm text-center">Rehydrate, boost immunity, and restore energy with City Doctor’s vitamin drips at home. Our IV drip therapy at home is fast, safe, and available 24/7.</p>
                            <p className="text-xs sm:text-sm text-center">Call 8005060 now to book your vitamin IV drip at home and experience the best at-home wellness solution in Dubai!</p>

                        </div>
                    </div>}
                <button onClick={handleShowMore} className="h-[36px] px-8 py-2 bg-primary rounded-md text-white !mt-7 font-semibold text-sm">{showMore ? 'Read Less' : 'Read More'}</button>
            </div>
        </div>
    )
}

export default IVDrip