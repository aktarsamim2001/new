import HealthSection from '@/app/components/Home/HealthSection '
import HowProcessWorks from '@/app/components/Home/HowProcessWorks '
import DetailsBanner from '@/app/components/ServiceDetails/DetailsBanner'
import React from 'react'

function page(params) {
  const {slug}=params
  return (
    <div>
      <DetailsBanner/>
        <HowProcessWorks/>
        <HealthSection/>
    </div>
  )
}

export default page