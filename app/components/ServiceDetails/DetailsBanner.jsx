"use client";

import Image from "next/image";
import React from "react";
import image from "../../assets/how-it-work/how-it-work-banner.jpg";
import Link from "next/link";

function DetailsBanner() {
  return (
    <div>
      {" "}
      <div className="max-w-7xl __gapTop">
        <div className="grid grid-cols-1 md:grid-cols-[620px_auto] gap-8 items-center justify-start">
          {/* Image Section */}
          {/* <div className="flex justify-start items-center"> */}
          <div className="relative w-full h-[200px] md:h-[411px] max-w-[611px] md:rounded-[0px_40px_40px_0px] overflow-hidden shadow-lg">
            <Image
              src={image}
              alt="Services Banner"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* </div> */}

          {/* Text Section */}
          <div className="px-4 md:px-0 text-left">
            <h1 className="text-5xl font-bold __secondary-text">
              Complete Blood Count <br /> Test (CBC)
            </h1>
            <p className="mt-4 text-lg text-[#222222] leading-6">
              The Complete Blood Count (CBC) test is a common and essential
              blood test that gives insights into your overall health by
              measuring key components like red blood cells, white blood cells,
              and platelets. It's often the first step in detecting infections,
              anemia, immune system issues, and more.
            </p>
            <p className="mt-4 text-[#222222]">Cost: 60 RM (including tax)</p>
            <Link href="/book-test">
              <button className="mt-4 __secondary-bg text-white px-10 py-4 rounded-lg font-semibold">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailsBanner;
