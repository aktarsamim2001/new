import Image from "next/image";
import React from "react";
import image from "../../assets/RecommendedImages/banner.jpg";
import image1 from "../../assets/RecommendedImages/banner1.jpg"; 
import image2 from "../../assets/RecommendedImages/banner2.jpg";
import image3 from "../../assets/RecommendedImages/banner3.jpg";
import { ArrowUpRight } from "lucide-react";


function TestDetails() {
  // Add package data
  const packages = [
    {
      id: 1,
      title: "Basic Health Package",
      image: image,
    },
    {
      id: 2,
      title: "Family Wellness",
      image: image1,
    },
    {
      id: 3,
      title: "Advanced Diagnostics",
      image: image2,
    },
    {
      id: 4,
      title: "Comprehensive Care",
      image: image3,
    },
  ];

  return (
    <div className="container mx-auto px-4 md:px-0">
      <div className="__gapTop">
        <div className=" ">
          <div className="text-left">
            <h2 className="text-2xl md:text-4xl leading-tight lg:leading-[150%] -tracking-[1%] lg:-tracking-[2%] font-[600] text-left mb-8 md:mb-12 ">
              What This Test Measures
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl __cardShadow">
              <div className="w-14 h-14 flex items-center justify-center mb-2">
                <Image src='/event-details/icon (1).png' width={30} height={40} alt="icon" />
              </div>
              <p className="text-gray-600 text-sm">
                Track your daily nutrition with smart visual recognition
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl __cardShadow">
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <Image src='/event-details/icon (2).png' width={30} height={30} alt="icon" />
              </div>
              <p className="text-gray-600 text-sm">
                Manage health data for your entire family in one place
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl __cardShadow">
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <Image src='/event-details/icon (3).png' width={30} height={30} alt="icon" />
              </div>
              <p className="text-gray-600 text-sm">
                AI-powered insights from your medical reports
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl __cardShadow">
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <Image src='/event-details/icon (4).png' width={30} height={30} alt="icon" />
              </div>
              <p className="text-gray-600 text-sm">
                Bank-level security for all your health information
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="__gapTop">
        <h1 className="text-2xl md:text-4xl leading-tight lg:leading-[150%] -tracking-[1%] lg:-tracking-[2%] font-[600] text-left mb-8 md:mb-12 ">
          Why You Should Take It
        </h1>
        {/* Package Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="group cursor-pointer">
              <div className="relative rounded-[13px] bg-gray-100 aspect-[4/3] mb-4">
                <Image
                  src={pkg.image || "/placeholder.svg"}
                  alt={pkg.title}
                  fill
                  className="object-cover rounded-4xl group-hover:scale-105 transition-transform duration-300"
                />

                {/* Package Label */}
                <div className="absolute -bottom-7 left-7">
                  <div className="__primary-bg text-white px-4 py-6 rounded-[7px] flex items-center gap-2">
                    <span className="text-[18px] font-[500] leading-[100%] __text px-3.5 w-[8.5rem]">
                      {pkg.title}
                    </span>
                    <ArrowUpRight className="h-6 w-6 absolute bottom-0 right-0 m-1 rotate-90" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="__primary-bg rounded-3xl p-8 md:p-12 relative overflow-hidden mt-[80px]">
        <div className="grid md:grid-cols-2 gap-6 items-center relative z-10">
            <div>
              <h3 className="text-3xl font-bold text-white mb-3">
                Smarter Health Starts Here
              </h3>
              <p className="text-white text-opacity-90">
                Discover how our Smart Health Dashboard helps you stay on top of
                your health — effortlessly.
              </p>
            </div>
            <div className="flex justify-end">
              <button className="__secondary-bg text-white font-medium px-6 py-3 rounded-lg">
                Explore More!
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default TestDetails;
