import React from "react";
import Image from "next/image";
const image = "/user-dashboard/health-care-icon/banner.jpg";
const icons2 = "/user-dashboard/health-care-icon/health-care.png";
import texture from "../assets/woman/shape.png";
import image2 from "../../public/user-dashboard/user-dashboard-video.png";
import HealthSection from "../components/Home/HealthSection";
import image8 from "../assets/about/about-image (2).png";
import Link from "next/link";

function SmartHealthFirstPreview() {
  return (
    <div>
      <div className="max-w-7xl mx-auto rounded-2xl cardShadow2 px-4 md:px-0">
        <div className="__primary-bg px-4 md:px-6 py-3 rounded-t-2xl">
          <h3 className="text-white font-semibold">Overview</h3>
        </div>

        <div className="h-32 sm:h-40 md:h-50 overflow-hidden">
          <Image
            src={image}
            alt="Healthcare professionals"
            width={800}
            height={250}
            className="w-full h-full object-cover object-center"
            priority
          />
        </div>

        <div className="px-4 sm:px-6 md:px-12 py-4 sm:py-6 md:py-8">
          <div className="flex flex-col items-start gap-4 mb-6">
            <div className="relative flex flex-row items-start sm:items-center gap-3 mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-25 md:h-25 flex items-center justify-center cardShadow2 rounded-full flex-shrink-0">
                <Image
                  src={icons2}
                  alt="Health Icon"
                  width={56}
                  height={56}
                  className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
                />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-[45px] leading-tight md:leading-[135%] font-bold __secondary-text">
                  Welcome to your Smart Health Dashboard!
                </h1>
              </div>
            </div>
            <div className="hidden lg:flex justify-end items-end w-[80%] top-[50%] z-[-1] absolute right-[205px] h-full">
              <Image
                src={texture}
                width={400}
                height={400}
                alt="Sukaii Logo"
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <p className="text-gray-600 font-normal text-sm sm:text-base md:text-[18px] leading-relaxed max-w-full md:max-w-2xl">
                This isn’t just where you view reports—it’s where your health
                makes sense. Track trends over time, spot what needs attention,
                and take action early with simple, clear visuals. Want a quick
                walkthrough?
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="relative w-full h-[200px] md:h-[400px] max-w-[771px] md:rounded-[0px_40px_40px_0px] overflow-hidden shadow-lg">
            <Image
              src={image2}
              alt="Smart Health Dashboard Video"
              width={800}
              height={400}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-white p-3 rounded-full shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[55%_auto] items-center justify-start gap-8 lg:gap-12">
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pink-500 md:text-gray-900 leading-tight">
              Have Reports from
              <br className="hidden sm:block" />
              <span className="block sm:inline"> Other Labs?</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Import and analyze reports from any laboratory. Our AI technology
              reads and interprets your existing reports, giving you
              comprehensive health insights.
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
        <HealthSection />
      </div>
    </div>
  );
}

export default SmartHealthFirstPreview;
