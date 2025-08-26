"use client";

import Image from "next/image";
import React from "react";
import image from "../../assets/how-it-work/how-it-work-banner.jpg";
import Link from "next/link";
import Button from "../ui/Button";

function DetailsBanner({ bannerDetailsPage }) {
  return (
    <div>
      {" "}
      <div className="max-w-7xl mt-12">
        <div className="grid grid-cols-1 md:grid-cols-[780px_680px] gap-8 items-center justify-start">
          {/* Image Section */}
          {/* <div className="flex justify-start items-center"> */}
          <div className="relative w-full h-[200px] md:h-[370px] max-w-[771px] md:rounded-[0px_40px_40px_0px] overflow-hidden shadow-lg">
            {bannerDetailsPage?.image && bannerDetailsPage.image !== "" && (
              <Image
                src={bannerDetailsPage.image}
                alt="Services Banner"
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
          {/* </div> */}

          {/* Text Section */}
          <div className="px-4 md:px-0 text-left">
            <h1 dangerouslySetInnerHTML={{ __html: bannerDetailsPage?.name || "" }} className="lg:text-5xl text-2xl font-bold __secondary-text">
            </h1>
            <p dangerouslySetInnerHTML={{ __html: bannerDetailsPage?.description || "" }} className="mt-4 text-sm leading-5  md:text-lg text-[#222222] md:leading-6">
            </p>
            {/* <p className="mt-4 text-[#222222]">Cost: 60 RM (including tax)</p> */}
            <Link href="/book-test">
              <Button className="mt-4 __secondary-bg text-white">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailsBanner;
