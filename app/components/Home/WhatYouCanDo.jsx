import React from "react";
import Image from "next/image";
import "./home.css";
import img1 from "../../assets/home/what-you-can/doctor.png";
import img2 from "../../assets/home/what-you-can/band-aid.png";
import img3 from "../../assets/home/what-you-can/medicine.png";
import img4 from "../../assets/home/what-you-can/ecg-monitor.png";

const WhatYouCanDo = ({dataItem}) => {
  const features = dataItem?.content?.home_page?.what_you_can_do_items || [];

  return (
    <div className="container mx-auto __gapTop">
      <h2 className="__secondary-text section__heading text-center mb-5 md:mb-8">
        What You Can Do
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 px-4 md:px-0">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex items-center justify-center gap-3 gap-x-5 p-4 bg-[#FFFFFF] cardShadow2 rounded-[22px]"
          >
            <div className="w-[100px] h-[105px] flex justify-center items-center">
              <Image
                src={feature.image}
                alt={feature.title}
                width={124}
                height={124}
                className="block object-cover w-full h-full"
              />
            </div>
            <p className="max-w-[150px] text-gray-800 font-[400] leading-tight text-[14px]">
              {feature.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatYouCanDo;
