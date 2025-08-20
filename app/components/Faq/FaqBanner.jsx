import Image from "next/image";
import React from "react";
import image from "../../assets/about/aboutBanner.jpg";
import Link from "next/link";

function FaqBanner({ data }) {
  console.log("banner", data.content.faq_page);
  const banner = data?.content?.faq_page;
  return (
    <div className="container mx-auto __gapTop">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-start">
        {/* Image Section */}
        <div className="flex justify-center items-center">
          <div className="relative w-full h-[200px] md:h-[287px] md:rounded-[30px] overflow-hidden shadow-lg">
            {banner?.image ? (
              <Image
                src={banner.image}
                alt={banner.title || "Banner"}
                fill
                className="object-cover"
              />
            ) : null}
          </div>
        </div>

        {/* Text Section */}
        <div className="p-4 text-left max-w-lg">
          <h1 className="text-4xl font-bold __secondary-text">
            {banner?.title}
          </h1>
          <p className="mt-4 banner__description text-gray-600">
            {banner?.description}
          </p>
          <button className="mt-4 cursor-pointer __secondary-bg text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors">
            <Link href="/sign-up" className="text-white">
              {banner?.button_name}
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
export default FaqBanner;
