import HealthSection from '@/app/components/Home/HealthSection'
import HowProcessWorks from '@/app/components/Home/HowProcessWorks '
import DetailsBanner from '@/app/components/ServiceDetails/DetailsBanner'
import React from 'react'
import BrandLogo from '../components/BrandLogo/BrandLogo'
import TestDetails from '../components/ServiceDetails/TestDetails'

function page(params) {
  const {slug}=params
  return (
    <div>
      <DetailsBanner/>
      <TestDetails/>
        <BrandLogo/>
        <HowProcessWorks/>
        <div className="mt-25 md:mt-0"></div>
        <HealthSection/>
    </div>
  )
}

export default page