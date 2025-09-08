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
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
    {/* Center: Logo (on mobile shown first) */}
    <div className="flex justify-center order-1 md:order-2">
      <Link href="/">
        <Image
          src="/wavycrown.png"
          alt="WavyCrown Logo"
          width={500}
          height={500}
          className="cursor-pointer max-w-[200px] md:max-w-[300px]"
        />
      </Link>
    </div>
    
    {/* Left: Address + Phone */}
   <div className="flex  gap-6 order-2 md:order-1 border-t-2 border-gold pt-5 md:flex-col md:border-t-0">
  {/* Address */}
  <div className="flex py-4 gap-2 items-center">
    <LocationHome className="text-gold w-10 h-10 md:w-13 md:h-13" />
    <div className="flex flex-col">
      <h2 className="text-xl md:text-2xl font-bold mb-2">{f.location[lang]}</h2>
      <a
  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f.address[lang].replace('\n', ' '))}`}
  target="_blank"
  rel="noopener noreferrer"
  className="text-white whitespace-nowrap hover:text-gold underline"
>
  {f.address[lang].split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ))}
</a>
    </div>
  </div>
  {/* Phone */}
  <div className="flex gap-2 items-center pl-6 md:pl-2">
    <Telephone className="text-gold w-10 h-10 md:w-10 md:h-10 " strokeWidth={2.5}  />
    <div className="flex flex-col">
      <h2 className="text-xl md:text-2xl font-bold whitespace-nowrap flex-shrink-0">{f.phone[lang]}</h2>
      <a
        href="tel:+15149249154"
        className="text-white whitespace-nowrap flex-shrink-0 hover:bg-gold hover:text-black px-2 py-1 rounded"
      >
        (514) 924-9154
      </a>
    </div>
  </div>
</div>

    {/* Right: Social Media */}
    <div className="flex justify-center md:justify-end order-3 border-t-2 border-gold pt-5  md:border-t-0">
      <SocialMedia className="text-white" />
    </div>
  </div>
</footer>

  );
}
