// components/AboutClient.js
"use client";

import React from "react";
import AboutBanner from "../components/About/AboutBanner";
import TestimonialSlider from "../components/Home/TestimonialSlider";
import HealthSection from "../components/About/HealthSection";
import About from "../components/About/About";

function AboutClient({ content }) {
  console.log("AboutClient received data:", content);

  // Add safety checks for nested data
  const aboutData = content || {};
  
  return (
    <div>
      <AboutBanner data={aboutData} />
      <About data={aboutData} />
      <TestimonialSlider />
      <HealthSection dataItem={aboutData} />
    </div>
  );
}

export default AboutClient;