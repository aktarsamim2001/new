import Image from "next/image";
import React from "react";
import image from "../../assets/about/aboutBanner.jpg";
import Link from "next/link";

function AboutBanner() {
  return (
    <div className="container mx-auto lg:mt-[40px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-between">
        {/* Image Section */}

        <div className="relative left-[-30px] w-full h-[200px] md:h-[390px] rounded-tr-[40px] rounded-br-[40px] overflow-hidden shadow-lg">
          <Image
            src={image}
            alt="Services Banner"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Text Section */}
        <div className="p-r-4 text-left">
          <h1 className="text-[42px] font-bold __secondary-text">
            Find the Right Test For You
          </h1>
          <p className="mt-3 mb-3 text-lg text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Dolor vitae beatae fuga
            quas quidem quaerat. adipisicing elit. Dolor vitae beatae fuga quas
            quidem quaerat. Dolor vitae beatae fuga quas quidem quaerat.
            adipisicing elit. Dolor vitae beatae fuga quas quidem quaerat.fuga
            quas quidem quaerat. adipisicing elit. Dolor vitae beatae fuga quas
            quidem quaerat. Dolor vitae beatae fuga quas quidem quaerat.
            adipisicing elit. Dolor vitae beatae fuga quas quidem quaerat.fuga
            quas quidem quaerat.
          </p>
          <button className="mt-4 cursor-pointer __secondary-bg text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors">
            <Link href="/sign-up" className="text-white">
              Login to Dashboard
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
export default AboutBanner;
