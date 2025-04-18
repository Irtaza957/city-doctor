import React from "react";
import GoogleAnalytics from "../components/GoogleAnalytics";
import Footer from "@/components/Footer";

const RefundPolicy = () => {
    return (
        <>
            <GoogleAnalytics />
            <div className="w-full flex items-center justify-center mt-[91.25px] sm:mt-[85px] md:mt-[150px] px-5 md:px-0 mb-20">
                <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto flex flex-col items-center justify-center xl:space-y-8">
                    <h1 className="w-full text-left text-2xl xl:text-4xl font-bold !mb-5">
                        Refund Policy
                    </h1>
                    <p className="w-full text-left text-sm font-medium text-[#484A50]">At City Doctor Healthcare, we are committed to providing exceptional home healthcare services to our clients in Dubai. We understand that circumstances may arise where you may seek a refund for services rendered. This Refund Policy outlines the conditions under which refunds may be granted and the procedures for requesting them.</p>
                    <div
                        className="w-full flex flex-col items-center justify-center space-y-2.5 my-5"
                    >
                        <h1 className="w-full text-left text-lg font-semibold">
                            General Policy
                        </h1>
                        <p className="w-full text-left text-sm font-medium text-[#484A50]">
                            Refunds for clinic services are offered under specific circumstances outlined in this policy. All refund requests must be submitted in writing to <a href="mailto:prc.team@citydoctor.ae" className="text-[#007BFF]">prc.team@citydoctor.ae</a> within 3 days of service date.
                        </p>
                    </div>
                    <div
                        className="w-full flex flex-col items-center justify-start space-y-2.5 mb-5"
                    >
                        <h1 className="w-full text-left text-lg font-semibold">
                            Eligibility for Refunds
                        </h1>
                        <p className="w-full text-left text-sm font-medium text-[#484A50]">Refunds may be considered under the following circumstances:</p>
                        <ul className="list-disc text-sm font-medium text-[#484A50] w-full ml-8">
                            <li><span className="font-bold">Service Dissatisfaction:</span> If you are unsatisfied with the service due to valid reason, such as errors or omissions by the clinic staff</li>
                            <li><span className="font-bold">Medical Contradiction:</span> If is determined that a service provided was not suitable for your medical condition, and this was not disclosed prior to treatment</li>
                            <li><span className="font-bold">Cancellation or Rescheduling Errors:</span> If the clinic is unable to provide a service due to scheduling errors or cancellations on our part</li>
                        </ul>
                    </div>
                    <div
                        className="w-full flex flex-col items-center justify-start space-y-2.5 mb-5"
                    >
                        <h1 className="w-full text-left text-lg font-semibold">
                            Non-Refundable Circumstances
                        </h1>
                        <p className="w-full text-left text-sm font-medium text-[#484A50]">Refunds will not be issued in the following scenarios:</p>
                        <ul className="list-disc text-sm font-medium text-[#484A50] w-full ml-8">
                            <li>Services that have been fully performed and completed as agreed.</li>
                            <li>Missed appointments or late cancellations (see our cancellation Policy for more details)</li>
                            <li>Non-medical services, including consolations and administrative fees</li>
                        </ul>
                    </div>
                    <div
                        className="w-full flex flex-col items-center justify-start space-y-2.5 mb-5"
                    >
                        <h1 className="w-full text-left text-lg font-semibold">
                            Cancellation Policy
                        </h1>
                        <div className="w-full overflow-x-auto">
                            <table className="min-w-full border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 px-4 py-2 text-left">Condition</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Cancellation Fee</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Rescheduling Fee</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Cancellation and rescheduling within 10 minutes of request submission</td>
                                        <td className="border border-gray-300 px-4 py-2">Free of Charges</td>
                                        <td className="border border-gray-300 px-4 py-2">Free of Charges</td>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">Cancellations and Rescheduling 12* hours before appointment</td>
                                        <td className="border border-gray-300 px-4 py-2">Free of Charges</td>
                                        <td className="border border-gray-300 px-4 py-2">Free of Charges</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Cancellation between 2 and 12 hours before the appointment</td>
                                        <td className="border border-gray-300 px-4 py-2">25% of Appointment Value</td>
                                        <td className="border border-gray-300 px-4 py-2">Free of Charges</td>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">Cancellation less than 2 hours before the appointment</td>
                                        <td className="border border-gray-300 px-4 py-2">50% of the Appointment Value</td>
                                        <td className="border border-gray-300 px-4 py-2">25% of the Appointment Value</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Missed appointments</td>
                                        <td className="border border-gray-300 px-4 py-2">100% of appointment value</td>
                                        <td className="border border-gray-300 px-4 py-2">100% of appointment value</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div
                        className="w-full flex flex-col items-center justify-start space-y-2.5 mb-5"
                    >
                        <h1 className="w-full text-left text-lg font-semibold">
                            The Following are non-refundable:
                        </h1>
                        <ul className="list-disc text-sm font-medium text-[#484A50] w-full ml-8">
                            <li>Services that have been fully performed and completed as agreed</li>
                            <li>Missed appointments or late cancellation (see our Cancellation Policy for more details) </li>
                            <li>Non-medical services, including consultations and administrative fees</li>
                        </ul>
                    </div>
                    <div
                        className="w-full flex flex-col items-center justify-start space-y-2.5 mb-5"
                    >
                        <h1 className="w-full text-left text-lg font-semibold">
                            Refund Request Procedure
                        </h1>
                        <p className="w-full text-left text-sm font-medium text-[#484A50]">To request a refund, please follow these steps:</p>

                        <ul className="list-decimal text-sm font-medium text-[#484A50] w-full ml-8 space-y-2">
                            <li>Submit a written request to [Insert Contact Details] with the following information:
                                <ul className="list-disc text-sm font-medium text-[#484A50] w-full ml-8">
                                    <li>Full name and contact information</li>
                                    <li>Date of service</li>
                                    <li>Description of the issue and reason for requesting a refund</li>
                                    <li>Supporting documentation, if applicable (e.g., receipts, medical reports)</li>
                                </ul>
                            </li>
                            <li>Once we receive your request, our customer service team within 7 business days</li>
                            <li>If the request is approved, the refund will be processed within 14 business days</li>
                            <li>If additional information is required, we will contact you directly.</li>
                        </ul>
                    </div>
                    <div
                        className="w-full flex flex-col items-center justify-start space-y-2.5 mb-5"
                    >
                        <h1 className="w-full text-left text-lg font-semibold">
                            Refund for Prepaid Packages
                        </h1>
                        <p className="w-full text-left text-sm font-medium text-[#484A50]">
                            If you have purchased a prepaid package of services, unused sessions may be eligible for a prorated refund, provided the refund request meets the conditions outlined above. A processing fee may apply.
                        </p>
                    </div>
                    <div
                        className="w-full flex flex-col items-center justify-start space-y-2.5 mb-5"
                    >
                        <h1 className="w-full text-left text-lg font-semibold">
                            Exceptions
                        </h1>
                        <p className="w-full text-left text-sm font-medium text-[#484A50]">Refunds may not be granted if:</p>
                        <ul className="list-disc text-sm font-medium text-[#484A50] w-full ml-8">
                            <li>The dissatisfaction stems from unrealistic exceptions not aligned with professional medical advice</li>
                            <li>There is evidence of misuse or non-compliance with pre or post treatment instructions</li>
                            <li>The request is made outside of the 3-day window</li>
                        </ul>
                    </div>
                    <div
                        className="w-full flex flex-col items-center justify-start space-y-2.5 mb-5"
                    >
                        <h1 className="w-full text-left text-lg font-semibold">
                            Contact Information
                        </h1>
                        <p className="w-full text-left text-sm font-medium text-[#484A50]">If you have any questions or concerns regarding this Refund Policy, please contact us:</p>
                        <ul className="list-disc text-sm font-medium text-[#484A50] w-full ml-8">
                            <li><span className="font-bold">Phone:</span> 800 50 60 (Toll-free)</li>
                            <li><span className="font-bold">Email:</span> <a href="mailto:prc.team@citydoctor.ae" className="text-[#007BFF]">prc.team@citydoctor.ae</a></li>
                        </ul>
                        <p className="w-full text-left text-sm font-medium text-[#484A50]">prc.team@citydoctor.ae</p>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default RefundPolicy;
