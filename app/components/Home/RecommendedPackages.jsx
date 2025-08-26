import React from "react";
import image from "../../assets/RecommendedImages/banner.jpg";
import image2 from "../../assets/RecommendedImages/banner1.jpg";
import image3 from "../../assets/RecommendedImages/banner2.jpg";
import image4 from "../../assets/RecommendedImages/banner3.jpg";
import image5 from "../../assets/home/your-health.jpg";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import Button from "../ui/Button";
import shapeImage from "../../assets/home/shape2.png";
import shapeImage2 from "../../assets/home/Shape.png";
import { Poppins } from "next/font/google";
import texture from "../../assets/woman/shape.png";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const RecommendedPackages = ({ dataItem }) => {
  const packages = dataItem?.content?.selected_packages_details || [];

  return (
    <div className="relative lg:px-0 __gapTop">
      {/* Header */}
      <h2 className="px-6 lg:px-0 section__heading md:text-center mb-5 md:mb-8 __secondary-text">
        Recommended <br className="md:hidden" /> Packages
      </h2>

      {/* Package Grid */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 mb-8 sm:mb-[4rem] px-4 md:px-0">
        {packages.map((pkg) => (
          <Link
            href={"/service-details"}
            target="_blank"
            key={pkg.id}
            className=" cursor-pointer"
          >
            <div className="relative rounded-[13px] bg-gray-100 aspect-[4/3] mb-6 sm:mb-4 h-[220px] lg:h-[250px] w-full">
              {pkg.image ? (
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover rounded-[13px]"
                />
              ) : null}

              {/* Package Label - Responsive positioning */}
              <div
                className={`absolute -bottom-8 left-3 sm:left-7 right-3 sm:right-auto ${poppins.className} w-[154px]`}
              >
                <div className="__primary-bg px-4 py-3.5 rounded-[7px] flex items-center justify-between text-[#FFFFFF] sm:justify-start gap-5 shadow-lg relative">
                  <span
                    dangerouslySetInnerHTML={{ __html: pkg.name }}
                    className="text-sm lg:text-[18px] font-[500] lg:leading-[21px] flex-1"
                  />
                  <ArrowUpRight className="h-[20px] w-[20px] flex-shrink-0 absolute top-[8px] right-[8px]" />
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
          className="cursor-pointer __secondary-bg __text !px-18 text-white"
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
      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 items-center justify-center __gapTop2">
          {/* Left Image Column */}
          <div className="h-[300px] sm:h-[400px] lg:h-[400px]">
            {dataItem?.content?.home_page?.image ? (
              <Image
                src={dataItem.content.home_page.image}
                alt="Woman talking on phone"
                width={700}
                height={600}
                className="h-full w-full max-w-full md:rounded-[30px] rounded-0 object-cover"
                priority
              />
            ) : null}
          </div>

          {/* Right Content Column */}
          <div className=" lg:pl-10 mt-2 lg:mt-0 px-6 lg:px-0">
            <div className="grid grid-cols-[60px_auto] lg:block">
              <div className="__primary-bg h-12 w-12 sm:h-[66px] sm:w-[66px] flex items-center justify-center rounded-full mb-5">
                <Check className="h-6 w-6 sm:h-8 sm:w-9 text-white" />
              </div>
              <div className="space-y-4 sm:space-y-6 flex-1">
                <h2
                  dangerouslySetInnerHTML={{
                    __html: dataItem?.content?.home_page?.title,
                  }}
                  className="section__heading __secondary-text"
                ></h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: dataItem?.content?.home_page?.description,
                  }}
                  className="font-medium text-sm sm:text-[18px] "
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Call-to-Action Section */}
      <div className="__gapTop2 container mx-auto px-4 md:px-0">
        <div className="bg-gradient-to-r from-[#00b8c1] via-[#00b8c1] to-[#09aab2af] rounded-2xl sm:rounded-3xl p-6 lg:py-14 lg:px-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-[auto_280px] gap-4 sm:gap-6 items-center relative z-10">
            <div className="text-left">
              <h3
                dangerouslySetInnerHTML={{
                  __html: dataItem?.content?.home_page?.title_two,
                }}
                className="section__heading text-white mb-2 sm:mb-5"
              ></h3>
              <p className="text-white text-opacity-90 text-sm sm:text-[20px] font-[700] md:max-w-3xl">
                {dataItem?.content?.home_page?.description_two}
              </p>
            </div>

            <Link href={dataItem?.content?.home_page?.button_url || "#"}>
              <Button
                variant="outline"
                className="__secondary-bg text-white"
              >
                {dataItem?.content?.home_page?.button_name}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 right-0 -z-10 hidden md:block">
        <Image src={texture} alt=" " className="h-[400px] w-[400px]" />
      </div>
    </div>
  );
};

export default RecommendedPackages;
