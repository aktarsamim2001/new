"use client";
import Image from "next/image";
import React from "react";
import image from "../../assets/service/Why you should take/banner1.jpg";
import image1 from "../../assets/service/Why you should take/banner2.jpg";
import image3 from "../../assets/RecommendedImages/banner1.jpg";
import image2 from "../../assets/service/Why you should take/banner3.jpg";
import shapeImage from "../../assets/service/Why you should take/background.png";
// import image3 from "../../assets/RecommendedImages/banner3.jpg";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Button from "../ui/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
// import { SwiperSlide } from "swiper/react";

function TestDetails({ dataItem, serviceDetails }) {
  const whyYouShouldTakeIt = dataItem?.why_you_should_take_it || [];

  return (
    <>
      <div className="container mx-auto">
        <div className="mt-[65px] md:mt-[50px] mx-auto">
          <div className="">
            <div className="text-left">
              <h2 className="text-2xl md:text-4xl leading-[1.1] lg:leading-[150%] -tracking-[1%] lg:-tracking-[2%] font-[600] text-left mb-5 ">
                What This Test Measures
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {serviceDetails?.test_measures?.map((measure) => (
                <div
                  key={measure?.title}
                  className="bg-white p-6 rounded-xl cardShadow2"
                >
                  <div className="w-14 h-14 flex items-center justify-center mb-2">
                    <Image
                      src={measure?.icon || "/event-details/default-icon.png"}
                      width={30}
                      height={40}
                      alt={measure?.title || `measure-${measure?.title}`}
                    />
                  </div>
                  <p className="text-gray-600 text-sm">
                    {measure?.description || "No description available"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-[65px] md:mt-[50px] mx-auto">
          <h1 className="text-2xl md:text-4xl leading-[1.1] lg:leading-[150%] -tracking-[1%] lg:-tracking-[2%] font-[600] text-left mb-5 ">
            Why You Should Take It
          </h1>
          <div className="hidden md:block">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              className="custom-swiper test-details-swiper mt-3"
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3.25, spaceBetween: 20 },
              }}
            >
              {whyYouShouldTakeIt.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <div className="group relative cursor-pointer pb-10">
                    <div className="overflow-hidden rounded-[13px] h-[188px] w-full mb-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.button_text}
                        className="object-cover w-full h-[188px] rounded-[13px] group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute w-[187px] top-[150px] left-7">
                        <div className="__primary-bg h-[59px] text-white flex items-center rounded-[7px] px-3 pr-4.5">
                          <div className="text-[15px] font-[500] leading-[100%] __text ">
                            {item.button_text}
                          </div>
                          <ArrowUpRight className="h-6 w-6 absolute bottom-0 right-0 m-1 rotate-90" />
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="md:hidden">
            {whyYouShouldTakeIt.map((item, idx) => (
              <div key={idx} className="group relative cursor-pointer pb-10">
                <div className="overflow-hidden h-[188px] w-full mb-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.button_text}
                    className="object-cover w-full h-[188px] rounded-[13px] group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute w-[187px] top-[150px] left-7">
                    <div className="__primary-bg h-[59px] text-white flex items-center rounded-[7px] px-3 pr-4.5">
                      <div className="text-[15px] font-[500] leading-[100%] __text ">
                        {item.button_text}
                      </div>
                      <ArrowUpRight className="h-6 w-6 absolute bottom-0 right-0 m-1 rotate-90" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* </div> */}
      </div>
      <div className="container mx-auto">
        <div className="__primary-bg md:rounded-[42px] p-8 md:px-16 relative overflow-hidden mt-[80px]">
          <div className=" absolute -right-5 bottom-5 md:-right-98 md:-top-40">
            <Image
              src={shapeImage}
              alt="shape image"
              className="w-[221px] md:h-[270px] md:w-[100%]"
            />
            <Image
              src={shapeImage}
              className=" -mt-14 md:-mt-38 md:h-[270px] w-[221px] md:w-[100%]"
              alt="shape image"
            />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between relative">
            <div className="md:w-8/12 md:pl-10">
              <h3 className="text-2xl md:text-[44px] font-bold text-white mb-3">
                {dataItem?.title || ""}
              </h3>
              <p className="text-white text-sm font-bold md:text-[20px] text-opacity-90">
                {dataItem?.description || ""}
              </p>
            </div>
            <div className="md:flex md:items-end">
              <Link href="/our-services">
                <div className="flex justify-start md:justify-end mt-4 md:mt-0 relative">
                  <Button
                    variant="outline"
                    className="__secondary-bg hover:bg-pink-600 text-white !py-3 p md:!text-[16px] !text-[14px] !font-[600] text-sm sm:text-base"
                  >
                    {dataItem?.button_name}
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TestDetails;
