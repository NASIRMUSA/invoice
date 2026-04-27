"use client";
import { useEffect } from 'react';
import { useAppStore } from '@/lib/viewmodels/appStore';
import LockOverlay from './LockOverlay';

export default function SecurityWrapper({ children }: { children: React.ReactNode }) {
  const { securityPin, setLocked } = useAppStore();

  useEffect(() => {
    // If a PIN is set, lock the app on fresh load
    if (securityPin) {
      setLocked(true);
    }
  }, [securityPin, setLocked]);

  return (
    <>
      {children}
      <LockOverlay />
    </>
  );
}
