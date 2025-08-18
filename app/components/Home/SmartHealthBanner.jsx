import React, { useState } from "react";
// import { Star, Shield, Award, Lock, Icon } from "lucide-react";
import { IoStarSharp } from "react-icons/io5";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "./home.css";
import "swiper/css";
import Button from "../ui/Button";
import line from "../../assets/carousel-home/line.png";
import image from "../../../public/star-badge.png";
import image2 from "../../../public/test-tube.png";
import image3 from "../../../public/icon -lock.png";
import Link from "next/link";

const SmartHealthBanner = ({ dataItem }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

    const reviewAvatars = [
    { name: "A", bg: "bg-gradient-to-br from-indigo-500 to-purple-600" },
    { name: "S", bg: "bg-gradient-to-br from-pink-500 to-red-500" },
    { name: "M", bg: "bg-gradient-to-br from-blue-500 to-cyan-500" },
    { name: "R", bg: "bg-gradient-to-br from-green-500 to-teal-500" },
  ];

  // Ensure slide is always an array
  const data = dataItem.content ? dataItem.content : [];
  console.log("Slide:", data);

  return (
    <>
      <div className="md:mt-[20px]">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        >
          {data?.home_page?.slides.map((slide, ind) => (
            <SwiperSlide key={ind}>
              <div className="bg-white">
                <div className="md:flex justify-between md:ml-[8%] xl:ml-[12%] h-auto relative z-0">
                  <div className="relative z-[100] pb-[100px] xl:pb-0">
                    <div className="w-full mt-[65px] md:mt-[80px] px-6 md:px-0">
                      <div className="space-y-4">
                        <h1
                          className="text-black __heading"
                          dangerouslySetInnerHTML={{ __html: slide.title }}
                        />
                        <div className="relative w-[520px] h-[40px] left-[-50px] hidden md:block">
                          <Image
                            src={line}
                            alt="Effect"
                            fill
                            className="w-full h-[25px] block border absolute left-0 top-0 z-10"
                          />
                        </div>
                        <div className="lg:hidden absolute top-10 right-[-40px] w-[180px] h-[35px]">
                          <Image
                            src={line}
                            alt="Effect"
                            fill
                            className="object-contain"
                          />
                        </div>

                        <p className="banner__description __paragraph __text pr-3 max-w-[450px]">
                          {slide.description}
                        </p>
                      </div>

                      <Button
                        variant="outline"
                        className="cursor-pointer __secondary-bg text-white font-[600] text-[16px] __text mt-4"
                      >
                        <Link href={slide.button_url}>{slide.button_name}</Link>
                      </Button>
                    </div>
                    <div className="flex md:block justify-end px-6 md:px-0 mt-6">
                      <div className="w-[195px] md:w-[220px] md:absolute bottom-[80px] right-[-40px] lg:bottom-[50px] xl:bottom-[140px] xl:left-[350px] z-50 flex flex-col gap-3 p-4 border-2 border-sky-500 rounded-[5px] bg-white shadow-2xl">
                        <div className="flex -space-x-3">
                          {reviewAvatars?.map((avatar, i) => (
                            <div
                              key={i}
                              className={`w-8 h-8 rounded-full border-2 border-white ${avatar.bg} flex items-center justify-center text-white font-semibold text-xs shadow-sm`}
                            >
                              {avatar.image ? (
                                <Image
                                  src={avatar.image}
                                  alt={`Avatar`}
                                  width={32}
                                  height={32}
                                  className="w-full h-full object-cover rounded-full"
                                />
                              ) : (
                                avatar.name
                              )}
                            </div>
                          ))}
                          <div className="w-8 h-8 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center text-white font-semibold text-xs shadow-sm ml-0.5">
                            {slide.extra}
                          </div>
                        </div>

                        <div className="flex flex-col items-start -mt-2">
                          <div className="font-[600] text-gray-900 text-[20px] flex items-center">
                            {slide.users_count}+ patients
                          </div>
                          <div className="flex items-center gap-1">
                            <IoStarSharp className="text-[23px] fill-yellow-400 text-yellow-400" />
                            <span className="text-base font-medium text-gray-900">
                              {slide.rating}
                            </span>
                            <span className="text-base font-[500] text-gray-500 flex items-center">
                              ({slide.total_reviews}k reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute w-full left-0 top-0 h-full carousel-overlay z-[-1]" />
                  {/* right image */}
                  <div className="flex-1 h-[350px] overflow-hidden lg:h-full relative z-[-10] mt-[-15px] lg:mt-0">
                    <Image
                      src={slide?.image || ""}
                      alt={`hero image ${ind}`}
                      width={650}
                      height={300}
                      className="block w-full h-[300px] lg:h-[650px] mt-3 object-cover"
                    />
                  </div>
                </div>
                <div className="__primary-bg mt-[-28px] md:mt-[-30px] xl:mt-[-85px] py-6 sm:py-8 md:py-14 md:rounded-2xl lg:rounded-3xl overflow-hidden relative z-20 container mx-auto">
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-0 text-white lg:items-start justify-center lg:justify-start">
                    {Array.isArray(slide.features) &&
                      slide.features.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 sm:gap-4 group cursor-pointer lg:justify-center"
                        >
                          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0">
                            <Image
                              src={item?.image || image}
                              alt="medal"
                              width={40}
                              height={40}
                              className="sm:w-[50px] sm:h-[50px]"
                            />
                          </div>
                          <div className="font-[500] max-w-[250px] leading-[1.1] text-[#FFFFFF] text-lg sm:text-xl lg:text-[24px] text-center sm:text-left">
                            {item?.text || "MOH-Certified Medical Staff"}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default SmartHealthBanner;
