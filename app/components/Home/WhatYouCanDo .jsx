import React from "react";
import Image from "next/image";
import "./home.css";

const WhatYouCanDo = () => {
  const features = [
    {
      id: 1,
      title: "Connect With Trusted Partners",
      icon: "/assets/service/icon4.png",
    },
    {
      id: 2,
      title: "Track Your Health, Holistically",
      icon: "/assets/service/icon3.png",
    },
    {
      id: 3,
      title: "Manage Medicines With Ease",
      icon: "/assets/service/icon2.png",
    },
    {
      id: 4,
      title: "Book and Manage Lab Tests Online",
      icon: "/assets/service/icon1.png",
    },
  ];

  return (
    <div className="container mx-auto __gapTop px-4 lg:px-4">
      <h2 className=" text-2xl md:text-4xl font-bold text-center mb-8 md:mb-18 md:mt-5 __secondary-text __heading">
        What You Can Do
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:mb-5 md:px-20">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex items-center justify-center gap-3 p-7 bg-[#FFFFFF] WhatYouCanDo rounded-[22px]"
          >
            <div className="">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={64}
                height={64}
              />
            </div>
            <p className="max-w-[150px] font-semibold text-gray-800 leading-tight">
              {feature.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatYouCanDo;
