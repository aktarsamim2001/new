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

function TestDetails() {
  // Add package data
  const packages = [
    {
      id: 1,
      title: "Feeling unusually tired or weak",
      image: image,
    },
    {
      id: 2,
      title: "Suspected infection or inflammation",
      image: image1,
    },
    {
      id: 3,
      title: "Monitoring a chronic condition",
      image: image2,
    },
    {
      id: 4,
      title: "Routine annual health screening",
      image: image3,
    },
  ];

  return (
    <>
      <div className="container mx-auto px-4 md:px-0">
        <div className="__gapTop w-9/12 md:w-10/12 mx-auto">
          <div className="">
            <div className="text-left">
              <h2 className="text-2xl md:text-4xl leading-tight lg:leading-[150%] -tracking-[1%] lg:-tracking-[2%] font-[600] text-left mb-8 md:mb-12 ">
                What This Test Measures
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl __cardShadow">
                <div className="w-14 h-14 flex items-center justify-center mb-2">
                  <Image
                    src="/event-details/icon (1).png"
                    width={30}
                    height={40}
                    alt="icon"
                  />
                </div>
                <p className="text-gray-600 text-sm">
                  Track your daily nutrition with smart visual recognition
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl __cardShadow">
                <div className="w-12 h-12 flex items-center justify-center mb-2">
                  <Image
                    src="/event-details/icon (2).png"
                    width={30}
                    height={30}
                    alt="icon"
                  />
                </div>
                <p className="text-gray-600 text-sm">
                  Manage health data for your entire family in one place
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl __cardShadow">
                <div className="w-12 h-12 flex items-center justify-center mb-2">
                  <Image
                    src="/event-details/icon (3).png"
                    width={30}
                    height={30}
                    alt="icon"
                  />
                </div>
                <p className="text-gray-600 text-sm">
                  AI-powered insights from your medical reports
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl __cardShadow">
                <div className="w-12 h-12 flex items-center justify-center mb-2">
                  <Image
                    src="/event-details/icon (4).png"
                    width={30}
                    height={30}
                    alt="icon"
                  />
                </div>
                <p className="text-gray-600 text-sm">
                  Bank-level security for all your health information
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="__gapTop w-11/12 md:w-10/12 mx-auto">
          <h1 className="text-2xl md:text-4xl text-center leading-tight lg:leading-[150%] -tracking-[1%] lg:-tracking-[2%] font-[600] md:text-left mb-8 md:mb-12 ">
            Why You Should Take It
          </h1>
          {/* Package Grid */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"> */}
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
              {packages.map((pkg) => (
                <SwiperSlide key={pkg.id}>
                  <div
                    key={pkg.id}
                    className="group  relative cursor-pointer pb-10"
                  >
                    <div className="overflow-hidden h-[188px] w-full mb-4">
                      <Image
                        src={pkg.image || "/placeholder.svg"}
                        alt={pkg.title}
                        className="object-cover w-full h-[188px] rounded-[13px] group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Package Label */}
                      <div className="absolute w-[187px] top-[150px] left-7">
                        <div className="__primary-bg h-[59px] text-white flex items-center rounded-[7px] px-3 pr-4.5">
                          <div className="text-[15px] font-[500] leading-[100%] __text ">
                            {pkg.title}
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
            {packages.map((pkg) => (
              // <div key={pkg.id} className="group cursor-pointer">
              //   <div className="relative rounded-[13px] bg-gray-100 aspect-[4/3] mb-4">
              //     <Image
              //       src={pkg.image || "/placeholder.svg"}
              //       alt={pkg.title}
              //       fill
              //       className="object-cover rounded-4xl group-hover:scale-105 transition-transform duration-300"
              //     />

              //     {/* Package Label */}
              //     <div className="absolute -bottom-7 left-7">
              //       <div className="__primary-bg text-white px-4 py-6 rounded-[7px] flex items-center gap-2">
              //         <span className="text-[18px] font-[500] leading-[100%] __text px-3.5 w-[8.5rem]">
              //           {pkg.title}
              //         </span>
              //         <ArrowUpRight className="h-6 w-6 absolute bottom-0 right-0 m-1 rotate-90" />
              //       </div>
              //     </div>
              //   </div>
              // </div>
              <div key={pkg.id} className="group relative cursor-pointer pb-10">
                <div className="overflow-hidden h-[188px] w-full mb-4">
                  <Image
                    src={pkg.image || "/placeholder.svg"}
                    alt={pkg.title}
                    className="object-cover w-full h-[188px] rounded-[13px] group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Package Label */}
                  <div className="absolute w-[187px] top-[150px] left-7">
                    <div className="__primary-bg h-[59px] text-white flex items-center rounded-[7px] px-3 pr-4.5">
                      <div className="text-[15px] font-[500] leading-[100%] __text ">
                        {pkg.title}
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
        <div className="__primary-bg md:w-10/12 mx-auto mb-10 md:rounded-[42px] p-8 md:px-16 relative overflow-hidden mt-[80px]">
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
          <div className="flex flex-col px-6 md:px-0 md:flex-row md:justify-between relative">
            <div className="md:w-8/12 md:pl-10">
              <h3 className="text-2xl md:text-[44px] font-bold text-white mb-3">
                Stay Ahead of Your Health with a CBC Test
              </h3>
              <p className="text-white text-sm font-bold md:text-[20px] text-opacity-90">
                Get a complete picture of your body’s internal health — book
                your test today from the comfort of your home.
              </p>
            </div>
            <div className="md:flex md:items-end">
              <Link href="/our-services">
                <div className="flex justify-start md:justify-end mt-4 md:mt-0 relative">
                  <Button
                    variant="outline"
                    className="__secondary-bg hover:bg-pink-600 text-white !py-3 p md:!text-[16px] !text-[14px] !font-[600] text-sm sm:text-base"
                  >
                    Book Now!
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
