"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import image from "../../assets/testimonials-image/testimonials-image.jpg";
import Image from "next/image";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import image2 from "../../assets/testimonials-image/Vector.png";

const testimonials = [
  {
    id: 1,
    quote:
      "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy",
    author: "Mr. Williams",
    role: "Diabetics Patient",
    rating: 5,
    image: image,
  },
  {
    id: 2,
    quote:
      "The professional care and attention I received was exceptional. The staff made me feel comfortable throughout my entire treatment journey",
    author: "Mrs. Johnson",
    role: "Heart Patient",
    rating: 5,
    image: image,
  },
  {
    id: 3,
    quote:
      "Outstanding service and genuine care from every team member. They truly understand what patient-centered care means",
    author: "Dr. Martinez",
    role: "Referring Physician",
    rating: 5,
    image: image,
  },
];

const TestimonialSlider = () => {
  return (
    <div className="__primary-bg mt-[60px]">
      <div className="container mx-auto relative">
        {/* Navigation buttons - hidden on mobile, visible on desktop */}
        <div className="hidden lg:flex justify-center items-center">
          <button
            variant="outline"
            className="live_event_prev absolute border-[1px] p-2 rounded-full top-1/2 -translate-y-1/2 cursor-pointer left-4 xl:left-8 z-10 text-white hover:text-teal-200 transition-colors"
          >
            <FaArrowLeftLong size={28} />
          </button>
          <button
            variant="outline"
            className="live_event_next border-[1px] p-2 rounded-full absolute top-1/2 -translate-y-1/2 cursor-pointer right-4 xl:right-8 z-10 text-white hover:text-teal-200 transition-colors"
          >
            <FaArrowRightLong size={28} />
          </button>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          loop
          navigation={{
            prevEl: ".live_event_prev",
            nextEl: ".live_event_next",
          }}
          className="!py-8 sm:!py-12"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-6 sm:gap-8 justify-center max-w-6xl mx-auto">
                {/* Image Section */}
                <div className="w-full flex items-center justify-center order-1 lg:order-1">
                  <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      width={400}
                      height={300}
                      className="object-cover rounded-2xl w-full h-64 sm:h-80 lg:h-96"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="text-white space-y-4 sm:space-y-6 relative order-2 lg:order-2 px-4 sm:px-0">
                  {/* Quote Icon */}
                  <div className="w-12 h-12 sm:w-11 sm:h-11 flex items-center justify-center bg-white rounded-br-full relative">
                    <Image
                      src={image2}
                      width={21}
                      height={21}
                      alt="quote"
                      className="absolute top-3 left-2 sm:top-3.5 sm:left-2"
                    />
                  </div>

                  {/* Star Rating */}
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote Text */}
                  <p className="text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  {/* Author Info */}
                  <div className="pt-2 sm:pt-4">
                    <div className="font-[500] text-lg sm:text-xl">
                      {testimonial.author}
                    </div>
                    <div className="text-teal-100 text-sm sm:text-base">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mobile Navigation Dots (Optional) */}
        <div className="flex lg:hidden justify-center space-x-2 pb-4">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 bg-white bg-opacity-50 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
