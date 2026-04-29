"use client";
import { useEffect } from 'react';
import { useAppStore } from '@/lib/viewmodels/appStore';
import { useAuthStore } from '@/lib/viewmodels/authStore';
import LockOverlay from './LockOverlay';

export default function SecurityWrapper({ children }: { children: React.ReactNode }) {
  const { securityPin, setLocked } = useAppStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Only lock if a PIN is set AND the user is authenticated
    if (securityPin && isAuthenticated) {
      setLocked(true);
    } else if (!isAuthenticated) {
      // Ensure we unlock when logging out
      setLocked(false);
    }
  }, [securityPin, isAuthenticated, setLocked]);

  return (
    <>
      {children}
      <LockOverlay />
    </>
  );
}
