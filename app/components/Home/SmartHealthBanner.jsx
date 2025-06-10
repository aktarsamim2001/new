import React, { useState } from "react";
import { Star, Shield, Award, Lock, Icon } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import image from "../../../public/star-badge.png";
import image2 from "../../../public/test-tube.png";
import image3 from "../../../public/icon -lock.png";

const SmartHealthBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slider data array
  const sliderData = [
    {
      heading: (
        <>
          Smart Health.
          <br />
          <span>One Dashboard.</span>
        </>
      ),
      description:
        "Your health, simplified. With the Sukai Health Smart Dashboard, you can book tests, track results, consult doctors, and manage prescriptions — all in one secure place. Stay informed, stay in control.",
      button: "Find Out More",
      leftImage: "/bg-effect.png",
      centerImage: "/bg-person.png",
      rightImage: "/bg-effect.png",
      reviewAvatars: [
        { name: "A", bg: "bg-gradient-to-br from-indigo-500 to-purple-600" },
        { name: "S", bg: "bg-gradient-to-br from-pink-500 to-red-500" },
        { name: "M", bg: "bg-gradient-to-br from-blue-500 to-cyan-500" },
        { name: "R", bg: "bg-gradient-to-br from-green-500 to-teal-500" },
      ],
      patients: "120+ patients",
      rating: 5.0,
      reviews: "(450k reviews)",
      extra: "70+",
    },
    {
      heading: (
        <>
          AI Powered.
          <br />
          <span>Personal Insights.</span>
        </>
      ),
      description:
        "Get personalized health analytics and actionable insights powered by advanced AI. Make smarter decisions for your wellbeing.",
      button: "Explore AI Features",
      leftImage: "/bg-effect2.png",
      centerImage: "/bg-person.png",
      rightImage: "/bg-effect2.png",
      reviewAvatars: [
        { name: "J", bg: "bg-gradient-to-br from-yellow-500 to-orange-500" },
        { name: "L", bg: "bg-gradient-to-br from-purple-500 to-pink-500" },
        { name: "K", bg: "bg-gradient-to-br from-blue-500 to-green-500" },
        { name: "T", bg: "bg-gradient-to-br from-red-500 to-yellow-500" },
      ],
      patients: "200+ users",
      rating: 4.9,
      reviews: "(320k reviews)",
      extra: "100+",
    },
    {
      heading: (
        <>
          Secure & Private.
          <br />
          <span>Your Control.</span>
        </>
      ),
      description:
        "We prioritize your privacy with bank-level security. Your health data is encrypted, ensuring you have complete control over who accesses it.",
      button: "Learn More",
      leftImage: "/bg-effect2.png",
      centerImage: "/bg-person.png",
      rightImage: "/bg-effect2.png",
      reviewAvatars: [
        { name: "D", bg: "bg-gradient-to-br from-teal-500 to-cyan-500" },
        { name: "F", bg: "bg-gradient-to-br from-pink-500 to-purple-500" },
        { name: "G", bg: "bg-gradient-to-br from-green-500 to-blue-500" },
        { name: "H", bg: "bg-gradient-to-br from-yellow-500 to-orange-500" },
      ],
      patients: "300+ users",
      rating: 4.8,
      reviews: "(280k reviews)",
      extra: "150+",
    },
    {
      heading: (
        <>
          Comprehensive Health.
          <br />
        </>
      ),
      description:
        "From lab tests to doctor consultations, manage all your health needs seamlessly. Our platform integrates everything you need for a healthier life.",
      button: "Get Started",
      leftImage: "/bg-effect2.png",
      centerImage: "/bg-person.png",
      rightImage: "/bg-effect2.png",
      reviewAvatars: [
        { name: "I", bg: "bg-gradient-to-br from-indigo-500 to-blue-500" },
        { name: "O", bg: "bg-gradient-to-br from-purple-500 to-pink-500" },
        { name: "P", bg: "bg-gradient-to-br from-green-500 to-yellow-500" },
        { name: "Q", bg: "bg-gradient-to-br from-red-500 to-orange-500" },
      ],
      patients: "400+ users",
      rating: 4.7,
      reviews: "(360k reviews)",
      extra: "200+",
    },
  ];

  const slides = sliderData;

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
      <div className="container mx-auto w-full  px-4 lg:px-0">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              {/* Desktop Layout */}
              <div className="hidden lg:grid lg:grid-cols-[36%_28%_36%] justify-start pt-[20px]">
                {/* LEFT SECTION - Desktop */}
                <div className="space-y-6 w-full h-full">
                  <div className="space-y-4">
                    <h1 className="text-4xl lg:text-[50px] text-gray-900 font-[600] leading-[100%] __heading">
                      {slide.heading}
                    </h1>
                    <div>
                      <Image
                        src={slide.leftImage}
                        alt="Effect"
                        width={400}
                        height={50}
                        className="w-full h-[25px] opacity-25"
                      />
                    </div>
                    <p className="text-[18px] font-[400] __paragraph leading-relaxed __text">
                      {slide.description}
                    </p>
                  </div>
                  <button className="cursor-pointer __secondary-bg text-white font-[600] text-[16px] px-8 py-4 rounded-2xl __text">
                    {slide.button}
                  </button>
                </div>

                {/* CENTER SECTION - Desktop */}
                <div className="relative w-full h-[400px] bg-gradient-to-t from-sky-200 to-sky-50 rounded-t-full flex items-center justify-center shadow-2xl border-t-2 border-blue-500">
                  <div className="-top-18 absolute">
                    <Image
                      src={slide.centerImage}
                      alt="Person"
                      width={150}
                      height={100}
                      className="w-full h-[501px] object-cover"
                    />
                  </div>
                </div>

                {/* RIGHT SECTION - Desktop */}
                <div className="w-full h-full grid items-end pb-8">
                  <div>
                    <Image
                      src={slide.rightImage}
                      alt="Effect"
                      width={400}
                      height={50}
                      className="w-full h-auto opacity-25 pb-12"
                    />

                    <div className="max-w-[180px] ml-3 flex flex-col items-center justify-center gap-3 p-3 border-2 border-sky-500 rounded-lg bg-blue-50 shadow-2xl">
                      <div className="flex -space-x-3">
                        {slide.reviewAvatars.map((avatar, i) => (
                          <div
                            key={i}
                            className={`w-8 h-8 rounded-full border-2 border-white ${avatar.bg} flex items-center justify-center text-white font-semibold text-xs shadow-sm`}
                          >
                            {avatar.name}
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center text-white font-semibold text-xs shadow-sm ml-0.5">
                          {slide.extra}
                        </div>
                      </div>

                      <div className="flex flex-col items-start">
                        <div className="font-[600] text-gray-900 text-[20px]">
                          {slide.patients}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {slide.rating}
                          </span>
                          <span className="text-xs text-gray-500">
                            {slide.reviews}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end items-end gap-3 pt-8 pr-8">
                      {slides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`transition-all duration-500 rounded-[8px] w-12 h-[7px] cursor-pointer __paragraph-bg ${
                            currentSlide === idx ? "__primary-bg" : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile & Tablet Layout */}
              <div className="lg:hidden pt-4 relative">
                {/* Mobile/Tablet Header */}
                <div className="text-left mb-6">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl text-gray-900 font-[600] leading-tight __heading mb-4">
                    {slide.heading}
                  </h1>
                  <p className="text-base sm:text-lg font-[400] __paragraph leading-relaxed __text px-2">
                    {slide.description}
                  </p>
                  <button className="cursor-pointer __secondary-bg text-white font-[600] text-base px-3 py-2.5 rounded-2xl __text w-full mt-1.5 max-w-[164px]">
                    {slide.button}
                  </button>
                </div>

                {/* Mobile/Tablet Center Image */}
                <div className="relative w-full max-w-[270px] mx-auto">
                  <div className="relative h-[320px] bg-gradient-to-t from-sky-200 to-sky-50 rounded-t-full flex items-center justify-center shadow-xl border-t-2 border-blue-500">
                    <div className="absolute -top-15">
                      <Image
                        src={slide.centerImage}
                        alt="Person"
                        width={150}
                        height={100}
                        className="w-full h-[400px]  object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile/Tablet Stats and Button */}
                <div className="flex flex-col items-center">
                  {/* Stats Card */}
                  <div className=" absolute bottom-28 right-0 max-w-[320px] flex flex-col items-center justify-center gap-3 p-4 border-2 border-sky-500 rounded-lg bg-blue-50">
                    <div className="flex -space-x-2">
                      {slide.reviewAvatars.map((avatar, i) => (
                        <div
                          key={i}
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white ${avatar.bg} flex items-center justify-center text-white font-semibold text-xs shadow-sm`}
                        >
                          {avatar.name}
                        </div>
                      ))}
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                        {slide.extra}
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="font-[600] text-gray-900 text-lg sm:text-xl">
                        {slide.patients}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {slide.rating}
                        </span>
                        <span className="text-xs text-gray-500">
                          {slide.reviews}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pagination Dots */}
                  <div className="absolute left-0 bottom-3 flex justify-center items-center gap-2 pt-4">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`transition-all duration-500 rounded-full w-3 h-3 cursor-pointer __paragraph-bg ${
                          currentSlide === idx ? "__primary-bg" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* TRUST FEATURES - Responsive */}
              <div className="__primary-bg px-4 sm:px-6 lg:px-16 py-6 sm:py-8 lg:py-14 rounded-2xl lg:rounded-3xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 text-white">
                  {trustFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 sm:gap-4 group cursor-pointer justify-center sm:justify-start"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0">
                        <Image
                          src={feature.icon}
                          alt={feature.title}
                          width={40}
                          height={40}
                          className="sm:w-[50px] sm:h-[50px]"
                        />
                      </div>
                      <div className="font-[400] __text text-lg sm:text-xl lg:text-[24px] text-center sm:text-left">
                        {feature.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SmartHealthBanner;
