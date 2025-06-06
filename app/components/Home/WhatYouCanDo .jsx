import React from 'react';
import image from '../../assets/service/icon.png';
import image1 from '../../assets/service/icon1.png';
import image2 from '../../assets/service/icon2.png';
import image3 from '../../assets/service/icon3.png';
import Image from 'next/image';

const WhatYouCanDo = () => {
  const features = [
    {
      id: 1,
      title: 'Connect With Trusted Partners',
      icon: '/assets/service/icon.png',
    },
    {
      id: 2,
      title: 'Track Your Health, Holistically',
      icon: '/assets/service/icon1.png',
    },
    {
      id: 3,
      title: 'Manage Medicines With Ease',
      icon: '/assets/service/icon2.png',
    },
    {
      id: 4,
      title: 'Book and Manage Lab Tests Online',
      icon: '/assets/service/icon3.png',
    }
  ];

  return (
    <div className="container mx-auto __gapTop bg-white ">
      <h2 className="text-4xl font-bold text-center mb-12 __secondary-text __heading">
        What You Can Do
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex items-center justify-center gap-3 p-7 bg-[#FFFFFF] shadow-2xl rounded-[22px]"
          >
            <div className="mb-4 ">
              <Image src={feature.icon} alt={feature.title} width={64} height={64} />
            </div>
            <h3 className="max-w-[150px] font-semibold text-gray-800 leading-tight">
              {feature.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatYouCanDo;