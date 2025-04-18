import Image from "next/image";
import Icon1 from "@/assets/img/about/icon1.png";
import Icon2 from "@/assets/img/about/icon2.png";
import Icon3 from "@/assets/img/about/icon3.png";
import About1 from "@/assets/img/about/about1.png";
import About2 from "@/assets/img/about/about2.png";
import About3 from "@/assets/img/about/about3.png";
import GoogleAnalytics from "../components/GoogleAnalytics";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <>
      <GoogleAnalytics />
      <div className="w-full flex items-center justify-center mt-[85px] md:mt-[150px]">
        <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto px-5 md:px-0 flex flex-col items-center justify-center gap-5 sm:gap-8">
          <h1 className="w-full text-left text-2xl xl:text-4xl font-bold">
            About Us
          </h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10">
            <Image
              src={About1}
              alt="about1"
              width={1000}
              height={1000}
              className="col-span-1 w-full rounded-lg"
            />
            <div className="w-full flex flex-col items-start justify-start pt-3 space-y-6">
              <h1 className="w-full text-center md:text-left text-2xl xl:text-3xl font-bold">
                City Doctor – Trusted Home Healthcare Services in Dubai
              </h1>
              <div>
                <p className="w-full text-left text-lg font-semibold mb-3">
                  Bringing Quality Medical Care to Your Home
                </p>
                <p className="w-full text-left text-sm font-medium text-[#535763]">
                  At City Doctor, we provide expert home healthcare services across Dubai, ensuring you receive professional medical care without leaving your home. Whether you need a doctor on call, IV therapy, lab tests, or physiotherapy, our dedicated team is available 24/7, delivering medical services at home in Dubai with convenience, care, and efficiency.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-y-10 xl:gap-y-0 bg-primary text-white pt-8 pb-5 mt-8">
            <div className="col-span-1 w-full h-full flex flex-col items-center justify-center space-y-3.5">
              <Image src={Icon1} alt="icon1" width={80} height={80} />
              <span className="w-full text-center text-4xl font-bold">9,632</span>
              <span className="w-full text-center text-sm font-medium !mt-1">
                Happy Patients
              </span>
            </div>
            <div className="col-span-1 w-full h-full flex flex-col items-center justify-center space-y-3.5">
              <Image src={Icon2} alt="icon2" width={80} height={80} />
              <span className="w-full text-center text-4xl font-bold">178</span>
              <span className="w-full text-center text-sm font-medium !mt-1">
                Qualified Doctors
              </span>
            </div>
            <div className="col-span-1 w-full h-full flex flex-col items-center justify-center space-y-3.5">
              <Image src={Icon3} alt="icon3" width={80} height={80} />
              <span className="w-full text-center text-4xl font-bold">24/7</span>
              <span className="w-full text-center text-sm font-medium !mt-1">
                Instant Service
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col items-start justify-start pt-3 space-y-3">
            <h1 className="w-full text-center text-2xl xl:text-3xl font-bold mb-3">
              Our Home Healthcare Services
            </h1>
            <div className="space-y-3 text-left text-sm font-medium text-[#535763]">
              <div>
                <span className="font-bold">1. Doctor on Call – Consultation at Your Doorstep</span>
                <p className="mt-2">Feeling unwell? Our doctor-on-call service ensures that a licensed general physician arrives at your home to provide expert medical consultation, diagnosis, and treatment. From common illnesses to urgent medical concerns, we bring the clinic to you.</p>
              </div>
              <div>
                <span className="font-bold">2. IV Drip Therapy at Home – Instant Hydration & Recovery</span>
                <p className="mt-2">Our IV therapy services at home provide essential hydration, vitamins, and nutrients to boost immunity, energy, and overall well-being. Whether for fatigue, dehydration, hangover recovery, or wellness enhancement, our IV drips are administered by professional nurses.</p>
              </div>
              <div>
                <span className="font-bold">3. Lab Tests at Home – Fast & Accurate Results</span>
                <p className="mt-2">Skip the clinic queues! We offer lab tests at home for routine checkups, disease screenings, and diagnostic tests. Our certified team ensures safe sample collection, with fast and accurate results delivered securely.</p>
              </div>
              <div>
                <span className="font-bold">4. Physiotherapy and Body Adjustment at Home</span>
                <p className="mt-2">Recover faster and improve mobility with physiotherapy and body adjustment at home. Our expert physiotherapists help with pain management, muscle recovery, posture correction, and joint flexibility. Whether you need rehabilitation after an injury, relief from chronic pain, or a personalized body adjustment session, we bring professional care to your doorstep.</p>
              </div>
            </div>

          </div>
          <div className="w-full flex flex-col items-center justify-center space-y-3 mt-3">
            <Image
              src={About2}
              alt="about2"
              width={1000}
              height={1000}
              className="col-span-1 w-full h-full"
            />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 !mt-8 !mb-5">
            <Image
              src={About3}
              alt="about1"
              width={1000}
              height={1000}
              className="col-span-1 w-full rounded-lg"
            />
            <div className="w-full flex flex-col items-start justify-start pt-3 space-y-3">
              <h1 className="w-full text-center md:text-left text-2xl xl:text-3xl font-bold">
                Why Choose City Doctor?
              </h1>
              <div className="w-full text-left text-sm font-medium text-[#535763] space-y-5 !mt-5">
                <p><span className="font-bold">✔ 24/7 Medical Services at Home</span> – We are available around the clock, ensuring medical care is just a call away.</p>
                <p><span className="font-bold">✔ Fast & Reliable Healthcare</span> – Our team reaches your location within 30–45 minutes after confirmation.</p>
                <p><span className="font-bold">✔ DHA-Certified Professionals</span> – Our licensed doctors, nurses, and therapists provide expert medical attention.</p>
                <p><span className="font-bold">✔ Personalized & Confidential Care</span> – Enjoy healthcare services tailored to your needs in the comfort of your home.</p>

              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 !mb-20">
            <div className="w-full flex flex-col items-start justify-start pt-3 space-y-5">
              <h1 className="w-full text-center md:text-left text-2xl xl:text-3xl font-bold">
                Book Your Home Healthcare Service in Dubai
              </h1>
              <div className="space-y-4 text-center md:text-left text-sm font-medium text-[#535763] w-full px-8 sm:px-16 md:px-0 md:w-[85%]">
                <p>City Doctor is committed to making healthcare accessible, efficient, and stress-free. Whether you need a doctor on call, an IV drip, or a lab test at home, we are just a call away.</p>
                <p>Call us now at <span className="font-bold">8005060</span> to book your home medical service in Dubai!</p>
              </div>
            </div>
            <Image
              src={About1}
              alt="about1"
              width={1000}
              height={1000}
              className="col-span-1 w-full h-[240px] rounded-lg order-first md:order-last"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
