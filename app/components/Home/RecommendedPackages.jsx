import React from "react";
import image from "../../assets/RecommendedImages/banner.jpg";
import image2 from "../../assets/RecommendedImages/banner1.jpg";
import image3 from "../../assets/RecommendedImages/banner2.jpg";
import image4 from "../../assets/RecommendedImages/banner3.jpg";
import image5 from "../../assets/woman/woman-figure.png";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import Button from "../ui/Button";
import shapeImage from "../../assets/home/shape2.png";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

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
      image: image4,
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
      image: image2,
      alt: "Laboratory testing",
    },
  ];

  return (
    <div className="container mx-auto px-4 lg:px-0 __gapTop">
      {/* Header */}
      <h1 className="text-2xl md:text-4xl leading-tight lg:leading-[150%] -tracking-[1%] lg:-tracking-[2%] font-[600] text-center mb-8 md:mb-12 __secondary-text">
        Recommended Packages
      </h1>

      {/* Package Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-[4rem]">
        {packages.map((pkg) => (
          <Link
            href={"/service-details"}
            target="_blank"
            key={pkg.id}
            className=" cursor-pointer"
          >
            <div className="relative rounded-[13px] bg-gray-100 aspect-[4/3] mb-6 sm:mb-4 transition-transform duration-300 transform hover:scale-102 hover:shadow-2xs">
              <Image
                src={pkg.image || "/placeholder.svg"}
                alt={pkg.title}
                fill
                className="object-cover rounded-[13px]"
              />

              {/* Package Label - Responsive positioning */}
              <div
                className={`absolute -bottom-7 left-3 sm:left-7 right-3 sm:right-auto ${poppins.className}`}
              >
                <div className="__primary-bg pr-5 py-4 sm:py-5 rounded-[7px] flex items-center justify-between text-[#FFFFFF] sm:justify-start gap-2 shadow-lg">
                  <span className="text-sm lg:text-[18px] font-[500] lg:leading-[100%] px-1 sm:px-3.5 flex-1">
                    {pkg.title}
                  </span>
                  <ArrowUpRight className="h-[20px] w-[20px] flex-shrink-0 absolute top-0 right-0 m-1.5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Explore Button */}
      <div className="text-center">
        <Button
          variant="outline"
          className="cursor-pointer __secondary-bg __text text-white !font-[700] text-[20px] text-base sm:text-lg w-full max-w-[187px]"
        >
          <Link
            href={"/our-services"}
            className="flex items-center justify-center gap-2"
          >
            Explore
          </Link>
        </Button>
      </div>

      {/* Smart Health Dashboard Section */}
      <div className="container mx-auto relative __gapTop px-0 sm:px-4 lg:px-20">
        <div className="absolute top-[45%] z-10 right-[-15px] md:right-[-40px]">
          <Image src={shapeImage} alt="Effect" width={400} height={50} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center">
          {/* Left Image Column */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] order-2 md:order-1">
            <div className="__secondary-bg rounded-3xl w-full h-[120px] md:h-[160px] lg:h-[180px] absolute bottom-0 left-0 z-0"></div>

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
          <div className="order-1 md:order-2  ">
            <div className="flex md:flex-row sm:flex-col items-start justify-center gap-2 sm:gap-4">
              <div className="__primary-bg h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center rounded-full flex-shrink-0 relative top-2">
                <Check className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              <div className="space-y-4 sm:space-y-6 flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold __secondary-text leading-tight">
                  Your Smart Health Dashboard, Simplified!
                </h2>

                <p className="text-gray-700 font-medium text-sm sm:text-base">
                  Sukai Health's Smart Dashboard puts you in control of your
                  health journey.
                </p>

                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  From booking lab tests to tracking results, storing
                  prescriptions, and consulting with doctors — everything you
                  need is now in one secure, easy-to-use platform. No more
                  paperwork, no more guesswork. Just smart, seamless healthcare
                  at your fingertips.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Call-to-Action Section */}
      <div className="md:px-12 __gapTop">
        <div className="__primary-bg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-14 md:pr-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center relative z-10">
            <div className="text-left">
              <h3 className="text-xl sm:text-2xl lg:text-[40px] font-bold text-white mb-2 sm:mb-3 leading-tight">
                Smarter Health Starts Here
              </h3>
              <p className="text-white text-opacity-90 text-sm sm:text-[17px]">
                Discover how our Smart Health Dashboard helps you stay on top of
                <br /> your health effortlessly.
              </p>
            </div>

            <div className="flex justify-start md:justify-end mt-4 md:mt-0 relative">
              <Button
                variant="outline"
                className="__secondary-bg hover:bg-pink-600 text-white !py-3 p !text-[16px] !font-[600] text-sm sm:text-base"
              >
                Explore More!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedPackages;
