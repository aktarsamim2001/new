import Image from "next/image";
import React from "react";
import image from "../../assets/how-it-work/how-it-work-banner.jpg";

function Banner() {
  return (
    <div>
      {" "}
      <div className=" mx-auto __gapTop">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-start">
          {/* Image Section */}
          <div className="flex justify-center items-center">
            <div className="relative w-full h-[200px] md:h-[300px] md:rounded-r-[30px] overflow-hidden shadow-lg">
              <Image
                src={image}
                alt="Services Banner"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="p-4 text-left max-w-lg">
            <h1 className="text-[28px] md:text-[43px] leading-[1.3] font-bold __secondary-text">
              Everything you need.
              <span className="block"> All in one place.</span>
            </h1>
            <p className="mt-4 text-[16px] text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
              vitae beatae fuga quas quidem quaerat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
