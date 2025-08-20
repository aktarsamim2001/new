"use client"
import ServicesBanner from '@/app/components/OurServices/ServicesBanner'
import ServicesList from '@/app/components/OurServices/ServicesList'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchServiceData } from '../../features/store/serviceSlice'
import { fetchServicesList } from '../../features/store/servicesListSlice'
import BottomBanner from '@/app/components/OurServices/BottomBanner'

function OurServices() {
  const dispatch = useDispatch();
  const serviceData = useSelector((state) => state?.service?.data);
  const servicesListData = useSelector((state) => state?.servicesList?.data);
  console.log("service list:ksjadhkas",servicesListData)
  useEffect(() => {
    dispatch(fetchServiceData({ slug: 'services' }));
    dispatch(fetchServicesList({ page: 1, perPage: 10 }));
  }, [dispatch]);
  return (
    <div>
      <ServicesBanner bannerData={serviceData?.content} />
      <ServicesList serviceData={servicesListData} />
      <BottomBanner bannerData={serviceData?.content}/>
    </div>
  );
}

export default OurServices