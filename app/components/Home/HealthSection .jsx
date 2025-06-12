"use client";

import React from "react";
import image from "../..//assets/partner-image/handshake.png";
import Image from "next/image";
import Button from "../ui/Button";

const HealthSection = () => {
  return (
    <div className="container mx-auto px-4  mt-[5rem]">
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 items-center">
        {/* Content Section */}
        <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-bold leading-tight bg-gradient-to-br from-[#1a1a1a] to-[#4a4a4a] text-transparent bg-clip-text">
            Ready to Take Charge of Your Health?
          </h1>

          <p className="text-gray-600 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
            Book tests, access reports, consult doctors, and manage your
            well-being — all in one place.
          </p>

          <div className="pt-2">
            <Button
              variant="outline"
              className="text-white rounded-xl text-base sm:text-lg font-semibold shadow-xl cursor-pointer __secondary-bg hover:shadow-2xl transition-all duration-300 w-full max-w-[150px]"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full flex items-center justify-center order-1 lg:order-2">
          <div className="relative w-full pr-8">
            <Image
              src={image}
              alt="Handshake"
              width={500}
              height={500}
              className="object-cover rounded-2xl h-[350px] lg:w-[100%]"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthSection;
