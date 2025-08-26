"use client";

import React from "react";
import image from "../..//assets/partner-image/handshake.png";
import Image from "next/image";
import Button from "../ui/Button";

const LetsTalk = () => {
  return (
    <div className="__gapTop flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8 container mx-auto px-4 md:px-0">
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
        <h3 className="section__heading text-gray-900 mb-2">
          Still Have Questions?
          <br />
          Let's Talk.
        </h3>
        <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
          Our team is just a message away. Whether you’re stuck with a booking, confused about a report, or need help navigating your dashboard—support is standing by.
        </p>
        <Button className="__secondary-bg text-white">
          Contact Support
        </Button> 
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
