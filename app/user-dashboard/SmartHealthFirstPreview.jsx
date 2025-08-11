import React from "react";
import Image from "next/image";
const image = "/user-dashboard/health-care-icon/banner.jpg";
const icons2 = "/user-dashboard/health-care-icon/health-care.png";
import texture from "../assets/woman/shape.png";
import image2 from "../../public/user-dashboard/user-dashboard-video.png";
import HealthSection from "../components/Home/HealthSection";
import image8 from "../assets/about/about-image (2).png";
import Link from "next/link";
import image3 from "../assets/partner-image/handshake.png";
import Button from "../components/ui/Button";

function SmartHealthFirstPreview() {
  return (
    <>
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

        <div className="px-4 sm:px-6 md:px-12 __gapTop">
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
                <h2 className="section__heading __secondary-text">
                  Welcome to your Smart Health Dashboard!
                </h2>
              </div>
            </div>
            <div className="hidden lg:flex justify-end items-end w-[80%] top-[175px] z-[-1] absolute right-[205px] h-full">
              <Image
                src={texture}
                width={400}
                height={400}
                alt="Sukaii Logo"
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <p className="text-gray-600 font-normal text-sm sm:text-base md:text-[18px] leading-relaxed max-w-full md:max-w-3xl">
                This isn’t just where you view reports—it’s where your health
                makes sense. Track trends over time, spot what needs attention,
                and take action early with simple, clear visuals. Want a quick
                walkthrough?
              </p>
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-center h-[200px] md:h-[400px] md:rounded-2xl overflow-hidden group">
          <div className="relative px-4 sm:px-6 md:px-12 w-full h-full">
            <Image
              src={image2}
              alt="Smart Health Dashboard Video"
              width={800}
              height={400}
              className="w-full h-full object-cover cardShadow2 md:rounded-2xl"
            />
            {/* Overlay only on image, not button */}
            <div className="absolute inset-0 bg-white/40 px-4 sm:px-6 md:px-12 w-full transition-opacity duration-300 pointer-events-none group-hover:opacity-0" />
          </div>
          {/* Play button always visible and centered */}
          <div className="absolute inset-0 flex items-center  justify-center z-10">
            <button className="border-2 border-gray-500 hover:border-none p-3 rounded-full shadow-lg hover:bg-white/70 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="__gapTop px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[55%_auto] items-center justify-start gap-8 lg:gap-12">
          <div className="flex items-start justify-start order-2 lg:order-1">
            <div className="w-full">
              <div className="h-[220px] md:h-[354px] relative w-full">
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
            <button className="__secondary-bg text-white md:px-6 py-3 rounded-lg font-semibold text-sm sm:text-base ">
              <Link
                href="/upload-documents"
                className="flex items-center justify-center gap-2"
              >
                Scan Report
              </Link>
            </button>
          </div>
        </div>
        <div className="__gapTop flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-12 container mx-auto pb-18">
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-[500] text-gray-900 mb-2 leading-[1.1]">
          Ready to Take Charge of
          <br />
          Your Health?
        </h3>
        <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
          Book tests, access reports, consult doctors, and manage your well-being — all in one place.
        </p>
        <button className="__secondary-bg text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-[10px] text-sm sm:text-base shadow transition">
          <Link href="/book-test" passHref>
            Book a Test Now!
          </Link>
        </button>
      </div>
      <div className="w-full md:w-1/2 flex-shrink-0">
        <Image
          src={image3}
          width={400}
          height={400}
          alt="Support Lab"
          className="rounded-xl object-cover object-top w-full h-32 sm:h-40 md:h-[310px]"
        />
      </div>
    </div>
      </div>
    </>
  );
}

export default SmartHealthFirstPreview;
