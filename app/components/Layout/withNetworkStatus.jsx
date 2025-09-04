"use client";

import React, { useEffect, useState } from 'react';
import SkeletonLoader from './SkeletonLoader';

const withNetworkStatus = (WrappedComponent) => {
  return function WithNetworkStatusComponent(props) {
    const [isOffline, setIsOffline] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkConnection = () => {
        if (typeof window !== 'undefined') {
          setIsOffline(!window.navigator.onLine);
          setIsLoading(false);
        }
      };

      const handleOnline = () => {
        setIsOffline(false);
        setIsLoading(false);
      };

      const handleOffline = () => {
        setIsOffline(true);
        setIsLoading(false);
      };

      // Initial check
      checkConnection();

      // Add event listeners
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      // Cleanup
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }, []);

    if (isLoading) {
      return <SkeletonLoader />;
    }

    if (isOffline) {
      return (
        <>
          <SkeletonLoader />
          <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg">
            <p className="text-sm flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              You are currently offline. Please check your internet connection.
            </p>
          </div>
        </>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withNetworkStatus;
