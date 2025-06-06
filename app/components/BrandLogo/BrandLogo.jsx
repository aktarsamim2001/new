"use client";
import React from 'react';
import Image from 'next/image';
import image from '../../assets/brand-logo/logo1.png';
import image1 from '../../assets/brand-logo/logo2.png';
import image2 from '../../assets/brand-logo/logo3.png';
import image3 from '../../assets/brand-logo/logo4.png';

const logo = [
  { id: 1, icon: image },
  { id: 2, icon: image1 },
  { id: 3, icon: image2 },
  { id: 4, icon: image3 },
];

function BrandLogo() {
  return (
    <div className="container mx-auto py-6">
      <ul className="flex flex-row items-center justify-center gap-6">
        {logo.map((logos) => (
          <li key={logos.id}>
            <Image src={logos.icon} width={50} height={50} alt="brand-logo" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BrandLogo;
