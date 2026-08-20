"use client";

import { motion } from "framer-motion";

export function HeroPortrait({ alt }: { alt: string }) {
  return (
    <motion.img
      src="/bergur-portrait-sea.jpg"
      alt={alt}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
      className="h-56 w-44 object-cover sm:h-64 sm:w-52"
      style={{
        objectPosition: "55% 22%",
        maskImage:
          "radial-gradient(ellipse 90% 92% at 50% 45%, black 78%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 90% 92% at 50% 45%, black 78%, transparent 100%)",
      }}
    />
  );
}
