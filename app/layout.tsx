import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InvoicePro NG",
  description: "Manage your business easily with professional tools.",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'InvoicePro NG',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

import ThemeProvider from "./components/ThemeProvider";
import ToastProvider from "./components/ToastProvider";
import SecurityWrapper from "./components/SecurityWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex justify-center bg-gray-100 dark:bg-zinc-950 transition-colors duration-300">
        <ThemeProvider>
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 min-h-screen relative shadow-2xl overflow-hidden flex flex-col font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <SecurityWrapper>
              {children}
            </SecurityWrapper>
            <ToastProvider />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
