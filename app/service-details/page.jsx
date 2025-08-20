"use client"

import HealthSection from "@/app/components/ServiceDetails/HealthSection";
import HowProcessWorks from "@/app/components/ServiceDetails/HowProcessWorks";
import DetailsBanner from "@/app/components/ServiceDetails/DetailsBanner";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceDetailsData } from '../../features/store/serviceDetailsSlice';
import { fetchServiceDetailsPageData } from '../../features/store/serviceDetailsPageSlice';
import BrandLogo from "../components/BrandLogo/BrandLogo";
import TestDetails from "../components/ServiceDetails/TestDetails";
import { useParams } from 'next/navigation';

function Page() {
  const dispatch = useDispatch();
  const serviceDetailsData = useSelector((state) => state?.serviceDetails?.data);
  const serviceDetailsPageData = useSelector((state) => state?.serviceDetailsPage?.data);
  
  useEffect(() => {
    dispatch(fetchServiceDetailsData({ slug: 'service-details' }));
      dispatch(fetchServiceDetailsPageData({ package_id: "3" }));
  }, [dispatch],);
  return (
    <div>
      <DetailsBanner bannerDetailsPage={serviceDetailsPageData} />
      <TestDetails dataItem={serviceDetailsData?.content?.service_details}
      serviceDetails={serviceDetailsPageData} />
      <div className="w-11/12 mx-auto">
        <BrandLogo />
      </div>
      <HowProcessWorks dataItem={serviceDetailsData?.content?.service_details} />
      <div className="mt-25 md:mt-0"></div>
      <HealthSection dataItem={serviceDetailsData?.content?.service_details} />
      {/* Example usage of new API data: */}
      {/* <TestDetails dataItem={serviceDetailsPageData} /> */}
    </div>
  );
}

export default Page;
