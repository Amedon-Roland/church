"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FadeInProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  fullWidth?: boolean;
  once?: boolean;
  className?: string;
  margin?: string;
  offset?: number;
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.3, // Reduced from 0.5 to 0.3
  fullWidth = false,
  once = true,
  className = "",
  margin = "-100px",
  offset = 0,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin });

  const directions = {
    up: { y: offset || 40, x: 0 }, // Reduced from 60 to 40
    down: { y: offset || -40, x: 0 },
    left: { x: offset || 40, y: 0 },
    right: { x: offset || -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {}
      }
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Smooth easing
      }}
      className={fullWidth ? `w-full ${className}` : className}
    >
      {children}
    </motion.div>
  );
}
