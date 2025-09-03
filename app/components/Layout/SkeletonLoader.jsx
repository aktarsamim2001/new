"use client";

export default function SkeletonLoader() {
  return (
    <div className="w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
            {/* Nav Items */}
            <div className="hidden md:flex space-x-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-4 w-20 bg-gray-200 rounded"></div>
              ))}
            </div>
            {/* Auth Buttons */}
            <div className="flex space-x-4">
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="h-12 w-3/4 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-gray-100 p-6 rounded-lg">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="bg-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((column) => (
              <div key={column} className="space-y-4">
                <div className="h-6 w-24 bg-gray-200 rounded"></div>
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-4 w-32 bg-gray-200 rounded"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
