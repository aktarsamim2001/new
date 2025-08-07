import React, { useState } from "react";
// import { Star, Shield, Award, Lock, Icon } from "lucide-react";
import { IoStarSharp } from "react-icons/io5";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "./home.css";
import "swiper/css";
import image from "../../../public/star-badge.png";
import image2 from "../../../public/test-tube.png";
import image3 from "../../../public/icon -lock.png";
import Button from "../ui/Button";
import person from "../../assets/person/person-1.jpg";
import person2 from "../../assets/person/person-2.jpg";
import person3 from "../../assets/person/person-3.jpg";
import person4 from "../../assets/person/person-4.jpg";
import img from "../../assets/carousel-home/image1.jpg";
import img2 from "../../assets/carousel-home/image2.jpg";
import img3 from "../../assets/carousel-home/image3.jpg";
import line from "../../assets/carousel-home/line.png";

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
    button: "Explore Packages",
    leftImage: "/bg-effect.png",
    centerImage: "/bg-person.png",
    rightImage: img,
    reviewAvatars: [
      {
        image: person,
        bg: "bg-gradient-to-br from-indigo-500 to-purple-600",
      },
      { image: person2, bg: "bg-gradient-to-br from-pink-500 to-red-500" },
      { image: person3, bg: "bg-gradient-to-br from-blue-500 to-cyan-500" },
      { image: person4, bg: "bg-gradient-to-br from-green-500 to-teal-500" },
    ],
    patients: "120+ patients",
    rating: "5.0",
    reviews: "(450k reviews)",
    extra: "70+",
  },
  {
    heading: (
      <>
        Health Packages
        <br />
        for Every Need
      </>
    ),
    description:
      "From routine checkups to specialized health panels, Sukai Health offers comprehensive test packages tailored to your needs. Find the right package, book instantly, and take charge of your well-being.",
    button: "Explore Packages",
    leftImage: "/bg-effect2.png",
    centerImage: "/bg-person-1.png",
    rightImage: img2,
    reviewAvatars: [
      {
        image: person,
        bg: "bg-gradient-to-br from-yellow-500 to-orange-500",
      },
      { image: person2, bg: "bg-gradient-to-br from-purple-500 to-pink-500" },
      { image: person3, bg: "bg-gradient-to-br from-blue-500 to-green-500" },
      { image: person4, bg: "bg-gradient-to-br from-red-500 to-yellow-500" },
    ],
    patients: "120+ patients",
    rating: "5.0",
    reviews: "(450k reviews)",
    extra: "70+",
  },
  {
    heading: (
      <>
        Book. Test. Track.
        <br />
        It’s That Easy!
      </>
    ),
    description:
      "Skip the long waits and complicated bookings. Sukai Health lets you schedule lab tests in just a few clicks. Choose your test, pick a time, and get results delivered straight to your dashboard.",
    button: "Book Appointment",
    leftImage: "/bg-effect2.png",
    centerImage: "/bg-person.png",
    rightImage: img3,
    reviewAvatars: [
      { image: person2, bg: "bg-gradient-to-br from-teal-500 to-cyan-500" },
      { image: person3, bg: "bg-gradient-to-br from-pink-500 to-purple-500" },
      { image: person4, bg: "bg-gradient-to-br from-green-500 to-blue-500" },
      {
        image: person,
        bg: "bg-gradient-to-br from-yellow-500 to-orange-500",
      },
    ],
    patients: "120+ patients",
    rating: "5.0",
    reviews: "(450k reviews)",
    extra: "70+",
  },
];

const slides = sliderData;

export const SmartHealthBanner2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slider data array

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
      <div className="container mx-auto w-full px-4">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 300500,
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
                <div className="w-full h-full">
                  <div className="space-y-6">
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
                    <p className="text-[18px] font-[400] __paragraph leading-relaxed __text pr-3">
                      {slide.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="cursor-pointer __secondary-bg text-white font-[600] text-[16px] __text mt-4"
                  >
                    {slide.button}
                  </Button>
                </div>

                {/* CENTER SECTION - Desktop */}
                <div className="relative w-full h-full bg-gradient-to-t from-sky-200 to-sky-50 rounded-t-full flex items-center justify-center shadow-2xl border-t-2 border-blue-500">
                  <div className="-top-18.5 absolute">
                    <Image
                      src={slide.centerImage}
                      alt="Person"
                      width={450}
                      height={800}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* RIGHT SECTION - Desktop */}
                <div className="w-full h-full grid items-end pb-8">
                  <div>
                    {slide.rightImage && (
                      <Image
                        src={slide.rightImage}
                        alt="Effect"
                        width={400}
                        height={50}
                        className="w-full h-auto opacity-25 pb-12"
                      />
                    )}

                    <div className="max-w-[180px] ml-3 flex flex-col items-center justify-center gap-3 p-3 border-2 border-sky-500 rounded-lg bg-blue-50 shadow-2xl">
                      <div className="flex -space-x-3">
                        {slide.reviewAvatars.map((avatar, i) => (
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
              <div className="__primary-bg px-4 sm:px-6 lg:px-16 py-6 sm:py-8 lg:py-14 rounded-2xl lg:rounded-3xl overflow-hidden relative z-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-0 text-white items-start">
                  {trustFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 sm:gap-4 group cursor-pointer justify-center"
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
                      <div className="font-[500] max-w-[250px] text-[#FFFFFF] text-lg sm:text-xl lg:text-[24px] text-center sm:text-left ">
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

const SmartHealthBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
          {slides.map((slide, ind) => (
            <SwiperSlide key={ind}>
              <div className="bg-white">
                <div className="md:flex justify-between md:ml-[10%] lg:ml-[12%] h-auto relative z-0">
                  <div className="relative z-[100]">
                    {/* left content */}
                    <div className="w-full mt-[80px] px-6 md:px-0">
                      <div className="space-y-4">
                        <h1 className="text-4xl md:text-[55px] lg:text-[65px] text-black font-[600] leading-[100%] __heading">
                          {slide.heading}
                        </h1>
                        <div className="relative w-[520px] h-[40px] left-[-50px] hidden md:block">
                          <Image
                            src={line}
                            alt="Effect"
                            fill
                            className="w-full h-[25px] block border absolute left-0 top-0 z-10"
                          />
                        </div>
                        {/* Mobile Effect: on right side of heading */}
                        <div className="lg:hidden absolute top-10 right-[-40px] w-[180px] h-[35px]">
                          <Image
                            src={line}
                            alt="Effect"
                            fill
                            className="object-contain"
                          />
                        </div>

                        <p className="text-[18px] font-[400] __paragraph leading-[145%] __text pr-3 max-w-[450px]">
                          {slide.description}
                        </p>
                      </div>

                      <Button
                        variant="outline"
                        className="cursor-pointer __secondary-bg text-white font-[600] text-[16px] __text mt-4"
                      >
                        {slide.button}
                      </Button>
                    </div>
                    {/* ratings */}
                    <div className="flex md:block justify-end px-6 md:px-0 mt-6">
                      <div className="w-[195px] md:w-[220px] md:absolute bottom-[80px] right-[150px] md:bottom-[140px] md:left-[350px] z-50 flex flex-col gap-3 p-4 border-2 border-sky-500 rounded-[5px] bg-white shadow-2xl">
                        <div className="flex -space-x-3">
                          {slide.reviewAvatars.map((avatar, i) => (
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
                          <div className="font-[600] text-gray-900 text-[20px]">
                            {slide.patients}
                          </div>
                          <div className="flex items-center gap-1">
                            <IoStarSharp className="text-[23px] fill-yellow-400 text-yellow-400" />
                            <span className="text-base font-medium text-gray-900">
                              {slide.rating}
                            </span>
                            <span className="text-base font-[500] text-gray-500">
                              {slide.reviews}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute w-full left-0 top-0 h-full carousel-overlay z-[-1]" />
                  {/* right image */}
                  <div className="flex-1 h-[350px] overflow-hidden md:h-full relative z-[-10] mt-[-10px] md:mt-0">
                    <Image
                      src={slide.rightImage}
                      alt={`hero image ${ind}`}
                      className="block w-full h-[300px] md:h-[650px] mt-3 transform-[scale(1.4)] md:transform-[scale(1.3)]"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="__primary-bg mt-[-28px] md:mt-[-85px] px-4 sm:px-6 md:px-12 py-6 sm:py-8 md:py-14 md:rounded-2xl lg:rounded-3xl overflow-hidden relative z-20 max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-0 text-white lg:items-start justify-center lg:justify-start">
            <div className="flex items-center gap-3 sm:gap-4 group cursor-pointer lg:justify-center ">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0">
                <Image
                  src={image}
                  alt={"medal"}
                  width={40}
                  height={40}
                  className="sm:w-[50px] sm:h-[50px]"
                />
              </div>
              <div className="font-[500] max-w-[250px] leading-[1.1] text-[#FFFFFF] text-lg sm:text-xl lg:text-[24px] text-center sm:text-left ">
                MOH-Certified Medical Staff
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 group cursor-pointer md:justify-center ">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0">
                <Image
                  src={image2}
                  alt={"medal"}
                  width={40}
                  height={40}
                  className="sm:w-[50px] sm:h-[50px]"
                />
              </div>
              <div className="font-[500] max-w-[250px] leading-[1.1] text-[#FFFFFF] text-lg sm:text-xl md:text-[24px] text-center sm:text-left ">
                Accredited Malaysian Labs
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 group cursor-pointer md:justify-center ">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0">
                <Image
                  src={image3}
                  alt={"medal"}
                  width={40}
                  height={40}
                  className="sm:w-[50px] sm:h-[50px]"
                />
              </div>
              <div className="font-[500] max-w-[250px] leading-[1.1] text-[#FFFFFF] text-lg sm:text-xl md:text-[24px] text-center sm:text-left ">
                Secure & Private, Always
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmartHealthBanner;
