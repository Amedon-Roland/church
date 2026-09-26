"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Un seul observateur pour toutes les apparitions `.reveal` de la page. */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    const scan = () => document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => io.observe(el));
    scan();
    // Les contenus chargés plus tard (listes, filtres) sont aussi pris en charge.
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);
  return null;
}
