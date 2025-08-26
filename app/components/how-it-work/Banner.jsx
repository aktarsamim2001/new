import Image from "next/image";
import React from "react";
import image from "../../assets/how-it-work/how-it-work-banner.jpg";

function Banner({data}) {
  // Support multiple possible data shapes
  const bannerData = data?.how_it_works || data?.content?.how_it_works || data;
  console.log("Banner data:", bannerData);
  return (
    <div>
      <div className="mx-auto __gapTop">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-start">
          {/* Image Section */}
          <div className="flex justify-center items-center">
            <div className="relative w-full h-[200px] md:h-[370px] md:rounded-r-[30px] overflow-hidden shadow-lg">
              <Image
                src={bannerData?.image || image}
                alt="Services Banner"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="p-4 text-left max-w-lg">
            <h1
              dangerouslySetInnerHTML={{ __html: bannerData?.title || "" }}
              className="text-[28px] md:text-[43px] leading-[1.1] md:leading-[1.3] font-bold __secondary-text"
            />
            <p className="mt-4 banner__description text-gray-600">
              {bannerData?.description || ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
