import ServicesBanner from '@/app/components/OurServices/ServicesBanner'
import ServicesList from '@/app/components/OurServices/ServicesList'
import React from 'react'
import HealthSection from '../components/Home/HealthSection '

function OurServices() {
  return (
    <div>
      <ServicesBanner />
      <ServicesList />
      <HealthSection/>
    </div>
  )
}

export default OurServices