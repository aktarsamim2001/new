"use client";

import { MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import textureImage from "../../../public/texture-bg.png";
import { Poppins } from "next/font/google";
import Button from "../ui/Button";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const HowItWorks = ({ data }) => {
  const steps = data?.content?.how_it_works?.banner_items || [];

  return (
    <div className="__gapTop">
      <div className=" bg-[#FCD3EA] pt-16 md:pt-10 flex justify-end md:px-10">
        <div className="md:w-[95%]">
          {steps.map((step, index) => (
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 mt-4 md:mt-0 md:mb-8 items-center md:container mx-auto relative ${poppins.className}`}
              key={index}
            >
              {/* Decorative texture for specific steps */}
              {index === 0 && (
                <div className="absolute -top-18 -left-28 md:left-[-140px] w-full max-w-[381px] opacity-50 z-0 flex flex-col pointer-events-none">
                  <Image
                    src={textureImage}
                    alt="Decorative texture"
                    width={600}
                    height={800}
                    className="filter h-[177px] w-[400px] brightness-0 invert"
                  />
                  <div className="-mt-22">
                    <Image
                      src={textureImage}
                      alt="Decorative texture"
                      width={600}
                      height={800}
                      className="filter h-[177px] w-[400px] brightness-0 invert"
                    />
                  </div>
                </div>
              )}

              <div className="z-10 px-8 mb-6">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900">
                  {String(index + 1).padStart(2, "0")}.
                </h2>
                <h1 className="text-[26px] sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-[56px] xl:leading-14 font-bold text-gray-900 leading-tight mb-4">
                  {step.title}
                </h1>
                <p className="text-[14px] leading-4 md:leading-6 md:text-[18px] text-gray-500 md:max-w-lg">
                  {step.description}
                </p>

                {/* Render short_notes dynamically */}
                {step?.short_notes?.map((note, i) => (
                  <p
                    key={i}
                    className="text-xs sm:text-[16px] text-gray-500 flex items-center gap-1.5"
                  >
                    <MoveRight size={15} />
                    {note?.text || note}
                  </p>
                ))}

                {/* Button only in the last step */}
                {index === steps.length - 1 && (
                  <div className="pt-4">
                    <Button className="cursor-pointer __secondary-bg text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors">
                      <Link href="/sign-up" className="text-white">
                        {data?.content?.how_it_works?.button_name || "Find Out More"}
                      </Link>
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <img
                  src={step.banner}
                  alt={step.title}
                  className="w-full h-[165px] md:w-[586px] md:h-[454px] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
