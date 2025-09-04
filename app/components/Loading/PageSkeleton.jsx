'use client'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PageSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
         <div>
        <Skeleton height={24} width="100%" className="mt-4 " borderRadius={8} />
      </div>
      {/* Header Skeleton */}
      <div className="w-full bg-white">
        <div className="max-w-[82.5rem] mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="w-[120px]">
              <Skeleton height={40} />
            </div>
            <div className="hidden md:flex items-center gap-8">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} width={80} height={24} />
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Skeleton width={100} height={40} borderRadius={20} />
              <Skeleton width={100} height={40} borderRadius={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[82.5rem] mx-auto px-4 md:px-6 space-y-8">
        {/* Banner / Hero Section */}
        <div className="w-full h-[454px] rounded-xl overflow-hidden">
          <Skeleton height="100%" borderRadius={12} />
        </div>

      {/* Title */}
      <div>
        <Skeleton height={56} width="60%" borderRadius={8} />
        <Skeleton height={24} width="40%" className="mt-4" borderRadius={8} />
      </div>

      {/* Content blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="space-y-6">
            <Skeleton height={32} width="80%" borderRadius={8} />
            <div className="space-y-4">
              <Skeleton height={20} width="100%" borderRadius={8} />
              <Skeleton height={20} width="90%" borderRadius={8} />
              <Skeleton height={20} width="95%" borderRadius={8} />
            </div>
          </div>
        ))}
      </div>

      {/* Image cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-full h-48 rounded-xl overflow-hidden">
            <Skeleton height="100%" borderRadius={12} />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-6 mt-8">
        <Skeleton height={56} width={180} borderRadius={8} />
        <Skeleton height={56} width={180} borderRadius={8} />
      </div>
      </div>
    </div>
  )
}

export default PageSkeleton
