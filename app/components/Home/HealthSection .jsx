"use client";

import React from "react";
import image from '../..//assets/partner-image/handshake.png'
import Image from "next/image";

const HealthSection = () => {
  return (
      <div className="container mx-auto  __gapTop">
        <div className="grid lg:grid-cols-2 justify-center items-center">
          <div className="space-y-4">
          <h1 className="text-5xl lg:text-[3.2rem] font-bold leading-tight bg-gradient-to-br from-[#1a1a1a] to-[#4a4a4a] text-transparent bg-clip-text">
            Ready to Take Charge of Your Health?
          </h1>
          <p className="text-gray-600 text-base md:text-lg font-normal leading-relaxed">
            Book tests, access reports, consult doctors, and manage your
            well-being — all in one place.
          </p>
          <button className=" text-white py-4 px-8 rounded-xl text-base font-semibold shadow-xl cursor-pointer __secondary-bg">
            Get Started
          </button>
        </div>

            <div
              className="w-full h-full flex items-center justify-center"
            >
              <Image src={image} alt="Handshake" width={320} height={356} className="object-cover rounded-2xl h-full w-[520px]" />
            </div>
        </div>
          </div>
  );
};

export default HealthSection;
