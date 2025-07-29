import React from "react";
import image from "../../assets/RecommendedImages/banner.jpg";
import image2 from "../../assets/RecommendedImages/banner1.jpg";
import image3 from "../../assets/RecommendedImages/banner2.jpg";
import image4 from "../../assets/RecommendedImages/banner3.jpg";
import image5 from "../../assets/home/your-health.png";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import Button from "../ui/Button";
import shapeImage from "../../assets/home/shape2.png";
import shapeImage2 from "../../assets/home/Shape.png";
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
      title: (
        <>
          Complete <br /> Blood Count
        </>
      ),
      image: image,
      alt: "Blood test procedure",
    },
    {
      id: 2,
      title: (
        <>
          Kidney <br /> Function
        </>
      ),
      image: image4,
      alt: "Kidney function test",
    },
    {
      id: 3,
      title: (
        <>
          Cancer <br /> Markers
        </>
      ),
      image: image3,
      alt: "Medical scan results",
    },
    {
      id: 4,
      title: (
        <>
          Lipid <br /> Profile
        </>
      ),
      image: image2,
      alt: "Laboratory testing",
    },
  ];

  return (
    <div className="container mx-auto lg:px-0 __gapTop">
      {/* Header */}
      <h1 className="text-[28px]  px-6 lg:px-0 md:text-5xl leading-tight lg:leading-[150%] -tracking-[1%] lg:-tracking-[2%] font-[600] md:text-center mb-8 md:mb-12 __secondary-text">
        Recommended <br className="md:hidden" /> Packages
      </h1>

      {/* Package Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 mb-8 sm:mb-[4rem] px-6 lg:px-0">
        {packages.map((pkg) => (
          <Link
            href={"/service-details"}
            target="_blank"
            key={pkg.id}
            className=" cursor-pointer"
          >
            <div className="relative rounded-[13px] bg-gray-100 aspect-[4/3] mb-6 sm:mb-4 transition-transform duration-300 transform hover:scale-102 hover:shadow-2xs h-[135px] lg:h-auto w-full">
              <Image
                src={pkg.image || "/placeholder.svg"}
                alt={pkg.title}
                fill
                className="object-cover rounded-[13px]"
              />

              {/* Package Label - Responsive positioning */}
              <div
                className={`absolute -bottom-7 left-3 sm:left-7 right-3 sm:right-auto ${poppins.className} w-[154px]`}
              >
                <div className="__primary-bg p-4 rounded-[7px] flex items-center justify-between text-[#FFFFFF] sm:justify-start gap-2 shadow-lg relative">
                  <span className="text-sm lg:text-[18px] font-[500] lg:leading-[21px] flex-1">
                    {pkg.title}
                  </span>
                  <ArrowUpRight className="h-[20px] w-[20px] flex-shrink-0 absolute top-[13px] right-[13px]" />
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
          className="cursor-pointer __secondary-bg __text text-white !font-[700] text-base sm:text-lg w-full max-w-[187px] !py-3 !rounded-[10px]"
        >
          <Link
            href={"/our-services"}
            className="flex items-center justify-center gap-2 text-base leading-[145%]"
          >
            Explore
          </Link>
        </Button>
      </div>

      {/* Smart Health Dashboard Section */}
      <div className="container mx-auto relative __gapTop px-0 sm:px-4 lg:px-16 ">
        <div className="absolute left-0 bottom-[-67%] z-10 lg:left-auto right-[-15px] md:right-[-7.5%] hidden">
          <Image
            src={shapeImage}
            alt="Effect"
            width={400}
            className="hidden lg:block"
          />
          <Image
            src={shapeImage2}
            alt="Effect"
            width={400}
            className="hidden"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 items-center justify-center">
          {/* Left Image Column */}
          <div className="h-[300px] sm:h-[400px] lg:h-[400px]">
            <Image
              src={image5}
              alt="Woman talking on phone"
              // width={350}
              // height={300}
              className="h-full w-full max-w-full"
              priority
            />
          </div>

          {/* Right Content Column */}
          <div className=" lg:pl-10 mt-2 lg:mt-0 px-6 lg:px-0">
            <div className="grid grid-cols-[70px_auto] gap-x- lg:block">
              <div className="__primary-bg h-12 w-12 sm:h-[66px] sm:w-[66px] flex items-center justify-center rounded-full mb-5">
                <Check className="h-6 w-6 sm:h-8 sm:w-9 text-white" />
              </div>
              <div className="space-y-4 sm:space-y-6 flex-1">
                <h2 className="text-[26px] sm:text-4xl lg:text-[40px] font-bold __secondary-text leading-[97%]">
                  Your Health in <br /> Your Hands
                </h2>

                <p className="font-medium text-sm sm:text-[18px]">
                  The Sukaii Smart Health Dashboard puts you in control of your
                  health.  With all your records in one secure, easy-to-
                  <br className="hidden lg:block" />
                  understand platform, you can finally make sense of your test
                  <br className="hidden lg:block" /> results, a window into your
                  health. 
                </p>

                <p className="font-medium text-sm sm:text-[18px] mt-4">
                  No more paperwork, no more guesswork.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Call-to-Action Section */}
      <div className="min-[319px]:max-w-[280px] min-[374px]:max-w-[350px] sm:max-w-[100%] lg:px-14 __gapTop mx-auto">
        <div className="bg-gradient-to-r from-[#00b8c1] via-[#00b8c1] to-[#09aab2af] rounded-2xl sm:rounded-3xl p-6 lg:py-14 lg:px-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-[auto_280px] gap-4 sm:gap-6 items-center relative z-10">
            <div className="text-left">
              <h3 className="text-[26px] sm:text-2xl lg:text-[44px] font-bold text-white mb-2 sm:mb-5 leading-[100%]">
                Smarter Health <br className="lg:hidden" /> Starts Here
              </h3>
              <p className="text-white text-opacity-90 text-sm sm:text-[20px] font-[700]">
                Start today by uploading existing test results easily and track
                them on the Sukaii Smart Health Dashboard.  Maintain all records
                from tests, either booked on Sukaii or elsewhere, in one easy
                secure place.
              </p>
            </div>

            <Link href="/our-services">
              <div className="flex justify-start md:justify-end mt-4 md:mt-0 relative">
                <Button
                  variant="outline"
                  className="__secondary-bg hover:bg-pink-600 text-white !py-3 !text-[14px] lg:!text-[20px] !font-[700] text-sm sm:text-base"
                >
                  Explore More!
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedPackages;
