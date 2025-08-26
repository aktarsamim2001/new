import Image from 'next/image'
import React from 'react'

function ServicesBanner({ bannerData }) {
  const data = bannerData?.our_services || bannerData?.content?.our_services;
  return (
    <div className='container mx-auto __gapTop'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-start'>
        {/* Image Section */}
        <div className="flex justify-center items-center">
          <div className="relative w-full h-[200px] md:h-[370px] md:rounded-[30px] overflow-hidden shadow-lg">
            {data?.Image && data.Image !== "" && (
              <Image
                src={data.Image}
                alt="Services Banner"
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
        </div>
        {/* Text Section */}
        <div className="px-4 text-left max-w-lg ">
          <h1 dangerouslySetInnerHTML={{ __html: data?.title }} className="text-[26px] md:text-4xl font-bold leading-[1.1] md:leading-[1.3]">
          </h1>
          <p className="mt-4 banner__description text-gray-600">
            {data?.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ServicesBanner;
