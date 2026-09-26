"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";

/** Partage natif du téléphone ; sinon copie dans le presse-papiers. */
export function ShareButton({ text, url, label = "Partager", className = "" }: { text: string; url?: string; label?: string; className?: string }) {
  const [done, setDone] = useState(false);
  async function share() {
    const href = url ? new URL(url, window.location.origin).toString() : window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ text, url: href });
        return;
      }
      await navigator.clipboard.writeText(`${text}\n${href}`);
      setDone(true);
      window.setTimeout(() => setDone(false), 2000);
    } catch {
      /* partage annulé */
    }
  }
  return (
    <button type="button" onClick={share} className={`btn btn-line ${className}`}>
      {done ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      {done ? "Copié !" : label}
    </button>
  );
}
