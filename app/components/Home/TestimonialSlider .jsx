"use client"

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import image from '../../assets/testimonials-image/testimonials-image.jpg'
import Image from "next/image";
import image2 from '../../assets/testimonials-image/Vector.png'

const testimonials = [
  {
    id: 1,
    quote:
      "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy",
    author: "Mr. Williams",
    role: "Diabetics Patient",
    rating: 5,
    image:image,
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
    <div className="bg-gradient-to-r from-teal-400 to-teal-500 mt-[60px]">
      <div className="container mx-auto relative">
         <div className="hidden md:flex justify-center items-center mt-4 sm:mt-0 gap-3 ">
          <button variant="outline" className=" live_event_prev absolute bottom-1/2 cursor-pointer left-14">
            <CircleArrowLeft size={28}/>
          </button>
          <button variant="outline" className=" live_event_next absolute bottom-1/2 cursor-pointer right-14">
            <CircleArrowRight size={28}/>
          </button>
        </div>
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop
          navigation={{
            prevEl: ".live_event_prev",
            nextEl: ".live_event_next",
          }}
          className="!pt-8"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-8 justify-center max-w-3xl mx-auto">
                  <div className="w-full h-full flex items-center justify-center">
                   <Image src={testimonial.image} alt={testimonial.author} width={320} className="object-cover rounded-2xl h-full" />
                  </div>
                <div className="text-white space-y-3 relative">
                  <div className="w-14 h-14 flex items-center justify-center bg-white rounded-br-full leading-none">
                  <Image src={image2} width={25} height={25} alt="quote" className="absolute top-4 left-2.5"/>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xl lg:text-2xl  font-medium">
                    "{testimonial.quote}"
                  </p>
                  <div className="pt-4">
                    <div className="font-semibold text-lg">
                      {testimonial.author}
                    </div>
                    <div className="text-teal-100 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialSlider;
