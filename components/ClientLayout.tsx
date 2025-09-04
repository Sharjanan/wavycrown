"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";   // 👈 import this
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoadingScreen from "./LoadingScreen";
import { LanguageProvider } from "./LanguageContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname(); // 👈 get current path

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 4800);
    return () => clearTimeout(timeout);
  }, []);

  const hideFooter = pathname?.startsWith("/housecall"); // 👈 hide on /housecall

  return loading ? (
    <LoadingScreen />
  ) : (
    <LanguageProvider>
      <Navbar />
      <main className="pt-16">{children}</main>
      {!hideFooter && <Footer />} {/* 👈 only render if not /housecall */}
    </LanguageProvider>
  );
}
