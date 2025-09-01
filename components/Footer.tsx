import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LocationHome, Telephone } from "@mynaui/icons-react";
import SocialMedia from "./ui/SocialMedia";
import { translations } from "@/components/lang"
import { useLanguage } from "@/components/LanguageContext";;
export default function Footer() {
    const { lang } = useLanguage();
    const f = translations.footer;
  return (
    <footer className="w-full bg-black text-gold border-t border-gold py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-3 items-center px-4">
        {/* Left: Address + Phone */}
        <div className="flex flex-col items-start space-y-3">
          <div className="flex items-center gap-2">
            <LocationHome className="text-gold" />
            <p className="text-white">{f.address[lang]}</p>
          </div>
          <div className="flex items-center gap-2">
            <Telephone className="text-gold" />
            <a href="tel:+15149249154" className="text-white hover:bg-gold hover:text-black px-2 py-1 rounded">
              (514) 924-9154
            </a>
          </div>
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src="/wavycrown.png"
              alt="WavyCrown Logo"
              width={500}
              height={500}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Right: Social Media */}
        <div className="flex justify-end gap-1">
          <SocialMedia className="text-white" />
        </div>
      </div>
    </footer>
  );
}
