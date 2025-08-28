import Image from "next/image";
import React from "react";
import image from "../../assets/about/aboutBanner.jpg";
import Link from "next/link";
import Button from "../ui/Button";

function FaqBanner({ data }) {
  const banner = data?.content?.faq_page;
  return (
    <div>
      <div className="mx-auto __gapTop">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-start">
          {/* Image Section */}
          <div className="flex justify-center items-center">
            <div className="relative w-full h-[200px] md:h-[370px] md:rounded-r-[30px] overflow-hidden shadow-lg">
              {banner?.image ? (
                <Image
                  src={banner.image}
                  alt={banner.title || "Banner"}
                  fill
                  className="object-cover"
                  priority
                />
              ) : null}
            </div>
          </div>

          <div className="text-left px-4 md:px-0 max-w-xl">
            <h1 className="text-[26px] md:text-[50px] md:text-4xl font-bold __secondary-text">
              {banner.title || "Your Health, Smarter."}
            </h1>
            <p className="mt-3 mb-3 banner__description text-gray-600 line-clamp-3 md:line-clamp-3">
              {banner.description || "All your medical records, test results, and health insights—neatly organized in one secure dashboard."}
            </p>
            {banner.button_name && (
              <Button className="mt-4 cursor-pointer __secondary-bg">
                <Link href={banner?.button_url || ""} className="text-white">
                  {banner.button_name}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default FaqBanner;
