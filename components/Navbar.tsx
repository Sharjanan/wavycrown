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
import { translations } from "@/components/lang";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations.home;
  // Hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      setShowNavbar(currentScroll < lastScrollY || currentScroll < 80);
      setLastScrollY(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: "/calendar", label: "Calendar" },
    { href: "#services", label: "Services" },
    { href: "#booking", label: lang === "en" ? "Book Now" : "Réserver" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 py-5 w-full bg-black text-white z-50 shadow-md transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between w-full px-4 py-3 relative">
          {/* Hamburger - always visible on left */}
          <button
            className="text-gold focus:outline-none z-50"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg
              className="w-8 h-8"
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

          {/* Centered logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">
              <Image
                src="/wavycrownbluebglogo.png"
                alt="WavyCrown Logo"
                width={120}
                height={120}
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* CTA Button - top right */}
          <div className="z-50">
            <a href="#booking">
              <button className="text-xs sm:text-sm md:text-base text-black bg-gold glow-gold px-6 py-2  font-bold rounded-2xl  uppercase">
                {t.button[lang].split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </button>
            </a>
          </div>
        </div>
      </header>

      {/* Slide-in drawer menu from left */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-neutral-900 text-white font-bold uppercase z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 space-y-4">
          <button
            className="self-end text-3xl text-gold focus:outline-none"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ×
          </button>

          {/* Logo inside drawer (optional, can remove if redundant) */}
          <Link href="/">
            <Image
              src="/wavycrownbluebglogo.png"
              alt="WavyCrown Logo"
              width={120}
              height={120}
              className="cursor-pointer"
            />
          </Link>

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
              <DropdownMenuItem
                onClick={() => {
                  setLang("en");
                  setIsMobileMenuOpen(false);
                }}
              >
                🇬🇧 English
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setLang("fr");
                  setIsMobileMenuOpen(false);
                }}
              >
                🇫🇷 Français
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
