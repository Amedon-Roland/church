"use client";

// Préférences et surlignages de lecture, gardés dans le navigateur du lecteur.
// Exposés via useSyncExternalStore : pas de décalage d'hydratation, et les
// onglets ouverts restent synchronisés.

import { useSyncExternalStore } from "react";

export type HighlightColor = "gold" | "blue" | "green" | "rose";
export type Highlight = { c: HighlightColor; t: string; r: string; href: string };
export type ReaderPrefs = { size: number; theme: "clair" | "sepia" | "nuit" };
export type LastRead = { slug: string; chapter: number; name: string };

const EVENT = "bible-store";
const cache = new Map<string, { raw: string | null; value: unknown }>();

function read<T>(key: string, fallback: T): T {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(key);
  } catch {}
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return hit.value as T;
  let value: T = fallback;
  try {
    if (raw) value = JSON.parse(raw) as T;
  } catch {}
  cache.set(key, { raw, value });
  return value;
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

function useStored<T>(key: string, fallback: T) {
  return useSyncExternalStore(
    subscribe,
    () => read(key, fallback),
    () => fallback,
  );
}

const NO_HIGHLIGHTS: Record<string, Highlight> = {};
const DEFAULT_PREFS: ReaderPrefs = { size: 1.2, theme: "clair" };

export const useHighlights = () => useStored("bible:hl", NO_HIGHLIGHTS);
export const usePrefs = () => useStored("bible:prefs", DEFAULT_PREFS);
export const useLastRead = () => useStored<LastRead | null>("bible:last", null);

export const getHighlights = () => read("bible:hl", NO_HIGHLIGHTS);
export const setHighlights = (v: Record<string, Highlight>) => write("bible:hl", v);
export const setPrefs = (v: ReaderPrefs) => write("bible:prefs", v);
export const setLastRead = (v: LastRead) => write("bible:last", v);

export const HL_CLASSES: Record<HighlightColor, string> = {
  gold: "bg-[#f6dd9c]/80",
  blue: "bg-[#c9d6f5]/90",
  green: "bg-[#cfe6c4]/90",
  rose: "bg-[#f4cfd0]/90",
};
