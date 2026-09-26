"use client";

import { type Book } from "@/lib/bible/books";
import { HL_CLASSES, setHighlights, setLastRead, setPrefs, useHighlights, usePrefs, type HighlightColor, type ReaderPrefs } from "@/lib/bible/client-store";
import { Check, ChevronLeft, ChevronRight, Copy, Eraser, Share2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BookPicker } from "./BookPicker";

type Nav = { href: string; label: string } | null;

const THEMES: Record<ReaderPrefs["theme"], { page: string; bar: string; label: string; dot: string }> = {
  clair: { page: "bg-paper text-ink", bar: "border-line bg-paper/90", label: "Clair", dot: "bg-paper" },
  sepia: { page: "bg-[#f3e7cf] text-[#3b2a1a]", bar: "border-[#e2d2b2] bg-[#f3e7cf]/90", label: "Sépia", dot: "bg-[#f3e7cf]" },
  nuit: { page: "bg-night text-paper/90", bar: "border-paper/10 bg-night/90", label: "Nuit", dot: "bg-night" },
};

export function Reader({ book, chapter, verses, prev, next }: { book: Book; chapter: number; verses: string[]; prev: Nav; next: Nav }) {
  const router = useRouter();
  const prefs = usePrefs();
  const highlights = useHighlights();
  const [selected, setSelected] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  const key = useCallback((v: number) => `${book.slug}.${chapter}.${v}`, [book.slug, chapter]);

  // Mémorise la position pour « Reprendre ma lecture ».
  useEffect(() => {
    setLastRead({ slug: book.slug, chapter, name: `${book.name} ${chapter}` });
  }, [book, chapter]);

  // Shalom s'efface pendant qu'une sélection est ouverte, pour ne pas masquer les actions.
  useEffect(() => {
    document.body.toggleAttribute("data-sheet", selected.length > 0);
    return () => document.body.removeAttribute("data-sheet");
  }, [selected.length]);

  // Flèches du clavier : chapitre précédent / suivant.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest("input, textarea, dialog")) return;
      if (e.key === "ArrowLeft" && prev) router.push(prev.href);
      if (e.key === "ArrowRight" && next) router.push(next.href);
      if (e.key === "Escape") setSelected([]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, router]);

  const updatePrefs = (p: Partial<ReaderPrefs>) => setPrefs({ ...prefs, ...p });

  const toggle = (v: number) => setSelected((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v].sort((a, b) => a - b)));

  const reference = useMemo(() => {
    if (!selected.length) return "";
    // Regroupe les versets consécutifs : 3,4,5,8 → « 3-5, 8 »
    const parts: string[] = [];
    let start = selected[0];
    let prevV = start;
    for (const v of [...selected.slice(1), Infinity]) {
      if (v !== prevV + 1) {
        parts.push(start === prevV ? `${start}` : `${start}-${prevV}`);
        start = v;
      }
      prevV = v;
    }
    return `${book.name} ${chapter}:${parts.join(", ")}`;
  }, [selected, book.name, chapter]);

  const selectionText = () => `« ${selected.map((v) => verses[v - 1]).join(" ")} »\n— ${reference} (LSG)`;

  function paint(color: HighlightColor | null) {
    const all = { ...highlights };
    for (const v of selected) {
      if (color) all[key(v)] = { c: color, t: verses[v - 1], r: `${book.name} ${chapter}:${v}`, href: `/bible/${book.slug}/${chapter}#v${v}` };
      else delete all[key(v)];
    }
    setHighlights(all);
    setSelected([]);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(selectionText());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  async function share() {
    const url = `${window.location.origin}/bible/${book.slug}/${chapter}#v${selected[0]}`;
    try {
      if (navigator.share) await navigator.share({ text: selectionText(), url });
      else window.open(`https://wa.me/?text=${encodeURIComponent(`${selectionText()}\n${url}`)}`, "_blank", "noopener");
    } catch {}
  }

  const theme = THEMES[prefs.theme];
  const dark = prefs.theme === "nuit";

  return (
    <div className={`min-h-[80vh] transition-colors duration-300 ${theme.page}`}>
      {/* Barre d'outils */}
      <div className={`sticky top-[4.25rem] z-30 border-b backdrop-blur-md lg:top-20 ${theme.bar}`}>
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-4 py-2.5 sm:px-6">
          <BookPicker current={book} chapter={chapter} />
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => updatePrefs({ size: Math.max(0.95, +(prefs.size - 0.1).toFixed(2)) })} className="grid h-10 w-10 place-items-center rounded-full font-serif text-sm hover:bg-current/10" aria-label="Réduire le texte">
              A-
            </button>
            <button type="button" onClick={() => updatePrefs({ size: Math.min(1.8, +(prefs.size + 0.1).toFixed(2)) })} className="grid h-10 w-10 place-items-center rounded-full font-serif text-lg hover:bg-current/10" aria-label="Agrandir le texte">
              A+
            </button>
            <span className="mx-1 h-6 w-px bg-current/15" />
            {(Object.keys(THEMES) as ReaderPrefs["theme"][]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => updatePrefs({ theme: t })}
                className={`grid h-10 w-9 place-items-center rounded-full`}
                aria-label={`Thème ${THEMES[t].label}`}
                aria-pressed={prefs.theme === t}
              >
                <span className={`h-5 w-5 rounded-full border ${THEMES[t].dot} ${prefs.theme === t ? "border-gold ring-2 ring-gold" : "border-current/30"}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-2xl px-5 pb-32 pt-10 sm:px-6 sm:pt-14">
        <header className="mb-10 text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${dark ? "text-gold" : "text-gold-ink"}`}>{book.name}</p>
          <h1 className="mt-2 font-serif text-7xl font-normal leading-none sm:text-8xl">{chapter}</h1>
          <div className="ornament mx-auto mt-6 max-w-40" aria-hidden>
            ✦
          </div>
        </header>

        <div className="font-serif leading-[1.85]" style={{ fontSize: `${prefs.size}rem` }}>
          {verses.map((text, i) => {
            const v = i + 1;
            const hl = highlights[key(v)];
            const isSel = selected.includes(v);
            return (
              <span
                key={v}
                id={`v${v}`}
                role="button"
                tabIndex={0}
                aria-pressed={isSel}
                onClick={() => toggle(v)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), toggle(v))}
                className={`scroll-mt-40 rounded-[0.2em] px-0.5 transition-colors [box-decoration-break:clone] [-webkit-box-decoration-break:clone] ${hl ? `${HL_CLASSES[hl.c]} ${dark ? "text-night" : ""}` : ""} ${
                  isSel ? "underline decoration-gold decoration-2 underline-offset-[6px]" : ""
                } verse cursor-pointer`}
              >
                <sup className={`mr-1 select-none font-sans text-[0.6em] font-semibold ${dark && !hl ? "text-gold" : "text-gold-ink"}`}>{v}</sup>
                {text}{" "}
              </span>
            );
          })}
        </div>

        <nav className="mt-16 grid grid-cols-2 gap-3" aria-label="Chapitres">
          {prev ? (
            <Link href={prev.href} className={`group flex items-center gap-2 rounded-2xl border p-4 ${dark ? "border-paper/15 hover:border-gold" : "border-line hover:border-royal"}`}>
              <ChevronLeft className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-x-1" />
              <span className="min-w-0">
                <span className="block text-xs opacity-60">Précédent</span>
                <span className="block truncate font-serif text-lg">{prev.label}</span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={next.href} className={`group flex items-center justify-end gap-2 rounded-2xl border p-4 text-right ${dark ? "border-paper/15 hover:border-gold" : "border-line hover:border-royal"}`}>
              <span className="min-w-0">
                <span className="block text-xs opacity-60">Suivant</span>
                <span className="block truncate font-serif text-lg">{next.label}</span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </nav>
        <p className="mt-10 text-center text-xs opacity-50">Louis Segond 1910 · domaine public</p>
      </article>

      {/* Actions sur la sélection */}
      {selected.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-50 animate-rise border-t border-line bg-card text-ink shadow-[0_-12px_40px_-20px_rgb(23_25_58/0.5)]" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
          <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
            <p className="mr-auto font-serif text-lg">{reference}</p>
            <div className="flex items-center gap-1.5">
              {(Object.keys(HL_CLASSES) as HighlightColor[]).map((c) => (
                <button key={c} type="button" onClick={() => paint(c)} className={`h-8 w-8 rounded-full border border-ink/10 ${HL_CLASSES[c]}`} aria-label={`Surligner (${c})`} />
              ))}
              <button type="button" onClick={() => paint(null)} className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink-mute" aria-label="Retirer le surlignage">
                <Eraser className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-1">
              <button type="button" onClick={copy} className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold hover:bg-linen">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? "Copié" : "Copier"}
              </button>
              <button type="button" onClick={share} className="inline-flex h-10 items-center gap-2 rounded-full bg-royal px-4 text-sm font-semibold text-white">
                <Share2 className="h-4 w-4" /> Partager
              </button>
              <button type="button" onClick={() => setSelected([])} className="grid h-10 w-10 place-items-center rounded-full text-ink-mute hover:bg-linen" aria-label="Annuler la sélection">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
