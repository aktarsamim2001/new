"use client";

import BrandLogo from "../components/BrandLogo/BrandLogo";
import HealthSection from "../components/Home/HealthSection";
import HowProcessWorks from "../components/Home/HowProcessWorks ";
import RecommendedPackages from "../components/Home/RecommendedPackages";
import SmartHealthBanner from "../components/Home/SmartHealthBanner";
import TestimonialSlider from "../components/Home/TestimonialSlider";
import WhatYouCanDo from "../components/Home/WhatYouCanDo";

function Home() {
  return (
    <>
      <SmartHealthBanner />
      <RecommendedPackages />
      <WhatYouCanDo />
      <HowProcessWorks />
      <BrandLogo />
      <TestimonialSlider />
      <HealthSection />
    </>
  );
}

export default Home;
