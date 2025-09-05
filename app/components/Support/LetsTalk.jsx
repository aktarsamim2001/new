"use client";

import React from "react";
import image from "../..//assets/partner-image/handshake.png";
import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";

const LetsTalk = ({data}) => {
  console.log("LetsTalk data:", data?.content?.contact_us_page);
  const bottomBanner = data?.content?.contact_us_page || {};
  return (
    <div className="__gapTop flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8 container mx-auto px-4 md:px-0">
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
        <h3 dangerouslySetInnerHTML={{ __html: bottomBanner?.title_three }} className="section__heading text-gray-900 mb-2">
        </h3>
        <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
          {bottomBanner?.description_three}
        </p>
        <Link href={bottomBanner?.button_url_three}>
          <Button className="__secondary-bg text-white">
            {bottomBanner?.button_name_three}
          </Button>
        </Link>
      </div>
      <div className="w-full md:w-1/2 flex-shrink-0">
        <Image
          src={image}
          alt="Support Lab"
          className="rounded-xl object-cover object-top w-full h-32 sm:h-40 md:h-[400px]"
        />
      </div>
    </div>
  );
};

export default LetsTalk;
