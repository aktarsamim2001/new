import HealthSection from "@/app/components/Home/HealthSection";
import HowProcessWorks from "@/app/components/Home/HowProcessWorks ";
import DetailsBanner from "@/app/components/ServiceDetails/DetailsBanner";
import React from "react";
import BrandLogo from "../components/BrandLogo/BrandLogo";
import TestDetails from "../components/ServiceDetails/TestDetails";

function page(params) {
  const { slug } = params;
  return (
    <div>
      <DetailsBanner />
      <TestDetails />
      <div className="w-11/12 mx-auto">
        <BrandLogo />
      </div>
      <HowProcessWorks />
      <div className="mt-25 md:mt-0"></div>
        <HealthSection />
    </div>
  );
}

export default page;
