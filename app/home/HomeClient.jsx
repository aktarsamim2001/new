"use client";

import BrandLogo from "../components/BrandLogo/BrandLogo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchHomeData } from "../../features/store/homeSlice";
import HealthSection from "../components/Home/HealthSection";
import HowProcessWorks from "../components/Home/HowProcessWorks ";
import RecommendedPackages from "../components/Home/RecommendedPackages";
import SmartHealthBanner from "../components/Home/SmartHealthBanner";
import TestimonialSlider from "../components/Home/TestimonialSlider";
import WhatYouCanDo from "../components/Home/WhatYouCanDo";

function HomeClient({ content }) {
  const homeData = content;
  return (
    <>
      <SmartHealthBanner dataItem={homeData} />
      <RecommendedPackages dataItem={homeData} />
      <WhatYouCanDo dataItem={homeData} />
      <HowProcessWorks dataItem={homeData} />
      <BrandLogo dataItem={homeData} />
      <TestimonialSlider dataItem={homeData} />
      <HealthSection dataItem={homeData} />
    </>
  );
}

export default HomeClient;