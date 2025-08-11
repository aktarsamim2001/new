import Image from "next/image";
import React from "react";
import image1 from "../../assets/RecommendedImages/banner.jpg";
import image2 from "../../assets/RecommendedImages/banner1.jpg";
import image3 from "../../assets/RecommendedImages/banner2.jpg";
import image4 from "../../assets/RecommendedImages/banner3.jpg";
import image5 from "../../assets/RecommendedImages/banner2.jpg";
import image6 from "../../assets/RecommendedImages/banner.jpg";
import Link from "next/link";
import Button from "../ui/Button";
import { ArrowUpRight, CircleArrowLeft, CircleArrowRight } from "lucide-react";

const services = [
  { id: 1, title: "Service One", image: image1 },
  { id: 2, title: "Service Two", image: image2 },
  {
    id: 3,
    title: "Service Three",
    image: image3,
  },
  { id: 4, title: "Service Four", image: image4 },
  { id: 5, title: "Service Five", image: image5 },
  { id: 6, title: "Service Six", image: image6 },
];

function ServicesList() {
  return (
    <div className="container mx-auto __gapTop">
      {/* Mobile grid view */}
      <div className="block md:hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 mb-8 sm:mb-[4rem]">
          {services.map((pkg) => (
            <Link
              href={"/service-details"}
              target="_blank"
              key={pkg.id}
              className="cursor-pointer"
            >
              <div className="relative rounded-[13px] bg-gray-100 aspect-[4/3] mb-6 sm:mb-4 transition-transform duration-300 transform hover:scale-102 hover:shadow-2xs h-[135px] lg:h-auto w-full">
                <Image
                  src={pkg.image || "/placeholder.svg"}
                  alt={pkg.title}
                  fill
                  className="object-cover rounded-[13px]"
                />
                {/* Package Label - Responsive positioning */}
                <div className="absolute -bottom-7 left-3 sm:left-7 right-3 sm:right-auto w-[154px]">
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
        <div className="text-center mt-2 mb-8 md:mb-14">
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
      </div>

      {/* Desktop/tablet view (md+) */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="h-[200px] md:h-[300px] relative">
              <Link href={"/service-details"} target="_blank">
                <Image
                  src={service.image}
                  alt={service.title}
                  className="object-cover rounded-br-[40px] rounded-t-[40px] md:mb-4 h-[200px] md:h-[300px] rounded-es-[7px]"
                  width={700}
                  height={475}
                />
                <div>
                  <div className="absolute p-4 bottom-0 text-xl font-[500] __primary-bg text-white rounded-[7px] flex gap-2.5">
                    <h2> {service.title}</h2>
                    <ArrowUpRight className="h-5 w-5 -mt-3 -mr-2" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12 mb-10">
          <nav className="flex items-center space-x-2">
            {/* Left Arrow */}
            <button className="w-8 h-8 flex items-center justify-center cursor-pointer">
              <CircleArrowLeft />
            </button>
            {/* Page Numbers */}
            <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-blue-600 cursor-pointer">
              01
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-blue-600 cursor-pointer">
              02
            </button>
            <button className="w-8 h-8 flex items-center justify-center border-b-2 border-blue-600 text-blue-600 cursor-pointer">
              03
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-blue-600 cursor-pointer">
              04
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-blue-600 cursor-pointer">
              05
            </button>
            {/* Right Arrow */}
            <button className="w-8 h-8 flex items-center justify-center cursor-pointer">
              <CircleArrowRight />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ServicesList;
