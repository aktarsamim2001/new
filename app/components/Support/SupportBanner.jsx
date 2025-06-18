import Image from 'next/image'
import React from 'react'
import image from '../../assets/about/aboutBanner.jpg'
import Link from 'next/link'

function SupportBanner() {
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
            <div className="p-4 text-left max-w-lg">
              <h1 className="text-4xl font-bold __secondary-text">
                Need Assistance? Let’s Sort It Out Together.
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                From choosing the right test to understanding your results, we’re with you every step of the way.
              </p>
            </div>
          </div>
        </div></div>
  )
}
export default SupportBanner