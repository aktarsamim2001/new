import Image from 'next/image'
import React from 'react'
import image from '../../assets/about/aboutBanner.jpg'

function AboutBanner() {
  return (
    <div> <div className='container mx-auto __gapTop'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-start'>
    
            {/* Image Section */}
            <div className="flex justify-center items-center">
              <div className="relative w-full h-[200px] md:h-[287px] rounded-[30px] overflow-hidden shadow-lg">
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
              <h1 className="text-4xl font-bold __secondry-text">
                Find the Right Test For You
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor vitae beatae fuga quas quidem quaerat.
              </p>
               <button className="mt-4 bg-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-600 transition-colors">
                Login to Dashboard
              </button>
            </div>
          </div>
        </div></div>
  )
}
export default AboutBanner