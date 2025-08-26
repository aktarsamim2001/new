"use client"
import ServicesBanner from '@/app/components/OurServices/ServicesBanner'
import ServicesList from '@/app/components/OurServices/ServicesList'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchServicesList } from '../../features/store/servicesListSlice'
import BottomBanner from '@/app/components/OurServices/BottomBanner'

function OurServices({ content }) {
  const dispatch = useDispatch();
  const servicesListData = useSelector((state) => state?.servicesList?.data);
  console.log("service list:ksjadhkas",content?.our_services)
  useEffect(() => {
    dispatch(fetchServicesList({ page: 1, perPage: 10 }));
  }, [dispatch]);
  return (
    <div>
      <ServicesBanner bannerData={content} />
      <ServicesList serviceData={servicesListData} />
      <BottomBanner bannerData={content} />
    </div>
  );
}

export default OurServices