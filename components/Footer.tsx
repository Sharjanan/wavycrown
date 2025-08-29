import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LocationHome } from "@mynaui/icons-react";

export default function Footer() {
  return (
    <>
    <footer className="w-full bg-black text-gold text-center">
      <div className="absolute bg-black left-1/2 transform -translate-x-1/2">
        {/* Centered logo */}
          
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
      <LocationHome className= "text-gold"/>
    </footer>
    </>
  );
}