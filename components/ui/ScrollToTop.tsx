"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.pageYOffset > 400);
    window.addEventListener("scroll", toggle, { passive: true });
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Retour en haut"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full btn-gold flex items-center justify-center group"
        >
          <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
          <span className="absolute inset-0 rounded-full animate-pulse-gold pointer-events-none" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
