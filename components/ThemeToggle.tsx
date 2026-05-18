"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Basculer le thème"
      className="relative w-12 h-12 rounded-full flex items-center justify-center border border-border hover:border-secondary transition-all duration-500 group overflow-hidden"
    >
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at center, rgba(var(--secondary-rgb), 0.25), transparent 70%)",
        }}
      />
      {mounted ? (
        <>
          <Sun
            className={`absolute h-5 w-5 text-secondary transition-all duration-500 ${
              isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <Moon
            className={`absolute h-5 w-5 text-secondary transition-all duration-500 ${
              isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            }`}
          />
        </>
      ) : (
        <Sun className="h-5 w-5 text-secondary opacity-50" />
      )}
    </button>
  );
}
