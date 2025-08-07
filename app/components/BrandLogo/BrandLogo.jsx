"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import image from "../../assets/brand-logo/logo1.png";
import image1 from "../../assets/brand-logo/logo2.png";
import image2 from "../../assets/brand-logo/logo3.png";
import image3 from "../../assets/brand-logo/logo4.png";

const logo = [
  { id: 1, icon: image },
  { id: 2, icon: image1 },
  { id: 3, icon: image2 },
  { id: 4, icon: image3 },
];

function BrandLogo() {
  return (
    <div className="container mx-auto mt-[34px] md:mt-[85px]">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        className="custom-swiper"
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 4 },
        }}
      >
        {logo.map((logos) => (
          <SwiperSlide key={logos.id}>
            <div className="lg:max-w-[200px] h-[105px] mx-auto flex items-center justify-center aspect-video lg:aspect-auto">
              <Image
                src={logos.icon}
                alt="brand-logo"
                width={150}
                height={105}
                className="object-contain w-full h-full cursor-pointer hover:scale-105 transition-transform duration-300 mb-6 md:mb-0"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .custom-swiper .swiper-pagination-bullet {
          @apply bg-indigo-600 opacity-100 w-3 h-3 mx-1 rounded-full transition-all;
        }
        .custom-swiper .swiper-pagination-bullet-active {
          @apply bg-blue-700 scale-110;
        }
      `}</style>
    </div>
  );
}

export default BrandLogo;
