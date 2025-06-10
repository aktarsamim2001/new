import HealthSection from '@/app/components/Home/HealthSection '
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
        <HealthSection/>
    </div>
  )
}

export default page