"use client";
import { useEffect } from 'react';
import { useAppStore } from '@/lib/viewmodels/appStore';
import { useAuthStore } from '@/lib/viewmodels/authStore';

export default function DataInitializer({ children }: { children: React.ReactNode }) {
  const { fetchInitialData, isLoading } = useAppStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchInitialData();
    } else {
      // If not authenticated, ensure we stop the loading state
      useAppStore.setState({ isLoading: false });
    }
  }, [isAuthenticated, fetchInitialData]);

  return <>{children}</>;
}
