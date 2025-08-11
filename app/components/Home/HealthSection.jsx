"use client";

import React from "react";
import image from "../../assets/partner-image/women.png";
import image2 from "../../assets/service/Why you should take/healthSection2.png";
import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HealthSection = () => {
  const path = usePathname()
  return (
    <div className="container mx-auto __gapTop">
      <div className="grid grid-cols-1 lg:grid-cols-[55%_44%] gap-8 items-center">
        {/* Content Section */}
        <div className="order-2 lg:order-1">
          <h2 className="section__heading bg-gradient-to-br from-[#1a1a1a] to-[#4a4a4a] text-transparent bg-clip-text">
            Ready to Take Charge of Your Health?
          </h2>

          <p className="text-gray-500 banner__description max-w-2xl mt-5">
            Book tests, access reports, consult doctors, and manage your well-
            <br className="hidden lg:block" />
            being — all in one place.
          </p>

          <div>
            <Link href="/book-test" passHref>
              <Button
                variant="outline"
                className="text-white rounded-[5px] text-base sm:text-[16px] mt-3 font-semibold shadow-xl cursor-pointer __secondary-bg hover:shadow-2xl transition-all duration-300 w-full max-w-[150px]"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full flex items-center justify-center order-1 lg:order-2">
          <div className={`relative w-full md:mt-[60px] ${path !== "/our-services" ? "z-[-1] mt-[-100px]" : ""}`}> 
            <Image
              src={ path === "/" ? image : image2}
              alt="Handshake"
              // width={500}
              // height={500}
              className="object-cover h-[417px] md:rounded-2xl w-full md:w-[100%]"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthSection;
