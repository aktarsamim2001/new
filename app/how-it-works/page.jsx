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


function Page() {
  const dispatch = useDispatch();
  const howItWorkData = useSelector(
    (state) => state.howItWork?.data?.content?.how_it_works || {}
  );

  console.log(howItWorkData);
  useEffect(() => {
    dispatch(fetchHowItWorkData({ slug: 'how-its-work' }));
  }, [dispatch]);

  return (
    <div>
      <Banner data={howItWorkData} />
      <HowItWorks data={howItWorkData} />
      <BrandLogo />
      <TestimonialSlider />
      <HealthSection dataItem={howItWorkData} />
    </div>
  );
}

export default Page