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
import LoadingScreen from "@/components/LoadingScreen"; // adjust path if needed

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations.home;
  const [loading, setLoading] = useState(false);

const handleLanguageChange = () => {
  setLoading(true); // 1. Show loading
  setLang(lang === "en" ? "fr" : "en"); // 2. Change language immediately
    setIsMobileMenuOpen(false); // 3. Close menu after 1s
  setTimeout(() => {
    setLoading(false);          // 4. Hide loading
  }, 1000);
};
  const navLinks = [
    { href: "/housecall", label: "House Call" },
    { href: "#booking", label: lang === "en" ? "Book Now" : "Réserver" },
  ];
  return (
    <>
     {loading && <LoadingScreen  />}
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
          <div className="fixed left-1/2 transform -translate-x-1/2 md:mb-10 md:mt-5">
            <Link href="/">
              <Image
                src="/sky_avenue_black_bg.png"
                alt="WavyCrown Logo"
                width={256}
                height={256}
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
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black font-bold  z-70 transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        onClick={e => e.stopPropagation()}
      >

        <div   className={"flex flex-col p-6 space-y-4 transition-opacity duration-200"}>
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
    width={300}
    height={300}
    className="cursor-pointer w-full h-auto max-w-xs mx-auto"
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
