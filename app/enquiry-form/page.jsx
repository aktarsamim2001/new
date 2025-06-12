import React from 'react'
import SupportBanner from '../components/Support/SupportBanner'
import EnquiryForm from '../components/Support/EnquiryForm'
import BrandLogo from '../components/BrandLogo/BrandLogo'

function page() {
  return (
    <div>
        <SupportBanner/>
        <EnquiryForm/>
        <BrandLogo/>
    </div>
  )
}

export default page