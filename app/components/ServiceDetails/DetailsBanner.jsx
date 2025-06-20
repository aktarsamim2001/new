"use client"

import Image from 'next/image'
import React from 'react'
import image from '../../assets/service/service-banner.jpg'
import Link from 'next/link'

function DetailsBanner() {
  return (
    <div> <div className='container mx-auto __gapTop'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-start'>
    
            {/* Image Section */}
            <div className="flex justify-center items-center">
              <div className="relative w-full h-[200px] md:h-[287px] md:rounded-[30px] overflow-hidden shadow-lg">
                <Image
                  src={image}
                  alt="Services Banner"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
    
            {/* Text Section */}
            <div className="px-4 md:px-0 text-left max-w-lg">
              <h1 className="text-4xl font-bold __secondry-text">
                Complete Blood Count Test (CBC)
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                The Complete Blood Count (CBC) test is a common and essential blood test that gives insights into your overall health by measuring key components like red blood cells, white blood cells, and platelets. It's often the first step in detecting infections, anemia, immune system issues, and more.
              </p>
              <Link href="/book-test">
                <button className="mt-4 __secondary-bg text-white px-10 py-4 rounded-lg font-semibold">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div></div>
  )
}
export default DetailsBanner