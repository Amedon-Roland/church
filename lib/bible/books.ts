// Les 66 livres dans l'ordre protestant, noms de la Louis Segond 1910.

export type Book = {
  index: number;
  slug: string;
  name: string;
  short: string;
  chapters: number;
  testament: "AT" | "NT";
  group: string;
};

const RAW: [string, string, string, number, string][] = [
  ["genese", "Genèse", "Gn", 50, "Pentateuque"],
  ["exode", "Exode", "Ex", 40, "Pentateuque"],
  ["levitique", "Lévitique", "Lv", 27, "Pentateuque"],
  ["nombres", "Nombres", "Nb", 36, "Pentateuque"],
  ["deuteronome", "Deutéronome", "Dt", 34, "Pentateuque"],
  ["josue", "Josué", "Jos", 24, "Historiques"],
  ["juges", "Juges", "Jg", 21, "Historiques"],
  ["ruth", "Ruth", "Rt", 4, "Historiques"],
  ["1-samuel", "1 Samuel", "1S", 31, "Historiques"],
  ["2-samuel", "2 Samuel", "2S", 24, "Historiques"],
  ["1-rois", "1 Rois", "1R", 22, "Historiques"],
  ["2-rois", "2 Rois", "2R", 25, "Historiques"],
  ["1-chroniques", "1 Chroniques", "1Ch", 29, "Historiques"],
  ["2-chroniques", "2 Chroniques", "2Ch", 36, "Historiques"],
  ["esdras", "Esdras", "Esd", 10, "Historiques"],
  ["nehemie", "Néhémie", "Né", 13, "Historiques"],
  ["esther", "Esther", "Est", 10, "Historiques"],
  ["job", "Job", "Jb", 42, "Poétiques"],
  ["psaumes", "Psaumes", "Ps", 150, "Poétiques"],
  ["proverbes", "Proverbes", "Pr", 31, "Poétiques"],
  ["ecclesiaste", "Ecclésiaste", "Ec", 12, "Poétiques"],
  ["cantique-des-cantiques", "Cantique des cantiques", "Ct", 8, "Poétiques"],
  ["esaie", "Ésaïe", "Es", 66, "Prophètes"],
  ["jeremie", "Jérémie", "Jr", 52, "Prophètes"],
  ["lamentations", "Lamentations", "Lm", 5, "Prophètes"],
  ["ezechiel", "Ézéchiel", "Ez", 48, "Prophètes"],
  ["daniel", "Daniel", "Dn", 12, "Prophètes"],
  ["osee", "Osée", "Os", 14, "Prophètes"],
  ["joel", "Joël", "Jl", 3, "Prophètes"],
  ["amos", "Amos", "Am", 9, "Prophètes"],
  ["abdias", "Abdias", "Ab", 1, "Prophètes"],
  ["jonas", "Jonas", "Jon", 4, "Prophètes"],
  ["michee", "Michée", "Mi", 7, "Prophètes"],
  ["nahum", "Nahum", "Na", 3, "Prophètes"],
  ["habakuk", "Habakuk", "Ha", 3, "Prophètes"],
  ["sophonie", "Sophonie", "So", 3, "Prophètes"],
  ["aggee", "Aggée", "Ag", 2, "Prophètes"],
  ["zacharie", "Zacharie", "Za", 14, "Prophètes"],
  ["malachie", "Malachie", "Ml", 4, "Prophètes"],
  ["matthieu", "Matthieu", "Mt", 28, "Évangiles"],
  ["marc", "Marc", "Mc", 16, "Évangiles"],
  ["luc", "Luc", "Lc", 24, "Évangiles"],
  ["jean", "Jean", "Jn", 21, "Évangiles"],
  ["actes", "Actes", "Ac", 28, "Actes"],
  ["romains", "Romains", "Rm", 16, "Épîtres"],
  ["1-corinthiens", "1 Corinthiens", "1Co", 16, "Épîtres"],
  ["2-corinthiens", "2 Corinthiens", "2Co", 13, "Épîtres"],
  ["galates", "Galates", "Ga", 6, "Épîtres"],
  ["ephesiens", "Éphésiens", "Ep", 6, "Épîtres"],
  ["philippiens", "Philippiens", "Ph", 4, "Épîtres"],
  ["colossiens", "Colossiens", "Col", 4, "Épîtres"],
  ["1-thessaloniciens", "1 Thessaloniciens", "1Th", 5, "Épîtres"],
  ["2-thessaloniciens", "2 Thessaloniciens", "2Th", 3, "Épîtres"],
  ["1-timothee", "1 Timothée", "1Tm", 6, "Épîtres"],
  ["2-timothee", "2 Timothée", "2Tm", 4, "Épîtres"],
  ["tite", "Tite", "Tt", 3, "Épîtres"],
  ["philemon", "Philémon", "Phm", 1, "Épîtres"],
  ["hebreux", "Hébreux", "He", 13, "Épîtres"],
  ["jacques", "Jacques", "Jc", 5, "Épîtres"],
  ["1-pierre", "1 Pierre", "1P", 5, "Épîtres"],
  ["2-pierre", "2 Pierre", "2P", 3, "Épîtres"],
  ["1-jean", "1 Jean", "1Jn", 5, "Épîtres"],
  ["2-jean", "2 Jean", "2Jn", 1, "Épîtres"],
  ["3-jean", "3 Jean", "3Jn", 1, "Épîtres"],
  ["jude", "Jude", "Jd", 1, "Épîtres"],
  ["apocalypse", "Apocalypse", "Ap", 22, "Apocalypse"],
];

export const BOOKS: Book[] = RAW.map(([slug, name, short, chapters, group], index) => ({
  index,
  slug,
  name,
  short,
  chapters,
  group,
  testament: index < 39 ? "AT" : "NT",
}));

export const bookBySlug = (slug: string) => BOOKS.find((b) => b.slug === slug);

export const chapterHref = (book: Book, chapter: number, verse?: number) =>
  `/bible/${book.slug}/${chapter}${verse ? `#v${verse}` : ""}`;

/** Versets pour le « verset du jour » — choisis pour encourager, faciles à retenir. */
export const DAILY_VERSES: [string, number, number, number?][] = [
  ["psaumes", 23, 1, 3],
  ["jean", 3, 16],
  ["esaie", 41, 10],
  ["philippiens", 4, 13],
  ["romains", 8, 28],
  ["jeremie", 29, 11],
  ["josue", 1, 9],
  ["matthieu", 11, 28, 29],
  ["psaumes", 46, 1],
  ["proverbes", 3, 5, 6],
  ["2-corinthiens", 5, 17],
  ["lamentations", 3, 22, 23],
  ["psaumes", 121, 1, 2],
  ["jean", 14, 27],
  ["romains", 15, 13],
  ["hebreux", 11, 1],
  ["1-jean", 4, 18],
  ["psaumes", 27, 1],
  ["esaie", 40, 31],
  ["galates", 5, 22, 23],
  ["matthieu", 5, 14, 16],
  ["psaumes", 133, 1],
  ["jean", 16, 33],
  ["ephesiens", 2, 8, 9],
  ["1-corinthiens", 13, 4, 7],
  ["psaumes", 34, 18],
  ["michee", 6, 8],
  ["2-timothee", 1, 7],
  ["jacques", 1, 5],
  ["apocalypse", 21, 4],
  ["1-pierre", 5, 7],
];
