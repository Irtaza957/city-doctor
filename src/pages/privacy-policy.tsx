import React from "react";
import GoogleAnalytics from "../components/GoogleAnalytics";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
    return (
        <>
            <GoogleAnalytics />
            <div className="w-full flex items-center justify-center mt-[91.25px] sm:mt-[85px] md:mt-[150px] px-5 md:px-0 mb-20">
                <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto flex flex-col items-center justify-center xl:space-y-8">
                    <h1 className="w-full text-left text-2xl xl:text-4xl font-bold !mb-5">
                        Privacy Policy
                    </h1>
                    <div
                        className="w-full flex flex-col items-center justify-center space-y-2.5 mb-5"
                    >
                        <h1 className="w-full text-left text-lg font-semibold">
                            Introduction
                        </h1>
                        <p className="w-full text-left text-sm font-medium text-[#484A50]">At City Doctor Healthcare, we prioritize the privacy and confidentiality of our patients&apos; personal and health information. This Privacy Policy outlines how we collect, use, disclose, and protect your data in compliance with applicable laws and regulations in the United Arab Emirates (UAE).</p>
                    </div>
                    <div
                        className="w-full flex flex-col items-center justify-start space-y-2.5 mb-5"
                    >
                        <h1 className="w-full text-left text-lg font-semibold">
                            Information We Collect
                        </h1>
                        <p className="w-full text-left text-sm font-medium text-[#484A50]">Information We Collect</p>
                        <ul className="list-disc text-sm font-medium text-[#484A50] w-full ml-8">
                            <li><span className="font-bold">Personal Identification Information:</span> Medical history, treatment records, diagnostic results, and other health-related data necessary for your care.</li>
                            <li><span className="font-bold">Health Information:</span> Medical history, treatment records, diagnostic results, and other health-related data necessary for your care.</li>
                            <li><span className="font-bold">Payment Information:</span> Billing details and other financial data required for processing payments.</li>
                        </ul>
                    </div>
                    <div
                        className="w-full flex flex-col items-center justify-start space-y-2.5 mb-5"
                    >
                        <h1 className="w-full text-left text-lg font-semibold">
                            How We Use Your Information
                        </h1>
                        <p className="w-full text-left text-sm font-medium text-[#484A50]">The information we collect is used for the following purposes:</p>
                        <ul className="list-disc text-sm font-medium text-[#484A50] w-full ml-8">
                            <li><span className="font-bold">Provision of Healthcare Services:</span> To diagnose, treat, and manage your medical conditions effectively.</li>
                            <li><span className="font-bold">Appointment Scheduling and Reminders:</span> To arrange and remind you of upcoming consultations or procedures.</li>
                            <li><span className="font-bold">Billing and Payment Processing:</span> To handle payments for medical services provided.</li>
                            <li><span className="font-bold">Quality Assurance and Improvement:</span> To monitor, evaluate, and enhance the quality of our .</li>
                            <li><span className="font-bold">Legal and Regulatory Compliance:</span> To comply with applicable laws, regulations, and guidelines set forth by health authorities.</li>
                        </ul>
                    </div>
                    <div
                        className="w-full flex flex-col items-center justify-start space-y-2.5 mb-5"
                    >
                        <h1 className="w-full text-left text-lg font-semibold">
                            Disclosure of Your Information
                        </h1>
                        <p className="w-full text-left text-sm font-medium text-[#484A50]">We may disclose your information under the following circumstances:</p>
                        <ul className="list-disc text-sm font-medium text-[#484A50] w-full ml-8">
                            <li><span className="font-bold">With Your Consent: </span> To other healthcare providers or third parties when you have given explicit consent.</li>
                            <li><span className="font-bold">For Treatment Purposes: </span> To specialists, laboratories, or other healthcare entities involved in your care.</li>
                            <li><span className="font-bold">Legal Obligations: </span> To government authorities or regulatory bodies as required by law.</li>
                            <li><span className="font-bold">Business Operations: </span> To third-party service providers who assist us in our operations, provided they adhere to confidentiality agreements.</li>
                        </ul>
                    </div>
                    <div
                        className="w-full flex flex-col items-center justify-start space-y-2.5 mb-5"
                    >
                        <h1 className="w-full text-left text-lg font-semibold">
                            Protection of Your Information
                        </h1>
                        <p className="w-full text-left text-sm font-medium text-[#484A50]">We implement robust security measures to protect your personal and health information from unauthorized access, alteration, or disclosure. These measures include administrative protocols, technical safeguards, and physical security controls.</p>
                    </div> 
                    <div
                        className="w-full flex flex-col items-center justify-start space-y-2.5 mb-5"
                    >
                        <h1 className="w-full text-left text-lg font-semibold">
                        Retention of Your Information
                        </h1>
                        <p className="w-full text-left text-sm font-medium text-[#484A50]">Your information is retained for as long as necessary to fulfill the purposes outlined in this policy or as required by law. Upon the end of the retention period, we ensure secure disposal or anonymization of your data.</p>
                    </div>
                    <div
                        className="w-full flex flex-col items-center justify-start space-y-2.5 mb-5"
                    >
                        <h1 className="w-full text-left text-lg font-semibold">
                        Your Rights
                        </h1>
                        <p className="w-full text-left text-sm font-medium text-[#484A50]">You have the right to:</p>
                        <ul className="list-disc text-sm font-medium text-[#484A50] w-full ml-8">
                            <li><span className="font-bold">Access Your Information: </span> Request copies of your personal and health data.</li>
                            <li><span className="font-bold">Correct Inaccuracies: </span> Request corrections to any inaccurate or incomplete information.</li>
                            <li><span className="font-bold">Withdraw Consent: </span> Withdraw consent for specific uses of your information, subject to legal and contractual obligations.</li>
                            <li><span className="font-bold">File a Complaint: </span> Lodge a complaint with relevant authorities if you believe your privacy rights have been violated.</li>
                        </ul>
                    </div>
                    <div
                        className="w-full flex flex-col items-center justify-start space-y-2.5 mb-5"
                    >
                        <h1 className="w-full text-left text-lg font-semibold">
                        Contact Us
                        </h1>
                        <p className="w-full text-left text-sm font-medium text-[#484A50]">If you have any questions or concerns regarding this Privacy Policy or your data, please contact us at:</p>
                        <ul className="list-disc text-sm font-medium text-[#484A50] w-full ml-8">
                            <li><span className="font-bold">Phone: </span> 800 50 60 (Toll-free)</li>
                            <li><span className="font-bold">Email: </span> <a href="mailto:hello@citydoctor.ae" className="text-[#007BFF]">hello@citydoctor.ae</a></li>
                        </ul>
                        <p className="w-full text-left text-sm font-medium text-[#484A50]">Your trust is vital to us, and we are committed to safeguarding your privacy while providing quality healthcare services.</p>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;
