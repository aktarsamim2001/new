import Image from "next/image";
import React from "react";
import image from "../../assets/about/aboutBanner.jpg";
import Link from "next/link";

function SupportBanner() {
  return (
    <div className="container mx-auto __gapTop md:px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center justify-start">
        {/* Image Section */}
        <div className="flex justify-end items-center">
          <div className="relative w-[100%] h-[200px] md:h-[350px] md:rounded-[30px] overflow-hidden">
            <Image
              src={image}
              alt="Services Banner"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="px-4 text-left">
          <h1 className="text-[24px] md:text-[48px] font-[550]">
            Need Assistance? Let’s Sort It Out Together.
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            From choosing the right test to understanding your results, we’re
            with you every step of the way.
          </p>
        </div>
      </div>
    </div>
  );
}
export default SupportBanner;
