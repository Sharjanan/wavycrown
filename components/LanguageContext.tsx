"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "fr";

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
}>({
  lang: "en",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Load saved language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("wavycrown-lang") as Lang | null;
    if (savedLang === "en" || savedLang === "fr") {
      setLangState(savedLang);
    }
  }, []);

  // Save new language to localStorage
  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("wavycrown-lang", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
