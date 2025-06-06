import React from 'react'
import { About } from '../components/About/about'
import AboutBanner from '../components/About/AboutBanner'
import TestimonialSlider from '../components/Home/TestimonialSlider '
import HealthSection from '../components/Home/HealthSection '

function Page() {
  return (
    <div>
      <AboutBanner/>
        <About/>
        <TestimonialSlider/>
        <HealthSection/>
    </div>
  )
}

export default Page