"use client"

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutData } from "../../features/store/aboutSlice";
import { About } from "../components/About/about";
import AboutBanner from "../components/About/AboutBanner";
import TestimonialSlider from "../components/Home/TestimonialSlider";
import HealthSection from "../components/About/HealthSection";


function Page() {
  const dispatch = useDispatch();
  const aboutData = useSelector((state) => state.about.data);

  useEffect(() => {
    dispatch(fetchAboutData({ slug: "about" }));
  }, [dispatch]);

  return (
    <div>
      <AboutBanner data={aboutData} />
      <About data={aboutData} />
      <TestimonialSlider />
      <HealthSection dataItem={aboutData} />
    </div>
  );
}

export default Page;
