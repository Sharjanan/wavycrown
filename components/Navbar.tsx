"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "./LanguageContext";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Update nav visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setShowNavbar(currentScroll < lastScrollY || currentScroll < 80);
      setLastScrollY(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Define nav links only once
  const navLinks = [
    { href: "/calendar", label: "Calendar" },
    { href: "#services", label: "Services" },
    { href: "#booking", label: lang === "en" ? "Book Now" : "Réserver" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full bg-black text-white z-50 shadow-md transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/wavycrownbluebglogo.png"
              alt="WavyCrown Logo"
              width={120}
              height={120}
              className="cursor-pointer"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center space-x-4 text-white font-bold uppercase">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-gold transition-colors duration-300 italic"
              >
                {label}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger className="border border-gold px-3 rounded hover:bg-gold hover:text-gold transition">
                {lang === "en" ? "English" : "Français"}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border-gold text-gold">
                <DropdownMenuItem onClick={() => setLang("en")}>
                  🇬🇧 English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang("fr")}>
                  🇫🇷 Français
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Hamburger for mobile */}
          <button
            className="sm:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black text-white font-bold uppercase italic z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } sm:hidden`}
      >
        <div className="flex flex-col p-6 space-y-4">
          <button
            className="self-end text-2xl"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ×
          </button>

          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-gold"
            >
              {label}
            </Link>
          ))}

         <DropdownMenu>
              <DropdownMenuTrigger className="border border-gold px-3 rounded hover:bg-gold hover:text-gold transition">
                {lang === "en" ? "English" : "Français"}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border-gold text-gold">
                <DropdownMenuItem onClick={() => setLang("en")}>
                  🇬🇧 English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang("fr")}>
                  🇫🇷 Français
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </>
  );
}
