import React, { useState } from "react";
import { Star, Shield, Award, Lock, Icon } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import image from "../../../public/star-badge.png";
import image2 from "../../../public/test-tube.png";
import image3 from "../../../public/icon -lock.png";

const SmartHealthBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [1, 2, 3, 4]; // Adjust based on actual slide content

  const reviewAvatars = [
    { name: "A", bg: "bg-gradient-to-br from-indigo-500 to-purple-600" },
    { name: "S", bg: "bg-gradient-to-br from-pink-500 to-red-500" },
    { name: "M", bg: "bg-gradient-to-br from-blue-500 to-cyan-500" },
    { name: "R", bg: "bg-gradient-to-br from-green-500 to-teal-500" },
  ];

  const trustFeatures = [
    {
      icon: image,
      title: "MOH-Certified Medical Staff",
    },
    {
      icon: image2,
      title: "Accredited Malaysian Labs",
    },
    {
      icon: image3,
      title: "Secure & Private, Always",
    },
  ];

  return (
    <div className="flex items-center justify-center __gapTop">
      <div className="container mx-auto w-full">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          loop
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        >
          {slides.map((_, index) => (
            <SwiperSlide key={index}>
              <div className="grid lg:grid-cols-[36%_28%_36%] justify-start pt-[20px]">
                {/* LEFT SECTION */}
                <div className="space-y-6 w-full h-full">
                  <div className="space-y-5">
                    <h1 className="text-4xl lg:text-[50px] text-gray-900 font-[600] leading-[100%] __heading">
                      Smart Health.
                      <br />
                      <span>One Dashboard.</span>
                    </h1>
                    <div>
                      <Image
                        src="/bg-effect.png"
                        alt="Effect"
                        width={400}
                        height={50}
                        className="w-full h-auto opacity-25"
                      />
                    </div>
                    <p className="text-[18px] font-[400] __paragraph leading-relaxed __text">
                      Your health, simplified. With the Sukai Health Smart
                      Dashboard, you can book tests, track results, consult
                      doctors, and manage prescriptions — all in one secure
                      place. Stay informed, stay in control.
                    </p>
                  </div>
                  <button className="cursor-pointer __secondary-bg text-white font-[600] text-[16px] px-8 py-4 rounded-2xl __text">
                    Find Out More
                  </button>
                </div>

                {/* CENTER SECTION */}
                <div className="relative w-full h-[400px] bg-gradient-to-t from-sky-200 to-sky-50 rounded-t-full flex items-center justify-center shadow-2xl border-t-2 border-blue-500">
                  <div className="-top-18 absolute">
                    <Image
                      src="/bg-person.png"
                      alt="Person"
                      width={150}
                      height={100}
                      className="w-full h-[501px] object-cover"
                    />
                  </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="w-full h-full grid items-end pb-8">
                  <div className=" ">
                    <Image
                      src="/bg-effect.png"
                      alt="Effect"
                      width={400}
                      height={50}
                      className="w-full h-auto opacity-25 pb-12"
                    />

                    <div className="max-w-[250px] ml-3 flex flex-col items-center justify-center gap-3 p-4 border-2 border-sky-500 rounded-lg bg-blue-50">
                      <div className="flex -space-x-2">
                        {reviewAvatars.map((avatar, i) => (
                          <div
                            key={i}
                            className={`w-8 h-8 rounded-full border-2 border-white ${avatar.bg} flex items-center justify-center text-white font-semibold text-xs shadow-sm`}
                          >
                            {avatar.name}
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center text-white font-semibold text-xs shadow-sm ml-1">
                          70+
                        </div>
                      </div>

                      <div className=" flex flex-col items-start">
                        <div className="font-semibold text-gray-900 text-sm">
                          120+ patients
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-gray-900">
                            5.0
                          </span>
                          <span className="text-xs text-gray-500">
                            (450k reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end items-end gap-3 pt-8 pr-8">
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`transition-all duration-500 rounded-[8px] w-12 h-[7px] cursor-pointer __paragraph-bg ${
                            currentSlide === index
                              ? "__primary-bg"
                              : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* TRUST FEATURES */}
        <div className="__primary-bg px-8 lg:px-16 py-8 lg:py-14 rounded-3xl">
          <div className="grid md:grid-cols-3 gap-8 text-white">
            {trustFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={50}
                    height={50}
                  />
                </div>
                <div className="font-[400] __text text-[24px]">
                  {feature.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHealthBanner;
