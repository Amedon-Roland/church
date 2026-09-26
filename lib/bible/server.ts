import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import { BOOKS, DAILY_VERSES, bookBySlug, type Book } from "./books";

// Texte Louis Segond 1910 (domaine public), chargé une fois par instance serveur.
let data: string[][][] | null = null;
function bible() {
  data ??= JSON.parse(readFileSync(path.join(process.cwd(), "data/bible/lsg.json"), "utf8")) as string[][][];
  return data;
}

export function getChapter(book: Book, chapter: number) {
  return bible()[book.index]?.[chapter - 1] ?? null;
}

export function getPassage(slug: string, chapter: number, from: number, to = from) {
  const book = bookBySlug(slug);
  const verses = book && getChapter(book, chapter);
  if (!book || !verses) return null;
  const text = verses.slice(from - 1, to).join(" ");
  const ref = `${book.name} ${chapter}:${from}${to > from ? `-${to}` : ""}`;
  return { book, chapter, from, to, text, ref };
}

/** Même verset pour tout le monde, le même jour. */
export function verseOfTheDay(date = new Date()) {
  const day = Math.floor(date.getTime() / 86400_000);
  const [slug, c, v, to] = DAILY_VERSES[day % DAILY_VERSES.length];
  const passage = getPassage(slug, c, v, to)!;
  // Retire les suscriptions des psaumes (« Cantique de David. ») pour l'affichage.
  return { ...passage, text: passage.text.replace(PSALM_TITLE, "") };
}

const PSALM_TITLE =
  /^(?:(?:Au chef des chantres|Cantique(?: des degrés)?|Psaume|De David|Des fils de Koré|Sur alamoth|Maskil)(?: de David)?\.\s*)+/;

const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

/** Reconnaît une référence : « Jean 3:16 », « jn 3 16 », « 1 co 13 », « psaume 23 ». */
export function parseReference(input: string) {
  const m = fold(input.trim()).match(/^([1-3]?\s*[a-z][a-z\s-]*?)\.?\s*(\d+)(?:\s*[:.,\s]\s*(\d+))?$/);
  if (!m) return null;
  const name = m[1].replace(/[\s-]+/g, "");
  const book =
    BOOKS.find((b) => fold(b.name).replace(/[\s-]+/g, "") === name) ??
    BOOKS.find((b) => fold(b.short) === name) ??
    BOOKS.find((b) => fold(b.name).replace(/[\s-]+/g, "").startsWith(name) && name.length >= 2) ??
    (name === "psaume" ? bookBySlug("psaumes") : undefined);
  if (!book) return null;
  const chapter = Number(m[2]);
  if (chapter < 1 || chapter > book.chapters) return null;
  return { book, chapter, verse: m[3] ? Number(m[3]) : undefined };
}

export type SearchHit = { book: string; slug: string; chapter: number; verse: number; text: string };

export function searchBible(query: string, limit = 60) {
  const words = fold(query)
    .split(/\s+/)
    .filter((w) => w.length > 1);
  if (!words.length) return { hits: [] as SearchHit[], total: 0 };
  const hits: SearchHit[] = [];
  let total = 0;
  bible().forEach((chapters, b) =>
    chapters.forEach((verses, c) =>
      verses.forEach((text, v) => {
        const f = fold(text);
        if (words.every((w) => f.includes(w))) {
          total++;
          if (hits.length < limit)
            hits.push({ book: BOOKS[b].name, slug: BOOKS[b].slug, chapter: c + 1, verse: v + 1, text });
        }
      }),
    ),
  );
  return { hits, total };
}
