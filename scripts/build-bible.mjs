// Convertit le texte Louis Segond 1910 (format getBible « livre||chapitre||verset||texte »)
// en JSON compact : livres[chapitres[versets[]]]. Usage : node scripts/build-bible.mjs <source.txt>
import { readFileSync, writeFileSync } from "node:fs";

const src = process.argv[2];
if (!src) {
  console.error("Usage : node scripts/build-bible.mjs <source.txt>");
  process.exit(1);
}

const books = [];
for (const line of readFileSync(src, "utf8").split("\n")) {
  if (!line.trim()) continue;
  const [code, chapter, verse, ...rest] = line.split("||");
  const b = parseInt(code, 10) - 1;
  const c = parseInt(chapter, 10) - 1;
  const v = parseInt(verse, 10) - 1;
  const text = rest.join("||").replace(/\s+/g, " ").trim();
  books[b] ??= [];
  books[b][c] ??= [];
  books[b][c][v] = text;
}

// Comble d'éventuels trous pour garder des index alignés sur les numéros de versets.
for (const book of books) for (const ch of book) for (let i = 0; i < ch.length; i++) ch[i] ??= "";

writeFileSync("data/bible/lsg.json", JSON.stringify(books));
console.log(books.length, "livres ·", books.reduce((n, b) => n + b.length, 0), "chapitres");
console.log(JSON.stringify(books.map((b) => b.length)));
