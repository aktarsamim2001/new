"use client"
import React from 'react'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHowItWorkData } from '@/features/store/howItWorkSlice';
import Banner from '../components/how-it-work/Banner';
import { HowItWorks } from '../components/how-it-work/HowItWorks';
import TestimonialSlider from '../components/Home/TestimonialSlider';
import HealthSection from '../components/how-it-work/HealthSection';
import BrandLogo from '../components/BrandLogo/BrandLogo';


function HowItWorkPage({content}) {

  // Pass only the how_it_works object to children that expect it
  const howItWorksData = content || {};
  console.log("HowItWorkPage data:", howItWorksData);
  return (
    <div>
      <Banner data={howItWorksData} />
      <HowItWorks data={howItWorksData} />
      <BrandLogo />
      <TestimonialSlider />
      <HealthSection dataItem={howItWorksData} />
    </div>
  );
}

export default HowItWorkPage