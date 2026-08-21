"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 30,
  bounce = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  bounce?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const offset = reduceMotion ? 0 : y;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={
        reduceMotion
          ? { duration: 0.01 }
          : bounce
            ? { type: "spring", bounce: 0.45, duration: 0.9, delay }
            : { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
