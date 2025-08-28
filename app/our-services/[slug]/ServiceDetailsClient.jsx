"use client"

import HealthSection from "@/app/components/ServiceDetails/HealthSection";
import HowProcessWorks from "@/app/components/ServiceDetails/HowProcessWorks";
import DetailsBanner from "@/app/components/ServiceDetails/DetailsBanner";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceDetailsPageData } from '../../../features/store/serviceDetailsPageSlice';
import BrandLogo from "../../components/BrandLogo/BrandLogo";
import TestDetails from "../../components/ServiceDetails/TestDetails";
import { useParams } from 'next/navigation';

function ServiceDetailsClient({ initialData }) {
  const dispatch = useDispatch();
  const params = useParams();
  const serviceDetailsPageData = useSelector((state) => state?.serviceDetailsPage?.data) || initialData;
  
  useEffect(() => {
    if (params.slug && !initialData) {
      dispatch(fetchServiceDetailsPageData({ package_id: params.slug }));
    }
  }, [dispatch, params.slug, initialData]);

  return (
    <div>
      <DetailsBanner bannerDetailsPage={serviceDetailsPageData} />
      <TestDetails 
        dataItem={serviceDetailsPageData}
        serviceDetails={serviceDetailsPageData} 
      />
      <div className="w-11/12 mx-auto">
        <BrandLogo />
      </div>
      <HowProcessWorks dataItem={serviceDetailsPageData} />
      <div className="mt-25 md:mt-0"></div>
      <HealthSection dataItem={serviceDetailsPageData} />
    </div>
  );
}

export default ServiceDetailsClient;
