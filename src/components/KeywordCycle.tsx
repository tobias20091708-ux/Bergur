"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const KEYWORDS = [
  "Færøerne",
  "William Heinesen",
  "Nordisk litteratur",
  "Heinesen-hulen",
  "Kulturikoner",
  "Nordatlantisk",
  "H.C. Andersen",
];

export function KeywordCycle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % KEYWORDS.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-6 items-center justify-center overflow-hidden text-xs uppercase tracking-[0.3em] text-muted/60 sm:text-sm">
      <AnimatePresence mode="wait">
        <motion.span
          key={KEYWORDS[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          {KEYWORDS[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
