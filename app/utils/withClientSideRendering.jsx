"use client";

import { useEffect, useState } from 'react';

export function withClientSideRendering(WrappedComponent) {
  return function WithClientSideRendering(props) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    if (!isClient) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
}
