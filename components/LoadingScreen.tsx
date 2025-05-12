"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const letters = "WAVYCROWN".split("");

export default function LoadingScreen() {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const letterInterval = setInterval(() => {
      setVisibleLetters((prev) => {
        if (prev < letters.length) return prev + 1;
        return prev;
      });
    }, 150);

    return () => clearInterval(letterInterval);
  }, []);

  useEffect(() => {
    // Match full duration of fade cycle + 1s for final frame
    const timer = setTimeout(() => setShowLogo(false), 4800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showLogo && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0, 1, 0, 1, 0],
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 4.8,
            times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9],
          }}
          className="min-h-screen bg-black flex flex-col items-center justify-center text-white"
        >
          <Image
            src="/wavycrownbluebglogo.png"
            alt="WavyCrown Logo"
            width={250}
            height={250}
            className="mb-6"
          />
          <h1 className="text-4xl font-semibold tracking-wide text-gold">
            {letters.slice(0, visibleLetters).join("")}
            <span className="animate-pulse">...</span>
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
