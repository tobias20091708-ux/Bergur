"use client";

import { motion } from "framer-motion";

export function HeroPortrait({ alt }: { alt: string }) {
  return (
    <motion.img
      src="/bergur-headshot.png"
      alt={alt}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
      className="h-48 w-48 rounded-full object-cover ring-1 ring-white/20 sm:h-56 sm:w-56"
    />
  );
}
