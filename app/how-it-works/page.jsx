"use client"
import React from 'react'
import Banner from '../components/how-it-work/Banner'
import { HowItWorks } from '../components/how-it-work/HowItWorks'
import TestimonialSlider from '../components/Home/TestimonialSlider '
import HealthSection from '../components/Home/HealthSection '

function page() {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <TestimonialSlider />
      <HealthSection />
    </div>
  )
}

export default page