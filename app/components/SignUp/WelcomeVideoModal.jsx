// components/WelcomeVideoModal.tsx
'use client'
import React from 'react'
import Image from 'next/image'
import image1 from '../../assets/about/about-image (2).png'
import { X } from 'lucide-react';

const WelcomeVideoModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-[90%] max-w-md rounded-2xl p-4 relative shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-pink-600 text-xl font-bold"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title and Subtitle */}
        <div className="mb-3">
          <h2 className="text-lg font-semibold text-gray-800">
            How Can Sukaii Help You?
          </h2>
          <p className="text-sm text-gray-600">Your Trusted Health Partner.</p>
        </div>

        {/* Image with play button */}
        <div className="relative w-full h-64 overflow-hidden rounded-xl">
          <Image
            src={image1}
            alt="sign up Video modal"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-white p-3 rounded-full shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeVideoModal
