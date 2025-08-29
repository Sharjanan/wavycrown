"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "./LanguageContext";
import { translations } from "@/components/lang";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const [showNavbar, setShowNavbar] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations.home;
  const navLinks = [
    // { href: "/calendar", label: "Calendar" },
    { href: "#services", label: "Services" },
    { href: "#booking", label: lang === "en" ? "Book Now" : "Réserver" },
  ];
  return (
    <>
      <header
        className={`fixed top-0 left-0 py-10 w-full bg-black text-gold z-50 transition-transform shadow-md border-b border-gold `}
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
                src="/sky_distric_black_bg.png"
                alt="WavyCrown Logo"
                width={250}
                height={250}
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* CTA Button - top right */}
          <div className="z-50">
            
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

          <h2 className="text-3xl font-bold text-white uppercase">book your session</h2>
           <Image
                src="/sky_distric_black_bg.png"
                alt="WavyCrown Logo"
                width={250}
                height={250}
                className="cursor-pointer justify-center mx-auto"
              />     
          <div className="flex flex-row justify-center gap-8">
            {/* Call Us button */}
            <a href="tel:+15149249154">
              <Button variant="gold" size="pill" >
                 Call Us at (514) 924-9154
              </Button>
            </a>

            {/* Book Online button */}
            <a href="#booking">
              <Button variant="gold" size="pill"  onClick={() => setOpen(false)}>
                 Book Online
              </Button>
            </a>
          </div>
        </DialogContent>
      </Dialog>
      {/* Slide-in drawer menu from left */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black font-bold uppercase z-50 transform transition-transform duration-300 ${
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
              src="/sky_distric_white_bg.png"
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
                 English
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setLang("fr");
                  setIsMobileMenuOpen(false);
                }}
              >
                 Français
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
