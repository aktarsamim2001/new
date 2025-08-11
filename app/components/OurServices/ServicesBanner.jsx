import Image from 'next/image'
import React from 'react'
import image from '../../assets/service/service-banner.jpg'

function ServicesBanner() {
  return (
    <div className='container mx-auto __gapTop'>
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
        <div className="px-4 text-left max-w-lg ">
          <h1 className="text-[26px] md:text-4xl font-bold leading-[1.1] md:leading-[1.3]">
            Find the Right 
            <span className='md:block'> Test For You</span>
          </h1>
          <p className="mt-4 banner__description text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor vitae beatae fuga quas quidem quaerat.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ServicesBanner;
