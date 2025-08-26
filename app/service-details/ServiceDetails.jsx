"use client"

import HealthSection from "@/app/components/ServiceDetails/HealthSection";
import HowProcessWorks from "@/app/components/ServiceDetails/HowProcessWorks";
import DetailsBanner from "@/app/components/ServiceDetails/DetailsBanner";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceDetailsPageData } from '../../features/store/serviceDetailsPageSlice';
import BrandLogo from "../components/BrandLogo/BrandLogo";
import TestDetails from "../components/ServiceDetails/TestDetails";
import { useParams } from 'next/navigation';

function ServiceDetails({content}) {
  console.log("ServiceDetails content:", content);
  const dispatch = useDispatch();
  const serviceDetailsPageData = useSelector((state) => state?.serviceDetailsPage?.data);
  
  useEffect(() => {
      dispatch(fetchServiceDetailsPageData({ package_id: "3" }));
  }, [dispatch],);
  return (
    <div>
      <DetailsBanner bannerDetailsPage={serviceDetailsPageData} />
      <TestDetails dataItem={content?.content?.service_details}
      serviceDetails={serviceDetailsPageData} />
      <div className="w-11/12 mx-auto">
        <BrandLogo />
      </div>
      <HowProcessWorks dataItem={content?.content?.service_details} />
      <div className="mt-25 md:mt-0"></div>
      <HealthSection dataItem={content?.content?.service_details} />
    </div>
  );
}

export default ServiceDetails;
