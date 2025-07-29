import React from "react";
import Image from "next/image";
import "./home.css";
import img1 from "../../assets/home/what-you-can/doctor.png";
import img2 from "../../assets/home/what-you-can/band-aid.png";
import img3 from "../../assets/home/what-you-can/medicine.png";
import img4 from "../../assets/home/what-you-can/ecg-monitor.png";

const WhatYouCanDo = () => {
  const features = [
    {
      id: 1,
      title: "Connect With Trusted Partners",
      icon: img1,
    },
    {
      id: 2,
      title: "Track Your Health, Holistically",
      icon: img2,
    },
    {
      id: 3,
      title: "Manage Medicines With Ease",
      icon: img3,
    },
    {
      id: 4,
      title: "Book and Manage Lab Tests Online",
      icon: img4,
    },
  ];

  return (
    <div className="container mx-auto mt-15 lg:mt-10 min-[319px]:max-w-[280px] min-[374px]:max-w-[290px] sm:max-w-[100%] lg:px-0">
      <h2 className="__secondary-text text-2xl md:text-5xl leading-tight lg:leading-[150%] -tracking-[1%] lg:-tracking-[2%] font-[600] text-center mb-5 md:mb-12">
        What You Can Do
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:px-20">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex items-center justify-center gap-3 gap-x-5 p-4 bg-[#FFFFFF] WhatYouCanDo rounded-[22px]"
          >
            <div className="w-[100px] h-[105px] flex justify-center items-center">
              <Image
                src={feature.icon}
                alt={feature.title}
                // width={64}
                // height={64}
                className="block object-cover w-full h-full"
              />
            </div>
            <p className="max-w-[150px] text-gray-800 leading-tight text-[14px]">
              {feature.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatYouCanDo;
