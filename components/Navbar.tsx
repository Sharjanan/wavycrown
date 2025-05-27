"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useLanguage } from "./LanguageContext";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY && currentScroll > 80) {
        setShowNavbar(false); // scrolling down
      } else {
        setShowNavbar(true); // scrolling up
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-black text-white z-50 shadow-md transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/">
          <Image
            src="/wavycrownbluebglogo.png"
            alt="WavyCrown Logo"
            width={120}
            height={120}
            className="cursor-pointer"
          />
        </Link>

        <nav className="flex items-center space-x-4 text-gold font-bold uppercase">
          <Link href="/calendar" className="hover:underline">Calendar</Link>
          <Link href="#services" className="hover:underline">Services</Link>
          <Link href="#booking" className="hover:underline">{
            lang === "en" ? "Book Now" : "Réserver"
          }</Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="border border-gold px-3 rounded hover:bg-gold hover:text-black transition">
              {lang === "en" ? "English" : "Français"}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black border-gold text-gold">
              <DropdownMenuItem onClick={() => setLang("en")}>🇬🇧 English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("fr")}>🇫🇷 Français</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
