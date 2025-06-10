import React from "react";
import image from "../../assets/RecommendedImages/banner.jpg";
import image2 from "../../assets/RecommendedImages/banner1.jpg";
import image3 from "../../assets/RecommendedImages/banner2.jpg";
import image4 from "../../assets/RecommendedImages/banner3.jpg";
import image5 from "../../assets/woman/woman-figure.png";
import Image from "next/image";
import { ArrowUpRight, Check, CheckCircle, TicketCheck } from "lucide-react";

const RecommendedPackages = () => {
  const packages = [
    {
      id: 1,
      title: "Complete Blood Count",
      image: image,
      alt: "Blood test procedure",
    },
    {
      id: 2,
      title: "Kidney Function",
      image: image2,
      alt: "Kidney function test",
    },
    {
      id: 3,
      title: "Cancer Markers",
      image: image3,
      alt: "Medical scan results",
    },
    {
      id: 4,
      title: "Lipid Profile",
      image: image4,
      alt: "Laboratory testing",
    },
  ];

  return (
    <div className="container mx-auto __gapTop  px-4 lg:px-0">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] leading-tight lg:leading-[150%] -tracking-[1%] lg:-tracking-[2%] font-[600] text-center mb-8 sm:mb-10 lg:mb-12 __secondary-text __text">
        Recommended Packages
      </h1>
      
      {/* Package Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {packages.map((pkg) => (
          <div key={pkg.id} className=" cursor-pointer">
            <div className="relative rounded-[13px] bg-gray-100 aspect-[4/3] mb-6 sm:mb-4">
              <Image
                src={pkg.image || "/placeholder.svg"}
                alt={pkg.title}
                fill
                className="object-cover rounded-[13px]"
              />

              {/* Package Label - Responsive positioning */}
              <div className="absolute max-w-[200px] -bottom-4 sm:-bottom-7 left-3 sm:left-7 right-3 sm:right-auto">
                <div className="bg-teal-500 text-white px-3 sm:px-4 py-4 sm:py-6 rounded-[7px] flex items-center justify-between sm:justify-start gap-2 shadow-lg">
                  <span className="text-sm sm:text-base lg:text-[18px] font-[500] leading-tight lg:leading-[100%] __text px-1 sm:px-3.5 flex-1 sm:flex-none">
                    {pkg.title}
                  </span>
                  <ArrowUpRight className="h-4 w-4 flex-shrink-0 absolute top-0 right-0 m-1.5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Explore Button */}
      <div className="text-center mb-8 sm:mb-12">
        <button className="cursor-pointer __secondary-bg __text text-white font-semibold px-8 sm:px-12 lg:px-14 py-3 sm:py-4 rounded-2xl text-base sm:text-lg w-full sm:w-auto max-w-xs sm:max-w-none">
          Explore
        </button>
      </div>

      {/* Smart Health Dashboard Section */}
      <div className="container mx-auto relative __gapTop px-0 sm:px-4 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center justify-center">
          {/* Left Image Column */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] order-2 md:order-1">
            <div className="bg-pink-500 rounded-3xl w-full h-[120px] sm:h-[180px] md:h-[160px] lg:h-[240px] absolute bottom-0 left-0 z-0"></div>

            <div className="absolute inset-0 z-10 flex items-center justify-center md:justify-start">
              <Image
                src={image5}
                alt="Woman talking on phone"
                width={350}
                height={300}
                className="object-cover h-full w-auto max-w-full"
                priority
              />
            </div>
          </div>

          {/* Right Content Column */}
          <div className="order-1 md:order-2">
            <div className="flex flex-col sm:flex-row items-start justify-center gap-4 sm:gap-6">
              <div className="bg-pink-600 h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center rounded-full flex-shrink-0">
                <Check className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              <div className="space-y-4 sm:space-y-6 flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-pink-500 leading-tight">
                  Your Smart Health Dashboard, Simplified!
                </h2>

                <p className="text-gray-700 font-medium text-sm sm:text-base">
                  Sukai Health's Smart Dashboard puts you in control of your health
                  journey.
                </p>

                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  From booking lab tests to tracking results, storing prescriptions,
                  and consulting with doctors — everything you need is now in one
                  secure, easy-to-use platform. No more paperwork, no more
                  guesswork. Just smart, seamless healthcare at your fingertips.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Call-to-Action Section */}
      <div className="bg-teal-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden mt-8 sm:mt-10 lg:mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center relative z-10">
          <div className="text-center md:text-left">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 leading-tight">
              Smarter Health Starts Here
            </h3>
            <p className="text-white text-opacity-90 text-sm sm:text-base">
              Discover how our Smart Health Dashboard helps you stay on top of
              your health — effortlessly.
            </p>
          </div>
          
          <div className="flex justify-center md:justify-end mt-4 md:mt-0">
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base transition-colors duration-200 w-full sm:w-auto max-w-xs md:max-w-none">
              Explore More!
            </button>
          </div>
        </div>

        {/* Decorative Elements - Responsive */}
        <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-teal-400 rounded-full opacity-30 transform translate-x-8 sm:translate-x-16 -translate-y-8 sm:-translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-teal-400 rounded-full opacity-20 transform translate-x-6 sm:translate-x-12 translate-y-6 sm:translate-y-12"></div>
      </div>
    </div>
  );
};

export default RecommendedPackages;