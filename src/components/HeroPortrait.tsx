"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroPortrait({ alt }: { alt: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0, ease: "easeOut" }}
      className="relative h-48 w-48 overflow-hidden rounded-full ring-1 ring-white/20 sm:h-56 sm:w-56"
    >
      <Image
        src="/bergur-headshot.png"
        alt={alt}
        fill
        priority
        sizes="224px"
        className="object-cover"
      />
    </motion.div>
  );
}
