"use client";

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import UserDashboard from '../page';

const DynamicDashboardPage = () => {
  const router = useRouter();
  const params = useParams();
  const validTabs = ['profile', 'tests', 'reports', 'health'];

  useEffect(() => {
    // Redirect to main dashboard if tab is invalid
    if (!validTabs.includes(params.tab)) {
      router.push('/user-dashboard');
    }
  }, [params.tab, router]);

  return <UserDashboard initialTab={params.tab} />;
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
