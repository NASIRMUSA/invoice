"use client";
import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/viewmodels/appStore";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode, mounted]);

  // Prevent flash by not rendering until mounted if you want, 
  // but better to just return children and let useEffect handle class
  return <>{children}</>;
}
