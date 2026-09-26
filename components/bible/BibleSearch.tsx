"use client";

import { ArrowRight, Loader2, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Hit = { book: string; slug: string; chapter: number; verse: number; text: string };
type Result = { reference: { label: string; href: string } | null; hits: Hit[]; total: number };

const EXAMPLES = ["Jean 3:16", "Psaume 23", "paix", "ne crains pas", "Romains 8"];

function Mark({ text, query }: { text: string; query: string }) {
  const words = query
    .split(/\s+/)
    .filter((w) => w.length > 1)
    .map((w) => w.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase());
  if (!words.length) return <>{text}</>;
  const folded = text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  // Le repli des accents conserve la longueur en NFD ; on travaille donc sur le texte NFD.
  const nfd = text.normalize("NFD");
  const marks: [number, number][] = [];
  for (const w of words) {
    let i = folded.indexOf(w);
    while (i !== -1) {
      marks.push([i, i + w.length]);
      i = folded.indexOf(w, i + w.length);
    }
  }
  if (folded.length !== nfd.replace(/[̀-ͯ]/g, "").length) return <>{text}</>;
  // Reconstruit les positions dans la chaîne NFD (qui contient les accents combinants).
  const map: number[] = [];
  for (let i = 0; i < nfd.length; i++) if (!/[̀-ͯ]/.test(nfd[i])) map.push(i);
  map.push(nfd.length);
  marks.sort((a, b) => a[0] - b[0]);
  const out: React.ReactNode[] = [];
  let pos = 0;
  for (const [s, e] of marks) {
    const from = map[s];
    const to = map[e];
    if (from < pos) continue;
    out.push(nfd.slice(pos, from).normalize("NFC"));
    out.push(
      <mark key={from} className="rounded bg-gold-soft px-0.5 text-ink">
        {nfd.slice(from, to).normalize("NFC")}
      </mark>,
    );
    pos = to;
  }
  out.push(nfd.slice(pos).normalize("NFC"));
  return <>{out}</>;
}

export function BibleSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const ctrl = useRef<AbortController | null>(null);

  useEffect(() => {
    if (q.trim().length < 2) {
      setResult(null);
      return;
    }
    const t = window.setTimeout(async () => {
      ctrl.current?.abort();
      ctrl.current = new AbortController();
      setLoading(true);
      try {
        const res = await fetch(`/api/bible/search?q=${encodeURIComponent(q.trim())}`, { signal: ctrl.current.signal });
        setResult(await res.json());
      } catch {
        /* requête remplacée */
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => window.clearTimeout(t);
  }, [q]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (result?.reference) router.push(result.reference.href);
        }}
        className="relative"
        role="search"
      >
        <label htmlFor="bible-q" className="sr-only">
          Rechercher dans la Bible
        </label>
        <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-mute" />
        <input
          id="bible-q"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Une référence (Jean 3:16) ou des mots (paix, lumière…)"
          className="w-full rounded-2xl border border-line bg-card py-4 pl-14 pr-12 text-lg text-ink shadow-[var(--shadow-paper)] placeholder:text-ink-mute/80 focus:border-royal focus:outline-none sm:py-5"
          autoComplete="off"
        />
        {loading && <Loader2 className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-ink-mute" />}
      </form>

      {!q && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-ink-mute">Essayez :</span>
          {EXAMPLES.map((ex) => (
            <button key={ex} type="button" onClick={() => setQ(ex)} className="rounded-full border border-line bg-card px-3 py-1 text-ink-soft hover:border-royal hover:text-royal">
              {ex}
            </button>
          ))}
        </div>
      )}

      {result && (
        <div className="mt-6" aria-live="polite">
          {result.reference && (
            <Link href={result.reference.href} className="mb-5 flex items-center justify-between gap-4 rounded-2xl bg-royal px-5 py-4 text-white">
              <span>
                <span className="block text-xs uppercase tracking-wider text-white/70">Aller au passage</span>
                <span className="font-serif text-2xl">{result.reference.label}</span>
              </span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          )}
          {result.total > 0 ? (
            <>
              <p className="mb-3 text-sm text-ink-mute">
                {result.total.toLocaleString("fr-FR")} verset{result.total > 1 ? "s" : ""}
                {result.total > result.hits.length && ` · ${result.hits.length} premiers affichés`}
              </p>
              <ul className="max-h-[32rem] divide-y divide-line overflow-y-auto rounded-2xl border border-line bg-card">
                {result.hits.map((h) => (
                  <li key={`${h.slug}-${h.chapter}-${h.verse}`}>
                    <Link href={`/bible/${h.slug}/${h.chapter}#v${h.verse}`} className="block px-5 py-4 hover:bg-linen/60">
                      <span className="text-sm font-semibold text-gold-ink">
                        {h.book} {h.chapter}:{h.verse}
                      </span>
                      <span className="mt-1 block font-serif text-lg leading-snug text-ink">
                        <Mark text={h.text} query={q} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            !result.reference && <p className="text-ink-mute">Aucun verset ne contient tous ces mots. Essayez un mot plus court.</p>
          )}
        </div>
      )}
    </div>
  );
}
