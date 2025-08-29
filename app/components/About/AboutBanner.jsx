

import Image from "next/image";
import React from "react";
import Link from "next/link";
import Button from "../ui/Button";


function AboutBanner({ data }) {
  const about = data?.content?.about_page || {};
  return (
    <div>
      <div className="mx-auto __gapTop">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-start">
          {/* Image Section */}
          <div className="flex justify-center items-center">
            <div className="relative w-full h-[200px] md:h-[370px] md:rounded-r-[30px] overflow-hidden shadow-lg">
              {about.image ? (
                <Image
                  src={about.image}
                  alt={about.title || "About Banner"}
                  fill
                  className="object-cover"
                  priority
                />
              ) : null}
            </div>
          </div>

          <div className="text-left px-4 md:px-0 max-w-xl">
            <h1 className="text-[26px] md:text-[50px] md:text-4xl font-bold __secondary-text">
              {about.title || "Your Health, Smarter."}
            </h1>
            <p className="mt-3 mb-3 banner__description text-gray-600 line-clamp-3 md:line-clamp-3">
              {about.description || "All your medical records, test results, and health insights—neatly organized in one secure dashboard."}
            </p>
            {about.button_name && (
              <Button className="mt-4 cursor-pointer __secondary-bg">
                <Link href={about?.button_url || ""} className="text-white">
                  {about.button_name}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutBanner;
