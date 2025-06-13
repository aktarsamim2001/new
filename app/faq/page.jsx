"use client"
import React from 'react'
import FAQTabs from '../components/Faq/FaqTab'
import HealthSection from '../components/Home/HealthSection '
import FaqBanner from '../components/Faq/FaqBanner'

function page() {
  return (
    <div>
        <FaqBanner/>
        <FAQTabs/>
        <HealthSection/>
    </div>
  )
}

export default page