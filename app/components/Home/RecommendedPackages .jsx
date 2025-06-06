import React from "react";
import image from "../../assets/RecommendedImages/banner.jpg";
import image2 from "../../assets/RecommendedImages/banner1.jpg";
import image3 from "../../assets/RecommendedImages/banner2.jpg";
import image4 from "../../assets/RecommendedImages/banner3.jpg";
import image5 from "../../assets/woman/woman-figure.png";
import Image from "next/image";
import { ArrowUpRight, CheckCircle } from "lucide-react";

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
    <div className="container mx-auto __gapTop">
      {/* Header */}
      <h1 className="text-[48px] leading-[150%] -tracking-[2%] font-[600] text-center mb-12 __secondary-text __text">
        Recommended Packages
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
                <div className="bg-teal-500 text-white px-4 py-6 rounded-[7px] flex items-center gap-2">
                  <span className="text-[18px] font-[500] leading-[100%] __text px-3.5">
                    {pkg.title}
                  </span>
                  <ArrowUpRight className="h-5 w-5 absolute top-0 right-0 m-1.5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Explore Button */}
      <div className="text-center">
        <button className="cursor-pointer __secondary-bg __text text-white font-semibold px-14 py-4 rounded-2xl text-lg ">
          Explore
        </button>
      </div>
      <div className="container mx-auto relative __gapTop">
        <div className="grid md:grid-cols-2 gap-8 items-start justify-center">
          <div className="relative h-[500px]">
            <div className="bg-pink-500 rounded-3xl w-full h-[240px] md:h-[160px] absolute bottom-0 left-0 z-0"></div>

            <div className="absolute inset-0 z-10 flex items-center justify-start">
              <Image
                src={image5}
                alt="Woman talking on phone"
                width={350}
                height={300}
                className="object-cover h-full w-full"
                priority
              />
            </div>
          </div>

          {/* Right Content Column */}
          <div className="space-y-4 ">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold text-pink-500">
                Your Smart Health Dashboard, Simplified!
              </h2>
            </div>

            <p className="text-gray-700 font-medium">
              Sukai Health's Smart Dashboard puts you in control of your health
              journey.
            </p>

            <p className="text-gray-600">
              From booking lab tests to tracking results, storing prescriptions,
              and consulting with doctors — everything you need is now in one
              secure, easy-to-use platform. No more paperwork, no more
              guesswork. Just smart, seamless healthcare at your fingertips.
            </p>
          </div>
        </div>

        {/* Bottom Call-to-Action Section */}
        <div className="bg-teal-500 rounded-3xl p-8 md:p-12 relative overflow-hidden mt-12">
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
              <button className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-2 rounded-lg">
                Explore More!
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400 rounded-full opacity-30 transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-teal-400 rounded-full opacity-20 transform translate-x-12 translate-y-12"></div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedPackages;
