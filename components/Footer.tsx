import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
    <footer className="w-full bg-gold text-gold text-center py-6 mt-12">
      <div className="container mx-auto">
        {/* Centered logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 mb-12">
            <Link href="/">
              <Image
                src="/5ky.png"
                alt="WavyCrown Logo"
                width={250}
                height={250}
                className="cursor-pointer"
              />
            </Link>
          </div>
      </div>
    </footer>
    </>
  );
}