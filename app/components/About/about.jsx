import Image from "next/image";
import React from "react";
import image from "../../assets/about/icon.png";
import image1 from "../../assets/about/icon2 (2).png";
import image2 from "../../assets/about/icon (2).png";
import image3 from "../../assets/about/icon (3).png";
import image4 from "../../assets/about/about-image.png";
import image5 from "../../../public/about-image.png";
import image6 from "../../assets/woman/woman-figure.png";
import image7 from "../../../public/mobile-view-image.jpg";
import image8 from "../../assets/about/about-image (2).png";

import shape from "../../assets/woman/shape.png";
import { Check } from "lucide-react";
import Link from "next/link";

export const About = () => {
  return (
    <div className="">
      {/* Hero Section */}
      <div className=" mt-[46px] md:mt-[125px] relative container mx-auto">
        <div className="flex flex-col-reverse md:grid md:grid-cols-[55%_auto] items-center md:gap-5 justify-center px-4 md:px-0">
          <div className="text-left flex flex-col align-middle justify-center h-[100%] mt-7">
            <h2 className="section__heading mt-4 md:mt-0 mb-5 text-gray-900 ">
              A Central Hub for Your
              <span className="block"> Wellbeing</span>
            </h2>
            <p className="text-sm md:text-lg font-[400] text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Safely store and protected data as in one place and get the most
              detailed insights into your health through detailed metrics and
              professional medical analysis.
            </p>
          </div>

          <div className="relative w-[full] flex justify-end mt-5 ml-4 md:ml-0 lg:ml-0">
            <Image
              src={image4}
              width={600}
              height={300}
              alt="about image"
              className="rounded-3xl h-[80%] w-[100%] cardShadow2"
            />

            <Image
              src={image5}
              width={600}
              height={300}
              alt="about image"
              className="absolute right-3 -top-[25px] md:right-10 md:top-[-60px] rounded-3xl h-[100%] w-[100%] cardShadow2"
            />
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <section className="__gapTop">
        <div className="container mx-auto px-4 md:px-0">
          <div className="text-left">
            <h2 className="section__heading text-gray-900 mb-4 lg:mb-10 md:mb-8">
              More Than Just Reports
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                img: image,
                title: "Visual Food Tracking",
                desc: "Track your daily nutrition with smart visual recognition",
              },
              {
                img: image1,
                title: "Family Profiles",
                desc: "Manage health data for your entire family in one place",
              },
              {
                img: image2,
                title: "Smart Report Analysis",
                desc: "AI-powered insights from your medical reports",
              },
              {
                img: image3,
                title: "Secure & Private",
                desc: "Bank-level security for all your health information",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-6 rounded-xl cardShadow2"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-1.5">
                  <Image
                    src={item.img}
                    width={24}
                    height={24}
                    alt="icon"
                    className="sm:w-[30px] sm:h-[30px]"
                  />
                </div>
                <h3 className="text-[20px] font-[500] md:font-[800] sm:text-lg mb-2 text-gray-900 line-hight-[135%]">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Import Reports Section */}
      <div className="__gapTop">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_auto] items-center justify-start gap-8 lg:gap-12 px-4 md:px-0">
            <div className="flex items-start justify-start order-2 lg:order-1">
              <div className="w-full">
                <div className="h-[220px] md:h-[465px] relative w-full">
                  <Image
                    src={image8}
                    alt="Person using mobile health app"
                    className="object-cover rounded-4xl shadow-lg w-full h-full"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6 text-left order-2 lg:order-1">
              <h2 className="section__heading text-pink-500 md:text-gray-900">
                Have Reports from
                <br className="hidden sm:block" />
                <span className="block sm:inline"> Other Labs?</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Import and analyze reports from any laboratory. Our AI
                technology reads and interprets your existing reports, giving
                you comprehensive health insights.
              </p>
              <button className="__secondary-bg text-white md:px-6 py-3 rounded-lg font-semibold text-sm sm:text-base w-1/3">
                <Link
                  href="/upload-documents"
                  className="flex items-center justify-center gap-2"
                >
                  Scan Report
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Built Around Your Needs Section */}
      <div className="__gapTop relative pb:0 md:pb-10">
        <div className="absolute top-14 md:top-5 right-0 z-50">
          <Image src={shape} alt=" " className="h-[150px] w-[150px] md:h-[400px] md:w-[400px]" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[60%_auto] gap-8 lg:gap-16 items-center container mx-auto">
          <div className="w-full order-2 lg:order-1 md:order-1 flex-col md:flex-row flex items-start justify-start gap-3 sm:gap-4 text-center ml-0 md:ml-10 relative">
            <div className="flex flex-col items-start w-full px-4 md:px-0">
              <div className="flex flex-row items-center gap-3 mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-500 flex items-center justify-center">
                  <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="section__heading text-pink-500 mb-0 text-left">
                  Built Around Your Needs
                </h3>
              </div>
              <ul className="list-disc mt-2 space-y-2 text-base sm:text-lg text-black text-left ml-[52px] sm:ml-[60px]">
                <li>Mobile-friendly and accessible anywhere</li>
                <li>Get reminders and health nudges based on past trends</li>
                <li>Share reports securely with your doctor</li>
              </ul>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 md:order-2">
            <div className="relative w-full lg:max-w-xl mx-auto">
              <div className="bg-pink-500 md:rounded-2xl w-full h-28 sm:h-36 lg:h-40 xl:h-42 absolute bottom-0 left-0 z-0"></div>

              {/* Woman image - responsive */}
              <div className="relative z-10 h-64 sm:h-80 lg:h-96 xl:h-[427px]">
                <Image
                  src={image6}
                  alt="Woman talking on phone"
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
