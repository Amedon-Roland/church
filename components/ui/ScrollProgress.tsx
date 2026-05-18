"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.3,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] origin-left pointer-events-none"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary" />
      <div
        className="absolute inset-0 blur-md opacity-70"
        style={{
          background:
            "linear-gradient(90deg, rgb(var(--primary-rgb)), rgb(var(--secondary-rgb)), rgb(var(--primary-rgb)))",
        }}
      />
    </motion.div>
  );
}
