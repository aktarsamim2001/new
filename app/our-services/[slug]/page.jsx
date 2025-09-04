"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import Head from "next/head";

// Redux actions
import { fetchPageDataThunk, clearPageData } from "@/features/store/dynamicSlice";
import { fetchServiceDetailsPageData } from "@/features/store/serviceDetailsPageSlice";

// Components
import DetailsBanner from "@/app/components/ServiceDetails/DetailsBanner";
import TestDetails from "@/app/components/ServiceDetails/TestDetails";
import BrandLogo from "@/app/components/BrandLogo/BrandLogo";
import HowProcessWorks from "@/app/components/ServiceDetails/HowProcessWorks";
import HealthSection from "@/app/components/ServiceDetails/HealthSection";

function ServiceDetailsPage() {
  const dispatch = useDispatch();
  const params = useParams();

  const cmsData = useSelector((state) => state.cms.data);
  const serviceDetailsPageData = useSelector(
    (state) => state.serviceDetailsPage.data
  );
  
  const service = serviceDetailsPageData?.service || {};

  useEffect(() => {
    if (params.slug) {
      dispatch(clearPageData());
      dispatch(fetchPageDataThunk({ slug: "service-details" }));

      dispatch(fetchServiceDetailsPageData({ slug: params.slug }));
    }
  }, [dispatch, params.slug]);

  return (
    <div>
      <DetailsBanner bannerDetailsPage={serviceDetailsPageData} />

      <TestDetails
        dataItem={cmsData?.content?.service_details}
        serviceDetails={serviceDetailsPageData}
      />

      <div className="w-11/12 mx-auto">
        <BrandLogo />
      </div>

      <HowProcessWorks dataItem={cmsData?.content?.service_details} />
      <HealthSection dataItem={cmsData?.content?.service_details} />
    </div>
  );
}

export default ServiceDetailsPage;
