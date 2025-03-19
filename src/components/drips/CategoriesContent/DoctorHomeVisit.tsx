import React, { useState } from 'react'

const DoctorHomeVisit = () => {
    const [showMore, setShowMore] = useState(false)
    const handleShowMore = () => {
        setShowMore(prev => !prev)
    }
    return (
        <div className="flex flex-col w-full items-center justify-center mt-8">
            <h1 className="text-2xl font-bold text-center">Doctor Home Visit – Get a Doctor at Home in Dubai Anytime</h1>
            <div className="px-10 sm:px-0 sm:w-[70%] md:w-[45%] mt-5 mb-7 flex flex-col justify-center items-center">
                <div className="flex flex-col items-center text-center justify-center gap-3">
                    <p className="text-lg sm:text-xl font-bold md:whitespace-nowrap">Reliable Doctor on Call – Medical Care in 30 to 45 Minutes</p>
                    <p className="text-xs sm:text-sm">Feeling unwell and need urgent medical attention? Skip the clinic and get a doctor at home in Dubai within 30 to 45 minutes with our doctor home visit service. At City Doctor Healthcare, we provide 24/7 doctor on call services, ensuring fast, professional medical care at your doorstep. Whether it’s a routine checkup, urgent consultation, or minor emergency, our licensed physicians are ready to assist you.</p>
                </div>
                {showMore &&
                    <div className="w-full flex flex-col items-center justify-center pt-3 space-y-3">
                        <h1 className="text-lg sm:text-xl font-bold md:whitespace-nowrap">
                            Why Choose Our Doctor at Home Service in Dubai?
                        </h1>
                        <div className="w-full text-left text-sm font-medium text-[#535763] space-y-3 !my-3">
                            <p><span className="font-bold">✔ Doctor at Your Doorstep in 30 to 45 Minutes </span> – Fast medical assistance when you need it.</p>
                            <p><span className="font-bold">✔ 24/7 Availability</span> – Our doctor on call service is available anytime, day or night.</p>
                            <p><span className="font-bold">✔ DHA-Certified Physicians</span> – Professional and experienced doctors at home in Dubai ensuring high-quality medical care.</p>
                            <p><span className="font-bold">✔ Convenience & Privacy</span> – Get personalized treatment in the comfort of your home.</p>
                            <p><span className="font-bold">✔ Comprehensive Care</span> – From fever and flu to chronic disease management, our doctors handle a wide range of conditions.</p>
                        </div>
                        <div className="flex flex-col items-center text-center justify-center gap-3 !mb-5 border-t pt-5">
                            <p className="text-lg sm:text-xl font-bold md:whitespace-nowrap">Doctor On Call – Expert Care at Your Home in 30 to 45 Minutes</p>
                            <p className="text-xs sm:text-sm">Our doctor on call service brings professional medical care to your doorstep, ensuring fast and effective treatment for various health concerns. Whether you need treatment for cold, flu, infections, stomach issues, or minor injuries, our experienced home visit doctors provide immediate diagnosis, prescriptions, and expert medical attention.</p>
                        </div>
                        <p className="text-lg sm:text-xl font-bold md:whitespace-nowrap">
                            Conditions We Treat with Doctor Home Visit
                        </p>
                        <div className="w-full text-left text-sm font-medium text-[#535763] space-y-3 !mt-3">
                            <p className="text-xs sm:text-sm">Our doctor home visit service is ideal for:</p>
                            <ul className="list-disc space-y-1 ml-7">
                                <li>Fever, flu, and viral infections</li>
                                <li>Cold, cough, sore throat, and ear infections</li>
                                <li>Food poisoning, nausea, and dehydration</li>
                                <li>Respiratory issues such as asthma and bronchitis</li>
                                <li>Stomach pain, acidity, and digestion problems</li>
                                <li>Muscle pain, joint pain, and minor injuries</li>
                                <li>Skin infections, allergies, and rashes</li>
                                <li>Chronic disease management (diabetes, hypertension, etc.)</li>
                                <li>Mild burns, wounds, and cuts requiring dressing</li>
                                <li>General health checkups and preventive care</li>
                            </ul>
                        </div>
                        <div className=" w-full !my-5 flex flex-col items-start justify-center space-y-3 border-t pt-5">
                            <p className="text-lg sm:text-xl font-bold md:whitespace-nowrap text-center w-full">
                                Doctor At Home – Fast & Convenient Healthcare in Dubai
                            </p>
                            <p className="text-xs sm:text-sm text-center">At City Doctor Healthcare, we understand that visiting a hospital isn’t always easy, especially for seniors, children, and patients with mobility issues. That’s why our doctor at home in Dubai service ensures that you receive high-quality healthcare without leaving your home.</p>
                        </div>
                        <div className=" w-full mt-3 !mb-5 flex flex-col items-start justify-center">
                            <p className="text-lg sm:text-xl font-bold md:whitespace-nowrap text-center w-full">
                                What Our Home Visit Doctor Provides?
                            </p>
                            <div className="w-full text-left text-sm font-medium text-[#535763] space-y-2 !mt-3 ml-4">
                                <p>✔ &nbsp;Thorough medical examination and diagnosis</p>
                                <p>✔ &nbsp;Prescriptions and medication recommendations</p>
                                <p>✔ &nbsp;Blood pressure and glucose level monitoring</p>
                                <p>✔ &nbsp;Lab test referrals for accurate diagnostics</p>
                                <p>✔ &nbsp;IV therapy and injections at home</p>
                                <p>✔ &nbsp;Wound dressing and minor medical procedures</p>
                                <p className="text-xs sm:text-sm !mt-5">Our doctor home visit service ensures fast, safe, and reliable medical care in 30 to 45 minutes, helping you recover comfortably at home.</p>
                            </div>
                        </div>
                        <div className="w-full text-left text-sm font-medium text-[#535763] space-y-3 !mt-2 border-t pt-5">
                            <p className="text-lg sm:text-xl text-black font-bold md:whitespace-nowrap w-full text-center">
                                How to Book a Doctor Home Visit in Dubai?
                            </p>
                            <p className="text-xs sm:text-sm">Booking a doctor at home in Dubai with City Doctor Healthcare is quick and easy.</p>
                            <ul className="list-disc space-y-1 ml-7">
                                <li>Call or WhatsApp us at 8005060 and request a doctor on call service.</li>
                                <li>Share your location and symptoms for assessment.</li>
                                <li>A licensed doctor at home will arrive within 30–45 minutes.</li>
                                <li>Receive a medical consultation, diagnosis, and treatment in the comfort of your home.</li>
                            </ul>
                            <p className="text-xs sm:text-sm">With our doctor home visit service, you don’t have to wait in long queues or expose yourself to crowded hospitals. Experience safe, fast, and professional healthcare at home.</p>
                        </div>
                        <div className=" w-full !my-5 flex flex-col items-start justify-center border-t pt-5">
                            <p className="text-lg sm:text-xl font-bold md:whitespace-nowrap text-center w-full">
                                Emergency & Urgent Medical Services with Doctor Home Visit
                            </p>
                            <div className="w-full text-left text-sm font-medium text-[#535763] space-y-3 !mt-3">
                                <p className="text-xs sm:text-sm">Our doctor on call service is designed to handle urgent medical situations. If you or a loved one needs immediate medical attention, call us right away, and we’ll dispatch a doctor at home in Dubai to your location promptly.</p>
                                <p className="text-xs sm:text-sm">We also provide add-on medical services such as:</p>
                                <div className="ml-4 space-y-3">
                                    <p>✔ &nbsp;Thorough medical examination and diagnosis</p>
                                    <p>✔ &nbsp;Prescriptions and medication recommendations</p>
                                    <p>✔ &nbsp;Blood pressure and glucose level monitoring</p>
                                    <p>✔ &nbsp;Lab test referrals for accurate diagnostics</p>
                                    <p>✔ &nbsp;IV therapy and injections at home</p>
                                    <p>✔ &nbsp;Wound dressing and minor medical procedures</p>
                                </div>
                            </div>
                        </div>
                        <div className=" w-full !my-1 flex flex-col items-start justify-center space-y-3 border-t pt-5">
                            <p className="text-lg sm:text-xl font-bold md:whitespace-nowrap text-center w-full">
                                Book a Doctor Home Visit in 30 to 45 Minutes!
                            </p>
                            <p className="text-xs sm:text-sm text-center">Don’t wait for minor health issues to become serious. Get expert medical care at home with our doctor on call service in Dubai.</p>
                            <p className="text-xs sm:text-sm text-center">Call 8005060 now to book a doctor home visit and receive professional, reliable, and hassle-free healthcare at your doorstep within 30 to 45 minutes.</p>

                        </div>
                    </div>}
                <button onClick={handleShowMore} className="h-[36px] px-8 py-2 bg-primary rounded-md text-white !mt-7 font-semibold text-sm">{showMore ? 'Read Less':'Read More'}</button>
            </div>
        </div>
    )
}

export default DoctorHomeVisit