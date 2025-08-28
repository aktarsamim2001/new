// components/AboutClient.js
"use client";

import React from "react";
import AboutBanner from "../../app/components/About/AboutBanner";
import TestimonialSlider from "../../app/components/Home/TestimonialSlider";
import HealthSection from "../../app/components/About/HealthSection";
import About from "../../app/components/About/About";

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