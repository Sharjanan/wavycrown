"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageContext";
import { translations } from "@/components/lang";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { SocialMedia } from "./ui/SocialMedia";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations.home;
  const [isFading, setIsFading] = useState(false);

const handleLanguageChange = () => {
  setIsFading(true);
  setTimeout(() => {
    setLang(lang === "en" ? "fr" : "en");
    setIsFading(false);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 100); // Small delay to let content fade in before closing menu
  }, 300); // 200ms fade duration
};
  const navLinks = [
    // { href: "/calendar", label: "Calendar" },

    { href: "#booking", label: lang === "en" ? "Book Now" : "Réserver" },
  ];
  return (
    <>
      <header
        className={`fixed top-0 left-0 py-10 w-full h-40 bg-black text-gold z-50 transition-transform  border-b border-gold `}
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
          <div className="absolute left-1/2 transform -translate-x-1/2 mb-10">
            <Link href="/">
              <Image
                src="/sky_avenue_black_bg.png"
                alt="WavyCrown Logo"
                width={250}
                height={250}
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* CTA Button - top right */}
          <div className={`z-50 gap-1 hidden md:flex md:items-center ${isMobileMenuOpen ? "invisible" : "visible"}`}>

            <SocialMedia className="text-white" />
            <Button variant="gold" size="pill" onClick={() => setOpen(true)}>
              {t.button[lang].split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </Button>
          </div>
        </div>
      </header>
      {/* Popup dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[90vw] max-w-sm p-6 text-center space-y-6">
          <VisuallyHidden>
            <DialogTitle>Contact Options</DialogTitle>
          </VisuallyHidden>

          <h2 className="text-3xl font-bold text-white uppercase">
            book your session
          </h2>
          <Image
            src="/sky_avenue_black_bg.png"
            alt="WavyCrown Logo"
            width={250}
            height={250}
            className="cursor-pointer justify-center mx-auto"
          />
          <div className="flex flex-row justify-center gap-8">
            {/* Call Us button */}
            <a href="tel:+15149249154">
              <Button variant="gold" size="pill">
                Call Us at (514) 924-9154
              </Button>
            </a>

            {/* Book Online button */}
            <a href="#booking">
              <Button variant="gold" size="pill" onClick={() => setOpen(false)}>
                Book Online
              </Button>
            </a>
          </div>
        </DialogContent>
      </Dialog>
      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60  z-50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      {/* Slide-in drawer menu from left */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black font-bold  z-50 transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        onClick={e => e.stopPropagation()}
      >

        <div   className={`flex flex-col p-6 space-y-4 transition-opacity duration-200 ${isFading ? "opacity-0" : "opacity-100"}`}>
          <button
            className="self-end text-3xl text-gold focus:outline-none"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ×
          </button>

          {/* Logo inside drawer (optional, can remove if redundant) */}
          <Link href="/">
            <Image
              src="/sky_avenue_white_bg.png"
              alt="WavyCrown Logo"
              width={250}
              height={250}
              className="cursor-pointer"
            />
          </Link>

          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-gold text-5xl font-lostinsouth"
            >
              {label}
            </Link>
          ))}


          <div className="flex items-center gap-2 mt-8">
            <SocialMedia className="text-black" />
          </div>
          <div className="mt-auto flex justify-center">
            <button
              onClick={handleLanguageChange}
              className="text-3xl rounded hover:text-gold transition font-lostinsouth"
            >
              {lang === "en" ? "Français" : "English"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
