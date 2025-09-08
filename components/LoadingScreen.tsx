"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const letters = "LOADING".split("");

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
          className="fixed inset-0 z-[9999] min-h-screen bg-black flex flex-col items-center justify-center text-white"
        >
          <Image
            src="/wavycrown.png"
            alt="WavyCrown Logo"
            width={500}
            height={500}
            className="-mb-30"
          />
           <Image
            src="/sky_avenue_black_bg.png"
            alt="WavyCrown Logo"
            width={250}
            height={250}
            
          />
          <h1 className="text-6xl font-semibold tracking-wide font-lostinsouth ">
            {letters.slice(0, visibleLetters).join("")}
            <span className="animate-pulse">...</span>
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
