import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-gold text-center py-6 mt-12">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} WavyCrown. All rights reserved.
        </p>
      </div>
    </footer>
  );
}