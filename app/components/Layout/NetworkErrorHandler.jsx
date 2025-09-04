"use client";

import React, { useEffect, useState } from 'react';
import SkeletonLoader from './SkeletonLoader';

export default function NetworkErrorHandler({ children }) {
  const [isOffline, setIsOffline] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we're online
    const handleOnline = () => {
      setIsOffline(false);
      setIsLoading(false);
    };

    // Check if we're offline
    const handleOffline = () => {
      setIsOffline(true);
      setIsLoading(false);
    };

    // Initial check
    if (typeof window !== 'undefined') {
      setIsOffline(!window.navigator.onLine);
      setIsLoading(false);
    }

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Show skeleton while checking connection
  if (isLoading) {
    return <SkeletonLoader />;
  }

  // Show skeleton when offline
  if (isOffline) {
    return (
      <div>
        <SkeletonLoader />
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="text-sm">
            You are currently offline. Please check your internet connection.
          </p>
        </div>
      </div>
    );
  }

  // Show content when online
  return children;
}
