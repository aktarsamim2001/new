"use client";

import React from "react";
import image from "../../assets/partner-image/women.png";
import image2 from "../../assets/service/Why you should take/healthSection2.png";
import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HealthSection = ({ dataItem }) => {
  const path = usePathname();
  const aboutPage = dataItem?.content?.about_page;

  // Fallbacks
  const title = aboutPage?.title_four || "";
  const description = aboutPage?.description_five || "";
  const buttonUrl = aboutPage?.button_url_four || "/book-test";
  const buttonName = aboutPage?.button_name_five || "Get Started";
  const imageSrc = aboutPage?.image_four || null;
  const imageAlt = aboutPage?.title_four || "Health Section";

  // If aboutPage is missing, render nothing or a fallback UI
  if (!aboutPage) {
    return null;
  }

  return (
    <div className="container mx-auto __gapTop">
      <div className="grid grid-cols-1 lg:grid-cols-[55%_44%] gap-8 items-center mt-[60px] md:mt-0">
        {/* Content Section */}
        <div className="order-2 lg:order-1 px-4 md:px-0">
          <h2 className="section__heading bg-gradient-to-br from-[#1a1a1a] to-[#4a4a4a] text-transparent bg-clip-text">
            {title}
          </h2>
          <p className="text-gray-500 banner__description max-w-2xl mt-5">
            {description}
          </p>
          <div>
            <Link href={buttonUrl} passHref>
              <Button
                variant="outline"
                className="text-white rounded-[5px] text-base sm:text-[16px] mt-3 font-semibold shadow-xl cursor-pointer __secondary-bg hover:shadow-2xl transition-all duration-300 w-full max-w-[150px]"
              >
                {buttonName}
              </Button>
            </Link>
          </div>
        </div>
        {/* Image Section */}
        <div className="w-full flex items-center justify-center order-1 lg:order-2">
          <div className={`relative w-full md:mt-[60px] ${path !== "/our-services" ? "z-[-1] mt-[-100px]" : ""}`}> 
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={500}
                height={500}
                className="object-cover h-[417px] md:rounded-2xl w-full md:w-[100%]"
                priority
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthSection;
