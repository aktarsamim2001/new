"use client";

import React from "react";
import image from "../..//assets/partner-image/handshake.png";
import Image from "next/image";
import Button from "../ui/Button";

const LetsTalk = () => {
  return (
    <div className="my-6 sm:my-8 md:my-16 flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8 px-4 lg:px-28 container mx-auto pb-8">
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
        <h3 className="text-xl md:text-[56px] sm:text-2xl font-[500] text-gray-900 mb-2 leading-[1.1]">
          Still Have Questions?
          <br />
          Let's Talk.
        </h3>
        <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
          Our team is just a message away. Whether you’re stuck with a booking, confused about a report, or need help navigating your dashboard—support is standing by.
        </p>
        <button className="__secondary-bg text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-[10px] text-sm sm:text-base shadow transition">
          Contact Support
        </button>
      </div>
      <div className="w-full md:w-1/2 flex-shrink-0">
        <Image
          src={image}
          alt="Support Lab"
          className="rounded-xl object-cover object-top w-full h-32 sm:h-40 md:h-[420px]"
        />
      </div>
    </div>
  );
};

export default LetsTalk;
