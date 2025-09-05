"use client";

import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { token, profileData } = useSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!token) {
      router.replace(`/sign-in?callbackUrl=${encodeURIComponent(pathname)}`);
    } else if (token && profileData && !profileData.is_completed) {
      if (pathname !== "/complete-profile") {
        router.replace(`/complete-profile?callbackUrl=${encodeURIComponent(pathname)}`);
      }
    }
  }, [token, profileData, pathname, router]);

  if (!token) return null;

  if (token && profileData && !profileData.is_completed && pathname !== "/complete-profile") {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
