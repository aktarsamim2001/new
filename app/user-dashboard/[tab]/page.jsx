"use client";

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import UserDashboard from '../page';

const DynamicDashboardPage = () => {
  const router = useRouter();
  const params = useParams();
  const validTabs = ['profile', 'tests', 'reports', 'health'];

  useEffect(() => {
    if (typeof window !== 'undefined' && !validTabs.includes(params.tab)) {
      router.replace('/user-dashboard/profile');
    }
  }, [params.tab]);

  if (!validTabs.includes(params.tab)) {
    return <UserDashboard />;
  }

  return <UserDashboard />;
};

import ProtectedRoute from "@/features/Routes/ProtectedRoute";

const ProtectedDynamicDashboard = () => {
  return (
    <ProtectedRoute>
      <DynamicDashboardPage />
    </ProtectedRoute>
  );
};

export default ProtectedDynamicDashboard;
