"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoadingScreen from "./LoadingScreen";
import { LanguageProvider } from "./LanguageContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 4800);
    return () => clearTimeout(timeout);
  }, []);

  return loading ? (
    <LoadingScreen />
  ) : (
    <LanguageProvider>
      <Navbar   />
      {children}
      <Footer />
    </LanguageProvider>
  );
}
