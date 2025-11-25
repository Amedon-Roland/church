"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary z-[9999] origin-left pointer-events-none"
      style={{
        scaleX: scrollYProgress,
        boxShadow: "0 0 20px rgba(55, 83, 157, 0.8), 0 0 40px rgba(191, 139, 37, 0.6)",
      }}
    />
  );
}
